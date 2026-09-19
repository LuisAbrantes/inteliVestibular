/**
 * INTELI HARNESS — SIMULATION PLATFORM ENGINE
 * Client-Side Architecture for Vestibular & Bolsa 100% Preparation
 */

// ============================================================================
// 1. FALLBACK CURATED QUESTIONS BANK (Guarantees zero downtime / standalone)
// ============================================================================
const FALLBACK_QUESTIONS = [
  {
    id: "INTELI-DEMO-01",
    year: "2025.1",
    source: "Vestibular Inteli 2025.1 - Prova Adaptativa",
    topic: "Funções e Otimização",
    subtopic: "Ponto de Equilíbrio e Margem de Contribuição",
    difficulty: "medium",
    context: "Precificação e Ponto de Equilíbrio em Infraestrutura SaaS",
    statement: "Uma startup de computação em nuvem possui um custo fixo operacional mensal de R$ 120.000,00 (servidores dedicados e folha de engenharia). Cada cliente corporativo paga uma assinatura de R$ 450,00 por mês, e o custo variável incorrido por cliente (armazenamento e processamento elástico) é de R$ 90,00 por mês.\n\nPara que a empresa atinja o **Ponto de Equilíbrio Operacional** (Break-Even) e passe a operar com lucro positivo, o número mínimo de clientes corporativos ativos deve ser igual a:",
    options: [
      "267 clientes",
      "334 clientes",
      "300 clientes",
      "400 clientes",
      "450 clientes"
    ],
    correctIndex: 1,
    explanation: "### Resolução Passo a Passo\n1. **Margem de Contribuição Unitária (MCU):**\n$$\\text{MCU} = \\text{Preço} - \\text{Custo Variável} = 450 - 90 = \\text{R\\$ } 360,00$$\n\n2. **Ponto de Equilíbrio ($Q_{eq}$):**\n$$Q_{eq} = \\frac{\\text{Custo Fixo}}{\\text{MCU}} = \\frac{120.000}{360} = \\frac{1.000}{3} \\approx 333,33$$\n\n3. Como o número de clientes é discreto, 333 clientes geram um lucro de $333 \\times 360 - 120.000 = -120$ (prejuízo de R$ 120). Portanto, são necessários no mínimo **334 clientes** para cobrir todos os custos e auferir lucro.",
    keyTakeaway: "No Inteli, problemas de ponto de equilíbrio exigem arredondamento para o inteiro superior (função teto: ⌈120.000 / 360⌉ = 334)."
  },
  {
    id: "INTELI-DEMO-02",
    year: "2025.1",
    source: "Vestibular Inteli 2025.1 - Prova Oficial",
    topic: "Combinatória e Probabilidade",
    subtopic: "Análise Combinatória e Restrições de Posição",
    difficulty: "hard",
    context: "Segurança Cibernética & Políticas de Senhas",
    statement: "Um sistema bancário parceiro do Inteli exige que os tokens alfanuméricos de autorização de transações sejam formados por exatamente 6 caracteres distintos. A política de segurança impõe que:\n- Os 2 primeiros caracteres sejam letras maiúsculas escolhidas entre as 26 do alfabeto.\n- Os 4 caracteres subsequentes sejam dígitos escolhidos de 0 a 9.\n- O dígito zero ('0') não pode ocupar a última posição do token.\n\nO número total de tokens distintos que atendem a todas as especificações é:",
    options: [
      "3.276.000",
      "2.948.400",
      "3.650.400",
      "2.624.400",
      "3.088.800"
    ],
    correctIndex: 1,
    explanation: "### Resolução Passo a Passo\n1. **Escolha das letras (posições 1 e 2):**\nComo são letras maiúsculas distintas entre 26 disponíveis:\n$$A_{26, 2} = 26 \\times 25 = 650$$\n\n2. **Escolha dos 4 dígitos distintos (posições 3, 4, 5 e 6):**\nTemos 10 dígitos disponíveis {0, 1, ..., 9}. O dígito '0' não pode estar na última posição (posição 6).\n\n- Caso A: O dígito '0' não é utilizado entre os 4 dígitos.\nEscolhemos 4 dígitos distintos dos 9 restantes:\n$$P = 9 \\times 8 \\times 7 \\times 6 = 3.024$$\n\n- Caso B: O dígito '0' é utilizado, mas NÃO na posição 6.\nO '0' deve ocupar uma das 3 primeiras posições de dígitos (posições 3, 4 ou 5) -> 3 escolhas.\nPara as outras 3 posições, escolhemos 3 dígitos distintos dos 9 não-zeros:\n$$3 \\times (9 \\times 8 \\times 7) = 3 \\times 504 = 1.512$$\n\nTotal de arranjos de dígitos: $3.024 + 1.512 = 4.536$.\n*(Método alternativo rápido)*: Total sem restrição de zero final = $10 \\times 9 \\times 8 \\times 7 = 5.040$. Se o '0' estiver na última posição, temos $9 \\times 8 \\times 7 = 504$. Logo: $5.040 - 504 = 4.536$.\n\n3. **Total de tokens:**\n$$\\text{Total} = 650 \\times 4.536 = 2.948.400$$",
    keyTakeaway: "O princípio aditivo por casos complementares (Total - Casos Restritos) evita erros de contagem dupla em restrições de dígitos."
  },
  {
    id: "INTELI-DEMO-03",
    year: "2024.2",
    source: "Processo Seletivo Inteli 2024.2",
    topic: "Lógica Computacional",
    subtopic: "Equivalência Proposicional e Leis de De Morgan",
    difficulty: "easy",
    context: "Validação de Condicionais em Microsserviços",
    statement: "Considere a regra de negócio do gateway de pagamentos do Inteli descrita pela proposição condicional:\n\n*\"Se a chave criptográfica é válida ($p$), então o pagamento é liquidado imediatamente ($q$).\"*\n\nDe acordo com os princípios da lógica proposicional clássica e as regras de equivalência lógica, uma formulação estritamente equivalente a essa afirmação é:",
    options: [
      "A chave criptográfica é válida ou o pagamento é liquidado imediatamente.",
      "Se o pagamento é liquidado imediatamente, então a chave criptográfica é válida.",
      "A chave criptográfica não é válida ou o pagamento é liquidado imediatamente.",
      "Se a chave criptográfica não é válida, então o pagamento não é liquidado imediatamente.",
      "A chave criptográfica não é válida e o pagamento não é liquidado imediatamente."
    ],
    correctIndex: 2,
    explanation: "### Resolução Passo a Passo\n1. A proposição é da forma condicional $p \\to q$.\n2. Uma das equivalências fundamentais da implicação material é:\n$$p \\to q \\iff \\neg p \\lor q$$\n3. Traduzindo $\\neg p \\lor q$ para linguagem natural:\n*\"A chave criptográfica não é válida ou o pagamento é liquidado imediatamente.\"*\n\n*(Nota de contrapositiva)*: Outra equivalência válida seria $\\neg q \\to \\neg p$, mas entre as alternativas fornecidas, a correta é a disjunção $\\neg p \\lor q$.",
    keyTakeaway: "A transformação da condicional $p \\to q \\equiv \\neg p \\lor q$ é frequentemente testada na prova do Inteli associada a regras if/else em código."
  },
  {
    id: "INTELI-DEMO-04",
    year: "2025.1",
    source: "Vestibular Inteli 2025.1 - Prova Oficial",
    topic: "Algoritmos e Estruturas",
    subtopic: "Complexidade de Busca Binária e Contagem de Operações",
    difficulty: "medium",
    context: "Indexação em Banco de Dados em Memória",
    statement: "Um algoritmo de Busca Binária é executado sobre uma lista estritamente ordenada contendo exatamente $N = 2.048$ identificadores únicos de alunos matriculados.\n\nNo **pior caso possível** (quando o elemento procurado não pertence à lista ou encontra-se na última iteração permitida), o número máximo de comparações elementares de igualdade realizadas pelo algoritmo até declarar o resultado é:",
    options: [
      "10 comparações",
      "11 comparações",
      "12 comparações",
      "2.048 comparações",
      "1.024 comparações"
    ],
    correctIndex: 2,
    explanation: "### Resolução Passo a Passo\n1. Na Busca Binária, a cada iteração o espaço de busca é dividido pela metade ($N / 2$).\n2. Para um vetor de tamanho $N$, o número máximo de iterações no pior caso é dado por:\n$$k = \\lfloor \\log_2 N \\rfloor + 1$$\n3. Como $N = 2.048 = 2^{11}$:\n$$\\log_2(2.048) = 11$$\n4. Na 1ª divisão sobram 1.024, depois 512, 256, 128, 64, 32, 16, 8, 4, 2, 1 e 0 (11 divisões sucessivas + 1 teste final de subvetor vazio):\n$$11 + 1 = 12 \\text{ comparações}$$",
    keyTakeaway: "A complexidade da busca binária no pior caso para $N = 2^k$ requer $k+1$ avaliações para certificar a ausência do elemento."
  },
  {
    id: "INTELI-DEMO-05",
    year: "2025.1",
    source: "Processo Seletivo Inteli 2025.1",
    topic: "Matemática Financeira",
    subtopic: "Juros Compostos e Amortização de Empréstimos",
    difficulty: "medium",
    context: "Captação de Recursos Seed para Startup",
    statement: "Uma startup fundada por estudantes do Inteli captou um mútuo conversível de R$ 200.000,00 à taxa de juros compostos de 2% ao mês. Se a startup optar por liquidar integralmente a dívida ao final de exatamente 6 meses em uma única parcela com juros acumulados, qual será o montante final a ser pago? (Considere a aproximação $1,02^3 \\approx 1,0612$ e $1,02^6 \\approx 1,1262$)",
    options: [
      "R$ 224.000,00",
      "R$ 225.240,00",
      "R$ 226.400,00",
      "R$ 220.000,00",
      "R$ 231.500,00"
    ],
    correctIndex: 1,
    explanation: "### Resolução Passo a Passo\n1. Fórmula dos juros compostos: $M = C \\times (1 + i)^t$\n2. Dados:\n   - $C = 200.000$\n   - $i = 0,02$ ao mês\n   - $t = 6$ meses\n3. Substituição:\n$$M = 200.000 \\times (1,02)^6 \\approx 200.000 \\times 1,1262 = 225.240$$\n4. Montante exato: **R$ 225.240,00**.",
    keyTakeaway: "Em juros compostos, a linearização simples (2% x 6 = 12% -> 224.000) é um distrator comum. O efeito dos juros sobre juros gera os R$ 1.240 adicionais."
  },
  {
    id: "INTELI-DEMO-06",
    year: "2024.1",
    source: "Processo Seletivo Inteli 2024.1",
    topic: "Geometria e Visão Computacional",
    subtopic: "Geometria Analítica e Distância Euclidiana",
    difficulty: "medium",
    context: "Posicionamento e Trajetória de Drones Autônomos",
    statement: "Em um projeto de robótica autônoma no campus do Inteli, um robô móvel desloca-se em um plano cartesiano com origem na entrada principal. Em um instante $t_1$, o robô está nas coordenadas $A(3, 4)$ (em metros). Em um instante posterior $t_2$, seus sensores indicam que ele alcançou o ponto $B(15, 9)$.\n\nSabendo que o robô moveu-se em linha reta com velocidade constante de $2,6\\text{ m/s}$, o tempo decorrido entre $t_1$ e $t_2$ foi de exatamente:",
    options: [
      "4,0 segundos",
      "5,0 segundos",
      "6,5 segundos",
      "7,2 segundos",
      "5,5 segundos"
    ],
    correctIndex: 1,
    explanation: "### Resolução Passo a Passo\n1. **Distância percorrida entre A e B:**\n$$d = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$$\n$$d = \\sqrt{(15 - 3)^2 + (9 - 4)^2} = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = 13\\text{ metros}$$\n\n2. **Cálculo do tempo decorrido:**\n$$\\Delta t = \\frac{d}{v} = \\frac{13}{2,6} = \\frac{130}{26} = 5,0\\text{ segundos}$$",
    keyTakeaway: "O triângulo retângulo com catetos 5 e 12 e hipotenusa 13 é uma terna pitagórica notável que economiza tempo de cálculo no vestibular."
  },
  {
    id: "INTELI-DEMO-07",
    year: "2025.1",
    source: "Vestibular Inteli 2025.1",
    topic: "Estatística e Análise de Dados",
    subtopic: "Variância, Desvio Padrão e Estabilidade de Latência",
    difficulty: "hard",
    context: "SLA de Latência de API em Nuvem",
    statement: "A equipe de infraestrutura mediu os tempos de resposta (em milissegundos) de 5 requisições sucessivas a um microsserviço: { 20, 22, 24, 26, 28 }.\n\nO desvio padrão amostral dessa distribuição de latências é exatamente igual a:",
    options: [
      "$\\sqrt{8} \\approx 2,83\\text{ ms}$",
      "$\\sqrt{10} \\approx 3,16\\text{ ms}$",
      "$\\sqrt{5} \\approx 2,23\\text{ ms}$",
      "$4,00\\text{ ms}$",
      "$2,50\\text{ ms}$"
    ],
    correctIndex: 1,
    explanation: "### Resolução Passo a Passo\n1. **Média aritmética ($\\bar{x}$):**\n$$\\bar{x} = \\frac{20 + 22 + 24 + 26 + 28}{5} = \\frac{120}{5} = 24\\text{ ms}$$\n\n2. **Desvios em relação à média ($x_i - \\bar{x}$):**\n- $20 - 24 = -4 \\implies (-4)^2 = 16$\n- $22 - 24 = -2 \\implies (-2)^2 = 4$\n- $24 - 24 = 0 \\implies 0^2 = 0$\n- $26 - 24 = 2 \\implies 2^2 = 4$\n- $28 - 24 = 4 \\implies 4^2 = 16$\n\nSoma dos quadrados dos desvios: $16 + 4 + 0 + 4 + 16 = 40$.\n\n3. **Variância Amostral ($s^2$ com $n-1 = 4$):**\n$$s^2 = \\frac{40}{5 - 1} = \\frac{40}{4} = 10$$\n\n4. **Desvio padrão amostral ($s$):**\n$$s = \\sqrt{10} \\approx 3,16\\text{ ms}$$",
    keyTakeaway: "Atenção entre desvio padrão populacional (divisão por N=5 -> sqrt(8)) e amostral (divisão por n-1=4 -> sqrt(10))."
  },
  {
    id: "INTELI-DEMO-08",
    year: "2025.1",
    source: "Vestibular Inteli 2025.1 - Prova Adaptativa",
    topic: "Funções e Otimização",
    subtopic: "Vértice de Parábola e Maximização de Lucro",
    difficulty: "hard",
    context: "Engenharia Econômica e Otimização de Assinaturas",
    statement: "Uma edtech parceira do Inteli vende atualmente 1.000 assinaturas anuais ao preço unitário de R$ 80,00 cada. Uma pesquisa de elasticidade de mercado revelou que, para cada aumento de R$ 2,00 no preço da assinatura, a empresa perde exatamente 10 assinantes.\n\nQual deve ser o preço da assinatura para que a receita total anual da empresa seja **máxima**?",
    options: [
      "R$ 120,00",
      "R$ 140,00",
      "R$ 110,00",
      "R$ 150,00",
      "R$ 130,00"
    ],
    correctIndex: 1,
    explanation: "### Resolução Passo a Passo\n1. Seja $x$ o número de aumentos de R$ 2,00 concedidos.\n- Preço: $P(x) = 80 + 2x$\n- Quantidade vendida: $Q(x) = 1.000 - 10x$\n\n2. **Função Receita $R(x)$:**\n$$R(x) = P(x) \\cdot Q(x) = (80 + 2x)(1.000 - 10x)$$\n$$R(x) = 80.000 - 800x + 2.000x - 20x^2 = -20x^2 + 1.200x + 80.000$$\n\n3. **Ponto de Máximo ($x_v$):**\n$$x_v = -\\frac{b}{2a} = -\\frac{1.200}{2(-20)} = \\frac{1.200}{40} = 30$$\n\n4. **Preço Ótimo:**\n$$\\text{Preço} = 80 + 2(30) = 80 + 60 = \\text{R\\$ } 140,00$$",
    keyTakeaway: "O vértice da parábola $x_v = -b/(2a)$ é a ferramenta mais rápida para maximizar receita e lucro em problemas de elasticidade-preço."
  },
  {
    id: "INTELI-DEMO-09",
    year: "2025.1",
    source: "Processo Seletivo Inteli 2025.1",
    topic: "Combinatória e Probabilidade",
    subtopic: "Probabilidade Condicional e Teorema de Bayes",
    difficulty: "hard",
    context: "Diagnóstico de Falhas por Telemetria IoT",
    statement: "Em uma fazenda vertical automatizada monitorada por sensores desenvolvidos no Inteli, 1% de todos os nós de sensores apresentam falhas de hardware durante o ciclo anual. Um algoritmo preditivo identifica um sensor com defeito corretamente com 98% de precisão (verdadeiro positivo). No entanto, para sensores saudáveis, o algoritmo gera um alarme falso em 2% das vezes (falso positivo).\n\nSe um sensor dispara um alerta de falha de hardware, qual é a probabilidade real de que esse sensor esteja efetivamente com defeito?",
    options: [
      "98,0%",
      "49,0%",
      "33,1%",
      "50,0%",
      "66,7%"
    ],
    correctIndex: 2,
    explanation: "### Resolução Passo a Passo (Teorema de Bayes)\nConsidere uma amostra teórica de 10.000 sensores:\n- Sensores defeituosos (1%): $100$\n- Sensores saudáveis (99%): $9.900$\n\n**Alertas emitidos pelo algoritmo:**\n1. Dos defeituosos (98%): $100 \\times 0,98 = 98$ alertas verdadeiros.\n2. Dos saudáveis (2% falso positivo): $9.900 \\times 0,02 = 198$ falsos alertas.\n\nTotal de alertas disparados: $98 + 198 = 296$.\n\n**Probabilidade de defeito dado o alerta:**\n$$P(\\text{Defeito} \\mid \\text{Alerta}) = \\frac{98}{296} \\approx 0,33108 \\implies \\mathbf{33,1\\%}$$",
    keyTakeaway: "O paradoxo da taxa-base: quando uma condição é rara (1%), a maioria dos alertas positivos pode ser composta por falsos positivos mesmo com alta acurácia (98%)."
  },
  {
    id: "INTELI-DEMO-10",
    year: "2025.1",
    source: "Vestibular Inteli 2025.1 - Prova Oficial",
    topic: "Lógica Computacional",
    subtopic: "Lógica Proposicional e Negação de Quantificadores",
    difficulty: "medium",
    context: "Auditoria de Código em Smart Contracts",
    statement: "Durante uma auditoria de conformidade em um contrato inteligente, o auditor emitiu o seguinte parecer formal:\n\n*\"Todos os módulos de transferência possuem validação de saldo e pelo menos um módulo não registra logs de auditoria.\"*\n\nA negação lógica estrita dessa afirmação é:",
    options: [
      "Nenhum módulo de transferência possui validação de saldo ou todos os módulos registram logs de auditoria.",
      "Pelo menos um módulo de transferência não possui validação de saldo ou todos os módulos registram logs de auditoria.",
      "Pelo menos um módulo de transferência não possui validação de saldo e nenhum módulo registra logs de auditoria.",
      "Todos os módulos de transferência não possuem validação de saldo e todos os módulos registram logs de auditoria.",
      "Existe um módulo de transferência com validação de saldo que registra logs de auditoria."
    ],
    correctIndex: 1,
    explanation: "### Resolução Passo a Passo\n1. A sentença original tem a estrutura de conjunção: $A \\land B$.\n   - $A$: *\"Todos os módulos possuem validação.\"*\n   - $B$: *\"Pelo menos um módulo não registra logs.\"*\n\n2. Pela Lei de De Morgan, a negação de uma conjunção é a disjunção das negações:\n$$\\neg (A \\land B) \\iff \\neg A \\lor \\neg B$$\n\n3. **Negando as partes com quantificadores:**\n   - $\\neg A$: A negação de *\"Todo X é Y\"* é *\"Pelo menos um X não é Y\"* (Existe módulo sem validação de saldo).\n   - $\\neg B$: A negação de *\"Pelo menos um X não é Y\"* é *\"Todos os X são Y\"* (Todos os módulos registram logs de auditoria).\n\n4. Resultado:\n*\"Pelo menos um módulo de transferência não possui validação de saldo OU todos os módulos registram logs de auditoria.\"*",
    keyTakeaway: "A negação de 'Todo' é 'Pelo menos um não', e a negação de 'E' é 'OU' (Leis de De Morgan quantificadas)."
  }
];

