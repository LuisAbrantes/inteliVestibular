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
  ,
  'conjuntos-venn': {
    slug: 'conjuntos-diagramas-venn-tech',
    title: 'Teoria dos Conjuntos: Diagramas de Venn, SQL e Análise de Coortes em SaaS',
    topic: 'Conjuntos e Diagramas de Venn',
    estimatedMinutes: 8,
    targetTrack: 'Trilha Mediana e Superior',
    contextScenario: {
      company: 'DataFlow SaaS (Plataforma de Product Analytics e CRM)',
      problem: 'Segmentação de Coortes de Usuários Ativos e Otimização de Consultas SQL',
      narrativa: `A <strong>DataFlow SaaS</strong> audita o engajamento mensal de 10.000 usuários cadastrados em sua plataforma. O time de Growth rastreia três recursos essenciais:
      <ul>
        <li><strong>Módulo A (Dashboard de BI):</strong> utilizado por 4.500 contas.</li>
        <li><strong>Módulo B (Automação de Marketing):</strong> utilizado por 3.800 contas.</li>
        <li><strong>Módulo C (Pipeline de Vendas):</strong> utilizado por 2.700 contas.</li>
      </ul>
      Além disso, os relatórios indicam que 1.400 contas usam A e B; 1.100 usam A e C; 900 usam B e C; e 400 utilizam todos os três módulos. O engenheiro de dados precisa calcular exatamente quantas contas utilizam <em>pelo menos um</em> dos três módulos para dimensionar o pool de conexões do banco de dados e quantificar a coorte que usa <em>exatamente dois</em> recursos.`
    },
    coreKnowledge: {
      summary: 'Teoria dos conjuntos no vestibular do Inteli conecta a álgebra booleana e diagramas de Venn com segmentações de produto e modelagem de queries relacionais (INNER JOIN, LEFT JOIN e FULL OUTER JOIN). O princípio fundamental é a correta aplicação do Princípio da Inclusão-Exclusão para evitar duplicação ou omissão de intersecções.',
      concepts: [
        {
          term: 'Princípio da Inclusão-Exclusão (3 Conjuntos)',
          definition: '$$n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - [n(A \\cap B) + n(A \\cap C) + n(B \\cap C)] + n(A \\cap B \\cap C)$$',
          sidenote: 'Ao somar os conjuntos isoladamente, as interseções duplas são contadas duas vezes e a interseção tripla é contada três vezes; por isso é necessário subtrair as duplas e somar a tripla ao final.'
        },
        {
          term: 'Preenchimento de Dentro para Fora (Inside-Out)',
          definition: 'Para resolver qualquer diagrama de Venn de 3 variáveis sem errar sinais, SEMPRE inicie o preenchimento pela região central comum às três partes ($A \\cap B \\cap C$). Em seguida, deduza as interseções exclusivas de dois a dois e, por fim, as regiões estritamente exclusivas.',
          sidenote: 'Essa regra algorítmica reduz a zero o risco de contagem redundante sob pressão de tempo.'
        }
      ],
      formulaCard: {
        title: 'Formulário Essencial de Conjuntos',
        formulas: [
          { name: 'Inclusão-Exclusão (2 Conjuntos)', math: '$$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$$' },
          { name: 'Inclusão-Exclusão (3 Conjuntos)', math: '$$n(A \\cup B \\cup C) = \\sum n(A) - \\sum n(A \\cap B) + n(A \\cap B \\cap C)$$' },
          { name: 'Regiões Exclusivas a Exatamente Dois', math: '$$n_{\\text{exat. 2}} = [n(A \\cap B) - n_3] + [n(A \\cap C) - n_3] + [n(B \\cap C) - n_3]$$' }
        ],
        tip: 'Se o enunciado diz "usam A e B", isso INCLUI quem usa os três módulos. Se diz "usam APENAS A e B", já é a interseção exclusiva sem os três.'
      },
      examTrap: {
        title: 'Armadilha do "A e B" vs "Apenas A e B"',
        description: 'O distrator clássico da banca consiste em subtrair n(A ∩ B ∩ C) de um dado que o enunciado já forneceu como exclusivo ("apenas A e B"), ou esquecer de subtrair quando o dado fornecido era a interseção ampla ("usam A e B"). Preste atenção cirúrgica no advérbio "apenas" ou "somente".'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'Com base nos dados da DataFlow SaaS (4.500 em A, 3.800 em B, 2.700 em C, 1.400 em A e B, 1.100 em A e C, 900 em B e C, e 400 nos três), quantas contas utilizam PELO MENOS UM dos três módulos?',
        options: [
          {
            label: 'A',
            text: '11.000 contas',
            isCorrect: false,
            feedback: '11.000 é a soma simples n(A) + n(B) + n(C) = 4.500 + 3.800 + 2.700, que desconsidera as sobreposições de contas que usam múltiplos módulos.'
          },
          {
            label: 'B',
            text: '7.600 contas',
            isCorrect: false,
            feedback: '7.600 decorre de subtrair as interseções duplas (11.000 - 3.400 = 7.600), mas esquecer de somar a interseção tripla de 400 ao final.'
          },
          {
            label: 'C',
            text: '8.000 contas',
            isCorrect: true,
            feedback: 'Exato! n(A ∪ B ∪ C) = 4.500 + 3.800 + 2.700 - (1.400 + 1.100 + 900) + 400 = 11.000 - 3.400 + 400 = 8.000 contas ativas.'
          },
          {
            label: 'D',
            text: '8.400 contas',
            isCorrect: false,
            feedback: '8.400 resultou de somar a interseção tripla duas vezes ou errar a soma das interseções duplas.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Aplicamos o Princípio da Inclusão-Exclusão:<br>
        <code>n(A &cup; B &cup; C) = n(A) + n(B) + n(C) - [n(A &cap; B) + n(A &cap; C) + n(B &cap; C)] + n(A &cap; B &cap; C)</code>.<br>
        2. Soma dos conjuntos individuais: <code>4.500 + 3.800 + 2.700 = 11.000</code>.<br>
        3. Soma das interseções duplas: <code>1.400 + 1.100 + 900 = 3.400</code>.<br>
        4. Interseção tripla: <code>400</code>.<br>
        5. Cálculo final: <code>11.000 - 3.400 + 400 = 8.000</code> contas utilizam ao menos um recurso.<br>
        6. As 2.000 contas restantes (10.000 - 8.000) estão inativas ou utilizam recursos básicos fora desses três módulos.`
      },
      {
        id: 'q2',
        stem: 'Quantas contas da DataFlow SaaS utilizam EXATAMENTE DOIS dos três módulos analisados?',
        options: [
          {
            label: 'A',
            text: '3.400 contas',
            isCorrect: false,
            feedback: '3.400 é a soma direta 1.400 + 1.100 + 900, que conta as 400 contas que usam os três módulos três vezes repetidas.'
          },
          {
            label: 'B',
            text: '2.200 contas',
            isCorrect: true,
            feedback: 'Perfeito! Cada interseção exclusiva de dois módulos subtrai a tripla: (1.400 - 400) + (1.100 - 400) + (900 - 400) = 1.000 + 700 + 500 = 2.200 contas.'
          },
          {
            label: 'C',
            text: '3.000 contas',
            isCorrect: false,
            feedback: '3.000 subtraiu a interseção tripla apenas uma vez (3.400 - 400), em vez de subtrair de cada uma das três interseções duplas.'
          },
          {
            label: 'D',
            text: '1.800 contas',
            isCorrect: false,
            feedback: '1.800 decorre de subtrair a interseção tripla quatro vezes por equívoco algébrico.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. As interseções dadas incluem os usuários que usam os 3 módulos (<code>n_3 = 400</code>).<br>
        2. Usuários que usam <em>apenas A e B</em>: <code>1.400 - 400 = 1.000</code>.<br>
        3. Usuários que usam <em>apenas A e C</em>: <code>1.100 - 400 = 700</code>.<br>
        4. Usuários que usam <em>apenas B e C</em>: <code>900 - 400 = 500</code>.<br>
        5. Total que utiliza exatamente dois módulos: <code>1.000 + 700 + 500 = 2.200</code> contas.`
      }
    ],
    spacedRepetition: 'Em 48 horas: desenhe em um rascunho de papel um diagrama de Venn com 3 círculos e preencha as 8 regiões disjuntas utilizando os números deste problema começando rigorosamente pela região central (400).',
    primarySource: 'Processo Seletivo Inteli 2024; Paul R. Halmos, "Naive Set Theory"; Edital Oficial Inteli (Anexo II - Conjuntos).'
  },
  'bases-numericas': {
    slug: 'bases-numericas-binario-hexadecimal',
    title: 'Sistemas de Numeração: Binário, Hexadecimal, Bits e Máscaras de Rede',
    topic: 'Aritmética Básica e Sistemas de Numeração',
    estimatedMinutes: 8,
    targetTrack: 'Trilha Mediana e Superior',
    contextScenario: {
      company: 'PacketCore Networks (Infraestrutura de Roteamento de Alta Velocidade)',
      problem: 'Auditoria de Máscaras de Sub-Rede IPv4 e Decodificação de Flags Hexadecimais',
      narrativa: `Na <strong>PacketCore Networks</strong>, um firewall de alta performance inspeciona pacotes IP em tempo real. Cada cabeçalho possui dois campos cruciais:
      <ol>
        <li>Uma <strong>máscara de sub-rede</strong> CIDR <code>/26</code> que determina o range de hosts de um cluster de microsserviços em um bloco IPv4 (ex.: <code>192.168.10.0/26</code>).</li>
        <li>Um <strong>byte de status de telemetria</strong> codificado em hexadecimal como <code>0xB6</code>, onde cada bit individual atua como uma flag de sinalização de hardware (do bit 0 menos significativo ao bit 7 mais significativo).</li>
      </ol>
      O engenheiro de redes precisa calcular rapidamente a quantidade de endereços de hosts utilizáveis na sub-rede e identificar quais flags binárias específicas estão ativas no byte <code>0xB6</code>.`
    },
    coreKnowledge: {
      summary: 'Sistemas de numeração no Inteli exigem domínio prático da notação posicional em potências de 2 e 16, além de compreensão da arquitetura de dados (bits, bytes, nibbles e máscaras lógicas). Não perca tempo dividindo por 2 repetidas vezes: domine o agrupamento de 4 bits (nibble) para hexadecimal e a subtração de potências de 2.',
      concepts: [
        {
          term: 'Notação Posicional em Base b',
          definition: '$$N = d_k b^k + d_{k-1} b^{k-1} + \\dots + d_1 b^1 + d_0 b^0$$ Em binário ($b=2$), cada dígito vale 0 ou 1. Em hexadecimal ($b=16$), dígitos de 0 a 9 e A(10), B(11), C(12), D(13), E(14), F(15).',
          sidenote: '1 dígito hexadecimal mapeia perfeitamente para 4 bits binários (2^4 = 16).'
        },
        {
          term: 'Máscaras de Sub-rede e Capacidade de Hosts',
          definition: 'Em uma máscara IPv4 CIDR /k, os k bits mais à esquerda identificam a rede e os 32 - k bits identificam hosts. A quantidade total de endereços é 2^(32-k), e a de hosts úteis é 2^(32-k) - 2 (excluindo endereço de rede e broadcast).',
          sidenote: 'Regra de ouro: subtrair 2 endereços reservados (todos os bits de host em 0 e todos em 1).'
        }
      ],
      formulaCard: {
        title: 'Tabela Rápida de Potências e Nibbles',
        formulas: [
          { name: 'Potências de 2', math: '$$2^0=1, 2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32, 2^6=64, 2^7=128$$' },
          { name: 'Hosts Úteis (/k)', math: '$$N_{\\text{hosts}} = 2^{32 - k} - 2$$' },
          { name: 'Conversão Hex-Bin', math: '$$\\text{0xB} = 11 = 1011_2, \\quad \\text{0x6} = 6 = 0110_2$$' }
        ],
        tip: 'Para converter qualquer hex para binário, converta cada dígito separadamente em um grupo de 4 bits: 0xB6 = 1011 0110₂.'
      },
      examTrap: {
        title: 'Esquecer os 2 Endereços Reservados em Sub-redes',
        description: 'Em problemas de redes e dimensionamento de servidores, 2^(32-k) é o total de endereços IP teóricos. O número de máquinas/hosts reais utilizáveis é SEMPRE 2^(32-k) - 2. A banca SEMPRE coloca 2^(32-k) como distrator!'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'Um cluster de microsserviços da PacketCore opera sob uma máscara de sub-rede IPv4 com prefixo CIDR /26. Quantos endereços IP válidos estão disponíveis exclusivamente para atribuição a servidores (hosts úteis) nessa sub-rede?',
        options: [
          {
            label: 'A',
            text: '64 endereços',
            isCorrect: false,
            feedback: '64 é o total absoluto de endereços (2^(32-26) = 2^6 = 64). É obrigatório subtrair os 2 endereços reservados (rede e broadcast).'
          },
          {
            label: 'B',
            text: '62 endereços',
            isCorrect: true,
            feedback: 'Correto! Com /26, restam 32 - 26 = 6 bits para hosts. 2^6 = 64 endereços no total, menos 2 reservados = 62 hosts utilizáveis.'
          },
          {
            label: 'C',
            text: '30 endereços',
            isCorrect: false,
            feedback: '30 endereços corresponderia a uma sub-rede /27 (2^5 - 2 = 30).'
          },
          {
            label: 'D',
            text: '126 endereços',
            isCorrect: false,
            feedback: '126 endereços corresponderia a uma sub-rede /25 (2^7 - 2 = 126).'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. O endereço IPv4 possui 32 bits no total.<br>
        2. O prefixo <code>/26</code> reserva 26 bits para o identificador da rede.<br>
        3. Os bits restantes para identificação de máquinas (hosts) são: <code>32 - 26 = 6 bits</code>.<br>
        4. O número total de combinações de endereços é: <code>2^6 = 64</code>.<br>
        5. Subtrai-se 1 endereço para identificação da rede (todos os bits de host em 0) e 1 endereço para broadcast (todos os bits em 1):<br>
        <code>64 - 2 = 62</code> endereços úteis para hosts.`
      },
      {
        id: 'q2',
        stem: 'O byte de telemetria recebido pelo firewall é 0xB6 (hexadecimal). Convertendo esse valor para o sistema binário de 8 bits e para o sistema decimal, quais valores representam rigorosamente esse byte?',
        options: [
          {
            label: 'A',
            text: 'Binário: 10110110 e Decimal: 182',
            isCorrect: true,
            feedback: 'Exato! 0xB = 11 = 1011₂ e 0x6 = 6 = 0110₂, logo 0xB6 = 10110110₂. Em decimal: 128 + 32 + 16 + 4 + 2 = 182.'
          },
          {
            label: 'B',
            text: 'Binário: 10100110 e Decimal: 166',
            isCorrect: false,
            feedback: '1010₂ é 0xA (10 decimal), não 0xB (11 decimal).'
          },
          {
            label: 'C',
            text: 'Binário: 10110110 e Decimal: 178',
            isCorrect: false,
            feedback: 'A conversão binária está correta, mas a soma decimal foi calculada incorretamente (128 + 32 + 16 + 4 + 2 = 182, não 178).'
          },
          {
            label: 'D',
            text: 'Binário: 11010110 e Decimal: 214',
            isCorrect: false,
            feedback: '1101₂ corresponde a 0xD (13 decimal), e não 0xB (11 decimal).'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Decomposição em dois nibbles (4 bits cada):<br>
           - Primeiro dígito: <code>0xB = 11</code> decimal = <code>8 + 2 + 1 = 1011_2</code>.<br>
           - Segundo dígito: <code>0x6 = 6</code> decimal = <code>4 + 2 = 0110_2</code>.<br>
        2. Concatenação dos nibbles: <code>1011 0110_2</code>.<br>
        3. Conversão para base 10 pela notação posicional:<br>
           <code>N = 11 &times; 16^1 + 6 &times; 16^0 = 11 &times; 16 + 6 = 176 + 6 = 182</code>.<br>
           Ou somando as potências de 2 dos bits ativos: <code>128 + 32 + 16 + 4 + 2 = 182</code>.`
      }
    ],
    spacedRepetition: 'Em 48 horas: converta sem calculadora o endereço IP 192.168.1.1 para binário e o código hexadecimal 0x4F para binário e decimal.',
    primarySource: 'Processo Seletivo Inteli 2023; David A. Patterson & John L. Hennessy, "Computer Organization and Design"; Edital Oficial Inteli (Anexo II - Aritmética Básica).'
  },
  'geometria-plana-espacial': {
    slug: 'geometria-plana-espacial-3d',
    title: 'Geometria Plana e Espacial: Relação de Euler, Volumes e Impressão 3D',
    topic: 'Geometria Plana e Espacial',
    estimatedMinutes: 8,
    targetTrack: 'Trilha Mediana e Superior',
    contextScenario: {
      company: 'Forge3D Labs (Startup de Prototipagem Rápida e Manufatura Aditiva)',
      problem: 'Dimensionamento Volumétrico de Filamento PLA e Auditoria Topológica de Malhas',
      narrativa: `A <strong>Forge3D Labs</strong> produz carcaças ergonômicas para dispositivos IoT via impressão 3D (FDM). Uma nova peça para sensores automotivos é modelada geometricamente por um <strong>cilindro reto</strong> de raio $r = 3\\text{ cm}$ e altura $h = 10\\text{ cm}$, encimado por uma <strong>semiesfera superior</strong> de mesmo raio ($r = 3\\text{ cm}$).
      Adicionalmente, a malha poligonal de fatiamento digital (STL) é um poliedro convexo fechado composto exclusivamente por 20 faces triangulares e 12 faces pentagonais. O engenheiro precisa calcular o volume total da peça (para prever o consumo de filamento termoplástico com $\\pi \\approx 3,14$) e verificar a integridade da malha calculando o número de vértices pela Relação de Euler.`
    },
    coreKnowledge: {
      summary: 'Geometria espacial no Inteli é aplicada a modelagens de hardware, CAD e consumo de materiais. É indispensável dominar as relações de volume dos sólidos de revolução (cilindros, cones e esferas) e o teorema topológico de Euler para poliedros convexos fechados.',
      concepts: [
        {
          term: 'Relação de Euler e Contagem de Arestas',
          definition: 'Em todo poliedro convexo: $$V - A + F = 2$$ e a soma dos lados de todas as faces é igual ao dobro do número de arestas: $$2A = \\sum (n_i \\cdot F_i)$$',
          sidenote: 'Cada aresta é compartilhada por exatamente duas faces contíguas; logo, somar os lados das faces conta cada aresta duas vezes.'
        },
        {
          term: 'Volumes de Sólidos Fundamentais',
          definition: 'Cilindro: $V_{\\text{cil}} = \\pi r^2 h$. Esfera: $V_{\\text{esf}} = \\frac{4}{3} \\pi r^3$ (semiesfera: $\\frac{2}{3} \\pi r^3$). Cone: $V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h$. Prisma: $V = A_{\\text{base}} \\cdot h$.',
          sidenote: 'Em peças compostas, decomponha o sólido nas partes elementares e some os volumes.'
        }
      ],
      formulaCard: {
        title: 'Formulário de Geometria Espacial',
        formulas: [
          { name: 'Euler', math: '$$V - A + F = 2$$' },
          { name: 'Arestas por Faces', math: '$$2A = 3F_3 + 4F_4 + 5F_5 + \\dots$$' },
          { name: 'Volume Cilindro', math: '$$V = \\pi r^2 h$$' },
          { name: 'Volume Semiesfera', math: '$$V = \\frac{2}{3} \\pi r^3$$' }
        ],
        tip: 'Primeiro calcule A através de 2A = ∑ n_i F_i, depois ache V isolando na relação de Euler: V = A + 2 - F.'
      },
      examTrap: {
        title: 'Confundir Volume de Esfera com Semiesfera',
        description: 'Quando a peça for uma cúpula ou semiesfera, lembre-se de usar 2/3 π r³ e não 4/3 π r³. Esse é um dos distratores numéricos mais comuns da banca.'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'Uma malha digital STL de um protótipo 3D é um poliedro convexo fechado constituído exclusivamente por 20 faces triangulares e 12 faces pentagonais. Quantos VÉRTICES possui essa malha poligonal?',
        options: [
          {
            label: 'A',
            text: '30 vértices',
            isCorrect: true,
            feedback: 'Perfeito! 2A = 20×3 + 12×5 = 60 + 60 = 120 ⇒ A = 60. F = 20 + 12 = 32. Pela Relação de Euler: V = A + 2 - F = 60 + 2 - 32 = 30 vértices.'
          },
          {
            label: 'B',
            text: '32 vértices',
            isCorrect: false,
            feedback: '32 é o número de faces (20 + 12 = 32), não o número de vértices.'
          },
          {
            label: 'C',
            text: '60 vértices',
            isCorrect: false,
            feedback: '60 é o número de arestas A do poliedro, não de vértices.'
          },
          {
            label: 'D',
            text: '28 vértices',
            isCorrect: false,
            feedback: '28 decorre de subtrair o termo +2 em vez de somar na relação de Euler (60 - 32 - 2 = 26 ou erro semelhante).'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Total de faces: <code>F = 20 + 12 = 32 faces</code>.<br>
        2. Cada triângulo tem 3 lados e cada pentágono tem 5 lados. Como cada aresta pertence a duas faces:<br>
        <code>2A = 20 &times; 3 + 12 &times; 5 = 60 + 60 = 120 &rArr; A = 60 arestas</code>.<br>
        3. Aplicando a Relação de Euler para poliedros convexos:<br>
        <code>V - A + F = 2</code><br>
        <code>V - 60 + 32 = 2</code><br>
        <code>V - 28 = 2 &rArr; V = 30 vértices</code>.`
      },
      {
        id: 'q2',
        stem: 'A peça sólida para o sensor é composta por um cilindro reto (raio 3 cm e altura 10 cm) encimado por uma semiesfera (raio 3 cm). Adotando π = 3,14, qual é o volume total aproximado de filamento necessário para imprimir a peça sólida?',
        options: [
          {
            label: 'A',
            text: '339,12 cm³',
            isCorrect: true,
            feedback: 'Exato! V_cilindro = π·3²·10 = 90π ≈ 282,6 cm³. V_semiesfera = (2/3)·π·3³ = 18π ≈ 56,52 cm³. Volume Total = 108π ≈ 339,12 cm³.'
          },
          {
            label: 'B',
            text: '282,60 cm³',
            isCorrect: false,
            feedback: '282,60 cm³ corresponde apenas ao volume do cilindro, omitindo a semiesfera superior.'
          },
          {
            label: 'C',
            text: '395,64 cm³',
            isCorrect: false,
            feedback: '395,64 cm³ utilizou a fórmula da esfera completa (4/3 π r³ = 36π) em vez da semiesfera (18π).'
          },
          {
            label: 'D',
            text: '452,16 cm³',
            isCorrect: false,
            feedback: '452,16 cm³ utilizou o diâmetro (6 cm) como raio no cálculo do cilindro.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. <em>Volume do Cilindro:</em><br>
        <code>V_cil = &pi; &times; r^2 &times; h = &pi; &times; 3^2 &times; 10 = 90&pi; cm^3</code>.<br>
        2. <em>Volume da Semiesfera:</em><br>
        <code>V_semi = (2/3) &times; &pi; &times; r^3 = (2/3) &times; &pi; &times; 27 = 18&pi; cm^3</code>.<br>
        3. <em>Volume Total da Peça:</em><br>
        <code>V_total = 90&pi; + 18&pi; = 108&pi; cm^3</code>.<br>
        4. Substituindo <code>&pi; = 3,14</code>:<br>
        <code>V_total = 108 &times; 3,14 = 339,12 cm^3</code> de filamento PLA.`
      }
    ],
    spacedRepetition: 'Em 48 horas: calcule de cabeça a relação de Euler para um icosaedro regular (20 faces triangulares) e determine quantas arestas e vértices ele possui.',
    primarySource: 'Processo Seletivo Inteli 2025.1; H.S.M. Coxeter, "Regular Polytopes"; Edital Oficial Inteli (Anexo II - Geometria Espacial).'
  },
  'trigonometria-vetores': {
    slug: 'trigonometria-vetores-computacao',
    title: 'Trigonometria e Vetores: Produto Escalar, Projeção e Similaridade de Cosseno em IA',
    topic: 'Trigonometria e Vetores',
    estimatedMinutes: 8,
    targetTrack: 'Trilha Superior e Mediana',
    contextScenario: {
      company: 'Vectura AI (Motor de Busca Semântica e Recuperação Vetorial - RAG)',
      problem: 'Similaridade Angular de Embeddings e Otimização de Raycasting Gráfico',
      narrativa: `A <strong>Vectura AI</strong> desenvolve um mecanismo de busca vetorial para modelos de linguagem (LLMs). Quando um usuário faz uma pergunta, tanto a query quanto os documentos na base de conhecimento são representados por vetores de alta dimensão no espaço euclidiano.
      Para ranquear os documentos mais relevantes sem sofrer distorção pelo comprimento do texto, o sistema calcula a <strong>Similaridade de Cosseno</strong> entre o vetor da query $\\vec{u}$ e o vetor do documento $\\vec{v}$, baseada no <strong>Produto Escalar</strong>:
      $$\\cos \\theta = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| |\\vec{v}|}$$
      Simultaneamente, a engine gráfica da interface projeta raios de câmera (raycasting) para verificar o campo de visão (FOV) e ortogonalidade em um plano 2D com ângulos trigonométricos de $30^\\circ, 45^\\circ$ e $60^\\circ$. O arquiteto do sistema deve calcular a similaridade vetorial e o ângulo entre trajetórias.`
    },
    coreKnowledge: {
      summary: 'Trigonometria e vetores no Inteli são instrumentos de computação linear: produto escalar, normas euclidianas, ortogonalidade e projeções angulares. O conceito central em IA e computação gráfica é que vetores ortogonais possuem produto escalar zero (cos 90° = 0) e vetores colineares no mesmo sentido possuem similaridade máxima (cos 0° = 1).',
      concepts: [
        {
          term: 'Produto Escalar Algébrico e Geométrico',
          definition: 'No plano/espaço: $$\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y + u_z v_z = |\\vec{u}| |\\vec{v}| \\cos \\theta$$',
          sidenote: 'O produto escalar de dois vetores resulta em um número escalar (não em um vetor).'
        },
        {
          term: 'Similaridade de Cosseno em IA (Embeddings)',
          definition: 'A proximidade semântica entre dois vetores de embeddings normaliza o produto escalar pela magnitude (norma) de cada vetor: $$\\text{cos-sim}(\\vec{u}, \\vec{v}) = \\frac{\\sum u_i v_i}{\\sqrt{\\sum u_i^2} \\cdot \\sqrt{\\sum v_i^2}}$$',
          sidenote: 'Varia entre -1 (vetores diametralmente opostos) e +1 (vetores exatamente alinhados). Zero indica ortogonalidade absoluta (sem correlação).'
        }
      ],
      formulaCard: {
        title: 'Formulário de Vetores e Trigonometria',
        formulas: [
          { name: 'Norma Euclidiana', math: '$$|\\vec{u}| = \\sqrt{u_x^2 + u_y^2 + u_z^2}$$' },
          { name: 'Produto Escalar', math: '$$\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y + u_z v_z$$' },
          { name: 'Cosseno do Ângulo', math: '$$\\cos \\theta = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| |\\vec{v}|}$$' },
          { name: 'Condição de Ortogonalidade', math: '$$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$$' }
        ],
        tip: 'Se o produto escalar der zero, os vetores são estritamente perpendiculares (ângulo de 90°), dispensando calcular as normas.'
      },
      examTrap: {
        title: 'Confundir Produto Escalar com Multiplicação Componente a Componente',
        description: 'O produto escalar NÃO gera um vetor (ux*vx, uy*vy), ele gera a SOMA dos produtos escalares: ux*vx + uy*vy. Além disso, jamais esqueça de dividir pelo produto das normas quando a questão pedir o cosseno ou a similaridade angular.'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'No sistema de busca semântica da Vectura AI, a query de um usuário gerou o vetor de embedding u = (1, 2, 2) e um documento relevante no banco de dados gerou o vetor v = (2, 2, 1). Qual é a Similaridade de Cosseno entre a query e esse documento?',
        options: [
          {
            label: 'A',
            text: 'cos θ = 8 / 9 ≈ 0,889',
            isCorrect: true,
            feedback: 'Excelente! u · v = 1·2 + 2·2 + 2·1 = 2 + 4 + 2 = 8. Norma |u| = √(1² + 2² + 2²) = √9 = 3. Norma |v| = √(2² + 2² + 1²) = √9 = 3. cos θ = 8 / (3 · 3) = 8/9.'
          },
          {
            label: 'B',
            text: 'cos θ = 8 / 3 ≈ 2,667',
            isCorrect: false,
            feedback: 'O cosseno de qualquer ângulo real jamais pode ser superior a 1! Aqui você dividiu por apenas uma das normas em vez de multiplicar ambas (|u| · |v| = 9).'
          },
          {
            label: 'C',
            text: 'cos θ = 6 / 9 ≈ 0,667',
            isCorrect: false,
            feedback: '6/9 decorreu de erro aritmético no produto escalar (1·2 + 2·2 + 2·1 = 8, e não 6).'
          },
          {
            label: 'D',
            text: 'cos θ = 0 (vetores ortogonais)',
            isCorrect: false,
            feedback: 'O produto escalar resultou em 8 ≠ 0, logo os vetores não são ortogonais.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. <em>Cálculo do Produto Escalar:</em><br>
        <code>u &middot; v = u_x v_x + u_y v_y + u_z v_z = (1)(2) + (2)(2) + (2)(1) = 2 + 4 + 2 = 8</code>.<br>
        2. <em>Cálculo das Normas Euclidianas:</em><br>
        <code>|u| = &radic;(1^2 + 2^2 + 2^2) = &radic;(1 + 4 + 4) = &radic;9 = 3</code>.<br>
        <code>|v| = &radic;(2^2 + 2^2 + 1^2) = &radic;(4 + 4 + 1) = &radic;9 = 3</code>.<br>
        3. <em>Similaridade de Cosseno:</em><br>
        <code>cos &theta; = (u &middot; v) / (|u| &times; |v|) = 8 / (3 &times; 3) = 8/9 &approx; 0,889</code>.<br>
        4. O valor elevado (próximo de 1) indica alta afinidade semântica entre a pesquisa e o documento no RAG.`
      },
      {
        id: 'q2',
        stem: 'Um raio de câmera 2D na interface é emitido pelo vetor diretor r = (3, k). Para que esse raio seja estritamente ortogonal (perpendicular) à trajetória de um objeto definida pelo vetor w = (-4, 6), qual deve ser o valor de k?',
        options: [
          {
            label: 'A',
            text: 'k = 2',
            isCorrect: true,
            feedback: 'Correto! Dois vetores são perpendiculares se e somente se o produto escalar for nulo: r · w = 3·(-4) + k·6 = 0 ⇒ -12 + 6k = 0 ⇒ 6k = 12 ⇒ k = 2.'
          },
          {
            label: 'B',
            text: 'k = -2',
            isCorrect: false,
            feedback: 'Com k = -2, r · w = -12 + (-12) = -24 ≠ 0, não caracterizando perpendicularismo.'
          },
          {
            label: 'C',
            text: 'k = 4,5',
            isCorrect: false,
            feedback: 'k = 4,5 tornaria os vetores paralelos com sentidos opostos, não ortogonais.'
          },
          {
            label: 'D',
            text: 'k = 0',
            isCorrect: false,
            feedback: 'Com k = 0, r · w = -12 ≠ 0.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. A condição fundamental de ortogonalidade geométrica entre dois vetores é que o ângulo formado entre eles seja de 90°:<br>
        <code>cos 90&deg; = 0 &rArr; r &middot; w = 0</code>.<br>
        2. Expandimos o produto escalar em suas componentes cartesianas:<br>
        <code>r_x &times; w_x + r_y &times; w_y = 0</code><br>
        <code>3 &times; (-4) + k &times; 6 = 0</code>.<br>
        3. Resolvemos a equação linear:<br>
        <code>-12 + 6k = 0</code><br>
        <code>6k = 12 &rArr; k = 2</code>.`
      }
    ],
    spacedRepetition: 'Em 48 horas: calcule o produto escalar dos vetores (2, 5) e (-5, 2) e comprove imediatamente por que eles formam um ângulo de 90 graus sem calcular nenhuma raiz.',
    primarySource: 'Processo Seletivo Inteli 2024; Gilbert Strang, "Introduction to Linear Algebra", 5th Edition; Edital Oficial Inteli (Anexo II - Trigonometria e Vetores).'
  },

  'matrizes-determinantes': {
    slug: 'matrizes-e-transformacoes-de-cores-rgb-yuv',
    title: 'Matrizes, Determinantes e Sistemas Lineares em Pipelines Gráficos',
    topic: 'Matrizes, Determinantes e Sistemas Lineares',
    estimatedMinutes: 9,
    targetTrack: 'Trilha Superior e Mediana',
    contextScenario: {
      company: 'PixelForge (Startup de Renderização e Filtros de Imagem)',
      problem: 'Conversão de Espaços de Cor, Transformações 2D e Calibração de Sensores',
      narrativa: `Você é engenheiro de computação gráfica na <strong>PixelForge</strong>, responsável pelo pipeline de filtros de imagem em tempo real.
      O motor precisa (1) converter pixels do espaço <strong>RGB para luminância YUV</strong> via multiplicação matricial e
      (2) <strong>calibrar dois sensores</strong> cujas leituras obedecem a um sistema linear 2x2.
      A banca do Inteli cobra exatamente isso: multiplicação linha-por-coluna, determinantes e Cramer sob pressão de tempo.`
    },
    coreKnowledge: {
      summary: 'Matriz no Inteli é <strong>função linear empacotada</strong>: multiplicar é encadear transformações. O determinante mede se a transformação <strong>esmaga o espaço</strong> (det = 0) ou é invertível — e isso decide Cramer, inversa e a classificação do sistema.',
      concepts: [
        {
          term: 'Multiplicação Matricial (Linha por Coluna)',
          definition: 'O elemento <em>c<sub>ij</sub></em> é o produto escalar da linha <em>i</em> de A pela coluna <em>j</em> de B. Exigência dimensional: <strong>A<sub>m×k</sub> · B<sub>k×p</sub> = C<sub>m×p</sub></strong> (dimensões internas iguais). Ordem importa: em geral <strong>AB ≠ BA</strong>.',
          sidenote: 'Dimensão primeiro, conta depois: 2x3 vezes 3x1 resulta 2x1. Se as internas diferem, o produto nem existe.'
        },
        {
          term: 'Determinante, Inversa e Transposta',
          definition: 'Ordem 2: <strong>ad − bc</strong>. Ordem 3: <strong>Sarrus</strong> (repete as 2 primeiras colunas, principais menos secundárias). Inversa: <strong>A⁻¹ = (1/det A) · adj(A)</strong>, só existe se <strong>det A ≠ 0</strong>. Transposta: <strong>(AB)ᵀ = BᵀAᵀ</strong>.',
          sidenote: 'Sarrus SÓ vale para 3x3. Para 4x4 a banca exigiria Laplace — reconheça o limite da ferramenta.'
        }
      ],
      formulaCard: {
        title: 'Fórmulas de Bolso para o Vestibular Inteli',
        formulas: [
          { name: 'Determinante 2x2', math: '$$\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$$' },
          { name: 'Matriz Inversa (2x2)', math: '$$A^{-1} = \\frac{1}{ad-bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$$' },
          { name: 'Regra de Cramer (2x2)', math: '$$x = \\frac{\\det A_x}{\\det A} \\quad\\mid\\quad y = \\frac{\\det A_y}{\\det A}$$' }
        ],
        tip: 'Cramer com det A = 0 é cilada: o sistema é SPI (infinitas) ou SI (impossível) — classifique pelo escalonamento, nunca divida por zero.'
      },
      examTrap: {
        title: 'Armadilha Típica do Inteli: Cramer com Determinante Nulo',
        description: 'O candidato calcula det A = 0 e mesmo assim aplica a fórmula, "encontrando" valores. Com det nulo não há solução única: escalone — fila 0 = 0 indica SPI, fila 0 = k (k ≠ 0) indica SI.'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'No pipeline da PixelForge, um filtro combina dois canais segundo a matriz A = [[4, 7], [2, 6]]. Para calibrar o filtro inverso, o primeiro passo é o determinante de A. Quanto vale det A?',
        options: [
          {
            label: 'A',
            text: 'det A = 4·6 + 7·2 = 38',
            isCorrect: false,
            feedback: 'Você somou os produtos em vez de subtrair. O determinante 2x2 é a DIFERENÇA ad − bc, não a soma.'
          },
          {
            label: 'B',
            text: 'det A = 4·6 − 7·2 = 10',
            isCorrect: true,
            feedback: 'Exato! ad − bc = 24 − 14 = 10. Como det ≠ 0, a matriz é invertível e o filtro inverso existe.'
          },
          {
            label: 'C',
            text: 'det A = 7·2 − 4·6 = −10',
            isCorrect: false,
            feedback: 'Ordem invertida: o termo positivo é o da diagonal principal (a·d = 4·6), não o da secundária.'
          },
          {
            label: 'D',
            text: 'det A = 4 + 6 + 7 + 2 = 19',
            isCorrect: false,
            feedback: 'Determinante não é soma de elementos — é ad − bc. Revise a definição antes de avançar.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Identificamos <code>a = 4, b = 7, c = 2, d = 6</code>.<br>
        2. Diagonal principal: <code>4 × 6 = 24</code>.<br>
        3. Diagonal secundária: <code>7 × 2 = 14</code>.<br>
        4. Determinante: <code>24 − 14 = 10</code>. Como é não-nulo, A admite inversa.`
      },
      {
        id: 'q2',
        stem: 'A calibração dos sensores da PixelForge recai no sistema {2x + y = 7; x + 3y = 11}. Aplicando Cramer, qual é o par (x, y)?',
        options: [
          {
            label: 'A',
            text: '(x, y) = (3, 2)',
            isCorrect: false,
            feedback: 'Teste na 1ª equação: 2·3 + 2 = 8 ≠ 7. Par ordenado exige satisfazer TODAS as equações — sempre confira.'
          },
          {
            label: 'B',
            text: '(x, y) = (2, 3)',
            isCorrect: true,
            feedback: 'Perfeito! det A = 5, det Ax = 10, det Ay = 15: x = 10/5 = 2, y = 15/5 = 3. Confere nas duas equações.'
          },
          {
            label: 'C',
            text: '(x, y) = (1, 5)',
            isCorrect: false,
            feedback: 'Passa na 1ª (2 + 5 = 7) mas falha na 2ª (1 + 15 = 16 ≠ 11). Distrator clássico de conferência parcial.'
          },
          {
            label: 'D',
            text: 'Sistema impossível (SI)',
            isCorrect: false,
            feedback: 'det A = 2·3 − 1·1 = 5 ≠ 0, logo há solução única (SPD). SI exigiria det nulo com fila 0 = k.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Determinante principal: <code>det A = 2·3 − 1·1 = 5</code> (SPD, solução única).<br>
        2. <code>det Ax = 7·3 − 1·11 = 21 − 11 = 10</code> → <code>x = 10/5 = 2</code>.<br>
        3. <code>det Ay = 2·11 − 7·1 = 22 − 7 = 15</code> → <code>y = 15/5 = 3</code>.<br>
        4. Conferência: <code>2·2+3 = 7 ✓</code> e <code>2+3·3 = 11 ✓</code>.`
      }
    ],
    spacedRepetition: 'Em 48 horas, sem consultar: calcule de cabeça o determinante de [[5, 3], [4, 7]] e explique por que um determinante nulo inviabiliza Cramer mas não significa "sem solução".',
    primarySource: 'Processo Seletivo Inteli 2025.1 (Prova Adaptativa); Gilbert Strang, "Introduction to Linear Algebra", 5th Edition; Edital Oficial Inteli (Anexo II - Matrizes e Sistemas Lineares).'
  },

  'funcoes-polinomios': {
    slug: 'funcoes-e-analise-matematica',
    title: 'Polinômios, Briot-Ruffini e Funções Exponenciais/Logarítmicas',
    topic: 'Álgebra, Polinômios e Principais Funções',
    estimatedMinutes: 9,
    targetTrack: 'Trilha Superior e Mediana',
    contextScenario: {
      company: 'GrowthLoop (Startup de Modelagem de Tração e Latência)',
      problem: 'Curvas de Custo Cúbicas, Crescimento Viral e Tempo de Duplicação',
      narrativa: `Você é engenheiro de dados na <strong>GrowthLoop</strong>, modelando a curva de custo de infraestrutura (polinômio cúbico) e o crescimento viral da base de usuários (exponencial).
      O CTO precisa (1) <strong>fatorar o polinômio de custo</strong> para achar os pontos de equilíbrio e
      (2) <strong>prever em quantos meses a base dobra</strong> dada a taxa mensal.
      A banca cobra Briot-Ruffini e logaritmos exatamente nesse contexto.`
    },
    coreKnowledge: {
      summary: 'Polinômio no Inteli é <strong>equação disfarçada de modelo</strong>: ache UMA raiz pequena (±1, ±2), reduza o grau com Briot-Ruffini e termine com Bhaskara ou Girard. Exponencial e log são <strong>inversos</strong> — isolar o expoente sempre passa por aplicar log dos dois lados.',
      concepts: [
        {
          term: 'Briot-Ruffini, Resto e D\u2019Alembert',
          definition: 'Dividir P(x) por <strong>(x − a)</strong>: desce o 1º coeficiente, multiplica pela raiz, soma — até o resto. <strong>Resto = P(a)</strong> (Teorema do Resto). Se <strong>P(a) = 0</strong>, (x − a) é fator (D\u2019Alembert). Candidatas racionais: <strong>p/q</strong>.',
          sidenote: 'Resto zero é a luz verde: fatora e reduz o grau. Resto ≠ 0 não é erro — é o valor de P(a).'
        },
        {
          term: 'Logaritmos, Inversa e Composta',
          definition: '<strong>log(a·b) = log a + log b</strong>, <strong>log(aᵏ) = k·log a</strong>, mudança de base <strong>log_b a = log_c a / log_c b</strong>. Inversa troca x↔y; composta <strong>(f∘g)(x) = f(g(x))</strong>. Tempo de duplicação: <strong>t = log 2 / log(1+i)</strong>.',
          sidenote: 'Log de soma NÃO abre: log(a+b) fica como está. Esse é o distrator favorito da banca.'
        }
      ],
      formulaCard: {
        title: 'Fórmulas de Bolso para o Vestibular Inteli',
        formulas: [
          { name: 'Relações de Girard (2º grau)', math: '$$x_1 + x_2 = -\\frac{b}{a} \\quad\\mid\\quad x_1 \\cdot x_2 = \\frac{c}{a}$$' },
          { name: 'Tempo de Duplicação Exponencial', math: '$$2 = (1+i)^t \\implies t = \\frac{\\log 2}{\\log(1+i)}$$' },
          { name: 'Função Inversa (troca e isola)', math: '$$f(x) = 2x+3 \\implies f^{-1}(x) = \\frac{x-3}{2}$$' }
        ],
        tip: 'Girard confere fatoração em segundos: se as raízes somam −b/a e multiplicam c/a, a fatoração está certa sem reexpandir.'
      },
      examTrap: {
        title: 'Armadilha Típica do Inteli: Logaritmo de Soma',
        description: 'O distrator aplica "log(a+b) = log a + log b" para simplificar uma equação de crescimento. Falso: logaritmo só distribui sobre PRODUTO, quociente e potência. Soma dentro do log trava a manipulação.'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'O polinômio de custo da GrowthLoop é P(x) = x³ − 6x² + 11x − 6 e sabe-se que x = 1 é raiz. Aplicando Briot-Ruffini, qual é o quociente e o conjunto completo de raízes?',
        options: [
          {
            label: 'A',
            text: 'Q(x) = x² − 5x + 6; raízes {1, 2, 3}',
            isCorrect: true,
            feedback: 'Exato! Linha de Briot com raiz 1: 1 | 1 −6 11 −6 → 1 −5 6 resto 0. Q(x) = x² − 5x + 6 = (x−2)(x−3).'
          },
          {
            label: 'B',
            text: 'Q(x) = x² − 7x + 18; raízes {1}',
            isCorrect: false,
            feedback: 'Erro de conta na linha de Briot: após descer o 1, multiplica-se pela raiz (1·1 = 1) e soma-se a −6, obtendo −5, não −7.'
          },
          {
            label: 'C',
            text: 'Q(x) = x² − 5x + 6; raízes {2, 3}',
            isCorrect: false,
            feedback: 'O quociente está certo, mas a raiz dada (x = 1) também é raiz de P(x) — o conjunto completo é {1, 2, 3}.'
          },
          {
            label: 'D',
            text: 'Q(x) = x³ − 5x² + 6x; raízes {0, 2, 3}',
            isCorrect: false,
            feedback: 'Briot-Ruffini REDUZ o grau em 1: quociente de cúbico por (x−a) é quadrático, nunca cúbico.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Coeficientes: <code>1 | −6 | 11 | −6</code>, raiz <code>a = 1</code>.<br>
        2. Desce o 1; <code>1·1 = 1</code>, soma a −6 → <code>−5</code>.<br>
        3. <code>−5·1 = −5</code>, soma a 11 → <code>6</code>.<br>
        4. <code>6·1 = 6</code>, soma a −6 → <code>resto 0</code> ✓.<br>
        5. <code>Q(x) = x² − 5x + 6 = (x−2)(x−3)</code>. Girard confere: soma 5 = −(−5)/1 ✓, produto 6 ✓. Raízes: {1, 2, 3}.`
      },
      {
        id: 'q2',
        stem: 'A base da GrowthLoop cresce 10% ao mês sob juros compostos. Partindo de N₀ usuários, após quantos meses completos a base DOBRA? (Use log₁₀ 2 ≈ 0,30 e log₁₀ 1,1 ≈ 0,041.)',
        options: [
          {
            label: 'A',
            text: 'Aproximadamente 7,3 meses (8 meses completos)',
            isCorrect: true,
            feedback: 'Perfeito! 2 = 1,1ᵗ → t = log 2 / log 1,1 ≈ 0,30/0,041 ≈ 7,3. Meses completos: 8.'
          },
          {
            label: 'B',
            text: 'Exatamente 10 meses (10% × 10 = 100%)',
            isCorrect: false,
            feedback: 'Raciocínio de juros SIMPLES aplicado a crescimento composto. Composição acelera: dobra antes dos 10 meses.'
          },
          {
            label: 'C',
            text: 'Aproximadamente 20 meses',
            isCorrect: false,
            feedback: 'Ordem de grandeza errada: 1,1²⁰ ≈ 6,7 (sêxtupla, não dobra). Refaça t = 0,30/0,041.'
          },
          {
            label: 'D',
            text: 'Impossível determinar sem N₀',
            isCorrect: false,
            feedback: 'N₀ cancela: 2N₀ = N₀·1,1ᵗ → 2 = 1,1ᵗ. O tempo de duplicação independe do valor inicial.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Modelo: <code>N(t) = N₀ · 1,1ᵗ</code>; dobra quando <code>2N₀ = N₀ · 1,1ᵗ</code>.<br>
        2. Cancela N₀: <code>2 = 1,1ᵗ</code>.<br>
        3. Aplica log₁₀: <code>t = log 2 / log 1,1 ≈ 0,30 / 0,041 ≈ 7,3</code>.<br>
        4. Meses completos para ATINGIR a dobra: <strong>8 meses</strong>.`
      }
    ],
    spacedRepetition: 'Em 48 horas: fatore x³ − 6x² + 11x − 6 do zero (ache a raiz, rode Briot, confira com Girard) e deduza t de duplicação a 5% a.m. sem olhar a ficha.',
    primarySource: 'Processo Seletivo Inteli 2025.1 (Prova Adaptativa); Edital Oficial Inteli (Anexo II - Álgebra e Principais Funções).'
  },

  'financas-juros': {
    slug: 'financas-startups',
    title: 'Juros Compostos, Break-Even e Unit Economics de Startups',
    topic: 'Aritmética, Juros e Finanças de Startups',
    estimatedMinutes: 8,
    targetTrack: 'Trilha Mediana e Superior',
    contextScenario: {
      company: 'VentureCap SaaS (Fintech de Assinaturas B2B)',
      problem: 'Aporte Remunerado, Ponto de Equilíbrio e CAC/LTV',
      narrativa: `Você é analista financeiro na <strong>VentureCap SaaS</strong>, avaliando um aporte de <strong>R$ 10.000</strong> remunerado a <strong>10% a.a.</strong> e a operação de um plano de assinaturas (custo fixo de <strong>R$ 15.000/mês</strong>, custo marginal de <strong>R$ 5/usuário</strong>, mensalidade de <strong>R$ 25</strong>).
      O comitê precisa (1) do montante em 3 anos sob <strong>juros compostos</strong> e
      (2) do <strong>número mínimo de assinantes</strong> para zerar o prejuízo.
      Juros + break-even caem todo ano no Inteli — sempre com distrator de regime trocado.`
    },
    coreKnowledge: {
      summary: 'Finanças no Inteli testam <strong>regime</strong> (simples × composto) e <strong>unidade de tempo</strong> (taxa mensal exige t em meses). Break-even é função afim: <strong>Receita = Custo</strong> isola o volume mínimo. Decore: simples é PA, composto é PG.',
      concepts: [
        {
          term: 'Juros Simples vs Compostos',
          definition: 'Simples: <strong>M = C·(1 + i·t)</strong> (linear, PA). Compostos: <strong>M = C·(1 + i)ᵗ</strong> (exponencial, PG). Para t = 1 período, ambos coincidem; para t > 1, o composto domina.',
          sidenote: 'A banca troca o regime no enunciado e mantém as alternativas do outro regime como distratores.'
        },
        {
          term: 'Break-Even e Margem de Contribuição',
          definition: 'Receita total <strong>R(x) = P·x</strong>, custo total <strong>C(x) = F + c·x</strong>. Equilíbrio: <strong>x* = F / (P − c)</strong>, onde <strong>MC = P − c</strong> é a margem de contribuição unitária.',
          sidenote: 'Margem zero ou negativa = break-even impossível. Cheque MC > 0 antes de dividir.'
        }
      ],
      formulaCard: {
        title: 'Fórmulas de Bolso para o Vestibular Inteli',
        formulas: [
          { name: 'Montante Composto', math: '$$M = C \\cdot (1+i)^t$$' },
          { name: 'Montante Simples', math: '$$M = C \\cdot (1 + i \\cdot t)$$' },
          { name: 'Volume de Equilíbrio', math: '$$x^* = \\frac{F}{P - c} = \\frac{F}{MC}$$' }
        ],
        tip: 'Potência 1,1³ = 1,331 e 1,1² = 1,21: memorize os cubos de 1,1 e 1,05 — a banca repete as taxas 10% e 5%.'
      },
      examTrap: {
        title: 'Armadilha Típica do Inteli: Taxa Mensal com Tempo em Anos',
        description: 'Enunciado dá i = 2% ao mês e t = 2 anos. Quem aplica (1,02)² erra: ou converte t para 24 meses ou a taxa para equivalente anual. Unidade de tempo SEMPRE igual à da taxa.'
      }
    },
    quiz: [
      {
        id: 'q1',
        stem: 'O aporte de R$ 10.000 da VentureCap rende 10% a.a. sob juros compostos. Qual é o montante após 3 anos completos?',
        options: [
          {
            label: 'A',
            text: 'R$ 13.000,00',
            isCorrect: false,
            feedback: 'R$ 13.000 é o regime SIMPLES: 10.000·(1 + 0,1·3). O enunciado exige compostos — releia o regime antes de calcular.'
          },
          {
            label: 'B',
            text: 'R$ 13.310,00',
            isCorrect: true,
            feedback: 'Exato! 10.000 · 1,1³ = 10.000 · 1,331 = R$ 13.310,00.'
          },
          {
            label: 'C',
            text: 'R$ 11.000,00',
            isCorrect: false,
            feedback: 'R$ 11.000 é UM ano de rendimento (10.000 · 1,1). Faltam compor os anos 2 e 3.'
          },
          {
            label: 'D',
            text: 'R$ 14.641,00',
            isCorrect: false,
            feedback: 'R$ 14.641 = 10.000 · 1,1⁴: você compôs 4 anos em vez de 3. Conte os expoentes.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Regime composto: <code>M = 10.000 · (1,1)³</code>.<br>
        2. <code>1,1² = 1,21</code>; <code>1,21 · 1,1 = 1,331</code>.<br>
        3. <code>M = 10.000 · 1,331 = R$ 13.310,00</code>.`
      },
      {
        id: 'q2',
        stem: 'Plano da VentureCap: custo fixo R$ 15.000/mês, custo marginal R$ 5/usuário, mensalidade R$ 25. Qual o número mínimo de assinantes pagantes para não haver prejuízo?',
        options: [
          {
            label: 'A',
            text: '600 assinantes',
            isCorrect: false,
            feedback: '600 = 15.000/25: você dividiu pela mensalidade cheia, ignorando o custo marginal de R$ 5 por usuário.'
          },
          {
            label: 'B',
            text: '750 assinantes',
            isCorrect: true,
            feedback: 'Perfeito! MC = 25 − 5 = 20; x* = 15.000/20 = 750 assinantes.'
          },
          {
            label: 'C',
            text: '3.000 assinantes',
            isCorrect: false,
            feedback: '3.000 = 15.000/5: divisão pelo custo marginal, que não é margem — margem é PREÇO menos custo.'
          },
          {
            label: 'D',
            text: '500 assinantes',
            isCorrect: false,
            feedback: '500 · 20 = 10.000 < 15.000 de fixo: teste a resposta na equação R(x) = C(x) antes de marcar.'
          }
        ],
        resolution: `<strong>Resolução Passo a Passo:</strong><br>
        1. Margem de contribuição: <code>MC = 25 − 5 = R$ 20/usuário</code>.<br>
        2. Equilíbrio: <code>25x = 15.000 + 5x → 20x = 15.000</code>.<br>
        3. <code>x* = 750 assinantes</code>. Conferência: <code>R = 18.750 = C = 15.000 + 3.750 ✓</code>.`
      }
    ],
    spacedRepetition: 'Em 48 horas: recalcule de cabeça 10.000·1,1³ e o break-even com F = 20.000, P = 50, c = 30 — e explique por que 1.000 é a resposta (MC = 20).',
    primarySource: 'Processo Seletivo Inteli 2025.1 (Prova Adaptativa - Q01/Q02, break-even SaaS); Edital Oficial Inteli (Anexo II - Aritmética e Principais Funções).'
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

BLUEPRINTS['conjuntos-diagramas-venn-tech'] = BLUEPRINTS['conjuntos-venn'];
BLUEPRINTS['conjuntos'] = BLUEPRINTS['conjuntos-venn'];
BLUEPRINTS['venn'] = BLUEPRINTS['conjuntos-venn'];
BLUEPRINTS['bases-numericas-binario-hexadecimal'] = BLUEPRINTS['bases-numericas'];
BLUEPRINTS['binario'] = BLUEPRINTS['bases-numericas'];
BLUEPRINTS['hexadecimal'] = BLUEPRINTS['bases-numericas'];
BLUEPRINTS['geometria-plana-espacial-3d'] = BLUEPRINTS['geometria-plana-espacial'];
BLUEPRINTS['geometria-espacial'] = BLUEPRINTS['geometria-plana-espacial'];
BLUEPRINTS['geometria-plana'] = BLUEPRINTS['geometria-plana-espacial'];
BLUEPRINTS['euler'] = BLUEPRINTS['geometria-plana-espacial'];
BLUEPRINTS['trigonometria-vetores-computacao'] = BLUEPRINTS['trigonometria-vetores'];
BLUEPRINTS['trigonometria'] = BLUEPRINTS['trigonometria-vetores'];
BLUEPRINTS['vetores'] = BLUEPRINTS['trigonometria-vetores'];
BLUEPRINTS['produto-escalar'] = BLUEPRINTS['trigonometria-vetores'];
BLUEPRINTS['matrizes'] = BLUEPRINTS['matrizes-determinantes'];
BLUEPRINTS['determinantes'] = BLUEPRINTS['matrizes-determinantes'];
BLUEPRINTS['sistemas-lineares'] = BLUEPRINTS['matrizes-determinantes'];
BLUEPRINTS['matrizes-e-transformacoes-de-cores-rgb-yuv'] = BLUEPRINTS['matrizes-determinantes'];
BLUEPRINTS['polinomios'] = BLUEPRINTS['funcoes-polinomios'];
BLUEPRINTS['briot-ruffini'] = BLUEPRINTS['funcoes-polinomios'];
BLUEPRINTS['exponencial-logaritmo'] = BLUEPRINTS['funcoes-polinomios'];
BLUEPRINTS['funcoes-e-analise-matematica'] = BLUEPRINTS['funcoes-polinomios'];
BLUEPRINTS['juros'] = BLUEPRINTS['financas-juros'];
BLUEPRINTS['break-even'] = BLUEPRINTS['financas-juros'];
BLUEPRINTS['financas'] = BLUEPRINTS['financas-juros'];
BLUEPRINTS['financas-startups'] = BLUEPRINTS['financas-juros'];
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
  
  <!-- Typography: Anthropic Editorial Serif (Newsreader/Charter), Clean UI Sans (Inter) & Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&display=swap" rel="stylesheet">

  <!-- Estilos Oficiais -->
  <link rel="stylesheet" href="../assets/lesson.css">
  
  <!-- KaTeX Math Rendering -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" onload="initKaTeX()"></script>
  <script>
    function initKaTeX() {
      if (window.renderMathInElement) {
        renderMathInElement(document.body, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ],
          ignoredClasses: ["katex-ignore", "no-katex"],
          throwOnError: false
        });
      }
    }
    document.addEventListener("DOMContentLoaded", initKaTeX);
    window.addEventListener("load", initKaTeX);
  </script>
</head>
<body>
  <nav class="lesson-top-nav">
    <div class="nav-content">
      <a href="/" class="btn-nav-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        <span>Voltar ao Portal de Estudos</span>
      </a>
      <div class="nav-lesson-badge">
        <span class="dot-active"></span>
        <span>Lição ${lessonNumber} • Vestibular Inteli 2027</span>
      </div>
      <div class="nav-quick-links">
        <a href="#conteudo">Conteúdo</a>
        <a href="#quiz">Quiz</a>
        <a href="#desafio">Desafio</a>
        <button class="btn-theme-toggle" id="btn-theme-toggle" title="Alternar Modo Escuro / Claro">◐</button>
      </div>
    </div>
  </nav>

  <div class="lesson-container">
    <article class="lesson" id="conteudo">
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
          <a href="/?tab=docs&doc=mission">← Voltar para a Missão</a>
          <span>•</span>
          <a href="/?tab=docs&doc=glossary">📖 Glossário de Conceitos</a>
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
      <section class="spaced-repetition" id="desafio">
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
          <a href="/?tab=docs&doc=mission">← Sumário da Missão</a>
          <a href="/?tab=docs&doc=glossary">📖 Glossário Técnico</a>
          <a href="#quiz">↑ Repetir Questões</a>
          <a href="/" class="btn-back-hub">← Voltar à Tela Principal do Portal</a>
        </div>
      </footer>
    </article>
  </div>

  <!-- Script Externo Oficial -->
  <script src="../assets/quiz.js" defer></script>

  <!-- Script Fallback Autônomo de Quiz (Zero Dependências) -->
  <script>
    // Suporte a alternância de tema (Modo Escuro / Claro)
    (function() {
      try {
        const saved = localStorage.getItem('theme');
        if (saved) {
          document.documentElement.setAttribute('data-theme', saved);
        }
      } catch (e) {}
      document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('btn-theme-toggle');
        if (btn) {
          btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') ||
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
          });
        }
      });
    })();

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
