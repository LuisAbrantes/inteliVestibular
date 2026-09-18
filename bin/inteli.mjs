#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { generateLesson, getAvailableBlueprints } from '../src/lessons/generator.mjs';
import { evaluateLessonFile } from '../src/evals/evaluator.mjs';
import { auditHarnessHealth, evolveHarness } from '../src/evals/harness-evolver.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const DATA_DIR = path.join(ROOT_DIR, 'data');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const LESSONS_DIR = path.join(ROOT_DIR, 'lessons');
const QUESTIONS_FILE = path.join(ROOT_DIR, 'platform', 'data', 'questions.json');
const PERFORMANCE_FILE = path.join(DATA_DIR, 'student-performance.json');

function color(text, code) {
  return `\x1b[${code}m${text}\x1b[0m`;
}
const bold = (t) => color(t, '1');
const cyan = (t) => color(t, '36');
const green = (t) => color(t, '32');
const yellow = (t) => color(t, '33');
const red = (t) => color(t, '31');
const magenta = (t) => color(t, '35');
const dim = (t) => color(t, '2');

function loadPerformance() {
  try {
    if (fs.existsSync(PERFORMANCE_FILE)) {
      const raw = JSON.parse(fs.readFileSync(PERFORMANCE_FILE, 'utf8'));
      const s = raw.summary || raw;
      return {
        totalExams: s.totalExams || 0,
        averageScore: s.averagePercentage !== undefined ? s.averagePercentage : (s.averageScore || 0),
        totalQuestionsAnswered: s.totalQuestionsAnswered || 0,
        totalCorrect: s.totalCorrect || 0,
        overallAccuracy: s.averagePercentage || s.overallAccuracy || 0,
        estimatedProficiency: s.overallProficiency || s.estimatedProficiency || "Trilha Inicial (<60%)",
        topicStats: s.accuracyPerTopic || s.topicStats || {},
        recentSessions: raw.history || s.recentSessions || []
      };
    }
  } catch (e) {}
  return {
    totalExams: 0,
    averageScore: 0,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    overallAccuracy: 0,
    estimatedProficiency: "Trilha Inicial (<60%)",
    topicStats: {},
    recentSessions: []
  };
}

function loadQuestions() {
  try {
    if (fs.existsSync(QUESTIONS_FILE)) {
      return JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf8'));
    }
  } catch (e) {}
  return [];
}

function printBanner() {
  console.log(cyan(`
╔════════════════════════════════════════════════════════════════════════╗
║                   INTELI VESTIBULAR & BOLSA HARNESS                    ║
║      Plataforma de Estudos, Simulados e Mentoria de Alto Desempenho    ║
╚════════════════════════════════════════════════════════════════════════╝`));
}

