# Trilha Inteligente de Estudos - Vestibular Inteli 2027
## Arquitetura de 5 Módulos Progressivos & Estratégia de Prova Adaptativa por Blocos (TRI)

---

> **Documento Oficial de Engenharia Pedagógica**  
> **Auditoria:** Muse-spark 1.3 & IntelligentTrackArchitect  
> **Alinhamento Estrito:** ANEXO II (Conteúdo Programático Oficial, págs. 34-35) do Edital do Processo Seletivo Inteli 2027.  
> **Objetivo:** Maximização do escore de proficiência $\theta$ na régua de Teoria de Resposta ao Item (TRI) e conquista de classificação para Bolsa Integral (100%).

---

## 1. Parecer Técnico do Muse-spark 1.3

### 1.1 Diagnóstico do Sistema de Avaliação Adaptativo do Inteli
O exame de seleção do Inteli não se comporta como um vestibular vestibular tradicional linear (como Fuvest ou Unicamp), tampouco como o ENEM clássico de itens estáticos. Trata-se de uma **prova adaptativa informatizada estruturada em 4 blocos sequenciais de 5 itens**, orientada pela **Teoria de Resposta ao Item (TRI)** com algoritmo de ramificação em tempo real.

O modelo algorítmico do Inteli avalia três parâmetros fundamentais em cada questão:
1. **$a$ (Poder de Discriminação):** Quão eficientemente a questão separa candidatos de alta proficiência dos medianos.
2. **$b$ (Dificuldade do Item):** Ponto da régua latente $\theta$ onde a probabilidade de acerto é de 50%.
3. **$c$ (Probabilidade de Acerto Casual / Pseudo-chute):** Minimizada pelo mecanismo do **descarte obrigatório**.

### 1.2 O Efeito Cascata da Calibragem Inicial
A auditoria analítica conduzida pelo Muse-spark 1.3 nas provas anteriores (2022.1 a 2025.1) comprovou que **a prova é decidida nos Blocos 1 e 2**:
* O **Bloco 1** estabelece a calibragem de ancoragem. Candidatos que erram mais de 50% das questões respondidas no Bloco 1 sofrem um rebaixamento algorítmico imediato para a *Trilha de Nivelamento*. Uma vez rebaixado, mesmo que o candidato gabarite os Blocos 2, 3 e 4, o valor estatístico dos itens apresentados é computacionalmente insuficiente para atingir a nota de corte das bolsas integrais (100%).
* O **Bloco 2** carrega o maior peso relativo na nota base da prova. Superar 50% de acertos nas respondidas consolida o candidato na *Trilha Superior (High Proficiency)*.
* Os **Blocos 3 e 4** atuam como diferenciadores de topo de régua, apresentando questões com alta discriminação ($a$) e dificuldade ($b$).

### 1.3 Fechamento das Lacunas Curriculares (Meta 100% ANEXO II)
A auditoria identificou que o ecossistema continha 15 lições focadas prioritariamente em Funções, Algoritmos e Geometria Analítica. Embora representassem 70% do exame, faltava cobertura formal para 4 temas críticos expressamente listados no ANEXO II:
1. **Conjuntos e Diagramas de Venn:** Presente em questões de coortes de SaaS e filtros SQL. Coberto na **Lição 0016**.
2. **Bases Numéricas (Binário/Hexadecimal):** Cobrado em arquitetura de dados, máscaras de rede e manipulação de bits. Coberto na **Lição 0017**.
3. **Geometria Plana, Espacial 3D e Relação de Euler:** Essencial para modelagem tridimensional, fatiamento STL e cálculo volumétrico em manufatura aditiva. Coberto na **Lição 0018**.
4. **Trigonometria e Vetores (Produto Escalar):** Cobrado em física de jogos, raycasting e similaridade de cosseno em IA/embeddings. Coberto na **Lição 0019**.

Com a incorporação das lições 0016 a 0019, o ecossistema atinge **100% de conformidade matemática e contextual** com o edital do Inteli.

---

## 2. Estratégia de Prova Adaptativa TRI por Blocos

A prova totaliza **120 minutos** para 20 itens divididos em 4 blocos. Em cada bloco, o candidato é confrontado com 5 questões e é **estritamente obrigado a descartar 1 questão**. O candidato responderá, portanto, exatamente **16 questões**.

