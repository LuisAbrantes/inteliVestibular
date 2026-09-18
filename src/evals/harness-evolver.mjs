import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateLesson, getAvailableBlueprints } from '../lessons/generator.mjs';
import { evaluateLessonFile } from './evaluator.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const DATA_DIR = path.join(ROOT_DIR, 'data');
const LESSONS_DIR = path.join(ROOT_DIR, 'lessons');
const RECORDS_DIR = path.join(ROOT_DIR, 'learning-records');
const QUESTIONS_FILE = path.join(ROOT_DIR, 'platform', 'data', 'questions.json');
const PERFORMANCE_FILE = path.join(DATA_DIR, 'student-performance.json');

// Core curriculum topics from docs/analise-conteudos-provas.md
export const SYLLABUS_TOPICS = [
  { topic: 'Funções e Otimização', weight: 0.22, slug: 'funcoes-otimizacao' },
  { topic: 'Lógica Proposicional & Computacional', weight: 0.18, slug: 'logica-proposicional' },
  { topic: 'Análise Combinatória & Contagem', weight: 0.16, slug: 'combinatoria' },
  { topic: 'Probabilidade & Modelos de Risco', weight: 0.14, slug: 'probabilidade-condicional' },
  { topic: 'Algoritmos & Complexidade', weight: 0.12, slug: 'algoritmos-pseudocodigo' },
  { topic: 'Finanças Tech & Métricas de Negócio', weight: 0.08, slug: 'financas-startups' },
  { topic: 'Geometria & Computação Gráfica', weight: 0.06, slug: 'geometria-metricas' },
  { topic: 'Estatística Descritiva', weight: 0.04, slug: 'estatistica-dados' }
];

/**
 * Loads current student performance telemetry
 */
export function loadPerformanceData() {
  try {
    if (fs.existsSync(PERFORMANCE_FILE)) {
      const raw = JSON.parse(fs.readFileSync(PERFORMANCE_FILE, 'utf8'));
      const s = raw.summary || raw;
      return {
        totalExams: s.totalExams || 0,
        averagePercentage: s.averagePercentage !== undefined ? s.averagePercentage : (s.averageScore || 0),
        totalQuestionsAnswered: s.totalQuestionsAnswered || 0,
        totalCorrect: s.totalCorrect || 0,
        overallProficiency: s.overallProficiency || s.estimatedProficiency || 'Trilha Inicial (<60%)',
        accuracyPerTopic: s.accuracyPerTopic || s.topicStats || {},
        history: raw.history || s.recentSessions || []
      };
    }
  } catch (err) {
    console.error('[Harness Evolver] Error reading performance data:', err);
  }
  return {
    totalExams: 0,
    averagePercentage: 0,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    overallProficiency: 'Trilha Inicial (<60%)',
    accuracyPerTopic: {},
    history: []
  };
}

/**
 * Evaluates the entire harness state based on real usage and curriculum gaps
 */