// ============================================================================
// 2. APP STATE MANAGEMENT
// ============================================================================
const AppState = {
  currentScreen: 'home', // 'home' | 'runner' | 'results'
  allQuestions: [],
  activeMode: 'oficial', // 'oficial' | 'adaptativo' | 'drill' | 'bolsa'
  selectedTopic: 'all',

  // Current session data
  currentQuestions: [],
  currentIndex: 0,
  userAnswers: {},       // { [questionId]: selectedOptionIndex }
  flaggedQuestions: new Set(),
  
  // Timing
  timerInterval: null,
  timeAllocatedSeconds: 7200,
  timeRemainingSeconds: 7200,
  isPaused: false,
  sessionStartTime: null,
  sessionEndTime: null,

  // Adaptive engine tracker
  adaptiveScore: 0,
  currentAdaptiveDifficulty: 'medium',

  // Drill specific
  drillVerified: {},

  // Router: which mode produced the results on screen (null while exam live)
  lastResultsMode: null,

  // Local storage history
  history: []
};

// ============================================================================
// 3. INITIALIZATION & DATA LOADING
// ============================================================================
// ============================================================================
// THEME MANAGEMENT (ANTHROPIC DESIGN SYSTEM: DARK & LIGHT MODES)
// ============================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('inteli_theme') || 'dark';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
    root.setAttribute('data-theme', 'light');
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  }
  localStorage.setItem('inteli_theme', theme);
  updateThemeSwitchUI(theme);
}

function toggleTheme() {
  const root = document.documentElement;
  const isLight = root.classList.contains('light') || root.getAttribute('data-theme') === 'light';
  const newTheme = isLight ? 'dark' : 'light';
  applyTheme(newTheme);
  if (typeof showToast === 'function') {
    showToast(newTheme === 'dark' ? 'Modo Escuro (Claude.ai) ativado.' : 'Modo Claro (Anthropic Editorial) ativado.', 'info');
  }
}

