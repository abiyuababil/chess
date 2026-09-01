/**
 * ChessMastery - Interactive Board Component
 * Supports Drag & Drop, Click-to-Move, SVG Pieces, Legal Highlights,
 * Audio Synthesis (Web Audio API), Captured Pieces & Evaluation Bar.
 */

// SVG piece definitions for crisp display on any screen resolution
const PIECE_SVGS = {
  wp: `<svg viewBox="0 0 45 45"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#fff" stroke="#111827" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  wn: `<svg viewBox="0 0 45 45"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#fff" stroke="#111827" stroke-width="1.5"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.163-.987-.34-2-2-.5-1 .5-2 1-3 1.63-1.63 4.29-3.23 4-6-1.5-1.5-2.25-.5-3.5 1-1.5-1.5-1.5-2.5 0-4 2.5-2.5 6-3 8-3 1.5 0 2.5 1 2.5 1s2.5-3 5-3c1.5 0 3 1 3 3z" fill="#fff" stroke="#111827" stroke-width="1.5"/><circle cx="9.5" cy="25.5" r="1" fill="#111827"/><circle cx="15" cy="15.5" r="1.2" fill="#111827"/></svg>`,
  wb: `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#fff"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="M17.5 26h10M15 30h15M22.5 15.5v5M20 18h5"/></g></svg>`,
  wr: `<svg viewBox="0 0 45 45"><g fill="#fff" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke-linecap="butt"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17"/><path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/><path d="M11 14h23"/></g></svg>`,
  wq: `<svg viewBox="0 0 45 45"><g fill="#fff" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14l2 12z"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/></g></svg>`,
  wk: `<svg viewBox="0 0 45 45"><g fill="none" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#fff"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-8 4-8 4s-2.5-3.5-7-3.5-7 3.5-7 3.5-4-5-8-4c-3 6 6 10.5 6 10.5v7z" fill="#fff"/><path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0"/></g></svg>`,

  bp: `<svg viewBox="0 0 45 45"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#2d3748" stroke="#f1f5f9" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  bn: `<svg viewBox="0 0 45 45"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#2d3748" stroke="#f1f5f9" stroke-width="1.5"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.163-.987-.34-2-2-.5-1 .5-2 1-3 1.63-1.63 4.29-3.23 4-6-1.5-1.5-2.25-.5-3.5 1-1.5-1.5-1.5-2.5 0-4 2.5-2.5 6-3 8-3 1.5 0 2.5 1 2.5 1s2.5-3 5-3c1.5 0 3 1 3 3z" fill="#2d3748" stroke="#f1f5f9" stroke-width="1.5"/><circle cx="9.5" cy="25.5" r="1" fill="#f1f5f9"/><circle cx="15" cy="15.5" r="1.2" fill="#f1f5f9"/></svg>`,
  bb: `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#f1f5f9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#2d3748"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="M17.5 26h10M15 30h15M22.5 15.5v5M20 18h5"/></g></svg>`,
  br: `<svg viewBox="0 0 45 45"><g fill="#2d3748" stroke="#f1f5f9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke-linecap="butt"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17"/><path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/><path d="M11 14h23"/></g></svg>`,
  bq: `<svg viewBox="0 0 45 45"><g fill="#2d3748" stroke="#f1f5f9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14l2 12z"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/></g></svg>`,
  bk: `<svg viewBox="0 0 45 45"><g fill="none" stroke="#f1f5f9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#2d3748"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-8 4-8 4s-2.5-3.5-7-3.5-7 3.5-7 3.5-4-5-8-4c-3 6 6 10.5 6 10.5v7z" fill="#2d3748"/><path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0"/></g></svg>`
};

// Web Audio API Synthesizer for rich audio feedback without external assets
class ChessAudio {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playMove() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playCapture() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playCheck() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.1); // A5
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playVictory() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.12 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.12);
      osc.stop(this.ctx.currentTime + idx * 0.12 + 0.35);
    });
  }

  playError() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }
}

class ChessBoardComponent {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.game = new Chess();
    this.orientation = options.orientation || 'white';
    this.interactive = options.interactive !== false;
    this.onMove = options.onMove || null;
    this.selectedSquare = null;
    this.legalMovesForSelected = [];
    this.lastMove = null;
    this.hintMove = null;
    this.audio = new ChessAudio();
    this.capturedWhite = [];
    this.capturedBlack = [];
    this.historyMoves = [];