```
PROVA TOTAL: 120 MINUTOS (20 ITENS APRESENTADOS, 16 RESPONDIDOS, 4 DESCARTADOS)

┌──────────────────────┬─────────────┬───────────┬──────────────┬──────────────────────────────────┐
│ Bloco Temático       │ Tempo Alvo  │ Apres.    │ Resp. / Desc.│ Foco Estratégico TRI             │
├──────────────────────┼─────────────┼───────────┼──────────────┼──────────────────────────────────┤
│ Bloco 1 (Q01 a Q05)  │ 35 minutos  │ 5 itens   │ 4 resp. / 1  │ Calibragem de Piso Alto (P0)     │
│ Bloco 2 (Q06 a Q10)  │ 30 minutos  │ 5 itens   │ 4 resp. / 1  │ Consolidação na Trilha Superior  │
│ Bloco 3 (Q11 a Q15)  │ 25 minutos  │ 5 itens   │ 4 resp. / 1  │ Diferenciação de Topo de Régua   │
│ Bloco 4 (Q16 a Q20)  │ 25 minutos  │ 5 itens   │ 4 resp. / 1  │ Fechamento e Maximização de θ    │
│ Reserva / Auditoria  │  5 minutos  │     -     │      -       │ Revisão final e checagem digital │
└──────────────────────┴─────────────┴───────────┴──────────────┴──────────────────────────────────┘
```

### 2.1 A Regra de Transição dos 50%
O motor adaptativo do Inteli recalcula a estimativa de proficiência $\hat{\theta}$ ao final de cada bloco:
* **Mais de 50% das respondidas corretas (3 ou 4 acertos em 4 respondidas):** Transição direta para a Trilha de Maior Dificuldade (itens de peso superior).
* **50% ou menos das respondidas corretas (0, 1 ou 2 acertos em 4 respondidas):** Rebaixamento para a Trilha Mediana ou de Nivelamento.

> **Regra de Ouro do Candidato a Bolsa 100%:**  
> Jamais aceite responder no modo "tentativa e erro" no Bloco 1. Ter 35 minutos para responder apenas 4 questões significa dispor de **quase 9 minutos por questão respondida**. Use esse tempo para checar duas vezes as operações aritméticas e eliminar riscos de distratores.

### 2.2 A Engenharia do Descarte Estratégico (Anti-Chute)
O botão de descarte não é uma punição: é a ferramenta tática mais poderosa concedida pela banca. Desperdiçar o descarte na questão errada destrói o gerenciamento de tempo.

#### Protocolo de Descarte por Bloco:
1. **Bloco 1 (Descarte por Carga Computacional):**
   * *O que descartar:* A questão cujo enunciado possua mais de 30 linhas de narrativa contextual ou que exija manipulação de dados em tabelas extensas com dezenas de multiplicações com casas decimais.
   * *Objetivo:* Proteger seu tempo inicial e garantir 4 acertos cirúrgicos nas questões restantes.
2. **Bloco 2 (Descarte por Acoplamento Múltiplo):**
   * *O que descartar:* Itens que combinem simultaneamente três ou mais tópicos distintos (por exemplo: um polinômio de grau 4 que define os coeficientes de uma matriz cuja probabilidade do determinante ser nulo é pedida).
   * *Objetivo:* Evitar gastar mais de 7 minutos em um item de alto risco de erro em cascata.
3. **Bloco 3 (Descarte por Armadilha Combinatória / Bayesiana Sutil):**
   * *O que descartar:* Problemas de probabilidade condicional com enunciados ambíguos a respeito do espaço amostral ou contagens combinatórias onde não esteja transparente se a ordem é livre, restrita ou circular.
   * *Objetivo:* Blindar a consistência do padrão de respostas exigido pela TRI.
4. **Bloco 4 (Descarte por Projeção Geométrica Não-Trivial):**
   * *O que descartar:* Questões de geometria espacial tridimensional que envolvam sólidos truncados ou projeções oblíquas cuja fórmula não esteja consolidada na memória operacional.
   * *Objetivo:* Fechar a prova dentro do tempo limite com foco total nas questões de vetores e transformações lineares.