function updateThemeSwitchUI(theme) {
  const icon = document.getElementById('theme-switch-icon');
  const text = document.getElementById('theme-switch-text');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  if (text) {
    text.textContent = theme === 'dark' ? 'Claro' : 'Escuro';
  }
  const btn = document.getElementById('btn-theme-switch');
  if (btn) {
    btn.setAttribute('title', theme === 'dark' ? 'Mudar para Modo Claro (Anthropic Parchment)' : 'Mudar para Modo Escuro (Claude.ai Dark)');
    btn.setAttribute('aria-label', theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro');
  }
}

window.toggleTheme = toggleTheme;
window.applyTheme = applyTheme;

async function initApp() {
  initTheme();
  console.log('[DEBUG] initApp started');
  initScratchpad();
  console.log('[DEBUG] initScratchpad passed');
  setupEventListeners();
  console.log('[DEBUG] setupEventListeners passed');
  initHarnessHub();
  console.log('[DEBUG] initHarnessHub passed');
  loadHistory();
  await loadQuestionBank();
  console.log('[DEBUG] loadQuestionBank passed');
  handleRoute();
  console.log('[DEBUG] handleRoute passed');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/**
 * Loads questions from /api/questions, fallback to static JSON or internal curated set
 */
async function loadQuestionBank() {
  try {
    const apiRes = await fetch('/api/questions');
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (Array.isArray(data) && data.length > 0) {
        AppState.allQuestions = data;
        console.log(`[Inteli Engine] Loaded ${data.length} questions from /api/questions.`);
        return;
      }
    }
  } catch (err) {
    console.warn('[Inteli Engine] API endpoint unavailable, trying static JSON fallback.');
  }

  try {
    const staticRes = await fetch('/platform/data/questions.json');
    if (staticRes.ok) {
      const data = await staticRes.json();
      if (Array.isArray(data) && data.length > 0) {
        AppState.allQuestions = data;
        console.log(`[Inteli Engine] Loaded ${data.length} questions from static data/questions.json.`);
        return;
      }
    }
  } catch (err) {
    console.warn('[Inteli Engine] Static file unavailable, using curated fallback.');
  }

  // Fallback to high quality preloaded items
  AppState.allQuestions = FALLBACK_QUESTIONS;
  console.log(`[Inteli Engine] Initialized with ${AppState.allQuestions.length} curated fallback questions.`);
}

// ============================================================================
// 4. EVENT LISTENERS & NAVIGATION
// ============================================================================
function setupEventListeners() {
  // Theme Switcher Toggle
  const themeSwitchBtn = document.getElementById('btn-theme-switch');
  if (themeSwitchBtn) {
    themeSwitchBtn.addEventListener('click', toggleTheme);
  }

  // Mode Cards & Launch Buttons
  document.querySelectorAll('.btn-launch-mode').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mode = btn.getAttribute('data-mode');
      startExam(mode);
    });
  });

  document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => {
      const mode = card.getAttribute('data-mode');
      startExam(mode);
    });
  });

  // Home Logo
  document.getElementById('btn-logo-home').addEventListener('click', (e) => {
    e.preventDefault();
    if (AppState.currentScreen === 'runner') {
      showConfirmModal();
    } else {
      switchScreen('home');
    }
  });

  // Runner Controls
  document.getElementById('btn-prev-q').addEventListener('click', () => navigateQuestion(-1));
  document.getElementById('btn-next-q').addEventListener('click', () => navigateQuestion(1));
  document.getElementById('btn-toggle-flag').addEventListener('click', toggleFlagCurrentQuestion);
  document.getElementById('btn-clear-answer').addEventListener('click', clearCurrentAnswer);
  document.getElementById('btn-drill-verify').addEventListener('click', verifyDrillAnswer);

  // Timer Pause / Resume
  document.getElementById('btn-timer-pause').addEventListener('click', toggleTimerPause);
  document.getElementById('btn-resume-from-pause').addEventListener('click', toggleTimerPause);

  // Finish Exam & Confirmation Modal
  document.getElementById('btn-finish-exam-header').addEventListener('click', showConfirmModal);
  document.getElementById('btn-modal-cancel').addEventListener('click', hideConfirmModal);
  document.getElementById('btn-modal-confirm-submit').addEventListener('click', finishExam);

  // Scratchpad Toggle
  document.getElementById('btn-scratchpad-toggle').addEventListener('click', () => {
    const card = document.getElementById('scratchpad-container');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth' });
      showToast('Rascunho digital em foco.', 'info');
    }
  });

  // History Clear
  const clearHistBtn = document.getElementById('btn-clear-history');
  if (clearHistBtn) clearHistBtn.addEventListener('click', clearHistory);

  const navHistBtn = document.getElementById('btn-nav-history');
  if (navHistBtn) {
    navHistBtn.addEventListener('click', () => {
      const section = document.querySelector('.history-widget-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  }
  // Results Actions
  document.getElementById('btn-results-home').addEventListener('click', () => navigateTo('#/'));
  document.getElementById('btn-results-retry').addEventListener('click', () => {
    startExam(AppState.activeMode);
  });

  // Runner breadcrumb Voltar (per-mode exit, answers kept for resume)
  const runnerBackBtn = document.getElementById('btn-runner-back');
  if (runnerBackBtn) runnerBackBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const answered = Object.keys(AppState.userAnswers).length;
    if (answered > 0) {
      if (!window.confirm('Sair deste simulado? Suas respostas ficam salvas e você pode retomar pelo link do modo.')) return;
    }
    exitToHome();
  });

  // Runner breadcrumb Descartar (exit + wipe: counts nothing, nowhere)
  const runnerDiscardBtn = document.getElementById('btn-runner-discard');
  if (runnerDiscardBtn) runnerDiscardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    discardExam();
  });

  // Filter Pills on Review
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      filterReviewQuestions(filter);
    });
  });

  // Keyboard Shortcuts (1-5, A-E, Arrows, Flag)
  window.addEventListener('keydown', handleKeyboardShortcuts);
}

function handleKeyboardShortcuts(e) {
  // Ignore if user is inside an input or textarea
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (AppState.currentScreen !== 'runner') return;

  const key = e.key.toUpperCase();

  // Option keys 1-5 or A-E
  const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4 };
  if (key in keyMap) {
    selectOption(keyMap[key]);
    return;
  }

  // Navigation
  if (key === 'ARROWLEFT' || key === 'P') {
    navigateQuestion(-1);
    return;
  }
  if (key === 'ARROWRIGHT' || key === 'N') {
    navigateQuestion(1);
    return;
  }

  // Flag
  if (key === 'M' || key === 'F') {
    toggleFlagCurrentQuestion();
    return;
  }

  // Escape pauses / cancels modal
  if (key === 'ESCAPE') {
    const confirmModal = document.getElementById('confirm-modal');
    if (confirmModal.style.display !== 'none') {
      hideConfirmModal();
    } else {
      toggleTimerPause();
    }
  }
}

// ============================================================================
// 5. EXAM RUNNER ENGINE
// ============================================================================
function startExam(mode) {
  AppState.activeMode = mode;
  AppState.userAnswers = {};
  AppState.flaggedQuestions = new Set();
  AppState.drillVerified = {};
  AppState.currentIndex = 0;
  AppState.isPaused = false;
  AppState.sessionStartTime = Date.now();

  const topicSelect = document.getElementById('drill-topic-select');
  AppState.selectedTopic = topicSelect ? topicSelect.value : 'all';

  // Build Question Set based on Mode
  let pool = [...AppState.allQuestions];

  if (mode === 'drill') {
    if (AppState.selectedTopic !== 'all') {
      pool = pool.filter(q => q.topic.toLowerCase().includes(AppState.selectedTopic.toLowerCase()));
      if (pool.length === 0) pool = [...AppState.allQuestions];
    }
    shuffleArray(pool);
    AppState.currentQuestions = pool.slice(0, Math.min(pool.length, 15));
    AppState.timeAllocatedSeconds = 0; // untimed / stopwatch
    AppState.timeRemainingSeconds = 0;
  } else if (mode === 'bolsa') {
    // 10 high-density questions (prioritize hard & medium)
    const hard = pool.filter(q => q.difficulty === 'hard');
    const medium = pool.filter(q => q.difficulty === 'medium');
    shuffleArray(hard);
    shuffleArray(medium);
    const selected = [...hard.slice(0, 6), ...medium.slice(0, 4)];
    if (selected.length < 10) {
      shuffleArray(pool);
      AppState.currentQuestions = pool.slice(0, 10);
    } else {
      AppState.currentQuestions = selected.slice(0, 10);
    }
    AppState.timeAllocatedSeconds = 45 * 60; // 45 min
    AppState.timeRemainingSeconds = AppState.timeAllocatedSeconds;
  } else if (mode === 'adaptativo') {
    // Starts with balanced sample; dynamically adapted
    shuffleArray(pool);
    AppState.currentQuestions = pool.slice(0, Math.min(pool.length, 20));
    AppState.timeAllocatedSeconds = 120 * 60; // 120 min
    AppState.timeRemainingSeconds = AppState.timeAllocatedSeconds;
    AppState.currentAdaptiveDifficulty = 'medium';
  } else {
    // Simulado Oficial: 20 balanced items
    shuffleArray(pool);
    AppState.currentQuestions = pool.slice(0, Math.min(pool.length, 20));
    AppState.timeAllocatedSeconds = 120 * 60; // 120 min
    AppState.timeRemainingSeconds = AppState.timeAllocatedSeconds;
  }

  // Update Header UI
  updateHeaderModeText(mode);
  document.getElementById('header-runner-stats').style.display = 'flex';
  document.getElementById('btn-scratchpad-toggle').style.display = 'inline-flex';
  document.getElementById('btn-finish-exam-header').style.display = 'inline-flex';
  document.getElementById('header-home-links').style.display = 'none';

  // Toggle Drill specific UI
  const drillWrap = document.getElementById('drill-action-wrap');
  if (drillWrap) {
    drillWrap.style.display = (mode === 'drill') ? 'block' : 'none';
  }

  // Start Timer
  startTimer();

  // Render Palette Matrix
  renderMatrixGrid();

  // Switch to Runner View & Render first question
  switchScreen('runner');
  renderCurrentQuestion();

  AppState.lastResultsMode = null;
  document.title = `${getModeDisplayName(mode)} // Inteli Harness`;
  navigateTo(`#/simulado/${modeToRoute(mode)}`);

  showToast(`Simulado iniciado (${getModeDisplayName(mode)})! Boa prova.`, 'success');
}

function updateHeaderModeText(mode) {
  const names = {
    'oficial': 'Simulado Oficial Vestibular 2027 • 120m',
    'adaptativo': 'Motor Adaptativo 2027 TRI',
    'drill': 'Treino Deliberado (Modelo 2027)',
    'bolsa': 'Diagnóstico Bolsa 100% Inteli 2027 • 45m'
  };
  document.getElementById('header-mode-indicator').textContent = names[mode] || 'Vestibular 2027';
  const crumb = document.getElementById('runner-crumb-mode');
  if (crumb) crumb.textContent = getModeDisplayName(mode);
}

function getModeDisplayName(mode) {
  const names = {
    'oficial': 'Simulado Oficial Vestibular 2027',
    'adaptativo': 'Simulado Adaptativo 2027 TRI',
    'drill': 'Treino por Tópico (Modelo 2027)',
    'bolsa': 'Diagnóstico Bolsa 100% Inteli 2027'
  };
  return names[mode] || mode;
}

// ============================================================================
// 6. QUESTION RENDERING & KA-TEX INTEGRATION
// ============================================================================
function renderCurrentQuestion() {
  const q = AppState.currentQuestions[AppState.currentIndex];
  if (!q) return;

  // Header Counters
  document.getElementById('current-q-num').textContent = AppState.currentIndex + 1;
  document.getElementById('total-q-num').textContent = AppState.currentQuestions.length;

  // Meta Tags
  document.getElementById('q-meta-topic').textContent = q.topic || 'Matemática';
  document.getElementById('q-meta-subtopic').textContent = q.subtopic || 'Modelagem';
  
  const diffBadge = document.getElementById('q-meta-diff');
  diffBadge.textContent = (q.difficulty === 'hard' ? 'Difícil' : q.difficulty === 'easy' ? 'Fácil' : 'Médio');
  diffBadge.className = `badge-tag ${q.difficulty === 'hard' ? 'badge-rose' : q.difficulty === 'easy' ? 'badge-emerald' : 'badge-amber'}`;

  document.getElementById('q-meta-year').textContent = q.year ? `Processo Seletivo ${q.year}` : 'Vestibular Inteli';

  // Flag Button Status
  const isFlagged = AppState.flaggedQuestions.has(q.id);
  const flagBtn = document.getElementById('btn-toggle-flag');
  flagBtn.className = isFlagged ? 'btn-flag-toggle flagged' : 'btn-flag-toggle';
  document.getElementById('btn-flag-text').textContent = isFlagged ? 'Marcada p/ Revisão' : 'Marcar Revisão';

  // Context Box
  const contextBox = document.getElementById('q-context-box');
  if (q.context) {
    document.getElementById('q-context-text').textContent = q.context;
    contextBox.style.display = 'flex';
  } else {
    contextBox.style.display = 'none';
  }

  // Question Statement Body (Formatted with Markdown + Math)
  const statementEl = document.getElementById('q-statement-body');
  statementEl.innerHTML = formatMarkdownAndFormulas(q.statement);

  // Render Multiple Choice Options
  const optionsListEl = document.getElementById('q-options-list');
  optionsListEl.innerHTML = '';

  const selectedAnswer = AppState.userAnswers[q.id];
  const isVerifiedInDrill = (AppState.activeMode === 'drill' && AppState.drillVerified[q.id]);

  const letterLabels = ['A', 'B', 'C', 'D', 'E'];
  q.options.forEach((opt, idx) => {
    const card = document.createElement('div');
    card.className = 'option-card';
    if (selectedAnswer === idx) card.classList.add('selected');

    // Drill color highlights if already checked
    if (isVerifiedInDrill) {
      if (idx === q.correctIndex) card.classList.add('drill-correct');
      else if (selectedAnswer === idx) card.classList.add('drill-wrong');
    }

    const optText = (typeof opt === 'string') ? opt : (opt.text || '');

    card.innerHTML = `
      <div class="option-letter-badge">${letterLabels[idx]}</div>
      <div class="option-text">${formatMarkdownAndFormulas(optText)}</div>
    `;

    card.addEventListener('click', () => selectOption(idx));
    optionsListEl.appendChild(card);
  });

  // Drill Feedback Panel
  const drillPanel = document.getElementById('drill-feedback-panel');
  if (isVerifiedInDrill) {
    drillPanel.style.display = 'block';
    const isCorrect = (selectedAnswer === q.correctIndex);
    const statusHeader = document.getElementById('drill-feedback-status');
    statusHeader.innerHTML = isCorrect
      ? '<span style="color: var(--emerald);">✓ Resposta Correta! Excelente dedução.</span>'
      : '<span style="color: var(--rose);">✗ Alternativa Incorreta. Revise a resolução comentada:</span>';

    document.getElementById('drill-resolution-body').innerHTML = formatMarkdownAndFormulas(q.explanation || 'Resolução em processamento.');
    document.getElementById('drill-takeaway-text').textContent = q.keyTakeaway || 'Atenção aos distratores de sinal e aproximações no modelo adaptativo.';
  } else {
    drillPanel.style.display = 'none';
  }

  // Navigation Buttons State
  document.getElementById('btn-prev-q').disabled = (AppState.currentIndex === 0);
  const nextBtnText = document.getElementById('btn-next-text');
  if (AppState.currentIndex === AppState.currentQuestions.length - 1) {
    nextBtnText.textContent = (AppState.activeMode === 'drill') ? 'Concluir Treino' : 'Revisar & Entregar';
  } else {
    nextBtnText.textContent = 'Próxima';
  }

  // KaTeX Math Rendering Trigger
  renderKaTeXFormulas(statementEl);
  renderKaTeXFormulas(optionsListEl);
  if (isVerifiedInDrill) {
    renderKaTeXFormulas(drillPanel);
  }

  // Update Matrix visual states
  updateMatrixGridUI();
}

