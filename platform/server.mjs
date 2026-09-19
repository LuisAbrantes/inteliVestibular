/**
 * Inteli Exam Simulation Platform — Lightweight HTTP Server & Sync Backend
 *
 * Built with pure Node.js (no external npm dependencies).
 * Serves static assets, question bank, student performance telemetry,
 * and on-demand pedagogical lesson generation.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { fileURLToPath } from 'node:url';
import { generateLesson } from '../src/lessons/generator.mjs';
import { evaluateLesson } from '../src/evals/evaluator.mjs';
import { auditHarnessHealth, evolveHarness } from '../src/evals/harness-evolver.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const REPO_ROOT = path.resolve(__dirname, '..');

export const PATHS = {
  platform: path.join(REPO_ROOT, 'platform'),
  lessons: path.join(REPO_ROOT, 'lessons'),
  assets: path.join(REPO_ROOT, 'assets'),
  docs: path.join(REPO_ROOT, 'docs'),
  reference: path.join(REPO_ROOT, 'reference'),
  data: path.join(REPO_ROOT, 'data'),
  questionsJson: path.join(REPO_ROOT, 'platform', 'data', 'questions.json'),
  performanceJson: path.join(REPO_ROOT, 'data', 'student-performance.json'),
};

export const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.wasm': 'application/wasm',
};

/**
 * Standard CORS headers
 */
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
};

/**
 * Helper to send JSON responses
 */
export function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    ...CORS_HEADERS,
  });
  res.end(payload);
}

/**
 * Helper to send structured error responses
 */
export function sendError(res, statusCode, message, details = null) {
  sendJson(res, statusCode, {
    success: false,
    error: message,
    ...(details ? { details } : {}),
  });
}

/**
 * Parses JSON body from incoming HTTP request stream
 */
export function parseJsonBody(req, maxBytes = 10 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let raw = '';
    let size = 0;

    req.on('data', chunk => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error('Payload Too Large: máximo de 10MB'));
        req.destroy();
        return;
      }
      raw += chunk;
    });

    req.on('end', () => {
      if (!raw || !raw.trim()) {
        resolve({});
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        resolve(parsed);
      } catch (err) {
        reject(new Error(`JSON Inválido: ${err.message}`));
      }
    });

    req.on('error', err => reject(err));
  });
}

/**
 * Default empty student performance state
 */
export function getDefaultPerformanceData() {
  return {
    summary: {
      totalExams: 0,
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      averageScore: 0,
      averagePercentage: 0,
      overallProficiency: 'Iniciante',
      accuracyPerTopic: {},
      lastUpdated: null,
    },
    history: [],
  };
}

/**
 * Reads student performance from disk or initializes default state
 */
