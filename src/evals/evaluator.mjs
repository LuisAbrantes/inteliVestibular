/**
 * Pedagogical Evals Engine (Matt Pocock "Teach" Methodology & Tufte Aesthetics)
 *
 * Evaluates HTML lesson files across 6 core pedagogical dimensions:
 * 1. cognitive_load (20%) - Word count (400-1200), clean section hierarchy, structured lists.
 * 2. retrieval_practice (20%) - Interactive quiz presence, >=2 active recall questions.
 * 3. distractor_symmetry (15%) - Matt Pocock rule: balanced option lengths, no giveaway answers.
 * 4. inteli_alignment (15%) - High relevance to Inteli curriculum (Tech, Data/Math, Business/Startups).
 * 5. tufte_aesthetic (15%) - Clean typography, sidenotes/marginnotes, formula styling, lesson.css.
 * 6. pedagogical_clarity (15%) - Step-by-step explanations debunking wrong options and justifying right option.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Weights for the 6 core pedagogical dimensions
 */
export const DIMENSION_WEIGHTS = {
  cognitive_load: 0.20,
  retrieval_practice: 0.20,
  distractor_symmetry: 0.15,
  inteli_alignment: 0.15,
  tufte_aesthetic: 0.15,
  pedagogical_clarity: 0.15,
};

export const PASS_THRESHOLD = 80;

/**
 * Strips HTML tags and script/style content to return plain text
 */
