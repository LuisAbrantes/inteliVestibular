Auditoria Inteli 2027 em curso — verificando matriz oficial contra as 15 lições e montando sua trilha em 5 módulos.
# PARECER TÉCNICO-PEDAGÓGICO — Conformidade Edital Inteli 2027 (Anexo II) vs. Harness

**Emitente:** Muse Spark 1.3 — Auditoria Pedagógica Sênior
**Objeto:** Matriz oficial (13 itens condensados / 17 itens literais do Anexo II) × Mapeamento de 148 questões × 15 lições ativas
**Fontes verificadas no repositório:** `docs/edital-vestibular.md:371-473`, `docs/mapeamento-completo-questoes.md:10-30`, `docs/analise-conteudos-provas.md:42-55`, `lessons/*.html`

> **Veredito formal: NÃO 100% conforme. Conforme com ressalvas — ~72% coberto, 28% com lacunas críticas.**
> Não podemos atestar 100% sem incorrer em falsa conformidade. Abaixo o detalhamento e o caminho para 100%.

---

## 1. Auditoria da matriz oficial

Sua lista de 13 itens é uma **condensação correta** dos 17 tópicos literais do Anexo II transcritos em `docs/mapeamento-completo-questoes.md:12-30` e detalhados em `docs/edital-vestibular.md:377-472`:

| Seu item (13) | Item literal Anexo II (17) | Status |
|---|---|---|
| 1. Álgebra e polinômios | Álgebra básica + polinômios | ⚠️ Parcial |
| 2. Combinatória | Combinatória (PFC, aditivo, arranjos, permutações, C simples/com repetição) | ✅ Conforme |
| 3. Aritmética e bases 2/10/16, % e juros | Aritmética básica | ⚠️ Parcial — bases e juros diluídos, sem lição dedicada |
| 4. Conjuntos e Venn | Conjuntos | ❌ **Lacuna — nenhuma lição dedicada** |
| 5. Estatística | Estatística | ✅ Conforme |
| 6. Funções (afim, quadrática, exp, log, inversa, composta) | Funções + Principais funções | ✅ Conforme no núcleo, ⚠️ exp/log/inversa fracos |
| 7. Geometria Analítica e Plana | Geometria Analítica + Geometria Plana | ⚠️ Analítica ✅, Plana ❌ (Tales, Pitágoras, polígonos, círculo ausentes) |
| 8. Geometria Espacial | Geometria Espacial | ❌ **Lacuna real — `lessons/0014-*` é duplicata de telas, não volumes 3D** |
| 9. Matrizes, determinantes e S.L. | Matrizes e determinantes + Sistemas Lineares | ⚠️ Matrizes RGB/YUV ✅, determinantes 2x2/3x3 Sarrus e SPD/SPI/SI ⚠️ |
| 10. Probabilidade, condicional, Bayes | Probabilidade | ✅ Conforme (ponto forte) |
| 11. Raciocínio Lógico | Raciocínio Lógico | ✅ Conforme |
| 12. Sequências (PA, PG, somatórios, recorrências) | Sequências | ✅ Conforme |
| 13. Trigonometria e Vetores | Trigonometria + Vetores | ❌ **Lacuna — sem lição dedicada (sen/cos, ciclo, produto escalar)** |

**Três lacunas eliminatórias para 100%:** Conjuntos/Venn, Geometria Plana, Trigonometria+Vetores. Uma lacuna operacional: Geometria Espacial anunciada mas não entregue.

## 2. Auditoria do mapeamento de 148 questões

Seu mapeamento (22%+18%+16%+14%+12%+8%+6%+4% = 100%) é **pedagogicamente válido como visão tech-contextual**, e o total 148 = 24+24+24+76 confere com `docs/mapeamento-completo-questoes.md:86-116`.

Divergência a corrigir na plataforma: os docs internos usam outra categorização:

- `docs/analise-conteudos-provas.md:46-54`: Funções 22%, Combinatória 15%, Prob+Est 15%, Lógica 12%, Algoritmos 11%, Geo Analítica 10%, Sist. Numeração 7%, Geo Espacial 5%, Mat. Financeira 3%.
- `docs/mapeamento-completo-questoes.md:56-68`: Geometria Analítica e Vetores 36,5% (54/148) por contar todo contexto de telas/pixels como geometria.

Ou seja: seu 18% de Lógica e 16% de Combinatória **superestimam** a frequência literal do Anexo II e **subestimam** Geometria de Telas. Para TRI isso importa: Blocos 1-2 têm peso maior na nota-base (`docs/edital-vestibular.md:152-155`). Recomendo manter seu mapa como "camada tech", mas adicionar a "camada Anexo II" com os 17 tópicos para não confundir a banca.

## 3. Auditoria das 15 lições — problema de duplicatas

Verificação por `<title>` dos HTML:

- Únicas reais (9): `0001`, `0002`, `0003`, `0004`, `0005`, `0006`, `0007`, `0008`, `0010`, `0013`
- Duplicatas literais: `0005=0009=0012` (mesmo título Loops/Busca Binária/Gauss), `0002=0011`, `0006=0014`, `0007=0015`

Consequência: o anunciado `0014 Geometria Espacial: Volumes e Impressão 3D` **não existe** — o arquivo é `Geometria Analítica: Telas...`. Idem `0015 Estatística Avançada` é cópia da `0007`. `0011` não é Break-Even novo, é cópia da `0002`.

