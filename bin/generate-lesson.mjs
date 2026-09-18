#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  generateLesson,
  getAvailableBlueprints,
  BLUEPRINTS
} from '../src/lessons/generator.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_LESSONS_DIR = path.join(REPO_ROOT, 'lessons');

function printUsage() {
  console.log(`
🎓 Inteli Vestibular — Gerador de Lições Interativas Sob Demanda
Metodologia de Ensino Acelerado (Matt Pocock + Tufte CSS + TRI Inteli)

USO:
  node bin/generate-lesson.mjs <topico> [opções]
  node bin/generate-lesson.mjs --list
  node bin/generate-lesson.mjs --help

COMANDOS & FLAGS:
  --list, -l           Lista todos os tópicos e blueprints disponíveis no catálogo
  --custom, -c <texto> Gera uma lição sob medida a partir de um prompt ou tema livre
  --title, -t <titulo> Sobrescreve o título da lição gerada
  --out, -o <diretorio> Define a pasta de saída (padrão: lessons/)
  --help, -h           Exibe esta mensagem de ajuda

EXEMPLOS:
  node bin/generate-lesson.mjs combinatoria
  node bin/generate-lesson.mjs funcoes-otimizacao
  node bin/generate-lesson.mjs logica-proposicional
  node bin/generate-lesson.mjs probabilidade-condicional
  node bin/generate-lesson.mjs algoritmos-pseudocodigo
  node bin/generate-lesson.mjs geometria-metricas
  node bin/generate-lesson.mjs estatistica-dados
  node bin/generate-lesson.mjs "Criptografia de Curvas Elípticas em Web3" --custom
`);
}

function handleList() {
  const blueprints = getAvailableBlueprints();
  console.log(`\n📚 Catálogo de Blueprints Oficiais (Baseados no Vestibular Inteli):\n`);
  
  blueprints.forEach((bp, index) => {
    console.log(`  ${index + 1}. [${bp.key}]`);
    console.log(`     Título:      ${bp.title}`);
    console.log(`     Eixo:        ${bp.topic}`);
    console.log(`     Tempo Est.:  ⏱️ ${bp.estimatedMinutes} min | ${bp.targetTrack}`);
    console.log(`     Slug:        ${bp.slug}\n`);
  });

  console.log(`Para gerar qualquer lição, execute:`);
  console.log(`  node bin/generate-lesson.mjs <chave-do-topico>\n`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  if (args.includes('--list') || args.includes('-l')) {
    handleList();
    process.exit(0);
  }

  let topic = null;
  let customTitle = null;
  let outputDir = DEFAULT_LESSONS_DIR;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--title' || arg === '-t') {
      customTitle = args[++i];
    } else if (arg === '--out' || arg === '-o') {
      outputDir = path.resolve(process.cwd(), args[++i]);
    } else if (arg === '--custom' || arg === '-c') {
      // Optional explicit prompt next, or marks current as custom
      if (args[i + 1] && !args[i + 1].startsWith('-')) {
        topic = args[++i];
      }
    } else if (!arg.startsWith('-') && !topic) {
      topic = arg;
    }
  }

  if (!topic) {
    console.error('❌ Erro: Nenhum tópico ou prompt fornecido.');
    printUsage();
    process.exit(1);
  }

  try {
    const result = generateLesson(topic, {
      outputDir,
      customTitle
    });

    console.log(`\n✅ Lição gerada com sucesso!`);
    console.log(`   Número:     Lição ${result.lessonNumber}`);
    console.log(`   Título:     ${result.title}`);
    console.log(`   Arquivo:    ${path.relative(REPO_ROOT, result.filePath)}`);
    console.log(`   Tempo:      ⏱️ ${result.estimatedMinutes} minutos`);
    console.log(`   Questões:   🎯 ${result.questionCount} questões de recuperação ativa (com feedback imediato e resolução)`);
    console.log(`\nAbra o arquivo no seu navegador para estudar:\n   open ${result.filePath}\n`);
  } catch (err) {
    console.error(`❌ Falha ao gerar lição:`, err.message);
    process.exit(1);
  }
}

main();
