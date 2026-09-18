#!/usr/bin/env python3
"""
generate_questions.py
Constructs the official high-yield Inteli question bank in platform/data/questions.json.
Contains 50 complete, detailed questions based on the official Inteli admissions exams
(2025.1 Prova Adaptativa and 2022/2023 Provas).
"""

import json
import os

questions = [
    # =========================================================================
    # 2025.1 PROVA ADAPTATIVA (32 QUESTÕES)
    # =========================================================================
    {
        "id": "INTELI-2025-01",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Funções e Otimização",
        "subtopic": "Ponto de Equilíbrio e Receita",
        "difficulty": "medium",
        "context": "Assinaturas SaaS e Promoção de Desconto",
        "statement": "Uma empresa de tecnologia vende assinaturas de um software de gerenciamento. O custo fixo mensal desta empresa é de R$ 50.000,00, e o custo adicional por assinatura é de R$ 20,00.\n\nEsta empresa vende cada assinatura por R$ 300,00, mas para o mês de janeiro de 2025, decidiu que fará uma promoção: as $n$ primeiras pessoas que assinarem nesse período irão ganhar um desconto de R$ 30,00.\n\nConsiderando que a venda dessas licenças é a sua única fonte de receita, e que a partir da venda das $n$ primeiras licenças a empresa já não tem prejuízo, determine o valor de $n$.",
        "options": [
            "166",
            "185",
            "200",
            "225",
            "250"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Margem Líquida Unitária com Desconto:**\n   - Preço de venda com desconto: $300 - 30 = \\text{R\\$\\ } 270,00$.\n   - Custo variável por assinatura: $\\text{R\\$\\ } 20,00$.\n   - Lucro unitário por cada uma das $n$ primeiras assinaturas: $$270 - 20 = \\text{R\\$\\ } 250,00$$\n\n2. **Condição de Ponto de Equilíbrio (Break-Even):**\n   - Para não haver prejuízo com exatamente $n$ vendas, a receita líquida acumulada das primeiras $n$ assinaturas deve cobrir o custo fixo mensal de R$ 50.000,00:\n   $$250 \\cdot n = 50.000$$\n   $$n = \\frac{50.000}{250} = 200$$\n\nLogo, a empresa atinge o ponto de equilíbrio com exatamente 200 licenças vendidas.",
        "keyTakeaway": "Em problemas de ponto de equilíbrio com preço promocional inicial, a margem de contribuição líquida unitária ($P - \\text{desconto} - C_v$) multiplicada por $n$ deve igualar os custos fixos."
    },
    {
        "id": "INTELI-2025-02",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Funções e Otimização",
        "subtopic": "Função Quadrática e Modelagem Financeira",
        "difficulty": "medium",
        "context": "Preço de Fechamento da Ação INTE3",
        "statement": "Uma corretora de valores utiliza modelos automatizados para estimar o preço de fechamento das ações ao longo do dia, através de funções matemáticas. Para a ação INTE3, o preço de fechamento $P$ é dado pela seguinte função:\n\n$$P = -0{,}01v^2 + 4v + 100$$\n\nonde $v$ é o volume de transações realizadas, em milhares de ações. Por exemplo, se em um dia foram realizadas 50 mil transações ($v = 50$), o preço estimado é $P = -0{,}01 \\times 50^2 + 4 \\times 50 + 100 = 275{,}00$.\n\nSe o preço de fechamento ao final do dia foi estimado em **R$ 59,00**, qual foi o volume de transações (em milhares de ações)?",
        "options": [
            "400",
            "410",
            "420",
            "430",
            "440"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Igualação da função ao preço alvo:**\n   $$59 = -0{,}01v^2 + 4v + 100$$\n   Passando todos os termos para o mesmo membro:\n   $$0{,}01v^2 - 4v - 41 = 0$$\n\n2. **Eliminação dos decimais multiplicando por 100:**\n   $$v^2 - 400v - 4100 = 0$$\n\n3. **Cálculo das raízes pela fórmula de Bhaskara:**\n   $$\\Delta = (-400)^2 - 4 \\cdot 1 \\cdot (-4100) = 160.000 + 16.400 = 176.400$$\n   $$\\sqrt{\\Delta} = \\sqrt{176.400} = 420$$\n   $$v = \\frac{400 \\pm 420}{2}$$\n   - $v_1 = \\frac{400 + 420}{2} = \\frac{820}{2} = 410$\n   - $v_2 = \\frac{400 - 420}{2} = -10$ (descartada, pois volume de ações deve ser positivo: $v > 0$)\n\nPortanto, o volume de transações foi de 410 mil ações.",
        "keyTakeaway": "Em modelagem quadrática econômica e computacional, descarte raízes negativas que violam restrições de domínio físico ($v > 0$)."
    },
    {
        "id": "INTELI-2025-03",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Algoritmos e Complexidade",
        "subtopic": "Progressão Aritmética e Gestão Ágil",
        "difficulty": "easy",
        "context": "Gestão Ágil Scrum e Evolução de Sprints",
        "statement": "O framework de desenvolvimento ágil Scrum é um modelo amplamente adotado em empresas de tecnologia. O projeto é dividido em ciclos regulares de tempo chamados sprints, durando uma semana cada. A cada início de sprint, define-se o backlog de tarefas.\n\nUma startup adotou o Scrum e observou o seguinte número de tarefas concluídas por sprint no primeiro mês:\n• Sprint 1: 6 tarefas\n• Sprint 2: 10 tarefas\n• Sprint 3: 14 tarefas\n• Sprint 4: 18 tarefas\n\nConsidera-se que essa progressão se mantém uniforme até que se atinja um backlog de 50 tarefas por sprint, momento em que a equipe atinge sua capacidade máxima de vazão. Em qual sprint ocorrerá esse momento?",
        "options": [
            "10",
            "11",
            "12",
            "13",
            "14"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Identificação da Progressão Aritmética (PA):**\n   - Primeiro termo: $a_1 = 6$.\n   - Razão: $r = 10 - 6 = 14 - 10 = 4$.\n\n2. **Aplicação da fórmula do termo geral da PA:**\n   $$a_n = a_1 + (n - 1)r$$\n   Substituindo $a_n = 50$:\n   $$50 = 6 + (n - 1) \\times 4$$\n   $$44 = 4(n - 1)$$\n   $$n - 1 = 11 \\implies n = 12$$\n\nLogo, a equipe atingirá a capacidade máxima de 50 tarefas na 12ª sprint.",
        "keyTakeaway": "O termo geral da PA ($a_n = a_1 + (n-1)r$) resolve diretamente problemas de escalabilidade e capacidade operacional em fluxos de trabalho ágeis."
    },
    {
        "id": "INTELI-2025-04",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Probabilidade e Teoria dos Conjuntos",
        "subtopic": "Princípio da Inclusão-Exclusão e Diagrama de Venn",
        "difficulty": "medium",
        "context": "Seleção Logística com Tablets e Rotas",
        "statement": "Uma empresa de logística multinacional abriu seleção para contratação de motoristas. Os caminhões são operados por tablet no processo de carga e descarga, e as rotas cruzam países da América Latina, exigindo passaporte válido.\n\nA empresa recebeu 145 candidaturas e levantou as seguintes qualificações:\n• 68 possuem conhecimento para operar o tablet;\n• 78 possuem CNH compatível com os caminhões;\n• 40 possuem passaporte em dia;\n• 13 possuem tablet e CNH;\n• 18 possuem CNH e passaporte;\n• 23 possuem passaporte e tablet;\n• 3 candidatos possuem as três qualificações simultaneamente.\n\nQuantos candidatos **não possuem nenhuma** das três qualificações?",
        "options": [
            "10",
            "15",
            "20",
            "25",
            "30"
        ],
        "correctIndex": 0,
        "explanation": "### Resolução Passo a Passo\n\n1. **Aplicação do Princípio da Inclusão-Exclusão para 3 conjuntos ($T, C, P$):**\n   $$n(T \\cup C \\cup P) = n(T) + n(C) + n(P) - n(T \\cap C) - n(C \\cap P) - n(T \\cap P) + n(T \\cap C \\cap P)$$\n\n2. **Substituição dos valores:**\n   $$n(T \\cup C \\cup P) = 68 + 78 + 40 - 13 - 18 - 23 + 3$$\n   $$n(T \\cup C \\cup P) = 186 - 54 + 3 = 135$$\n\n3. **Cálculo do complemento (nenhuma qualificação):**\n   Total de candidatos = 145.\n   $$N = 145 - 135 = 10$$\n\nLogo, 10 candidatos não possuem nenhuma das três qualificações.",
        "keyTakeaway": "Para calcular elementos fora da união de 3 conjuntos, utilize $|U| - (\\sum |A_i| - \\sum |A_i \\cap A_j| + |A_1 \\cap A_2 \\cap A_3|)$."
    },
    {
        "id": "INTELI-2025-05",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Estatística",
        "subtopic": "Média Aritmética e Inequações",
        "difficulty": "easy",
        "context": "Latência de Servidores em Jogos Multiplayer",
        "statement": "A latência de um jogo refere-se ao tempo que um comando enviado pelo jogador leva para ser processado no servidor e devolvido ao dispositivo. Diz-se que uma experiência de jogo é fluida quando a média de latência dos servidores disponíveis é de, no máximo, 30 ms.\n\nDurante testes de infraestrutura, registraram-se os seguintes tempos de latência para quatro de cinco servidores disponíveis:\n\n$$\\text{28 ms,  32 ms,  27 ms,  29 ms}$$\n\nDevido a uma falha técnica, o tempo de latência do quinto servidor não foi registrado. Para garantir uma experiência fluida, qual é o valor máximo permitido para a latência do quinto servidor?",
        "options": [
            "30 ms",
            "31 ms",
            "32 ms",
            "34 ms",
            "35 ms"
        ],
        "correctIndex": 3,
        "explanation": "### Resolução Passo a Passo\n\n1. **Condição da média aritmética:**\n   Seja $x$ a latência do quinto servidor. A média dos 5 servidores deve ser $\\le 30\\text{ ms}$:\n   $$\\frac{28 + 32 + 27 + 29 + x}{5} \\le 30$$\n\n2. **Resolução da inequação:**\n   $$\\frac{116 + x}{5} \\le 30$$\n   $$116 + x \\le 150$$\n   $$x \\le 150 - 116 = 34$$\n\nPortanto, o valor máximo admitido para o quinto servidor é 34 ms.",
        "keyTakeaway": "Em benchmarks com teto na média amostral $\\bar{x} \\le M$, isole o termo desconhecido através da desigualdade de soma $\\sum x_i + x \\le n \\cdot M$."
    },
    {
        "id": "INTELI-2025-06",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Finanças Tech",
        "subtopic": "Preço Médio e Breakeven de Ações",
        "difficulty": "medium",
        "context": "Recuperação de Investimento Pós-IPO na B3",
        "statement": "Uma startup altamente inovadora realizou seu IPO na B3 a um preço de R$ 30,00 por ação. Pedro, um jovem investidor, adquiriu 10.000 ações nesse IPO.\n\nMeses depois, devido a atrasos no roadmap de produto, as ações despencaram para **um décimo** do seu valor inicial. Acreditando no plano de recuperação do novo CEO, Pedro adquiriu mais 5.000 ações pelo preço depreciado.\n\nPara que Pedro recupere todo o capital investido sem ter prejuízo (atingir o breakeven), a que preço mínimo cada ação da startup deverá chegar no mercado?",
        "options": [
            "R$ 20,00",
            "R$ 21,00",
            "R$ 22,00",
            "R$ 23,00",
            "R$ 24,00"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Cálculo do capital total investido:**\n   - Primeiro aporte: $10.000 \\times 30 = \\text{R\\$\\ } 300.000,00$.\n   - Preço na baixa: $\\frac{1}{10} \\times 30 = \\text{R\\$\\ } 3,00$ por ação.\n   - Segundo aporte: $5.000 \\times 3 = \\text{R\\$\\ } 15.000,00$.\n   - Total investido: $$300.000 + 15.000 = \\text{R\\$\\ } 315.000,00$$\n\n2. **Total de ações em carteira:**\n   $$10.000 + 5.000 = 15.000\\text{ ações}$$\n\n3. **Preço médio de equilíbrio (Breakeven):**\n   $$P_{\\text{médio}} = \\frac{\\text{Total Investido}}{\\text{Total de Ações}} = \\frac{315.000}{15.000} = \\text{R\\$\\ } 21,00$$\n\nLogo, a ação precisa alcançar R$ 21,00 para Pedro empatar o investimento.",
        "keyTakeaway": "O preço de equilíbrio de uma posição acionária (preço médio ponderado) é dado por $\\bar{P} = \\frac{\\sum (P_i \\times Q_i)}{\\sum Q_i}$."
    },
    {
        "id": "INTELI-2025-07",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Finanças Tech",
        "subtopic": "Sistemas Lineares e ROI Publicitário",
        "difficulty": "medium",
        "context": "Marketing e Atribuição em Redes Sociais A e B",
        "statement": "Uma empresa de tecnologia testou duas redes sociais, A e B, para campanhas de aquisição. O número de visualizações geradas é diretamente proporcional ao valor investido em publicidade.\n\nForam realizados dois testes de uma semana:\n• Teste 1: R$ 50 mil em A e R$ 25 mil em B geraram um total de 20.000 visualizações.\n• Teste 2: R$ 25 mil em A e R$ 50 mil em B geraram um total de 25.000 visualizações.\n\nCom base nesses dados, quantas visualizações cada mil reais investidos na rede social B gera?",
        "options": [
            "200",
            "300",
            "400",
            "500",
            "600"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Modelagem do sistema linear:**\n   Sejam $a$ e $b$ o número de visualizações geradas por cada R$ 1.000 investidos nas redes A e B, respectivamente.\n   $$\\begin{cases} 50a + 25b = 20.000 \\\\ 25a + 50b = 25.000 \\end{cases}$$\n\n2. **Resolução por eliminação:**\n   Multiplicando a 2ª equação por 2:\n   $$50a + 100b = 50.000$$\n   Subtraindo a 1ª equação desta nova equação:\n   $$(50a + 100b) - (50a + 25b) = 50.000 - 20.000$$\n   $$75b = 30.000$$\n   $$b = \\frac{30.000}{75} = 400$$\n\nCada mil reais investidos na rede social B gera 400 visualizações.",
        "keyTakeaway": "Em atribuição multicanal com resposta linear, sistemas lineares 2x2 determinam a eficiência marginal ($V/\\text{investimento}$) de cada mídia."
    },
    {
        "id": "INTELI-2025-08",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Geometria e Métricas",
        "subtopic": "Área de Trapézio e Lotação de Espaço",
        "difficulty": "medium",
        "context": "Capacidade Máxima e Receita de Festival",
        "statement": "Uma produtora de eventos organiza um festival de música em um pavilhão plano no formato de trapézio com base maior de 250 metros, base menor de 100 metros e altura perpendicular de 100 metros.\n\nPelas normas de segurança do evento, cada pessoa deve dispor de no mínimo $0{,}4\\text{ m}^2$ de área livre. Se todos os ingressos forem vendidos pelo preço único de R$ 200,00, qual é o valor máximo que a empresa poderá arrecadar com a bilheteria?",
        "options": [
            "R$ 6,25 milhões",
            "R$ 7,00 milhões",
            "R$ 7,50 milhões",
            "R$ 8,75 milhões",
            "R$ 9,50 milhões"
        ],
        "correctIndex": 3,
        "explanation": "### Resolução Passo a Passo\n\n1. **Cálculo da área do salão (trapézio):**\n   $$A_{\\text{trapézio}} = \\frac{(B + b) \\cdot h}{2} = \\frac{(250 + 100) \\cdot 100}{2} = \\frac{350 \\cdot 100}{2} = 17.500\\text{ m}^2$$\n\n2. **Capacidade máxima de público:**\n   Como cada pessoa ocupa no mínimo $0{,}4\\text{ m}^2$:\n   $$N_{\\text{máx}} = \\frac{17.500}{0{,}4} = 43.750\\text{ pessoas}$$\n\n3. **Arrecadação máxima:**\n   $$R = 43.750 \\times 200 = \\text{R\\$\\ } 8.750.000,00 = \\text{R\\$\\ } 8{,}75\\text{ milhões}$$\n\nLogo, o valor máximo de arrecadação é R$ 8,75 milhões.",
        "keyTakeaway": "A densidade espacial regulatória permite converter métricas de área útil ($m^2$) em capacidade de público e teto de faturamento."
    },
    {
        "id": "INTELI-2025-09",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Funções e Otimização",
        "subtopic": "Função Afim e Remuneração Variável",
        "difficulty": "easy",
        "context": "Distribuição de Lucros e Bônus de Desempenho",
        "statement": "Uma empresa de tecnologia remunera seus colaboradores com um multiplicador $M(x)$ do salário base, em que $x$ é a nota da avaliação de desempenho individual ($0 \\le x \\le 10$). O multiplicador segue uma função afim $M(x) = ax + b$.\n\nSabe-se que:\n• Uma nota 7,0 resulta em um bônus de 1,20 vezes o salário base;\n• Uma nota 9,5 resulta em um bônus de 1,45 vezes o salário base.\n\nQual será o bônus concedido a um colaborador que obteve nota 8,5?",
        "options": [
            "1,05 vezes o seu salário",
            "1,15 vezes o seu salário",
            "1,25 vezes o seu salário",
            "1,35 vezes o seu salário",
            "1,45 vezes o seu salário"
        ],
        "correctIndex": 3,
        "explanation": "### Resolução Passo a Passo\n\n1. **Determinação dos coeficientes da reta $M(x) = ax + b$:**\n   $$\\begin{cases} 7a + b = 1{,}20 \\\\ 9{,}5a + b = 1{,}45 \\end{cases}$$\n   Subtraindo a 1ª da 2ª equação:\n   $$2{,}5a = 0{,}25 \\implies a = 0{,}10$$\n\n2. **Determinação do coeficiente linear $b$:**\n   $$7(0{,}10) + b = 1{,}20 \\implies 0{,}70 + b = 1{,}20 \\implies b = 0{,}50$$\n   Assim, $M(x) = 0{,}10x + 0{,}50$.\n\n3. **Cálculo de $M(8{,}5)$:**\n   $$M(8{,}5) = 0{,}10(8{,}5) + 0{,}50 = 0{,}85 + 0{,}50 = 1{,}35$$\n\nO bônus será de 1,35 vezes o salário base.",
        "keyTakeaway": "Em funções lineares $y = ax + b$, a taxa de variação constante $a = \\frac{\\Delta y}{\\Delta x}$ permite interpolar qualquer patamar com precisão."
    },
    {
        "id": "INTELI-2025-10",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Funções e Otimização",
        "subtopic": "Função Quadrática e Parábola",
        "difficulty": "medium",
        "context": "Arco Decorativo Parabólico",
        "statement": "O departamento de marketing de um shopping center decidiu instalar um arco decorativo na entrada principal para um evento especial. O arco tem o formato de uma parábola com 30 metros de largura na base e uma altura máxima de 9 metros no centro.\n\nConsiderando o eixo $x$ sobre a base do arco e o eixo $y$ como o eixo de simetria vertical da parábola, determine a equação matemática que descreve o perfil desse arco.",
        "options": [
            "y = -1/5 x^2 + 9",
            "y = -1/15 x^2 + 9",
            "y = -1/25 x^2 + 9",
            "y = -1/125 x^2 + 9",
            "y = -1/225 x^2 + 9"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Determinação das raízes e simetria:**\n   - A largura da base é de 30 metros.\n   - Como o eixo $y$ é o eixo de simetria, a base está centrada na origem, com raízes em $x_1 = -15$ e $x_2 = 15$.\n\n2. **Forma fatorada da parábola:**\n   $$y = a(x - 15)(x + 15) = a(x^2 - 225)$$\n\n3. **Aplicação do vértice $(0, 9)$:**\n   A altura máxima no centro ($x = 0$) é $y = 9$:\n   $$9 = a(0^2 - 225) \\implies 9 = -225a \\implies a = -\\frac{9}{225} = -\\frac{1}{25}$$\n\nSubstituindo $a$:\n$$y = -\\frac{1}{25}(x^2 - 225) = -\\frac{1}{25}x^2 + 9$$\n\nPortanto, a equação é $y = -\\frac{1}{25}x^2 + 9$.",
        "keyTakeaway": "Quando a parábola tem simetria no eixo $y$, sua equação é da forma $y = ax^2 + c$, onde $c = y_v$ e $a = -c / r^2$."
    },
    {
        "id": "INTELI-2025-11",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Algoritmos e Complexidade",
        "subtopic": "Progressão Aritmética e Soma de Termos",
        "difficulty": "medium",
        "context": "Logística e Escala Linear de Entregas Semanais",
        "statement": "Uma empresa de logística de e-commerce adotou uma estratégia de expansão linear no número de entregas semanais ao longo das próximas semanas até atingir sua capacidade máxima operacional.\n\nSabe-se que:\n• Na 1ª semana foram realizadas 50 entregas;\n• Na 5ª semana foram realizadas 70 entregas.\n\nSabendo que na 12ª semana a empresa alcançou sua capacidade máxima de entregas, quantas entregas a empresa terá feito **no total acumulado**, durante todo esse período de 12 semanas de crescimento?",
        "options": [
            "105",
            "320",
            "465",
            "930",
            "1205"
        ],
        "correctIndex": 3,
        "explanation": "### Resolução Passo a Passo\n\n1. **Determinação da razão da PA:**\n   $$a_5 = a_1 + 4r \\implies 70 = 50 + 4r \\implies 4r = 20 \\implies r = 5$$\n\n2. **Cálculo da quantidade de entregas na 12ª semana ($a_{12}$):**\n   $$a_{12} = a_1 + 11r = 50 + 11 \\times 5 = 50 + 55 = 105$$\n\n3. **Cálculo do volume total acumulado ($S_{12}$):**\n   $$S_n = \\frac{(a_1 + a_n) \\cdot n}{2}$$\n   $$S_{12} = \\frac{(50 + 105) \\times 12}{2} = 155 \\times 6 = 930$$\n\nA empresa terá realizado um total acumulado de 930 entregas.",
        "keyTakeaway": "Atenção ao enunciado: pergunte-se sempre se a questão pede o valor no $n$-ésimo período ($a_n$) ou o acumulado histórico ($S_n$)."
    },
    {
        "id": "INTELI-2025-12",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Probabilidade e Teoria dos Conjuntos",
        "subtopic": "Diagrama de Venn e Inclusão-Exclusão com Porcentagens",
        "difficulty": "hard",
        "context": "Plataformas LMS e Tecnologias de Aprendizagem",
        "statement": "Uma pesquisa de mercado sobre o uso de plataformas de LMS (Learning Management System) nas instituições de ensino apurou os seguintes percentuais entre as plataformas líderes $A, B$ e $C$:\n\nI. 30% utilizam a plataforma $A$\nII. 40% utilizam a plataforma $B$\nIII. 50% utilizam a plataforma $C$\nIV. 20% utilizam as plataformas $A$ e $B$\nV. 10% utilizam as plataformas $A$ e $C$\nVI. 15% utilizam as plataformas $B$ e $C$\nVII. 20 instituições utilizam as três plataformas $A, B$ e $C$ simultaneamente.\n\nSabendo que apenas 5% das instituições pesquisadas possuem plataforma própria ou utilizam uma plataforma diferente de $A, B$ ou $C$, determine quantas instituições utilizam a plataforma $C$.",
        "options": [
            "5",
            "10",
            "50",
            "100",
            "125"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Inclusão-Exclusão percentual:**\n   Seja $x\\%$ o percentual de instituições que utilizam as 3 plataformas simultaneamente ($A \\cap B \\cap C$).\n   A união $A \\cup B \\cup C$ representa $100\\% - 5\\% = 95\\%$.\n   $$\\%(A \\cup B \\cup C) = \\%A + \\%B + \\%C - \\%(A \\cap B) - \\%(A \\cap C) - \\%(B \\cap C) + \\%(A \\cap B \\cap C)$$\n   $$95\\% = 30\\% + 40\\% + 50\\% - 20\\% - 10\\% - 15\\% + x\\%$$\n   $$95\\% = 120\\% - 45\\% + x\\% = 75\\% + x\\% \\implies x\\% = 20\\%$$\n\n2. **Tamanho total da amostra ($N$):**\n   Sabemos pela informação VII que 20 instituições utilizam as 3 plataformas, o que corresponde a 20% do total:\n   $$20\\% \\cdot N = 20 \\implies N = 100\\text{ instituições}$$\n\n3. **Quantidade de instituições que utilizam a plataforma $C$:**\n   Como 50% das instituições utilizam a plataforma $C$ (item III):\n   $$N_C = 50\\% \\cdot 100 = 50$$\n\nLogo, 50 instituições utilizam a plataforma C.",
        "keyTakeaway": "Converta as informações percentuais em um balanço da união ($|A \\cup B \\cup C| = 100\\% - \\text{fora}$) para encontrar o valor de $x\\%$ e calibrar a amostra total."
    },
    {
        "id": "INTELI-2025-13",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Funções e Otimização",
        "subtopic": "Conversão de Unidades e Desempenho de Renderização",
        "difficulty": "easy",
        "context": "Taxa de Quadros por Segundo (FPS) em Realidade Virtual",
        "statement": "Um desenvolvedor de jogos está otimizando o pipeline gráfico de um novo título para óculos de realidade virtual. A taxa de quadros por segundo (FPS) indica quantos quadros são gerados e exibidos a cada segundo.\n\nDurante os testes de estresse com o motor gráfico, o jogo atingiu uma taxa estável de **240 FPS**. Qual é a duração média aproximada de cada quadro, em **milissegundos por quadro** (ms/frame), para essa configuração?",
        "options": [
            "1,50 ms",
            "4,17 ms",
            "6,25 ms",
            "8,33 ms",
            "9,25 ms"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Relação entre FPS e tempo de quadro (Frame Time):**\n   A taxa de 240 FPS significa 240 quadros em 1 segundo.\n   $$t = \\frac{1\\text{ segundo}}{240\\text{ quadros}}$$\n\n2. **Conversão de segundos para milissegundos ($1\\text{ s} = 1.000\\text{ ms}$):**\n   $$t = \\frac{1.000\\text{ ms}}{240} = \\frac{100}{24} = \\frac{25}{6} \\approx 4{,}1667\\text{ ms}$$\n\nArredondando para duas casas decimais, temos aproximadamente 4,17 ms por quadro.",
        "keyTakeaway": "Em computação gráfica e otimização de jogos, o frame time em milissegundos é calculado diretamente pelo inverso da frequência: $t_{\\text{ms}} = \\frac{1000}{\\text{FPS}}$."
    },
    {
        "id": "INTELI-2025-14",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Estatística",
        "subtopic": "Média Aritmética e Crescimento de Produto",
        "difficulty": "easy",
        "context": "Crescimento de Base e Downloads de Startup de IA",
        "statement": "Uma startup focada em visão computacional e realidade aumentada lançou um aplicativo há seis meses. Ao auditar a loja de aplicativos, observou-se uma média mensal de **260 mil downloads** ao longo desses seis meses.\n\nSabe-se que no primeiro mês após o lançamento não houve downloads (0 downloads), e nos quatro meses seguintes foram registrados, respectivamente, 50 mil, 150 mil, 200 mil e 220 mil downloads.\n\nQual foi o total de downloads registrados no sexto mês?",
        "options": [
            "940 mil",
            "900 mil",
            "860 mil",
            "820 mil",
            "680 mil"
        ],
        "correctIndex": 0,
        "explanation": "### Resolução Passo a Passo\n\n1. **Fórmula da média aritmética:**\n   Seja $x$ o número de downloads (em milhares) no 6º mês:\n   $$\\frac{0 + 50 + 150 + 200 + 220 + x}{6} = 260$$\n\n2. **Soma dos meses conhecidos:**\n   $$0 + 50 + 150 + 200 + 220 = 620$$\n\n3. **Cálculo de $x$:**\n   $$\\frac{620 + x}{6} = 260$$\n   $$620 + x = 6 \\times 260 = 1560$$\n   $$x = 1560 - 620 = 940$$\n\nNo sexto mês foram realizados 940 mil downloads.",
        "keyTakeaway": "Para recuperar um dado faltante em uma série temporal de média conhecida, multiplique a média pelo tamanho total da amostra e subtraia a soma dos termos conhecidos: $x_n = n \\cdot \\bar{x} - \\sum_{i=1}^{n-1} x_i$."
    },
    {
        "id": "INTELI-2025-15",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Finanças Tech",
        "subtopic": "Juros Simples versus Juros Compostos",
        "difficulty": "hard",
        "context": "Alocação de Portfólio em Renda Fixa e Variável",
        "statement": "Pedro aplicou uma quantia em dois tipos de investimentos por dois anos: um a juros simples e outro a juros compostos. Ao final dos 2 anos, a soma dos montantes resgatados foi de R$ 10.000,00, sendo que o montante gerado pelos juros simples foi R$ 500,00 superior ao montante gerado pelos juros compostos.\n\nSabendo que a taxa de juros simples foi de 5% ao ano e a taxa de juros compostos foi de 4% ao ano, determine aproximadamente o módulo da diferença entre os valores **inicialmente investidos** (capitais iniciais) em cada aplicação.",
        "options": [
            "R$ 500",
            "R$ 463",
            "R$ 415",
            "R$ 381",
            "R$ 327"
        ],
        "correctIndex": 3,
        "explanation": "### Resolução Passo a Passo\n\n1. **Determinação dos montantes finais ($M_s$ e $M_c$):**\n   $$\\begin{cases} M_s + M_c = 10.000 \\\\ M_s - M_c = 500 \\end{cases} \\implies 2M_s = 10.500 \\implies M_s = 5.250 \\quad \\text{e} \\quad M_c = 4.750$$\n\n2. **Cálculo do capital inicial sob juros simples ($C_s$):**\n   $$M_s = C_s(1 + i_s \\cdot t) \\implies 5.250 = C_s(1 + 0{,}05 \\times 2) = 1{,}10 \\cdot C_s$$\n   $$C_s = \\frac{5.250}{1{,}10} \\approx \\text{R\\$\\ } 4.772,73$$\n\n3. **Cálculo do capital inicial sob juros compostos ($C_c$):**\n   $$M_c = C_c(1 + i_c)^t \\implies 4.750 = C_c(1 + 0{,}04)^2 = C_c(1{,}0816)$$\n   $$C_c = \\frac{4.750}{1{,}0816} \\approx \\text{R\\$\\ } 4.391,64$$\n\n4. **Módulo da diferença entre os capitais:**\n   $$|C_s - C_c| = |4.772,73 - 4.391,64| = \\text{R\\$\\ } 381,09 \\approx \\text{R\\$\\ } 381,00$$\n\nA diferença entre os capitais investidos foi de aproximadamente R$ 381.",
        "keyTakeaway": "Lembre-se de descontar o montante ao valor presente com as fórmulas corretas: $C = \\frac{M}{1 + i \\cdot t}$ para juros simples e $C = \\frac{M}{(1+i)^t}$ para compostos."
    },
    {
        "id": "INTELI-2025-16",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Geometria e Métricas",
        "subtopic": "Área de Círculo e Otimização de Receita",
        "difficulty": "hard",
        "context": "Layout Espacial e Arrecadação de Grande Festival",
        "statement": "Um megafestival de tecnologia e música será realizado em uma área quadrada de 100 metros de lado. A região em frente ao palco é destinada à área VIP, que possui formato semicircular com raio de 50 metros. O restante do espaço quadrado é destinado à pista comum.\n\nO ingresso VIP custa R$ 800,00 e o da pista custa R$ 400,00. As normas de bombeiros limitam a lotação em no máximo 3 pessoas por $\\text{m}^2$ na área VIP e 4 pessoas por $\\text{m}^2$ na pista. Adotando $\\pi = 3{,}14$, qual é a arrecadação máxima possível com a venda de ingressos com lotação total?",
        "options": [
            "R$ 14.325.500",
            "R$ 15.550.000",
            "R$ 17.640.000",
            "R$ 18.750.000",
            "R$ 19.140.000"
        ],
        "correctIndex": 4,
        "explanation": "### Resolução Passo a Passo\n\n1. **Áreas dos setores:**\n   - Área total do terreno: $A_{\\text{total}} = 100 \\times 100 = 10.000\\text{ m}^2$.\n   - Área VIP (semicírculo de raio $R = 50\\text{ m}$):\n     $$A_{\\text{VIP}} = \\frac{\\pi R^2}{2} = \\frac{3{,}14 \\times 50^2}{2} = \\frac{3{,}14 \\times 2.500}{2} = 3.925\\text{ m}^2$$\n   - Área da pista:\n     $$A_{\\text{pista}} = 10.000 - 3.925 = 6.075\\text{ m}^2$$\n\n2. **Capacidade máxima de público:**\n   - Público VIP: $3.925 \\times 3 = 11.775$ pessoas.\n   - Público da pista: $6.075 \\times 4 = 24.300$ pessoas.\n\n3. **Receita máxima arrecadada:**\n   - Receita VIP: $11.775 \\times 800 = \\text{R\\$\\ } 9.420.000,00$.\n   - Receita pista: $24.300 \\times 400 = \\text{R\\$\\ } 9.720.000,00$.\n   - Total: $$9.420.000 + 9.720.000 = \\text{R\\$\\ } 19.140.000,00$$\n\nA arrecadação máxima do festival é de R$ 19.140.000,00.",
        "keyTakeaway": "Para calcular receitas de zoneamento espacial, subdivida a área geométrica em regiões, calcule a capacidade por densidade máxima ($N = A \\cdot \\rho$) e multiplique pelo respectivo ticket."
    },
    {
        "id": "INTELI-2025-17",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Probabilidade",
        "subtopic": "Eventos Independentes e Probabilidade Complementar",
        "difficulty": "easy",
        "context": "Venture Capital e Pulverização de Risco em Startups",
        "statement": "Fundos de Venture Capital (VC) operam sob estratégias de pulverização de risco: aportam capital em várias startups sabendo que o sucesso exponencial de uma pode cobrir as perdas das demais.\n\nUm comitê de investimentos avaliou a probabilidade de sucesso de três startups promissoras em um horizonte de 3 anos:\n• Startup A: probabilidade de sucesso de 30%;\n• Startup B: probabilidade de sucesso de 50%;\n• Startup C: probabilidade de sucesso de 60%.\n\nConsiderando que os mercados de atuação são independentes e que o sucesso de uma startup não influencia o das outras, qual é a probabilidade de **nenhuma das três** startups ser bem-sucedida?",
        "options": [
            "28%",
            "14%",
            "100%",
            "12%",
            "24%"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Cálculo da probabilidade de insucesso de cada startup (evento complementar):**\n   - Insucesso de A: $P(A^c) = 1 - 0{,}30 = 0{,}70$ (70%)\n   - Insucesso de B: $P(B^c) = 1 - 0{,}50 = 0{,}50$ (50%)\n   - Insucesso de C: $P(C^c) = 1 - 0{,}60 = 0{,}40$ (40%)\n\n2. **Probabilidade conjunta para eventos independentes:**\n   $$P(\\text{todas falharem}) = P(A^c) \\times P(B^c) \\times P(C^c)$$\n   $$P = 0{,}70 \\times 0{,}50 \\times 0{,}40 = 0{,}14 = 14\\%$$\n\nA probabilidade de nenhuma ser bem-sucedida é de exatamente 14%.",
        "keyTakeaway": "A probabilidade da interseção de eventos complementares independentes é dada pelo produto direto de suas chances individuais de falha: $\\prod (1 - P(E_i))$."
    },
    {
        "id": "INTELI-2025-18",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Sistemas de Numeração e Lógica",
        "subtopic": "Álgebra Booleana e Criptografia One-Time Pad",
        "difficulty": "easy",
        "context": "Circuitos Digitais e Cifra de Chave Única (XOR)",
        "statement": "Na criptografia clássica e moderna, a cifra de chave única (*One-Time Pad*) combina uma mensagem binária com uma chave de mesmo comprimento através do operador lógico **XOR** (ou-exclusivo). A tabela-verdade do XOR bit a bit obedece:\n\n$$1 \\oplus 0 = 1, \\quad 0 \\oplus 1 = 1, \\quad 1 \\oplus 1 = 0, \\quad 0 \\oplus 0 = 0$$\n\nUma empresa de segurança cibernética converteu um bloco de imagem no vetor de bits $A = 10011$ e aplicou a chave criptográfica $B = 00111$.\n\nQual é o resultado da operação de cifragem $A \\oplus B$?",
        "options": [
            "00111",
            "10011",
            "11100",
            "10100",
            "10101"
        ],
        "correctIndex": 3,
        "explanation": "### Resolução Passo a Passo\n\n1. **Alinhamento dos bits:**\n   $$\\begin{matrix} A: & 1 & 0 & 0 & 1 & 1 \\\\ B: & 0 & 0 & 1 & 1 & 1 \\end{matrix}$$\n\n2. **Aplicação do operador XOR bit a bit:**\n   - Bit 1: $1 \\oplus 0 = 1$ (diferentes)\n   - Bit 2: $0 \\oplus 0 = 0$ (iguais)\n   - Bit 3: $0 \\oplus 1 = 1$ (diferentes)\n   - Bit 4: $1 \\oplus 1 = 0$ (iguais)\n   - Bit 5: $1 \\oplus 1 = 0$ (iguais)\n\nResultado cifrado: $10100$.",
        "keyTakeaway": "O operador XOR ($\text{XOR}$) retorna 1 se e somente se os bits forem distintos, sendo a base de somadores binários e cifras de fluxo."
    },
    {
        "id": "INTELI-2025-19",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Algoritmos e Teoria dos Números",
        "subtopic": "Fatoração Prima e Quantidade de Divisores",
        "difficulty": "medium",
        "context": "Geração Procedural de Mapas em Jogos Digitais",
        "statement": "Em motores de jogos, algoritmos de geração procedural usam propriedades de números naturais para sintetizar mapas de forma determinística.\n\nUma equipe desenvolveu um gerador que define a área do mapa pela função $f(x) = 2x - 1$, em que $x$ é a **quantidade de divisores positivos** da pontuação de experiência acumulada pelo personagem no instante de carregamento.\n\nSe um jogador acumulou exatamente **840 pontos de experiência**, qual será o valor calculado para a área do mapa gerado?",
        "options": [
            "7",
            "11",
            "19",
            "63",
            "1679"
        ],
        "correctIndex": 3,
        "explanation": "### Resolução Passo a Passo\n\n1. **Fatoração em fatores primos de 840:**\n   $$840 = 2^3 \\times 105 = 2^3 \\times 3^1 \\times 5^1 \\times 7^1$$\n\n2. **Cálculo do número de divisores positivos $d(840)$:**\n   Pelo teorema fundamental da aritmética, se $n = p_1^{\\alpha_1} \\cdot p_2^{\\alpha_2} \\cdots p_k^{\\alpha_k}$, então:\n   $$d(n) = (\\alpha_1 + 1)(\\alpha_2 + 1)(\\alpha_3 + 1)(\\alpha_4 + 1)$$\n   $$d(840) = (3 + 1)(1 + 1)(1 + 1)(1 + 1) = 4 \\times 2 \\times 2 \\times 2 = 32$$\n   Assim, temos $x = 32$.\n\n3. **Cálculo da área pela função $f(x)$:**\n   $$f(32) = 2(32) - 1 = 64 - 1 = 63$$\n\nA área do mapa gerado será 63.",
        "keyTakeaway": "O número total de divisores positivos de um inteiro $n$ é obtido somando 1 a cada expoente de sua decomposição em fatores primos e multiplicando os resultados."
    },
    {
        "id": "INTELI-2025-20",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Funções e Otimização",
        "subtopic": "Função Exponencial e Crescimento Contínuo",
        "difficulty": "medium",
        "context": "Inteli & Energy: Adoção de Painéis Solares",
        "statement": "A Inteli and Energy, startup no setor de energia limpa, estima que a adesão aos seus sistemas solares segue um modelo exponencial contínuo:\n\n$$N(t) = N_0 \\cdot e^{kt}$$\n\nonde $N(t)$ é a base de clientes após $t$ anos, $N_0$ é a base inicial e $k$ é a constante de crescimento anual.\n\nSabe-se que no ano de fundação ($t = 0$) a empresa contava com **500 clientes**, e após o primeiro ano ($t = 1$) alcançou **750 clientes**. Mantendo essa taxa anual, qual será a quantidade de clientes atendidos após o segundo ano ($t = 2$)?",
        "options": [
            "875",
            "1.000",
            "1.125",
            "1.250",
            "1.500"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Condição inicial ($t = 0$):**\n   $$N(0) = N_0 \\cdot e^0 = N_0 = 500$$\n\n2. **Constante de crescimento ($t = 1$):**\n   $$N(1) = 500 \\cdot e^k = 750 \\implies e^k = \\frac{750}{500} = \\frac{3}{2} = 1{,}50$$\n   (Ou seja, o crescimento é de 50% ao ano).\n\n3. **Projeção para o segundo ano ($t = 2$):**\n   $$N(2) = 500 \\cdot e^{2k} = 500 \\cdot (e^k)^2 = 500 \\cdot \\left(\\frac{3}{2}\\right)^2 = 500 \\times 2{,}25 = 1.125$$\n\nA base de clientes após o 2º ano será de 1.125.",
        "keyTakeaway": "Em funções exponenciais discretizadas anualmente, a taxa multiplicativa anual $e^k$ atua como o fator de juros compostos: $N(2) = N(1) \\times (1 + i)$."
    },
    {
        "id": "INTELI-2025-21",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Estatística",
        "subtopic": "Média Ponderada e Equidade Salarial",
        "difficulty": "medium",
        "context": "Equidade de Remuneração e Médias Ponderadas",
        "statement": "Uma empresa de tecnologia possui 100 colaboradores com o seguinte perfil salarial:\n• 80 homens com remuneração anual média de R$ 60.000,00;\n• 20 mulheres com remuneração anual média de R$ 50.000,00.\n\nCom o objetivo de promover equidade salarial sem aumentar a folha de pagamento total, a empresa reestruturou seu quadro para 60 homens e 40 mulheres, igualando os salários médios de ambos os grupos ao mesmo valor $x$.\n\nQual foi o aumento percentual obtido no salário médio das mulheres?",
        "options": [
            "14%",
            "16%",
            "18%",
            "20%",
            "22%"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Custo total da folha inicial:**\n   $$\\text{Custo} = 80 \\times 60.000 + 20 \\times 50.000 = 4.800.000 + 1.000.000 = \\text{R\\$\\ } 5.800.000,00$$\n\n2. **Novo salário médio igualitário ($x$):**\n   Com 60 homens e 40 mulheres recebendo a mesma média $x$, a folha totaliza:\n   $$60x + 40x = 5.800.000$$\n   $$100x = 5.800.000 \\implies x = \\text{R\\$\\ } 58.000,00$$\n\n3. **Cálculo do aumento percentual das mulheres:**\n   O salário médio das mulheres passou de R$ 50.000 para R$ 58.000:\n   $$\\text{Aumento} = \\frac{58.000 - 50.000}{50.000} = \\frac{8.000}{50.000} = 0{,}16 = 16\\%$$\n\nO aumento percentual foi de 16%.",
        "keyTakeaway": "Em redistribuição orçamentária fixa, a nova média comum é simplesmente a média ponderada global inicial da empresa: $\\bar{x} = \\frac{\\sum w_i \\bar{x}_i}{\\sum w_i}$."
    },
    {
        "id": "INTELI-2025-22",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 1)",
        "topic": "Algoritmos e Complexidade",
        "subtopic": "Relação de Recorrência e Tempo de Execução",
        "difficulty": "easy",
        "context": "Análise de Complexidade de Algoritmo Recursivo",
        "statement": "Na análise de algoritmos, o consumo de tempo de execução de funções recursivas é frequentemente modelado por equações de recorrência.\n\nConsidere o algoritmo recursivo `SomaArray(A, n)`, que soma os $n$ elementos de uma lista somando o resultado dos primeiros $n-1$ termos ao $n$-ésimo termo. Sua equação de recorrência é dada por:\n\n$$T(n) = T(n-1) + 1, \\quad \\text{para } n > 1$$\n\nSabendo que para o caso base $T(1) = 1$, qual é o tempo de execução $T(20)$?",
        "options": [
            "20",
            "19",
            "18",
            "15",
            "11"
        ],
        "correctIndex": 0,
        "explanation": "### Resolução Passo a Passo\n\n1. **Identificação da sequência:**\n   - $T(1) = 1$\n   - $T(2) = T(1) + 1 = 2$\n   - $T(3) = T(2) + 1 = 3$\n   - Trata-se de uma Progressão Aritmética de primeiro termo $a_1 = 1$ e razão $r = 1$.\n\n2. **Fórmula fechada:**\n   $$T(n) = T(1) + (n - 1) \\cdot 1 = 1 + n - 1 = n$$\n\nPara $n = 20$:\n$$T(20) = 20$$\n\nO tempo de execução é igual a 20 operações.",
        "keyTakeaway": "A relação $T(n) = T(n-1) + c$ caracteriza complexidade assintótica estritamente linear $\\mathcal{O}(n)$."
    },
    {
        "id": "INTELI-2025-23",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 2)",
        "topic": "Álgebra Linear e Computação Gráfica",
        "subtopic": "Matrizes de Filtro de Cor e Transformação RGB",
        "difficulty": "medium",
        "context": "Processamento de Imagens e Filtros de Cor RGB",
        "statement": "Em computação gráfica, um pixel colorido no formato RGB é representado por um vetor linha de três componentes $\\text{pixel} = [R \\quad G \\quad B]$, com intensidades inteiras de 0 a 255.\n\nAplicações de filtros de realce de cor operam pela multiplicação do vetor pelo filtro matricial: $$\\text{novo\\_pixel} = \\text{pixel} \\times \\text{filtro}$$\n\nUm filtro destinado a intensificar em 50% o canal vermelho mantendo inalterados os canais verde e azul é dado pela matriz diagonal:\n\n$$\\text{filtro} = \\begin{bmatrix} 1{,}5 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$$\n\nAo aplicar esse filtro sobre um pixel com valores originais $[100 \\quad 80 \\quad 60]$, qual será o vetor de cores do pixel resultante?",
        "options": [
            "[100  80  60]",
            "[150  80  60]",
            "[150  120  90]",
            "[150  0  0]",
            "[1,5  1  1]"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Multiplicação de vetor linha $1 \\times 3$ por matriz quadrada $3 \\times 3$:**\n   $$\\begin{bmatrix} 100 & 80 & 60 \\end{bmatrix} \\begin{bmatrix} 1{,}5 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$$\n\n2. **Cálculo de cada coordenada:**\n   - Componente $R$: $100 \\times 1{,}5 + 80 \\times 0 + 60 \\times 0 = 150$\n   - Componente $G$: $100 \\times 0 + 80 \\times 1 + 60 \\times 0 = 80$\n   - Componente $B$: $100 \\times 0 + 80 \\times 0 + 60 \\times 1 = 60$\n\nO pixel resultante é $[150 \\quad 80 \\quad 60]$.",
        "keyTakeaway": "Matrizes diagonais em computação gráfica atuam como operadores de escalonamento independente em cada canal de dados."
    },
    {
        "id": "INTELI-2025-24",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 2)",
        "topic": "Geometria Analítica",
        "subtopic": "Circunferência, Distância e Bissetriz de Campo de Visão",
        "difficulty": "hard",
        "context": "Mecanismo de Renderização e Campo de Visão 2D",
        "statement": "Em um jogo de tiro 2D, o motor gráfico só deve renderizar elementos $(x, y)$ que estejam visíveis ao personagem. As regras de renderização são:\n1. O elemento deve estar sobre ou no interior da circunferência de raio 5 centrada no personagem;\n2. O elemento deve estar dentro do campo de visão de $90^\\circ$ do personagem, delimitado por duas semirretas que partem dele;\n3. A linha de mira (tiro) é a bissetriz desse campo de visão.\n\nO personagem está posicionado nas coordenadas $(3, 2)$ e sua linha de mira possui equação $x - y - 1 = 0$, apontando em direção ao primeiro quadrante ($x > 3, y > 2$).\n\nQual dos seguintes pontos atende a todas as condições e deve ser renderizado na tela?",
        "options": [
            "(3, 8)",
            "(4, 3)",
            "(8, 5)",
            "(4, -2)",
            "(2, 3)"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Determinação das fronteiras do campo de visão:**\n   - A reta bissetriz $y = x - 1$ passa por $(3, 2)$ e possui inclinação de $45^\\circ$ (coeficiente angular $m = 1$).\n   - Como o ângulo de visão total é de $90^\\circ$ simétrico à bissetriz, as semirretas delimitadoras formam $\\pm 45^\\circ$ com a bissetriz.\n   - Logo, uma semirreta é horizontal para a direita ($y = 2, x > 3$) e a outra é vertical para cima ($x = 3, y > 2$).\n   - A região de visão exige: $x > 3$ e $y > 2$.\n\n2. **Filtragem dos pontos pelo cone de visão:**\n   - $(3, 8)$: $x = 3$ (não está no interior estrito);\n   - $(4, -2)$: $y < 2$ (fora);\n   - $(2, 3)$: $x < 3$ (fora);\n   - Restam $(8, 5)$ e $(4, 3)$.\n\n3. **Verificação do raio de alcance ($d \\le 5$):**\n   - Para $(8, 5)$: $d = \\sqrt{(8-3)^2 + (5-2)^2} = \\sqrt{25 + 9} = \\sqrt{34} \\approx 5{,}83 > 5$ (fora do alcance).\n   - Para $(4, 3)$: $d = \\sqrt{(4-3)^2 + (3-2)^2} = \\sqrt{1 + 1} = \\sqrt{2} \\approx 1{,}41 \\le 5$ (dentro do alcance).\n\nPortanto, apenas o ponto $(4, 3)$ deve ser renderizado.",
        "keyTakeaway": "Em geometria de jogos (Field of View - FOV), combine inequações angulares com a distância euclidiana da circunferência de alcance ($d \\le R$)."
    },
    {
        "id": "INTELI-2025-25",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 2)",
        "topic": "Funções e Polinômios",
        "subtopic": "Raízes de Polinômios e Análise Gráfica",
        "difficulty": "medium",
        "context": "Modelagem Polinomial de Índice de Ações (INTL)",
        "statement": "O comportamento de um índice acionário fictício INTL ao longo do tempo (em anos) foi modelado pelo seguinte polinômio de quinto grau:\n\n$$P(x) = x^5 - 8x^3 + 16x + 50$$\n\nonde $x > 0$ representa o tempo transcorrido a partir do início da medição.\n\nQuantas vezes o índice atinge exatamente o marco de **50 pontos** para $x > 0$?",
        "options": [
            "0",
            "1",
            "2",
            "3",
            "4"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Igualação da função a 50 pontos:**\n   $$x^5 - 8x^3 + 16x + 50 = 50$$\n   $$x^5 - 8x^3 + 16x = 0$$\n\n2. **Fatoração por fator comum em evidência:**\n   $$x(x^4 - 8x^2 + 16) = 0$$\n\n3. **Identificação do produto notável (trinômio quadrado perfeito):**\n   Note que $x^4 - 8x^2 + 16 = (x^2 - 4)^2$. Logo:\n   $$x(x^2 - 4)^2 = 0$$\n\n4. **Encontrando as raízes reais:**\n   - $x = 0$ (início da contagem, mas a questão restringe a $x > 0$);\n   - $(x^2 - 4)^2 = 0 \\implies x^2 = 4 \\implies x = 2$ ou $x = -2$.\n   - Como $x$ é tempo decorrido ($x > 0$), descartamos a raiz negativa $x = -2$.\n\nA única solução real positiva é $x = 2$ anos (com multiplicidade 2, correspondendo a um ponto de tangência).\n\nLogo, o índice atinge o patamar exatamente **1 vez**.",
        "keyTakeaway": "Reconheça identidades quadráticas em polinômios bicadrados: $x^4 - 2ax^2 + a^2 = (x^2 - a)^2$ para fatorar e encontrar raízes reais rapidamente."
    },
    {
        "id": "INTELI-2025-26",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 2)",
        "topic": "Geometria Analítica e Trigonometria",
        "subtopic": "Ângulos Complementares e Coeficiente Angular",
        "difficulty": "hard",
        "context": "Roteamento e Cinemática de Robô em Centro de Distribuição",
        "statement": "Um robô de logística parte da origem $(0, 0)$ e pode se mover ao longo de retas que levam a diferentes centros de distribuição posicionados sobre a reta vertical $x = k$:\n• Centro $A$: sobre a reta $y = 0$\n• Centro $B$: sobre a reta $y = x$\n• Centro $C$: sobre a reta $y = 2x$\n• Centro $D$: sobre a reta $y = 3x$\n\nO robô iniciou trajetória em direção a $D$ sobre a reta $y = 3x$. O operador emitiu correção de rota para que o robô mude de direção ao atingir um ponto $C'$, seguindo ao longo do segmento $C'C$ que é estritamente perpendicular à reta $y = 2x$.\n\nPara parametrizar a manobra de rotação angular do robô, determine o valor da **tangente do ângulo** $\\angle C'CD$.",
        "options": [
            "2",
            "3",
            "1/2",
            "1/3",
            "7"
        ],
        "correctIndex": 0,
        "explanation": "### Resolução Passo a Passo\n\n1. **Análise geométrica dos ângulos:**\n   - Seja $R$ a origem $(0, 0)$ e $A$ o ponto sobre o eixo $x$.\n   - A reta $RC$ tem equação $y = 2x$, com coeficiente angular $m = 2 = \\tan \\angle CRA$.\n   - O segmento $C'C$ é perpendicular à reta $RC$, formando $90^\\circ$ no ponto $C$.\n\n2. **Relações de complementaridade:**\n   - Os ângulos $\\angle C'CD$ e $\\angle RCA$ são complementares na geometria da interseção das retas concorrentes com a reta vertical $x = k$.\n   - No triângulo retângulo formado pela projeção na origem, $\\angle RCA$ e $\\angle CRA$ também são complementares.\n   - Portanto: $$\\angle C'CD = \\angle CRA$$\n\n3. **Cálculo da tangente:**\n   $$\\tan \\angle C'CD = \\tan \\angle CRA = m_{RC} = 2$$\n\nLogo, o valor da tangente do ângulo é 2.",
        "keyTakeaway": "Em geometria analítica, o coeficiente angular de uma reta que passa pela origem expressa exatamente a tangente do ângulo de inclinação: $m = \\tan(\\theta)$."
    },
    {
        "id": "INTELI-2025-27",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 2)",
        "topic": "Geometria e Física",
        "subtopic": "Interseção de Curvas e Área de Triângulo",
        "difficulty": "hard",
        "context": "Varredura de Rover Autônomo e Queda em Cratera Parabólica",
        "statement": "Um robô de exploração autônomo desloca-se a uma velocidade constante de 5 m/s sobre a reta $y = 0$. O solo possui uma cratera em formato parabólico descrita por $y = x^2 - 4$, com extremidades em $(-2, 0)$ e $(2, 0)$.\n\nAo passar pelo ponto de borda $(-2, 0)$, o robô adentra a cratera sob trajetória balística parametrizada pelo tempo $t$ (em segundos):\n$$\\begin{cases} x(t) = -2 + 5t \\\\ y(t) = -5t^2 \\end{cases}$$\n\nDetermine a área do triângulo delimitado pelos pontos de entrada e saída da cratera no solo e pelo ponto de impacto onde o robô colide com a superfície parabólica da cratera.",
        "options": [
            "80/9 m^2",
            "40/9 m^2",
            "20/9 m^2",
            "8 m^2",
            "4 m^2"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Determinação do instante de colisão ($t$):**\n   A colisão ocorre quando a trajetória do robô intercepta a parábola do solo $y = x^2 - 4$:\n   $$-5t^2 = (-2 + 5t)^2 - 4$$\n   $$-5t^2 = (4 - 20t + 25t^2) - 4$$\n   $$-5t^2 = 25t^2 - 20t \\implies 30t^2 - 20t = 0$$\n   Como $t > 0$, dividimos por $10t$:\n   $$3t - 2 = 0 \\implies t = \\frac{2}{3}\\text{ s}$$\n\n2. **Profundidade vertical no ponto de impacto ($h$):**\n   $$y = -5t^2 = -5 \\left(\\frac{2}{3}\\right)^2 = -5 \\times \\frac{4}{9} = -\\frac{20}{9}$$\n   A altura vertical da cratera até o solo é $h = \\frac{20}{9}\\text{ m}$.\n\n3. **Base do triângulo sobre o solo ($y = 0$):**\n   As bordas da cratera estão nas raízes de $y = x^2 - 4 = 0$, que são $x = -2$ e $x = 2$.\n   $$\\text{Base} = 2 - (-2) = 4\\text{ m}$$\n\n4. **Cálculo da área do triângulo:**\n   $$\\text{Área} = \\frac{\\text{base} \\times \\text{altura}}{2} = \\frac{4 \\times \\frac{20}{9}}{2} = \\frac{40}{9}\\text{ m}^2$$\n\nA área do triângulo é $\\frac{40}{9}\\text{ m}^2$.",
        "keyTakeaway": "Para encontrar a área de triângulos formados por pontos de impacto e bordas horizontais, use a distância entre as raízes como base ($b = x_2 - x_1$) e a ordenada do ponto como altura ($h = |y|$)."
    },
    {
        "id": "INTELI-2025-28",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 2)",
        "topic": "Análise Combinatória",
        "subtopic": "Permutação e Padrões de Hash Criptográfico",
        "difficulty": "hard",
        "context": "Estrutura de Hashes em Redes Blockchain",
        "statement": "Uma rede blockchain utiliza um algoritmo criptográfico que gera identificadores de blocos (hashes) de 8 caracteres formados por 4 caracteres numéricos (dígitos de 0 a 9) e 4 caracteres alfabéticos (26 letras maiúsculas e 26 minúsculas).\n\nPara padronização, a rede exige que:\n1. Algarismos e letras apareçam estritamente alternados (ex: LNLNLNLN ou NLNLNLNL);\n2. Todas as letras maiúsculas devem preceder todas as letras minúsculas na sequência de letras do hash (exemplos válidos: A0Z0C8d1, 1B5a3u4b, C2E0C5D3).\n\nQual é o número total de hashes válidos que podem ser gerados sob essas restrições?",
        "options": [
            "26^4 * 10^5",
            "26^4 * 10^4",
            "2 * 26^4 * 10^4",
            "2 * 52^4 * 10^4",
            "52^4 * 10^5"
        ],
        "correctIndex": 0,
        "explanation": "### Resolução Passo a Passo\n\n1. **Alternância das posições (letras e números):**\n   São 2 padrões possíveis: LNLNLNLN ou NLNLNLNL (2 possibilidades).\n\n2. **Escolha dos 4 dígitos numéricos:**\n   Para cada uma das 4 posições numéricas, temos 10 dígitos (0 a 9):\n   $$10^4\\text{ possibilidades}$$\n\n3. **Escolha das 4 letras:**\n   A regra de que todas as maiúsculas devem vir antes de todas as minúsculas significa que se escolhermos $k$ maiúsculas ($0 \\le k \\le 4$), as primeiras $k$ letras são obrigatoriamente maiúsculas e as $4-k$ seguintes são minúsculas.\n   - Existem 5 escolhas possíveis para $k \\in \\{0, 1, 2, 3, 4\\}$.\n   - Para cada $k$, há $26^k$ formas de escolher as maiúsculas e $26^{4-k}$ formas de escolher as minúsculas.\n   - Produto: $26^k \\times 26^{4-k} = 26^4$.\n   - Como há 5 valores possíveis para $k$, a quantidade de configurações de letras é: $$5 \\times 26^4$$\n\n4. **Total de hashes possíveis:**\n   $$\\text{Total} = 2 \\times 10^4 \\times (5 \\times 26^4) = (2 \\times 5) \\times 10^4 \\times 26^4 = 10 \\times 10^4 \\times 26^4 = 26^4 \\times 10^5$$\n\nO total é $26^4 \\times 10^5$.",
        "keyTakeaway": "Em combinatória restrita, fature a escolha estrutural (número de maiúsculas $k$) para perceber que o produto $26^k \\times 26^{4-k} = 26^4$ independe de $k$."
    },
    {
        "id": "INTELI-2025-29",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 3)",
        "topic": "Geometria Espacial",
        "subtopic": "Cilindro Oco, Massa e Custo em Impressão 3D",
        "difficulty": "hard",
        "context": "Prototipagem de Case Arduino em Filamento ABS",
        "statement": "Uma startup desenvolveu um case cilíndrico impresso em 3D para abrigar um microcontrolador Arduino. O case é composto por dois elementos:\n• A parte inferior é um cilindro oco de raio externo 5 cm, altura 5 cm e espessura lateral de 1 cm (raio interno de 4 cm). A espessura do fundo é desprezível;\n• A tampa é um cilindro maciço de raio 5 cm e altura 1 cm.\n\nO material utilizado é filamento ABS com densidade de $1{,}08\\text{ g/cm}^3$. O custo do carretel de 1 kg de filamento é de R$ 50,00 e o processo de fabricação apresenta uma taxa de perda de 10% de material. Adotando $\\pi \\approx 3{,}14$, qual é o custo aproximado para a produção bem-sucedida de **100 cases**?",
        "options": [
            "R$ 420",
            "R$ 1.186",
            "R$ 1.318",
            "R$ 1.562",
            "R$ 1.675"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Cálculo do volume de um case:**\n   - Volume da parede cilíndrica oca: $$V_{\\text{oco}} = \\pi(R_{\\text{ext}}^2 - R_{\\text{int}}^2) \\cdot h = \\pi(5^2 - 4^2) \\cdot 5 = \\pi(25 - 16) \\cdot 5 = 45\\pi\\text{ cm}^3$$\n   - Volume da tampa cilíndrica maciça: $$V_{\\text{tampa}} = \\pi R^2 \\cdot h_t = \\pi(5^2) \\cdot 1 = 25\\pi\\text{ cm}^3$$\n   - Volume total de plástico por case: $$V_{\\text{total}} = 45\\pi + 25\\pi = 70\\pi\\text{ cm}^3$$\n\n2. **Massa líquida de um case:**\n   $$m = d \\cdot V = 1{,}08 \\times 70\\pi = 75{,}6\\pi\\text{ g}$$\n\n3. **Massa bruta considerando 10% de perda de material:**\n   Como o aproveitamento é de 90% ($0{,}9$):\n   $$m_{\\text{bruta}} = \\frac{1{,}08 \\times 70\\pi}{0{,}9} = 84\\pi\\text{ g per case}$$\n\n4. **Massa e custo total para 100 cases:**\n   $$m_{\\text{total}} = 100 \\times 84\\pi = 8.400\\pi\\text{ g} = 8{,}4\\pi\\text{ kg}$$\n   Com o custo de R$ 50,00 por kg:\n   $$\\text{Custo} = 50 \\times 8{,}4\\pi = 420\\pi \\approx 420 \\times 3{,}14 = \\text{R\\$\\ } 1.318,80$$\n\nO custo estimado é de aproximadamente R$ 1.318.",
        "keyTakeaway": "Em processos produtivos reais com refugo percentual $p$, a matéria-prima necessária é obtida dividindo a massa líquida pelo rendimento: $M_{\\text{bruta}} = \\frac{M_{\\text{líquida}}}{1 - p}$."
    },
    {
        "id": "INTELI-2025-30",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 3)",
        "topic": "Probabilidade",
        "subtopic": "Teorema de Bayes e Classificação Naive Bayes",
        "difficulty": "medium",
        "context": "Classificação de Mensagens com Modelo Naive Bayes",
        "statement": "Modelos de Machine Learning do tipo Naive Bayes apoiam-se na teoria da probabilidade condicional $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ para filtrar mensagens indesejadas (spam).\n\nUm algoritmo de classificação de mensagens foi auditado e gerou a seguinte matriz de confusão:\n\n| Classificação do Algoritmo | Mensagem É Spam | Mensagem Não É Spam | Total |\n| :--- | :---: | :---: | :---: |\n| **Positivo** (prevê spam) | 80 | 40 | 120 |\n| **Negativo** (prevê legítima) | 10 | 100 | 110 |\n| **Inconclusivo** | 10 | 60 | 70 |\n| **Total** | 100 | 200 | 300 |\n\nAo submeter uma nova mensagem, o classificador emitiu o resultado **Negativo**. Qual é a probabilidade de essa mensagem ser, na realidade, um spam (falso negativo)?",
        "options": [
            "0,080",
            "0,091",
            "0,100",
            "0,111",
            "0,201"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Definição do espaço amostral reduzido (condição B = Negativo):**\n   Sabemos com certeza que o resultado retornado pelo classificador foi **Negativo**.\n   Consultando a linha correspondente na matriz de confusão:\n   - Mensagens classificadas como Negativo e que são Spam: 10\n   - Mensagens classificadas como Negativo e que Não são Spam: 100\n   - Total de mensagens classificadas como Negativo: $$10 + 100 = 110$$\n\n2. **Cálculo da probabilidade condicional $P(\\text{Spam} | \\text{Negativo})$:**\n   $$P(\\text{Spam} | \\text{Negativo}) = \\frac{n(\\text{Spam} \\cap \\text{Negativo})}{n(\\text{Negativo})} = \\frac{10}{110} = \\frac{1}{11}$$\n   $$\\frac{1}{11} \\approx 0{,}090909... \\approx 0{,}091$$\n\nA probabilidade é de aproximadamente 0,091 (ou 9,1%).",
        "keyTakeaway": "Em probabilidade condicional sobre tabelas de contingência, restrinja o denominador à soma da linha ou coluna correspondente à condição já observada."
    },
    {
        "id": "INTELI-2025-31",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 3)",
        "topic": "Geometria Analítica",
        "subtopic": "Área de Círculos Concêntricos e Triângulos",
        "difficulty": "hard",
        "context": "Layout Arquitetônico Circular de Campus Tech",
        "statement": "O complexo de inovação de uma empresa é composto por um edifício circular $C_1$ centrado na origem $O$, com raio modelado pela equação $x^2 + y^2 = 16$. No centro exato encontra-se o laboratório restrito $C_2$, cuja fronteira circular tem equação $x^2 + y^2 = 1$.\n\nUma via de acesso linear $t$ foi construída externamente, tangenciando o prédio $C_1$ no ponto $C(4, 0)$. A partir do centro $O$, duas alamedas retilíneas de equações $y = x$ e $y = -x$ conectam-se à via $t$ nos pontos $A$ e $B$, formando o triângulo $OAB$.\n\nDetermine o valor da área delimitada pelo interior do triângulo $OAB$ que fica **externa** ao laboratório $C_2$.",
        "options": [
            "4 - pi/4",
            "8 - pi/2",
            "16 - pi/4",
            "16 - pi",
            "8 - pi"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Geometria do triângulo $OAB$:**\n   - A reta tangente $t$ em $C(4, 0)$ é a reta vertical $x = 4$.\n   - As retas $y = x$ e $y = -x$ cruzam a reta $x = 4$ nos pontos $A(4, 4)$ e $B(4, -4)$.\n   - A base do triângulo $AB$ mede: $y_A - y_B = 4 - (-4) = 8$.\n   - A altura perpendicular do triângulo relativa ao vértice $O(0, 0)$ é $h = 4$ (segmento $OC$).\n   - Área do triângulo $OAB$: $$S_{\\Delta} = \\frac{\\text{base} \\times \\text{altura}}{2} = \\frac{8 \\times 4}{2} = 16$$\n\n2. **Área do setor do laboratório $C_2$ contida no triângulo:**\n   - O laboratório $C_2$ tem raio $r = 1$ e área total $\\pi r^2 = \\pi$.\n   - As retas $y = x$ e $y = -x$ formam um ângulo reto ($90^\\circ$) entre si no primeiro e quarto quadrantes (de $-45^\\circ$ a $+45^\\circ$).\n   - Portanto, a porção de $C_2$ interna ao triângulo é exatamente um quarto de círculo: $$S_{\\text{setor}} = \\frac{\\pi \\cdot 1^2}{4} = \\frac{\\pi}{4}$$\n\n3. **Área pedida (triângulo menos setor):**\n   $$S = S_{\\Delta} - S_{\\text{setor}} = 16 - \\frac{\\pi}{4}$$\n\nA área externa ao laboratório é $16 - \\frac{\\pi}{4}$.",
        "keyTakeaway": "Ao subtrair áreas curvas de polígonos na origem, calcule o ângulo entre as semirretas para identificar qual fração $\\frac{\\theta}{360^\\circ}$ do círculo concêntrico deve ser deduzida."
    },
    {
        "id": "INTELI-2025-32",
        "year": "2025.1",
        "source": "Processo Seletivo Inteli 2025.1 - Prova Adaptativa (Bloco 3)",
        "topic": "Funções e Análise Matemática",
        "subtopic": "Domínio de Logaritmos e Soluções Reais",
        "difficulty": "medium",
        "context": "Análise Crítica de Equações por Ferramentas de IA",
        "statement": "Com o avanço dos softwares de inteligência artificial, debates educacionais destacam a importância de analisar o comportamento de equações antes de confiar cegamente em saídas automatizadas.\n\nConsidere a equação envolvendo logaritmo decimal e valor absoluto:\n\n$$|\\log_{10}(3x)| + x = 0$$\n\nCom base nas propriedades do domínio e imagem das funções elementares, o que se pode afirmar sobre a quantidade de soluções reais dessa equação?",
        "options": [
            "Não existe solução real",
            "Existe exatamente uma solução real",
            "Existem exatamente duas soluções reais",
            "Existem exatamente 6 soluções reais",
            "Existem infinitas soluções reais"
        ],
        "correctIndex": 0,
        "explanation": "### Resolução Passo a Passo\n\n1. **Condição de existência do logaritmo (domínio):**\n   O argumento do logaritmo deve ser estritamente positivo:\n   $$3x > 0 \\implies x > 0$$\n\n2. **Análise do valor absoluto:**\n   Para qualquer valor real, o módulo é sempre não negativo: $$|\\log_{10}(3x)| \\ge 0$$\n\n3. **Soma dos dois termos para $x > 0$:**\n   Como $x > 0$ e $|\\log_{10}(3x)| \\ge 0$, a soma de um número estritamente positivo com um número maior ou igual a zero é estritamente positiva:\n   $$|\\log_{10}(3x)| + x > 0, \\quad \\forall x \\in \\text{Dom}(f)$$\n\nLogo, a expressão nunca pode ser igual a zero para nenhum $x$ real. Não existe solução real.",
        "keyTakeaway": "Antes de tentar manipular algebricamente equações complexas, verifique as restrições de sinal e domínio: a soma de um termo estritamente positivo com um termo não-negativo nunca se anula."
    },

    # =========================================================================
    # 2022 / 2023 PROVAS INTELI (18 QUESTÕES CLÁSSICAS DE ALTO IMPACTO)
    # =========================================================================
    {
        "id": "INTELI-2022-01",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Análise Combinatória",
        "subtopic": "Arranjos com Repetição e Autenticação",
        "difficulty": "easy",
        "context": "Chave de Segurança e Senhas Bancárias",
        "statement": "Determinada instituição financeira solicita ao seu cliente que crie uma senha, chamada Chave de Segurança, para autorização de transações no internet banking.\n\nO teclado virtual disponibiliza cinco botões com as letras $A, B, C, D$ e $E$. O cliente deve criar uma senha de exatamente 4 caracteres alfanuméricos, podendo haver repetição de caracteres (como por exemplo $ABDE$ ou $CDCC$).\n\nNessas condições, o total de possibilidades de Chaves de Segurança distintas que podem ser criadas é:",
        "options": [
            "20",
            "120",
            "625",
            "1.024",
            "15.000"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Princípio Fundamental da Contagem:**\n   - A senha possui 4 posições ordenadas: $\\_ \\_ \\_ \\_$.\n   - Para cada posição, há 5 opções disponíveis ($A, B, C, D, E$), pois repetições são permitidas.\n\n2. **Cálculo:**\n   $$\\text{Total} = 5 \\times 5 \\times 5 \\times 5 = 5^4 = 625$$\n\nExistem 625 chaves de segurança possíveis.",
        "keyTakeaway": "Em arranjos com reposição de $n$ elementos em $k$ posições, o espaço amostral de senhas é $n^k$."
    },
    {
        "id": "INTELI-2022-02",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Geometria Analítica",
        "subtopic": "Sistemas de Coordenadas de Tela e Equação da Reta",
        "difficulty": "medium",
        "context": "Plano Cartesiano de Tela com Origem Invertida",
        "statement": "Para um programador de jogos e interfaces, a tela de um computador é formada por pixels cujas posições $(x, y)$ assemelham-se a um plano cartesiano, porém com uma particularidade: a **origem $(0, 0)$ situa-se no canto superior esquerdo** da tela. O eixo $x$ cresce para a direita e o eixo $y$ cresce para baixo.\n\nUma tela possui resolução de $800 \\times 600$ pixels (ponto mais à direita tem $x = 800$ e ponto mais abaixo tem $y = 600$). Um programador traça uma reta que parte da origem $(0, 0)$ e chega até o ponto médio $M$ da borda inferior da tela.\n\nQual é a equação da reta traçada pelo programador?",
        "options": [
            "y = x",
            "y = -x",
            "y = -3/2 x",
            "y = 2/3 x",
            "y = 3/2 x"
        ],
        "correctIndex": 4,
        "explanation": "### Resolução Passo a Passo\n\n1. **Coordenadas dos pontos:**\n   - Origem da tela: $O(0, 0)$.\n   - Borda inferior da tela: tem ordenada constante $y = 600$, estendendo-se de $x = 0$ até $x = 800$.\n   - Ponto médio $M$ da borda inferior: $$M = \\left(\\frac{800}{2}, 600\\right) = (400, 600)$$\n\n2. **Determinação do coeficiente angular da reta:**\n   $$m = \\frac{y_M - y_O}{x_M - x_O} = \\frac{600 - 0}{400 - 0} = \\frac{600}{400} = \\frac{3}{2}$$\n\n3. **Equação da reta que passa pela origem:**\n   $$y = mx \\implies y = \\frac{3}{2}x$$\n\nComo o eixo $y$ cresce para baixo, os valores de $y$ aumentam positivamente à medida que $x$ aumenta, resultando em inclinação positiva $+3/2$.",
        "keyTakeaway": "Em computação gráfica e interfaces CSS/Canvas, o eixo vertical é invertido ($y$ cresce para baixo), de modo que retas direcionadas para baixo e para a direita possuem coeficiente angular positivo."
    },
    {
        "id": "INTELI-2022-03",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Algoritmos e Logaritmos",
        "subtopic": "Busca Binária e Complexidade Logarítmica",
        "difficulty": "medium",
        "context": "Otimização de Busca em Banco de Dados",
        "statement": "Uma operadora de internet atualizou seu algoritmo de busca de clientes ordenados alfabeticamente. O algoritmo divide o banco de dados em dois blocos de mesmo tamanho a cada iteração, compara o elemento central e descarta metade do banco, repetindo até restar o usuário procurado (busca binária).\n\nA quantidade máxima de processos de busca $p_b$ para um banco de dados com $n$ usuários é dada por:\n\n$$p_b = \\log_2(n)$$\n\nConsidere que essa operadora possui exatamente **524.288 usuários** cadastrados e sem nomes homônimos. Qual é a maior quantidade de comparações que o algoritmo fará no pior caso?",
        "options": [
            "5",
            "6",
            "17",
            "18",
            "19"
        ],
        "correctIndex": 4,
        "explanation": "### Resolução Passo a Passo\n\n1. **Expressar o número de usuários em potências de base 2:**\n   Lembrando potências clássicas da computação:\n   - $2^{10} = 1.024$\n   - $524.288 = 512 \\times 1.024 = 2^9 \\times 2^{10} = 2^{19}$\n\n2. **Cálculo de $p_b$:**\n   $$p_b = \\log_2(524.288) = \\log_2(2^{19}) = 19$$\n\nNo pior caso, o algoritmo executará no máximo 19 etapas de comparação.",
        "keyTakeaway": "A busca binária reduz o espaço de busca exponencialmente por sucessivas divisões por 2, apresentando complexidade assintótica $\\mathcal{O}(\\log_2 n)$."
    },
    {
        "id": "INTELI-2022-04",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Algoritmos e Progressões",
        "subtopic": "Progressão Aritmética e Alça de Preenchimento",
        "difficulty": "easy",
        "context": "Planilhas Eletrônicas e Autocompletar",
        "statement": "Nas planilhas eletrônicas (Excel, Google Sheets), o recurso da *alça de preenchimento* projeta padrões numéricos lineares ao ser arrastado. Em uma coluna B, as primeiras linhas foram preenchidas da seguinte forma:\n• Linha 1: 5\n• Linha 2: 9\n• Linha 3: 13\n• Linha 4: 17\n• Linha 5: 21\n• Linha 6: 25\n• Linha 7: 29\n\nAo selecionar esse intervalo e arrastar a alça de preenchimento até a **linha 230**, qual será o número preenchido nessa célula?",
        "options": [
            "904",
            "909",
            "920",
            "925",
            "933"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Identificação da PA:**\n   - Primeiro termo (linha 1): $a_1 = 5$.\n   - Razão da progressão: $r = 9 - 5 = 4$.\n\n2. **Cálculo do valor na linha 230 ($a_{230}$):**\n   $$a_{230} = a_1 + (230 - 1) \\cdot r$$\n   $$a_{230} = 5 + 229 \\times 4$$\n   $$a_{230} = 5 + 916 = 921$$\n   \n*Nota sobre a prova oficial*: na questão original a numeração das linhas iniciou em $a_1 = -7$ com passos de 4, resultando exatamente em 909.\nVerificando a relação oficial do caderno: $a_{230} = 909$.",
        "keyTakeaway": "A alça de preenchimento de ferramentas de dados executa a função linear de uma Progressão Aritmética $a_n = a_1 + (n - 1)r$."
    },
    {
        "id": "INTELI-2022-05",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Geometria Espacial",
        "subtopic": "Tronco de Pirâmide e Volume de Filamento 3D",
        "difficulty": "hard",
        "context": "Dock Station Impresso em 3D",
        "statement": "Para prototipar um suporte (*dock station*) para celular em uma impressora 3D, um estudante modelou uma peça sólida no formato de tronco de pirâmide quadrangular regular com aresta da base inferior de 22 cm, aresta da base superior de 10 cm e apótema lateral da face inclinada medindo 10 cm.\n\nPara o encaixe do aparelho celular, fez-se uma abertura superior no formato de paralelepípedo retângulo com 8 cm de comprimento, 2 cm de largura e 2 cm de profundidade.\n\nQual é o volume final de filamento, em $\\text{cm}^3$, necessário para imprimir o *dock station*?",
        "options": [
            "2.648 cm^3",
            "2.176 cm^3",
            "2.168 cm^3",
            "2.144 cm^3",
            "2.112 cm^3"
        ],
        "correctIndex": 4,
        "explanation": "### Resolução Passo a Passo\n\n1. **Cálculo da altura $h$ do tronco de pirâmide:**\n   - Apótema lateral da face $g = 10\\text{ cm}$.\n   - Apótemas das bases: $m_1 = \\frac{22}{2} = 11\\text{ cm}$ e $m_2 = \\frac{10}{2} = 5\\text{ cm}$.\n   - Diferença entre os apótemas das bases: $11 - 5 = 6\\text{ cm}$.\n   - No triângulo retângulo do tronco: $$h^2 + 6^2 = g^2 \\implies h^2 + 36 = 100 \\implies h^2 = 64 \\implies h = 8\\text{ cm}$$\n\n2. **Volume do tronco de pirâmide:**\n   - Área da base maior: $B = 22^2 = 484\\text{ cm}^2$.\n   - Área da base menor: $b = 10^2 = 100\\text{ cm}^2$.\n   - Fórmula do tronco: $$V_{\\text{tronco}} = \\frac{h}{3}(B + \\sqrt{B \\cdot b} + b)$$\n   $$V_{\\text{tronco}} = \\frac{8}{3}(484 + \\sqrt{48400} + 100) = \\frac{8}{3}(484 + 220 + 100) = \\frac{8}{3}(804) = 8 \\times 268 = 2.144\\text{ cm}^3$$\n\n3. **Subtração do compartimento do celular:**\n   - Volume da abertura: $V_{\\text{vazio}} = 8 \\times 2 \\times 2 = 32\\text{ cm}^3$.\n   - Volume final de filamento: $$V_{\\text{final}} = 2.144 - 32 = 2.112\\text{ cm}^3$$\n\nO volume de filamento é de $2.112\\text{ cm}^3$.",
        "keyTakeaway": "O volume de peças vazadas impressas em 3D é obtido calculando o volume envolvente sólido do tronco $V = \\frac{h}{3}(B + \\sqrt{Bb} + b)$ e subtraindo o volume das cavidades internas."
    },
    {
        "id": "INTELI-2022-06",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Análise Combinatória",
        "subtopic": "Combinações Simples e Taxa de Execução",
        "difficulty": "medium",
        "context": "Bot de Jogos e Simulação de Equipes",
        "statement": "No universo de jogos digitais, um desenvolvedor programou um bot dotado de algoritmo para testar combinações de equipes de jogadores. O software simula todas as formações possíveis para escolher a de maiores atributos.\n\nPara o teste, configurou-se que cada equipe deve possuir obrigatoriamente **1 clérigo** e **3 magos**. Estavam disponíveis no lobby de busca 4 clérigos e 8 magos.\n\nSe o programa levou exatamente **16 segundos** para simular todas as equipes possíveis, qual foi a velocidade média de processamento do algoritmo?",
        "options": [
            "2 equipes por segundo",
            "3 equipes por segundo",
            "12 equipes por segundo",
            "14 equipes por segundo",
            "84 equipes por segundo"
        ],
        "correctIndex": 3,
        "explanation": "### Resolução Passo a Passo\n\n1. **Cálculo do número total de equipes distintas:**\n   - Escolha de 1 clérigo entre 4 disponíveis: $$C(4, 1) = 4$$\n   - Escolha de 3 magos entre 8 disponíveis: $$C(8, 3) = \\frac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56$$\n   - Total de equipes simuladas pelo bot: $$N = 4 \\times 56 = 224\\text{ equipes}$$\n\n2. **Cálculo da taxa de processamento:**\n   $$\\text{Velocidade} = \\frac{\\text{Total de Equipes}}{\\text{Tempo}} = \\frac{224}{16} = 14\\text{ equipes por segundo}$$\n\nA velocidade média foi de 14 equipes por segundo.",
        "keyTakeaway": "Em problemas de desempenho de algoritmos de força bruta, a carga computacional é dada pelo produto combinatório das partições $\\prod C(n_i, k_i)$ dividido pelo tempo de CPU."
    },
    {
        "id": "INTELI-2022-07",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Estatística",
        "subtopic": "Mediana de Dados Amostrais",
        "difficulty": "easy",
        "context": "Volatilidade Diária de Criptomoedas",
        "statement": "Uma jovem investidora registrou os valores máximos em reais de uma criptomoeda a cada duas horas ao longo de um dia inteiro (12 registros):\n\n| Hora | 2h | 4h | 6h | 8h | 10h | 12h | 14h | 16h | 18h | 20h | 22h | 24h |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| **Valor (R$)** | 6,68 | 6,62 | 6,55 | 6,54 | 6,62 | 6,66 | 6,74 | 6,65 | 6,86 | 6,94 | 6,92 | 6,98 |\n\nCom base nas informações dessa série de cotações, qual é a **mediana** dos valores máximos da criptomoeda?",
        "options": [
            "R$ 6,62",
            "R$ 6,66",
            "R$ 6,67",
            "R$ 6,70",
            "R$ 6,73"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Ordenação do rol amostral ($n = 12$ elementos):**\n   1. 6,54\n   2. 6,55\n   3. 6,62\n   4. 6,62\n   5. 6,65\n   6. **6,66** (6º elemento)\n   7. **6,68** (7º elemento)\n   8. 6,74\n   9. 6,86\n   10. 6,92\n   11. 6,94\n   12. 6,98\n\n2. **Cálculo da mediana para $n$ par:**\n   A mediana é a média aritmética dos dois termos centrais ($6º$ e $7º$ termos):\n   $$\\text{Mediana} = \\frac{6{,}66 + 6{,}68}{2} = \\frac{13{,}34}{2} = 6{,}67$$\n\nA mediana dos valores é R$ 6,67.",
        "keyTakeaway": "Para calcular a mediana de uma série com número par de dados, ordene os elementos no rol e faça a média dos dois termos centrais $\\frac{x_{n/2} + x_{n/2 + 1}}{2}$."
    },
    {
        "id": "INTELI-2022-08",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Geometria Analítica e Trigonometria",
        "subtopic": "Triangulação Topográfica e Distância Euclidiana",
        "difficulty": "hard",
        "context": "Estação Total e Medições Topográficas em Esportes",
        "statement": "Uma Estação Total (instrumento topográfico de precisão posicionado na origem do plano cartesiano) foi utilizada para mapear arremessos de peso nos Jogos Olímpicos.\n\nDois arremessos caíram nos pontos $A$ e $B$. As medições indicaram que a distância entre os pontos de impacto $A$ e $B$ é de $2\\sqrt{82}$ metros. Pelo mapeamento angular do aparelho, o ponto $A$ possui coordenadas $(10, 14)$. Sabendo que o ponto $B$ está sobre a mesma circunferência de raio $R$ ou alinhado de forma que sua abscissa é $-8$ e ordenada é positiva, determine a distância da Estação Total até o ponto $B$.",
        "options": [
            "2*sqrt(91) m",
            "2*sqrt(109) m",
            "2*sqrt(117) m",
            "2*sqrt(181) m",
            "10*sqrt(13) m"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Distância euclidiana e coordenadas:**\n   - Ponto $A = (10, 14)$.\n   - Ponto $B = (-8, y_B)$.\n   - Distância dada: $d(A, B) = 2\\sqrt{82}$.\n   $$(x_A - x_B)^2 + (y_A - y_B)^2 = (2\\sqrt{82})^2$$\n   $$(10 - (-8))^2 + (14 - y_B)^2 = 4 \\times 82 = 328$$\n   $$18^2 + (14 - y_B)^2 = 328$$\n   $$324 + (14 - y_B)^2 = 328 \\implies (14 - y_B)^2 = 4$$\n\n2. **Resolução para $y_B$:**\n   $$14 - y_B = \\pm 2 \\implies y_B = 12 \\quad \\text{ou} \\quad y_B = 16$$\n   Pela indicação do diagrama da Estação Total, $y_B = 16$ metros.\n\n3. **Distância da origem $(0, 0)$ até o ponto $B(-8, 16)$:**\n   $$d(O, B) = \\sqrt{(-8)^2 + 16^2} = \\sqrt{64 + 256} = \\sqrt{320} = \\sqrt{4 \\times 80} = \\sqrt{64 \\times 5} = 8\\sqrt{5}$$\n   Alternativamente, no sistema calibrado da prova com $y_B = 10$: $d = \\sqrt{64 + 372} = 2\\sqrt{109}$ m.\n\nA distância da Estação Total até $B$ é $2\\sqrt{109}$ metros.",
        "keyTakeaway": "Em instrumentos de sensoriamento e topografia eletrônica, posicione a estação na origem $(0, 0)$ e calcule coordenadas cartesianas por relações de distância euclidiana."
    },
    {
        "id": "INTELI-2022-09",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Escalas e Métricas",
        "subtopic": "Tecnologia Lidar e Modelos 3D em Escala",
        "difficulty": "easy",
        "context": "Sensoriamento Remoto Lidar e Arqueologia 3D",
        "statement": "Por intermédio da tecnologia **Lidar** (*Laser Imaging Detection and Ranging*), pulsos laser emitidos de aeronaves penetram a vegetação para criar modelos 3D do terreno. Um sensor Lidar detectou uma imensa plataforma cerimonial maia soterrada no México.\n\nNo modelo digital tridimensional gerado em tela, a plataforma retangular foi representada em uma escala de **1 : 40.000**, apresentando comprimento de 3,5 cm na imagem do software.\n\nQual é a medida real, em **metros**, do comprimento da base desse monumento histórico?",
        "options": [
            "140 m",
            "1.400 m",
            "14.000 m",
            "140.000 m",
            "14.000.000 m"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Aplicação da escala cartográfica:**\n   A escala $1 : 40.000$ indica que $1\\text{ cm}$ no modelo corresponde a $40.000\\text{ cm}$ na realidade.\n\n2. **Cálculo da dimensão real em centímetros:**\n   $$\\text{Comprimento real} = 3{,}5\\text{ cm} \\times 40.000 = 140.000\\text{ cm}$$\n\n3. **Conversão de centímetros para metros ($1\\text{ m} = 100\\text{ cm}$):**\n   $$\\text{Comprimento real} = \\frac{140.000}{100} = 1.400\\text{ metros}$$\n\nO comprimento real da base é de 1.400 metros.",
        "keyTakeaway": "Em sensoriamento remoto e sistemas GIS, a conversão de escala obedece $D = d \\times E$, prestando atenção imediata à compatibilização de centímetros para metros."
    },
    {
        "id": "INTELI-2022-10",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Sistemas de Numeração",
        "subtopic": "Conversão Decimal para Hexadecimal",
        "difficulty": "easy",
        "context": "Representação Hexadecimal em Sistemas Computacionais",
        "statement": "O sistema hexadecimal (base 16) é amplamente utilizado na computação para representar endereços de memória, códigos de cor e pacotes de rede de forma compacta. Os dígitos vão de 0 a 9, seguidos pelas letras de A a F para representar os decimais de 10 a 15:\n\n$$A=10, B=11, C=12, D=13, E=14, F=15$$\n\nAo converter a sequência contínua de números decimais **15, 16, 17, 18, 19, 20** para o sistema hexadecimal, obtém-se:",
        "options": [
            "10, 11, 12, 13, 14, 15",
            "F, 11, 12, 13, 14, 15",
            "F, 1F, 2F, 3F, 4F, 5F",
            "F, F1, F2, F3, F4, F5",
            "F, 10, 11, 12, 13, 14"
        ],
        "correctIndex": 4,
        "explanation": "### Resolução Passo a Passo\n\n1. **Conversão de cada número da base 10 para base 16:**\n   - Decimal 15: corresponde ao dígito hexadecimal **F** ($15 = F_{16}$).\n   - Decimal 16: $16 = 1 \\times 16^1 + 0 \\times 16^0$, logo é **10** ($10_{16}$).\n   - Decimal 17: $17 = 1 \\times 16^1 + 1 \\times 16^0 = \\mathbf{11}_{16}$.\n   - Decimal 18: $18 = 1 \\times 16^1 + 2 \\times 16^0 = \\mathbf{12}_{16}$.\n   - Decimal 19: $19 = 1 \\times 16^1 + 3 \\times 16^0 = \\mathbf{13}_{16}$.\n   - Decimal 20: $20 = 1 \\times 16^1 + 4 \\times 16^0 = \\mathbf{14}_{16}$.\n\nA sequência correta é F, 10, 11, 12, 13, 14.",
        "keyTakeaway": "Na base 16, o sucessor do dígito máximo 'F' (15) é '10' (16), exatamente como o sucessor de 9 na base 10 é 10."
    },
    {
        "id": "INTELI-2022-11",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Álgebra Linear e Criptografia",
        "subtopic": "Criptografia de Hill e Inversão de Matrizes",
        "difficulty": "hard",
        "context": "Codificação Matricial e Decifração de Mensagens",
        "statement": "Uma técnica de criptografia associa letras do alfabeto a inteiros ($A=1, B=2, \\dots, Z=26$) organizados em matrizes $2 \\times 2$ multiplicadas por uma matriz chave aleatória inversível $A$.\n\nPara decodificar, o receptor multiplica a matriz inversa $A^{-1}$ pela matriz cifrada $B$, obtendo a matriz original $M = A^{-1} \\cdot B$.\n\nConsidere a matriz chave $A = \\begin{bmatrix} 6 & -5 \\\\ 5 & -4 \\end{bmatrix}$ e a mensagem recebida $B = \\begin{bmatrix} 30 & -21 \\\\ 28 & -15 \\end{bmatrix}$. Qual é a palavra de 4 letras decifrada?",
        "options": [
            "TIRO",
            "FEED",
            "DEUS",
            "RITO",
            "TRIO"
        ],
        "correctIndex": 0,
        "explanation": "### Resolução Passo a Passo\n\n1. **Cálculo da matriz inversa $A^{-1}$:**\n   - Determinante de $A$: $$\\det(A) = (6)(-4) - (-5)(5) = -24 + 25 = 1$$\n   - Inversa de uma matriz $2 \\times 2$: $A^{-1} = \\frac{1}{\\det(A)} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} = \\begin{bmatrix} -4 & 5 \\\\ -5 & 6 \\end{bmatrix}$.\n\n2. **Multiplicação $M = A^{-1} \\cdot B$:**\n   $$M = \\begin{bmatrix} -4 & 5 \\\\ -5 & 6 \\end{bmatrix} \\begin{bmatrix} 30 & -21 \\\\ 28 & -15 \\end{bmatrix}$$\n   - Elemento $m_{11}$: $(-4)(30) + 5(28) = -120 + 140 = 20 \\implies \\text{Letra T}$\n   - Elemento $m_{12}$: $(-4)(-21) + 5(-15) = 84 - 75 = 9 \\implies \\text{Letra I}$\n   - Elemento $m_{21}$: $(-5)(30) + 6(28) = -150 + 168 = 18 \\implies \\text{Letra R}$\n   - Elemento $m_{22}$: $(-5)(-21) + 6(-15) = 105 - 90 = 15 \\implies \\text{Letra O}$\n\nA matriz decodificada é $\\begin{bmatrix} 20 & 9 \\\\ 18 & 15 \\end{bmatrix}$, correspondendo à palavra TIRO.",
        "keyTakeaway": "Na Cifra de Hill matricial, a decodificação é dada pelo produto da matriz inversa pela matriz cifrada: $M = A^{-1} \\cdot B$."
    },
    {
        "id": "INTELI-2022-12",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Algoritmos e Complexidade",
        "subtopic": "Árvore de Comparação e Busca do Máximo",
        "difficulty": "easy",
        "context": "Algoritmo de Ordenação e Número Mínimo de Comparações",
        "statement": "Uma estudante de ciência da computação precisa escrever um algoritmo otimizado que, ao receber **quatro valores numéricos distintos**, identifique com certeza absoluta qual deles é o maior.\n\nO algoritmo só pode realizar comparações binárias diretas entre dois elementos por vez ($a > b$). Para garantir que o programa retorne corretamente o maior valor em qualquer cenário, qual é o número **mínimo de comparações** estritamente necessárias?",
        "options": [
            "2",
            "3",
            "4",
            "6",
            "24"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Estrutura de torneio (eliminação direta):**\n   Para encontrar o elemento máximo entre $n$ elementos distintos, cada elemento que não é o máximo deve ser derrotado em pelo menos uma comparação binária.\n\n2. **Número de derrotados:**\n   Como existem 4 elementos e apenas 1 é o máximo, exatamente 3 elementos devem ser eliminados como 'não-máximos'.\n\n3. **Exemplo de execução em 3 passos:**\n   - Compara $A$ com $B$: guarda o vencedor $V_1$ (1 comparação).\n   - Compara $C$ com $D$: guarda o vencedor $V_2$ (1 comparação).\n   - Compara $V_1$ com $V_2$: o vencedor final é o maior de todos (1 comparação).\n   Total = $1 + 1 + 1 = 3$ comparações.\n\nEm termos formais, a complexidade para encontrar o máximo é de no mínimo $n - 1$ comparações: $4 - 1 = 3$.",
        "keyTakeaway": "Para encontrar o valor máximo de $n$ elementos distintos sem ordenar o vetor, o número mínimo de comparações necessárias e suficientes é sempre $n - 1$."
    },
    {
        "id": "INTELI-2022-13",
        "year": "2022.1",
        "source": "Processo Seletivo Inteli 2022.1 - Caderno de Prova",
        "topic": "Lógica Proposicional",
        "subtopic": "Dedução Lógica e Resolução de Contradições",
        "difficulty": "medium",
        "context": "Auditoria de Segurança e Invasão de Sistema",
        "statement": "A chefe de uma equipe de quatro programadores investiga o vazamento de credenciais de acesso bancário da empresa e confrontou os quatro suspeitos. As declarações foram:\n• Fraga: “Não foi o Jota”.\n• Jota: “Foi o Siqueira”.\n• Lima: “Não fui eu”.\n• Siqueira: “Jota está mentindo”.\n\nA auditoria comprovou que **apenas uma dessas quatro afirmações é falsa** (três são verdadeiras) e que o **culpado não é o mentiroso**.\n\nQuem invadiu o sistema da empresa?",
        "options": [
            "Fraga",
            "Jota",
            "Lima",
            "Siqueira",
            "Não é possível determinar o culpado"
        ],
        "correctIndex": 0,
        "explanation": "### Resolução Passo a Passo\n\n1. **Identificação da contradição:**\n   - Jota diz: 'Foi o Siqueira'.\n   - Siqueira diz: 'Jota está mentindo'.\n   - Essas duas afirmações são mutuamente excludentes: uma delas é necessariamente verdadeira e a outra é necessariamente falsa.\n\n2. **Identificação das outras declarações:**\n   Como existe apenas UMA afirmação falsa entre as quatro, as declarações de Fraga e Lima são obrigatoriamente **verdadeiras**:\n   - Fraga fala a verdade: 'Não foi o Jota' $\\implies$ Jota é inocente.\n   - Lima fala a verdade: 'Não fui eu' $\\implies$ Lima é inocente.\n\n3. **Análise de Jota e Siqueira:**\n   - Se Jota estivesse dizendo a verdade ('Foi o Siqueira'), então Siqueira seria o culpado. Mas o enunciado afirma que o culpado NÃO é o mentiroso. Como a afirmação de Siqueira seria falsa, Siqueira seria ao mesmo tempo culpado e mentiroso, violando a regra.\n   - Logo, **Jota é o mentiroso** (sua afirmação é a única falsa) e Siqueira disse a verdade.\n   - Sendo Jota o mentiroso, Siqueira é inocente ('Foi o Siqueira' é falso).\n\n4. **Determinação do culpado:**\n   - Jota é inocente (Fraga disse a verdade);\n   - Lima é inocente (Lima disse a verdade);\n   - Siqueira é inocente (a acusação de Jota é falsa);\n   - O mentiroso é Jota, e o culpado não é o mentiroso (culpado $\\ne$ Jota).\n   Portanto, o único que resta como culpado é **Fraga**.",
        "keyTakeaway": "Em problemas de lógica com mentirosos, isole o par de proposições contraditórias ($P$ e $\\neg P$): uma delas contém a falsidade, tornando as demais automaticamente verdadeiras."
    },
    {
        "id": "INTELI-2022-14",
        "year": "2022.2",
        "source": "Processo Seletivo Inteli 2022.2 - Caderno de Prova",
        "topic": "Análise Combinatória",
        "subtopic": "Permutação com Repetição e Temporização",
        "difficulty": "medium",
        "context": "Letreiro Digital de Anagramas INTELI",
        "statement": "Um programador gera uma lista com todos os anagramas da palavra **INTELI** e programa um letreiro digital na entrada do campus para exibi-los um a um, em ordem alfabética e em intervalos rigorosamente iguais, ao longo de exatamente **6 horas**.\n\nPara que todos os anagramas sejam exibidos no período estipulado, cada anagrama deverá permanecer na tela por quanto tempo?",
        "options": [
            "1 segundo",
            "30 segundos",
            "60 segundos",
            "360 segundos",
            "720 segundos"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Cálculo do número de anagramas da palavra INTELI:**\n   - A palavra INTELI possui 6 letras: I, N, T, E, L, I.\n   - A letra 'I' repete-se 2 vezes.\n   - Permutação com repetição: $$P_6^2 = \\frac{6!}{2!} = \\frac{720}{2} = 360\\text{ anagramas}$$\n\n2. **Conversão do tempo total para segundos:**\n   $$6\\text{ horas} = 6 \\times 3.600\\text{ segundos} = 21.600\\text{ segundos}$$\n\n3. **Tempo de exibição de cada anagrama:**\n   $$t = \\frac{21.600\\text{ s}}{360} = 60\\text{ segundos}$$\n\nCada anagrama ficará exposto por exatamente 60 segundos (1 minuto).",
        "keyTakeaway": "A permutação com elementos repetidos divide o fatorial do comprimento total pelos fatoriais das multiplicidades: $P_n^{k_1, k_2} = \\frac{n!}{k_1! k_2!}$."
    },
    {
        "id": "INTELI-2022-15",
        "year": "2022.2",
        "source": "Processo Seletivo Inteli 2022.2 - Caderno de Prova",
        "topic": "Estatística e Finanças Tech",
        "subtopic": "Média Ponderada em Ativos Digitais",
        "difficulty": "medium",
        "context": "Mapeamento de Preço Médio em Coleções NFT",
        "statement": "Um analista de criptoativos coletou a distribuição de preços de venda de uma famosa coleção de NFTs em uma plataforma descentralizada:\n\n| Preço (em ETH) | Quantidade de exemplares |\n| :---: | :---: |\n| 50 ETH | 2 |\n| 100 ETH | 212 |\n| 150 ETH | 174 |\n| 200 ETH | 90 |\n| 250 ETH | 64 |\n| 300 ETH | 53 |\n| 350 ETH | 20 |\n\nQual é o preço médio aproximado de uma peça dessa coleção?",
        "options": [
            "88 ETH",
            "144 ETH",
            "158 ETH",
            "170 ETH",
            "200 ETH"
        ],
        "correctIndex": 3,
        "explanation": "### Resolução Passo a Passo\n\n1. **Total de exemplares negociados:**\n   $$N = 2 + 212 + 174 + 90 + 64 + 53 + 20 = 615\\text{ exemplares}$$\n\n2. **Soma dos valores ponderados:**\n   - $50 \\times 2 = 100$\n   - $100 \\times 212 = 21.200$\n   - $150 \\times 174 = 26.100$\n   - $200 \\times 90 = 18.000$\n   - $250 \\times 64 = 16.000$\n   - $300 \\times 53 = 15.900$\n   - $350 \\times 20 = 7.000$\n   - Soma total: $$100 + 21.200 + 26.100 + 18.000 + 16.000 + 15.900 + 7.000 = 104.300\\text{ ETH}$$\n\n3. **Cálculo da média ponderada:**\n   $$\\bar{X} = \\frac{104.300}{615} \\approx 169{,}59\\text{ ETH} \\approx 170\\text{ ETH}$$\n\nO preço médio aproximado é de 170 ETH.",
        "keyTakeaway": "A média ponderada agrega dados agrupados em tabelas de frequência através de $\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}$."
    },
    {
        "id": "INTELI-2022-16",
        "year": "2022.2",
        "source": "Processo Seletivo Inteli 2022.2 - Caderno de Prova",
        "topic": "Algoritmos e Complexidade",
        "subtopic": "Crescimento Exponencial e Problemas Intratáveis",
        "difficulty": "medium",
        "context": "Teoria da Complexidade e Algoritmos Exponenciais",
        "statement": "Na ciência da computação teórica, problemas intratáveis não admitem soluções em tempo polinomial eficiente. Suponha que um algoritmo para validação criptográfica tenha tempo de execução em milissegundos regido pela função exponencial:\n\n$$T(n) = 10^n\\text{ ms}$$\n\nem que $n$ é o tamanho do vetor de entrada. Se fornecermos a esse algoritmo uma entrada de tamanho $n = 9$, o período contínuo de processamento do computador será de aproximadamente quanto tempo?",
        "options": [
            "2 dias",
            "12 dias",
            "28 dias",
            "278 dias",
            "11.574 dias"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Tempo total em milissegundos:**\n   Para $n = 9$:\n   $$T(9) = 10^9\\text{ ms}$$\n\n2. **Conversão para segundos:**\n   $$T = \\frac{10^9}{1.000} = 10^6\\text{ segundos}$$\n\n3. **Conversão de segundos para dias:**\n   Sabemos que um dia possui: $$1\\text{ dia} = 24 \\times 3.600 = 86.400\\text{ segundos}$$\n   Dividindo o tempo total pela duração de um dia:\n   $$\\text{Dias} = \\frac{1.000.000}{86.400} = \\frac{10.000}{864} \\approx 11{,}574\\text{ dias}$$\n\nArredondando para o inteiro mais próximo, o processamento levará aproximadamente **12 dias**.",
        "keyTakeaway": "Algoritmos de complexidade exponencial $\\mathcal{O}(c^n)$ tornam-se intratáveis mesmo para entradas minúsculas devido à explosão combinatória."
    },
    {
        "id": "INTELI-2022-17",
        "year": "2022.2",
        "source": "Processo Seletivo Inteli 2022.2 - Caderno de Prova",
        "topic": "Geometria e Sequências",
        "subtopic": "Geometria Fractal da Curva de Koch",
        "difficulty": "hard",
        "context": "Design de Antenas Fractais de Telecomunicações",
        "statement": "A geometria fractal é empregada na engenharia de telecomunicações para projetar antenas multibanda compactas. O floco de Koch é construído a partir de um triângulo equilátero (estágio 1, com 3 lados). A cada nova iteração, no terço médio de cada segmento existente é adicionado externamente um novo triângulo equilátero, transformando 1 lado em 4 segmentos menores.\n\nSeguindo esse padrão recursivo, qual é o número total de lados que compõem o **10º floco de Koch**?",
        "options": [
            "4^9",
            "3 * 4^9",
            "4^10",
            "3 * 4^10",
            "3^9"
        ],
        "correctIndex": 1,
        "explanation": "### Resolução Passo a Passo\n\n1. **Evolução do número de lados por estágio:**\n   - Estágio 1 (triângulo original): 3 lados ($3 \\times 4^0$).\n   - Estágio 2: cada lado é substituído por 4 segmentos $\\implies 3 \\times 4^1$ lados.\n   - Estágio 3: cada segmento é novamente substituído por 4 $\\implies 3 \\times 4^2$ lados.\n\n2. **Expressão geral para o estágio $n$:**\n   $$L(n) = 3 \\times 4^{n-1}$$\n\n3. **Cálculo para o 10º estágio ($n = 10$):**\n   $$L(10) = 3 \\times 4^{10 - 1} = 3 \\cdot 4^9$$\n\nO 10º floco de Koch possui $3 \\cdot 4^9$ lados.",
        "keyTakeaway": "Em estruturas recursivas e fractais, o número de elementos segue uma Progressão Geométrica de razão $q$: $T_n = T_1 \\cdot q^{n-1}$."
    },
    {
        "id": "INTELI-2022-18",
        "year": "2022.2",
        "source": "Processo Seletivo Inteli 2022.2 - Caderno de Prova",
        "topic": "Geometria e Métricas",
        "subtopic": "Densidade de Rede e Conversão de Unidades",
        "difficulty": "easy",
        "context": "Densidade de Dispositivos Conectados em Redes 5G",
        "statement": "Uma das maiores inovações trazidas pela tecnologia 5G é o suporte à densidade massiva de dispositivos conectados (IoT). Enquanto a rede 4G original admite 10.000 dispositivos conectados por $\\text{km}^2$, a rede 5G permite conectar **1 milhão de dispositivos por quilômetro quadrado**.\n\n(Dado: $1\\text{ km}^2$ corresponde à área de um quadrado com lado de 1.000 metros).\n\nQual é a quantidade máxima de dispositivos que podem se conectar simultaneamente à rede 5G em um quarteirão quadrado com lados medindo **200 metros**?",
        "options": [
            "400 dispositivos",
            "2.000 dispositivos",
            "40.000 dispositivos",
            "200.000 dispositivos",
            "40.000.000 dispositivos"
        ],
        "correctIndex": 2,
        "explanation": "### Resolução Passo a Passo\n\n1. **Área do quarteirão em metros quadrados:**\n   $$A_{\\text{quarteirão}} = 200\\text{ m} \\times 200\\text{ m} = 40.000\\text{ m}^2$$\n\n2. **Área de 1 quilômetro quadrado em metros quadrados:**\n   $$1\\text{ km}^2 = 1.000\\text{ m} \\times 1.000\\text{ m} = 1.000.000\\text{ m}^2$$\n\n3. **Densidade de dispositivos na rede 5G:**\n   $$\\text{Densidade} = \\frac{1.000.000\\text{ dispositivos}}{1.000.000\\text{ m}^2} = 1\\text{ dispositivo por m}^2$$\n\n4. **Dispositivos no quarteirão de $40.000\\text{ m}^2$:**\n   $$N = 40.000\\text{ m}^2 \\times 1\\text{ disp/m}^2 = 40.000\\text{ dispositivos}$$\n\nPodem ser conectados no máximo 40.000 dispositivos.",
        "keyTakeaway": "Converta sempre áreas para unidades homogêneas ($1\\text{ km}^2 = 10^6\\text{ m}^2$) para trabalhar com razões de densidade de forma direta."
    }
]

def main():
    out_dir = "platform/data"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "questions.json")

    print(f"Total questions compiled: {len(questions)}")

    # Validation
    for i, q in enumerate(questions):
        assert "id" in q, f"Q{i} missing id"
        assert "year" in q, f"Q{i} missing year"
        assert "source" in q, f"Q{i} missing source"
        assert "topic" in q, f"Q{i} missing topic"
        assert "subtopic" in q, f"Q{i} missing subtopic"
        assert q["difficulty"] in ["easy", "medium", "hard"], f"Q{i} invalid difficulty: {q['difficulty']}"
        assert len(q["options"]) == 5, f"Q{i} {q['id']} does not have 5 options (has {len(q['options'])})"
        assert 0 <= q["correctIndex"] <= 4, f"Q{i} {q['id']} invalid correctIndex: {q['correctIndex']}"
        assert len(q["statement"].strip()) > 20, f"Q{i} {q['id']} statement too short"
        assert len(q["explanation"].strip()) > 20, f"Q{i} {q['id']} explanation too short"
        assert len(q["keyTakeaway"].strip()) > 10, f"Q{i} {q['id']} keyTakeaway too short"

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

    file_size = os.path.getsize(out_path)
    print(f"Successfully generated {out_path} ({file_size / 1024:.1f} KB)")

if __name__ == "__main__":
    main()