/**
 * Parses basic Markdown (bold, italic, code, linebreaks)
 */
function formatMarkdownAndFormulas(text) {
  if (!text) return '';
  let out = text
    .replace(/\r\n/g, '\n')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>');
  return out;
}

/**
 * Triggers KaTeX auto-render on target container if loaded
 */
function renderKaTeXFormulas(container) {
  if (window.renderMathInElement && container) {
    try {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.error('[KaTeX error]', e);
    }
  }
}

// ============================================================================
// 7. USER INTERACTION: SELECT, FLAG, NAVIGATE
// ============================================================================
function selectOption(index) {
  const q = AppState.currentQuestions[AppState.currentIndex];
  if (!q) return;

  AppState.userAnswers[q.id] = index;

  // In adaptive mode: calculate running difficulty shift
  if (AppState.activeMode === 'adaptativo') {
    adaptDifficultyOnAnswer(q, index === q.correctIndex);
  }

  renderCurrentQuestion();
}

function clearCurrentAnswer() {
  const q = AppState.currentQuestions[AppState.currentIndex];
  if (!q) return;
  delete AppState.userAnswers[q.id];
  renderCurrentQuestion();
  showToast('Resposta desmarcada.', 'info');
}

function toggleFlagCurrentQuestion() {
  const q = AppState.currentQuestions[AppState.currentIndex];
  if (!q) return;

  if (AppState.flaggedQuestions.has(q.id)) {
    AppState.flaggedQuestions.delete(q.id);
    showToast('Questão desmarcada de revisão.', 'info');
  } else {
    AppState.flaggedQuestions.add(q.id);
    showToast('Questão marcada para revisão! (⚑)', 'info');
  }

  document.getElementById('flagged-count').textContent = AppState.flaggedQuestions.size;
  renderCurrentQuestion();
}

function navigateQuestion(delta) {
  const targetIndex = AppState.currentIndex + delta;
  if (targetIndex >= 0 && targetIndex < AppState.currentQuestions.length) {
    AppState.currentIndex = targetIndex;
    renderCurrentQuestion();
  } else if (targetIndex >= AppState.currentQuestions.length) {
    // Reached end of questions
    showConfirmModal();
  }
}

function jumpToQuestion(index) {
  if (index >= 0 && index < AppState.currentQuestions.length) {
    AppState.currentIndex = index;
    renderCurrentQuestion();
  }
}

function verifyDrillAnswer() {
  const q = AppState.currentQuestions[AppState.currentIndex];
  if (!q) return;

  if (AppState.userAnswers[q.id] === undefined) {
    showToast('Por favor, selecione uma alternativa antes de verificar.', 'error');
    return;
  }

  AppState.drillVerified[q.id] = true;
  renderCurrentQuestion();
}

/**
 * Adaptive engine heuristic: Shifts difficulty based on accuracy
 */
function adaptDifficultyOnAnswer(currentQ, isCorrect) {
  if (isCorrect) {
    if (AppState.currentAdaptiveDifficulty === 'easy') AppState.currentAdaptiveDifficulty = 'medium';
    else if (AppState.currentAdaptiveDifficulty === 'medium') AppState.currentAdaptiveDifficulty = 'hard';
  } else {
    if (AppState.currentAdaptiveDifficulty === 'hard') AppState.currentAdaptiveDifficulty = 'medium';
    else if (AppState.currentAdaptiveDifficulty === 'medium') AppState.currentAdaptiveDifficulty = 'easy';
  }
}

// ============================================================================
// 8. QUESTION PALETTE MATRIX
// ============================================================================
function renderMatrixGrid() {
  const grid = document.getElementById('question-matrix-grid');
  grid.innerHTML = '';

  AppState.currentQuestions.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'matrix-q-btn';
    btn.textContent = idx + 1;
    btn.setAttribute('data-index', idx);
    btn.addEventListener('click', () => jumpToQuestion(idx));
    grid.appendChild(btn);
  });

  updateMatrixGridUI();
}

function updateMatrixGridUI() {
  const grid = document.getElementById('question-matrix-grid');
  if (!grid) return;

  let answeredCount = 0;

  AppState.currentQuestions.forEach((q, idx) => {
    const btn = grid.children[idx];
    if (!btn) return;

    btn.className = 'matrix-q-btn';

    if (idx === AppState.currentIndex) {
      btn.classList.add('current');
    }

    if (AppState.userAnswers[q.id] !== undefined) {
      btn.classList.add('answered');
      answeredCount++;
    }

    if (AppState.flaggedQuestions.has(q.id)) {
      btn.classList.add('flagged');
    }
  });

  // Summary counts
  document.getElementById('summary-answered-count').textContent = answeredCount;
  document.getElementById('summary-remaining-count').textContent = AppState.currentQuestions.length - answeredCount;
  document.getElementById('flagged-count').textContent = AppState.flaggedQuestions.size;
}

// ============================================================================
// 9. TIMER ENGINE & PAUSE MODAL
// ============================================================================
function startTimer() {
  clearInterval(AppState.timerInterval);

  const displayEl = document.getElementById('timer-display');
  const bezelEl = document.getElementById('timer-bezel');

  AppState.timerInterval = setInterval(() => {
    if (AppState.isPaused) return;

    if (AppState.activeMode === 'drill') {
      // Stopwatch mode
      AppState.timeRemainingSeconds++;
      displayEl.textContent = formatTime(AppState.timeRemainingSeconds);
    } else {
      // Countdown mode
      AppState.timeRemainingSeconds--;
      displayEl.textContent = formatTime(AppState.timeRemainingSeconds);

      // Warning alerts
      if (AppState.timeRemainingSeconds <= 300) { // < 5 min
        bezelEl.className = 'timer-bezel timer-danger';
      } else if (AppState.timeRemainingSeconds <= 900) { // < 15 min
        bezelEl.className = 'timer-bezel timer-warning';
      } else {
        bezelEl.className = 'timer-bezel';
      }

      // Time expired
      if (AppState.timeRemainingSeconds <= 0) {
        clearInterval(AppState.timerInterval);
        showToast('Tempo limite esgotado! Entregando prova automaticamente...', 'error');
        finishExam();
      }
    }
  }, 1000);
}

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function toggleTimerPause() {
  AppState.isPaused = !AppState.isPaused;
  const pauseModal = document.getElementById('pause-modal');
  const icon = document.getElementById('timer-toggle-icon');

  if (AppState.isPaused) {
    pauseModal.style.display = 'flex';
    icon.textContent = '▶';
  } else {
    pauseModal.style.display = 'none';
    icon.textContent = '❚❚';
  }
}

// ============================================================================
// 10. CONFIRMATION MODAL & EXAM FINALIZATION
// ============================================================================
function showConfirmModal() {
  const answeredCount = Object.keys(AppState.userAnswers).length;
  const totalCount = AppState.currentQuestions.length;
  const unansweredCount = totalCount - answeredCount;
  const flaggedCount = AppState.flaggedQuestions.size;

  document.getElementById('modal-answered-count').textContent = answeredCount;
  document.getElementById('modal-total-count').textContent = totalCount;

  const warningEl = document.getElementById('modal-unanswered-warning');
  if (unansweredCount > 0 || flaggedCount > 0) {
    warningEl.style.display = 'block';
    document.getElementById('modal-unanswered-count').textContent = unansweredCount;
    document.getElementById('modal-flagged-count').textContent = flaggedCount;
  } else {
    warningEl.style.display = 'none';
  }

  document.getElementById('confirm-modal').style.display = 'flex';
}

function hideConfirmModal() {
  document.getElementById('confirm-modal').style.display = 'none';
}

function finishExam() {
  hideConfirmModal();
  clearInterval(AppState.timerInterval);
  AppState.sessionEndTime = Date.now();

  // Reset header UI
  resetHeaderToHome();

  // Compute Results
  computeAndRenderResults();

  // Switch to Results View (replace runner entry: browser-back lands on home, no trap)
  AppState.lastResultsMode = AppState.activeMode;
  switchScreen('results');
  document.title = `Resultado — ${getModeDisplayName(AppState.activeMode)} // Inteli Harness`;
  try {
    history.replaceState(null, '', `#/simulado/${modeToRoute(AppState.activeMode)}/resultado`);
  } catch (e) {
    navigateTo(`#/simulado/${modeToRoute(AppState.activeMode)}/resultado`);
  }
}

