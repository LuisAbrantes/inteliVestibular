import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');
const LESSONS_DIR = path.join(REPO_ROOT, 'lessons');

/**
 * Catalog of pre-built lesson blueprints based on recurring Inteli exam patterns.
 * Designed following Matt Pocock's "teach" methodology:
 * 1. Tight, digestible units (5-10 min)
 * 2. Contextual Inteli scenario before abstract theory
 * 3. Core knowledge without walls of text (sidenotes, formula cards, traps)
 * 4. Immediate retrieval practice quiz (symmetric distractors, immediate feedback)
 * 5. Spaced repetition / storage strength prompt (48h recall)
 * 6. Primary source citation
 */
export const BLUEPRINTS = {
  'combinatoria': {
    slug: 'combinatoria-senhas-tech',
    title: 'Análise Combinatória: Chaves de API, Hashes e Princípio Fundamental',
    topic: 'Análise Combinatória e Contagem',
    estimatedMinutes: 8,
    targetTrack: 'Trilha Superior e Mediana',
    contextScenario: {
      company: 'SecurInteli (Fintech de Pagamentos Digitais)',
      problem: 'Engenharia de Autenticação e Espaço Amostral de Chaves',
      narrativa: `Você é engenheiro de segurança na <strong>SecurInteli</strong>, responsável pela arquitetura do novo gateway de pagamentos.
      O sistema exige duas camadas de segurança criptográfica:
      <ol>
        <li>Uma <strong>chave de API rápida</strong> de 6 caracteres alfanuméricos gerada para conexões de microserviços.</li>
        <li>Um <strong>hash de auditoria interno</strong> com 8 algarismos decimais em ordem estritamente não-decrescente (ex.: <code>00124789</code>), utilizado para rastrear lotes no ledger da empresa.</li>
      </ol>
      A diretoria técnica precisa saber a probabilidade de colisão e o tamanho do espaço amostral de chaves válidas sob restrições para dimensionar ataques de força bruta.`
    },
    coreKnowledge: {
      summary: 'Combinatória no Inteli não é memorização de fórmulas isoladas: é modelagem de restrições em sistemas digitais. A regra primordial é identificar se a <strong>ordem dos elementos importa</strong> (Permutações/Arranjos) ou se a <strong>ordem é indiferente/pré-fixada</strong> (Combinações simples ou com repetição).',
      concepts: [
        {
          term: 'Princípio Fundamental da Contagem (PFC)',
          definition: 'Se uma decisão A pode ser tomada de <em>n</em> maneiras e, para cada uma, uma decisão B de <em>m</em> maneiras, o total de pares ordenados de decisões é <strong>n &times; m</strong>.',
          sidenote: 'PFC é o algoritmo base: trace traços para cada posição restrita antes de aplicar permutações prontas.'
        },
        {
          term: 'Hashes com Ordem Fixada (Stars and Bars)',
          definition: 'Quando um conjunto de dígitos deve ser organizado em ordem não-decrescente (crescente ou repetido), escolher o número equivale a escolher <em>quantas vezes cada algarismo aparece</em>, gerando uma equação com inteiros não-negativos.',
          sidenote: 'Problema real do Vestibular Adaptativo 2025.1 do Inteli (Trilha Avançada, Padrão 5).'
        }
      ],
      formulaCard: {
        title: 'Fórmulas de Bolso para o Vestibular Inteli',
        formulas: [
          { name: 'Arranjos Simples (Ordem importa, sem repetição)', math: '$$A(n, k) = \\frac{n!}{(n - k)!}$$' },
          { name: 'Combinações Simples (Ordem não importa)', math: '$$C(n, k) = \\frac{n!}{k!(n - k)!}$$' },
          { name: 'Combinação com Repetição (Partição de Inteiros)', math: '$$CR(n, k) = C(n + k - 1, k) = \\frac{(n + k - 1)!}{k!(n - 1)!}$$' }
        ],
        tip: 'Se a ordem foi imposta pelo enunciado (ex.: "dígitos em ordem crescente"), NÃO multiplique por permutações! A ordem já consumiu o grau de liberdade.'
      },
      examTrap: {
        title: 'Armadilha Típica do Inteli: Confundir Ordem Fixada com Arranjo',
        description: 'No problema dos hashes de 8 algarismos em ordem não-decrescente, o candidato apressado calcula 10^8 (todas as permutações) ou arranjo A(10, 8). O correto é Combinação com Repetição CR(10, 8) = C(17, 8) = 24.310 combinações.'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'A SecurInteli gera uma chave de API provisória de 4 caracteres. O primeiro caractere DEVE ser uma letra maiúscula do alfabeto latino (26 opções), e os 3 caracteres seguintes devem ser algarismos decimais distintos (0 a 9). Quantas chaves únicas atendem rigorosamente a essa especificação?',
        options: [
          {
            label: 'A',
            text: '26 &times; 10 &times; 10 &times; 10 = 26.000 chaves',
            isCorrect: false,
            feedback: 'Atenção ao distrator: os 3 algarismos devem ser DISTINTOS entre si. 26.000 considerou repetição de algarismos.'
          },
          {
            label: 'B',
            text: '26 &times; 10 &times; 9 &times; 8 = 18.720 chaves',
            isCorrect: true,
            feedback: 'Exato! 26 opções para o 1º caractere (letra), 10 opções para o 2º, 9 para o 3º e 8 para o 4º caractere (algarismos distintos sem repetição).'
          },
          {
            label: 'C',
            text: '26 &times; C(10, 3) = 3.120 chaves',
            isCorrect: false,
            feedback: 'C(10, 3) desconsidera a ordem dos algarismos na chave! Na chave de segurança, a ordem posicional dos algarismos importa (ex.: "A123" &ne; "A321").'
          },
          {
            label: 'D',
            text: 'C(36, 4) = 58.905 chaves',
            isCorrect: false,
            feedback: 'C(36, 4) misturou letras e dígitos sem respeitar que o 1º caractere tem domínio restrito e a ordem dos caracteres é relevante em tokens.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Modelamos o token em 4 posições: <code>[_] [_] [_] [_]</code>.<br>
        2. A 1ª posição exige uma letra maiúscula: <strong>26 possibilidades</strong>.<br>
        3. A 2ª posição exige qualquer algarismo decimal: <strong>10 possibilidades</strong> (0 a 9).<br>
        4. A 3ª posição exige um algarismo distinto do anterior: <strong>9 possibilidades</strong>.<br>
        5. A 4ª posição exige um algarismo distinto dos dois anteriores: <strong>8 possibilidades</strong>.<br>
        6. Pelo Princípio Fundamental da Contagem: <code>26 &times; 10 &times; 9 &times; 8 = 18.720</code> chaves válidas.`
      },
      {
        id: 'q2',
        stem: '(Vestibular Adaptativo Inteli 2025.1 - Trilha Avançada) Um algoritmo gera um hash identificador de comprimento 8 composto exclusivamente pelos algarismos decimais {0, 1, 2, ..., 9}, com a restrição de que os algarismos devem aparecer sempre em ordem não-decrescente (exemplo: 00114789). Quantos hashes distintos esse algoritmo é capaz de gerar?',
        options: [
          {
            label: 'A',
            text: '10^8 = 100.000.000 hashes',
            isCorrect: false,
            feedback: '10^8 é o total irrestrito de números de 8 algarismos. A restrição de ordem não-decrescente elimina a imensa maioria dessas sequências.'
          },
          {
            label: 'B',
            text: 'A(10, 8) = 1.814.400 hashes',
            isCorrect: false,
            feedback: 'Arranjo exige que todos os algarismos sejam distintos e considera ordens permutadas. Hashes válidos admitem repetição (ex.: 00114789).'
          },
          {
            label: 'C',
            text: 'C(17, 8) = 24.310 hashes',
            isCorrect: true,
            feedback: 'Perfeito! Como a ordem é pré-fixada, determinar o hash equivale a encontrar as soluções inteiras não-negativas de x₀ + x₁ + ... + x₉ = 8. CR(10, 8) = C(17, 8) = 24.310.'
          },
          {
            label: 'D',
            text: 'C(10, 8) = 45 hashes',
            isCorrect: false,
            feedback: 'C(10, 8) consideraria apenas sequências estritamente crescentes sem repetição de algarismos, ignorando repetições como 00114789.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Seja <code>x_i</code> a quantidade de vezes que o algarismo <code>i &isin; {0, 1, ..., 9}</code> aparece no hash de tamanho 8.<br>
        2. Como os algarismos obrigatoriamente aparecerão agrupados em ordem não-decrescente, um hash fica completamente determinado assim que decidimos as frequências <code>x_0, x_1, ..., x_9</code>.<br>
        3. A soma das ocorrências deve totalizar 8: <code>x_0 + x_1 + ... + x_9 = 8</code> com <code>x_i &ge; 0</code>.<br>
        4. O número de soluções inteiras não-negativas de uma equação com <code>n = 10</code> variáveis e soma <code>k = 8</code> é dado por Combinação com Repetição:<br>
        <code>CR(10, 8) = C(10 + 8 - 1, 8) = C(17, 8) = 17! / (8! &times; 9!) = 24.310</code>.`
      }
    ],
    spacedRepetition: 'Em 48 horas, sem consultar materiais: explique a um desenvolvedor júnior em um diagrama mental por que ordenar números de forma não-decrescente transforma um problema de contagem temporal/posicional em um problema de partição de inteiros (stars and bars).',
    primarySource: 'Processo Seletivo Inteli 2025.1 (Caderno de Provas Adaptativas e Resolução Oficial - Padrão 5); William Feller, "An Introduction to Probability Theory and Its Applications", Vol. 1.'
  },

  'funcoes-otimizacao': {
    slug: 'otimizacao-lucro-startups',
    title: 'Funções Quadráticas: Vértice da Parábola e Ponto de Máximo em Startups',
    topic: 'Funções e Otimização',
    estimatedMinutes: 8,
    targetTrack: 'Trilha Superior e Mediana',
    contextScenario: {
      company: 'PromptScale AI (Startup SaaS de Infraestrutura de LLM)',
      problem: 'Precificação Algorítmica de Assinaturas e Ponto de Equilíbrio',
      narrativa: `A <strong>PromptScale AI</strong> comercializa licenças mensais de sua plataforma de orquestração de LLMs.
      Estudos de elasticidade-preço da demanda indicam que a quantidade mensal de clientes <em>q</em> varia com o preço unitário <em>p</em> (em R$) segundo a função:
      <p style="text-align:center; font-family:monospace; font-weight:bold; font-size:1.1em;">q(p) = 600 - 2p</p>
      O custo operacional fixo de infraestrutura em nuvem é de <strong>R$ 20.000,00/mês</strong> e o custo marginal por cliente é de <strong>R$ 40,00</strong>.
      O Head de Finanças do Inteli precisa determinar:
      (1) o preço <em>p</em> que maximiza o lucro líquido mensal;
      (2) o volume de licenças para atingir o ponto de equilíbrio (break-even).`
    },
    coreKnowledge: {
      summary: 'Problemas de negócios no Inteli convertem regras financeiras em funções polinomiais de 1º e 2º graus. O segredo é montar sistematicamente as equações de <strong>Receita</strong>, <strong>Custo</strong> e <strong>Lucro</strong> antes de calcular o vértice.',
      concepts: [
        {
          term: 'Receita Total R(p)',
          definition: 'Produto entre a quantidade vendida e o preço unitário: <code>R(p) = p &times; q(p)</code>. Quando a demanda q(p) é afim decrescente, R(p) torna-se uma parábola com concavidade voltada para baixo (a < 0).',
          sidenote: 'Receita não é lucro! O lucro desconta os custos fixos e variáveis.'
        },
        {
          term: 'Vértice da Parábola (Máximo ou Mínimo)',
          definition: 'Para uma função quadrática <code>f(x) = ax² + bx + c</code> com <code>a < 0</code>, o ponto de máximo ocorre nas coordenadas do vértice <strong>V(x_v, y_v)</strong>.',
          sidenote: 'Cuidado fundamental: x_v indica o preço/quantidade que otimiza, enquanto y_v indica o valor financeiro máximo obtido.'
        }
      ],
      formulaCard: {
        title: 'Fórmulas Vitais de Otimização',
        formulas: [
          { name: 'Abscissa do Vértice (Preço / Quantidade Ótima)', math: '$$x_v = -\\frac{b}{2a}$$' },
          { name: 'Ordenada do Vértice (Lucro / Receita Máxima)', math: '$$y_v = -\\frac{\\Delta}{4a} = f(x_v)$$' },
          { name: 'Ponto de Equilíbrio (Break-Even)', math: '$$\\text{Lucro}(q) = \\text{Receita}(q) - \\text{CustoTotal}(q) = 0$$' }
        ],
        tip: 'Calcule y_v calculando f(x_v) diretamente em vez de calcular &Delta; = b² - 4ac quando os números forem grandes; isso economiza 2 a 3 minutos preciosos na prova.'
      },
      examTrap: {
        title: 'Armadilha Típica do Inteli: Confundir x_v com y_v',
        description: 'O enunciado pergunta "qual deve ser o preço da mensalidade para que o lucro seja máximo?" e uma das alternativas traz o valor do próprio lucro máximo em reais. Quem calcula y_v em vez de x_v cai direto no distrator!'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'Para a PromptScale AI com demanda q(p) = 600 - 2p e custo marginal de R$ 40,00 por licença, a função Lucro Líquido L(p) antes dos custos fixos é dada por L(p) = (p - 40)(600 - 2p). Qual é o preço p (em R$) da mensalidade que maximiza esse lucro?',
        options: [
          {
            label: 'A',
            text: 'R$ 150,00',
            isCorrect: false,
            feedback: 'R$ 150,00 é o preço que maximiza apenas a RECEITA bruta p(600 - 2p) = 600p - 2p², desconsiderando o custo variável de R$ 40,00 por cliente.'
          },
          {
            label: 'B',
            text: 'R$ 170,00',
            isCorrect: true,
            feedback: 'Correto! As raízes do lucro são p₁ = 40 e p₂ = 300. Como a parábola é simétrica, o vértice está exatamente na média aritmética: (40 + 300) / 2 = R$ 170,00.'
          },
          {
            label: 'C',
            text: 'R$ 300,00',
            isCorrect: false,
            feedback: 'R$ 300,00 é a raiz superior onde a demanda cai a zero (q(300) = 0), resultando em lucro nulo.'
          },
          {
            label: 'D',
            text: 'R$ 33.800,00',
            isCorrect: false,
            feedback: 'R$ 33.800,00 é o VALOR DO LUCRO MÁXIMO (y_v), e não o PREÇO (x_v) solicitado no enunciado. Armadilha clássica do Inteli!'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. A função de Lucro é <code>L(p) = (p - 40)(600 - 2p) = -2(p - 40)(p - 300)</code>.<br>
        2. Expandindo: <code>L(p) = -2(p² - 340p + 12000) = -2p² + 680p - 24000</code>.<br>
        3. Os coeficientes são: <code>a = -2</code>, <code>b = 680</code>, <code>c = -24000</code>.<br>
        4. O preço ótimo é a abscissa do vértice <code>x_v = -b / (2a) = -680 / [2 &times; (-2)] = -680 / (-4) = 170</code>.<br>
        5. <em>Método Relâmpago:</em> Como a função já estava fatorada em função das raízes <code>p = 40</code> (onde margem é zero) e <code>p = 300</code> (onde demanda é zero), pela simetria da parábola: <code>p_v = (40 + 300) / 2 = 170</code>.`
      },
      {
        id: 'q2',
        stem: '(Vestibular Adaptativo Inteli 2025.1 - Bloco 1) Uma startup B2B vende assinaturas mensais de software de gestão. O custo fixo operacional é de R$ 50.000,00/mês e o custo marginal variável por licença é de R$ 20,00. O preço de tabela é R$ 300,00, porém, em uma campanha promocional de lançamento, as licenças receberão um desconto de R$ 30,00. Quantas assinaturas promocionais devem ser vendidas para atingir o ponto de equilíbrio (break-even)?',
        options: [
          {
            label: 'A',
            text: '166 assinaturas',
            isCorrect: false,
            feedback: '166 considerou o preço de tabela integral de R$ 300 (50.000 / 300 = 166,6), esquecendo o custo variável e o desconto promocional.'
          },
          {
            label: 'B',
            text: '178 assinaturas',
            isCorrect: false,
            feedback: '178 calculou 50.000 / 280 (preço com desconto de 300 - 20), esquecendo a margem de contribuição correta.'
          },
          {
            label: 'C',
            text: '200 assinaturas',
            isCorrect: true,
            feedback: 'Perfeito! Preço promocional = 300 - 30 = R$ 270. Margem de contribuição unitária = 270 - 20 = R$ 250. Ponto de equilíbrio = 50.000 / 250 = 200 assinaturas.'
          },
          {
            label: 'D',
            text: '250 assinaturas',
            isCorrect: false,
            feedback: '250 calculou 50.000 / (270 - 70) usando valores equivocados de custos.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Preço de venda unitário promocional: <code>P = 300 - 30 = R$ 270,00</code>.<br>
        2. Custo variável unitário: <code>C_v = R$ 20,00</code>.<br>
        3. Margem de Contribuição unitária: <code>MC = P - C_v = 270 - 20 = R$ 250,00</code> por licença.<br>
        4. O ponto de equilíbrio ocorre quando a receita de margem cobre exatamente o custo fixo de R$ 50.000,00:<br>
        <code>Q = Custo Fixo / MC = 50.000 / 250 = 200</code> assinaturas.`
      }
    ],
    spacedRepetition: 'Em 48 horas: desenhe à mão livre o gráfico de Lucro de uma empresa em função do preço. Mostre visualmente o que acontece com a posição do vértice quando o custo marginal aumenta de R$ 40 para R$ 80.',
    primarySource: 'Processo Seletivo Adaptativo Inteli 2025.1 (Caderno de Resoluções do Bloco 1 - Padrão 3); James Stewart, "Cálculo: Volume 1 - Modelagem de Otimização".'
  },

  'logica-proposicional': {
    slug: 'logica-proposicional-software',
    title: 'Lógica Proposicional: Implicação, Tabela-Verdade e Auditoria de Software',
    topic: 'Lógica Matemática e Computacional',
    estimatedMinutes: 7,
    targetTrack: 'Trilha Mediana e Superior',
    contextScenario: {
      company: 'CyberInteli (Unidade de Resposta a Incidentes Digitais)',
      problem: 'Investigação Forense de Fraude Interna em Transações Bancárias',
      narrativa: `Uma vulnerabilidade de dia zero foi explorada em um contrato inteligente corporativo. Quatro desenvolvedores sêniores da equipe (Fraga, Guedes, Ibiapina e Jota) foram interrogados pela auditoria de segurança interna.
      Cada um emitiu exatamente uma declaração formal registrada em log:
      <ul>
        <li><strong>Fraga:</strong> "Não foi o Jota quem executou o script." (&not;J)</li>
        <li><strong>Guedes:</strong> "Foi o Ibiapina quem executou o script." (I)</li>
        <li><strong>Ibiapina:</strong> "Foi o Jota quem executou o script." (J)</li>
        <li><strong>Jota:</strong> "O Fraga mentiu ao dizer que não fui eu." (&not;(&not;J) &equiv; J)</li>
      </ul>
      A perícia do sistema comprovou que <strong>apenas um dos quatro falou a verdade</strong> e que exatamente um deles foi o autor do script.`
    },
    coreKnowledge: {
      summary: 'Questões de lógica no Inteli utilizam cenários de depuração de código, auditoria de segurança ou análise de regras booleanas. O segredo de ouro é buscar <strong>pares contraditórios</strong>: se duas declarações são mutuamente excludentes, exatamente uma delas deve ser verdadeira.',
      concepts: [
        {
          term: 'Contradição Lógica (P &and; &not;P)',
          definition: 'Duas proposições em que a afirmação de uma é a negação exata da outra não podem ser simultaneamente verdadeiras nem falsas. Se o problema diz que "apenas uma é verdadeira", essa única verdade ESTÁ necessariamente nesse par contraditório.',
          sidenote: 'Identificar a contradição reduz o tempo de resolução de 6 minutos para menos de 90 segundos!'
        },
        {
          term: 'Equivalência da Implicação (P &rarr; Q)',
          definition: 'A condicional <code>P &rarr; Q</code> equivale logicamente a <code>&not;P &lor; Q</code>. Ela só é FALSA quando a premissa é verdadeira e a conclusão é falsa (V &rarr; F = F).',
          sidenote: 'Em regras de software: "IF auth THEN grant" equivale a "NOT auth OR grant".'
        }
      ],
      formulaCard: {
        title: 'Álgebra Booleana Essencial para Prova Inteli',
        formulas: [
          { name: 'Leis de De Morgan (Negação Conjunta)', math: '$$\\neg(P \\wedge Q) \\equiv \\neg P \\vee \\neg Q$$' },
          { name: 'Leis de De Morgan (Negação Disjunta)', math: '$$\\neg(P \\vee Q) \\equiv \\neg P \\wedge \\neg Q$$' },
          { name: 'Equivalência Contrapositiva', math: '$$(P \\to Q) \\equiv (\\neg Q \\to \\neg P)$$' },
          { name: 'Negação da Implicação', math: '$$\\neg(P \\to Q) \\equiv P \\wedge \\neg Q$$' }
        ],
        tip: 'A negação de "Se programo, logo passo" NÃO É "Se não programo, não passo", e sim "Programo e não passo" (P &and; &not;Q).'
      },
      examTrap: {
        title: 'Armadilha Típica do Inteli: Confundir Condicional com Bicondicional',
        description: 'Assumir que P &rarr; Q significa que &not;P &rarr; &not;Q. Se "todos os servidores lentos têm alto uso de CPU", NÃO se conclui que um servidor rápido tenha baixo uso de CPU.'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: '(Vestibular Inteli 2022.1 - Questão 24) No caso dos quatro desenvolvedores da CyberInteli (Fraga, Guedes, Ibiapina e Jota), sabendo que apenas um deles disse a verdade e apenas um executou o script malicioso, quem é o culpado e quem falou a verdade?',
        options: [
          {
            label: 'A',
            text: 'O culpado é Jota e quem disse a verdade foi Ibiapina.',
            isCorrect: false,
            feedback: 'Se Jota fosse o culpado, tanto Ibiapina ("Foi o Jota") quanto Jota ("Fraga mentiu ao dizer que não fui eu") teriam dito a verdade, violando a premissa de que apenas UM falou a verdade.'
          },
          {
            label: 'B',
            text: 'O culpado é Guedes e quem disse a verdade foi Fraga.',
            isCorrect: true,
            feedback: 'Brilhante! Fraga e Jota são contraditórios estritos, logo a única verdade está entre eles. Guedes mentiu (não foi Ibiapina) e Ibiapina mentiu (não foi Jota). Se não foi Jota, Fraga falou a verdade. Sobram Fraga e Guedes, e como Fraga apenas disse que não foi Jota, o culpado é Guedes!'
          },
          {
            label: 'C',
            text: 'O culpado é Ibiapina e quem disse a verdade foi Guedes.',
            isCorrect: false,
            feedback: 'Se Guedes disse a verdade, Fraga e Jota teriam que mentir simultaneamente. Mas Fraga e Jota têm proposições opostas: é impossível ambos mentirem!'
          },
          {
            label: 'D',
            text: 'O culpado é Fraga e quem disse a verdade foi Jota.',
            isCorrect: false,
            feedback: 'Se Jota disse a verdade, então Jota seria o culpado ("não é verdade que não foi Jota"). Mas a alternativa afirma que o culpado é Fraga.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Analise as declarações de Fraga e Jota:<br>
           - Fraga afirma: <code>&not;J</code> ("Não foi o Jota").<br>
           - Jota afirma: "O Fraga mentiu", logo <code>&not;(&not;J) &equiv; J</code> ("Foi o Jota").<br>
        2. Fraga e Jota formam uma <strong>contradição lógica exata</strong>. Obrigatoriamente um fala a verdade e o outro mente.<br>
        3. Como o enunciado garante que <em>apenas UM dos quatro disse a verdade</em>, essa verdade é de Fraga OU de Jota.<br>
        4. Logo, <strong>Guedes e Ibiapina mentiram categoricamente</strong>.<br>
        5. Como Guedes mentiu ("Foi o Ibiapina"), concluímos: <strong>NÃO foi o Ibiapina</strong>.<br>
        6. Como Ibiapina mentiu ("Foi o Jota"), concluímos: <strong>NÃO foi o Jota</strong>.<br>
        7. Como NÃO foi o Jota, a declaração de Fraga ("Não foi o Jota") é <strong>VERDADEIRA</strong>!<br>
        8. Portanto, quem disse a verdade foi <strong>Fraga</strong>. E como não foram Ibiapina nem Jota, e Fraga não se autoincrimina, o autor do script foi <strong>Guedes</strong>.`
      },
      {
        id: 'q2',
        stem: 'Um arquiteto de software define uma regra de acesso: "Se a requisição vem de IP externo (E) e não possui token corporativo (&not;T), então deve ser bloqueada imediatamente (B)". Qual das proposições abaixo expressa uma condição logicamente EQUIVALENTE à negação dessa regra de segurança?',
        options: [
          {
            label: 'A',
            text: 'Se a requisição não for bloqueada, então ela não veio de IP externo ou tem token corporativo.',
            isCorrect: false,
            feedback: 'Esta proposição é a contrapositiva (&not;B &rarr; &not;(E &and; &not;T)), que é equivalente à regra original, e NÃO à sua negação!'
          },
          {
            label: 'B',
            text: 'A requisição veio de IP externo, não possui token corporativo e NÃO foi bloqueada.',
            isCorrect: true,
            feedback: 'Exato! A negação de uma condicional P &rarr; Q é dada por P &and; &not;Q. Aqui, P = (E &and; &not;T) e &not;Q = &not;B. Portanto: E &and; &not;T &and; &not;B.'
          },
          {
            label: 'C',
            text: 'A requisição não veio de IP externo ou tem token corporativo, e foi bloqueada.',
            isCorrect: false,
            feedback: 'Isso nega as premissas, incorrendo no erro comum de transformar P &rarr; Q em &not;P &and; Q.'
          },
          {
            label: 'D',
            text: 'Se a requisição possui token corporativo, ela não pode ser bloqueada.',
            isCorrect: false,
            feedback: 'Altera o escopo condicional sem demonstrar a quebra estrita da regra de segurança.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. A regra de acesso tem a forma condicional: <code>P &rarr; B</code>, onde <code>P = E &and; &not;T</code>.<br>
        2. A negação de qualquer implicação lógica <code>X &rarr; Y</code> é dada por: <code>&not;(X &rarr; Y) &equiv; X &and; &not;Y</code>.<br>
        3. Aplicando diretamente: <code>&not;( (E &and; &not;T) &rarr; B ) &equiv; (E &and; &not;T) &and; &not;B</code>.<br>
        4. Traduzindo de volta para linguagem natural: "A requisição veio de IP externo (E), NÃO possui token corporativo (&not;T) e NÃO foi bloqueada (&not;B)".`
      }
    ],
    spacedRepetition: 'Em 48 horas, sem usar anotações: reescreva mentalmente a declaração "Se você não fizer o teste automatizado, seu deploy falhará" usando apenas conectivos OU e NÃO, e deduza sua negação estrita.',
    primarySource: 'Processo Seletivo Inteli 2022.1 (Questão 24 - Análise Forense); Kenneth Rosen, "Discrete Mathematics and Its Applications", 8th Edition (Capítulo 1: Propositional Logic).'
  },

  'probabilidade-condicional': {
    slug: 'probabilidade-condicional-bayes',
    title: 'Probabilidade Condicional: Teorema de Bayes e Classificação Naive Bayes',
    topic: 'Probabilidade e Estatística',
    estimatedMinutes: 9,
    targetTrack: 'Trilha Superior (High Proficiency)',
    contextScenario: {
      company: 'InboxShield (Motor de Inteligência Artificial Anti-Phishing)',
      problem: 'Classificação Bayesiana de E-mails Maliciosos com Múltiplas Evidências',
      narrativa: `O time de Machine Learning da <strong>InboxShield</strong> utiliza um classificador <em>Naive Bayes</em> para filtrar mensagens em servidores corporativos.
      Historicamente na infraestrutura da empresa:
      <ul>
        <li>Apenas <strong>20% de todos os e-mails recebidos são spam / phishing (S)</strong>, enquanto 80% são legítimos (L).</li>
        <li>Dado que um e-mail é spam, a probabilidade de conter um link encurtado suspeito é de <strong>80%</strong>.</li>
        <li>Dado que um e-mail é legítimo, a probabilidade de conter link encurtado é de apenas <strong>10%</strong>.</li>
      </ul>
      Um e-mail acabou de aterrissar na caixa de entrada contendo um link encurtado suspeito. O filtro precisa calcular a probabilidade a posteriori de a mensagem ser efetivamente spam antes de quarentená-la.`
    },
    coreKnowledge: {
      summary: 'Probabilidade no Inteli explora cenários de tecnologia contemporânea: modelos Naive Bayes, testes A/B e taxas de conversão de funis. O maior erro dos candidatos é confundir <strong>P(Evidência | Hipótese)</strong> com <strong>P(Hipótese | Evidência)</strong>.',
      concepts: [
        {
          term: 'Teorema de Bayes',
          definition: 'Permite atualizar a probabilidade de uma hipótese H à luz de uma evidência observada E: <code>P(H | E) = [P(E | H) &times; P(H)] / P(E)</code>.',
          sidenote: 'P(H) é a priori (taxa base no mundo real); P(H|E) é a posteriori (após ver o dado).'
        },
        {
          term: 'Probabilidade Total (Denominador de Bayes)',
          definition: 'O denominador P(E) é a soma ponderada de todos os caminhos que geram a evidência: <code>P(E) = P(E | H)&times;P(H) + P(E | &not;H)&times;P(&not;H)</code>.',
          sidenote: 'Pense numa árvore de decisão: some os ramos que terminam no evento observado.'
        }
      ],
      formulaCard: {
        title: 'Fórmulas de Probabilidade para o Inteli',
        formulas: [
          { name: 'Definição de Probabilidade Condicional', math: '$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$$' },
          { name: 'Teorema de Bayes Unificado', math: '$$P(A \\mid B) = \\frac{P(B \\mid A) \\cdot P(A)}{P(B)}$$' },
          { name: 'Regra da Multiplicação (Eventos Independentes)', math: '$$P(A \\cap B) = P(A) \\cdot P(B)$$' }
        ],
        tip: 'Dica prática: monte uma tabela com 1.000 e-mails imaginários (frequências naturais). Isso elimina erros de divisão com decimais sob a pressão do tempo da prova.'
      },
      examTrap: {
        title: 'Armadilha do Ponto de Vista (Falácia da Taxa Básica)',
        description: 'Assumir que, porque 80% dos spams contêm links suspeitos, um e-mail com link suspeito tem 80% de chance de ser spam. Essa intuição ignora que spams correspondem a apenas 20% do volume total de e-mails!'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'Com base nos dados da InboxShield (P(Spam) = 0,20; P(Link|Spam) = 0,80; P(Link|Legítimo) = 0,10), dado que um e-mail contém um link encurtado suspeito, qual é a probabilidade exata de ele ser realmente um spam?',
        options: [
          {
            label: 'A',
            text: '80,0%',
            isCorrect: false,
            feedback: '80,0% é P(Link | Spam), ou seja, a probabilidade da evidência dado que já era spam. A pergunta quer P(Spam | Link).'
          },
          {
            label: 'B',
            text: '66,7% (2/3)',
            isCorrect: true,
            feedback: 'Perfeito! P(Spam e Link) = 0,20 &times; 0,80 = 0,16. P(Legítimo e Link) = 0,80 &times; 0,10 = 0,08. Total de links = 0,16 + 0,08 = 0,24. Portanto: 0,16 / 0,24 = 2/3 &approx; 66,7%.'
          },
          {
            label: 'C',
            text: '16,0%',
            isCorrect: false,
            feedback: '16,0% é apenas a probabilidade conjunta P(Spam &cap; Link) no universo total de e-mails, sem condicionar pela observação do link suspeito.'
          },
          {
            label: 'D',
            text: '50,0%',
            isCorrect: false,
            feedback: '50,0% ignora a assimetria das proporções a priori entre mensagens legítimas e maliciosas.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo (Método de Frequências Naturais - 1.000 e-mails):</strong><br>
        1. Imagine uma amostra de <strong>1.000 e-mails</strong> recebidos pela empresa:<br>
           - 20% são Spam &rarr; <strong>200 e-mails</strong>.<br>
           - 80% são Legítimos &rarr; <strong>800 e-mails</strong>.<br>
        2. Desses 200 spams, 80% contêm link encurtado &rarr; <code>200 &times; 0,80 = 160 e-mails</code>.<br>
        3. Desses 800 legítimos, 10% contêm link encurtado &rarr; <code>800 &times; 0,10 = 80 e-mails</code>.<br>
        4. O número total de e-mails com link suspeito é: <code>160 + 80 = 240 e-mails</code>.<br>
        5. Dado que o e-mail possui link suspeito, a probabilidade de ser spam é a razão direta:<br>
        <code>P(Spam | Link) = 160 / 240 = 16 / 24 = 2 / 3 &approx; 66,67%</code>.`
      },
      {
        id: 'q2',
        stem: '(Vestibular Adaptativo 2025.1 - Trilha Avançada) Um segundo modelo Naive Bayes analisa dois atributos condicionalmente independentes: Link Suspeito (L) e Imagem Oculta (I). Para uma mensagem Spam, P(L|S) = 0,80 e P(I|S) = 0,50. Para Legítimo, P(L|Leg) = 0,10 e P(I|Leg) = 0,25. Sabendo que P(S) = 0,20 e P(Leg) = 0,80, qual é a probabilidade normalizada de a mensagem ser Spam ao conter ambos os atributos?',
        options: [
          {
            label: 'A',
            text: '40,0%',
            isCorrect: false,
            feedback: '40,0% decorre de produto incompleto sem normalização com os termos legítimos.'
          },
          {
            label: 'B',
            text: '80,0%',
            isCorrect: true,
            feedback: 'Excelente! Score(Spam) = 0,80 &times; 0,50 &times; 0,20 = 0,08. Score(Leg) = 0,10 &times; 0,25 &times; 0,80 = 0,02. Score total = 0,08 + 0,02 = 0,10. P(Spam) = 0,08 / 0,10 = 80%.'
          },
          {
            label: 'C',
            text: '88,9%',
            isCorrect: false,
            feedback: '88,9% inverteu as frações de probabilidade a priori no cálculo do numerador.'
          },
          {
            label: 'D',
            text: '20,0%',
            isCorrect: false,
            feedback: '20,0% é apenas a probabilidade a priori sem incorporar as duas novas evidências coletadas.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Pela hipótese de Naive Bayes (independência condicional dos atributos dada a classe):<br>
        <code>P(L &cap; I &cap; Spam) = P(L|Spam) &times; P(I|Spam) &times; P(Spam) = 0,80 &times; 0,50 &times; 0,20 = 0,080</code>.<br>
        2. Calculamos o mesmo produto para e-mails Legítimos:<br>
        <code>P(L &cap; I &cap; Leg) = P(L|Leg) &times; P(I|Leg) &times; P(Leg) = 0,10 &times; 0,25 &times; 0,80 = 0,020</code>.<br>
        3. A probabilidade da evidência conjunta é a soma dos dois escores:<br>
        <code>P(L &cap; I) = 0,080 + 0,020 = 0,100</code>.<br>
        4. Aplicando Bayes:<br>
        <code>P(Spam | L &cap; I) = 0,080 / 0,100 = 80%</code>.`
      }
    ],
    spacedRepetition: 'Em 48 horas: feche os olhos e explique em voz alta a diferença entre "a probabilidade de um teste dar positivo dado que o usuário está infectado" e "a probabilidade de o usuário estar infectado dado que o teste deu positivo". Por que a prevalência é determinante?',
    primarySource: 'Processo Seletivo Adaptativo Inteli 2025.1 (Trilha Avançada - Padrão 4); Stuart Russell & Peter Norvig, "Artificial Intelligence: A Modern Approach" (Capítulo sobre Raciocínio Probabilístico).'
  },

  'algoritmos-pseudocodigo': {
    slug: 'algoritmos-loops-complexidade',
    title: 'Pensamento Computacional: Rastreamento de Loops, Busca Binária e Gauss',
    topic: 'Pensamento Computacional e Algoritmos',
    estimatedMinutes: 8,
    targetTrack: 'Trilha Superior e Mediana',
    contextScenario: {
      company: 'LogStream (Motor de Busca de Logs em Alta Escala)',
      problem: 'Otimização de Índices e Pior Caso em Arquivos de 500k Registros',
      narrativa: `A <strong>LogStream</strong> processa registros de auditoria ordenados cronologicamente.
      Em uma atualização crítica de arquitetura, o time substituiu um mecanismo de busca linear por <strong>Busca Binária</strong> em uma base com <strong>N = 524.288 registros ordenados</strong> sem duplicatas.
      Paralelamente, para ordenar lotes de auditoria em memória, uma rotina legada de <em>Selection Sort</em> executa comparações sucessivas entre elementos para posicionar o menor item a cada passagem.
      A diretoria técnica solicitou a comprovação matemática do número exato de comparações no pior caso de cada algoritmo.`
    },
    coreKnowledge: {
      summary: 'O vestibular do Inteli não exige saber sintaxe de Python ou Java, mas exige saber <strong>rastrear a lógica de execução passo a passo</strong>: identificar quantas vezes um laço de repetição (for/while) itera e somar progressões aritméticas ou geométricas.',
      concepts: [
        {
          term: 'Busca Binária e Escala Logarítmica',
          definition: 'A cada comparação no meio da lista ordenada, metade dos elementos é descartada. O número de divisões necessárias para reduzir N a 1 elemento no pior caso é dado por <code>k = &lceil;log₂(N)&rceil;</code>.',
          sidenote: 'Lembre-se das potências de 2: 2¹⁰ = 1.024, 2¹⁹ = 524.288, 2²⁰ &approx; 1 milhão.'
        },
        {
          term: 'Soma de Gauss em Laços Aninhados',
          definition: 'Algoritmos de ordenação por comparação simples (como Selection Sort) realizam (N-1) comparações na 1ª passagem, (N-2) na 2ª, ..., até 1 comparação na última, totalizando uma Progressão Aritmética.',
          sidenote: 'Soma da PA: S_n = [n &times; (n + 1)] / 2. Isso gera complexidade quadrática O(N²).'
        }
      ],
      formulaCard: {
        title: 'Fórmulas Computacionais Essenciais',
        formulas: [
          { name: 'Pior caso da Busca Binária', math: '$$p_b = \\lceil \\log_2 N \\rceil$$' },
          { name: 'Soma de Gauss (1 a n)', math: '$$S_n = \\frac{n(n + 1)}{2}$$' },
          { name: 'Potências Binárias Notáveis', math: '$$2^{10} = 1.024; \\quad 2^{19} = 524.288; \\quad 2^{20} = 1.048.576$$' }
        ],
        tip: 'Se N = 524.288, não tente dividir por 2 repetidamente no rascunho: fatore usando potências conhecidas: 524.288 = 1.024 &times; 512 = 2¹⁰ &times; 2⁹ = 2¹⁹.'
      },
      examTrap: {
        title: 'Armadilha do "Off-by-One" em Laços',
        description: 'Contar o número de comparações esquecendo se o loop vai de 1 até n-1 ou de 1 até n. Para 10 elementos, o Selection Sort faz 9 + 8 + ... + 1 = 45 comparações, e não 10 + 9 + ... + 1 = 55.'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: '(Vestibular Inteli 2022.1 - Questão 03) Uma empresa de telecomunicações atualizou seu algoritmo de busca em um banco de dados ordenado alfabeticamente contendo exatamente N = 524.288 usuários. Em vez de busca sequencial, o novo sistema emprega busca binária, dividindo a base pela metade a cada etapa. Quantas comparações, no máximo (pior caso), esse algoritmo realizará para localizar um usuário ou concluir que ele não existe no banco?',
        options: [
          {
            label: 'A',
            text: '262.144 comparações',
            isCorrect: false,
            feedback: '262.144 é apenas N/2 (o pior caso da busca sequencial na média), desconsiderando a divisão sucessiva da busca binária.'
          },
          {
            label: 'B',
            text: '19 comparações',
            isCorrect: true,
            feedback: 'Perfeito! Pior caso = log₂(524.288). Como 524.288 = 1.024 &times; 512 = 2¹⁰ &times; 2⁹ = 2¹⁹, log₂(2¹⁹) = 19 processos de busca.'
          },
          {
            label: 'C',
            text: '10 comparações',
            isCorrect: false,
            feedback: '10 comparações seria log₂(1.024), suficiente para apenas 1.024 registros.'
          },
          {
            label: 'D',
            text: '524 comparações',
            isCorrect: false,
            feedback: '524 é uma aproximação visual incorreta dos primeiros dígitos do número 524.288.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. A fórmula do número de passos da busca binária no pior caso é <code>p_b = log₂(N)</code>.<br>
        2. Temos <code>N = 524.288</code>.<br>
        3. Decompomos em potências conhecidas de 2:<br>
           <code>2¹⁰ = 1.024</code><br>
           <code>2¹⁹ = 2¹⁰ &times; 2⁹ = 1.024 &times; 512 = 524.288</code>.<br>
        4. Portanto, <code>p_b = log₂(2¹⁹) = 19</code>.<br>
        5. No pior cenário possível, são necessárias apenas <strong>19 comparações</strong> para encontrar qualquer registro entre mais de meio milhão de usuários.`
      },
      {
        id: 'q2',
        stem: '(Vestibular Inteli 2023 - Questão 17) Para ordenar um array desordenado contendo n = 10 elementos distintos através do algoritmo Selection Sort, o programa compara o 1º elemento com os outros 9 para selecionar o menor (9 comparações). Em seguida, compara o 2º com os outros 8 (8 comparações), e assim por diante até restar 1 elemento (1 comparação). Qual é o número total de operações de comparação realizadas?',
        options: [
          {
            label: 'A',
            text: '45 comparações',
            isCorrect: true,
            feedback: 'Correto! A soma é 9 + 8 + 7 + ... + 1 = (9 &times; 10) / 2 = 45 operações.'
          },
          {
            label: 'B',
            text: '55 comparações',
            isCorrect: false,
            feedback: '55 é a soma de 10 até 1 (10 &times; 11 / 2). O Selection Sort para 10 elementos não compara um elemento consigo mesmo na primeira passagem, fazendo 9 comparações iniciais.'
          },
          {
            label: 'C',
            text: '90 comparações',
            isCorrect: false,
            feedback: '90 comparações corresponderia a n &times; (n - 1), caso comparasse todos os pares em ambas as direções.'
          },
          {
            label: 'D',
            text: '100 comparações',
            isCorrect: false,
            feedback: '100 comparações seria n² simples, sem aproveitar que os elementos anteriores já foram ordenados e fixados.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. O número de operações de comparação é a sequência decrescente: <code>9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1</code>.<br>
        2. Trata-se de uma Progressão Aritmética de 9 termos com primeiro termo 1 e último termo 9.<br>
        3. Pela fórmula de Gauss: <code>S = (n &times; (n + 1)) / 2</code> onde <code>n = 9</code>.<br>
        4. <code>S = (9 &times; 10) / 2 = 90 / 2 = 45</code> comparações.`
      }
    ],
    spacedRepetition: 'Em 48 horas, sem calculadora: determine mentalmente quantas comparações uma busca binária precisa realizar no pior caso para vasculhar um índice contendo exatamente 1 milhão de itens. (Dica: pense na potência de 2 mais próxima de 1.000.000).',
    primarySource: 'Processo Seletivo Inteli 2022.1 (Questão 03) e 2023 (Questão 17); Thomas Cormen et al., "Introduction to Algorithms (CLRS)", 4th Edition (Capítulo 2: Getting Started).'
  },

  'geometria-metricas': {
    slug: 'geometria-telas-computacao-grafica',
    title: 'Geometria Analítica: Telas Digitais com Origem Invertida e Coordenadas de Pixels',
    topic: 'Geometria Analítica e Transformações',
    estimatedMinutes: 7,
    targetTrack: 'Trilha Mediana e Superior',
    contextScenario: {
      company: 'PixelEngine (Engine de Jogos e Simulação Gráfica)',
      problem: 'Renderização de Trajetórias com Inversão do Eixo Y na Tela',
      narrativa: `Você é programador de gráficos na <strong>PixelEngine</strong> desenvolvendo uma interface HUD para simuladores de voo.
      Na computação gráfica padrão de monitores, sistemas operacionais e displays Web (HTML5 Canvas), a convenção de coordenadas difere da matemática escolar tradicional:
      <ul>
        <li>A <strong>origem (0, 0)</strong> localiza-se no <strong>canto superior esquerdo</strong> da tela.</li>
        <li>O <strong>eixo X</strong> cresce horizontalmente para a <strong>direita</strong>.</li>
        <li>O <strong>eixo Y</strong> cresce verticalmente para <strong>BAIXO</strong>.</li>
      </ul>
      A tela do simulador opera em resolução de <strong>800 &times; 600 pixels</strong>. Uma mira virtual deve traçar uma linha reta ligando a origem (0, 0) até o ponto médio da borda inferior da tela.`
    },
    coreKnowledge: {
      summary: 'A prova do Inteli testa geometria aplicada à tecnologia real. A inversão do eixo vertical é um clássico absoluto do vestibular (Padrão 2): os candidatos desatentos erram o sinal da equação da reta ao aplicarem cegamente o plano cartesiano tradicional.',
      concepts: [
        {
          term: 'Referencial Gráfico de Pixels',
          definition: 'Numa tela de resolução W &times; H, o canto superior esquerdo é (0, 0), o superior direito é (W, 0), o inferior esquerdo é (0, H) e o inferior direito é (W, H).',
          sidenote: 'Quando um objeto visualmente "desce" na tela, sua coordenada Y AUMENTA!'
        },
        {
          term: 'Coeficiente Angular (m = &Delta;y / &Delta;x)',
          definition: 'A taxa de variação vertical sobre a horizontal. Uma reta que sai de (0,0) e vai para a borda inferior tem &Delta;y > 0 e &Delta;x > 0, resultando em coeficiente angular positivo nesse sistema.',
          sidenote: 'Equação reduzida da reta pela origem: y = mx.'
        }
      ],
      formulaCard: {
        title: 'Formulário de Geometria Analítica Gráfica',
        formulas: [
          { name: 'Coeficiente Angular', math: '$$m = \\frac{y_2 - y_1}{x_2 - x_1}$$' },
          { name: 'Equação da Reta Fundamental', math: '$$y - y_0 = m(x - x_0)$$' },
          { name: 'Ponto Médio de um Segmento', math: '$$M = (\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2})$$' }
        ],
        tip: 'Sempre faça um esboço rápido desenhando o retângulo do monitor e marcando os eixos com as setas indicando para a direita (x) e para baixo (y).'
      },
      examTrap: {
        title: 'Armadilha do Eixo Y Invertido',
        description: 'No plano cartesiano escolar tradicional, uma reta que aponta para baixo teria declive negativo. Mas na tela gráfica, como Y cresce para baixo, &Delta;y = 600 - 0 = +600, logo m = +3/2 e a equação é y = (3/2)x.'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: '(Vestibular Inteli 2022.1 - Questão 02) Na tela de um computador com resolução de 800 &times; 600 pixels, a origem (0, 0) é o canto superior esquerdo. O eixo x cresce para a direita e o eixo y cresce para baixo. Um desenvolvedor traça uma reta partindo da origem (0, 0) até o ponto médio M da borda inferior da tela. Qual é a equação da reta que descreve essa trajetória no sistema de coordenadas da tela?',
        options: [
          {
            label: 'A',
            text: 'y = -(3/2)x',
            isCorrect: false,
            feedback: 'Caiu na armadilha do sinal cartesiano escolar! Na tela do computador, como o eixo y aponta para baixo, o ponto médio inferior tem y = +600, portanto &Delta;y é positivo.'
          },
          {
            label: 'B',
            text: 'y = (2/3)x',
            isCorrect: false,
            feedback: 'Inverteu a razão: calculou &Delta;x / &Delta;y (400/600) em vez de &Delta;y / &Delta;x (600/400).'
          },
          {
            label: 'C',
            text: 'y = (3/2)x',
            isCorrect: true,
            feedback: 'Correto! M = (400, 600). Coeficiente angular m = 600/400 = 3/2. Como passa pela origem (0,0), a equação é y = (3/2)x.'
          },
          {
            label: 'D',
            text: 'y = (4/3)x + 600',
            isCorrect: false,
            feedback: 'A reta parte da origem (0,0), logo o coeficiente linear é zero (+0, e não +600).'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Identificamos as coordenadas do ponto inicial: <code>Origem = (0, 0)</code>.<br>
        2. A borda inferior da tela de 800 &times; 600 pixels está situada na linha <code>y = 600</code>.<br>
        3. O ponto médio <code>M</code> da borda inferior tem abscissa: <code>x_M = 800 / 2 = 400</code>.<br>
        4. Coordenadas do ponto médio: <code>M = (400, 600)</code>.<br>
        5. Calculamos o coeficiente angular <code>m</code> da reta passando por (0,0) e (400,600):<br>
        <code>m = (600 - 0) / (400 - 0) = 600 / 400 = 6 / 4 = 3 / 2</code>.<br>
        6. Como a reta passa pela origem <code>(0,0)</code>, a equação reduzida é:<br>
        <code>y - 0 = (3/2)(x - 0) &rArr; y = (3/2)x</code>.`
      },
      {
        id: 'q2',
        stem: 'Um objeto gráfico move-se na tela partindo do ponto A(100, 150) em direção ao ponto B(500, 450). Qual é a distância euclidiana exata percorrida pelo objeto entre esses dois pontos?',
        options: [
          {
            label: 'A',
            text: '700 pixels',
            isCorrect: false,
            feedback: '700 é a soma linear das distâncias nos eixos &Delta;x + &Delta;y (distância de Manhattan), e não a distância euclidiana em linha reta.'
          },
          {
            label: 'B',
            text: '500 pixels',
            isCorrect: true,
            feedback: 'Perfeito! &Delta;x = 500 - 100 = 400. &Delta;y = 450 - 150 = 300. Triângulo retângulo clássico 300-400-500 pixels (Pitágoras: 3-4-5).'
          },
          {
            label: 'C',
            text: '250 pixels',
            isCorrect: false,
            feedback: '250 é a metade da hipotenusa real.'
          },
          {
            label: 'D',
            text: '600 pixels',
            isCorrect: false,
            feedback: '600 pixels é a altura máxima da tela, desconsiderando a aplicação do Teorema de Pitágoras.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Variação no eixo horizontal: <code>&Delta;x = 500 - 100 = 400</code> pixels.<br>
        2. Variação no eixo vertical: <code>&Delta;y = 450 - 150 = 300</code> pixels.<br>
        3. Pela fórmula da distância euclidiana entre dois pontos:<br>
        <code>d = &radic;[(&Delta;x)&sup2; + (&Delta;y)&sup2;] = &radic;[400&sup2; + 300&sup2;] = &radic;[160.000 + 90.000] = &radic;250.000 = 500</code> pixels.<br>
        4. Trata-se do triângulo pitagórico 3-4-5 multiplicado pelo fator 100.`
      }
    ],
    spacedRepetition: 'Em 48 horas: abra um editor de código ou console de navegador e explique por que a instrução canvas.lineTo(x, y) com y aumentando faz o cursor descer visualmente na tela, e como isso afeta a trigonometria dos ângulos.',
    primarySource: 'Processo Seletivo Inteli 2022.1 (Questão 02); James D. Foley et al., "Computer Graphics: Principles and Practice", 3rd Edition (Capítulo 2).'
  },

  'estatistica-dados': {
    slug: 'estatistica-benchmark-nuvem',
    title: 'Estatística Descritiva: Média Ponderada, Mediana e Latência em Nuvem',
    topic: 'Probabilidade e Estatística Descritiva',
    estimatedMinutes: 8,
    targetTrack: 'Trilha Mediana e Superior',
    contextScenario: {
      company: 'CloudMesh (Orquestradora de Clusters Multi-Cloud)',
      problem: 'Auditoria de Latência e SLAs em AWS, GCP e Azure',
      narrativa: `A <strong>CloudMesh</strong> roteia requisições de pagamentos digitais entre três datacenters em nuvem:
      <ul>
        <li><strong>Cluster AWS (São Paulo):</strong> processou 50.000 requisições com latência média de 40 ms.</li>
        <li><strong>Cluster GCP (Santiago):</strong> processou 30.000 requisições com latência média de 60 ms.</li>
        <li><strong>Cluster Azure (Virgínia):</strong> processou 20.000 requisições com latência média de 120 ms.</li>
      </ul>
      A auditoria externa exige a comprovação da <strong>latência média global ponderada</strong> do sistema e uma análise da <strong>mediana</strong> para garantir que os SLAs contratuais de 50 ms não foram violados por distorções de outliers.`
    },
    coreKnowledge: {
      summary: 'Em estatística no Inteli, médias simples de grupos com volumes desiguais são terminantemente incorretas: é obrigatório ponderar pelo peso ou frequência amostral. Além disso, o candidato deve dominar a robustez da mediana frente a distribuições assimétricas.',
      concepts: [
        {
          term: 'Média Aritmética Ponderada',
          definition: 'Soma dos produtos de cada valor pelo seu respectivo peso (ou volume de requisições), dividida pela soma total dos pesos: <code>&Sigma;(x_i &times; w_i) / &Sigma;w_i</code>.',
          sidenote: 'Simplifique os pesos antes de multiplicar! Em vez de 50k, 30k e 20k, use 5, 3 e 2.'
        },
        {
          term: 'Mediana vs Média em Sistemas de TI',
          definition: 'A mediana é o valor central que divide a amostra ordenada em duas metades de 50%. Ao contrário da média, ela não é distorcida por requisições pontuais muito lentas (outliers de timeout).',
          sidenote: 'Na indústria de software, p50 é a mediana, e p95/p99 são percentis de cauda longa.'
        }
      ],
      formulaCard: {
        title: 'Estatística para Benchmark Tech',
        formulas: [
          { name: 'Média Ponderada', math: '$$\\bar{x} = \\frac{\\sum w_i x_i}{\\sum w_i}$$' },
          { name: 'Mediana (n ímpar)', math: '$$\\text{Posição} = \\frac{n + 1}{2}$$' },
          { name: 'Mediana (n par)', math: '$$\\text{Mediana} = \\frac{x_{n/2} + x_{n/2 + 1}}{2}$$' }
        ],
        tip: 'Para calcular média ponderada rapidamente, divida todos os pesos pelo seu máximo divisor comum antes de efetuar as multiplicações.'
      },
      examTrap: {
        title: 'Armadilha da Média das Médias',
        description: 'Calcular a média simples das latências (40 + 60 + 120) / 3 = 73,3 ms sem ponderar pelo número de requisições. O cluster da AWS processou metade de todo o tráfego a 40 ms, puxando a média real para bem mais baixo!'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'Qual foi a latência média global ponderada real das 100.000 requisições processadas pela CloudMesh?',
        options: [
          {
            label: 'A',
            text: '73,3 ms',
            isCorrect: false,
            feedback: '73,3 ms é a média aritmética simples (40 + 60 + 120) / 3, que ignora que os clusters processaram quantidades muito desiguais de tráfego.'
          },
          {
            label: 'B',
            text: '62,0 ms',
            isCorrect: true,
            feedback: 'Excelente! Pesos normalizados: 5, 3 e 2. Soma = (5 &times; 40 + 3 &times; 60 + 2 &times; 120) / 10 = (200 + 180 + 240) / 10 = 620 / 10 = 62,0 ms.'
          },
          {
            label: 'C',
            text: '55,0 ms',
            isCorrect: false,
            feedback: '55,0 ms decorreu de erro aritmético na soma dos produtos das latências dos clusters.'
          },
          {
            label: 'D',
            text: '60,0 ms',
            isCorrect: false,
            feedback: '60,0 ms é a latência do cluster GCP intermediário, coincidindo com a mediana dos valores isolados mas não com a média ponderada.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Identificamos os volumes de requisições (pesos): <code>w_1 = 50.000</code>, <code>w_2 = 30.000</code>, <code>w_3 = 20.000</code>.<br>
        2. Volume total: <code>W = 50.000 + 30.000 + 20.000 = 100.000</code>.<br>
        3. Simplificamos dividindo todos os pesos por 10.000: <code>w'_1 = 5</code>, <code>w'_2 = 3</code>, <code>w'_3 = 2</code> (soma = 10).<br>
        4. Aplicamos a fórmula da média ponderada:<br>
        <code>x̄ = (5 &times; 40 + 3 &times; 60 + 2 &times; 120) / 10</code><br>
        <code>x̄ = (200 + 180 + 240) / 10 = 620 / 10 = 62,0 ms</code>.`
      },
      {
        id: 'q2',
        stem: 'Uma série temporal de 7 requisições individuais apresentou as seguintes latências em milissegundos: [35, 38, 42, 45, 48, 52, 980]. Se a requisição de 980 ms (um timeout de conexão) for descartada como anomalia, o que ocorrerá respectivamente com a MÉDIA e com a MEDIANA da latência restante?',
        options: [
          {
            label: 'A',
            text: 'A média diminuirá drasticamente; a mediana sofrerá uma redução muito sutil.',
            isCorrect: true,
            feedback: 'Exato! A média original de ~177 ms cai para 43,3 ms (redução de mais de 75%), enquanto a mediana original de 45 ms passa a ser (42 + 45)/2 = 43,5 ms (redução sutil de apenas 1,5 ms).'
          },
          {
            label: 'B',
            text: 'Ambas diminuirão na mesma proporção percentual.',
            isCorrect: false,
            feedback: 'Incorreto. A mediana é uma medida de posição separatriz e não é afetada pela magnitude numérica de valores extremos (outliers).'
          },
          {
            label: 'C',
            text: 'A mediana diminuirá drasticamente; a média permanecerá constante.',
            isCorrect: false,
            feedback: 'Completamente invertido: é a média que sofre o impacto severo da remoção do outlier.'
          },
          {
            label: 'D',
            text: 'Nem a média nem a mediana se alterarão.',
            isCorrect: false,
            feedback: 'Qualquer remoção de elemento altera o tamanho da amostra e modifica o valor pontual da média.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. <em>Amostra original (7 elementos ordenados):</em> <code>[35, 38, 42, 45, 48, 52, 980]</code>.<br>
           - Média original: <code>(35 + 38 + 42 + 45 + 48 + 52 + 980) / 7 = 1.240 / 7 &approx; 177,1 ms</code>.<br>
           - Mediana original: elemento central (4ª posição) = <strong>45 ms</strong>.<br>
        2. <em>Amostra após remoção do outlier (6 elementos):</em> <code>[35, 38, 42, 45, 48, 52]</code>.<br>
           - Nova média: <code>(35 + 38 + 42 + 45 + 48 + 52) / 6 = 260 / 6 &approx; 43,3 ms</code> (queda expressiva de 177 para 43 ms!).<br>
           - Nova mediana: média dos dois centrais (3ª e 4ª posições) = <code>(42 + 45) / 2 = 43,5 ms</code> (variação mínima de apenas 1,5 ms).<br>
        3. Isso comprova por que benchmarks de computação em nuvem utilizam a mediana (p50) como métrica robusta de estabilidade.`
      }
    ],
    spacedRepetition: 'Em 48 horas: explique sem olhar fórmulas por que uma empresa de software prefere exibir aos clientes a latência mediana (p50) e a latência de 99% dos usuários (p99) em vez da média aritmética tradicional.',
    primarySource: 'Processo Seletivo Inteli 2023; Morris H. DeGroot & Mark J. Schervish, "Probability and Statistics", 4th Edition.'
  }
};

// Aliases for user-friendly slugs
BLUEPRINTS['combinatoria-senhas-tech'] = BLUEPRINTS['combinatoria'];
BLUEPRINTS['otimizacao-lucro-startups'] = BLUEPRINTS['funcoes-otimizacao'];
BLUEPRINTS['funcoes'] = BLUEPRINTS['funcoes-otimizacao'];
BLUEPRINTS['logica'] = BLUEPRINTS['logica-proposicional'];
BLUEPRINTS['probabilidade'] = BLUEPRINTS['probabilidade-condicional'];
BLUEPRINTS['algoritmos'] = BLUEPRINTS['algoritmos-pseudocodigo'];
BLUEPRINTS['pseudocodigo'] = BLUEPRINTS['algoritmos-pseudocodigo'];
BLUEPRINTS['geometria'] = BLUEPRINTS['geometria-metricas'];
BLUEPRINTS['estatistica'] = BLUEPRINTS['estatistica-dados'];

/**
 * Scans lessons/ directory and returns the next 4-digit formatted lesson number (e.g. "0001", "0002").
 */
export function getNextLessonNumber(dir = LESSONS_DIR) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return '0001';
  }

  const files = fs.readdirSync(dir);
  let maxNum = 0;

  for (const file of files) {
    const match = file.match(/^(\d{4})-.*\.html$/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > maxNum) maxNum = n;
    }
  }

  return String(maxNum + 1).padStart(4, '0');
}

/**
 * Returns array of available blueprints with key metadata.
 */
export function getAvailableBlueprints() {
  const seen = new Set();
  const list = [];

  for (const [key, bp] of Object.entries(BLUEPRINTS)) {
    if (!seen.has(bp.slug)) {
      seen.add(bp.slug);
      list.push({
        key,
        slug: bp.slug,
        title: bp.title,
        topic: bp.topic,
        estimatedMinutes: bp.estimatedMinutes,
        targetTrack: bp.targetTrack
      });
    }
  }
  return list;
}

/**
 * Builds a fallback generic blueprint for custom topics not in the catalog.
 */
export function createCustomBlueprint(topicOrPrompt) {
  const cleanSlug = topicOrPrompt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'licao-personalizada';

  const cleanTitle = topicOrPrompt.charAt(0).toUpperCase() + topicOrPrompt.slice(1);

  return {
    slug: cleanSlug,
    title: `${cleanTitle}: Modelagem Quantitativa para o Vestibular Inteli`,
    topic: 'Tópico Sob Demanda',
    estimatedMinutes: 8,
    targetTrack: 'Trilha Mediana e Superior',
    contextScenario: {
      company: 'Inteli Tech Labs (Incubadora de Projetos)',
      problem: `Aplicação Prática e Resolução Analítica: ${cleanTitle}`,
      narrativa: `No ecossistema de aprendizagem baseada em projetos do Inteli, engenheiros e líderes aplicam <strong>${cleanTitle}</strong> para construir soluções computacionais escaláveis e tomar decisões de negócios fundamentadas em dados.
      O desafio consiste em decompor o problema em componentes formais, modelar as restrições matemáticas e calcular a resposta ótima com agilidade sob restrição de tempo.`
    },
    coreKnowledge: {
      summary: `O domínio conceitual de <strong>${cleanTitle}</strong> exige compreensão intuitiva antes da aplicação mecânica. Na régua adaptativa do Inteli, enunciados contextualizam o problema com terminologia do ecossistema de inovação.`,
      concepts: [
        {
          term: 'Fundamento e Modelagem',
          definition: `Formalização matemática direta aplicada às restrições operacionais descritas no problema de ${cleanTitle}.`,
          sidenote: 'Separe dados fornecidos das variáveis de decisão antes de iniciar os cálculos.'
        },
        {
          term: 'Estratégia de Resolução Rápida',
          definition: 'Identifique invariâncias, simetrias ou atalhos analíticos para economizar tempo na prova adaptativa de 6 minutos por questão.',
          sidenote: 'Elimine distratores absurdos por análise dimensional ou ordens de grandeza.'
        }
      ],
      formulaCard: {
        title: 'Estrutura Matemática Essencial',
        formulas: [
          { name: 'Relação Fundamental', math: '$$\\text{Entrada} - \\text{Saída} = \\text{Variação}$$' },
          { name: 'Otimização Relativa', math: '$$\\text{Eficiência} = \\frac{\\text{Resultado Obtido}}{\\text{Recursos Consumidos}}$$' }
        ],
        tip: 'Verifique se as unidades estão homogêneas (ex.: segundos vs minutos, bits vs bytes).'
      },
      examTrap: {
        title: 'Armadilha do Padrão Escolar Tradicional',
        description: 'Não tente aplicar fórmulas decoradas sem verificar as restrições de contorno impostas pelo cenário de engenharia.'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: `Ao modelar um problema quantitativo envolvendo ${cleanTitle}, qual abordagem garante a resolução mais precisa e eficiente no vestibular adaptativo do Inteli?`,
        options: [
          {
            label: 'A',
            text: 'Fazer contas numéricas extensas no rascunho sem simplificar termos algébricos.',
            isCorrect: false,
            feedback: 'Contas extensas aumentam a probabilidade de erros aritméticos sob pressão de tempo. Sempre simplifique frações e relações antes de calcular.'
          },
          {
            label: 'B',
            text: 'Mapear as variáveis, identificar o núcleo matemático subjacente e eliminar distratores simétricos.',
            isCorrect: true,
            feedback: 'Exato! O modelo pedagógico do Inteli recompensa a modelagem estruturada e o raciocínio formal ágil.'
          },
          {
            label: 'C',
            text: 'Ignorar o contexto do enunciado e buscar apenas os números no texto.',
            isCorrect: false,
            feedback: 'No Inteli, o contexto define restrições vitais (ex.: ordem de pixels, eixos invertidos, independentes vs dependentes).'
          },
          {
            label: 'D',
            text: 'Chutar a alternativa com o número mais complexo ou decimal.',
            isCorrect: false,
            feedback: 'A TRI do Inteli calibra distratores com precisão técnica; alternativas não são arbitrárias.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Leia o enunciado identificando a pergunta final e as restrições impostas.<br>
        2. Modele a relação matemática entre as variáveis.<br>
        3. Realize simplificações algébricas prévias.<br>
        4. Verifique a coerência do resultado numérico frente ao cenário real.`
      },
      {
        id: 'q2',
        stem: `Em testes de hipótese e modelagem algorítmica para ${cleanTitle}, qual métrica é mais resiliente contra anomalias e valores extremos (outliers)?`,
        options: [
          {
            label: 'A',
            text: 'Média aritmética simples dos valores observados.',
            isCorrect: false,
            feedback: 'A média simples é fortemente distorcida por dados extremos e outliers na amostra.'
          },
          {
            label: 'B',
            text: 'Mediana (p50) e análise de percentis de distribuição.',
            isCorrect: true,
            feedback: 'Correto! A mediana é uma medida separatriz posicional imune a distorções causadas por outliers isolados.'
          },
          {
            label: 'C',
            text: 'Valor máximo registrado no período de pico.',
            isCorrect: false,
            feedback: 'O valor máximo captura unicamente o ponto mais extremo, desconsiderando a tendência central.'
          },
          {
            label: 'D',
            text: 'Soma total não-normalizada dos eventos.',
            isCorrect: false,
            feedback: 'Valores não-normalizados dependem do tempo de observação e não fornecem medida de estabilidade.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. A mediana divide a distribuição em metades exatas de 50%.<br>
        2. A presença de um número arbitrariamente grande ou pequeno não altera a posição do elemento central.<br>
        3. Portanto, em métricas de engenharia e ciência de dados, a mediana e os percentis (p95, p99) são o padrão de aferição.`
      }
    ],
    spacedRepetition: `Em 48 horas: explique em 3 frases para um colega como ${cleanTitle} se conecta a um produto ou software do mundo real.`,
    primarySource: 'Processo Seletivo Inteli (Matriz de Referência e Provas Anteriores); Caderno de Competências em Liderança e Tecnologia.'
  };
}

/**
 * Generates the complete, self-contained Tufte-style HTML document.
 */
export function renderLessonHtml(lessonData) {
  const {
    lessonNumber,
    title,
    topic,
    estimatedMinutes,
    targetTrack,
    contextScenario,
    coreKnowledge,
    quiz,
    spacedRepetition,
    primarySource
  } = lessonData;

  const quizQuestionsHtml = quiz.map((q, idx) => {
    const optionsHtml = q.options.map(opt => `
      <button class="quiz-option" type="button" data-correct="${opt.isCorrect}" data-feedback="${escapeHtml(opt.feedback)}">
        <span class="option-label">${opt.label}</span>
        <span class="option-text">${opt.text}</span>
      </button>
    `).join('\n');

    return `
      <div class="quiz-question" data-question-id="${q.id}">
        <div class="question-header">
          <span class="question-number">Questão ${idx + 1} de ${quiz.length}</span>
        </div>
        <p class="question-stem">${q.stem}</p>
        <div class="quiz-options">
          ${optionsHtml}
        </div>
        <div class="quiz-feedback hidden"></div>
        <div class="quiz-resolution hidden">
          <div class="resolution-title">🔍 Resolução Oficial Comentada</div>
          <div class="resolution-content">${q.resolution}</div>
        </div>
      </div>
    `;
  }).join('\n');

  const conceptsHtml = coreKnowledge.concepts.map(c => `
    <div class="concept-item">
      <h3 class="concept-term">${c.term}</h3>
      <p class="concept-def">${c.definition}</p>
      ${c.sidenote ? `<aside class="sidenote"><strong>Nota lateral:</strong> ${c.sidenote}</aside>` : ''}
    </div>
  `).join('\n');

  const formulasHtml = coreKnowledge.formulaCard.formulas.map(f => `
    <div class="formula-row">
      <span class="formula-name">${f.name}:</span>
      <div class="formula-math">${f.math}</div>
    </div>
  `).join('\n');

  const rawHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lição ${lessonNumber}: ${escapeHtml(title)} | Inteli Vestibular</title>
  
  <!-- Estilos Oficiais -->
  <link rel="stylesheet" href="../assets/lesson.css">
  
  <!-- KaTeX Math Rendering -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}, {left: '\\(', right: '\\)', display: false}, {left: '\\[', right: '\\]', display: true}], throwOnError: false})"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      if (window.renderMathInElement) {
        renderMathInElement(document.body, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
          ],
          throwOnError: false
        });
      }
    });
  </script>
</head>
<body>
  <div class="lesson-container">
    <article class="lesson">
      <header class="lesson-header">
        <span class="lesson-badge">Lição ${lessonNumber}</span>
        <h1 class="lesson-title">${escapeHtml(title)}</h1>
        <div class="lesson-meta">
          <span class="meta-time">⏱️ Tempo Estimado: ${estimatedMinutes} min</span>
          <span>•</span>
          <span class="meta-topic">🎯 Eixo: ${escapeHtml(topic)}</span>
          <span>•</span>
          <span class="meta-track">📈 ${escapeHtml(targetTrack)}</span>
        </div>
        <div class="lesson-meta" style="margin-top: 0.5rem;">
          <a href="../MISSION.md">← Voltar para a Missão</a>
          <span>•</span>
          <a href="../GLOSSARY.md">📖 Glossário de Conceitos</a>
        </div>
      </header>

      <!-- 1. CENÁRIO CONTEXTUAL INTELI -->
      <section class="scenario">
        <h2>Cenário Real Inteli</h2>
        <div class="scenario-box">
          <div class="scenario-tag">🏢 ${escapeHtml(contextScenario.company)} | ${escapeHtml(contextScenario.problem)}</div>
          <p>${contextScenario.narrativa}</p>
        </div>
      </section>

      <!-- 2. NÚCLEO CONCEITUAL -->
      <section class="core-knowledge">
        <h2>Núcleo Conceitual</h2>
        <p class="lead-summary">${coreKnowledge.summary}</p>
        
        <div class="concepts-list">
          ${conceptsHtml}
        </div>

        <div class="formula-card">
          <div class="formula-card-title">📌 ${escapeHtml(coreKnowledge.formulaCard.title)}</div>
          ${formulasHtml}
          ${coreKnowledge.formulaCard.tip ? `<div class="formula-tip">💡 <strong>Dica de Ouro:</strong> ${coreKnowledge.formulaCard.tip}</div>` : ''}
        </div>

        ${coreKnowledge.examTrap ? `
        <div class="callout callout-trap">
          <h4>⚠️ ${escapeHtml(coreKnowledge.examTrap.title)}</h4>
          <p>${coreKnowledge.examTrap.description}</p>
        </div>` : ''}
      </section>

      <!-- 3. PRÁTICA DE RECUPERAÇÃO ATIVA (QUIZ) -->
      <section class="retrieval-quiz" id="quiz">
        <h2>Prática de Recuperação Ativa (Retrieval Practice)</h2>
        <p class="quiz-intro">Responda às questões abaixo sem consultar materiais. O feedback é instantâneo e calibrado com os distratores da banca Inteli.</p>
        ${quizQuestionsHtml}
      </section>

      <!-- 4. REPETIÇÃO ESPAÇADA (STORAGE STRENGTH) -->
      <section class="spaced-repetition">
        <h2>Desafio de 48 Horas (Storage Strength)</h2>
        <div class="spaced-prompt">
          <div class="spaced-tag">🧠 Teste de Fixação e Evocação Tardia</div>
          <p class="prompt-question"><strong>${spacedRepetition}</strong></p>
          <p style="font-size:0.9rem; color:#666; margin-top:0.5rem;"><em>Dica da Ciência Cognitiva:</em> Responder a esta pergunta mentalmente após 2 dias consolida o aprendizado na memória de longo prazo (efeito de recuperação espaçada de Bjork).</p>
        </div>
      </section>

      <!-- 5. FONTE PRIMÁRIA -->
      <footer class="lesson-footer">
        <div class="source-citation">
          <strong>📚 Fonte Primária e Referência Acadêmica:</strong><br>
          <span>${escapeHtml(primarySource)}</span>
        </div>
        <div class="footer-nav">
          <a href="../MISSION.md">← Sumário da Missão</a>
          <a href="../GLOSSARY.md">📖 Glossário Técnico</a>
          <a href="#quiz">↑ Repetir Questões</a>
        </div>
      </footer>
    </article>
  </div>

  <!-- Script Externo Oficial -->
  <script src="../assets/quiz.js" defer></script>

  <!-- Script Fallback Autônomo de Quiz (Zero Dependências) -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const questions = document.querySelectorAll('.quiz-question');

      questions.forEach((q) => {
        const options = q.querySelectorAll('.quiz-option');
        const feedbackBox = q.querySelector('.quiz-feedback');
        const resolutionBox = q.querySelector('.quiz-resolution');

        options.forEach(opt => {
          opt.addEventListener('click', () => {
            // Desativa botões da pergunta atual
            options.forEach(b => {
              b.disabled = true;
              if (b.getAttribute('data-correct') === 'true') {
                b.classList.add('correct');
              }
            });

            const isCorrect = opt.getAttribute('data-correct') === 'true';
            const feedbackText = opt.getAttribute('data-feedback');

            if (!isCorrect) {
              opt.classList.add('incorrect');
              if (feedbackBox) {
                feedbackBox.className = 'quiz-feedback danger';
                feedbackBox.innerHTML = '<strong>❌ Incorreto.</strong> ' + feedbackText;
                feedbackBox.classList.remove('hidden');
              }
            } else {
              if (feedbackBox) {
                feedbackBox.className = 'quiz-feedback success';
                feedbackBox.innerHTML = '<strong>✅ Correto!</strong> ' + feedbackText;
                feedbackBox.classList.remove('hidden');
              }
            }

            // Exibe resolução passo a passo
            if (resolutionBox) {
              resolutionBox.classList.remove('hidden');
            }

            // Dispara evento para telemetria ou integração
            document.dispatchEvent(new CustomEvent('quiz:answered', {
              detail: {
                questionId: q.getAttribute('data-question-id'),
                isCorrect: isCorrect
              }
            }));
          });
        });
      });
      // Garante scroll horizontal responsivo para todas as tabelas
      document.querySelectorAll('table').forEach(function(table) {
        if (!table.parentElement.classList.contains('table-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'table-wrapper';
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }
      });
    });
  </script>
</body>
</html>`;

  // Envolve tabelas em .table-wrapper para renderização estática e SSR
  return rawHtml.replace(/(?:<div class="table-wrapper">\s*)?(<table[\s\S]*?<\/table>)(?:\s*<\/div>)?/gi, (match, table) => {
    return `<div class="table-wrapper">\n${table}\n</div>`;
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Main lesson generator function.
 * @param {string} topicOrPrompt - Topic slug or custom prompt
 * @param {object} [options] - Configuration options
 * @param {string} [options.outputDir] - Destination folder (defaults to 'lessons/')
 * @param {string} [options.customTitle] - Optional custom title override
 * @param {string} [options.lessonNumber] - Explicit lesson number (defaults to auto-increment)
 * @returns {object} { path, lessonNumber, slug, title, html }
 */
export function generateLesson(topicOrPrompt, options = {}) {
  const normalizedKey = (topicOrPrompt || '').trim().toLowerCase();
  let blueprint = BLUEPRINTS[normalizedKey];

  if (!blueprint) {
    blueprint = createCustomBlueprint(topicOrPrompt || 'Licao-Generica');
  }

  const outputDir = options.outputDir || LESSONS_DIR;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const lessonNumber = options.lessonNumber || getNextLessonNumber(outputDir);
  const title = options.customTitle || blueprint.title;

  const lessonData = {
    ...blueprint,
    title,
    lessonNumber
  };

  const html = renderLessonHtml(lessonData);
  const fileName = `${lessonNumber}-${blueprint.slug}.html`;
  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, html, 'utf-8');

  return {
    filePath,
    fileName,
    lessonNumber,
    slug: blueprint.slug,
    title,
    estimatedMinutes: blueprint.estimatedMinutes,
    questionCount: blueprint.quiz ? blueprint.quiz.length : 0,
    html
  };
}