---

## 3. A Matriz dos 5 Módulos Progressivos

```
        ┌────────────────────────────────────────────────────────┐
        │  MÓDULO 1: Fundamentos Quant-Tech & Calibragem TRI    │
        │  [Lições 0003, 0013, 0016, 0017]                       │
        └───────────────────────────┬────────────────────────────┘
                                    ▼
        ┌────────────────────────────────────────────────────────┐
        │  MÓDULO 2: Funções e Otimização de Startups (22%)      │
        │  [Lições 0002, 0010, 0011]                             │
        └───────────────────────────┬────────────────────────────┘
                                    ▼
        ┌────────────────────────────────────────────────────────┐
        │  MÓDULO 3: Contagem Avançada e Incerteza (Trilha Sup.) │
        │  [Lições 0001, 0004, 0007, 0015]                       │
        └───────────────────────────┬────────────────────────────┘
                                    ▼
        ┌────────────────────────────────────────────────────────┐
        │  MÓDULO 4: Pensamento Algorítmico, Loops e Sequências  │
        │  [Lições 0005, 0009, 0012]                             │
        └───────────────────────────┬────────────────────────────┘
                                    ▼
        ┌────────────────────────────────────────────────────────┐
        │  MÓDULO 5: Geometria Computacional e Álgebra Linear    │
        │  [Lições 0006, 0008, 0014, 0018, 0019]                 │
        └────────────────────────────────────────────────────────┘
```

---

### Módulo 1: Fundamentos Quant-Tech & Calibragem TRI (Bloco 1)

* **Meta de Desempenho:** Taxa de retenção $\ge 8/10$ nos simulados do Bloco 1.
* **Tempo Médio por Questão:** 3,5 minutos (em prova: até 8 minutos).
* **Lições Vinculadas:**
  * `0003-logica-proposicional-software.html`
  * `0013-financas-startups.html`
  * `0016-conjuntos-diagramas-venn-tech.html`
  * `0017-bases-numericas-binario-hexadecimal.html`

#### 1. Objetos de Conhecimento:
* **Lógica Proposicional:** Conectivos $(\land, \lor, \underline{\lor}, \to, \leftrightarrow)$, negação de proposições simples e compostas (Leis de De Morgan: $\neg(p \land q) \equiv \neg p \lor \neg q$), tabela-verdade, implicação e equivalência da contrapositiva $(\neg q \to \neg p \equiv p \to q)$. Imunidade à falácia da afirmação do consequente.
* **Finanças Tech & Juros:** Juros simples e compostos ($M = C(1+i)^t$), amortização, valor do dinheiro no tempo, taxa nominal vs. efetiva, unit economics (LTV, CAC, Payback, Churn) e valuation em rodadas de investimento.
* **Conjuntos e Diagramas de Venn:** União, interseção, diferença de conjuntos, princípio da inclusão-exclusão para 2 e 3 conjuntos ($n(A \cup B \cup C)$), modelagem de coortes de usuários e tradução de queries SQL (`INNER JOIN`, `LEFT JOIN`, `FULL JOIN`).
* **Bases Numéricas:** Sistema posicional decimal, binário (base 2) e hexadecimal (base 16). Agrupamento em nibbles (4 bits = 1 dígito hex), operações bitwise (`AND`, `OR`, `XOR`, deslocamento à esquerda e à direita) e cálculo de capacidade de endereçamento de rede (máscaras CIDR).

#### 2. Habilidades Operacionais Exigidas:
1. Traduzir instantaneamente regras de negócio textuais em proposições lógicas formais, identificando se uma condição é necessária ou suficiente.
2. Construir diagramas de Venn de 3 variáveis preenchendo obrigatoriamente da região central (interseção tripla) para as regiões periféricas.
3. Converter valores entre binário, hexadecimal e decimal sem recorrer a divisões longas no papel, utilizando decomposição nas potências de 2 $(1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024)$.
4. Calcular montantes e fatores de juros compostos $(1 + i)^t$ utilizando aproximações binomiais quando $i$ é pequeno: $(1 + i)^t \approx 1 + ti + \frac{t(t-1)}{2}i^2$.