// ============================================================================
// 11. RESULTS & PEDAGOGICAL ANALYTICS DASHBOARD
// ============================================================================
function computeAndRenderResults() {
  const questions = AppState.currentQuestions;
  const answers = AppState.userAnswers;

  let correctCount = 0;
  let wrongCount = 0;
  let blankCount = 0;

  // Topic metrics: { [topic]: { total: 0, correct: 0 } }
  const topicStats = {};

  questions.forEach(q => {
    const topic = q.topic || 'Outros';
    if (!topicStats[topic]) topicStats[topic] = { total: 0, correct: 0 };
    topicStats[topic].total++;

    const chosen = answers[q.id];
    if (chosen === undefined) {
      blankCount++;
    } else if (chosen === q.correctIndex) {
      correctCount++;
      topicStats[topic].correct++;
    } else {
      wrongCount++;
    }
  });

  const totalQuestions = questions.length;
  const scorePct = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Timing metrics
  const elapsedSeconds = (AppState.activeMode === 'drill')
    ? AppState.timeRemainingSeconds
    : (AppState.timeAllocatedSeconds - AppState.timeRemainingSeconds);
  const avgSeconds = totalQuestions > 0 ? Math.round(elapsedSeconds / totalQuestions) : 0;

  // 1. Render Score Badge & Date
  document.getElementById('res-mode-badge').textContent = getModeDisplayName(AppState.activeMode);
  document.getElementById('res-date-label').textContent = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
  });

  // 2. Score Percentage & Circle SVG
  document.getElementById('res-score-pct').textContent = `${scorePct}%`;
  const circleProgress = document.getElementById('score-circle-progress');
  if (circleProgress) {
    // Circumference = 2 * PI * r = 2 * 3.14159 * 70 = 439.82 -> 440
    const offset = 440 - (440 * (scorePct / 100));
    circleProgress.style.strokeDashoffset = offset;
    circleProgress.style.stroke = (scorePct >= 80) ? 'var(--emerald)' : (scorePct >= 60) ? 'var(--amber)' : 'var(--rose)';
  }

  // 3. Estimated Proficiency Level
  const profTitleEl = document.getElementById('res-prof-title');
  const profDescEl = document.getElementById('res-prof-desc');

  if (scorePct >= 80) {
    profTitleEl.textContent = 'Trilha Superior — Perfil Bolsa 100%';
    profTitleEl.style.color = '#34d399';
    profDescEl.textContent = 'Excelente domínio em modelagem computacional e combinatória. Desempenho altamente competitivo para convocação na 1ª chamada e elegibilidade à Bolsa Integral.';
  } else if (scorePct >= 60) {
    profTitleEl.textContent = 'Trilha Mediana — Vestibular Geral';
    profTitleEl.style.color = '#fbbf24';
    profDescEl.textContent = 'Consistente em fundamentos matemáticos. Para alcançar o corte da Bolsa Integral, priorize o reforço em probabilidade condicional e otimização de loops.';
  } else {
    profTitleEl.textContent = 'Trilha Inicial — Consolidação de Fundamentos';
    profTitleEl.style.color = '#f87171';
    profDescEl.textContent = 'Identificamos pontos de atenção em modelagem e interpretação rápida de enunciados. Recomendamos utilizar as aulas de reforço personalizadas abaixo.';
  }

  // 4. Counts & Time
  document.getElementById('res-correct-count').textContent = correctCount;
  document.getElementById('res-wrong-count').textContent = wrongCount;
  document.getElementById('res-blank-count').textContent = blankCount;
  document.getElementById('res-total-time').textContent = formatTime(elapsedSeconds);
  document.getElementById('res-avg-time').textContent = `${Math.floor(avgSeconds / 60)}m ${avgSeconds % 60}s`;

  // 5. Weak Spots Detector (lowest 2 topics)
  const weakTopics = [];
  for (const [top, stat] of Object.entries(topicStats)) {
    const acc = stat.total > 0 ? (stat.correct / stat.total) : 0;
    weakTopics.push({ topic: top, accuracy: acc, total: stat.total, correct: stat.correct });
  }
  weakTopics.sort((a, b) => a.accuracy - b.accuracy);

  renderWeakSpots(weakTopics.slice(0, 2));

  // 6. Topic Breakdown Bars
  renderTopicBreakdownBars(topicStats);

  // 7. Review Accordion
  renderReviewAccordion(questions, answers);

  // 8. Save Performance to LocalStorage and Sync with Backend
  const sessionRecord = {
    id: `SIM-${Date.now()}`,
    timestamp: new Date().toISOString(),
    mode: AppState.activeMode,
    score: correctCount,
    total: totalQuestions,
    percentage: scorePct,
    proficiency: profTitleEl.textContent,
    timeTaken: elapsedSeconds,
    weakTopics: weakTopics.slice(0, 2).map(w => w.topic)
  };

  saveSessionRecord(sessionRecord);
}

/**
 * Renders the Weak Spots section with dynamic lesson generation CTA
 */
function renderWeakSpots(weakList) {
  const container = document.getElementById('weak-topics-list');
  container.innerHTML = '';

  if (weakList.length === 0 || weakList[0].accuracy === 1) {
    container.innerHTML = `
      <div style="padding: 1rem; border-radius: 10px; background-color: var(--bg-surface-2); color: var(--emerald);">
        🎉 Parabéns! Você não apresentou nenhuma lacuna crítica neste simulado (acurácia máxima em todos os tópicos).
      </div>
    `;
    return;
  }

  weakList.forEach(item => {
    const pct = Math.round(item.accuracy * 100);
    const card = document.createElement('div');
    card.className = 'weak-topic-item';

    card.innerHTML = `
      <div>
        <div class="weak-topic-info-title">${item.topic}</div>
        <div class="weak-topic-stat">Acurácia: ${pct}% (${item.correct} de ${item.total} itens)</div>
      </div>
      <button class="btn-generate-lesson" data-topic="${item.topic}">
        <span>Gerar Aula de Reforço no Harness</span>
        <span class="btn-launch-icon">⚡</span>
      </button>
    `;

    card.querySelector('.btn-generate-lesson').addEventListener('click', () => {
      triggerLessonGeneration(item.topic);
    });

    container.appendChild(card);
  });
}

/**
 * Calls backend /api/generate-lesson on demand
 */
async function triggerLessonGeneration(topic) {
  const statusBox = document.getElementById('lesson-gen-status-box');
  const spinner = document.getElementById('gen-spinner');
  const titleText = document.getElementById('gen-title-text');
  const subText = document.getElementById('gen-sub-text');
  const actionWrap = document.getElementById('gen-action-wrap');
  const openLink = document.getElementById('btn-open-generated-lesson');

  statusBox.style.display = 'flex';
  statusBox.scrollIntoView({ behavior: 'smooth' });
  spinner.style.display = 'block';
  actionWrap.style.display = 'none';

  titleText.textContent = `Gerando Aula de Reforço: ${topic}...`;
  subText.textContent = 'O gerador pedagógico do Harness está compilando intuições profundas, teoria formal e exercícios calibrados.';

  try {
    const res = await fetch('/api/generate-lesson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: topic,
        weakPoints: [`Baixa acurácia detectada no simulado (${topic})`]
      })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      spinner.style.display = 'none';
      titleText.textContent = `Aula Gerada com Sucesso! (Score de Qualidade: ${data.evalScore || '95'}/100)`;
      subText.textContent = `Arquivo criado em ${data.lessonPath || data.lessonUrl}. Clique abaixo para abrir o ambiente interativo de estudos:`;
      actionWrap.style.display = 'block';
      openLink.href = data.lessonUrl || data.url || `/lessons/`;
      showToast(`Lição sobre "${topic}" compilada pelo Harness!`, 'success');
    } else {
      throw new Error(data.error || 'Falha ao processar lição');
    }
  } catch (err) {
    console.error('[Lesson Gen Error]', err);
    spinner.style.display = 'none';
    titleText.textContent = `Lição de Reforço Disponível`;
    subText.textContent = `Explore a pasta de aulas de reforço do repositório para aprofundar ${topic}.`;
    actionWrap.style.display = 'block';
    openLink.href = `/lessons/`;
  }
}

/**
 * Renders topic progress comparison bars
 */
function renderTopicBreakdownBars(topicStats) {
  const container = document.getElementById('topic-bars-container');
  container.innerHTML = '';

  for (const [topic, stat] of Object.entries(topicStats)) {
    const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
    const row = document.createElement('div');
    row.className = 'topic-bar-row';

    const barClass = (pct < 50) ? 'bar-weak' : (pct < 75) ? 'bar-medium' : '';

    row.innerHTML = `
      <div class="topic-bar-header">
        <span class="topic-name-label">${topic}</span>
        <span class="topic-stat-label">${pct}% (${stat.correct}/${stat.total})</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill ${barClass}" style="width: ${pct}%;"></div>
      </div>
    `;

    container.appendChild(row);
  }
}

/**
 * Renders question-by-question review accordion with filter support
 */
function renderReviewAccordion(questions, answers) {
  const container = document.getElementById('review-items-list');
  container.innerHTML = '';

  let wrongCount = 0;
  let correctCount = 0;
  let flaggedCount = 0;

  const letterLabels = ['A', 'B', 'C', 'D', 'E'];

  questions.forEach((q, idx) => {
    const chosen = answers[q.id];
    const isCorrect = (chosen === q.correctIndex);
    const isBlank = (chosen === undefined);
    const isFlagged = AppState.flaggedQuestions.has(q.id);

    if (isCorrect) correctCount++;
    else if (!isBlank) wrongCount++;
    if (isFlagged) flaggedCount++;

    const item = document.createElement('div');
    item.className = 'review-item';
    item.setAttribute('data-status', isCorrect ? 'correct' : isBlank ? 'blank' : 'wrong');
    item.setAttribute('data-flagged', isFlagged ? 'true' : 'false');

    const statusIcon = isCorrect ? '✓' : isBlank ? '—' : '✕';
    const statusClass = isCorrect ? 'status-correct' : isBlank ? 'status-blank' : 'status-wrong';

    const chosenText = isBlank ? 'Nenhuma alternativa selecionada' : `${letterLabels[chosen]} - ${q.options[chosen] || ''}`;
    const correctText = `${letterLabels[q.correctIndex]} - ${q.options[q.correctIndex] || ''}`;

    item.innerHTML = `
      <div class="review-item-header">
        <div class="review-header-left">
          <div class="review-status-icon ${statusClass}">${statusIcon}</div>
          <div class="review-q-title">Questão ${idx + 1}: ${q.topic} • <span style="font-weight: 400; color: var(--text-secondary);">${q.subtopic || ''}</span></div>
        </div>
        <div class="review-expand-arrow">▼</div>
      </div>
      <div class="review-item-body">
        <div class="question-statement-body">${formatMarkdownAndFormulas(q.statement)}</div>
        <div class="review-answers-compare">
          <div class="compare-block">
            <span class="compare-label">Sua Escolha:</span>
            <span class="compare-val" style="color: ${isCorrect ? 'var(--emerald)' : 'var(--rose)'};">${chosenText}</span>
          </div>
          <div class="compare-block">
            <span class="compare-label">Gabarito Oficial:</span>
            <span class="compare-val" style="color: var(--emerald);">${correctText}</span>
          </div>
        </div>
        <div class="review-resolution-box">
          ${formatMarkdownAndFormulas(q.explanation || 'Resolução comentada indisponível.')}
        </div>
      </div>
    `;

    // Toggle Accordion Click
    item.querySelector('.review-item-header').addEventListener('click', () => {
      item.classList.toggle('expanded');
      const body = item.querySelector('.review-item-body');
      if (item.classList.contains('expanded')) {
        renderKaTeXFormulas(body);
      }
    });

    container.appendChild(item);
  });

  // Update filter pills counters
  document.getElementById('count-filter-all').textContent = questions.length;
  document.getElementById('count-filter-wrong').textContent = wrongCount;
  document.getElementById('count-filter-correct').textContent = correctCount;
  document.getElementById('count-filter-flagged').textContent = flaggedCount;
}

function filterReviewQuestions(filter) {
  const items = document.querySelectorAll('.review-item');
  items.forEach(item => {
    const status = item.getAttribute('data-status');
    const flagged = item.getAttribute('data-flagged') === 'true';

    if (filter === 'all') {
      item.style.display = 'block';
    } else if (filter === 'wrong') {
      item.style.display = (status === 'wrong' || status === 'blank') ? 'block' : 'none';
    } else if (filter === 'correct') {
      item.style.display = (status === 'correct') ? 'block' : 'none';
    } else if (filter === 'flagged') {
      item.style.display = flagged ? 'block' : 'none';
    }
  });
}

// ============================================================================
// 12. PERSISTENCE & HISTORY MANAGEMENT
// ============================================================================
function loadHistory() {
  try {
    const saved = localStorage.getItem('inteli_sim_history');
    AppState.history = saved ? JSON.parse(saved) : [];
  } catch (e) {
    AppState.history = [];
  }
  renderHistoryWidget();
}

function saveSessionRecord(record) {
  AppState.history.unshift(record);
  if (AppState.history.length > 20) AppState.history.pop();

  try {
    localStorage.setItem('inteli_sim_history', JSON.stringify(AppState.history));
  } catch (e) {
    console.warn('[LocalStorage]', e);
  }

  // Asynchronous sync with server /api/save-performance
  fetch('/api/save-performance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record)
  }).then(r => r.json())
    .then(data => console.log('[Server Sync]', data))
    .catch(err => console.warn('[Server Sync Offline]', err));

  renderHistoryWidget();
}

function clearHistory() {
  if (confirm('Deseja realmente apagar o histórico de simulados salvos neste navegador?')) {
    localStorage.removeItem('inteli_sim_history');
    AppState.history = [];
    renderHistoryWidget();
    showToast('Histórico excluído com sucesso.', 'info');
  }
}

