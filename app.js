/**
 * ChessMastery - Main Application Logic & SPA Controller
 */

// Initial App State from LocalStorage
const DEFAULT_STATE = {
  completedLessons: [],
  puzzlesSolved: [],
  puzzleRating: 800,
  streakDays: 1,
  lastActiveDate: new Date().toDateString(),
  botGames: {
    played: 0,
    wins: 0,
    losses: 0,
    draws: 0
  },
  customNotes: []
};

class ChessApp {
  constructor() {
    this.state = this.loadState();
    this.engine = new ChessEngine();
    this.audio = new ChessAudio();
    this.playBoard = null;
    this.tacticsBoard = null;
    this.lessonBoard = null;
    this.currentDifficulty = 2;
    this.playerColor = 'white';
    this.activePuzzleIndex = 0;
    this.currentLesson = null;
    this.currentLessonPuzzleIndex = 0;

    this.init();
  }

  loadState() {
    try {
      const saved = localStorage.getItem('chess_mastery_state');
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error loading state:', e);
    }
    return { ...DEFAULT_STATE };
  }

  saveState() {
    try {
      localStorage.setItem('chess_mastery_state', JSON.stringify(this.state));
      this.updateGlobalProgress();
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }

  init() {
    this.checkStreak();
    this.setupRouting();
    this.renderDashboard();
    this.renderLessons('day1');
    this.renderLessons('day2');
    this.renderRepertoire();
    this.initPlayBoard();
    this.initTacticsBoard();
    this.updateGlobalProgress();
  }

  checkStreak() {
    const today = new Date().toDateString();
    if (this.state.lastActiveDate !== today) {
      this.state.streakDays += 1;
      this.state.lastActiveDate = today;
      this.saveState();
    }
  }

  setupRouting() {
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Initial route
    if (!window.location.hash) {
      window.location.hash = '#dashboard';
    } else {
      this.handleRoute();
    }

    // Sidebar & Mobile bottom navigation link handler
    document.querySelectorAll('.nav-item a, .mobile-bottom-nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href) {
          window.location.hash = href;
        }
      });
    });
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById(`view-${hash}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update active class on desktop sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === `#${hash}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update active class on mobile bottom nav
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      if (item.getAttribute('href') === `#${hash}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Scroll to top of content on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (hash === 'dashboard') {
      this.renderDashboard();
    }
  }

  updateGlobalProgress() {
    const totalLessons = LESSONS_DATA.length;
    const completedCount = this.state.completedLessons.length;
    const pct = Math.round((completedCount / totalLessons) * 100);

    const fillElem = document.getElementById('sidebar-progress-fill');
    const textElem = document.getElementById('sidebar-progress-text');
    const mobileStreak = document.getElementById('mobile-streak-val');

    if (fillElem) fillElem.style.width = `${pct}%`;
    if (textElem) textElem.innerText = `${pct}% Selesai`;
    if (mobileStreak) mobileStreak.innerText = `${this.state.streakDays}d`;
  }

  /* ==========================================================================
     Dashboard Rendering
     ========================================================================== */
  renderDashboard() {
    const totalLessons = LESSONS_DATA.length;
    const completedCount = this.state.completedLessons.length;
    const pct = Math.round((completedCount / totalLessons) * 100);

    const day1Total = LESSONS_DATA.filter(l => l.day === 1).length;
    const day1Completed = this.state.completedLessons.filter(id => {
      const l = LESSONS_DATA.find(x => x.id === id);
      return l && l.day === 1;
    }).length;

    const day2Total = LESSONS_DATA.filter(l => l.day === 2).length;
    const day2Completed = this.state.completedLessons.filter(id => {
      const l = LESSONS_DATA.find(x => x.id === id);
      return l && l.day === 2;
    }).length;

    // Quick Stats
    const elCoursePct = document.getElementById('dash-course-pct');
    const elStreak = document.getElementById('dash-streak-count');
    const elPuzzles = document.getElementById('dash-puzzles-count');
    const elWinRate = document.getElementById('dash-win-rate');

    if (elCoursePct) elCoursePct.innerText = `${pct}%`;
    if (elStreak) elStreak.innerText = `${this.state.streakDays} Hari`;
    if (elPuzzles) elPuzzles.innerText = this.state.puzzlesSolved.length;

    const totalGames = this.state.botGames.played;
    const winRate = totalGames > 0 ? Math.round((this.state.botGames.wins / totalGames) * 100) : 0;
    if (elWinRate) elWinRate.innerText = `${winRate}% (${totalGames} Game)`;

    // Day Progress Bars
    const elDay1Bar = document.getElementById('dash-day1-bar');
    const elDay1Text = document.getElementById('dash-day1-text');
    const elDay2Bar = document.getElementById('dash-day2-bar');
    const elDay2Text = document.getElementById('dash-day2-text');

    if (elDay1Bar) elDay1Bar.style.width = `${(day1Completed / day1Total) * 100}%`;
    if (elDay1Text) elDay1Text.innerText = `${day1Completed}/${day1Total} Lessons Selesai`;

    if (elDay2Bar) elDay2Bar.style.width = `${(day2Completed / day2Total) * 100}%`;
    if (elDay2Text) elDay2Text.innerText = `${day2Completed}/${day2Total} Lessons Selesai`;

    // Random GM Quote
    const quoteObj = GM_QUOTES[Math.floor(Math.random() * GM_QUOTES.length)];
    const elQuoteText = document.getElementById('dash-quote-text');
    const elQuoteAuthor = document.getElementById('dash-quote-author');
    if (elQuoteText && quoteObj) {
      elQuoteText.innerText = `"${quoteObj.quote}"`;
      elQuoteAuthor.innerText = `— ${quoteObj.author}`;
    }
  }

  /* ==========================================================================
     Lessons & Crash Course Handling
     ========================================================================== */
  renderLessons(targetContainerId) {
    const container = document.getElementById(targetContainerId);
    if (!container) return;

    const dayNum = targetContainerId === 'day1' ? 1 : 2;
    const lessons = LESSONS_DATA.filter(l => l.day === dayNum);

    container.innerHTML = lessons.map(l => {
      const isCompleted = this.state.completedLessons.includes(l.id);
      return `
        <div class="lesson-card ${isCompleted ? 'completed' : ''}" onclick="window.chessApp.openLessonModal(${l.id})">
          <div class="lesson-meta">
            <span class="lesson-number">Lesson ${l.id}</span>
            <span class="lesson-time">⏱️ ${l.duration}</span>
          </div>
          <h3>${l.icon} ${l.title}</h3>
          <p>${l.subtitle}</p>
          <div class="lesson-footer">
            <span class="lesson-tag">${l.category}</span>
            <span class="btn-sm-action">Buka Pelajaran →</span>
          </div>
        </div>
      `;
    }).join('');
  }

  openLessonModal(lessonId) {
    const lesson = LESSONS_DATA.find(l => l.id === lessonId);
    if (!lesson) return;

    this.currentLesson = lesson;
    this.currentLessonPuzzleIndex = 0;

    const modal = document.createElement('div');
    modal.className = 'lesson-modal-backdrop';
    modal.id = 'lesson-active-modal';

    const isCompleted = this.state.completedLessons.includes(lesson.id);

    modal.innerHTML = `
      <div class="lesson-modal">
        <div class="lesson-modal-header">
          <h2>${lesson.icon} Lesson ${lesson.id}: ${lesson.title}</h2>
          <button class="btn-close-modal" onclick="window.chessApp.closeLessonModal()">✕</button>
        </div>
        <div class="lesson-modal-body">
          <div class="lesson-theory">
            ${lesson.theory}
          </div>
          <div class="lesson-interactive-panel">
            <div class="lesson-puzzle-instruction" id="lesson-puzzle-instruction">
              ${lesson.puzzles && lesson.puzzles.length > 0 ? lesson.puzzles[0].instruction : 'Demonstrasi Posisi Papan'}
            </div>
            <div id="lesson-board-container"></div>
            <div class="puzzle-feedback" id="lesson-puzzle-feedback" style="margin-top:12px;width:100%;"></div>
          </div>
        </div>
        <div class="lesson-modal-footer">
          <button class="btn-game-action" onclick="window.chessApp.closeLessonModal()">Tutup</button>
          <button class="btn-game-action primary" id="btn-complete-lesson" onclick="window.chessApp.toggleLessonComplete(${lesson.id})">
            ${isCompleted ? '✓ Tandai Belum Selesai' : '✓ Selesai & Lanjut'}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Initialize board in lesson
    setTimeout(() => {
      this.lessonBoard = new ChessBoardComponent('lesson-board-container', {
        orientation: 'white',
        interactive: true,
        onMove: (move, game) => this.handleLessonMove(move, game)
      });

      if (lesson.puzzles && lesson.puzzles.length > 0) {
        this.lessonBoard.setPosition(lesson.puzzles[0].fen);
      } else {
        this.lessonBoard.setPosition(lesson.demoFen);
      }
    }, 50);
  }

  handleLessonMove(move, game) {
    if (!this.currentLesson || !this.currentLesson.puzzles) return;
    const puzzle = this.currentLesson.puzzles[this.currentLessonPuzzleIndex];
    if (!puzzle) return;

    const moveUci = move.from + move.to + (move.promotion || '');
    const expected = puzzle.solution[0];

    const feedback = document.getElementById('lesson-puzzle-feedback');

    if (moveUci === expected) {
      if (feedback) {
        feedback.className = 'puzzle-feedback success';
        feedback.innerText = '🎉 Luar biasa! Langkah Anda tepat!';
      }
      this.audio.playVictory();

      // Auto mark completed if it's the last puzzle
      if (!this.state.completedLessons.includes(this.currentLesson.id)) {
        this.state.completedLessons.push(this.currentLesson.id);
        this.saveState();
        this.renderLessons('day1');
        this.renderLessons('day2');
      }
    } else {
      if (feedback) {
        feedback.className = 'puzzle-feedback error';
        feedback.innerText = `❌ Kurang tepat. Petunjuk: ${puzzle.hint}`;
      }
      this.audio.playError();
      setTimeout(() => {
        this.lessonBoard.setPosition(puzzle.fen);
      }, 1000);
    }
  }

  toggleLessonComplete(lessonId) {
    if (this.state.completedLessons.includes(lessonId)) {
      this.state.completedLessons = this.state.completedLessons.filter(id => id !== lessonId);
    } else {
      this.state.completedLessons.push(lessonId);
      this.audio.playVictory();
    }
    this.saveState();
    this.renderLessons('day1');
    this.renderLessons('day2');
    this.renderDashboard();
    this.closeLessonModal();
  }

  closeLessonModal() {
    const modal = document.getElementById('lesson-active-modal');
    if (modal) {
      document.body.removeChild(modal);
    }
    this.currentLesson = null;
    this.lessonBoard = null;
  }

  /* ==========================================================================
     Play vs Bot Controller
     ========================================================================== */
  initPlayBoard() {
    const container = document.getElementById('play-board-container');
    if (!container) return;

    this.playBoard = new ChessBoardComponent('play-board-container', {
      orientation: this.playerColor,
      interactive: true,
      onMove: (move, game) => this.handlePlayerMove(move, game)
    });

    this.setupDifficultyButtons();
    this.updateEvalBar();
  }

  setupDifficultyButtons() {
    const buttons = document.querySelectorAll('.diff-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentDifficulty = parseInt(btn.getAttribute('data-level'), 10);
        
        const tag = document.getElementById('bot-difficulty-display');
        const names = ['', 'Level 1: Pemula (~400)', 'Level 2: Easy (~800)', 'Level 3: Medium (~1200)', 'Level 4: Hard (~1500)', 'Level 5: Master (~1800)'];
        if (tag) tag.innerText = names[this.currentDifficulty];
      });
    });
  }

  handlePlayerMove(move, game) {
    this.updateMoveHistory();
    this.updateCapturedDisplay();
    this.updateEvalBar();

    if (game.game_over()) {
      this.handleGameOver();
      return;
    }

    // Trigger Bot Move after slight delay
    const isBotTurn = (game.turn() === 'b' && this.playerColor === 'white') ||
                      (game.turn() === 'w' && this.playerColor === 'black');

    if (isBotTurn) {
      const statusText = document.getElementById('game-status-text');
      if (statusText) statusText.innerText = '🤖 Bot sedang berpikir...';

      setTimeout(() => {
        const botMove = this.engine.getBestMove(game, this.currentDifficulty);
        if (botMove) {
          this.playBoard.makeMove(botMove);
          this.updateMoveHistory();
          this.updateCapturedDisplay();
          this.updateEvalBar();

          if (game.game_over()) {
            this.handleGameOver();
          } else {
            if (statusText) statusText.innerText = 'Giliran Anda melangkah';
          }
        }
      }, 400);
    }
  }

  updateMoveHistory() {
    const list = document.getElementById('move-history-list');
    if (!list || !this.playBoard) return;

    const moves = this.playBoard.historyMoves;
    let html = '';
    for (let i = 0; i < moves.length; i += 2) {
      const moveNum = Math.floor(i / 2) + 1;
      const whiteMove = moves[i] || '';
      const blackMove = moves[i + 1] || '';
      html += `
        <div class="move-row">
          <span class="move-num">${moveNum}.</span>
          <span class="move-w">${whiteMove}</span>
          <span class="move-b">${blackMove}</span>
        </div>
      `;
    }
    list.innerHTML = html;
    list.scrollTop = list.scrollHeight;
  }

  updateCapturedDisplay() {
    const capWhiteBox = document.getElementById('captured-by-black');
    const capBlackBox = document.getElementById('captured-by-white');

    if (capWhiteBox && this.playBoard) {
      capWhiteBox.innerHTML = this.playBoard.capturedWhite.map(key => `<span class="cap-piece">${PIECE_SVGS[key]}</span>`).join('');
    }
    if (capBlackBox && this.playBoard) {
      capBlackBox.innerHTML = this.playBoard.capturedBlack.map(key => `<span class="cap-piece">${PIECE_SVGS[key]}</span>`).join('');
    }
  }

  updateEvalBar() {
    if (!this.playBoard) return;
    const score = this.engine.getEvaluationScore(this.playBoard.game);
    const bar = document.getElementById('eval-bar-white');
    const text = document.getElementById('eval-score-text');

    if (bar) bar.style.height = `${score}%`;
    if (text) text.innerText = `${score}%`;
  }

  handleGameOver() {
    const game = this.playBoard.game;
    let title = 'Permainan Berakhir';
    let message = '';
    let isWin = false;

    this.state.botGames.played++;

    if (game.in_checkmate()) {
      const winner = game.turn() === 'w' ? 'Black' : 'White';
      const playerWon = (winner === 'White' && this.playerColor === 'white') ||
                        (winner === 'Black' && this.playerColor === 'black');
      if (playerWon) {
        title = '🏆 Kemenangan Spektakuler!';
        message = 'Selamat! Anda berhasil melakukan Skakmat melawan bot!';
        this.state.botGames.wins++;
        this.audio.playVictory();
        isWin = true;
      } else {
        title = '💀 Skakmat!';
        message = 'Bot berhasil memenangkan pertandingan. Pelajari analisis kesalahan di bawah ini!';
        this.state.botGames.losses++;
        this.audio.playError();
      }
    } else if (game.in_stalemate()) {
      title = '🤝 Stalemate (Remis)';
      message = 'Permainan remis karena tidak ada langkah legal tanpa kondisi skak.';
      this.state.botGames.draws++;
    } else if (game.in_draw()) {
      title = '🤝 Remis (Draw)';
      message = 'Permainan berakhir seri (Threefold repetition / Material draw).';
      this.state.botGames.draws++;
    }

    this.saveState();
    this.renderDashboard();

    const statusText = document.getElementById('game-status-text');
    if (statusText) {
      statusText.innerHTML = `<strong>${title}</strong>: ${message} <button class="btn-sm-action" style="margin-left:8px;" onclick="window.chessApp.openGameAnalysisModal()">🔍 Buka Analisis Game</button>`;
    }

    // Automatically open the Post-Game Analysis Modal after short delay
    setTimeout(() => {
      this.openGameAnalysisModal(title, isWin);
    }, 250);
  }

  openGameAnalysisModal(customTitle = 'Analisis Pertandingan', isWin = false) {
    this.closeAnalysisModal();

    if (!this.playBoard || this.playBoard.historyMoves.length === 0) {
      alert('Belum ada langkah yang dimainkan pada game ini untuk dianalisis.');
      return;
    }

    const moves = this.playBoard.historyMoves;
    const analysis = this.engine.analyzeGame(moves, this.playerColor);
    this.lastAnalysis = analysis;
    this.analysisPly = analysis.positions.length > 0 ? analysis.positions.length - 1 : 0;

    const modal = document.createElement('div');
    modal.className = 'analysis-modal-backdrop';
    modal.id = 'game-analysis-modal';

    const momentsHtml = analysis.keyMoments.length > 0 ? analysis.keyMoments.map((km, idx) => {
      const badgeColor = km.classification === 'blunder' ? 'danger' : (km.classification === 'mistake' ? 'warning' : 'info');
      const badgeLabel = km.classification === 'blunder' ? '🔴 BLUNDER' : (km.classification === 'mistake' ? '🟠 MISTAKE' : '🟡 INACCURACY');
      return `
        <div class="analysis-moment-card" onclick="window.chessApp.inspectAnalysisMoment(${idx})">
          <div class="moment-card-header">
            <span class="moment-badge ${badgeColor}">${badgeLabel}</span>
            <span class="moment-move-num">Langkah ke-${km.moveNumber}</span>
          </div>
          <div class="moment-comparison">
            <span class="move-played">Dimainkan: <strong>${km.playerMove}</strong></span>
            <span class="move-best">Koreksi: <strong>${km.bestMove}</strong></span>
          </div>
          <p class="moment-desc">${km.explanation}</p>
          <div class="moment-footer">
            <span class="btn-inspect-link">👁️ Periksa Posisi Papan →</span>
          </div>
        </div>
      `;
    }).join('') : `<div style="text-align:center;padding:24px;color:var(--text-muted);">🎉 Luar biasa! Tidak ada blunder atau kesalahan fatal yang terdeteksi di pertandingan ini!</div>`;

    modal.innerHTML = `
      <div class="analysis-modal">
        <div class="analysis-modal-header">
          <div>
            <h2>🔍 Post-Game Analysis (Koreksi & Evaluasi)</h2>
            <p>${customTitle} • Tingkat Akurasi Anda: <strong style="color:var(--primary);">${analysis.accuracyPct}%</strong></p>
          </div>
          <button class="btn-close-modal" onclick="window.chessApp.closeAnalysisModal()">✕</button>
        </div>

        <div class="analysis-stats-bar">
          <div class="acc-stat-box">
            <span class="acc-val" style="color:var(--primary);">${analysis.accuracyPct}%</span>
            <span class="acc-lbl">Akurasi</span>
          </div>
          <div class="acc-stat-box">
            <span class="acc-val" style="color:var(--danger);">${analysis.blunders}</span>
            <span class="acc-lbl">Blunders</span>
          </div>
          <div class="acc-stat-box">
            <span class="acc-val" style="color:#f97316;">${analysis.mistakes}</span>
            <span class="acc-lbl">Mistakes</span>
          </div>
          <div class="acc-stat-box">
            <span class="acc-val" style="color:var(--accent-gold);">${analysis.inaccuracies}</span>
            <span class="acc-lbl">Inaccuracies</span>
          </div>
          <div class="acc-stat-box">
            <span class="acc-val" style="color:#38bdf8;">${analysis.bestMoves}</span>
            <span class="acc-lbl">Best Moves</span>
          </div>
        </div>

        <div class="analysis-modal-body">
          <!-- Left: Review Board -->
          <div class="analysis-board-side">
            <div id="analysis-board-container"></div>
            <div class="analysis-nav-controls">
              <button class="btn-step" onclick="window.chessApp.stepAnalysis(0)">⏮️</button>
              <button class="btn-step" onclick="window.chessApp.stepAnalysis(window.chessApp.analysisPly - 1)">◀</button>
              <span id="analysis-move-display" style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;">Langkah 1</span>
              <button class="btn-step" onclick="window.chessApp.stepAnalysis(window.chessApp.analysisPly + 1)">▶</button>
              <button class="btn-step" onclick="window.chessApp.stepAnalysis(${analysis.positions.length - 1})">⏭️</button>
            </div>
            <div id="analysis-eval-text" style="font-size:12px;color:var(--text-muted);text-align:center;">Evaluasi Posisi</div>
          </div>

          <!-- Right: Key Moments List -->
          <div class="analysis-moments-side">
            <h3 style="font-size:15px;margin-bottom:12px;color:#fff;display:flex;align-items:center;gap:6px;">
              <span>🚨</span> Momen Kritis & Rekomendasi Perbaikan (${analysis.keyMoments.length})
            </h3>
            <div class="analysis-moments-scroll">
              ${momentsHtml}
            </div>
          </div>
        </div>

        <div class="analysis-modal-footer">
          <button class="btn-game-action" onclick="window.chessApp.closeAnalysisModal()">Tutup</button>
          <button class="btn-game-action primary" onclick="window.chessApp.closeAnalysisModal(); window.chessApp.newGame('${this.playerColor}')">🎮 Main Lagi (Rematch)</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Initialize board synchronously after mounting modal
    this.analysisBoard = new ChessBoardComponent('analysis-board-container', {
      orientation: this.playerColor,
      interactive: false
    });

    if (analysis.keyMoments.length > 0) {
      // Focus on the first key blunder/mistake moment by default
      this.inspectAnalysisMoment(0);
    } else if (analysis.positions.length > 0) {
      this.stepAnalysis(this.analysisPly);
    }
  }

  inspectAnalysisMoment(idx) {
    if (!this.lastAnalysis || !this.lastAnalysis.keyMoments[idx]) return;
    const km = this.lastAnalysis.keyMoments[idx];
    
    if (this.analysisBoard) {
      this.analysisBoard.setPosition(km.fenBefore);
      // Highlight the blunder origin/target and the best move
      if (km.bestMoveFrom && km.bestMoveTo) {
        this.analysisBoard.setHint({ from: km.bestMoveFrom, to: km.bestMoveTo });
      }
      this.analysisPly = km.plyIndex;
      
      const moveDisplay = document.getElementById('analysis-move-display');
      const evalText = document.getElementById('analysis-eval-text');
      if (moveDisplay) moveDisplay.innerText = `Langkah ${km.moveNumber}. ${km.playerMove} (Koreksi: ${km.bestMove})`;
      if (evalText) {
        evalText.innerHTML = `
          <div style="background:rgba(239,68,68,0.15);border:1px solid var(--danger);padding:8px 12px;border-radius:6px;color:#fca5a5;font-size:12px;margin-top:6px;">
            <strong>${km.classification.toUpperCase()}</strong>: Dimainkan <em>${km.playerMove}</em>. Rekomendasi: <strong>${km.bestMove}</strong>.
            <div style="color:var(--text-main);margin-top:2px;">${km.explanation}</div>
          </div>
        `;
      }
    }
  }

  stepAnalysis(targetPly) {
    if (!this.lastAnalysis || !this.lastAnalysis.positions.length) return;
    if (targetPly < 0) targetPly = 0;
    if (targetPly >= this.lastAnalysis.positions.length) targetPly = this.lastAnalysis.positions.length - 1;

    this.analysisPly = targetPly;
    const pos = this.lastAnalysis.positions[targetPly];

    if (this.analysisBoard) {
      this.analysisBoard.setPosition(pos.fen);
      this.analysisBoard.clearHint();

      const moveDisplay = document.getElementById('analysis-move-display');
      const evalText = document.getElementById('analysis-eval-text');

      if (moveDisplay) moveDisplay.innerText = `Langkah ${pos.moveNumber} (${pos.san})`;
      if (evalText) evalText.innerText = `Keunggulan Putih: ${pos.evalScore}% • Status: ${pos.classification.toUpperCase()}`;
    }
  }

  closeAnalysisModal() {
    const modal = document.getElementById('game-analysis-modal');
    if (modal) {
      document.body.removeChild(modal);
    }
    this.analysisBoard = null;
    this.lastAnalysis = null;
  }

  newGame(color = 'white') {
    this.playerColor = color;
    if (this.playBoard) {
      this.playBoard.reset();
      this.playBoard.setOrientation(color);
      this.updateMoveHistory();
      this.updateCapturedDisplay();
      this.updateEvalBar();

      const statusText = document.getElementById('game-status-text');
      if (statusText) statusText.innerText = 'Permainan baru dimulai. Giliran Putih.';

      if (color === 'black') {
        // Bot makes first move as white
        setTimeout(() => {
          const move = this.engine.getBestMove(this.playBoard.game, this.currentDifficulty);
          if (move) this.playBoard.makeMove(move);
        }, 500);
      }
    }
  }

  undoMove() {
    if (this.playBoard) {
      // Undo both bot move and player move
      this.playBoard.undo();
      this.playBoard.undo();
      this.updateMoveHistory();
      this.updateCapturedDisplay();
      this.updateEvalBar();

      const adviceText = document.getElementById('coach-advice-text');
      if (adviceText) {
        adviceText.innerHTML = 'Langkah dibatalkan. Silakan tentukan langkah terbaik Anda!';
      }
    }
  }

  getCoachAdvice() {
    if (!this.playBoard || this.playBoard.game.game_over()) return;

    const game = this.playBoard.game;
    const isPlayerTurn = (game.turn() === 'w' && this.playerColor === 'white') ||
                         (game.turn() === 'b' && this.playerColor === 'black');

    const adviceText = document.getElementById('coach-advice-text');
    if (!isPlayerTurn) {
      if (adviceText) adviceText.innerText = 'Tunggu giliran Anda melangkah untuk meminta saran pelatih.';
      return;
    }

    const advice = this.engine.getCoachAdvice(game);
    if (advice) {
      this.playBoard.setHint({ from: advice.from, to: advice.to });
      if (adviceText) {
        adviceText.innerHTML = `
          <div style="color:var(--text-main);font-size:13px;line-height:1.5;">
            <span style="display:inline-block;padding:2px 8px;background:rgba(16,185,129,0.2);color:var(--primary);border-radius:4px;font-weight:700;margin-bottom:4px;">
              Langkah: ${advice.san}
            </span>
            <div>${advice.adviceText}</div>
            <div style="font-size:11px;color:var(--accent-gold);margin-top:4px;">✨ Petak asal & tujuan sudah disorot di papan catur!</div>
          </div>
        `;
      }
      this.audio.playVictory();
    }
  }

  /* ==========================================================================
     Tactics Lab Controller
     ========================================================================== */
  initTacticsBoard() {
    const container = document.getElementById('tactics-board-container');
    if (!container) return;

    this.tacticsBoard = new ChessBoardComponent('tactics-board-container', {
      orientation: 'white',
      interactive: true,
      onMove: (move, game) => this.handleTacticsMove(move, game)
    });

    this.loadTacticsPuzzle(0);
  }

  loadTacticsPuzzle(index) {
    if (index >= TACTICS_PUZZLES.length) index = 0;
    this.activePuzzleIndex = index;
    const puzzle = TACTICS_PUZZLES[index];
    if (!puzzle) return;

    this.tacticsBoard.setPosition(puzzle.fen);

    const titleElem = document.getElementById('puzzle-title');
    const motifElem = document.getElementById('puzzle-motif-badge');
    const ratingElem = document.getElementById('puzzle-rating-badge');
    const instructElem = document.getElementById('puzzle-instruction');
    const feedbackElem = document.getElementById('puzzle-feedback-box');

    if (titleElem) titleElem.innerText = `Puzzle #${index + 1}: ${puzzle.title}`;
    if (motifElem) motifElem.innerText = puzzle.motif;
    if (ratingElem) ratingElem.innerText = `Rating ~${puzzle.rating}`;
    if (instructElem) instructElem.innerText = puzzle.instruction;
    if (feedbackElem) {
      feedbackElem.className = 'puzzle-feedback';
      feedbackElem.innerText = '';
    }
  }

  handleTacticsMove(move, game) {
    const puzzle = TACTICS_PUZZLES[this.activePuzzleIndex];
    if (!puzzle) return;

    const moveUci = move.from + move.to + (move.promotion || '');
    const feedback = document.getElementById('puzzle-feedback-box');

    if (moveUci === puzzle.solution[0]) {
      if (feedback) {
        feedback.className = 'puzzle-feedback success';
        feedback.innerText = `🎉 BENAR! ${puzzle.explanation}`;
      }
      this.audio.playVictory();

      if (!this.state.puzzlesSolved.includes(puzzle.id)) {
        this.state.puzzlesSolved.push(puzzle.id);
        this.state.puzzleRating += 15;
        this.saveState();
        this.renderDashboard();
      }
    } else {
      if (feedback) {
        feedback.className = 'puzzle-feedback error';
        feedback.innerText = '❌ Kurang tepat. Coba analisa kembali motif taktiknya!';
      }
      this.audio.playError();
      setTimeout(() => {
        this.tacticsBoard.setPosition(puzzle.fen);
      }, 1000);
    }
  }

  showPuzzleHint() {
    const puzzle = TACTICS_PUZZLES[this.activePuzzleIndex];
    const feedback = document.getElementById('puzzle-feedback-box');
    if (puzzle && feedback) {
      feedback.className = 'puzzle-feedback success';
      feedback.innerText = `💡 Hint: Cari langkah pembuka dengan bidak di petak ${puzzle.solution[0].slice(0, 2)}`;
    }
  }

  nextPuzzle() {
    this.loadTacticsPuzzle(this.activePuzzleIndex + 1);
  }

  /* ==========================================================================
     Repertoire View
     ========================================================================== */
  renderRepertoire() {
    const container = document.getElementById('repertoire-grid-container');
    if (!container) return;

    container.innerHTML = OPENING_REPERTOIRE.map(rep => `
      <div class="repertoire-card">
        <div class="repertoire-header">
          <h3>${rep.side === 'white' ? '♔' : '♚'} ${rep.name}</h3>
          <span class="eco-badge">${rep.eco}</span>
        </div>
        <div class="moves-pill">${rep.moves}</div>
        <p style="font-size:13px;color:var(--text-muted);">${rep.description}</p>
        <div style="background:rgba(255,255,255,0.02);padding:12px;border-radius:6px;">
          <strong style="font-size:12px;color:var(--primary);display:block;margin-bottom:6px;">Rencana Utama:</strong>
          <ul style="font-size:12px;color:var(--text-muted);padding-left:16px;">
            ${rep.plans.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.chessApp = new ChessApp();
});
