#!/usr/bin/env node

/**
 * CLI for Pedagogical Evals Engine (Teach Methodology & Tufte Aesthetics)
 *
 * Usage:
 *   node bin/eval-lesson.mjs <lesson-path>
 *   node bin/eval-lesson.mjs --all
 *   node bin/eval-lesson.mjs --all --json
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateLessonFile, PASS_THRESHOLD } from '../src/evals/evaluator.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const LESSONS_DIR = path.join(ROOT_DIR, 'lessons');

// Terminal ANSI colors
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
  bgGreen: '\x1b[42m\x1b[30m',
  bgRed: '\x1b[41m\x1b[37m',
  bgYellow: '\x1b[43m\x1b[30m',
};

function printHelp() {
  console.log(`
${c.bold}PEDAGOGICAL EVALS ENGINE - Matt Pocock "Teach" Methodology${c.reset}
Avalia lições interativas com foco em retenção cognitiva, simetria de distratores e estética Tufte.

${c.bold}USO:${c.reset}
  node bin/eval-lesson.mjs <caminho-da-licao.html>
  node bin/eval-lesson.mjs --all
  node bin/eval-lesson.mjs --all --json

${c.bold}OPÇÕES:${c.reset}
  --all           Avalia todas as lições presentes no diretório lessons/
  --json          Emite o relatório estruturado em formato JSON
  --threshold <N> Altera a nota de corte para aprovação (padrão: 80)
  -h, --help      Exibe esta mensagem de ajuda
`);
}

/**
 * Formats a score into a colored string
 */
function colorScore(score, threshold = 80) {
  if (score >= 90) return `${c.green}${c.bold}${score.toFixed(1)}${c.reset}`;
  if (score >= threshold) return `${c.green}${score.toFixed(1)}${c.reset}`;
  if (score >= 60) return `${c.yellow}${score.toFixed(1)}${c.reset}`;
  return `${c.red}${c.bold}${score.toFixed(1)}${c.reset}`;
}

/**
 * Formats a status badge
 */
function formatStatus(status) {
  if (status === 'PASS') return `${c.bgGreen} PASS ${c.reset}`;
  if (status === 'WARN') return `${c.bgYellow} WARN ${c.reset}`;
  return `${c.bgRed} FAIL ${c.reset}`;
}

/**
 * Prints detailed evaluation of a single lesson
 */
function printSingleReport(report, threshold) {
  const isPass = report.overallScore >= threshold;
  const badge = isPass
    ? `${c.bgGreen}${c.bold} APROVADA (GRADE ${report.grade}) ${c.reset}`
    : `${c.bgRed}${c.bold} REPROVADA (GRADE ${report.grade}) ${c.reset}`;

  console.log(`\n${c.bold}======================================================================${c.reset}`);
  console.log(`${c.cyan}${c.bold}Lição:${c.reset} ${report.title || path.basename(report.file)}`);
  console.log(`${c.gray}Arquivo:${c.reset} ${report.file}`);
  console.log(`${c.bold}Pontuação Geral:${c.reset} ${colorScore(report.overallScore, threshold)} / 100   ${badge}`);
  console.log(`${c.bold}======================================================================${c.reset}\n`);

  console.log(`${c.bold}DIMENSÕES PEDAGÓGICAS:${c.reset}`);
  console.log(`${c.gray}${'Dimensão'.padEnd(24)} ${'Peso'.padStart(6)} ${'Nota'.padStart(8)} ${'Pond.'.padStart(8)} ${'Status'.padStart(10)}${c.reset}`);
  console.log(`${c.gray}${'-'.repeat(60)}${c.reset}`);

  const dimLabels = {
    cognitive_load: '1. Carga Cognitiva',
    retrieval_practice: '2. Prática Recuperação',
    distractor_symmetry: '3. Simetria Distratores',
    inteli_alignment: '4. Alinhamento Inteli',
    tufte_aesthetic: '5. Estética Tufte',
    pedagogical_clarity: '6. Clareza Pedagógica',
  };

  for (const [key, dim] of Object.entries(report.dimensions)) {
    const label = dimLabels[key] || key;
    const weightStr = `${Math.round(dim.weight * 100)}%`;
    const scoreStr = `${dim.score}/100`;
    const weightedStr = dim.weightedScore.toFixed(1);
    const statusBadge = formatStatus(dim.status);

    console.log(
      `${label.padEnd(24)} ${weightStr.padStart(6)} ${scoreStr.padStart(8)} ${weightedStr.padStart(8)} ${statusBadge.padStart(16)}`
    );
  }
  console.log(`${c.gray}${'-'.repeat(60)}${c.reset}`);

  // Print diagnostics / stats
  const stats = report.summary.stats;
  console.log(`\n${c.bold}MÉTRICAS DETECTADAS:${c.reset}`);
  console.log(`  • Palavras: ${c.bold}${stats.wordCount}${c.reset} (~${stats.readingTimeMinutes} min de leitura)`);
  console.log(`  • Questões no Quiz: ${c.bold}${stats.questionCount}${c.reset}`);
  console.log(`  • Sidenotes / Marginnotes: ${c.bold}${stats.sidenoteCount}${c.reset}`);
  console.log(`  • Termos Inteli/Tech/Negócios: ${c.bold}${stats.inteliMatches}${c.reset} ocorrências`);

  // Print recommendations if any
  if (report.summary.improvements.length > 0) {
    console.log(`\n${c.yellow}${c.bold}RECOMENDAÇÕES PEDAGÓGICAS (POCOCK / TUFTE):${c.reset}`);
    for (const rec of report.summary.improvements) {
      console.log(`  ${c.yellow}⚠${c.reset} ${rec}`);
    }
  } else {
    console.log(`\n${c.green}✔ Nenhum ponto crítico encontrado. Excelente aplicação metodológica!${c.reset}`);
  }
  console.log('');
}