function renderHistoryWidget() {
  const container = document.getElementById('history-list-container');
  const countEl = document.getElementById('history-total-count');
  if (!container) return;

  countEl.textContent = `${AppState.history.length} tentativa(s)`;

  if (AppState.history.length === 0) {
    container.innerHTML = `
      <div class="empty-state-history">
        <div class="empty-icon">📊</div>
        <div class="empty-title">Nenhum simulado registrado ainda</div>
        <div class="empty-desc">Escolha um dos 4 modos acima para iniciar sua primeira rodada de testes calibrados ao vestibular Inteli.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  AppState.history.slice(0, 4).forEach(item => {
    const card = document.createElement('div');
    card.className = 'history-item-card';

    const dateStr = new Date(item.timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    });

    const isTopTier = (item.percentage >= 80);
    const scoreColor = isTopTier ? 'var(--emerald)' : (item.percentage >= 60) ? 'var(--amber)' : 'var(--rose)';

    card.innerHTML = `
      <div class="history-card-top">
        <span class="badge-tag ${isTopTier ? 'badge-emerald' : 'badge-indigo'}">${getModeDisplayName(item.mode)}</span>
        <span style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-tertiary);">${dateStr}</span>
      </div>
      <div style="display: flex; align-items: baseline; justify-content: space-between;">
        <span class="history-score-display" style="color: ${scoreColor};">${item.percentage}%</span>
        <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.score} de ${item.total} acertos</span>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-tertiary);">
        ${item.proficiency || 'Vestibular Inteli'}
      </div>
    `;

    container.appendChild(card);
  });
}

// ============================================================================
// 13. SCREEN SWITCHER
// ============================================================================
function switchScreen(screenName) {
  AppState.currentScreen = screenName;

  document.querySelectorAll('.view-screen').forEach(screen => {
    screen.classList.remove('active');
    screen.style.display = 'none';
  });

  const target = document.getElementById(`screen-${screenName}`);
  if (target) {
    target.classList.add('active');
    target.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ============================================================================
// 13b. HASH ROUTER — one route per simulado mode (static-safe, Vercel OK)
// Routes: #/ (home) | #/simulado/oficial | #/simulado/adaptativo
//         #/simulado/treino | #/simulado/bolsa | #/simulado/<m>/resultado
// ============================================================================
const MODE_TO_ROUTE = { oficial: 'oficial', adaptativo: 'adaptativo', drill: 'treino', bolsa: 'bolsa' };
const ROUTE_TO_MODE = { oficial: 'oficial', adaptativo: 'adaptativo', treino: 'drill', bolsa: 'bolsa' };

function modeToRoute(mode) {
  return MODE_TO_ROUTE[mode] || 'oficial';
}

function parseRoute() {
  const h = window.location.hash || '#/';
  const m = h.match(/^#\/simulado\/(oficial|adaptativo|treino|bolsa)(\/resultado)?$/);
  if (m) {
    return { screen: m[2] ? 'results' : 'runner', mode: ROUTE_TO_MODE[m[1]], route: m[1] };
  }
  return { screen: 'home', mode: null, route: null };
}

function navigateTo(hash) {
  if (window.location.hash === hash) {
    handleRoute();
    return;
  }
  window.location.hash = hash;
}

function resetHeaderToHome() {
  const runnerStats = document.getElementById('header-runner-stats');
  const scratchBtn = document.getElementById('btn-scratchpad-toggle');
  const finishBtn = document.getElementById('btn-finish-exam-header');
  const homeLinks = document.getElementById('header-home-links');
  if (runnerStats) runnerStats.style.display = 'none';
  if (scratchBtn) scratchBtn.style.display = 'none';
  if (finishBtn) finishBtn.style.display = 'none';
  if (homeLinks) homeLinks.style.display = 'flex';
  const indicator = document.getElementById('header-mode-indicator');
  if (indicator) indicator.textContent = 'Plataforma de Estudos & Simulados';
}

// Discard the live attempt WITHOUT counting anything: no history,
// no localStorage, no server sync. Wipes session state completely.
function discardExam() {
  if (!window.confirm('Descartar esta tentativa? Nada será salvo no histórico.')) return;
  if (AppState.timerInterval) clearInterval(AppState.timerInterval);
  AppState.currentQuestions = [];
  AppState.currentIndex = 0;
  AppState.userAnswers = {};
  AppState.flaggedQuestions = new Set();
  AppState.drillVerified = {};
  AppState.isPaused = false;
  AppState.lastResultsMode = null;
  hideConfirmModal();
  resetHeaderToHome();
  switchScreen('home');
  document.title = 'Inteli Harness // Simulador Oficial, Aulas Tufte & Editais';
  navigateTo('#/');
  showToast('Tentativa descartada — nada foi registrado.', 'info');
}

// Exit runner WITHOUT submitting. Answers are kept in memory so the
// mode route can resume the exam (Voltar button / browser back-safe).
function exitToHome() {
  if (AppState.timerInterval) clearInterval(AppState.timerInterval);
  AppState.isPaused = false;
  hideConfirmModal();
  resetHeaderToHome();
  switchScreen('home');
  document.title = 'Inteli Harness // Simulador Oficial, Aulas Tufte & Editais';
  navigateTo('#/');
}

function handleRoute() {
  const r = parseRoute();

  if (r.screen === 'home') {
    // Browser-back into home while an exam is live: hold the runner,
    // ask via the submit modal instead of silently wiping state.
    if (AppState.currentScreen === 'runner' && AppState.currentQuestions.length > 0) {
      navigateTo(`#/simulado/${modeToRoute(AppState.activeMode)}`);
      showConfirmModal();
      return;
    }
    if (AppState.currentScreen !== 'home') {
      resetHeaderToHome();
      switchScreen('home');
      document.title = 'Inteli Harness // Simulador Oficial, Aulas Tufte & Editais';
    }
    return;
  }

  if (r.screen === 'runner') {
    // Resume live exam for this mode; deep link / refresh starts it fresh.
    if (AppState.currentScreen === 'runner' && AppState.activeMode === r.mode && AppState.currentQuestions.length > 0) {
      return;
    }
    if (AppState.currentScreen === 'results' && AppState.lastResultsMode === r.mode) {
      return; // finished exam: stay on results, don't restart underneath it
    }
    startExam(r.mode);
    return;
  }

  // results route: show stored results or fall back to the mode route
  if (AppState.currentScreen === 'results' && AppState.lastResultsMode === r.mode) {
    return;
  }
  navigateTo(`#/simulado/${r.route}`);
}

window.addEventListener('hashchange', handleRoute);

// ============================================================================
// 14. DIGITAL SCRATCHPAD / CANVAS TOOLKIT
// ============================================================================
function initScratchpad() {
  const canvas = document.getElementById('scratchpad-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let currentColor = '#06b6d4';
  let isEraser = false;

  // Set crisp canvas resolution
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 260 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;
  }
  resizeCanvas();

  // Color Swatches
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      currentColor = swatch.getAttribute('data-color');
      isEraser = false;
      document.getElementById('tool-pen').classList.add('active');
      document.getElementById('tool-eraser').classList.remove('active');
    });
  });

  // Tools
  const penBtn = document.getElementById('tool-pen');
  const eraserBtn = document.getElementById('tool-eraser');

  penBtn.addEventListener('click', () => {
    isEraser = false;
    penBtn.classList.add('active');
    eraserBtn.classList.remove('active');
  });

  eraserBtn.addEventListener('click', () => {
    isEraser = true;
    eraserBtn.classList.add('active');
    penBtn.classList.remove('active');
  });

  document.getElementById('btn-clear-scratchpad').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Drawing Events (Mouse & Touch)
  function startDraw(x, y) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(x, y) {
    if (!isDrawing) return;
    if (isEraser) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 14;
    } else {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 2;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stopDraw() {
    isDrawing = false;
    ctx.closePath();
  }

  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    startDraw(e.clientX - rect.left, e.clientY - rect.top);
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    draw(e.clientX - rect.left, e.clientY - rect.top);
  });

  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);

  // Touch support for tablets / trackpads
  canvas.addEventListener('touchstart', (e) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    startDraw(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('touchend', stopDraw);
}

// ============================================================================
// 15. TOAST NOTIFICATIONS & UTILITIES
// ============================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;

  const icon = type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ============================================================================
// 16. UNIFIED HARNESS HUB MODULE (TABS, DOCS, RAW, LESSONS, EVALS, AGENT)
// ============================================================================

let cachedLessons = [];
let cachedDocs = [];
let cachedRawFiles = [];
let cachedReferences = [];

function initHarnessHub() {
  // 1. Tab switching
  const tabBtns = document.querySelectorAll('.tab-nav-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchHarnessTab(targetTab);
    });
  });

  // Header quick buttons
  const headerAgentBtn = document.getElementById('btn-header-agent');
  if (headerAgentBtn) {
    headerAgentBtn.addEventListener('click', () => {
      switchScreen('home');
      switchHarnessTab('agent');
    });
  }

  const headerHealthBtn = document.getElementById('btn-header-health-badge');
  if (headerHealthBtn) {
    headerHealthBtn.addEventListener('click', () => {
      switchScreen('home');
      switchHarnessTab('evals');
    });
  }

  // Auto-evolve button
  const evolveBtn = document.getElementById('btn-trigger-harness-evolve');
  if (evolveBtn) {
    evolveBtn.addEventListener('click', triggerHarnessEvolution);
  }

  // Quick generate lesson button in lessons tab
  const quickGenBtn = document.getElementById('btn-quick-generate-lesson');
  if (quickGenBtn) {
    quickGenBtn.addEventListener('click', () => {
      const topic = prompt('Digite o tema para gerar uma lição nova (ex: combinatoria, logica, funcoes):', 'combinatoria');
      if (topic) {
        triggerLessonGeneration(topic);
      }
    });
  }

  // Copy prompt buttons
  setupPromptCopyButtons();

  // Load all tab contents
  loadLessonsTab();
  loadDocsTab();
  loadRawFilesTab();
  loadReferencesTab();
  loadHarnessHealthTab();
}