function showStatus() {
  printBanner();
  const perf = loadPerformance();
  const questions = loadQuestions();
  const lessons = fs.existsSync(LESSONS_DIR) ? fs.readdirSync(LESSONS_DIR).filter(f => f.endsWith('.html')) : [];

  console.log(bold('\n🎯 MISSÃO DO CANDIDATO:'));
  console.log(`   ${cyan('Aprovação no Inteli com Bolsa Integral (100%) + Auxílios de Permanência')}`);
  console.log(`   (Moradia, Computador/Notebook, Alimentação, Curso de Inglês)`);

  console.log(bold('\n📊 TELEMETRIA DE ESTUDO & SIMULADOS:'));
  console.log(`   • Simulados Realizados:         ${green(perf.totalExams)}`);
  console.log(`   • Média Geral de Acertos:       ${perf.averageScore >= 80 ? green(perf.averageScore + '%') : yellow(perf.averageScore + '%')}`);
  console.log(`   • Total de Questões Resolvidas: ${perf.totalQuestionsAnswered}`);
  console.log(`   • Régua de Proficiência:        ${perf.averageScore >= 80 ? green(perf.estimatedProficiency) : yellow(perf.estimatedProficiency)}`);

  console.log(bold('\n📚 BASE DE CONHECIMENTO & HARNESS:'));
  console.log(`   • Banco de Questões Oficiais:   ${green(questions.length)} questões cadastradas`);
  console.log(`   • Aulas Geradas Sob Demanda:    ${green(lessons.length)} lições Tufte disponíveis`);
  console.log(`   • Editais & Guias Absorvidos:   ${green('4')} dossiês completos em docs/`);

  if (perf.topicStats && Object.keys(perf.topicStats).length > 0) {
    console.log(bold('\n📈 DESEMPENHO POR TÓPICO:'));
    for (const [topic, stat] of Object.entries(perf.topicStats)) {
      const acc = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
      const bar = '█'.repeat(Math.round(acc / 10)) + '░'.repeat(10 - Math.round(acc / 10));
      const colorFn = acc >= 80 ? green : acc >= 60 ? yellow : red;
      console.log(`   • ${topic.padEnd(28)} [${colorFn(bar)}] ${colorFn(acc + '%')} (${stat.correct}/${stat.total})`);
    }

    const weakTopics = Object.entries(perf.topicStats)
      .filter(([_, s]) => s.total >= 2)
      .map(([t, s]) => ({ topic: t, acc: (s.correct / s.total) * 100 }))
      .sort((a, b) => a.acc - b.acc);

    if (weakTopics.length > 0 && weakTopics[0].acc < 80) {
      console.log(bold('\n⚠️  DIAGNÓSTICO DE FRAQUEZAS PRIORITÁRIAS:'));
      console.log(`   Recomenda-se gerar aula e treino específico para: ${red(weakTopics[0].topic)} (${Math.round(weakTopics[0].acc)}%)`);
      console.log(`   Comando: ${cyan(`inteli lesson ${weakTopics[0].topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}`)}`);
    }
  } else {
    console.log(bold('\n💡 DICA INICIAL:'));
    console.log(`   Faça seu primeiro simulado para mapear seus pontos fortes e fracos!`);
    console.log(`   Execute: ${cyan('inteli sim')} para abrir a plataforma web.`);
    console.log(`   Ou:      ${cyan('inteli quiz')} para responder questões aqui no terminal.`);
  }

  console.log(bold('\n🛠️  COMANDOS DISPONÍVEIS:'));
  console.log(`   ${cyan('inteli status')}           Exibe este painel de telemetria`);
  console.log(`   ${cyan('inteli sim')}              Inicia o servidor e abre a Plataforma de Simulados`);
  console.log(`   ${cyan('inteli quiz [topico]')}     Treino interativo de questões no terminal`);
  console.log(`   ${cyan('inteli lesson <topico>')}   Gera uma lição Tufte com recuperação ativa sob demanda`);
  console.log(`   ${cyan('inteli evals')}             Roda a suíte de avaliações pedagógicas nas lições`);
  console.log(`   ${cyan('inteli health')}            Auditoria de saúde curricular do harness baseada em uso`);
  console.log(`   ${cyan('inteli evolve')}            Auto-aprimoramento contínuo do harness (gera aulas para lacunas)`);
  console.log(`   ${cyan('inteli agent')}             Acessa os fluxos de trabalho e prompts prontos para o Agente OMP`);
  console.log(`   ${cyan('inteli ask "<duvida>"')}    Consulta imediata nos editais e guias oficiais`);
  console.log(`   ${cyan('inteli topics')}            Lista os conteúdos mais cobrados com % de recorrência`);
  console.log(`   ${cyan('inteli roadmap')}           Exibe o cronograma estratégico de 8 semanas`);
  console.log();
}