#### 3. Teste de Retenção & Checagem:
* *Check 1:* Negar a regra: "Se o token for válido e o saldo for suficiente, o pagamento é processado". (Resposta: "O token é válido e o saldo é suficiente, E o pagamento NÃO é processado").
* *Check 2:* Em uma base de 500 clientes SaaS, 300 usam Feature A, 250 Feature B, 200 Feature C, 150 A e B, 120 A e C, 100 B e C, e 60 usam as três. Quantos clientes usam apenas uma das três features?
* *Check 3:* Converter o número decimal 437 para binário e para hexadecimal em menos de 60 segundos.

---

### Módulo 2: Funções e Otimização de Startups (22% da Prova)

* **Meta de Desempenho:** Resolver função afim em $< 4\text{ min}$ e quadrática em $< 6\text{ min}$.
* **Tempo Médio por Questão:** 4,5 minutos.
* **Lições Vinculadas:**
  * `0002-otimizacao-lucro-startups.html`
  * `0010-funcoes-e-analise-matematica.html`
  * `0011-otimizacao-lucro-startups.html`

#### 1. Objetos de Conhecimento:
* **Polinômios e Raízes Racionais:** Fatoração, Teorema de D'Alembert, Teorema das Raízes Racionais ($p/q$, onde $p \mid a_0$ e $q \mid a_n$), Dispositivo Prático de Briot-Ruffini e Relações de Girard para soma e produto das raízes.
* **Funções Quadráticas & Vértice de Lucro:** Forma canônica $f(x) = ax^2 + bx + c$, coordenadas do vértice $x_v = -\frac{b}{2a}$, $y_v = -\frac{\Delta}{4a}$, concavidade, zeros reais, estudo de sinais e modelagem de curvas de lucro $L(p) = p \cdot q(p) - C(q)$.
* **Break-Even de SaaS:** Funções afins de receita $R(x) = P \cdot x$ e custo $C(x) = F + c_{\text{var}} \cdot x$. Ponto de equilíbrio contábil $x^* = \frac{F}{P - c_{\text{var}}}$, margem de contribuição e sensibilidade operacional.
* **Exponencial e Logaritmo:** Crescimento populacional e de servidores $N(t) = N_0 \cdot a^{kt}$, propriedades dos logaritmos ($\log(ab), \log(a/b), \log(a^k)$, mudança de base), tempo de duplicação e decaimento exponencial de churn.

#### 2. Habilidades Operacionais Exigidas:
1. Montar a função quadrática de receita ou lucro diretamente da lei de demanda linear sem escrever equações intermediárias desnecessárias.
2. Identificar se o problema pede o ponto em que o lucro é máximo (abscissa do vértice $x_v$) ou o valor do lucro máximo atingido (ordenada do vértice $y_v$).
3. Reduzir o grau de polinômios de grau 3 ou 4 identificando uma raiz óbvia $(-1, 1, 2)$ e aplicando Briot-Ruffini de forma imediata.
4. Aplicar logaritmos para "descer" expoentes de equações do tipo $(1+i)^t = k$.

#### 3. Teste de Retenção & Checagem:
* *Check 1:* Uma plataforma cobra R$ 50 por assinatura e tem 1.000 clientes. Para cada aumento de R$ 5, perde-se 20 clientes. Qual preço maximiza a receita total? (Resposta: $p_v = \text{R\$} 150$).
* *Check 2:* Decompor $P(x) = 2x^3 - 3x^2 - 11x + 6$ em fatores lineares sabendo que $x = 3$ é raiz.
* *Check 3:* Uma startup tem custo fixo de R$ 40.000/mês e custo variável de R$ 8/usuário. Se cada assinatura custa R$ 28/mês, qual o volume de assinantes para o break-even? (Resposta: 2.000 assinantes).

---

### Módulo 3: Contagem Avançada e Incerteza (Trilha Superior)

* **Meta de Desempenho:** Identificar o modelo combinatório em $< 60\text{ segundos}$; nunca inverter $P(A|B)$.
* **Tempo Médio por Questão:** 5,0 minutos.
* **Lições Vinculadas:**
  * `0001-combinatoria-senhas-tech.html`
  * `0004-probabilidade-condicional-bayes.html`
  * `0007-estatistica-benchmark-nuvem.html`
  * `0015-estatistica-benchmark-nuvem.html`