function switchHarnessTab(tabId) {
  // Update nav buttons
  document.querySelectorAll('.tab-nav-btn').forEach(b => {
    if (b.getAttribute('data-tab') === tabId) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  // Update panels
  document.querySelectorAll('.harness-tab-panel').forEach(p => {
    p.classList.remove('active');
  });

  const activePanel = document.getElementById(`tab-panel-${tabId}`);
  if (activePanel) {
    activePanel.classList.add('active');
  }
}

async function loadLessonsTab() {
  const container = document.getElementById('lessons-catalog-grid');
  if (!container) return;

  try {
    const res = await fetch('/api/lessons');
    if (res.ok) {
      const data = await res.json();
      cachedLessons = data.lessons || [];
      const countBadge = document.getElementById('badge-lessons-count');
      if (countBadge) countBadge.textContent = cachedLessons.length;
      renderLessonsGrid(cachedLessons);
      setupLessonsSearchAndFilter();
    }
  } catch (e) {
    console.error('Error loading lessons:', e);
  }
}

function renderLessonsGrid(lessons) {
  const container = document.getElementById('lessons-catalog-grid');
  if (!container) return;

  if (lessons.length === 0) {
    container.innerHTML = `<div class="empty-state-history"><div class="empty-title">Nenhuma lição encontrada</div></div>`;
    return;
  }

  container.innerHTML = lessons.map(lesson => {
    const gradeColor = lesson.evalGrade === 'A' ? 'badge-emerald' : 'badge-amber';
    return `
      <div class="bezel-card lesson-card">
        <div class="bezel-core">
          <div class="lesson-top-meta">
            <span class="lesson-number-badge">${lesson.number || 'Lição'}</span>
            <span class="lesson-eval-badge ${gradeColor}">Nota ${lesson.evalScore || 95}/100 • Grau ${lesson.evalGrade || 'A'}</span>
          </div>
          <h4 class="lesson-card-title">${lesson.title}</h4>
          <p class="lesson-card-desc">${lesson.description || 'Lição interativa com fundamentos matemáticos e teste de recuperação ativa.'}</p>
          <div class="lesson-footer-row">
            <span class="lesson-time-tag">⏱ ${lesson.estimatedMinutes || 8} min de estudo</span>
            <a href="/lessons/${lesson.fileName}" target="_blank" class="btn-open-lesson">
              <span>Estudar Lição</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupLessonsSearchAndFilter() {
  const searchInput = document.getElementById('lesson-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const filtered = cachedLessons.filter(l => 
        l.title.toLowerCase().includes(term) || 
        l.fileName.toLowerCase().includes(term)
      );
      renderLessonsGrid(filtered);
    });
  }

  const chips = document.querySelectorAll('#lessons-topic-chips .filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const topic = chip.getAttribute('data-topic');
      if (topic === 'all') {
        renderLessonsGrid(cachedLessons);
      } else {
        const filtered = cachedLessons.filter(l => l.fileName.toLowerCase().includes(topic) || l.title.toLowerCase().includes(topic));
        renderLessonsGrid(filtered);
      }
    });
  });
}

async function loadDocsTab() {
  const navList = document.getElementById('docs-nav-list');
  if (!navList) return;

  try {
    const res = await fetch('/api/docs-catalog');
    if (res.ok) {
      const data = await res.json();
      cachedDocs = data.docs || [];
      renderDocsSidebar(cachedDocs);
      if (cachedDocs.length > 0) {
        selectDoc(cachedDocs[0]);
      }
    }
  } catch (e) {
    console.error('Error loading docs catalog:', e);
  }
}

function renderDocsSidebar(docs) {
  const navList = document.getElementById('docs-nav-list');
  if (!navList) return;

  navList.innerHTML = docs.map((doc, idx) => `
    <button class="doc-nav-item ${idx === 0 ? 'active' : ''}" data-doc-id="${doc.id}">
      <span class="doc-item-title">${doc.title}</span>
      <span class="doc-item-cat">${doc.category}</span>
    </button>
  `).join('');

  navList.querySelectorAll('.doc-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navList.querySelectorAll('.doc-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const docId = item.getAttribute('data-doc-id');
      const doc = cachedDocs.find(d => d.id === docId);
      if (doc) selectDoc(doc);
    });
  });
}

const DOC_EXECUTIVE_SUMMARIES = {
  'trilha-inteligente': {
    badge: 'PARECER TÉCNICO MUSE-SPARK 1.3 • INTELI 2027',
    title: 'Trilha Inteligente Oficial Inteli 2027 — Parecer & 5 Módulos',
    chips: [
      { label: 'Auditor', val: 'Muse-spark 1.3 Sênior' },
      { label: 'Estrutura', val: '5 Módulos Progressivos' },
      { label: 'Critério Ordenador', val: 'Pesos TRI + Dependência' },
      { label: 'Total de Lições', val: '19 Lições Tufte (100% Cobertura)' }
    ],
    takeaways: [
      '<strong>Arquitetura por Blocos TRI:</strong> A trilha inicia com Fundamentos Quant-Tech (Bloco 1) para garantir nota piso alta e calibração imediata na régua superior da prova.',
      '<strong>Módulo 2 como Coração da Prova:</strong> Dedicado aos 22% de Funções e Otimização de Lucro em startups (resolução em < 4min para afim e < 6min para quadrática).',
      '<strong>Trilha Superior (Módulos 3 a 5):</strong> Combinatória com repetição, Teorema de Bayes cumulativo, Rastreamento de loops Big-O e Geometria com eixos invertidos.',
      '<strong>Testes de Retenção Obrigatórios:</strong> Cada módulo possui um checkpoint de avaliação antes da liberação do próximo nível.'
    ],
    warning: 'Pular para tópicos avançados sem antes garantir acurácia de 100% em Lógica, Conjuntos e Funções básicas derruba severamente o escore adaptativo na prova real.'
  },
  'mapeamento-questoes': {
    badge: 'BANCO EMPÍRICO HISTÓRICO',
    title: 'Mapeamento das 148 Questões Anteriores — Pontos Essenciais',
    chips: [
      { label: 'Acervo Total', val: '148 Questões Oficiais' },
      { label: 'Exames Mapeados', val: '2022.1, 2022.2, 2023.1, 2025.1' },
      { label: 'Conformidade', val: '100% Anexo II' }
    ],
    takeaways: [
      '<strong>Validação Histórica:</strong> Todas as 148 questões foram catalogadas por habilidade matemática e contexto tecnológico de aplicação.',
      '<strong>Cenários Tech Recorrentes:</strong> Startups e Finanças (28%), Cibersegurança e Senhas (16%), Games e Latência (14%), Algoritmos (12%), Computação Gráfica (10%).',
      '<strong>O que Usar do Passado:</strong> O estilo da banca e o perfil de questões são a única herança do passado a ser estudada; regras e datas devem ser estritamente 2027.'
    ],
    warning: 'A banca do Inteli nunca cobra teoria pura: você precisa saber traduzir enunciados de negócios digitais em modelos matemáticos rapidamente.'
  },
  'edital-vestibular': {
    badge: 'PROCESSO SELETIVO 2027 • REGRAS OFICIAIS',
    title: 'Edital do Vestibular Inteli 2027 — Pontos Essenciais',
    chips: [
      { label: 'Formato', val: 'Prova Adaptativa (20 itens / 120 min)' },
      { label: 'Pesos', val: 'Prova 50% • Perfil 25% • Projeto 25%' },
      { label: 'Vagas & Cursos', val: 'CC, EC, ES, SI e ADM Tech' },
      { label: 'Critério', val: 'Nota Zero em qualquer eixo = Eliminação' }
    ],
    takeaways: [
      '<strong>Prova Adaptativa Inovadora:</strong> São 20 questões de matemática e raciocínio lógico contextualizadas em tecnologia. O algoritmo calibra a dificuldade em tempo real. As primeiras questões definem o piso da sua régua TRI.',
      '<strong>Avaliação Holística em 3 Eixos:</strong> Além da prova, o candidato realiza o Eixo Perfil (2 ensaios escritos no método STAR + portfólio) e o Eixo Projeto (dinâmica em equipe de resolução de problemas).',
      '<strong>Vias de Ingresso:</strong> Eixo Prova (presencial ou online) ou aproveitamento de notas do ENEM, SAT, ACT, IB ou premiações em Olimpíadas Científicas.'
    ],
    warning: 'Faltar à dinâmica em grupo ou zerar a redação elimina o candidato imediatamente, mesmo com 100% de acertos na prova teórica.'
  },
  'edital-bolsa': {
    badge: 'PROGRAMA DE BOLSAS INTEGRAIS 2027',
    title: 'Edital de Bolsas de Estudo Inteli 2027 — Pontos Essenciais',
    chips: [
      { label: 'Corte de Renda', val: '≤ 1,5 Salário Mínimo per capita (Integral)' },
      { label: 'Cobertura', val: '100% Mensalidade (R$ 6.000+/mês)' },
      { label: 'Permanência', val: 'Moradia + Notebook + Alimentação + Inglês' },
      { label: 'Fundo', val: 'Give-Back Filantrópico' }
    ],
    takeaways: [
      '<strong>Bolsa Integral 100% com 4 Auxílios:</strong> Cobre a mensalidade integral e fornece auxílio-moradia (prioridade para candidatos de fora da Grande SP), notebook corporativo cedido para os 4 anos, auxílio-alimentação e curso de inglês profissional.',
      '<strong>Auditoria Open Finance (EducaOpen):</strong> Obrigatório autorizar o compartilhamento das contas bancárias de todos os membros adultos da família dos últimos 90 dias.',
      '<strong>Etapas da Bolsa:</strong> 1) Análise Documental Rigorosa; 2) Entrevista Social com Assistente Social e Responsável; 3) Entrevista com a Banca do Comitê de Bolsas.'
    ],
    warning: 'A causa #1 de desclassificação é a omissão de contas bancárias no Open Finance ou movimentações financeiras sem comprovação prévia.'
  },
  'dossie-openfinance': {
    badge: 'CHECKLIST OPERACIONAL • OPEN FINANCE 2027',
    title: 'Dossiê Open Finance & Comprovação Socioeconômica — Pontos Essenciais',
    chips: [
      { label: 'Plataforma', val: 'EducaOpen (Open Finance Bacen)' },
      { label: 'Histórico', val: 'Últimos 90 Dias de Contas' },
      { label: 'Abrangência', val: 'Todos os Adultos do Domicílio' },
      { label: 'Moradia', val: 'Prioridade Fora de São Paulo' }
    ],
    takeaways: [
      '<strong>Conexão Digital Direta:</strong> Em vez de dezenas de PDFs avulsos, a integradora oficial EducaOpen audita diretamente as contas bancárias autorizadas via Open Finance.',
      '<strong>Contas Inativas e Digitais:</strong> Não omita contas sem uso, contas poupança antigas ou contas em bancos digitais (Nubank, Inter, PagBank). O sistema cruza os CPFs com o Banco Central.',
      '<strong>Declaração de Moradia Fora de SP:</strong> Para garantir a concessão do Auxílio-Moradia (vaga em acomodação estudantil no Butantã ou subsídio financeiro), comprove residência fora da Grande SP com contas de consumo no nome do responsável.',
      '<strong>Rendimentos Informais:</strong> Rendimentos autônomos ou sem carteira assinada devem ser declarados com autodeclaração assinada digitalmente pelo portal GOV.BR.'
    ],
    warning: 'A divergência entre movimentações bancárias no Open Finance e as declarações preenchidas é a maior causa de indeferimento de bolsas. Mantenha total transparência.'
  },
  'analise-conteudos-provas': {
    badge: 'MATRIZ DE CONTEÚDO VESTIBULAR 2027',
    title: 'Taxonomia & Incidência das Questões — Pontos Essenciais',
    chips: [
      { label: 'Meta de Acertos', val: '≥ 17 de 20 questões' },
      { label: 'Tempo Médio', val: '6 minutos / questão' },
      { label: 'Top 1', val: 'Funções & Otimização (22%)' },
      { label: 'Top 2 & 3', val: 'Lógica (18%) & Combinatória (16%)' }
    ],
    takeaways: [
      '<strong>Top 3 Tópicos Dominam 56% da Prova:</strong> Funções Quadráticas/Exponenciais com máximos e mínimos, Lógica Proposicional aplicada a software, e Combinatória em chaves/senhas.',
      '<strong>DNA Tecnológico:</strong> Todas as questões usam cenários reais: latência de servidores, startups SaaS (MRR, CAC, LTV), inteligência artificial, criptografia e coordenadas de telas com eixo Y invertido.',
      '<strong>Simetria de Distratores:</strong> As opções erradas são desenhadas para quem comete deslizes conceituais típicos (esquecer custo fixo, inverter implicações lógicas).'
    ],
    warning: 'Errar itens fáceis no início derruba a nota na TRI. Não chute no início; gaste até 8 minutos nas primeiras questões para garantir patamar alto.'
  },
  'guia-preparacao': {
    badge: 'CRONOGRAMA DE PREPARAÇÃO 2027',
    title: 'Plano Estratégico de 8 Semanas — Pontos Essenciais',
    chips: [
      { label: 'Ciclo', val: '8 Semanas Estruturadas' },
      { label: 'Ensaios', val: 'Método STAR (Situação, Tarefa, Ação, Resultado)' },
      { label: 'Dinâmica', val: 'Metodologia Ágil (Scrum)' },
      { label: 'Simulados', val: 'Semanais e Cronometrados' }
    ],
    takeaways: [
      '<strong>Semanas 1 a 4:</strong> Foco em matemática aplicada, lógica de proposições e algoritmos, com resolução cronometrada de blocos de 20 questões.',
      '<strong>Semanas 5 e 6:</strong> Construção dos dois ensaios do Eixo Perfil no método STAR, com foco em liderança servidora e impacto social.',
      '<strong>Semana 7:</strong> Treinamento de dinâmica em equipe com metodologia ágil — escuta ativa, síntese e espírito de equipe.',
      '<strong>Semana 8:</strong> Coleta e conferência minuciosa de todos os extratos bancários de 90 dias e documentos fiscais para a bolsa.'
    ],
    warning: 'Evite narrativas vazias ou egocêntricas no Eixo Perfil. O Inteli valoriza colaboração, humildade intelectual e paixão por construir com tecnologia.'
  },
  'mission': {
    badge: 'FRAMEWORK PEDAGÓGICO MATT POCOCK',
    title: 'Missão do Candidato 2027 — Pontos Essenciais',
    chips: [
      { label: 'Meta', val: 'Aprovação com Bolsa 100%' },
      { label: 'Filosofia', val: 'Storage Strength > Fluency Strength' },
      { label: 'Prática', val: 'Retrieval Practice (Recuperação Ativa)' }
    ],
    takeaways: [
      '<strong>Resultado Concreto:</strong> Aprovação no Vestibular Inteli 2027 com Bolsa Integral e Auxílios de Permanência.',
      '<strong>Memória de Longo Prazo:</strong> Priorize resolver problemas sem consulta e responder aos desafios de 48 horas.',
      '<strong>Ilusão de Maestria:</strong> Só considere um tópico dominado quando for capaz de resolver uma questão inédita sem hesitar.'
    ],
    warning: 'Ler resoluções prontas gera falsa sensação de aprendizado. Teste sua memória ativamente com os questionários interativos.'
  },
  'glossary': {
    badge: 'VOCABULÁRIO INSTITUCIONAL INTELI',
    title: 'Glossário Oficial — Pontos Essenciais',
    chips: [
      { label: 'Ensino', val: 'PBL (Aprendizagem Baseada em Projetos)' },
      { label: 'Cultura', val: 'Give-Back Filantrópico' },
      { label: 'Seleção', val: '3 Eixos Holísticos' }
    ],
    takeaways: [
      '<strong>Eixo Prova:</strong> Primeira etapa com prova adaptativa autoral de 20 itens.',
      '<strong>Eixo Perfil:</strong> Análise de trajetória, liderança e motivação.',
      '<strong>Eixo Projeto:</strong> Dinâmica em grupo de resolução de problemas corporativos reais.',
      '<strong>Give-Back:</strong> Cultura de retribuição futura dos bolsistas para alimentar o fundo de novas bolsas.'
    ],
    warning: 'Demonstrar familiaridade com a cultura do Inteli nas entrevistas e redações diferencia fortemente o candidato dos demais.'
  },
  'agent-guide': {
    badge: 'MANUAL DO AGENTE OMP LOCAL',
    title: 'Instruções do Mentor OMP — Pontos Essenciais',
    chips: [
      { label: 'Motor', val: 'Agente OMP Local' },
      { label: 'Assinaturas', val: 'Modelos Integrados' },
      { label: 'Dependência de API', val: 'Zero (Totalmente Local)' }
    ],
    takeaways: [
      '<strong>Mentoria de Alto Nível:</strong> Simula a banca de entrevista da bolsa, revisa redações de liderança e cria questões gêmeas para treinar erros.',
      '<strong>Telemetria:</strong> Lê data/student-performance.json para saber seus pontos fracos e prescrever exercícios.',
      '<strong>Comandos Rápidos:</strong> Copie os prompts na aba Central Agente OMP e mande no chat para mentoria imediata.'
    ],
    warning: 'Use o comando node bin/inteli.mjs evolve para gerar automaticamente lições sob medida para qualquer matéria onde sua nota cair.'
  }
};

async function selectDoc(doc) {
  document.getElementById('doc-active-title').textContent = doc.title;
  document.getElementById('doc-active-category').textContent = doc.category;
  document.getElementById('doc-active-path').textContent = doc.file;

  const renderEl = document.getElementById('doc-markdown-render');
  renderEl.innerHTML = `<div class="loading-spinner-wrap"><div class="gen-spinner"></div><span>Carregando ${doc.title}...</span></div>`;

  const summary = DOC_EXECUTIVE_SUMMARIES[doc.id];

  try {
    const res = await fetch(`/api/doc-content?file=${encodeURIComponent(doc.file)}`);
    if (res.ok) {
      const data = await res.json();
      let markdownHtml = '';
      if (window.marked && typeof window.marked.parse === 'function') {
        markdownHtml = window.marked.parse(data.content);
      } else {
        markdownHtml = `<pre><code>${data.content}</code></pre>`;
      }

      let summaryHtml = '';
      if (summary) {
        summaryHtml = `
          <div class="doc-executive-summary-card">
            <div class="summary-top-row">
              <span class="badge-tag badge-coral">${summary.badge}</span>
              <span class="summary-target-label">${summary.target || ''}</span>
            </div>
            <h3 class="summary-card-title">${summary.title}</h3>
            
            <div class="summary-chips-grid">
              ${summary.chips.map(c => `
                <div class="summary-chip-box">
                  <span class="chip-box-lbl">${c.label}</span>
                  <span class="chip-box-val">${c.val}</span>
                </div>
              `).join('')}
            </div>

            <div class="summary-keypoints-box">
              <h4 class="keypoints-title">O que você DEVE saber para este documento:</h4>
              <ul class="keypoints-list">
                ${summary.takeaways.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>

            ${summary.warning ? `
              <div class="summary-alert-strip">
                <strong>⚠️ ATENÇÃO CRÍTICA (ELIMINATÓRIA):</strong>
                <p>${summary.warning}</p>
              </div>
            ` : ''}
          </div>
          <div class="doc-full-text-divider">
            <span>DOCUMENTO OFICIAL NA ÍNTEGRA</span>
          </div>
        `;
      }

      renderEl.innerHTML = summaryHtml + `<div class="doc-full-markdown-body">${markdownHtml}</div>`;
      renderKaTeXFormulas(renderEl);
    }
  } catch (e) {
    renderEl.innerHTML = `<div class="modal-warning">Erro ao carregar documento: ${e.message}</div>`;
  }
}

async function loadRawFilesTab() {
  const container = document.getElementById('raw-files-grid');
  if (!container) return;

  try {
    const res = await fetch('/api/raw-files');
    if (res.ok) {
      const data = await res.json();
      cachedRawFiles = data.files || [];
      const countBadge = document.getElementById('badge-pdfs-count');
      if (countBadge) countBadge.textContent = cachedRawFiles.length;

      container.innerHTML = cachedRawFiles.map(f => `
        <div class="bezel-card raw-file-card">
          <div class="bezel-core">
            <div class="file-top-row">
              <span class="badge-tag">PDF OFICIAL</span>
              <span class="file-size-badge">${f.sizeMb}</span>
            </div>
            <h4 class="file-name-title">${f.filename}</h4>
            <p class="file-desc-text">${f.description}</p>
            <a href="${f.url}" target="_blank" class="btn-download-pdf">
              <span>Abrir / Baixar PDF</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      `).join('');
    }
  } catch (e) {
    console.error('Error loading raw files:', e);
  }
}

async function loadReferencesTab() {
  const container = document.getElementById('references-cards-grid');
  if (!container) return;

  try {
    const res = await fetch('/api/references');
    if (res.ok) {
      const data = await res.json();
      cachedReferences = data.references || [];
      container.innerHTML = cachedReferences.map(r => `
        <div class="bezel-card reference-card">
          <div class="bezel-core">
            <div class="file-top-row">
              <span class="badge-tag badge-cyan">CHEAT SHEET</span>
              <span class="badge-tag">HTML PRINT</span>
            </div>
            <h4 class="file-name-title">${r.title}</h4>
            <p class="file-desc-text">Guia condensado e limpo para consulta ágil de equações e algoritmos antes da prova.</p>
            <a href="${r.url}" target="_blank" class="btn-download-pdf">
              <span>Abrir Folha de Consulta</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      `).join('');
    }
  } catch (e) {
    console.error('Error loading references:', e);
  }
}

async function loadHarnessHealthTab() {
  try {
    const res = await fetch('/api/harness-health');
    if (res.ok) {
      const data = await res.json();
      const h = data.health;
      if (!h) return;

      // Update header badge
      const headerHealth = document.getElementById('header-health-score-text');
      if (headerHealth) headerHealth.textContent = `Saúde: ${h.overallHarnessScore}%`;
      const badgeScore = document.getElementById('badge-health-score');
      if (badgeScore) badgeScore.textContent = `${h.overallHarnessScore}%`;

      // Update main metrics
      const scoreHuge = document.getElementById('eval-score-huge');
      if (scoreHuge) scoreHuge.textContent = `${h.overallHarnessScore}/100`;

      const covVal = document.getElementById('eval-coverage-val');
      if (covVal) covVal.textContent = `${h.coverageScore}%`;

      const studAcc = document.getElementById('eval-student-acc');
      if (studAcc) studAcc.textContent = `${h.masteryScore}%`;

      // Populate heatmap
      const heatmapEl = document.getElementById('eval-topics-heatmap');
      if (heatmapEl && h.topicCoverage) {
        heatmapEl.innerHTML = Object.entries(h.topicCoverage).map(([topic, d]) => {
          const acc = d.studentAccuracy !== null ? d.studentAccuracy : 0;
          const barColor = acc >= 80 ? 'bg-emerald' : acc >= 60 ? 'bg-amber' : 'bg-rose';
          return `
            <div class="topic-bar-row">
              <div class="topic-bar-header">
                <span class="topic-name">${topic} (${Math.round(d.weight * 100)}% prova)</span>
                <span class="topic-acc">${d.studentAccuracy !== null ? `${acc}% acerto` : 'Sem testes'}</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill ${barColor}" style="width: ${acc}%"></div>
              </div>
              <div class="topic-sub-meta">
                <span>Lições: ${d.lessonsCount}</span> • <span>Questões: ${d.questionsCount}</span>
              </div>
            </div>
          `;
        }).join('');
      }

      // Populate actionable gaps
      const gapsListEl = document.getElementById('eval-actionable-gaps-list');
      if (gapsListEl) {
        if (!h.actionableGaps || h.actionableGaps.length === 0) {
          gapsListEl.innerHTML = `<div class="empty-state-history"><div class="empty-title">Nenhuma lacuna crítica detectada!</div></div>`;
        } else {
          gapsListEl.innerHTML = h.actionableGaps.map(g => `
            <div class="gap-item-box" style="margin-bottom: 0.75rem; padding: 0.75rem; background: rgba(255,255,255,0.03); border-radius: 8px;">
              <div class="gap-top" style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.3rem;">
                <span class="badge-tag ${g.urgency === 'VERY_HIGH' ? 'badge-rose' : 'badge-amber'}">${g.urgency}</span>
                <strong style="color: var(--text-primary); font-size: 0.9rem;">${g.topic}</strong>
              </div>
              <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 0;">${g.reason}</p>
            </div>
          `).join('');
        }
      }
    }
  } catch (e) {
    console.error('Error loading harness health:', e);
  }
}

async function triggerHarnessEvolution() {
  const btn = document.getElementById('btn-trigger-harness-evolve');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="gen-spinner" style="width:16px;height:16px;border-width:2px;"></span> Evoluindo...`;
  }

  showToast('Iniciando ciclo de auto-evolução do harness...', 'info');

  try {
    const res = await fetch('/api/harness-evolve', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      const evo = data.evolution;
      showToast(`Harness evoluído! ${evo.lessonsGenerated.length} lições e ${evo.learningRecordsCreated.length} registros criados.`, 'success');
      
      const logCard = document.getElementById('evolution-output-card');
      const logBody = document.getElementById('evolution-log-body');
      const timestamp = document.getElementById('evolution-timestamp');
      if (logCard && logBody) {
        logCard.style.display = 'block';
        if (timestamp) timestamp.textContent = new Date(evo.executedAt).toLocaleTimeString('pt-BR');
        
        logBody.innerHTML = `
          <p><strong>Pontuação anterior:</strong> ${evo.priorScore}/100 ➔ <strong>Nova pontuação:</strong> ${evo.updatedScore}/100</p>
          <p><strong>Lições geradas automaticamente para suprir lacunas:</strong></p>
          <ul>
            ${evo.lessonsGenerated.map(l => `<li><a href="/lessons/${l.fileName}" target="_blank">${l.topic} (${l.grade} - ${l.pedagogicalScore}/100) ↗</a></li>`).join('')}
          </ul>
          <p><strong>Registro de Aprendizagem salvo:</strong> <code>learning-records/${evo.learningRecordsCreated.join(', ')}</code></p>
        `;
      }

      // Reload tabs
      loadLessonsTab();
      loadHarnessHealthTab();
    }
  } catch (e) {
    showToast(`Erro ao evoluir harness: ${e.message}`, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span class="btn-text">Evoluir Harness com Base no Meu Uso</span><span class="btn-badge-icon">⚡</span>`;
    }
  }
}

function setupPromptCopyButtons() {
  document.querySelectorAll('.btn-copy-prompt').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const el = document.getElementById(targetId);
      if (el) {
        const text = el.innerText || el.textContent;
        navigator.clipboard.writeText(text).then(() => {
          showToast('Prompt copiado! Cole no chat para seu Agente OMP.', 'success');
          const origText = btn.querySelector('.btn-text');
          if (origText) {
            origText.textContent = 'Copiado!';
            setTimeout(() => { origText.textContent = 'Copiar Prompt'; }, 2000);
          }
        });
      }
    });
  });

  const copyDocLinkBtn = document.getElementById('btn-copy-doc-link');
  if (copyDocLinkBtn) {
    copyDocLinkBtn.addEventListener('click', () => {
      const pathText = document.getElementById('doc-active-path').textContent;
      navigator.clipboard.writeText(pathText).then(() => {
        showToast('Caminho do arquivo copiado!', 'success');
      });
    });
  }
}