---

# TRILHA INTELIGENTE OFICIAL INTELI 2027 — 5 Módulos Progressivos

Princípio ordenador: **peso TRI (Bloco 1→4) + dependência conceitual (fundamento → proficiência máxima)**. Do cálculo seguro sem calculadora científica à trilha superior (Bayes cumulativo, CR com repetição, matriz 3x3, polinômio grau 3-5).

## MÓDULO 1 — Fundamentos Quant-Tech (Bloco 1 — Calibragem)
**Objetivo:** garantir >50% no Bloco 1 e travar trilha alta desde o início. Precisão aritmética + linguagem lógica.

- Lições: `0003` Lógica Proposicional, `0013` Finanças Tech (MRR/CAC/LTV/juros), `0007-base` Estatística Descritiva (média/mediana)
- **A criar urgente:** `0016 Conjuntos e Venn Tech` (Python/JS/C++ users, filtros SQL), `0017 Bases Numéricas` (bin/hex, bits vs bytes, XOR, potências de 2)
- Teste de retenção: 10 questões Bloco-1 (7 min/q): 3 Venn triplo, 3 tabela-verdade, 2 bases, 2 break-even. Meta: ≥8/10. Se <5, não avançar.

## MÓDULO 2 — Funções e Otimização (22% — Coração da prova)
**Objetivo:** modelar custo/receita/lucro e achar vértice/máximo sem hesitar.

- Lições: `0010` Funções e Polinômios (reforçar Briot-Ruffini, resto, raízes racionais), `0002/0011` Quadrática e Vértice (consolidar em 1, transformar outra em Break-Even SaaS puro), complemento exp/log (`log2` busca binária)
- Teste: 12 questões: 4 afim (SaaS R$50k fixo + R$20 variável), 4 quadrática (INTE3, trajetória drone), 2 exponencial, 2 polinômio grau 4 (ex.: `x⁴-2x³-7x²+8x+62=50`). Meta: resolver afim <4 min, quadrática <6 min.

## MÓDULO 3 — Contagem e Incerteza (Trilha Superior)
**Objetivo:** dominar os dois diferenciadores de nota alta: combinação com repetição e Bayes.

- Lições: `0001` Combinatória (PFC, senhas, anagramas INTELI, hash `CR₁₀⁸=C₁₇⁸=24.310`), `0004` Bayes/Naive Bayes (spam link+imagem), `0015-real` Dispersão (desvio amostral vs populacional, benchmarks nuvem)
- Teste: 10 questões: 4 contagem (1 stars-and-bars), 4 Bayes/condicional (1 com normalização), 2 desvio. Meta: identificar em <60s se é arranjo vs combinação com repetição; não inverter `P(A|B)`.

## MÓDULO 4 — Pensamento Algorítmico e Sequências
**Objetivo:** rastrear loops e somar PA em piloto automático; ler recorrência como código.

- Lições: consolidar `0005/0009/0012` em trilha única (`0005` Loops+Gauss `n(n+1)/2`, `0009` Complexidade `O(n²)/O(log n)`, `0012` Recorrências 1ª ordem + alça Excel) + `0009` Pensamento Computacional
- Teste: 8 questões: Selection Sort N=10 → 45 comparações [(N-1)+...+1 = N(N-1)/2 — padrão oficial do harness, cf. `reference/logica-computacional.html`; errata 2027.2: o "55 ops" anterior usava a convenção n(n+1)/2 de laço até N], busca binária N=524.288 → 19 passos (`log2`), PA/PG planilha, 2 recorrências. Meta: 100% em somatórios.

## MÓDULO 5 — Geometria Tech e Álgebra Linear (Fechamento TRI)
**Objetivo:** imunidade aos distratores de referencial invertido e matrizes.

- Lições: `0006/0014` Telas Y-invertido (reta `(0,0)→(400,600)`, `y=3/2x`), `0008` Matrizes RGB→YUV (pixel preto invariante, isolar coluna)
- **A criar urgente:** `0018 Geometria Plana+Espacial` (Tales, Pitágoras, áreas por decomposição, prisma/cilindro/pirâmide/cone/esfera, Euler `V-A+F=2`, tronco impressão 3D), `0019 Trigonometria+Vetores` (triângulo retângulo, ciclo, soma/decomposição, dot product e ângulo)
- Teste final TRI: **simulado 20q/120min, 4 blocos, 1 descarte obrigatório por bloco** (`docs/edital-vestibular.md:157-159`): B1 35-40min, B2 30min, B3 25-30min, B4 20-25min. Regra >50% para subir de trilha. Meta: ≥14/20 com ≥4/5 no B1.

---

## 4. Plano mínimo para declarar 100%

1. Desduplicar: fundir `0005/0009/0012`, `0002/0011`, `0006/0014`, `0007/0015` — libera 4 slots.
2. Criar nesta ordem: `0016 Conjuntos/Venn`, `0018 Geo Plana+Espacial`, `0019 Trig/Vetores`, `0017 Bases Numéricas`. Reforçar determinantes/Sarrus e S.L. dentro da `0008`.
3. Alinhar `platform/app.js` + catálogo Aba 2 à ordem M1→M5 acima, com tags `Bloco 1/2/3/4` e `TRI-alta`.

Com isso, o harness cobre os 17 tópicos literais do Anexo II sem lacunas e sustenta o discurso de conformidade total.