async function runCliQuiz(topicFilter) {
  const questions = loadQuestions();
  let pool = questions;
  if (topicFilter) {
    const term = topicFilter.toLowerCase();
    pool = questions.filter(q => q.topic.toLowerCase().includes(term) || (q.subtopic && q.subtopic.toLowerCase().includes(term)));
    if (pool.length === 0) {
      console.log(yellow(`Nenhuma questão encontrada para o filtro "${topicFilter}". Usando banco completo.`));
      pool = questions;
    }
  }

  const q = pool[Math.floor(Math.random() * pool.length)];
  console.log('\n' + '='.repeat(70));
  console.log(bold(`QUESTÃO [${q.id}] - ${q.year}`));
  console.log(`Eixo: ${cyan(q.topic)} > ${dim(q.subtopic || '')} | Dificuldade: ${yellow(q.difficulty.toUpperCase())}`);
  console.log(`Contexto: ${dim(q.context)}`);
  console.log('='.repeat(70) + '\n');
  console.log(q.statement + '\n');

  const letters = ['A', 'B', 'C', 'D', 'E'];
  q.options.forEach((opt, idx) => {
    console.log(`  ${bold(letters[idx])}) ${opt}`);
  });
  console.log();

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question(bold('Sua resposta (A, B, C, D ou E): '), (ans) => {
    rl.close();
    const cleanAns = ans.trim().toUpperCase();
    const chosenIdx = letters.indexOf(cleanAns);

    console.log('\n' + '-'.repeat(70));
    if (chosenIdx === q.correctIndex) {
      console.log(green(bold('✔ RESPOSTA CORRETA! Parabéns!')));
    } else {
      console.log(red(bold(`✘ RESPOSTA INCORRETA. A alternativa correta é a letra ${letters[q.correctIndex]}.`)));
    }
    console.log('-'.repeat(70));

    console.log(bold('\n📖 RESOLUÇÃO COMENTADA:\n'));
    console.log(q.explanation);

    if (q.keyTakeaway) {
      console.log(bold('\n💡 INSIGHT CHAVE / TAKEAWAY:'));
      console.log(cyan(q.keyTakeaway));
    }
    console.log('\n' + '='.repeat(70) + '\n');

    // Update performance
    try {
      const perf = loadPerformance();
      perf.totalQuestionsAnswered += 1;
      if (chosenIdx === q.correctIndex) perf.totalCorrect += 1;
      perf.overallAccuracy = Math.round((perf.totalCorrect / perf.totalQuestionsAnswered) * 100);

      const tKey = q.topic;
      if (!perf.topicStats[tKey]) perf.topicStats[tKey] = { correct: 0, total: 0 };
      perf.topicStats[tKey].total += 1;
      if (chosenIdx === q.correctIndex) perf.topicStats[tKey].correct += 1;

      fs.writeFileSync(PERFORMANCE_FILE, JSON.stringify(perf, null, 2), 'utf8');
      console.log(dim(`Telemetria salva em data/student-performance.json (Precisão geral: ${perf.overallAccuracy}%)`));
    } catch (e) {}
  });
}