    this.render();
  }

  setHint(move) {
    this.hintMove = move;
    this.render();
  }

  clearHint() {
    this.hintMove = null;
    this.render();
  }

  setOrientation(color) {
    this.orientation = color;
    this.render();
  }

  setPosition(fen) {
    this.game.load(fen);
    this.selectedSquare = null;
    this.legalMovesForSelected = [];
    this.lastMove = null;
    this.hintMove = null;
    this.capturedWhite = [];
    this.capturedBlack = [];
    this.historyMoves = [];
    this.render();
  }

  reset() {
    this.game.reset();
    this.selectedSquare = null;
    this.legalMovesForSelected = [];
    this.lastMove = null;
    this.hintMove = null;
    this.capturedWhite = [];
    this.capturedBlack = [];
    this.historyMoves = [];
    this.render();
  }

  undo() {
    const move = this.game.undo();
    if (move) {
      this.historyMoves.pop();
      this.lastMove = null;
      this.hintMove = null;
      this.selectedSquare = null;
      this.legalMovesForSelected = [];
      this.updateCapturedList();
      this.render();
    }
    return move;
  }

  makeMove(moveObj) {
    const result = this.game.move(moveObj);
    if (result) {
      this.lastMove = { from: result.from, to: result.to };
      this.hintMove = null; // Clear hint when move is made
      this.historyMoves.push(result.san);
      this.updateCapturedList();

      if (this.game.in_checkmate()) {
        this.audio.playVictory();
      } else if (this.game.in_check()) {
        this.audio.playCheck();
      } else if (result.captured) {
        this.audio.playCapture();
      } else {
        this.audio.playMove();
      }

      this.selectedSquare = null;
      this.legalMovesForSelected = [];
      this.render();
      if (this.onMove) this.onMove(result, this.game);
      return result;
    }
    return null;
  }

  updateCapturedList() {
    // Calculate captured pieces from start
    const startCounts = { p: 8, n: 2, b: 2, r: 2, q: 1 };
    const currentCounts = {
      w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
      b: { p: 0, n: 0, b: 0, r: 0, q: 0 }
    };

    const board = this.game.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.type !== 'k') {
          currentCounts[piece.color][piece.type]++;
        }
      }
    }

    this.capturedWhite = []; // Black captured these white pieces
    this.capturedBlack = []; // White captured these black pieces

    ['p', 'n', 'b', 'r', 'q'].forEach(type => {
      const lostWhite = startCounts[type] - currentCounts['w'][type];
      const lostBlack = startCounts[type] - currentCounts['b'][type];
      for (let i = 0; i < lostWhite; i++) this.capturedWhite.push('w' + type);
      for (let i = 0; i < lostBlack; i++) this.capturedBlack.push('b' + type);
    });
  }

  squareToCoords(sq) {
    const file = sq.charCodeAt(0) - 97; // a=0, h=7
    const rank = parseInt(sq[1], 10) - 1; // 1=0, 8=7
    return { file, rank };
  }

  coordsToSquare(file, rank) {
    return String.fromCharCode(97 + file) + (rank + 1);
  }

  handleSquareClick(square) {
    if (!this.interactive || this.game.game_over()) return;

    const piece = this.game.get(square);
    const isPlayerTurn = (this.game.turn() === 'w' && this.orientation === 'white') ||
                         (this.game.turn() === 'b' && this.orientation === 'black') ||
                         (this.orientation === 'both');

    if (!isPlayerTurn) return;

    // If clicking on existing selected square -> unselect
    if (this.selectedSquare === square) {
      this.selectedSquare = null;
      this.legalMovesForSelected = [];
      this.render();
      return;
    }

    // If a piece was already selected and clicked a legal destination
    if (this.selectedSquare) {
      const matchedMove = this.legalMovesForSelected.find(m => m.to === square);
      if (matchedMove) {
        // Check for pawn promotion
        if (matchedMove.flags.includes('p')) {
          this.promptPromotion(this.selectedSquare, square);
          return;
        }
        this.makeMove({ from: this.selectedSquare, to: square });
        return;
      }
    }

    // Select piece if it belongs to current turn
    if (piece && piece.color === this.game.turn()) {
      this.selectedSquare = square;
      this.legalMovesForSelected = this.game.moves({ square: square, verbose: true });
      this.render();
    } else {
      this.selectedSquare = null;
      this.legalMovesForSelected = [];
      this.render();
    }
  }

  promptPromotion(from, to) {
    const color = this.game.turn();
    const modal = document.createElement('div');
    modal.className = 'promotion-modal-backdrop';
    modal.innerHTML = `
      <div class="promotion-modal">
        <h3>Promote Pawn To:</h3>
        <div class="promotion-options">
          <button data-piece="q" class="promo-btn">${PIECE_SVGS[color + 'q']}<span>Queen (9)</span></button>
          <button data-piece="r" class="promo-btn">${PIECE_SVGS[color + 'r']}<span>Rook (5)</span></button>
          <button data-piece="b" class="promo-btn">${PIECE_SVGS[color + 'b']}<span>Bishop (3)</span></button>
          <button data-piece="n" class="promo-btn">${PIECE_SVGS[color + 'n']}<span>Knight (3)</span></button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelectorAll('.promo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const piece = btn.getAttribute('data-piece');
        document.body.removeChild(modal);
        this.makeMove({ from, to, promotion: piece });
      });
    });
  }

  render() {
    if (!this.container) return;

    const boardState = this.game.board();
    const isFlipped = this.orientation === 'black';

    // Find in check king
    let inCheckKingSquare = null;
    if (this.game.in_check()) {
      const turn = this.game.turn();
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const p = boardState[r][c];
          if (p && p.type === 'k' && p.color === turn) {
            inCheckKingSquare = this.coordsToSquare(c, 7 - r);
            break;
          }
        }
      }
    }

    let html = `
      <div class="chess-board-wrapper">
        <div class="chess-grid ${isFlipped ? 'flipped' : ''}">
    `;

    // Files and ranks order
    const rankIndices = isFlipped ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
    const fileIndices = isFlipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

    rankIndices.forEach((rank, rIdx) => {
      fileIndices.forEach((file, fIdx) => {
        const square = this.coordsToSquare(file, rank);
        const isLight = (file + rank) % 2 !== 0;
        const squareClass = isLight ? 'sq-light' : 'sq-dark';

        // Check highlights
        let highlightClass = '';
        if (this.selectedSquare === square) {
          highlightClass = ' sq-selected';
        } else if (this.lastMove && (this.lastMove.from === square || this.lastMove.to === square)) {
          highlightClass = ' sq-last-move';
        } else if (inCheckKingSquare === square) {
          highlightClass = ' sq-in-check';
        } else if (this.hintMove && this.hintMove.from === square) {
          highlightClass = ' sq-hint-from';
        } else if (this.hintMove && this.hintMove.to === square) {
          highlightClass = ' sq-hint-to';
        }

        // Legal move indicator
        const legalMove = this.legalMovesForSelected.find(m => m.to === square);
        let legalMarker = '';
        if (legalMove) {
          if (legalMove.captured) {
            legalMarker = `<div class="legal-capture-ring"></div>`;
          } else {
            legalMarker = `<div class="legal-move-dot"></div>`;
          }
        } else if (this.hintMove && this.hintMove.to === square) {
          legalMarker = `<div class="hint-target-ring"></div>`;
        }

        // Coordinates display
        let rankCoord = '';
        let fileCoord = '';
        if (fIdx === 0) {
          rankCoord = `<span class="coord rank-coord">${rank + 1}</span>`;
        }
        if (rIdx === 7) {
          fileCoord = `<span class="coord file-coord">${String.fromCharCode(97 + file)}</span>`;
        }

        // Piece SVG
        const boardRow = 7 - rank;
        const piece = boardState[boardRow][file];
        let pieceHtml = '';
        if (piece) {
          const key = piece.color + piece.type;
          pieceHtml = `<div class="chess-piece" draggable="true" data-square="${square}">${PIECE_SVGS[key] || ''}</div>`;
        }

        html += `
          <div class="chess-square ${squareClass}${highlightClass}" data-square="${square}">
            ${rankCoord}
            ${fileCoord}
            ${legalMarker}
            ${pieceHtml}
          </div>
        `;
      });
    });

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const squares = this.container.querySelectorAll('.chess-square');
    squares.forEach(sqElem => {
      const square = sqElem.getAttribute('data-square');

      sqElem.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleSquareClick(square);
      });

      // Drag & Drop
      const pieceElem = sqElem.querySelector('.chess-piece');
      if (pieceElem) {
        pieceElem.addEventListener('dragstart', (e) => {
          if (!this.interactive || this.game.game_over()) {
            e.preventDefault();
            return;
          }
          const piece = this.game.get(square);
          if (piece && piece.color === this.game.turn()) {
            e.dataTransfer.setData('text/plain', square);
            this.selectedSquare = square;
            this.legalMovesForSelected = this.game.moves({ square: square, verbose: true });
            this.render();
          } else {
            e.preventDefault();
          }
        });
      }

      sqElem.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      sqElem.addEventListener('drop', (e) => {
        e.preventDefault();
        const fromSquare = e.dataTransfer.getData('text/plain');
        if (fromSquare && fromSquare !== square) {
          const moves = this.game.moves({ square: fromSquare, verbose: true });
          const matched = moves.find(m => m.to === square);
          if (matched) {
            if (matched.flags.includes('p')) {
              this.promptPromotion(fromSquare, square);
            } else {
              this.makeMove({ from: fromSquare, to: square });
            }
          }
        }
      });
    });
  }
}

window.ChessBoardComponent = ChessBoardComponent;
window.PIECE_SVGS = PIECE_SVGS;
window.ChessAudio = ChessAudio;