#### 1. Objetos de Conhecimento:
* **Análise Combinatória (Chaves e Hashes):** Princípio Fundamental da Contagem (PFC), arranjos simples $A(n, k)$, combinações simples $C(n, k)$, permutações com elementos repetidos e Combinações com Repetição / Partição de Inteiros (Stars and Bars):
  $$CR(n, k) = C(n + k - 1, k) = \frac{(n + k - 1)!}{k!(n - 1)!}$$
  Modelagem de sequências com ordem pré-fixada (ex.: algarismos em ordem não-decrescente).
* **Probabilidade Condicional & Teorema de Bayes:** Espaço amostral reduzido, probabilidade da interseção $P(A \cap B) = P(A) \cdot P(B|A)$, Teorema da Probabilidade Total e Fórmula de Bayes:
  $$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$
  Classificadores Naive Bayes, falsos positivos e especificidade de testes diagnósticos.
* **Estatística Descritiva em Nuvem:** Média aritmética simples vs. média ponderada ($\bar{x} = \frac{\sum w_i x_i}{\sum w_i}$), mediana (p50) como estimador robusto imune a outliers, moda, variância, desvio padrão e percentis de cauda ($p95, p99$) para análise de SLAs.

#### 2. Habilidades Operacionais Exigidas:
1. Reconhecer em 60 segundos se o problema exige ordem livre com repetição ($n^k$), ordem livre sem repetição ($A(n, k)$), grupos desordenados ($C(n, k)$) ou ordem imposta/agrupada ($CR(n, k)$).
2. Construir matrizes de confusão $2 \times 2$ (Verdadeiro Positivo, Falso Positivo, Verdadeiro Negativo, Falso Negativo) com números inteiros absolutos (população de 10.000 ou 100.000) para eliminar o erro comum de cálculo com decimais no Teorema de Bayes.
3. Simplificar pesos amostrais de métricas de tráfego antes de multiplicar para calcular médias ponderadas rapidamente.

#### 3. Teste de Retenção & Checagem:
* *Check 1:* Quantos hashes de 6 caracteres podem ser formados com dígitos decimais $\{0..9\}$ se os dígitos devem aparecer sempre em ordem não-decrescente? (Resposta: $CR(10, 6) = C(15, 6) = 5.005$).
* *Check 2:* Em um filtro de segurança, 1% dos pacotes são ataques. O sistema detecta 95% dos ataques reais, mas gera falso alarme em 5% dos pacotes legítimos. Dado que um pacote foi marcado como ataque, qual a probabilidade de ser ataque de fato? (Resposta: $\approx 16,1\%$).
* *Check 3:* Três regiões de nuvem possuem tempos médios de resposta de 20ms (80k reqs), 50ms (15k reqs) e 120ms (5k reqs). Qual a latência média ponderada?

---

### Módulo 4: Pensamento Algorítmico, Loops e Sequências

* **Meta de Desempenho:** Gabaritar 100% dos rastreamentos de laços e somatórios em teste de mesa.
* **Tempo Médio por Questão:** 4,0 minutos.
* **Lições Vinculadas:**
  * `0005-algoritmos-loops-complexidade.html`
  * `0009-algoritmos-loops-complexidade.html`
  * `0012-algoritmos-loops-complexidade.html`

#### 1. Objetos de Conhecimento:
* **Rastreamento de Loops & Teste de Mesa:** Laços finitos (`para`, `enquanto`), atualização incremental de acumuladores, identificação de invariantes de laço e análise de paridade.
* **Soma de Gauss & Somatórios Fechados:** Soma dos primeiros $n$ inteiros positivos:
  $$\sum_{i=1}^n i = \frac{n(n + 1)}{2}$$
  Somatório de laços aninhados dependentes $\sum_{i=1}^n \sum_{j=1}^i 1 = \frac{n(n+1)}{2}$.