export function extractText(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Computes standard deviation of an array of numbers
 */
function standardDeviation(values) {
  if (!values || values.length === 0) return 0;
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

export function parseQuizStructure(html) {
  const questions = [];

  // Strip <script> and <style> tags to avoid matching CSS rules or JS code
  const cleanHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Match question blocks: .quiz-question, .quiz-card, .quiz-item, data-question-id, or standalone .question
  const questionRegex = /<(?:div|fieldset|section|article)[^>]*(?:class=["'][^"']*\b(?:quiz-question|quiz-card|quiz-item)\b[^"']*["']|data-question-id=["'][^"']+["']|class=["'][^"']*\bquestion\b(?![a-zA-Z0-9_\-])[^"']*["'])[^>]*>([\s\S]*?)(?=<(?:div|fieldset|section|article)[^>]*(?:class=["'][^"']*\b(?:quiz-question|quiz-card|quiz-item)\b[^"']*["']|data-question-id=["'][^"']+["']|class=["'][^"']*\bquestion\b(?![a-zA-Z0-9_\-])[^"']*["'])|<\/(?:section|div|form)[^>]*retrieval-quiz|\s*<\/section>|$)/gi;

  let match;
  while ((match = questionRegex.exec(cleanHtml)) !== null) {
    const qBlock = match[1];

    // Extract question stem
    const stemMatch = qBlock.match(/<(?:p|h[2-5]|div)[^>]*class=["'][^"']*(?:question-stem|prompt-question|stem|question-text)[^"']*["'][^>]*>([\s\S]*?)<\/(?:p|h[2-5]|div)>/i) ||
                      qBlock.match(/<(?:p|h[3-5])[^>]*>([\s\S]*?)<\/(?:p|h[3-5])>/i);
    const stem = stemMatch ? extractText(stemMatch[1]) : 'Question prompt';

    // Extract options
    const options = [];
    // Matches <button/li/label/div class="...option..."> or <input type="radio"...>
    const optionRegex = /<(?:button|li|label|div)[^>]*class=["'][^"']*(?:quiz-option|option|choice)[^"']*["']([^>]*)>([\s\S]*?)<\/(?:button|li|label|div)>/gi;

    let optMatch;
    while ((optMatch = optionRegex.exec(qBlock)) !== null) {
      const attrs = optMatch[1];
      const rawText = optMatch[2];
      const text = extractText(rawText).replace(/^[A-E][\)\.\-:]\s*/i, '').trim();

      const isCorrect = /data-correct=["'](?:true|1)["']/i.test(attrs) ||
                        /data-is-correct=["'](?:true|1)["']/i.test(attrs) ||
                        /class=["'][^"']*\b(?:correct|is-correct|correct-option)\b/i.test(attrs) ||
                        /data-answer=["']correct["']/i.test(attrs) ||
                        /value=["']correct["']/i.test(attrs);

      const feedbackMatch = attrs.match(/data-feedback=["']([^"']+)["']/i) ||
                            attrs.match(/data-explanation=["']([^"']+)["']/i);
      const feedback = feedbackMatch ? feedbackMatch[1] : '';

      options.push({
        text,
        charLength: text.length,
        wordCount: text ? text.split(/\s+/).length : 0,
        isCorrect,
        feedback,
      });
    }

    // Also look for resolutions / explanations inside question block
    const resMatch = qBlock.match(/<(?:div|p|section)[^>]*class=["'][^"']*(?:quiz-resolution|resolution|solution|explanation|feedback)[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|p|section)>/i);
    const resolution = resMatch ? extractText(resMatch[1]) : '';

    questions.push({
      stem,
      options,
      resolution,
    });
  }

  // Fallback: If no structured .quiz-question container found, search for options directly
  if (questions.length === 0) {
    const optionRegex = /<(?:button|li|label|div)[^>]*class=["'][^"']*(?:quiz-option|option|choice)[^"']*["']([^>]*)>([\s\S]*?)<\/(?:button|li|label|div)>/gi;
    const standaloneOptions = [];
    let optMatch;
    while ((optMatch = optionRegex.exec(cleanHtml)) !== null) {
      const attrs = optMatch[1];
      const rawText = optMatch[2];
      const text = extractText(rawText).replace(/^[A-E][\)\.\-:]\s*/i, '').trim();
      const isCorrect = /data-correct=["'](?:true|1)["']/i.test(attrs) ||
                        /data-is-correct=["'](?:true|1)["']/i.test(attrs) ||
                        /class=["'][^"']*\b(?:correct|is-correct|correct-option)\b/i.test(attrs) ||
                        /data-answer=["']correct["']/i.test(attrs) ||
                        /value=["']correct["']/i.test(attrs);
      const feedbackMatch = attrs.match(/data-feedback=["']([^"']+)["']/i) ||
                            attrs.match(/data-explanation=["']([^"']+)["']/i);
      standaloneOptions.push({
        text,
        charLength: text.length,
        wordCount: text ? text.split(/\s+/).length : 0,
        isCorrect,
        feedback: feedbackMatch ? feedbackMatch[1] : '',
      });
    }
    if (standaloneOptions.length >= 2) {
      questions.push({
        stem: 'Fallback quiz container',
        options: standaloneOptions,
        resolution: '',
      });
    }
  }

  return questions;
}
/**
 * Evaluates Dimension 1: Cognitive Load (Weight 20%)
 */
export function evalCognitiveLoad(html, text) {
  const recommendations = [];
  const words = text ? text.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  let wordScore = 0;
  if (wordCount >= 400 && wordCount <= 1200) {
    wordScore = 50;
  } else if (wordCount >= 300 && wordCount < 400) {
    wordScore = 38;
    recommendations.push(`A lição é ligeiramente concisa (${wordCount} palavras). Considere expandir o núcleo conceitual com mais 1 exemplo prático.`);
  } else if (wordCount > 1200 && wordCount <= 1500) {
    wordScore = 38;
    recommendations.push(`A lição está longa (${wordCount} palavras). Considere podar divagações para manter a carga cognitiva focada abaixo de 1200 palavras.`);
  } else if (wordCount < 300) {
    wordScore = 20;
    recommendations.push(`Lição muito superficial (${wordCount} palavras). Mínimo recomendado é 400 palavras.`);
  } else {
    wordScore = 20;
    recommendations.push(`Sobrecarga cognitiva detectada: ${wordCount} palavras. Texto muito longo; divida em 2 micro-lições.`);
  }

  // 2. Headings hierarchy (0-30 pts)
  const h1Matches = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
  const h2Matches = html.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [];
  const h3Matches = html.match(/<h3\b[^>]*>[\s\S]*?<\/h3>/gi) || [];
  const totalHeadings = h1Matches.length + h2Matches.length + h3Matches.length;

  let headingScore = 0;
  if (h1Matches.length >= 1 && h2Matches.length >= 2) {
    headingScore = 30;
  } else if (h1Matches.length >= 1 && h2Matches.length === 1) {
    headingScore = 20;
    recommendations.push('Estrutura de seções insuficiente: adicione pelo menos 2 cabeçalhos <h2> separando Cenário e Núcleo Conceitual.');
  } else {
    headingScore = 10;
    recommendations.push('Hierarquia de títulos fraca. Certifique-se de ter um <h1> claro e ao menos dois <h2>.');
  }

  // 3. Structured lists (0-20 pts)
  const ulMatches = html.match(/<ul\b[^>]*>[\s\S]*?<\/ul>/gi) || [];
  const olMatches = html.match(/<ol\b[^>]*>[\s\S]*?<\/ol>/gi) || [];
  const liMatches = html.match(/<li\b[^>]*>[\s\S]*?<\/li>/gi) || [];
  const listCount = ulMatches.length + olMatches.length;

  let listScore = 0;
  if (listCount >= 1 && liMatches.length >= 3) {
    listScore = 20;
  } else if (listCount >= 1) {
    listScore = 15;
  } else {
    listScore = 8;
    recommendations.push('Nenhuma lista com marcadores (<ul>/<ol>) encontrada. Use tópicos estruturados para facilitar a leitura rápida.');
  }

  const score = Math.min(100, Math.round(wordScore + headingScore + listScore));
  const status = score >= 80 ? 'PASS' : score >= 60 ? 'WARN' : 'FAIL';

  return {
    score,
    status,
    details: {
      wordCount,
      estimatedMinutes: Math.round(wordCount / 180),
      h1Count: h1Matches.length,
      h2Count: h2Matches.length,
      h3Count: h3Matches.length,
      listCount,
      listItemCount: liMatches.length,
    },
    recommendations,
  };
}

/**
 * Evaluates Dimension 2: Retrieval Practice (Weight 20%)
 */
export function evalRetrievalPractice(html, questions) {
  const recommendations = [];

  // Check interactive quiz presence
  const hasQuizContainer = /class=["'][^"']*(?:retrieval-quiz|quiz-container|quiz)[^"']*["']/i.test(html) ||
                           /id=["']quiz["']/i.test(html);

  let containerScore = hasQuizContainer ? 30 : 0;
  if (!hasQuizContainer) {
    recommendations.push('Elemento de quiz interativo ausente (<section class="retrieval-quiz" id="quiz">).');
  }

  // Check questions count (at least 2 questions)
  const questionCount = questions.length;
  let countScore = 0;
  if (questionCount >= 2) {
    countScore = 40;
  } else if (questionCount === 1) {
    countScore = 25;
    recommendations.push('Apenas 1 questão no quiz. O padrão pedagógico exige no mínimo 2 questões de recuperação ativa.');
  } else {
    countScore = 0;
    recommendations.push('Nenhuma questão de quiz detectada. Adicione no mínimo 2 questões interativas.');
  }

  // Active recall vs simple recognition check (0-30 pts)
  // Active questions typically involve problem-solving verbs, numbers/calculations, scenarios, code, or outputs
  let activeRecallScore = 0;
  if (questionCount > 0) {
    let activeQuestions = 0;
    const activeIndicators = [
      /\bcalcule\b/i, /\bqual (?:o|a|será)\b/i, /\bdetermine\b/i, /\bse\b.*\bentão\b/i,
      /\bcenário\b/i, /\bresultado\b/i, /\bsaída\b/i, /\bvalor\b/i, /\btaxa\b/i,
      /\btempo\b/i, /\bcusto\b/i, /\bcomo resolver\b/i, /\bapós\b/i, /\bquant[oa]s\b/i,
      /\bprobabilidade\b/i, /\bcomplexidade\b/i, /\b\d+[\.,]?\d*\b/
    ];

    for (const q of questions) {
      const matches = activeIndicators.filter(regex => regex.test(q.stem));
      if (matches.length >= 2 || (q.stem.length > 50 && matches.length >= 1)) {
        activeQuestions++;
      }
    }

    if (activeQuestions >= 2) {
      activeRecallScore = 30;
    } else if (activeQuestions === 1) {
      activeRecallScore = 20;
      recommendations.push('Pelo menos uma questão aparenta ser de simples reconhecimento. Prefira perguntas de aplicação contextual ou cálculo ativo.');
    } else {
      activeRecallScore = 15;
      recommendations.push('As questões devem testar recuperação ativa e raciocínio prático, não mera recordação passiva de termos.');
    }
  }

  const score = Math.min(100, Math.round(containerScore + countScore + activeRecallScore));
  const status = score >= 80 ? 'PASS' : score >= 60 ? 'WARN' : 'FAIL';

  return {
    score,
    status,
    details: {
      hasQuizContainer,
      questionCount,
    },
    recommendations,
  };
}

/**
 * Evaluates Dimension 3: Distractor Symmetry (Weight 15%) - Matt Pocock rule
 */
export function evalDistractorSymmetry(questions) {
  const recommendations = [];

  if (!questions || questions.length === 0) {
    return {
      score: 0,
      status: 'FAIL',
      details: { questionEvaluations: [] },
      recommendations: ['Nenhuma questão encontrada para avaliar a simetria de distratores.'],
    };
  }

  const qEvals = [];
  let totalSymmetryScore = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const opts = q.options;

    if (!opts || opts.length < 2) {
      qEvals.push({
        questionIndex: i + 1,
        score: 40,
        issue: 'Menos de 2 opções na questão.',
      });
      totalSymmetryScore += 40;
      recommendations.push(`Questão ${i + 1}: Possui menos de 2 opções alternativas.`);
      continue;
    }

    const charLengths = opts.map(o => o.charLength);
    const wordCounts = opts.map(o => o.wordCount);
    const meanChars = charLengths.reduce((a, b) => a + b, 0) / charLengths.length;
    const stdChars = standardDeviation(charLengths);
    const cvChars = meanChars > 0 ? (stdChars / meanChars) : 0; // Coefficient of Variation

    let qScore = 100;
    const issues = [];

    // Matt Pocock rule 1: CV of option lengths
    if (cvChars > 0.65) {
      qScore -= 35;
      issues.push(`Grande variação de comprimento entre as opções (CV = ${(cvChars * 100).toFixed(1)}%). Equilibre o tamanho das alternativas.`);
    } else if (cvChars > 0.40) {
      qScore -= 15;
      issues.push(`Variação moderada de comprimento (CV = ${(cvChars * 100).toFixed(1)}%).`);
    }

    // Matt Pocock rule 2: Is the correct answer a giveaway because it's noticeably longer?
    const correctOpt = opts.find(o => o.isCorrect);
    const distractors = opts.filter(o => !o.isCorrect);

    if (correctOpt && distractors.length > 0) {
      const distractorMeanChars = distractors.reduce((sum, d) => sum + d.charLength, 0) / distractors.length;
      const ratio = distractorMeanChars > 0 ? (correctOpt.charLength / distractorMeanChars) : 1;

      if (ratio > 1.6) {
        qScore -= 30;
        issues.push(`A alternativa correta é ${Math.round((ratio - 1) * 100)}% mais longa que a média dos distratores (vício clássico de elaboração).`);
      } else if (ratio < 0.5) {
        qScore -= 20;
        issues.push(`A alternativa correta é excessivamente curta em comparação com os distratores.`);
      }
    } else if (!correctOpt) {
      qScore -= 25;
      issues.push('Nenhuma alternativa marcada explicitamente como correta (ex: data-correct="true").');
    }

    qScore = Math.max(20, qScore);
    totalSymmetryScore += qScore;

    if (issues.length > 0) {
      recommendations.push(`Questão ${i + 1} (Simetria): ${issues.join(' ')}`);
    }

    qEvals.push({
      questionIndex: i + 1,
      optionCount: opts.length,
      meanCharLength: Math.round(meanChars),
      coeffVariation: Number(cvChars.toFixed(2)),
      score: qScore,
      issues,
    });
  }

  const score = Math.round(totalSymmetryScore / questions.length);
  const status = score >= 80 ? 'PASS' : score >= 60 ? 'WARN' : 'FAIL';

  return {
    score,
    status,
    details: {
      questionEvaluations: qEvals,
    },
    recommendations,
  };
}

/**
 * Evaluates Dimension 4: Inteli Alignment (Weight 15%)
 */
export function evalInteliAlignment(text) {
  const recommendations = [];

  const categories = {
    tech: [
      /\balgoritmo[s]?\b/i, /\bsoftware[s]?\b/i, /\bcódigo[s]?\b/i, /\bpython\b/i,
      /\bjavascript\b/i, /\bprogramaç(?:ão|ões)\b/i, /\bfunç(?:ão|ões)\b/i, /\bcomputaç(?:ão|ões)\b/i,
      /\bgrafo[s]?\b/i, /\bvetor(?:es)?\b/i, /\bmatriz(?:es)?\b/i, /\bcomplexidade\b/i,
      /\bbig-o\b/i, /\bestrutura[s]? de dados\b/i, /\bapi[s]?\b/i, /\bbanco[s]? de dados\b/i,
      /\bsql\b/i, /\blat[êe]ncia\b/i, /\bthroughput\b/i, /\bpipeline\b/i, /\bbackend\b/i,
      /\bfrontend\b/i, /\barquitetura\b/i, /\bloop[s]?\b/i, /\bvariável\b/i,
    ],
    dataMath: [
      /\bdado[s]?\b/i, /\bestatística[s]?\b/i, /\bprobabilidade[s]?\b/i, /\bmédia[s]?\b/i,
      /\bmediana[s]?\b/i, /\btaxa[s]?\b/i, /\bcrescimento\b/i, /\bamostragem\b/i,
      /\bdistribuiç(?:ão|ões)\b/i, /\bregressão\b/i, /\botimizaç(?:ão|ões)\b/i,
      /\bmatemática aplicada\b/i, /\bproporç(?:ão|ões)\b/i, /\bporcentagem\b/i,
      /\bequaç(?:ão|ões)\b/i, /\bexponencial\b/i, /\blogaritmo\b/i, /\bcombinatória\b/i,
    ],
    business: [
      /\bstartup[s]?\b/i, /\bmercado[s]?\b/i, /\binvestimento[s]?\b/i, /\bcusto[s]?\b/i,
      /\breceita[s]?\b/i, /\blucro[s]?\b/i, /\bebitda\b/i, /\bvaluation\b/i,
      /\bchurn\b/i, /\bcac\b/i, /\bltv\b/i, /\bescala\b/i, /\bproduto[s]?\b/i,
      /\bnegócio[s]?\b/i, /\btomada de decis(?:ão|ões)\b/i, /\broi\b/i, /\bunit economics\b/i,
      /\bprecificaç(?:ão|ões)\b/i, /\bmonetizaç(?:ão|ões)\b/i,
    ],
    inteliContext: [
      /\binteli\b/i, /\bvestibular\b/i, /\bbolsa[s]?\b/i, /\bprojeto[s]?\b/i,
      /\bdesafio[s]?\b/i, /\bequipe[s]?\b/i, /\bliderança\b/i, /\bmetodologia ativa\b/i,
    ],
  };

  const matchesByCategory = {};
  let totalMatches = 0;
  let activeCategories = 0;

  for (const [cat, regexList] of Object.entries(categories)) {
    const hits = new Set();
    for (const rx of regexList) {
      const match = text.match(rx);
      if (match) {
        hits.add(match[0].toLowerCase());
      }
    }
    matchesByCategory[cat] = Array.from(hits);
    totalMatches += hits.size;
    if (hits.size > 0) activeCategories++;
  }

  let score = 0;
  // Scoring formula based on breadth and depth
  if (activeCategories >= 3 && totalMatches >= 8) {
    score = 100;
  } else if (activeCategories >= 2 && totalMatches >= 5) {
    score = 90;
  } else if (activeCategories >= 2 && totalMatches >= 3) {
    score = 80;
  } else if (activeCategories >= 1 && totalMatches >= 2) {
    score = 65;
    recommendations.push('Alinhamento modesto com o universo Inteli. Incorpore termos de negócios/startups ou tecnologia prática.');
  } else {
    score = 40;
    recommendations.push('Baixo alinhamento com a identidade Inteli. Conecte o problema a situações de engenharia, negócios digitais ou dados.');
  }

  const status = score >= 80 ? 'PASS' : score >= 60 ? 'WARN' : 'FAIL';

  return {
    score,
    status,
    details: {
      totalMatches,
      activeCategories,
      matchesByCategory,
    },
    recommendations,
  };
}

/**
 * Evaluates Dimension 5: Tufte Aesthetic (Weight 15%)
 */
export function evalTufteAesthetic(html) {
  const recommendations = [];

  // 1. Linked lesson.css (25 pts)
  const hasStylesheet = /<link[^>]*rel=["']stylesheet["'][^>]*href=["'][^"']*lesson\.css["']/i.test(html) ||
                        /<style\b/i.test(html);
  let cssScore = hasStylesheet ? 25 : 0;
  if (!hasStylesheet) {
    recommendations.push('Link para o stylesheet oficial de lições ausente (<link rel="stylesheet" href="../assets/lesson.css">).');
  }

  // 2. Sidenotes / Marginnotes (25 pts)
  const sidenoteMatches = html.match(/<(?:aside|span|div)[^>]*class=["'][^"']*(?:sidenote|marginnote)[^"']*["']/gi) ||
                          html.match(/<aside\b[^>]*>/gi) || [];
  const sidenoteCount = sidenoteMatches.length;
  let sidenoteScore = 0;
  if (sidenoteCount >= 2) {
    sidenoteScore = 25;
  } else if (sidenoteCount === 1) {
    sidenoteScore = 18;
    recommendations.push('Apenas 1 sidenote/marginnote encontrada. O estilo Tufte recomenda anotações laterais enriquecedoras ao longo da lição.');
  } else {
    sidenoteScore = 8;
    recommendations.push('Nenhuma sidenote (<aside class="sidenote">) encontrada. O design Tufte valoriza notas marginais contextuais.');
  }

  // 3. Formula / Code styling (25 pts)
  const hasFormula = /class=["'][^"']*(?:formula-card|formula|math)[^"']*["']/i.test(html) ||
                     /<div class=["']formula/i.test(html) ||
                     /<code\b/i.test(html) ||
                     /<pre\b/i.test(html) ||
                     /\$\$[\s\S]+?\$\$/i.test(html);
  let formulaScore = hasFormula ? 25 : 10;
  if (!hasFormula) {
    recommendations.push('Falta de destaque visual para fórmulas, expressões matemáticas ou snippets conceituais (<div class="formula-card"> ou <code>).');
  }

  // 4. Semantic typography and structure (25 pts)
  const semanticTags = ['article', 'header', 'section', 'footer', 'figure', 'blockquote', 'em', 'strong'];
  let semanticMatches = 0;
  for (const tag of semanticTags) {
    if (new RegExp(`<${tag}\\b`, 'i').test(html)) {
      semanticMatches++;
    }
  }

  let semanticScore = 0;
  if (semanticMatches >= 5) {
    semanticScore = 25;
  } else if (semanticMatches >= 3) {
    semanticScore = 18;
  } else {
    semanticScore = 10;
    recommendations.push('Estrutura HTML pouco semântica. Utilize <article>, <header>, <section>, <footer> e <figure>.');
  }

  const score = Math.min(100, Math.round(cssScore + sidenoteScore + formulaScore + semanticScore));
  const status = score >= 80 ? 'PASS' : score >= 60 ? 'WARN' : 'FAIL';

  return {
    score,
    status,
    details: {
      hasStylesheet,
      sidenoteCount,
      hasFormula,
      semanticMatches,
    },
    recommendations,
  };
}

/**
 * Evaluates Dimension 6: Pedagogical Clarity (Weight 15%)
 */
export function evalPedagogicalClarity(html, questions) {
  const recommendations = [];

  // Check for explicit explanations: data-feedback in options, .quiz-resolution, .quiz-feedback, .explanation
  let feedbackCount = 0;
  let hasResolution = false;
  let explainsDistractors = false;

  const resolutionMatches = html.match(/<(?:div|section|p)[^>]*class=["'][^"']*(?:quiz-resolution|resolution|solution|explanation|feedback)[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|section|p)>/gi) || [];
  if (resolutionMatches.length > 0) {
    hasResolution = true;
  }

  for (const q of questions) {
    for (const opt of q.options) {
      if (opt.feedback && opt.feedback.length > 10) {
        feedbackCount++;
      }
    }
    if (q.resolution && q.resolution.length > 20) {
      hasResolution = true;
    }
  }

  // Check if text explains why wrong options are incorrect
  const distractorExplanationRegex = /(?:incorret[ao]|errad[ao]|distrator|fals[ao]|pegadinha|por que não|invalida|não confunda)/i;
  if (distractorExplanationRegex.test(html)) {
    explainsDistractors = true;
  }

  let score = 0;
  if (hasResolution && feedbackCount >= 2 && explainsDistractors) {
    score = 100;
  } else if (hasResolution && explainsDistractors) {
    score = 90;
  } else if (hasResolution || (feedbackCount >= 2 && explainsDistractors)) {
    score = 80;
  } else if (hasResolution || feedbackCount >= 1) {
    score = 65;
    recommendations.push('Forneça justificativa explícita para cada distrator (por que as alternativas erradas estão erradas).');
  } else {
    score = 35;
    recommendations.push('Ausência de resolução detalhada passo a passo (.quiz-resolution) ou feedbacks explicativos nas opções.');
  }

  const status = score >= 80 ? 'PASS' : score >= 60 ? 'WARN' : 'FAIL';

  return {
    score,
    status,
    details: {
      hasResolution,
      feedbackCount,
      explainsDistractors,
    },
    recommendations,
  };
}

/**
 * Evaluates an entire HTML lesson
 *
 * @param {string} htmlContent - HTML string of the lesson
 * @param {string} [filePath=''] - Optional file path or name
 * @returns {object} Full evaluation report
 */
export function evaluateLesson(htmlContent, filePath = '') {
  const plainText = extractText(htmlContent);
  const questions = parseQuizStructure(htmlContent);

  // Extract title
  const titleMatch = htmlContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) ||
                     htmlContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? extractText(titleMatch[1]) : path.basename(filePath, '.html');

  // Evaluate each dimension
  const cognitive_load = evalCognitiveLoad(htmlContent, plainText);
  const retrieval_practice = evalRetrievalPractice(htmlContent, questions);
  const distractor_symmetry = evalDistractorSymmetry(questions);
  const inteli_alignment = evalInteliAlignment(plainText);
  const tufte_aesthetic = evalTufteAesthetic(htmlContent);
  const pedagogical_clarity = evalPedagogicalClarity(htmlContent, questions);

  const dimensions = {
    cognitive_load: {
      ...cognitive_load,
      weight: DIMENSION_WEIGHTS.cognitive_load,
      weightedScore: Number((cognitive_load.score * DIMENSION_WEIGHTS.cognitive_load).toFixed(2)),
    },
    retrieval_practice: {
      ...retrieval_practice,
      weight: DIMENSION_WEIGHTS.retrieval_practice,
      weightedScore: Number((retrieval_practice.score * DIMENSION_WEIGHTS.retrieval_practice).toFixed(2)),
    },
    distractor_symmetry: {
      ...distractor_symmetry,
      weight: DIMENSION_WEIGHTS.distractor_symmetry,
      weightedScore: Number((distractor_symmetry.score * DIMENSION_WEIGHTS.distractor_symmetry).toFixed(2)),
    },
    inteli_alignment: {
      ...inteli_alignment,
      weight: DIMENSION_WEIGHTS.inteli_alignment,
      weightedScore: Number((inteli_alignment.score * DIMENSION_WEIGHTS.inteli_alignment).toFixed(2)),
    },
    tufte_aesthetic: {
      ...tufte_aesthetic,
      weight: DIMENSION_WEIGHTS.tufte_aesthetic,
      weightedScore: Number((tufte_aesthetic.score * DIMENSION_WEIGHTS.tufte_aesthetic).toFixed(2)),
    },
    pedagogical_clarity: {
      ...pedagogical_clarity,
      weight: DIMENSION_WEIGHTS.pedagogical_clarity,
      weightedScore: Number((pedagogical_clarity.score * DIMENSION_WEIGHTS.pedagogical_clarity).toFixed(2)),
    },
  };

  const overallScoreRaw = Object.values(dimensions).reduce((sum, dim) => sum + dim.weightedScore, 0);
  const overallScore = Math.min(100, Math.max(0, Number(overallScoreRaw.toFixed(1))));

  let grade = 'F';
  if (overallScore >= 90) grade = 'A';
  else if (overallScore >= 80) grade = 'B';
  else if (overallScore >= 70) grade = 'C';
  else grade = 'F';

  const passed = overallScore >= PASS_THRESHOLD;

  // Aggregate recommendations
  const improvements = [];
  const strengths = [];

  for (const [dimKey, dim] of Object.entries(dimensions)) {
    if (dim.recommendations && dim.recommendations.length > 0) {
      improvements.push(...dim.recommendations);
    }
    if (dim.score >= 90) {
      strengths.push(`${dimKey.replace('_', ' ').toUpperCase()}: Excelente pontuação (${dim.score}/100)`);
    }
  }

  return {
    file: filePath,
    title,
    overallScore,
    grade,
    passed,
    threshold: PASS_THRESHOLD,
    dimensions,
    summary: {
      strengths,
      improvements,
      stats: {
        wordCount: cognitive_load.details.wordCount,
        readingTimeMinutes: cognitive_load.details.estimatedMinutes,
        questionCount: retrieval_practice.details.questionCount,
        sidenoteCount: tufte_aesthetic.details.sidenoteCount,
        inteliMatches: inteli_alignment.details.totalMatches,
      },
    },
  };
}

/**
 * Reads and evaluates an HTML lesson file
 *
 * @param {string} filePath - Path to HTML file
 * @returns {Promise<object>}
 */
export async function evaluateLessonFile(filePath) {
  const html = await fs.readFile(filePath, 'utf8');
  return evaluateLesson(html, filePath);
}