function askDocs(query) {
  if (!query) {
    console.log(red('Por favor forneça uma pergunta. Exemplo: inteli ask "quais documentos da bolsa?"'));
    return;
  }

  printBanner();
  console.log(bold(`🔍 Buscando nos editais e guias oficiais para: "${query}"\n`));

  const docFiles = [
    { name: 'Edital de Bolsas & Auxílios', file: 'edital-bolsa.md' },
    { name: 'Edital do Vestibular & Regras', file: 'edital-vestibular.md' },
    { name: 'Análise de Provas & Conteúdos', file: 'analise-conteudos-provas.md' },
    { name: 'Guia Estratégico de Preparação', file: 'guia-preparacao.md' }
  ];

  const terms = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  let foundResults = [];

  for (const doc of docFiles) {
    const fullPath = path.join(DOCS_DIR, doc.file);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, 'utf8');
    const sections = content.split(/\n(?=## )/);

    for (const sec of sections) {
      const secLower = sec.toLowerCase();
      let matchCount = 0;
      for (const term of terms) {
        if (secLower.includes(term)) matchCount++;
      }

      if (matchCount > 0) {
        foundResults.push({
          source: doc.name,
          file: doc.file,
          score: matchCount,
          header: sec.split('\n')[0].replace(/^##\s*/, ''),
          text: sec.split('\n').slice(1, 12).join('\n')
        });
      }
    }
  }

  foundResults.sort((a, b) => b.score - a.score);

  if (foundResults.length === 0) {
    console.log(yellow('Nenhum trecho exato encontrado. Consulte os arquivos completos na pasta docs/.'));
    return;
  }

  const top = foundResults.slice(0, 3);
  top.forEach((res, i) => {
    console.log(bold(`${i + 1}. [${res.source}] > ${cyan(res.header)}`));
    console.log(dim(`   Arquivo: docs/${res.file}`));
    console.log('\n' + res.text.trim() + '\n');
    console.log('-'.repeat(70) + '\n');
  });
}

function showTopics() {
  printBanner();
  console.log(bold('📊 CONTEÚDOS MAIS COBRADOS NO VESTIBULAR INTELI (INCIDÊNCIA):\n'));

  const breakdown = [
    { topic: 'Funções e Otimização', pct: '22%', details: 'Vértice da parábola, ponto de equilíbrio, máximos de receita, gráficos' },
    { topic: 'Lógica Proposicional & Computacional', pct: '18%', details: 'Implicações lógicas, tabelas-verdade, equivalências, regras de software' },
    { topic: 'Análise Combinatória & Contagem', pct: '16%', details: 'Princípio fundamental, chaves de segurança, senhas, anagramas' },
    { topic: 'Probabilidade & Modelos de Risco', pct: '14%', details: 'Eventos independentes, Bayes, testes A/B, latência e falhas' },
    { topic: 'Algoritmos & Pseudocódigo', pct: '12%', details: 'Rastreamento de loops, contadores, soma de Gauss, busca binária' },
    { topic: 'Finanças Tech & Métricas de Negócio', pct: '8%', details: 'MRR, CAC, LTV, IPO, valuation, margem de lucro' },
    { topic: 'Geometria & Computação Gráfica', pct: '6%', details: 'Telas com origem invertida, coordenadas de pixels, áreas e volumes' },
    { topic: 'Estatística Descritiva', pct: '4%', details: 'Média ponderada, mediana, desvio padrão, latência de servidores' }
  ];

  breakdown.forEach(item => {
    const bar = '█'.repeat(Math.round(parseInt(item.pct) / 2));
    console.log(`  ${cyan(item.pct.padEnd(5))} ${green(bar.padEnd(12))} ${bold(item.topic)}`);
    console.log(`         ${dim(item.details)}\n`);
  });
}

function showRoadmap() {
  printBanner();
  console.log(bold('🗓️  CRONOGRAMA DE PREPARAÇÃO EM 8 SEMANAS (RUMO À BOLSA 100%):\n'));

  const weeks = [
    { s: 'Semana 1-2', f: 'Fundamentos de Matemática Tech & Combinatória', g: 'Chaves de API, Princípio Fundamental, Funções Afim e Quadrática, MRR/CAC.' },
    { s: 'Semana 3', f: 'Lógica Computacional & Algoritmos', g: 'Tabelas-verdade, implicações lógicas, rastreamento de loops e pseudocódigo.' },
    { s: 'Semana 4', f: 'Probabilidade & Estatística Aplicada', g: 'Eventos independentes, Bayes, médias e dispersão em servidores e cloud.' },
    { s: 'Semana 5', f: 'Geometria de Telas & Otimização Avançada', g: 'Coordenadas de tela com Y invertido, áreas de layouts, máximos/mínimos.' },
    { s: 'Semana 6', f: 'Eixo Perfil: Ensaios de Liderança & Trajetória', g: 'Estruturação dos ensaios no método STAR e documentação de conquistas.' },
    { s: 'Semana 7', f: 'Eixo Projeto: Dinâmica em Grupo & Soft Skills', g: 'Prática de resolução colaborativa de problemas sob metodologia ágil/Scrum.' },
    { s: 'Semana 8', f: 'Auditoria Documental da Bolsa & Simulados Finais', g: 'Checklist rigoroso de extratos/IRPF e 3 simulados completos de 120min.' }
  ];

  weeks.forEach(w => {
    console.log(`  ${cyan(w.s.padEnd(12))} │ ${bold(w.f)}`);
    console.log(`               │ ${dim(w.g)}\n`);
  });
}

function startSimPlatform() {
  printBanner();
  console.log(bold('🚀 Iniciando Plataforma de Simulados Inteli...\n'));
  const serverProc = spawn('node', [path.join(ROOT_DIR, 'bin', 'serve-platform.mjs')], {
    stdio: 'inherit'
  });
}
async function showHealth() {
  printBanner();
  console.log(bold('🔬 AUDITORIA DE SAÚDE CURRICULAR DO HARNESS (BASEADA EM USO):\n'));
  const health = await auditHarnessHealth();
  console.log(`  • Índice Geral de Saúde:     ${health.overallHarnessScore >= 80 ? green(health.overallHarnessScore + '/100') : yellow(health.overallHarnessScore + '/100')}`);
  console.log(`  • Cobertura Curricular:      ${cyan(health.coverageScore + '%')}`);
  console.log(`  • Rendimento do Estudante:   ${health.masteryScore >= 80 ? green(health.masteryScore + '%') : yellow(health.masteryScore + '%')}`);
  console.log(`  • Lições Tufte Ativas:       ${green(health.totalLessons)}`);
  console.log(`  • Questões no Banco:         ${green(health.totalQuestions)}`);

  console.log(bold('\n📊 COBERTURA & RENDIMENTO POR TÓPICO DO EDITAL:'));
  for (const [topic, d] of Object.entries(health.topicCoverage)) {
    const accStr = d.studentAccuracy !== null ? `${d.studentAccuracy}%` : 'Sem testes';
    const statusColor = d.status === 'HEALTHY' ? green : d.status === 'STUDENT_STRUGGLING' ? red : yellow;
    console.log(`  • ${topic.padEnd(36)} [${d.lessonsCount} lições | ${d.questionsCount} questões] Acurácia: ${statusColor(accStr.padEnd(10))} Status: ${statusColor(d.status)}`);
  }

  if (health.actionableGaps && health.actionableGaps.length > 0) {
    console.log(bold('\n⚠️  LACUNAS E AÇÕES DE AUTO-APRIMORAMENTO RECOMENDADAS:'));
    health.actionableGaps.forEach((g, i) => {
      console.log(`  ${i + 1}. [${red(g.urgency)}] ${bold(g.topic)}: ${dim(g.reason)}`);
    });
    console.log(`\n  Para fechar todas as lacunas automaticamente, execute: ${cyan('inteli evolve')}`);
  }
  console.log();
}

async function runHarnessEvolution() {
  printBanner();
  console.log(bold('⚡ INICIANDO CICLO DE AUTO-EVOLUÇÃO DO HARNESS...\n'));
  console.log(dim('Analisando telemetria de uso, identificando fraquezas e gerando lições sob demanda...'));
  const evo = await evolveHarness();
  console.log(green(`\n✔ Ciclo concluído com sucesso!`));
  console.log(`  • Pontuação anterior: ${evo.priorScore}/100 ➔ Nova pontuação: ${bold(green(evo.updatedScore + '/100'))}`);
  console.log(`  • Novas lições didáticas geradas: ${evo.lessonsGenerated.length}`);
  evo.lessonsGenerated.forEach(l => {
    console.log(`    - ${l.topic} (${l.grade} • ${l.pedagogicalScore}/100) -> ${dim(l.fileName)}`);
  });
  console.log(`  • Registro de aprendizagem salvo em: ${cyan('learning-records/' + evo.learningRecordsCreated.join(', '))}`);
  console.log(`\nO Harness foi aprimorado para suas necessidades específicas de estudo!\n`);
}

function showAgentPrompts() {
  printBanner();
  console.log(bold('🤖 CENTRAL DE WORKFLOWS DO AGENTE OMP (SEUS MODELOS INTEGRADOS):\n'));
  console.log('Como você usa o Oh My Pi com seus próprios modelos integrados, envie os prompts abaixo');
  console.log('diretamente no chat para que eu atue como seu mentor especializado:\n');

  const workflows = [
    {
      title: '1. Simulação de Banca de Entrevista da Bolsa de Estudos Inteli',
      prompt: 'Você é a banca avaliadora do Comitê de Bolsas do Inteli. Com base nas diretrizes oficiais em docs/edital-bolsa.md e no meu perfil, conduza uma rodada de simulação de entrevista com 3 perguntas profundas: 1) Trajetória e desafios de vida; 2) Paixão por tecnologia e liderança; 3) Visão de impacto e Give-Back cultural. Faça uma pergunta por vez, aguarde minha resposta e depois me forneça feedback sincero e notas de calibração.'
    },
    {
      title: '2. Revisão Crítica do Ensaio de Liderança (Eixo Perfil - Método STAR)',
      prompt: 'Analise meu rascunho de redação para o Eixo Perfil do Vestibular Inteli usando os critérios rigorosos documentados em docs/guia-preparacao.md. Avalie: 1) Estrutura STAR (Situação, Tarefa, Ação, Resultado); 2) Demonstração de liderança servidora e espírito de equipe; 3) Impacto tangível; 4) Eliminação de clichês. Aqui está o meu texto: [COLE SUA REDAÇÃO AQUI]'
    },
    {
      title: '3. Desmistificação de Questões Difíceis que Errei no Simulado',
      prompt: 'Leia minha telemetria em data/student-performance.json e identifique as questões em que errei no último simulado. Abra platform/data/questions.json, analise exatamente o motivo pelo qual o distrator que escolhi é sedutor mas matematicamente incorreto, me explique o conceito intuitivo e crie uma questão gêmea inédita para eu responder agora.'
    },
    {
      title: '4. Geração de Lição Especializada em Tópico Livre',
      prompt: 'Execute o workflow de geração de aula sobre o tema "[SEU TÓPICO AQUI]". Crie a lição seguindo estritamente as regras de Edward Tufte em assets/lesson.css, vincule a assets/quiz.js com 3 perguntas desafiadoras de simetria balanceada e execute node bin/eval-lesson.mjs para garantir nota >= 90 antes de me entregar.'
    }
  ];

  workflows.forEach(w => {
    console.log(cyan(bold(w.title)));
    console.log(dim(w.prompt) + '\n');
  });
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0] || 'status';

  switch (cmd) {
    case 'status':
      showStatus();
      break;
    case 'sim':
    case 'platform':
      startSimPlatform();
      break;
    case 'quiz':
      await runCliQuiz(args[1]);
      break;
    case 'ask':
      askDocs(args.slice(1).join(' '));
      break;
    case 'topics':
      showTopics();
      break;
    case 'roadmap':
      showRoadmap();
      break;
    case 'health':
    case 'harness-eval':
      await showHealth();
      break;
    case 'evolve':
      await runHarnessEvolution();
      break;
    case 'agent':
      showAgentPrompts();
      break;
    case 'lesson': {
      const topic = args[1] || 'combinatoria';
      console.log(cyan(`\nGerando lição para o tópico "${topic}"...`));
      const res = generateLesson(topic);
      console.log(green(`✔ Lição gerada com sucesso: ${res.filePath}`));
      console.log(dim(`Avaliando qualidade pedagógica...`));
      const evalRes = await evaluateLessonFile(res.filePath);
      console.log(`Nota Pedagógica: ${evalRes.grade >= 'B' ? green(evalRes.overallScore + '/100 (' + evalRes.grade + ')') : red(evalRes.overallScore + '/100 (' + evalRes.grade + ')')}`);
      console.log(`Abra no navegador: open ${res.filePath}\n`);
      break;
    }
    case 'evals': {
      const { spawnSync } = await import('node:child_process');
      spawnSync('node', [path.join(ROOT_DIR, 'bin', 'eval-lesson.mjs'), '--all'], { stdio: 'inherit' });
      break;
    }
    default:
      console.log(yellow(`Comando desconhecido: "${cmd}"`));
      showStatus();
      break;
  }
}

main().catch(err => {
  console.error(red('Erro na execução do CLI:'), err);
  process.exit(1);
});