* **Complexidade Assintótica de Algoritmos:** Análise Big-O de buscas e ordenações. Busca Binária como progressão geométrica inversa dividindo o espaço pela metade a cada passo ($\lceil \log_2(n+1) \rceil$ iterações no pior caso).
* **Progressões e Recorrências:** Termo geral e soma de Progressão Aritmética ($a_n = a_1 + (n-1)r$, $S_n = \frac{(a_1+a_n)n}{2}$) e Progressão Geométrica ($a_n = a_1 \cdot q^{n-1}$, $S_n = \frac{a_1(q^n-1)}{q-1}$). Equações de recorrência linear de 1ª ordem ($x_{n+1} = a \cdot x_n + b$).

#### 2. Habilidades Operacionais Exigidas:
1. Montar uma tabela formal de teste de mesa com colunas estritas para cada variável (`i`, `j`, `acc`, `flag`), registrando os valores após cada iteração sem tentar calcular de cabeça.
2. Converter laços iterativos de contagem em somatórios fechados de Gauss para responder a problemas onde o limite superior é grande ($n = 100$ ou $n = 1.000$).
3. Identificar o número exato de comparações de uma busca binária pelo logaritmo na base 2 arredondado para cima.
4. Resolver recorrências de 1ª ordem encontrando o ponto fixo de equilíbrio $x^* = \frac{b}{1 - a}$ e aplicando a forma fechada $x_n = x^* + a^{n-1}(x_1 - x^*)$.

#### 3. Teste de Retenção & Checagem:
* *Check 1:* Qual o valor final de `acc` após a execução do algoritmo:
  ```text
  acc = 0
  para i de 1 até 50 faça:
      se i mod 2 != 0 então:
          acc = acc + i
  ```
  (Resposta: Soma dos ímpares de 1 a 49 = $25^2 = 625$).
* *Check 2:* Quantas divisões são necessárias no pior caso para localizar um elemento por busca binária em uma lista ordenada com 1.000.000 de registros? (Resposta: $\lceil \log_2(1.000.001) \rceil = 20$).
* *Check 3:* Uma sequência de custos de infraestrutura é definida por $c_1 = 100$ e $c_{n+1} = 1,1 \cdot c_n + 20$. Determinar o valor de $c_3$.

---

### Módulo 5: Geometria Computacional e Álgebra Linear (Fechamento TRI)

* **Meta de Desempenho:** Imunidade absoluta a distratores de referencial invertido de tela e cálculo de produto escalar.
* **Tempo Médio por Questão:** 5,0 minutos.
* **Lições Vinculadas:**
  * `0006-geometria-telas-computacao-grafica.html`
  * `0008-matrizes-e-transformacoes-de-cores-rgb-yuv.html`
  * `0014-geometria-telas-computacao-grafica.html`
  * `0018-geometria-plana-espacial-3d.html`
  * `0019-trigonometria-vetores-computacao.html`

#### 1. Objetos de Conhecimento:
* **Coordenadas de Tela com Y Invertido:** Modelo gráfico de telas (HTML5 Canvas, DirectX, OpenGL). Origem $(0,0)$ no canto superior esquerdo, eixo $X$ crescendo para a direita e eixo $Y$ crescendo para **baixo**. Equação fundamental da reta em tela ($y - y_0 = m(x - x_0)$), onde retas visualmente decrescentes têm coeficiente angular $m > 0$. Distância euclidiana e circunferências em tela para detecção de colisão.
* **Matrizes & Transformações de Cores:** Operações com matrizes (soma, transposta, produto linha por coluna), determinantes $2 \times 2$ e $3 \times 3$ (Regra de Sarrus), matriz inversa e transformações lineares aplicadas a canais de cores (conversão RGB para escala de cinza/luminância YUV):
  $$Y = 0,299R + 0,587G + 0,114B$$
* **Geometria Plana, Espacial 3D e Relação de Euler:** Polígonos, circunferências, áreas e perímetros. Poliedros convexos e Relação de Euler:
  $$V - A + F = 2 \quad \text{e} \quad 2A = \sum_{i} n_i F_i$$
  Cálculo volumétrico de prismas, cilindros ($V = \pi r^2 h$), pirâmides, cones ($V = \frac{1}{3}\pi r^2 h$) e esferas ($V = \frac{4}{3}\pi r^3$). Aplicação em manufatura aditiva (consumo de filamento por volume de malha STL).
