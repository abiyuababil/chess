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
      const badgeLabel = km.classification === 'blunder' ? 'BLUNDER' : (km.classification === 'mistake' ? 'MISTAKE' : 'INACCURACY');
      return `
        <div class="analysis-moment-card" id="moment-card-${idx}" onclick="window.chessApp.inspectAnalysisMoment(${idx})">
          <div class="moment-card-header">
            <span class="moment-badge ${badgeColor}">${badgeLabel}</span>
            <span class="moment-move-num">Langkah ${km.moveNumber}</span>
          </div>

          <div class="moment-split-boxes">
            <div class="moment-played-box">
              <span class="box-label">Langkah Anda:</span>
              <span class="box-val">${km.playerMove}</span>
            </div>
            <div class="moment-best-box">
              <span class="box-label">Saran Terbaik:</span>
              <span class="box-val">${km.bestMove}</span>
            </div>
          </div>

          <p class="moment-desc">${km.explanation}</p>
          <div class="moment-footer">
            <span class="btn-inspect-link">Lihat di Papan →</span>
          </div>
        </div>
      `;
    }).join('') : `<div style="text-align:center;padding:32px;color:var(--text-muted);">Tidak ada blunder atau kesalahan fatal. Permainan Anda sangat solid.</div>`;

    modal.innerHTML = `
      <div class="analysis-modal">
        <div class="analysis-modal-header">
          <div>
            <h2>Analisis Pertandingan (Game Review)</h2>
            <p>${customTitle} • Akurasi Permainan Anda: <strong style="color:var(--primary);font-size:15px;">${analysis.accuracyPct}%</strong></p>
          </div>
          <button class="btn-close-modal" onclick="window.chessApp.closeAnalysisModal()">✕</button>
        </div>

        <!-- Legend & Accuracy Summary -->
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
          <!-- Left: Review Board + Controls -->
          <div class="analysis-board-side">
            <div id="analysis-board-container"></div>

            <!-- Comparison View Toggle -->
            <div class="analysis-view-toggle">
              <button class="btn-toggle-move" id="btn-toggle-played" onclick="window.chessApp.previewAnalysisMove('played')">
                Langkah Anda (Merah)
              </button>
              <button class="btn-toggle-move active" id="btn-toggle-best" onclick="window.chessApp.previewAnalysisMove('best')">
                Saran Terbaik (Hijau)
              </button>
            </div>

            <!-- Step Navigation -->
            <div class="analysis-nav-controls">
              <button class="btn-step" onclick="window.chessApp.stepAnalysis(0)" title="Awal">|◀</button>
              <button class="btn-step" onclick="window.chessApp.stepAnalysis(window.chessApp.analysisPly - 1)" title="Sebelumnya">◀</button>
              <span id="analysis-move-display" style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;">Langkah 1</span>
              <button class="btn-step" onclick="window.chessApp.stepAnalysis(window.chessApp.analysisPly + 1)" title="Berikutnya">▶</button>
              <button class="btn-step" onclick="window.chessApp.stepAnalysis(${analysis.positions.length - 1})" title="Akhir">▶|</button>
            </div>

            <div id="analysis-eval-text" style="width:100%;"></div>
          </div>

          <!-- Right: Key Moments List & Legend -->
          <div class="analysis-moments-side">
            <div class="analysis-guide-banner">
              <div class="guide-item"><span class="guide-dot red"></span><strong>Blunder</strong>: Kesalahan fatal (rugi perwira/skakmat)</div>
              <div class="guide-item"><span class="guide-dot orange"></span><strong>Mistake</strong>: Melepaskan inisiatif keuntungan</div>
              <div class="guide-item"><span class="guide-dot yellow"></span><strong>Inaccuracy</strong>: Langkah pasif / kurang tajam</div>
            </div>

            <h3 style="font-size:14px;margin:12px 0 8px 0;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">
              Daftar Evaluasi Langkah (${analysis.keyMoments.length})
            </h3>
            <div class="analysis-moments-scroll">
              ${momentsHtml}
            </div>
          </div>
        </div>

        <div class="analysis-modal-footer">
          <button class="btn-game-action" onclick="window.chessApp.closeAnalysisModal()">Tutup</button>
          <button class="btn-game-action primary" onclick="window.chessApp.closeAnalysisModal(); window.chessApp.newGame('${this.playerColor}')">Main Lagi</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Initialize board synchronously
    this.analysisBoard = new ChessBoardComponent('analysis-board-container', {
      orientation: this.playerColor,
      interactive: false
    });

    if (analysis.keyMoments.length > 0) {
      this.inspectAnalysisMoment(0);
    } else if (analysis.positions.length > 0) {
      this.stepAnalysis(this.analysisPly);
    }
  }

  inspectAnalysisMoment(idx) {
    if (!this.lastAnalysis || !this.lastAnalysis.keyMoments[idx]) return;
    const km = this.lastAnalysis.keyMoments[idx];
    this.currentInspectedMoment = km;

    // Highlight active card
    document.querySelectorAll('.analysis-moment-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.getElementById(`moment-card-${idx}`);
    if (activeCard) activeCard.classList.add('active');

    this.analysisPly = km.plyIndex;
    this.previewAnalysisMove('best');
  }

  previewAnalysisMove(type = 'best') {
    if (!this.currentInspectedMoment || !this.analysisBoard) return;
    const km = this.currentInspectedMoment;

    // Set board to position before move
    this.analysisBoard.setPosition(km.fenBefore);

    const btnPlayed = document.getElementById('btn-toggle-played');
    const btnBest = document.getElementById('btn-toggle-best');
    if (btnPlayed && btnBest) {
      if (type === 'played') {
        btnPlayed.classList.add('active');
        btnBest.classList.remove('active');
      } else {
        btnBest.classList.add('active');
        btnPlayed.classList.remove('active');
      }
    }

    if (type === 'played') {
      if (km.playedFrom && km.playedTo) {
        this.analysisBoard.setAnalysisHighlight(km.playedFrom, km.playedTo, 'played');
      }
    } else {
      if (km.bestMoveFrom && km.bestMoveTo) {
        this.analysisBoard.setAnalysisHighlight(km.bestMoveFrom, km.bestMoveTo, 'best');
      }
    }

    const moveDisplay = document.getElementById('analysis-move-display');
    const evalText = document.getElementById('analysis-eval-text');
    if (moveDisplay) moveDisplay.innerText = `Langkah ${km.moveNumber}. ${km.playerMove}`;

    if (evalText) {
      const isBlunder = km.classification === 'blunder';
      const borderCol = isBlunder ? 'var(--danger)' : '#f97316';
      const bgCol = isBlunder ? 'rgba(239,68,68,0.12)' : 'rgba(249,115,22,0.12)';
      evalText.innerHTML = `
        <div style="background:${bgCol};border:1px solid ${borderCol};padding:10px 14px;border-radius:8px;font-size:12.5px;line-height:1.4;">
          <div style="font-weight:700;margin-bottom:4px;color:#fff;">
            ${km.classification.toUpperCase()} • Anda memainkan <span style="color:#fca5a5;">${km.playerMove}</span> (Saran: <span style="color:#86efac;">${km.bestMove}</span>)
          </div>
          <div style="color:var(--text-muted);">${km.explanation}</div>
        </div>
      `;
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
      this.analysisBoard.clearAnalysisHighlight();
      this.analysisBoard.clearHint();

      const moveDisplay = document.getElementById('analysis-move-display');
      const evalText = document.getElementById('analysis-eval-text');

      if (moveDisplay) moveDisplay.innerText = `Langkah ${pos.moveNumber} (${pos.san})`;
      if (evalText) {
        evalText.innerHTML = `
          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--bg-card-border);padding:8px 12px;border-radius:6px;font-size:12px;color:var(--text-muted);text-align:center;">
            Evaluasi: Keunggulan Putih ${pos.evalScore}% • Kategori: <strong>${pos.classification.toUpperCase()}</strong>
          </div>
        `;
      }
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
     Tactics Lab Controller (100 Tactical Puzzles)
     ========================================================================== */
  initTacticsBoard() {
    const container = document.getElementById('tactics-board-container');
    if (!container) return;

    this.tacticsBoard = new ChessBoardComponent('tactics-board-container', {
      orientation: 'white',
      interactive: true,
      onMove: (move, game) => this.handleTacticsMove(move, game)
    });

    this.filteredPuzzles = [...TACTICS_PUZZLES];
    this.populateTacticsDropdown();
    this.loadTacticsPuzzle(0);
    this.updateTacticsBadge();
  }

  populateTacticsDropdown() {
    const select = document.getElementById('tactics-jump-select');
    if (!select) return;

    select.innerHTML = this.filteredPuzzles.map((p, idx) => {
      const isSolved = this.state.puzzlesSolved.includes(p.id) ? '✓ ' : '';
      return `<option value="${idx}">${isSolved}#${p.id}: ${p.title} (${p.motif})</option>`;
    }).join('');
  }

  updateTacticsBadge() {
    const badge = document.getElementById('tactics-progress-badge');
    if (badge) {
      badge.innerText = `${this.state.puzzlesSolved.length}/100 Selesai`;
    }
  }

  filterTacticsByMotif(motif) {
    if (motif === 'all') {
      this.filteredPuzzles = [...TACTICS_PUZZLES];
    } else {
      this.filteredPuzzles = TACTICS_PUZZLES.filter(p => p.motif.toLowerCase().includes(motif.toLowerCase()));
    }
    this.populateTacticsDropdown();
    this.loadTacticsPuzzle(0);
  }

  jumpToPuzzle(filteredIndex) {
    this.loadTacticsPuzzle(filteredIndex);
  }

  randomPuzzle() {
    const rand = Math.floor(Math.random() * this.filteredPuzzles.length);
    this.loadTacticsPuzzle(rand);
  }

  prevPuzzle() {
    let prev = this.activePuzzleFilteredIndex - 1;
    if (prev < 0) prev = this.filteredPuzzles.length - 1;
    this.loadTacticsPuzzle(prev);
  }

  nextPuzzle() {
    let next = this.activePuzzleFilteredIndex + 1;
    if (next >= this.filteredPuzzles.length) next = 0;
    this.loadTacticsPuzzle(next);
  }

  loadTacticsPuzzle(filteredIndex) {
    if (filteredIndex < 0 || filteredIndex >= this.filteredPuzzles.length) filteredIndex = 0;
    this.activePuzzleFilteredIndex = filteredIndex;
    const puzzle = this.filteredPuzzles[filteredIndex];
    if (!puzzle) return;

    this.currentPuzzle = puzzle;
    this.tacticsBoard.setPosition(puzzle.fen);

    const select = document.getElementById('tactics-jump-select');
    if (select) select.value = filteredIndex;

    const titleElem = document.getElementById('puzzle-title');
    const motifElem = document.getElementById('puzzle-motif-badge');
    const ratingElem = document.getElementById('puzzle-rating-badge');
    const instructElem = document.getElementById('puzzle-instruction');
    const feedbackElem = document.getElementById('puzzle-feedback-box');

    if (titleElem) titleElem.innerText = `Puzzle #${puzzle.id}: ${puzzle.title}`;
    if (motifElem) motifElem.innerText = puzzle.motif;
    if (ratingElem) ratingElem.innerText = `Rating ~${puzzle.rating}`;
    if (instructElem) instructElem.innerText = puzzle.instruction;
    if (feedbackElem) {
      feedbackElem.className = 'puzzle-feedback';
      feedbackElem.innerText = '';
    }
  }

  handleTacticsMove(move, game) {
    const puzzle = this.currentPuzzle;
    if (!puzzle) return;

    const moveUci = move.from + move.to + (move.promotion || '');
    const feedback = document.getElementById('puzzle-feedback-box');

    if (moveUci === puzzle.solution[0]) {
      if (feedback) {
        feedback.className = 'puzzle-feedback success';
        feedback.innerText = `BENAR! ${puzzle.explanation}`;
      }
      this.audio.playVictory();

      if (!this.state.puzzlesSolved.includes(puzzle.id)) {
        this.state.puzzlesSolved.push(puzzle.id);
        this.state.puzzleRating += 15;
        this.saveState();
        this.renderDashboard();
        this.updateTacticsBadge();
        this.populateTacticsDropdown();
      }
    } else {
      if (feedback) {
        feedback.className = 'puzzle-feedback error';
        feedback.innerText = 'Kurang tepat. Coba analisa kembali posisi!';
      }
      this.audio.playError();
      setTimeout(() => {
        this.tacticsBoard.setPosition(puzzle.fen);
      }, 900);
    }
  }

  showPuzzleHint() {
    const puzzle = this.currentPuzzle;
    const feedback = document.getElementById('puzzle-feedback-box');
    if (puzzle && feedback) {
      feedback.className = 'puzzle-feedback success';
      feedback.innerText = `Hint: Perhatikan perwira di petak ${puzzle.solution[0].slice(0, 2)}`;
    }
  }

  /* ==========================================================================
     Interactive Opening Repertoire Controller (Step-by-Step Viewer)
     ========================================================================== */
  renderRepertoire() {
    const container = document.getElementById('repertoire-grid-container');
    if (!container) return;

    container.innerHTML = OPENING_REPERTOIRE.map(rep => `
      <div class="repertoire-card">
        <div class="repertoire-header">
          <div>
            <h3 style="font-size:17px;color:#fff;">${rep.side === 'white' ? '♔' : '♚'} ${rep.name}</h3>
            <span class="eco-badge" style="margin-top:4px;display:inline-block;">ECO ${rep.eco}</span>
          </div>
          <button class="btn-sm-action" onclick="window.chessApp.openRepertoireModal('${rep.id}')">Buka Langkah Papan →</button>
        </div>
        <div class="moves-pill">${rep.moves}</div>
        <p style="font-size:13px;color:var(--text-muted);line-height:1.4;">${rep.description}</p>
        <div style="background:rgba(255,255,255,0.02);padding:12px;border-radius:6px;margin-top:auto;">
          <strong style="font-size:12px;color:var(--primary);display:block;margin-bottom:6px;">Rencana Utama:</strong>
          <ul style="font-size:12px;color:var(--text-muted);padding-left:16px;">
            ${rep.plans.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  openRepertoireModal(repId) {
    this.closeRepertoireModal();

    const rep = OPENING_REPERTOIRE.find(r => r.id === repId);
    if (!rep) return;

    this.activeRepertoire = rep;
    this.repStepIndex = 0;

    // Build timeline of FENs and moves
    const replay = new Chess();
    const steps = [{ fen: replay.fen(), san: 'Awal', comment: 'Posisi awal sebelum langkah pembuka dimainkan.', from: null, to: null }];

    rep.movesList.forEach((m, idx) => {
      const res = replay.move(m.san);
      if (res) {
        steps.push({
          fen: replay.fen(),
          san: `${Math.floor(idx / 2) + 1}${idx % 2 === 0 ? '.' : '...'} ${res.san}`,
          comment: m.comment,
          from: res.from,
          to: res.to
        });
      }
    });

    this.activeRepertoireSteps = steps;

    const modal = document.createElement('div');
    modal.className = 'analysis-modal-backdrop';
    modal.id = 'repertoire-trainer-modal';

    const timelineHtml = steps.map((s, idx) => `
      <button class="rep-timeline-btn ${idx === 0 ? 'active' : ''}" id="rep-step-btn-${idx}" onclick="window.chessApp.stepRepertoire(${idx})">
        <span class="step-num">${idx === 0 ? 'Start' : idx}</span>
        <span class="step-san">${s.san}</span>
      </button>
    `).join('');

    modal.innerHTML = `
      <div class="analysis-modal">
        <div class="analysis-modal-header">
          <div>
            <h2>${rep.name} (ECO ${rep.eco})</h2>
            <p>Trainer Pembukaan Interaktif • Panduan Langkah Demi Langkah</p>
          </div>
          <button class="btn-close-modal" onclick="window.chessApp.closeRepertoireModal()">✕</button>
        </div>

        <div class="analysis-modal-body">
          <!-- Left: Interactive Board -->
          <div class="analysis-board-side">
            <div id="rep-board-container"></div>
            
            <div class="analysis-nav-controls">
              <button class="btn-step" onclick="window.chessApp.stepRepertoire(0)" title="Awal">|◀</button>
              <button class="btn-step" onclick="window.chessApp.stepRepertoire(window.chessApp.repStepIndex - 1)" title="Sebelumnya">◀</button>
              <span id="rep-step-display" style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;">Langkah 0/${steps.length - 1}</span>
              <button class="btn-step" onclick="window.chessApp.stepRepertoire(window.chessApp.repStepIndex + 1)" title="Berikutnya">▶</button>
              <button class="btn-step" onclick="window.chessApp.stepRepertoire(${steps.length - 1})" title="Akhir">▶|</button>
              <button class="btn-sm-action" id="btn-rep-autoplay" onclick="window.chessApp.toggleRepertoireAutoPlay()" style="margin-left:8px;">▶ Putar Otomatis</button>
            </div>
          </div>

          <!-- Right: Move-by-Move Commentary & Plans -->
          <div class="analysis-moments-side">
            <div class="rep-timeline-bar">
              ${timelineHtml}
            </div>

            <!-- Active Move Commentary Card -->
            <div class="rep-commentary-box" id="rep-commentary-box">
              <h4 id="rep-commentary-title" style="font-size:14px;color:var(--primary);margin-bottom:6px;">Langkah: Awal</h4>
              <p id="rep-commentary-text" style="font-size:13px;color:var(--text-main);line-height:1.5;">${steps[0].comment}</p>
            </div>

            <div style="background:rgba(255,255,255,0.03);border:1px solid var(--bg-card-border);padding:14px;border-radius:8px;margin-top:auto;">
              <strong style="font-size:13px;color:#fff;display:block;margin-bottom:8px;">Rencana Strategis Utama:</strong>
              <ul style="font-size:12.5px;color:var(--text-muted);padding-left:18px;display:flex;flex-direction:column;gap:6px;">
                ${rep.plans.map(p => `<li>${p}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <div class="analysis-modal-footer">
          <button class="btn-game-action" onclick="window.chessApp.closeRepertoireModal()">Tutup</button>
          <a href="#play" class="btn-game-action primary" onclick="window.chessApp.closeRepertoireModal(); window.chessApp.newGame('${rep.side}')">Latih Pembukaan Ini vs Bot</a>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    this.repertoireBoard = new ChessBoardComponent('rep-board-container', {
      orientation: rep.side,
      interactive: false
    });

    this.stepRepertoire(1);
  }

  stepRepertoire(stepIdx) {
    if (!this.activeRepertoireSteps || this.activeRepertoireSteps.length === 0) return;
    if (stepIdx < 0) stepIdx = 0;
    if (stepIdx >= this.activeRepertoireSteps.length) stepIdx = this.activeRepertoireSteps.length - 1;

    this.repStepIndex = stepIdx;
    const step = this.activeRepertoireSteps[stepIdx];

    if (this.repertoireBoard) {
      this.repertoireBoard.setPosition(step.fen);
      if (step.from && step.to) {
        this.repertoireBoard.setHint({ from: step.from, to: step.to });
      } else {
        this.repertoireBoard.clearHint();
      }

      // Update Step text
      const stepDisplay = document.getElementById('rep-step-display');
      if (stepDisplay) stepDisplay.innerText = `Langkah ${stepIdx}/${this.activeRepertoireSteps.length - 1}`;

      // Update Commentary Box
      const comTitle = document.getElementById('rep-commentary-title');
      const comText = document.getElementById('rep-commentary-text');
      if (comTitle) comTitle.innerText = `Langkah: ${step.san}`;
      if (comText) comText.innerText = step.comment;

      // Update Timeline active button
      document.querySelectorAll('.rep-timeline-btn').forEach((b, idx) => {
        if (idx === stepIdx) b.classList.add('active');
        else b.classList.remove('active');
      });
    }
  }

  toggleRepertoireAutoPlay() {
    const btn = document.getElementById('btn-rep-autoplay');
    if (this.repAutoPlayInterval) {
      clearInterval(this.repAutoPlayInterval);
      this.repAutoPlayInterval = null;
      if (btn) btn.innerText = '▶ Putar Otomatis';
    } else {
      if (btn) btn.innerText = '⏸ Jeda';
      this.repAutoPlayInterval = setInterval(() => {
        let next = this.repStepIndex + 1;
        if (next >= this.activeRepertoireSteps.length) {
          clearInterval(this.repAutoPlayInterval);
          this.repAutoPlayInterval = null;
          if (btn) btn.innerText = '▶ Putar Ulang';
        } else {
          this.stepRepertoire(next);
        }
      }, 1300);
    }
  }

  closeRepertoireModal() {
    if (this.repAutoPlayInterval) {
      clearInterval(this.repAutoPlayInterval);
      this.repAutoPlayInterval = null;
    }
    const modal = document.getElementById('repertoire-trainer-modal');
    if (modal) {
      document.body.removeChild(modal);
    }
    this.repertoireBoard = null;
    this.activeRepertoire = null;
    this.activeRepertoireSteps = null;
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.chessApp = new ChessApp();
});