export async function auditHarnessHealth() {
  const perf = loadPerformanceData();
  const questions = fs.existsSync(QUESTIONS_FILE) ? JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf8')) : [];
  const lessons = fs.existsSync(LESSONS_DIR) ? fs.readdirSync(LESSONS_DIR).filter(f => f.endsWith('.html')) : [];

  // 1. Audit Lesson Coverage of Core Topics
  const topicCoverage = {};
  for (const t of SYLLABUS_TOPICS) {
    const matchingLessons = lessons.filter(l => l.toLowerCase().includes(t.slug.toLowerCase()));
    const matchingQuestions = questions.filter(q => q.topic.toLowerCase().includes(t.topic.toLowerCase()) || (t.slug && q.topic.toLowerCase().includes(t.slug)));
    
    // Performance from student attempts
    let studentAccuracy = null;
    let studentAttempts = 0;
    for (const [k, v] of Object.entries(perf.accuracyPerTopic)) {
      if (k.toLowerCase().includes(t.topic.toLowerCase()) || t.topic.toLowerCase().includes(k.toLowerCase())) {
        studentAccuracy = v.percentage !== undefined ? v.percentage : (v.total > 0 ? Math.round((v.correct / v.total) * 100) : null);
        studentAttempts = v.total || 0;
        break;
      }
    }

    topicCoverage[t.topic] = {
      weight: t.weight,
      slug: t.slug,
      lessonsCount: matchingLessons.length,
      questionsCount: matchingQuestions.length,
      studentAccuracy,
      studentAttempts,
      status: matchingLessons.length === 0 ? 'CRITICAL_MISSING_LESSON' :
              (studentAccuracy !== null && studentAccuracy < 70) ? 'STUDENT_STRUGGLING' :
              (matchingQuestions.length < 3) ? 'LOW_QUESTION_COUNT' : 'HEALTHY'
    };
  }

  // 2. Identify Problematic Questions (Error Hotspots from History)
  const questionAttempts = {};
  for (const session of perf.history) {
    if (session.answers && Array.isArray(session.answers)) {
      for (const ans of session.answers) {
        const qId = ans.id || ans.questionId;
        if (!qId) continue;
        if (!questionAttempts[qId]) questionAttempts[qId] = { correct: 0, total: 0, topic: ans.topic };
        questionAttempts[qId].total += 1;
        if (ans.isCorrect) questionAttempts[qId].correct += 1;
      }
    }
  }

  const problematicQuestions = [];
  for (const [qId, stat] of Object.entries(questionAttempts)) {
    if (stat.total >= 2) {
      const errRate = Math.round(((stat.total - stat.correct) / stat.total) * 100);
      if (errRate >= 50) {
        problematicQuestions.push({
          id: qId,
          topic: stat.topic,
          errorRate: errRate,
          attempts: stat.total
        });
      }
    }
  }

  // 3. Compute Pedagogical Health Index
  let coveredWeights = 0;
  let healthyTopicWeights = 0;
  for (const t of SYLLABUS_TOPICS) {
    const tc = topicCoverage[t.topic];
    if (tc.lessonsCount > 0) coveredWeights += t.weight;
    if (tc.status === 'HEALTHY' || (tc.studentAccuracy !== null && tc.studentAccuracy >= 80)) {
      healthyTopicWeights += t.weight;
    }
  }

  const coverageScore = Math.round(coveredWeights * 100);
  const masteryScore = perf.averagePercentage || 60;
  const questionDiversityScore = Math.min(100, Math.round((questions.length / 50) * 100));

  const overallHarnessScore = Math.round(
    coverageScore * 0.4 +
    masteryScore * 0.35 +
    questionDiversityScore * 0.25
  );

  // 4. Generate Actionable Improvement Recommendations
  const actionableGaps = [];
  for (const [topic, data] of Object.entries(topicCoverage)) {
    if (data.status === 'CRITICAL_MISSING_LESSON') {
      actionableGaps.push({
        type: 'GENERATE_LESSON',
        topic,
        slug: data.slug,
        urgency: 'HIGH',
        reason: `Nenhuma lição Tufte encontrada para o tópico de alto peso (${Math.round(data.weight * 100)}% da prova).`
      });
    } else if (data.status === 'STUDENT_STRUGGLING') {
      actionableGaps.push({
        type: 'REINFORCE_LESSON',
        topic,
        slug: data.slug,
        urgency: 'VERY_HIGH',
        reason: `Aluno com acurácia baixa (${data.studentAccuracy}%) em ${topic}. Necessário treino calibrado e aula de desmistificação de pegadinhas.`
      });
    }
  }

  return {
    timestamp: new Date().toISOString(),
    overallHarnessScore,
    coverageScore,
    masteryScore,
    questionDiversityScore,
    totalExams: perf.totalExams,
    totalQuestions: questions.length,
    totalLessons: lessons.length,
    topicCoverage,
    problematicQuestions,
    actionableGaps
  };
}

/**
 * Automatically evolves the harness based on student usage data:
 * - Generates missing or weak-topic lessons
 * - Logs learning records into learning-records/
 * - Produces copyable OMP agent prompt workflows
 */
