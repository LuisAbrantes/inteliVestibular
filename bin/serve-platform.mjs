#!/usr/bin/env node

/**
 * Inteli Exam Simulation Platform — CLI Runner & Server Daemon
 *
 * Usage:
 *   node bin/serve-platform.mjs [--port 3000]
 *   node bin/serve-platform.mjs --test
 *   node bin/serve-platform.mjs --help
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer, REPO_ROOT } from '../platform/server.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    port: 3000,
    host: '127.0.0.1',
    test: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--test' || arg === '-t') {
      options.test = true;
    } else if (arg === '--port' || arg === '-p') {
      options.port = parseInt(args[++i], 10) || 3000;
    } else if (arg === '--host') {
      options.host = args[++i] || '127.0.0.1';
    }
  }

  return options;
}

function printHelp() {
  console.log(`
🎓 Inteli Vestibular — Servidor da Plataforma de Simulação

USO:
  node bin/serve-platform.mjs [opções]

OPÇÕES:
  --port, -p <porta>    Porta HTTP preferencial (padrão: 3000). Busca porta livre automaticamente.
  --host <ip>           Host para escuta (padrão: 127.0.0.1)
  --test, -t            Executa bateria de testes automatizados nas rotas e encerra com código 0
  --help, -h            Exibe esta ajuda

EXEMPLOS:
  node bin/serve-platform.mjs
  node bin/serve-platform.mjs --port 8080
  node bin/serve-platform.mjs --test
`);
}

function printBanner(url, port) {
  const displayHost = url.replace(/\/$/, '');
  console.log(`
\x1b[36m╔══════════════════════════════════════════════════════════════════════════════╗\x1b[0m
\x1b[36m║\x1b[0m   \x1b[1m\x1b[37m🎓 INTELI VESTIBULAR // PLATAFORMA DE SIMULAÇÃO & TREINAMENTO\x1b[0m            \x1b[36m║\x1b[0m
\x1b[36m║\x1b[0m   \x1b[90mSimulador Oficial TRI & Adaptativo + Motor de Lições Pocock/Tufte\x1b[0m          \x1b[36m║\x1b[0m
\x1b[36m╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m

  \x1b[32m✔ Servidor ativo com sucesso na porta ${port}\x1b[0m

  \x1b[1m\x1b[33m🌐 Plataforma Web:\x1b[0m      ${displayHost}/
  \x1b[1m\x1b[35m📊 API Stats:\x1b[0m           ${displayHost}/api/stats
  \x1b[1m\x1b[34m❓ API Questions:\x1b[0m       ${displayHost}/api/questions
  \x1b[1m\x1b[32m📚 API Lessons:\x1b[0m         ${displayHost}/api/lessons

  \x1b[90mPressione Ctrl+C para encerrar o servidor.\x1b[0m
`);
}

async function runSelfTest(serverInstance) {
  const { url, stop } = serverInstance;
  console.log(`\n🧪 \x1b[1mIniciando auto-teste de rotas em ${url}...\x1b[0m\n`);

  const tests = [];

  // Helper test runner
  async function testRoute(name, fn) {
    const start = Date.now();
    try {
      await fn();
      const elapsed = Date.now() - start;
      console.log(`  \x1b[32m✔\x1b[0m [${elapsed}ms] ${name}`);
      tests.push({ name, passed: true, elapsed });
    } catch (err) {
      const elapsed = Date.now() - start;
      console.error(`  \x1b[31m✖\x1b[0m [${elapsed}ms] ${name}: ${err.message}`);
      tests.push({ name, passed: false, elapsed, error: err.message });
    }
  }

  // Test 1: Root /
  await testRoute('GET / (Index Web)', async () => {
    const res = await fetch(url);
    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const text = await res.text();
    if (!text.includes('<html') && !text.includes('Inteli')) {
      throw new Error('Conteúdo HTML esperado no root');
    }
  });

  // Test 2: GET /api/questions
  await testRoute('GET /api/questions (Banco de Questões)', async () => {
    const res = await fetch(`${url}api/questions`);
    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const json = await res.json();
    if (!json || typeof json !== 'object') throw new Error('Objeto JSON esperado');
  });

  // Test 3: GET /api/stats
  await testRoute('GET /api/stats (Estatísticas do Aluno)', async () => {
    const res = await fetch(`${url}api/stats`);
    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.summary) throw new Error('Campo summary esperado em /api/stats');
  });

  // Test 4: POST /api/save-performance
  await testRoute('POST /api/save-performance (Persistência de Telemetria)', async () => {
    const payload = {
      sessionId: 'test_session_automated',
      mode: 'diagnostic',
      score: 18,
      total: 20,
      percentage: 90,
      proficiency: 'Avançado',
      timeTaken: 1200,
      topicBreakdown: {
        'Análise Combinatória': { correct: 5, total: 5 },
        'Probabilidade': { correct: 4, total: 5 },
        'Álgebra Linear': { correct: 9, total: 10 },
      },
      answers: [
        { id: 1, topic: 'Análise Combinatória', isCorrect: true },
        { id: 2, topic: 'Probabilidade', isCorrect: false },
      ],
    };

    const res = await fetch(`${url}api/save-performance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.updatedStats) {
      throw new Error('Retorno inválido ao salvar performance');
    }
    if (json.updatedStats.totalExams < 1) {
      throw new Error('Total de exames não incrementado');
    }
  });

  // Test 5: GET /api/lessons
  await testRoute('GET /api/lessons (Catálogo de Lições)', async () => {
    const res = await fetch(`${url}api/lessons`);
    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const json = await res.json();
    if (!json.success || !Array.isArray(json.lessons)) {
      throw new Error('Lista de lições esperada');
    }
    if (json.lessons.length === 0) {
      throw new Error('Pelo menos uma lição esperada no catálogo');
    }
  });

  // Test 6: POST /api/generate-lesson
  await testRoute('POST /api/generate-lesson (Geração e Avaliação Sob Demanda)', async () => {
    const res = await fetch(`${url}api/generate-lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: 'combinatoria' }),
    });

    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.lessonUrl || typeof json.evalScore !== 'number') {
      throw new Error('Resposta de geração de lição incompleta');
    }
    if (json.evalScore < 80) {
      throw new Error(`Pontuação pedagógica muito baixa: ${json.evalScore}`);
    }

    // Clean up temporary lesson generated for test
    if (json.fileName) {
      const tempPath = path.join(REPO_ROOT, 'lessons', json.fileName);
      if (fs.existsSync(tempPath)) {
        try {
          fs.unlinkSync(tempPath);
        } catch {}
      }
    }
  });

  // Test 7: Static file serving (Assets & CSS)
  await testRoute('GET /assets/lesson.css (Arquivo Estático com MIME correto)', async () => {
    const res = await fetch(`${url}assets/lesson.css`);
    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const type = res.headers.get('content-type') || '';
    if (!type.includes('text/css')) {
      throw new Error(`Content-Type incorreto: ${type}`);
    }
  });

  // Test 8: GET /api/docs-catalog
  await testRoute('GET /api/docs-catalog (Catálogo de Dossiês)', async () => {
    const res = await fetch(`${url}api/docs-catalog`);
    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const json = await res.json();
    if (!json.success || !Array.isArray(json.docs)) throw new Error('docs array esperado');
  });

  // Test 9: GET /api/doc-content
  await testRoute('GET /api/doc-content (Leitor de Dossiê)', async () => {
    const res = await fetch(`${url}api/doc-content?file=docs/edital-vestibular.md`);
    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.content) throw new Error('content esperado');
  });

  // Test 10: GET /api/raw-files
  await testRoute('GET /api/raw-files (Biblioteca de PDFs)', async () => {
    const res = await fetch(`${url}api/raw-files`);
    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const json = await res.json();
    if (!json.success || !Array.isArray(json.files)) throw new Error('files array esperado');
  });

  // Test 11: GET /api/harness-health
  await testRoute('GET /api/harness-health (Auditoria de Saúde do Harness)', async () => {
    const res = await fetch(`${url}api/harness-health`);
    if (res.status !== 200) throw new Error(`Status esperado 200, obteve ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.health) throw new Error('health esperado');
  });

  // Stop server
  await stop();

  const passedCount = tests.filter(t => t.passed).length;
  const failedCount = tests.filter(t => !t.passed).length;

  console.log(`\n\x1b[1mResultado:\x1b[0m ${passedCount}/${tests.length} rotas verificadas com sucesso.`);

  if (failedCount > 0) {
    console.error(`\x1b[31m${failedCount} testes falharam!\x1b[0m\n`);
    process.exit(1);
  } else {
    console.log(`\x1b[32m✔ Todos os endpoints da plataforma estão operacionais!\x1b[0m\n`);
    process.exit(0);
  }
}

async function main() {
  const options = parseArgs();

  if (options.help) {
    printHelp();
    return;
  }

  try {
    const serverInstance = await startServer({
      port: options.port,
      host: options.host,
    });

    if (options.test) {
      await runSelfTest(serverInstance);
      return;
    }

    printBanner(serverInstance.url, serverInstance.port);

    const shutdown = async signal => {
      console.log(`\n\x1b[33mRecebido ${signal}. Encerrando servidor...\x1b[0m`);
      await serverInstance.stop();
      console.log('\x1b[32mServidor encerrado com sucesso.\x1b[0m');
      process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (err) {
    console.error(`\x1b[31mErro fatal ao iniciar servidor:\x1b[0m ${err.message}`);
    process.exit(1);
  }
}

main();