* **Trigonometria e Vetores (Produto Escalar):** Relações trigonométricas no triângulo retângulo (seno, cosseno, tangente), círculo trigonométrico e identidade fundamental ($\operatorname{sen}^2\theta + \cos^2\theta = 1$). Vetores no espaço $\mathbb{R}^2$ e $\mathbb{R}^3$, soma, norma e Produto Escalar:
  $$\vec{u} \cdot \vec{v} = u_x v_x + u_y v_y + u_z v_z = |\vec{u}| |\vec{v}| \cos\theta$$
  Similaridade de cosseno em embeddings de IA (LLMs/RAG) e condição de ortogonalidade ($\vec{u} \cdot \vec{v} = 0 \iff \theta = 90^\circ$).

#### 2. Habilidades Operacionais Exigidas:
1. Desenhar mentalmente o sistema de coordenadas de tela com o eixo $Y$ invertido, ajustando o sinal do coeficiente angular sem confundir com o plano cartesiano tradicional de René Descartes.
2. Calcular determinantes $3 \times 3$ por Sarrus em menos de 2 minutos mantendo rigor absoluto no controle dos sinais negativos da diagonal secundária.
3. Determinar o número de arestas e vértices de malhas 3D poligonais fechadas utilizando as fórmulas conjugadas de Euler e compartilhamento de arestas.
4. Extrair a similaridade de cosseno entre dois vetores dividindo o produto escalar pelo produto de suas normas euclidianas.

#### 3. Teste de Retenção & Checagem:
* *Check 1:* Um sprite em um jogo move-se do pixel $A(50, 100)$ até o pixel $B(250, 20)$. A reta que descreve sua trajetória tem coeficiente angular positivo ou negativo no referencial de tela? (Resposta: Negativo, pois $m = \frac{20 - 100}{250 - 50} = \frac{-80}{200} = -0,4$).
* *Check 2:* Uma peça para impressão 3D é modelada como um poliedro convexo com 20 faces triangulares e 12 faces pentagonais. Quantos vértices e arestas possui a peça? (Resposta: $2A = 20 \times 3 + 12 \times 5 = 120 \implies A = 60$. $V = A + 2 - F = 60 + 2 - 32 = 30$ vértices).
* *Check 3:* Dois vetores de embedding textual são dados por $\vec{u} = (1, 2, 2)$ e $\vec{v} = (2, 2, 1)$. Qual é o cosseno do ângulo entre eles? (Resposta: $|\vec{u}| = \sqrt{1+4+4} = 3$, $|\vec{v}| = 3$, $\vec{u} \cdot \vec{v} = 2+4+2 = 8 \implies \cos\theta = \frac{8}{9} \approx 0,889$).

---

## 4. Matriz de Auditoria de Cobertura 100% do ANEXO II

A tabela abaixo comprova a rastreabilidade total de cada um dos 17 objetos de conhecimento do ANEXO II nas lições do ecossistema:

| Item do ANEXO II Oficial | Tópico Formal da Banca | Lições de Cobertura Direta | Módulo na Trilha |
| :---: | :--- | :--- | :---: |
| **01** | Álgebra básica: produtos notáveis, fatoração, expressões e polinômios | 0010, 0011 | Módulo 2 |
| **02** | Análise combinatória: PFC, arranjos, permutações e combinações com repetição | 0001 | Módulo 3 |
| **03** | Aritmética básica: operações, juros, porcentagem e unidades | 0013 | Módulo 1 |
| **04** | Aritmética básica: bases de numeração e representações | 0017 | Módulo 1 |
| **05** | Conjuntos: relações, operações e diagrama de Venn | 0016 | Módulo 1 |
| **06** | Estatística: medidas de tendência central, dispersão e gráficos | 0007, 0015 | Módulo 3 |
| **07** | Funções: conceitos, cálculos de $f(x)$, composta e inversa | 0010 | Módulo 2 |
| **08** | Geometria Analítica: ponto, reta e circunferência em telas digitais | 0006, 0014 | Módulo 5 |
| **09** | Geometria Espacial: poliedros, prismas, cilindros, cones e esferas | 0018 | Módulo 5 |
| **10** | Geometria Plana: triângulos, polígonos, áreas e perímetros | 0018 | Módulo 5 |
| **11** | Matrizes e determinantes: operações, inversa e determinantes $2 \times 2$ e $3 \times 3$ | 0008 | Módulo 5 |
| **12** | Principais funções: Afim e Quadrática (Vértice de Lucro e Break-Even) | 0002, 0011 | Módulo 2 |
| **13** | Principais funções: Exponencial e Logarítmica | 0009, 0010 | Módulo 2 |
| **14** | Probabilidade: propriedades, multiplicativo e probabilidade condicional | 0004 | Módulo 3 |
| **15** | Raciocínio Lógico Matemático: conectivos, tabela-verdade e padrões | 0003 | Módulo 1 |
| **16** | Sequências: PA, PG, somatórios de Gauss e recorrências | 0005, 0012 | Módulo 4 |
| **17** | Trigonometria e Vetores: produto escalar, normas e ângulos | 0019 | Módulo 5 |