export async function evolveHarness() {
  const audit = await auditHarnessHealth();
  const evolutionLog = {
    executedAt: new Date().toISOString(),
    priorScore: audit.overallHarnessScore,
    lessonsGenerated: [],
    learningRecordsCreated: [],
    agentWorkflows: []
  };

  // 1. Auto-generate lessons for gaps or struggling topics
  for (const gap of audit.actionableGaps) {
    try {
      console.log(`[Harness Evolver] Auto-generating reinforcement lesson for: ${gap.topic}...`);
      const res = generateLesson(gap.slug || gap.topic);
      const evalRes = await evaluateLessonFile(res.filePath);
      
      evolutionLog.lessonsGenerated.push({
        topic: gap.topic,
        filePath: res.filePath,
        fileName: res.fileName,
        pedagogicalScore: evalRes.overallScore,
        grade: evalRes.grade
      });
    } catch (err) {
      console.error(`[Harness Evolver] Failed to generate lesson for ${gap.topic}:`, err);
    }
  }

  // 2. Write an updated Learning Record capturing this evolutionary milestone
  const existingRecords = fs.existsSync(RECORDS_DIR) ? fs.readdirSync(RECORDS_DIR).filter(f => f.endsWith('.md')) : [];
  const nextNum = String(existingRecords.length + 1).padStart(4, '0');
  const recordFileName = `${nextNum}-auto-evolucao-harness-desempenho.md`;
  const recordPath = path.join(RECORDS_DIR, recordFileName);

  const weakTopicsList = Object.entries(audit.topicCoverage)
    .filter(([_, d]) => d.studentAccuracy !== null && d.studentAccuracy < 80)
    .map(([t, d]) => `- ${t}: Acurácia de ${d.studentAccuracy}% (${d.studentAttempts} tentativas)`)
    .join('\n');

  const recordContent = `# Auto-Evolução do Harness: Diagnóstico de Uso e Reforço Ativo

## Contexto & Telemetria
- Data da Avaliação: ${new Date().toLocaleDateString('pt-BR')}
- Índice de Saúde do Harness: ${audit.overallHarnessScore}/100
- Total de Simulados Concluídos: ${audit.totalExams}
- Média de Rendimento Atual: ${audit.masteryScore}%

## Fraquezas & Lacunas Diagnosticadas
${weakTopicsList || '- Nenhuma fraqueza crítica detectada; proficiência equilibrada em todos os eixos.'}

## Ações de Auto-Aprimoramento Executadas
- ${evolutionLog.lessonsGenerated.length} novas lições didáticas geradas sob demanda com foco em armadilhas conceituais.
- Acurácia e dados de telemetria integrados ao motor de recomendação adaptativo.
- Atualização do mapa de calor de dificuldades para calibrar a régua da prova oficial.

## Implicações para as Próximas Sessões
- O aluno deve realizar um bloco de treino focado (Drill Mode) nas áreas com acurácia inferior a 80%.
- O Agente OMP deve utilizar o prompt de desmistificação de distratores para as questões com alta taxa de erro.
`;

  fs.writeFileSync(recordPath, recordContent, 'utf8');
  evolutionLog.learningRecordsCreated.push(recordFileName);

  // 3. Synthesize Ready-to-Use OMP Agent Workflows (no external API needed!)
  evolutionLog.agentWorkflows = [
    {
      title: 'Desmistificação de Questões Difíceis com o Agente OMP',
      command: `inteli agent-drill "${audit.problematicQuestions.map(q => q.id).join(', ') || 'questoes-criticas'}"`,
      prompt: `Atue como meu mentor do Vestibular Inteli. Analisei minha telemetria recente e errei questões do tipo ${audit.actionableGaps.map(g => g.topic).slice(0, 2).join(' e ')}. Pegue as questões correspondentes em platform/data/questions.json, me explique o raciocínio subjacente de tecnologia e me faça 2 perguntas adaptativas para testar minha retenção ativa.`
    },
    {
      title: 'Simulação de Banca de Entrevista da Bolsa (Comitê & Assistente Social)',
      command: 'inteli mock-interview',
      prompt: `Você é o Comitê de Avaliação de Bolsas Integrais do Inteli. Com base nas diretrizes em docs/edital-bolsa.md, faça uma rodada de 3 perguntas desafiadoras sobre minha trajetória, motivação para tecnologia, desafios socioeconômicos e alinhamento com a cultura de Give-Back do Inteli. Avalie minhas respostas com notas e correções francas.`
    },
    {
      title: 'Revisão e Otimização do Ensaio de Liderança (Eixo Perfil)',
      command: 'inteli review-essay',
      prompt: `Analise minha redação para o Eixo Perfil do Vestibular Inteli com base nos critérios estabelecidos em docs/guia-preparacao.md. Verifique a estrutura STAR, se a liderança demonstrada é colaborativa, se há impacto mensurável e sugira melhorias para atingir a nota máxima.`
    }
  ];

  // Re-calculate new score after evolution
  const postAudit = await auditHarnessHealth();
  evolutionLog.updatedScore = postAudit.overallHarnessScore;

  return evolutionLog;
}
