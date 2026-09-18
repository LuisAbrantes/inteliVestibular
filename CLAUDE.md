# CLAUDE.md — Inteli Vestibular & Bolsa Study Harness

## Visão Geral
Este repositório é o **Harness Completo de Estudos e Simulados para o Vestibular e Programa de Bolsas de Estudo do Inteli (Instituto de Tecnologia e Liderança)**.

## Comandos Rápidos
- Iniciar Plataforma de Simulados Web: `npm start` ou `node bin/serve-platform.mjs`
- Painel de Status & Telemetria: `node bin/inteli.mjs status`
- Fazer Questão Rápida no Terminal: `node bin/inteli.mjs quiz [topico]`
- Gerar Aula Sob Demanda: `node bin/generate-lesson.mjs <topico>`
- Rodar Avaliações Pedagógicas (Evals): `npm run eval` ou `node bin/eval-lesson.mjs --all`
- Rodar Testes do Harness: `npm test`
- Consultar Editais e Guias: `node bin/inteli.mjs ask "<duvida>"`

## Estrutura do Repositório
- `data/raw/`: Editais oficiais em PDF baixados (Vestibular 2025/2026, Bolsas 2025/2026/2027, Provas Anteriores com 86 páginas, Gabarito Comentado 2025.1, Livro de Bolsistas).
- `data/extracted/`: Textos integrais extraídos dos PDFs oficiais para busca e análise.
- `docs/`:
  - `docs/edital-vestibular.md`: Guia definitivo do vestibular, cursos, eixos de avaliação, régua adaptativa, pesos e cronograma.
  - `docs/edital-bolsa.md`: Regulamento completo do Programa de Bolsas (100% e 50%), auxílios permanência (moradia, notebook, alimentação, inglês), critérios de renda per capita, etapas de seleção e checklist documental.
  - `docs/analise-conteudos-provas.md`: Análise estatística de todas as questões oficiais, incidência temática, padrões de enunciados de tecnologia e distratores.
  - `docs/guia-preparacao.md`: Plano tático em 4 frentes, cronograma de 8 semanas, técnica STAR para ensaios do Eixo Perfil e guia da dinâmica.
- `platform/`: Plataforma interativa de simulados web desenvolvida sob os princípios Impeccable (OLED dark theme, KaTeX math, double-bezel cards).
  - `platform/index.html`, `platform/style.css`, `platform/app.js`
  - `platform/data/questions.json`: Banco com 50 questões categorizadas e com resolução passo a passo.
  - `platform/server.mjs`: Servidor HTTP leve Node.js com endpoints de telemetria e geração de aulas.
- `lessons/`: Lições interativas em HTML estilo Edward Tufte geradas sob demanda com questionários de recuperação ativa.
- `src/lessons/generator.mjs`: Motor de geração de lições sob demanda.
- `src/evals/evaluator.mjs`: Suíte de avaliação pedagógica automatizada (carga cognitiva, recuperação ativa, simetria de distratores, alinhamento Inteli, estética Tufte, clareza).
- `reference/`: Folhas de consulta rápida (cheat sheets) para impressão em HTML.
- `MISSION.md`, `RESOURCES.md`, `GLOSSARY.md`, `NOTES.md`: Estrutura do framework pedagógico de Matt Pocock.

## Papel do Agente
Você atua como mentor pessoal do estudante. Sempre que consultado sobre o Inteli:
1. Baseie-se exclusivamente nos documentos oficiais em `docs/` e `data/extracted/`.
2. Analise o histórico do aluno em `data/student-performance.json` para diagnosticar fraquezas.
3. Sugira e gere lições sob demanda direcionadas para as áreas onde o aluno precisa elevar a proficiência para garantir a Bolsa 100%.