export function getPerformanceData() {
  try {
    if (!fs.existsSync(PATHS.performanceJson)) {
      const defaultData = getDefaultPerformanceData();
      if (!fs.existsSync(PATHS.data)) {
        fs.mkdirSync(PATHS.data, { recursive: true });
      }
      fs.writeFileSync(PATHS.performanceJson, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }

    const raw = fs.readFileSync(PATHS.performanceJson, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return getDefaultPerformanceData();
    }
    if (!parsed.summary) {
      parsed.summary = getDefaultPerformanceData().summary;
    }
    if (!Array.isArray(parsed.history)) {
      parsed.history = [];
    }
    return parsed;
  } catch (err) {
    console.error('[Server] Erro ao ler student-performance.json:', err.message);
    return getDefaultPerformanceData();
  }
}

/**
 * Appends an exam record and recalculates aggregate metrics
 */
export function savePerformanceRecord(payload) {
  const currentData = getPerformanceData();

  const score = Number(payload.score ?? payload.correctCount ?? 0);
  const total = Number(payload.total ?? payload.totalQuestions ?? (Array.isArray(payload.answers) ? payload.answers.length : 0));
  const percentage = Number(
    payload.percentage ?? (total > 0 ? Math.round((score / total) * 100) : 0)
  );

  let proficiency = payload.proficiency;
  if (!proficiency) {
    if (percentage >= 85) proficiency = 'Avançado';
    else if (percentage >= 65) proficiency = 'Intermediário';
    else proficiency = 'Em Desenvolvimento';
  }

  const record = {
    id: payload.sessionId || payload.id || `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: payload.timestamp || new Date().toISOString(),
    mode: payload.mode || 'exam',
    score,
    total,
    percentage,
    proficiency,
    timeTaken: payload.timeTaken ?? payload.duration ?? null,
    topicBreakdown: payload.topicBreakdown || payload.weakTopics || {},
    answers: Array.isArray(payload.answers)
      ? payload.answers
      : Array.isArray(payload.details)
      ? payload.details
      : [],
  };

  currentData.history.unshift(record);

  // Recalculate summary metrics across all history
  const totalExams = currentData.history.length;
  const totalQuestionsAnswered = currentData.history.reduce((sum, h) => sum + (Number(h.total) || 0), 0);
  const totalCorrect = currentData.history.reduce((sum, h) => sum + (Number(h.score) || 0), 0);
  const averageScore = totalExams > 0 ? Number((totalCorrect / totalExams).toFixed(1)) : 0;
  const averagePercentage = totalExams > 0
    ? Math.round(currentData.history.reduce((sum, h) => sum + (Number(h.percentage) || 0), 0) / totalExams)
    : 0;

  let overallProficiency = 'Iniciante';
  if (averagePercentage >= 85) overallProficiency = 'Avançado';
  else if (averagePercentage >= 65) overallProficiency = 'Intermediário';
  else if (totalExams > 0) overallProficiency = 'Em Desenvolvimento';

  // Aggregate topic accuracy across history
  const topicStats = {};

  for (const item of currentData.history) {
    if (item.topicBreakdown && typeof item.topicBreakdown === 'object' && Object.keys(item.topicBreakdown).length > 0) {
      for (const [topic, breakdown] of Object.entries(item.topicBreakdown)) {
        if (!topicStats[topic]) {
          topicStats[topic] = { correct: 0, total: 0 };
        }
        if (typeof breakdown === 'object' && breakdown !== null) {
          topicStats[topic].correct += Number(breakdown.correct || 0);
          topicStats[topic].total += Number(breakdown.total || 0);
        } else if (typeof breakdown === 'number') {
          topicStats[topic].correct += breakdown;
          topicStats[topic].total += 1;
        }
      }
    } else if (Array.isArray(item.answers) && item.answers.length > 0) {
      for (const ans of item.answers) {
        const topic = ans.topic || 'Geral';
        if (!topicStats[topic]) {
          topicStats[topic] = { correct: 0, total: 0 };
        }
        topicStats[topic].total += 1;
        if (ans.isCorrect === true || ans.correct === true) {
          topicStats[topic].correct += 1;
        }
      }
    }
  }

  const accuracyPerTopic = {};
  for (const [topic, stats] of Object.entries(topicStats)) {
    accuracyPerTopic[topic] = {
      correct: stats.correct,
      total: stats.total,
      percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    };
  }

  currentData.summary = {
    totalExams,
    totalQuestionsAnswered,
    totalCorrect,
    averageScore,
    averagePercentage,
    overallProficiency,
    accuracyPerTopic,
    lastUpdated: new Date().toISOString(),
  };

  if (!fs.existsSync(PATHS.data)) {
    fs.mkdirSync(PATHS.data, { recursive: true });
  }
  fs.writeFileSync(PATHS.performanceJson, JSON.stringify(currentData, null, 2), 'utf-8');

  return {
    success: true,
    updatedStats: currentData.summary,
    record,
  };
}

/**
 * Retrieves all generated lessons in lessons/
 */
export function getLessonsCatalog() {
  if (!fs.existsSync(PATHS.lessons)) {
    return { success: true, count: 0, lessons: [] };
  }

  const files = fs.readdirSync(PATHS.lessons)
    .filter(name => name.endsWith('.html'))
    .sort((a, b) => a.localeCompare(b));

  const lessons = files.map(fileName => {
    const filePath = path.join(PATHS.lessons, fileName);
    let title = fileName.replace(/\.html$/, '');
    let slug = title;
    let lessonNumber = '0000';

    const matchNumber = fileName.match(/^(\d{4})-(.+)\.html$/);
    if (matchNumber) {
      lessonNumber = matchNumber[1];
      slug = matchNumber[2];
    }

    try {
      // Read first 2KB for title extraction
      const fd = fs.openSync(filePath, 'r');
      const buffer = Buffer.alloc(2048);
      const bytesRead = fs.readSync(fd, buffer, 0, 2048, 0);
      fs.closeSync(fd);
      const head = buffer.toString('utf-8', 0, bytesRead);

      const titleMatch = head.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) ||
                         head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (titleMatch) {
        title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
      }
    } catch {
      // Keep filename fallback
    }

    const stat = fs.statSync(filePath);

    return {
      id: lessonNumber,
      lessonNumber,
      slug,
      fileName,
      url: `/lessons/${fileName}`,
      title,
      size: stat.size,
      updatedAt: stat.mtime.toISOString(),
    };
  });

  return {
    success: true,
    count: lessons.length,
    lessons,
  };
}

/**
 * Resolves a safe filesystem path from an HTTP request pathname
 */
export function resolveStaticPath(pathname) {
  let cleanPath = decodeURIComponent(pathname.split('?')[0]);

  // Root or index
  if (cleanPath === '/' || cleanPath === '/index.html') {
    const indexPath = path.join(PATHS.platform, 'index.html');
    return {
      filePath: indexPath,
      exists: fs.existsSync(indexPath),
      fallbackIndex: true,
    };
  }

  let targetPath = null;

  if (cleanPath.startsWith('/lessons/')) {
    targetPath = path.join(PATHS.lessons, cleanPath.slice(9));
  } else if (cleanPath.startsWith('/assets/')) {
    targetPath = path.join(PATHS.assets, cleanPath.slice(8));
  } else if (cleanPath.startsWith('/docs/')) {
    targetPath = path.join(PATHS.docs, cleanPath.slice(6));
  } else if (cleanPath.startsWith('/reference/')) {
    targetPath = path.join(PATHS.reference, cleanPath.slice(11));
  } else if (cleanPath.startsWith('/platform/')) {
    targetPath = path.join(PATHS.platform, cleanPath.slice(10));
  } else if (cleanPath.startsWith('/data/')) {
    // Check platform/data first, then repo/data
    const inPlatformData = path.join(PATHS.platform, cleanPath.slice(1));
    if (fs.existsSync(inPlatformData)) {
      targetPath = inPlatformData;
    } else {
      targetPath = path.join(REPO_ROOT, cleanPath.slice(1));
    }
  } else {
    // Direct assets under platform (e.g. /style.css, /app.js, /favicon.ico)
    const sub = cleanPath.replace(/^\//, '');
    const inPlatform = path.join(PATHS.platform, sub);
    if (fs.existsSync(inPlatform)) {
      targetPath = inPlatform;
    } else {
      targetPath = path.join(REPO_ROOT, sub);
    }
  }

  const normalized = path.normalize(targetPath);
  // Ensure path stays within repo root
  if (!normalized.startsWith(REPO_ROOT)) {
    return { forbidden: true };
  }

  // If target is directory, look for index.html inside
  if (fs.existsSync(normalized) && fs.statSync(normalized).isDirectory()) {
    const dirIndex = path.join(normalized, 'index.html');
    if (fs.existsSync(dirIndex)) {
      return { filePath: dirIndex, exists: true };
    }
    return { isDirectoryWithoutIndex: true };
  }

  return {
    filePath: normalized,
    exists: fs.existsSync(normalized),
  };
}

/**
 * Handles all HTTP incoming requests
 */
export async function handleRequest(req, res) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  const hostHeader = req.headers.host || 'localhost';
  const reqUrl = new URL(req.url, `http://${hostHeader}`);
  const pathname = reqUrl.pathname;
  const method = req.method.toUpperCase();

  // ==========================================
  // API ROUTING
  // ==========================================

  // GET /api/questions
  if (pathname === '/api/questions' && method === 'GET') {
    if (fs.existsSync(PATHS.questionsJson)) {
      try {
        const data = fs.readFileSync(PATHS.questionsJson, 'utf-8');
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(data),
          'Cache-Control': 'no-cache',
          ...CORS_HEADERS,
        });
        res.end(data);
        return;
      } catch (err) {
        sendError(res, 500, `Erro ao carregar banco de questões: ${err.message}`);
        return;
      }
    } else {
      sendJson(res, 200, {
        success: true,
        count: 0,
        questions: [],
        message: 'Banco de questões oficial sendo inicializado...',
      });
      return;
    }
  }

  // GET /api/stats
  if (pathname === '/api/stats' && method === 'GET') {
    const performance = getPerformanceData();
    sendJson(res, 200, {
      success: true,
      summary: performance.summary,
      history: performance.history,
    });
    return;
  }

  // POST /api/save-performance
  if (pathname === '/api/save-performance' && method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const result = savePerformanceRecord(body);
      sendJson(res, 200, result);
      return;
    } catch (err) {
      sendError(res, 400, err.message);
      return;
    }
  }

  // POST /api/generate-lesson
  if (pathname === '/api/generate-lesson' && method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const topic = (body.topic || body.weakPoints || body.slug || '').trim();

      if (!topic) {
        sendError(res, 400, 'Campo "topic" obrigatório para gerar a lição.');
        return;
      }

      // Generate lesson via generator.mjs
      const generated = generateLesson(topic, {
        outputDir: PATHS.lessons,
      });

      // Run evaluation via evaluator.mjs
      const evaluation = evaluateLesson(generated.html, generated.filePath);

      const lessonUrl = `/lessons/${generated.fileName}`;

      sendJson(res, 200, {
        success: true,
        lessonUrl,
        url: lessonUrl,
        lessonPath: lessonUrl,
        fileName: generated.fileName,
        lessonId: generated.lessonNumber,
        title: generated.title,
        evalScore: evaluation.overallScore,
        grade: evaluation.grade,
        passed: evaluation.passed,
        dimensions: evaluation.dimensions,
        summary: evaluation.summary,
      });
      return;
    } catch (err) {
      console.error('[Server] Erro ao gerar lição sob demanda:', err);
      sendError(res, 500, `Falha ao gerar lição pedagógica: ${err.message}`);
      return;
    }
  }

  // GET /api/lessons
  if (pathname === '/api/lessons' && method === 'GET') {
    const catalog = getLessonsCatalog();
    sendJson(res, 200, catalog);
    return;
  }
  // GET /api/harness-health
  if (pathname === '/api/harness-health' && method === 'GET') {
    try {
      const health = await auditHarnessHealth();
      sendJson(res, 200, { success: true, health });
    } catch (err) {
      sendError(res, 500, `Falha ao auditar saúde do harness: ${err.message}`);
    }
    return;
  }

  // POST /api/harness-evolve
  if (pathname === '/api/harness-evolve' && method === 'POST') {
    try {
      const evolution = await evolveHarness();
      sendJson(res, 200, { success: true, evolution });
    } catch (err) {
      sendError(res, 500, `Falha ao evoluir harness: ${err.message}`);
    }
    return;
  }

  // GET /api/docs-catalog
  if (pathname === '/api/docs-catalog' && method === 'GET') {
    const docs = [
      { id: 'trilha-inteligente', title: 'Trilha Inteligente Oficial Inteli 2027 (Muse-spark 1.3)', file: 'docs/trilha-inteligente-2027.md', category: 'Trilha Oficial' },
      { id: 'edital-vestibular', title: 'Edital do Vestibular Inteli 2027 & Regras Oficiais', file: 'docs/edital-vestibular.md', category: 'Vestibular' },
      { id: 'edital-bolsa', title: 'Edital do Programa de Bolsas Inteli 2027 & Auxílios', file: 'docs/edital-bolsa.md', category: 'Bolsas' },
      { id: 'dossie-openfinance', title: 'Dossiê Open Finance & Checklist da Bolsa 2027', file: 'docs/dossie-openfinance-bolsa.md', category: 'Bolsas' },
      { id: 'mapeamento-questoes', title: 'Mapeamento Exaustivo das 148 Questões Anteriores', file: 'docs/mapeamento-completo-questoes.md', category: 'Provas' },
      { id: 'analise-conteudos-provas', title: 'Análise Estatística de Provas Anteriores', file: 'docs/analise-conteudos-provas.md', category: 'Provas' },
      { id: 'guia-preparacao', title: 'Guia Estratégico do Candidato 2027 (8 Semanas)', file: 'docs/guia-preparacao.md', category: 'Estratégia' },
      { id: 'mission', title: 'Missão do Candidato 2027 (Framework Matt Pocock)', file: 'MISSION.md', category: 'Pedagogia' },
      { id: 'glossary', title: 'Glossário Canônico Inteli 2027', file: 'GLOSSARY.md', category: 'Pedagogia' },
      { id: 'agent-guide', title: 'Manual do Agente Especialista Inteli 2027', file: 'AGENT.md', category: 'Agente OMP' }
    ];
    sendJson(res, 200, { success: true, docs });
    return;
  }

  // GET /api/trilha-inteligente
  if (pathname === '/api/trilha-inteligente' && method === 'GET') {
    const trilhaFile = path.join(REPO_ROOT, 'src', 'lessons', 'trilha-inteligente.json');
    if (fs.existsSync(trilhaFile)) {
      const data = JSON.parse(fs.readFileSync(trilhaFile, 'utf8'));
      sendJson(res, 200, { success: true, trilha: data });
    } else {
      sendError(res, 404, 'Trilha inteligente não encontrada');
    }
    return;
  }

  // GET /api/doc-content
  if (pathname === '/api/doc-content' && method === 'GET') {
    const docPath = reqUrl.searchParams.get('file') || 'docs/edital-vestibular.md';
    const targetFile = path.resolve(REPO_ROOT, docPath);
    if (!targetFile.startsWith(REPO_ROOT) || !fs.existsSync(targetFile)) {
      sendError(res, 404, 'Documento não encontrado');
      return;
    }
    const content = fs.readFileSync(targetFile, 'utf8');
    sendJson(res, 200, { success: true, file: docPath, content });
    return;
  }

  // GET /api/raw-files
  if (pathname === '/api/raw-files' && method === 'GET') {
    const rawDir = path.join(REPO_ROOT, 'data', 'raw');
    const files = fs.existsSync(rawDir) ? fs.readdirSync(rawDir).filter(f => f.endsWith('.pdf')) : [];
    const descriptions = {
      'Provas-Inteli.pdf': 'Caderno Oficial com 86 páginas de Provas Anteriores Inteli (2022 a 2023)',
      'Gabarito-Final-Prova-PS-2025.1.pdf': 'Caderno e Gabarito Comentado Oficial do Processo Seletivo Adaptativo 2025.1 (77 páginas)',
      'Edital-Vestibular-2026.pdf': 'Edital Oficial Processo Seletivo Graduação Inteli 2026',
      'Edital-Bolsas-2027.pdf': 'Edital Oficial Programa de Bolsas de Estudo Inteli 2027 (Ciclo Atual)',
      'Edital-Bolsas-2026.pdf': 'Edital Oficial Programa de Bolsas de Estudo Inteli 2026',
      'Edital-Vestibular-2025.pdf': 'Edital Oficial Processo Seletivo Graduação Inteli 2025',
      'Edital-Bolsas-2025.pdf': 'Edital Oficial Programa de Bolsas de Estudo Inteli 2025',
      'Book-Bolsistas.pdf': 'Livro de Bolsistas Inteli: Perfis, Trajetórias e Relatos Reais',
      'Guia-Bolsas-Ebook.pdf': 'Guia Ilustrado do Processo Seletivo de Bolsas de Estudo'
    };
    const items = files.map(f => {
      const stats = fs.statSync(path.join(rawDir, f));
      return {
        filename: f,
        sizeMb: (stats.size / (1024 * 1024)).toFixed(1) + ' MB',
        description: descriptions[f] || 'Documento Oficial Inteli',
        url: `/data/raw/${f}`
      };
    });
    sendJson(res, 200, { success: true, files: items });
    return;
  }

  // GET /api/references
  if (pathname === '/api/references' && method === 'GET') {
    const refs = [
      { id: 'matematica', title: 'Folha de Consulta: Matemática Aplicada & Otimização', file: 'reference/matematica-inteli.html', url: '/reference/matematica-inteli.html' },
      { id: 'logica', title: 'Folha de Consulta: Lógica Computacional & Algoritmos', file: 'reference/logica-computacional.html', url: '/reference/logica-computacional.html' },
      { id: 'financas', title: 'Folha de Consulta: Finanças de Startups & Métricas Tech', file: 'reference/financas-startups.html', url: '/reference/financas-startups.html' },
      { id: 'polinomios', title: 'Folha de Consulta: Polinômios, Exponenciais & Logaritmos', file: 'reference/polinomios-funcoes.html', url: '/reference/polinomios-funcoes.html' },
      { id: 'matrizes', title: 'Folha de Consulta: Matrizes, Determinantes & Sistemas Lineares', file: 'reference/matrizes-sistemas-lineares.html', url: '/reference/matrizes-sistemas-lineares.html' },
      { id: 'sequencias', title: 'Folha de Consulta: Sequências PA/PG & Recorrências', file: 'reference/sequencias-pa-pg.html', url: '/reference/sequencias-pa-pg.html' },
      { id: 'geometria', title: 'Folha de Consulta: Geometria Plana, Espacial & Euler', file: 'reference/geometria-plana-espacial.html', url: '/reference/geometria-plana-espacial.html' },
      { id: 'trigonometria', title: 'Folha de Consulta: Trigonometria, Vetores & Produto Escalar', file: 'reference/trigonometria-vetores.html', url: '/reference/trigonometria-vetores.html' },
      { id: 'conjuntos', title: 'Folha de Consulta: Conjuntos, Probabilidade & Dispersão', file: 'reference/conjuntos-probabilidade.html', url: '/reference/conjuntos-probabilidade.html' }
    ];
    sendJson(res, 200, { success: true, references: refs });
    return;
  }
  // 404 for unknown /api routes
  if (pathname.startsWith('/api/')) {
    sendError(res, 404, `Rota de API desconhecida: ${method} ${pathname}`);
    return;
  }

  // ==========================================
  // STATIC FILE SERVING
  // ==========================================

  if (method !== 'GET' && method !== 'HEAD') {
    sendError(res, 405, `Método ${method} não permitido`);
    return;
  }

  const resolved = resolveStaticPath(pathname);

  if (resolved.forbidden) {
    sendError(res, 403, 'Acesso Proibido');
    return;
  }

  if (resolved.exists && resolved.filePath) {
    const ext = path.extname(resolved.filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const stat = fs.statSync(resolved.filePath);

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stat.size,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        ...CORS_HEADERS,
      });

      if (method === 'HEAD') {
        res.end();
        return;
      }

      const stream = fs.createReadStream(resolved.filePath);
      stream.pipe(res);
      stream.on('error', err => {
        console.error('[Server] Erro no stream de arquivo:', err);
        if (!res.headersSent) {
          sendError(res, 500, 'Erro interno na transmissão do arquivo');
        }
      });
      return;
    } catch (err) {
      sendError(res, 500, `Erro ao acessar arquivo: ${err.message}`);
      return;
    }
  }

  // Fallback for root / or index.html if platform/index.html is still being authored
  if (resolved.fallbackIndex) {
    const fallbackHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Inteli Vestibular // Simulador</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0b0f17; color: #f0f4fc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .card { background: #131a26; padding: 2rem 3rem; border-radius: 12px; border: 1px solid #1f2a3d; text-align: center; max-width: 500px; }
    h1 { color: #00d2ff; font-size: 1.5rem; margin-bottom: 0.5rem; }
    p { color: #94a3b8; line-height: 1.6; }
    .badge { display: inline-block; background: #00d2ff22; color: #00d2ff; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.85rem; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🎓 Plataforma de Simulação Inteli</h1>
    <p>O servidor backend está operacional e pronto para atender as APIs e o cliente web.</p>
    <div class="badge">Status: Online</div>
  </div>
</body>
</html>`;
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': Buffer.byteLength(fallbackHtml),
      ...CORS_HEADERS,
    });
    res.end(fallbackHtml);
    return;
  }

  sendError(res, 404, `Recurso não encontrado: ${pathname}`);
}

/**
 * Checks if a TCP port is open and available on the specified host
 */
export function isPortAvailable(port, host = '127.0.0.1') {
  return new Promise(resolve => {
    const tester = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        tester.once('close', () => resolve(true)).close();
      })
      .listen(port, host);
  });
}

/**
 * Scans sequentially for the first free port starting from startPort
 */
export async function findFreePort(startPort = 3000, maxAttempts = 50, host = '127.0.0.1') {
  let port = Number(startPort);
  for (let i = 0; i < maxAttempts; i++) {
    const available = await isPortAvailable(port, host);
    if (available) {
      return port;
    }
    port++;
  }
  throw new Error(`Nenhuma porta livre encontrada após ${maxAttempts} tentativas a partir de ${startPort}`);
}

/**
 * Creates the HTTP server instance
 */
export function createServer() {
  return http.createServer(handleRequest);
}

/**
 * Starts the server on a preferred port (or next available free port)
 */
export async function startServer(options = {}) {
  const preferredPort = Number(options.port || 3000);
  const host = options.host || '127.0.0.1';

  const port = await findFreePort(preferredPort, 50, host);
  const server = createServer();

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => {
      resolve();
    });
  });

  const address = server.address();
  const actualPort = typeof address === 'object' && address !== null ? address.port : port;
  const url = `http://${host === '0.0.0.0' ? 'localhost' : host}:${actualPort}/`;

  return {
    server,
    port: actualPort,
    host,
    url,
    stop: () => new Promise(resolve => server.close(resolve)),
  };
}

// Auto-start if executed directly via node platform/server.mjs
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  startServer({ port: 3000 })
    .then(({ url, port }) => {
      console.log(`\n🚀 Inteli Server rodando em ${url} (porta ${port})\n`);
    })
    .catch(err => {
      console.error('Falha ao iniciar servidor:', err);
      process.exit(1);
    });
}