/**
 * Prints summary table for all evaluated lessons
 */
function printBatchSummary(reports, threshold) {
  console.log(`\n${c.bold}=========================================================================================================${c.reset}`);
  console.log(`${c.bold}${c.cyan}RESUMO GERAL DE AVALIAÇÕES PEDAGÓGICAS - INTELI VESTIBULAR${c.reset}`);
  console.log(`${c.bold}=========================================================================================================${c.reset}\n`);

  console.log(
    `${c.gray}${'Arquivo'.padEnd(30)} ${'Nota'.padStart(6)} ${'Grd'.padStart(4)} ${'Carga'.padStart(6)} ${'Quiz'.padStart(6)} ${'Simetr'.padStart(7)} ${'Inteli'.padStart(7)} ${'Tufte'.padStart(6)} ${'Clar'.padStart(6)}  ${'Status'}${c.reset}`
  );
  console.log(`${c.gray}${'-'.repeat(96)}${c.reset}`);

  let passCount = 0;
  let totalScoreSum = 0;

  for (const rep of reports) {
    const shortFile = path.basename(rep.file);
    const scoreStr = colorScore(rep.overallScore, threshold);
    const gradeStr = rep.grade;
    const cLoad = rep.dimensions.cognitive_load.score.toString();
    const cQuiz = rep.dimensions.retrieval_practice.score.toString();
    const cSim = rep.dimensions.distractor_symmetry.score.toString();
    const cInteli = rep.dimensions.inteli_alignment.score.toString();
    const cTufte = rep.dimensions.tufte_aesthetic.score.toString();
    const cClar = rep.dimensions.pedagogical_clarity.score.toString();
    const statusBadge = rep.overallScore >= threshold
      ? `${c.green}PASS${c.reset}`
      : `${c.red}FAIL${c.reset}`;

    if (rep.overallScore >= threshold) passCount++;
    totalScoreSum += rep.overallScore;

    console.log(
      `${shortFile.slice(0, 30).padEnd(30)} ${scoreStr.padStart(15)} ${gradeStr.padStart(4)} ${cLoad.padStart(6)} ${cQuiz.padStart(6)} ${cSim.padStart(7)} ${cInteli.padStart(7)} ${cTufte.padStart(6)} ${cClar.padStart(6)}  ${statusBadge}`
    );
  }

  console.log(`${c.gray}${'-'.repeat(96)}${c.reset}`);
  const avg = reports.length > 0 ? (totalScoreSum / reports.length).toFixed(1) : '0';
  console.log(
    `Total: ${c.bold}${reports.length}${c.reset} lições | Aprovadas: ${c.green}${passCount}${c.reset} | Reprovadas: ${c.red}${reports.length - passCount}${c.reset} | Média Geral: ${colorScore(Number(avg), threshold)}/100`
  );
  console.log('');
}

async function findHtmlFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const subFiles = await findHtmlFiles(fullPath);
        files = files.concat(subFiles);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
    return files;
  } catch (err) {
    return [];
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  let isAll = false;
  let isJson = false;
  let threshold = PASS_THRESHOLD;
  const targetFiles = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--all') {
      isAll = true;
    } else if (arg === '--json') {
      isJson = true;
    } else if (arg === '--threshold' && i + 1 < args.length) {
      threshold = parseFloat(args[++i]) || PASS_THRESHOLD;
    } else if (!arg.startsWith('-')) {
      targetFiles.push(arg);
    }
  }

  if (isAll) {
    const found = await findHtmlFiles(LESSONS_DIR);
    if (found.length === 0) {
      if (isJson) {
        console.log(JSON.stringify({ error: `Nenhuma lição encontrada em ${LESSONS_DIR}` }, null, 2));
      } else {
        console.error(`${c.red}Erro: Nenhuma lição (.html) encontrada em ${LESSONS_DIR}${c.reset}`);
        console.error(`Gere lições primeiro usando node bin/generate-lesson.mjs`);
      }
      process.exit(1);
    }
    targetFiles.push(...found);
  }

  if (targetFiles.length === 0) {
    console.error(`${c.red}Erro: Nenhum arquivo de lição fornecido.${c.reset}`);
    printHelp();
    process.exit(1);
  }

  const reports = [];
  let allPassed = true;

  for (const file of targetFiles) {
    const resolvedPath = path.resolve(process.cwd(), file);
    try {
      const report = await evaluateLessonFile(resolvedPath);
      reports.push(report);
      if (report.overallScore < threshold) {
        allPassed = false;
      }
      if (!isJson && !isAll) {
        printSingleReport(report, threshold);
      }
    } catch (err) {
      console.error(`${c.red}Erro ao avaliar ${file}: ${err.message}${c.reset}`);
      allPassed = false;
    }
  }

  if (isJson) {
    console.log(JSON.stringify({
      evaluatedCount: reports.length,
      passedCount: reports.filter(r => r.overallScore >= threshold).length,
      allPassed,
      threshold,
      lessons: reports,
    }, null, 2));
  } else if (isAll) {
    printBatchSummary(reports, threshold);
  }

  process.exit(allPassed ? 0 : 1);
}

main().catch((err) => {
  console.error('Fatal error in eval-lesson:', err);
  process.exit(1);
});