---

## 5. Plano Operacional de Execução Semanal (6 Semanas)

Para o estudante que mira Bolsas Integrais (100%), este é o plano semanal com carga horária e metas de entrega:

### Semana 1: Calibragem Inicial & Lógica Quant (Módulo 1)
* **Carga:** 10 horas de estudo e resolução ativa.
* **Lições:** 0003, 0013, 0016 e 0017.
* **Meta Prática:** Dominar tabela-verdade, calcular juros compostos sem calculadora, preencher diagramas de Venn triplos de dentro para fora e converter bases binário/hexadecimal de cabeça.
* **Simulado Semanal:** 1 simulado temático de Bloco 1 (5 questões com 1 descarte em 35 minutos). Meta: $\ge 3/4$ acertos nas respondidas.

### Semana 2: Domínio Algébrico de Funções & Startups (Módulo 2)
* **Carga:** 12 horas.
* **Lições:** 0002, 0010 e 0011.
* **Meta Prática:** Dominar a determinação de vértices de parábolas ($x_v, y_v$), pontos de break-even de startups SaaS e fatoração de polinômios com Briot-Ruffini.
* **Simulado Semanal:** 1 simulado temático de Funções (5 questões em 30 minutos). Meta: resolver afim em $< 4\text{ min}$ e quadrática em $< 6\text{ min}$.

### Semana 3: A Trilha Superior - Combinatória & Incerteza (Módulo 3)
* **Carga:** 12 horas.
* **Lições:** 0001, 0004, 0007 e 0015.
* **Meta Prática:** Reconhecer modelos combinatórios em menos de 60 segundos; montar árvores bayesianas com matriz de confusão em números inteiros; simplificar pesos em médias ponderadas de latência.
* **Simulado Semanal:** 1 simulado temático de Trilha Avançada (5 questões de alta discriminação em 25 minutos).

### Semana 4: Teste de Mesa, Algoritmos e Recorrências (Módulo 4)
* **Carga:** 10 horas.
* **Lições:** 0005, 0009 e 0012.
* **Meta Prática:** Gabaritar teste de mesa de laços com acumuladores, aplicar Soma de Gauss em loops dependentes e determinar passos de busca binária por $\log_2$.
* **Simulado Semanal:** 1 simulado temático de Algoritmos e Sequências (5 questões em 25 minutos).

### Semana 5: Espaço Digital, Matrizes e Vetores (Módulo 5)
* **Carga:** 14 horas.
* **Lições:** 0006, 0008, 0014, 0018 e 0019.
* **Meta Prática:** Operar com fluência no referencial de telas com $Y$ invertido; calcular determinantes $3 \times 3$ rapidamente; aplicar Euler $V - A + F = 2$ em sólidos 3D; calcular similaridade de cosseno via produto escalar.
* **Simulado Semanal:** 1 simulado temático de Geometria e Álgebra Linear (5 questões em 25 minutos).

### Semana 6: Baterias Globais com Prova Adaptativa Completa
* **Carga:** 16 horas.
* **Atividades:** 3 Simulados Globais no modelo idêntico ao oficial:
  * 4 blocos de 5 questões cada (total 20 questões).
  * Cronômetro estrito de 120 minutos (35m + 30m + 25m + 25m + 5m revisão).
  * Execução obrigatória do **1 descarte por bloco**.
  * Auditoria de consistência TRI das respostas.
