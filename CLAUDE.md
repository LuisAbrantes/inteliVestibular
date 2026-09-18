# CLAUDE.md — Inteli Vestibular & Bolsa Study Harness

## Visão Geral
Este repositório é o **Harness Completo de Estudos, Simulados e Auto-Aprimoramento para o Vestibular e Programa de Bolsas de Estudo do Inteli**.

O ecossistema é unificado: provas oficiais, editais, gabaritos comentados, lições interativas Tufte e motor de auto-evolução estão todos interligados na interface web (`platform/`) e no CLI (`bin/inteli.mjs`).

## Comandos Rápidos
- **Iniciar Plataforma Web**: `npm start` ou `node bin/serve-platform.mjs` (abre em `http://localhost:3000/`)
- **Painel de Telemetria**: `node bin/inteli.mjs status`
- **Auto-Evolução Baseada no Uso**: `node bin/inteli.mjs evolve`
- **Auditoria de Saúde do Harness**: `node bin/inteli.mjs health`
- **Central de Prompts do Agente OMP**: `node bin/inteli.mjs agent`
- **Fazer Questão Rápida no Terminal**: `node bin/inteli.mjs quiz [topico]`
- **Gerar Lição Sob Demanda**: `node bin/generate-lesson.mjs <topico>`
- **Rodar Avaliações Pedagógicas (Evals)**: `npm run eval` ou `node bin/eval-lesson.mjs --all`
- **Executar Bateria de Testes**: `npm test`
- **Consultar Dúvidas nos Editais**: `node bin/inteli.mjs ask "<duvida>"`

## Estrutura Integrada do Repositório
- `data/raw/`: 9 PDFs originais oficiais baixados do Inteli (Provas, Gabarito Comentado 2025.1, Editais 2025/2026/2027, Book de Bolsistas).
- `data/extracted/`: Textos integrais extraídos dos PDFs para processamento e busca.
- `docs/`:
  - `docs/edital-vestibular.md`: Guia definitivo do vestibular, cursos, eixos holísticos, pesos e régua adaptativa.
  - `docs/edital-bolsa.md`: Regulamento de bolsas (100% e 50%), critérios de renda per capita, moradia, notebook e etapas.
  - `docs/analise-conteudos-provas.md`: Taxonomia das 72 questões oficiais, incidência de tópicos e perfil dos distratores.
  - `docs/guia-preparacao.md`: Plano tático de 8 semanas, redações no método STAR e preparação da dinâmica.
- `platform/`: Portal unificado com 7 abas:
  - Aba 1: *Simulados & Treinos* (4 modos de prova interativa)
  - Aba 2: *Aulas Tufte* (Catálogo de lições com busca e filtros)
  - Aba 3: *Editais & Guias* (Leitor interativo com Markdown e KaTeX)
  - Aba 4: *PDFs Oficiais* (Biblioteca de arquivos originais para download)
  - Aba 5: *Folhas de Consulta* (Cheat sheets para revisão rápida)
  - Aba 6: *Auto-Evolução do Harness* (Painel de telemetria e botão de aprimoramento)
  - Aba 7: *Central do Agente OMP* (Prompts prontos com botão de cópia)
- `lessons/`: 15 lições interativas no padrão Edward Tufte geradas sob demanda com questionários interativos de recuperação ativa.
- `src/lessons/generator.mjs`: Motor de geração de lições sob demanda.
- `src/evals/evaluator.mjs`: Suíte de avaliação de qualidade pedagógica (0 a 100).
- `src/evals/harness-evolver.mjs`: Motor de auto-evolução contínua que diagnostica lacunas a partir do uso do aluno e gera as aulas necessárias.
- `reference/`: Folhas de consulta rápida em HTML (Matemática, Lógica, Finanças).
- `MISSION.md`, `RESOURCES.md`, `GLOSSARY.md`, `NOTES.md`: Framework de aprendizagem Matt Pocock (`teach`).
- `learning-records/`: Registros de evolução do candidato.

## Papel do Agente OMP (Sem APIs Externas)
Você (Agente OMP) é o motor de inteligência deste harness. Todas as tarefas avançadas (simulação de banca de bolsa, revisão crítica de redações de liderança pelo método STAR, desmistificação de erros em simulados e criação de novas lições) são executadas por você diretamente através dos modelos e assinaturas locais já integrados no seu ambiente.
