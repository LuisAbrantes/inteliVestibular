/**
 * ============================================================================
 * Inteli Pedagogical Engine - Interactive Quiz Component (assets/quiz.js)
 * ============================================================================
 * Features:
 * - Instant evaluation on option click
 * - Immediate feedback display (.quiz-feedback)
 * - Step-by-step resolution display (.quiz-resolution)
 * - Persistent score tracking per container
 * - Custom DOM event dispatching: 'quiz:answered' & 'quiz:completed'
 * - Accessible, keyboard friendly, no external dependencies
 */

(function () {
  'use strict';

  class QuizController {
    constructor(container) {
      this.container = container;
      this.questions = Array.from(container.querySelectorAll('.quiz-question'));
      this.totalQuestions = this.questions.length;
      this.answeredCount = 0;
      this.correctCount = 0;
      this.answers = {};

      this.scoreBanner = container.querySelector('.quiz-score-banner');
      this.init();
    }

    init() {
      if (this.totalQuestions === 0) return;

      this.updateScoreBanner();

      this.questions.forEach((qEl, index) => {
        const qId = qEl.getAttribute('data-question-id') || `q${index + 1}`;
        const options = Array.from(qEl.querySelectorAll('.quiz-option'));

        options.forEach((optBtn) => {
          optBtn.addEventListener('click', () => {
            this.handleOptionSelect(qEl, qId, optBtn, options);
          });
        });
      });
    }

    handleOptionSelect(qEl, qId, selectedBtn, allOptions) {
      if (this.answers[qId]) {
        return; // Already answered
      }

      const isCorrect = selectedBtn.getAttribute('data-correct') === 'true';
      const feedbackMsg = selectedBtn.getAttribute('data-feedback') || 
        (isCorrect ? 'Correto! Excelente raciocínio.' : 'Incorreto. Veja a resolução detalhada abaixo.');

      // Lock all options for this question
      allOptions.forEach((btn) => {
        btn.disabled = true;
        const optIsCorrect = btn.getAttribute('data-correct') === 'true';
        if (optIsCorrect && !isCorrect) {
          btn.classList.add('unselected-correct');
        }
      });

      if (isCorrect) {
        selectedBtn.classList.add('correct');
        this.correctCount++;
      } else {
        selectedBtn.classList.add('incorrect');
      }

      this.answeredCount++;
      this.answers[qId] = {
        isCorrect,
        selectedOption: selectedBtn.textContent.trim(),
      };

      // Show instant feedback
      let feedbackEl = qEl.querySelector('.quiz-feedback');
      if (!feedbackEl) {
        feedbackEl = document.createElement('div');
        feedbackEl.className = 'quiz-feedback';
        qEl.appendChild(feedbackEl);
      }
      feedbackEl.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
      feedbackEl.innerHTML = `<strong>${isCorrect ? '✓ Acerto' : '✗ Atenção'}</strong>: ${feedbackMsg}`;

      // Reveal step-by-step resolution
      const resolutionEl = qEl.querySelector('.quiz-resolution');
      if (resolutionEl) {
        resolutionEl.classList.add('visible');
      }

      this.updateScoreBanner();

      // Dispatch 'quiz:answered' event
      const answeredEvent = new CustomEvent('quiz:answered', {
        bubbles: true,
        detail: {
          questionId: qId,
          isCorrect,
          score: this.correctCount,
          totalAnswered: this.answeredCount,
          totalQuestions: this.totalQuestions,
        },
      });
      this.container.dispatchEvent(answeredEvent);

      // Check for completion
      if (this.answeredCount === this.totalQuestions) {
        this.handleQuizCompleted();
      }
    }

    updateScoreBanner() {
      if (!this.scoreBanner) return;

      const scoreTextEl = this.scoreBanner.querySelector('.score-text') || this.scoreBanner;
      const pct = this.answeredCount > 0 ? Math.round((this.correctCount / this.answeredCount) * 100) : 0;

      if (this.scoreBanner.querySelector('.score-badge')) {
        this.scoreBanner.querySelector('.score-badge').textContent = `${this.correctCount}/${this.totalQuestions} (${pct}%)`;
      } else {
        scoreTextEl.innerHTML = `Progresso do Treino: <strong>${this.answeredCount}/${this.totalQuestions} respondidas</strong> | Acertos: <strong>${this.correctCount}</strong> (${pct}%)`;
      }
    }

    handleQuizCompleted() {
      const percentage = Math.round((this.correctCount / this.totalQuestions) * 100);
      const passed = percentage >= 75; // Threshold for Inteli Upper Track readiness

      if (this.scoreBanner) {
        this.scoreBanner.style.borderColor = passed ? 'var(--quiz-correct-border)' : 'var(--quiz-wrong-border)';
      }

      const completedEvent = new CustomEvent('quiz:completed', {
        bubbles: true,
        detail: {
          score: this.correctCount,
          totalQuestions: this.totalQuestions,
          percentage,
          passed,
          summary: `Treino finalizado: ${this.correctCount} de ${this.totalQuestions} acertos (${percentage}%). ${passed ? 'Prontidão para Trilha Superior!' : 'Recomenda-se revisar as resoluções e conceitos.'}`,
        },
      });
      this.container.dispatchEvent(completedEvent);
    }
  }

  // ==========================================================================
  // Global Theme Management for Lessons (Dark & Light Anthropic Modes)
  // ==========================================================================
  function initLessonTheme() {
    const savedTheme = localStorage.getItem('inteli_theme') || 'dark';
    const root = document.documentElement;

    function applyTheme(theme) {
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
      const toggleBtn = document.getElementById('btn-theme-toggle') || document.querySelector('.btn-theme-toggle');
      if (toggleBtn) {
        toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        toggleBtn.setAttribute('title', theme === 'dark' ? 'Alternar para Modo Claro (Anthropic Parchment)' : 'Alternar para Modo Escuro (Claude.ai)');
      }
    }

    applyTheme(savedTheme);

    const toggleBtn = document.getElementById('btn-theme-toggle') || document.querySelector('.btn-theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isLight = root.classList.contains('light') || root.getAttribute('data-theme') === 'light';
        applyTheme(isLight ? 'dark' : 'light');
      });
    }
  }

  // Auto initialize on DOM ready
  function initAll() {
    initAllQuizzes();
    initLessonTheme();
  }

  function initAllQuizzes() {
    const containers = document.querySelectorAll('.quiz-container, [data-quiz]');
    containers.forEach((c) => new QuizController(c));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Global namespace export
  window.InteliQuiz = {
    init: (container) => new QuizController(container),
    initAll: initAllQuizzes,
  };
})();
