/**
 * ChessMastery - AI Chess Engine
 * Minimax algorithm with Alpha-Beta Pruning, Piece-Square Tables, and Opening Book.
 */

// Piece values for evaluation
const PIECE_VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000
};

// Piece-Square Tables (Midgame & Endgame positioning evaluation)
const PST = {
  p: [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
  ],
  n: [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
  ],
  b: [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]
  ],
  r: [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [0,  0,  0,  5,  5,  0,  0,  0]
  ],
  q: [
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [-5,  0,  5,  5,  5,  5,  0, -5],
    [0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  0,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20]
  ],
  k: [
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [20, 20,  0,  0,  0,  0, 20, 20],
    [20, 30, 10,  0,  0, 10, 30, 20]
  ]
};

// Opening Book moves for varied play
const OPENING_BOOK = {
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1": ["e2e4", "d2d4", "c2c4", "g1f3"],
  "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1": ["e7e5", "c7c5", "e7e6", "c7c6"],
  "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1": ["d7d5", "g8f6", "e7e6"],
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2": ["g1f3", "f1c4", "b1c3"],
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2": ["g1f3", "b1c3", "c2c3"]
};

class ChessEngine {
  constructor() {
    this.nodesEvaluated = 0;
  }

  evaluateBoard(game) {
    if (game.in_checkmate()) {
      return game.turn() === 'w' ? -99999 : 99999;
    }
    if (game.in_draw() || game.in_threefold_repetition() || game.in_stalemate()) {
      return 0;
    }

    let totalScore = 0;
    const board = game.board();

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (!piece) continue;

        const val = PIECE_VALUES[piece.type] || 0;
        let posVal = 0;
        const pst = PST[piece.type];

        if (pst) {
          if (piece.color === 'w') {
            posVal = pst[r][c];
          } else {
            posVal = pst[7 - r][c];
          }
        }

        const pieceTotal = val + posVal;
        if (piece.color === 'w') {
          totalScore += pieceTotal;
        } else {
          totalScore -= pieceTotal;
        }
      }
    }

    return totalScore;
  }

  orderMoves(game, moves) {
    return moves.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (a.captured) {
        scoreA += (PIECE_VALUES[a.captured] || 0) * 10 - (PIECE_VALUES[a.piece] || 0);
      }
      if (b.captured) {
        scoreB += (PIECE_VALUES[b.captured] || 0) * 10 - (PIECE_VALUES[b.piece] || 0);
      }
      if (a.promotion) scoreA += 800;
      if (b.promotion) scoreB += 800;

      return scoreB - scoreA;
    });
  }

  minimax(game, depth, alpha, beta, isMaximizing) {
    this.nodesEvaluated++;

    if (depth === 0 || game.game_over()) {
      return { score: this.evaluateBoard(game) };
    }

    let moves = game.moves({ verbose: true });
    moves = this.orderMoves(game, moves);

    if (isMaximizing) {
      let maxEval = -Infinity;
      let bestMove = null;

      for (const move of moves) {
        game.move(move);
        const evaluation = this.minimax(game, depth - 1, alpha, beta, false).score;
        game.undo();

        if (evaluation > maxEval) {
          maxEval = evaluation;
          bestMove = move;
        }
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      return { score: maxEval, bestMove };
    } else {
      let minEval = Infinity;
      let bestMove = null;

      for (const move of moves) {
        game.move(move);
        const evaluation = this.minimax(game, depth - 1, alpha, beta, true).score;
        game.undo();

        if (evaluation < minEval) {
          minEval = evaluation;
          bestMove = move;
        }
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      return { score: minEval, bestMove };
    }
  }

  getBestMove(game, difficulty = 3) {
    this.nodesEvaluated = 0;
    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return null;

    if (difficulty >= 2) {
      const fen = game.fen();
      if (OPENING_BOOK[fen]) {
        const bookMoves = OPENING_BOOK[fen];
        const randomBook = bookMoves[Math.floor(Math.random() * bookMoves.length)];
        const matched = moves.find(m => (m.from + m.to) === randomBook);
        if (matched) return matched;
      }
    }

    const isMaximizing = game.turn() === 'w';

    // Level 1: Beginner (~400 ELO) -> Mostly random
    if (difficulty === 1) {
      if (Math.random() < 0.70) {
        return moves[Math.floor(Math.random() * moves.length)];
      }
      const captures = moves.filter(m => m.captured);
      if (captures.length > 0) {
        return captures[Math.floor(Math.random() * captures.length)];
      }
      return moves[Math.floor(Math.random() * moves.length)];
    }

    // Level 2: Easy (~800 ELO) -> Depth 1 with slight noise
    if (difficulty === 2) {
      if (Math.random() < 0.25) {
        return moves[Math.floor(Math.random() * moves.length)];
      }
      const result = this.minimax(game, 1, -Infinity, Infinity, isMaximizing);
      return result.bestMove || moves[0];
    }

    // Level 3: Medium (~1200 ELO) -> Depth 2
    if (difficulty === 3) {
      const result = this.minimax(game, 2, -Infinity, Infinity, isMaximizing);
      return result.bestMove || moves[0];
    }

    // Level 4: Hard (~1500 ELO) -> Depth 3
    if (difficulty === 4) {
      const result = this.minimax(game, 3, -Infinity, Infinity, isMaximizing);
      return result.bestMove || moves[0];
    }

    // Level 5: Master (~1800 ELO) -> Depth 3 or 4
    if (difficulty === 5) {
      const depth = moves.length > 28 ? 3 : 4;
      const result = this.minimax(game, depth, -Infinity, Infinity, isMaximizing);
      return result.bestMove || moves[0];
    }

    return moves[0];
  }

  getEvaluationScore(game) {
    const rawScore = this.evaluateBoard(game);
    const winPercentage = 100 / (1 + Math.exp(-rawScore / 350));
    return Math.round(winPercentage);
  }

  /**
   * Generates coach suggestion and plain explanation in Indonesian
   */
  /**
   * Deterministic best move calculator for Coach and Analysis (No randomness, deep minimax)
   */
  getBestMoveDeterministic(game, depth = 3) {
    this.nodesEvaluated = 0;
    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return null;

    const isMaximizing = game.turn() === 'w';
    const result = this.minimax(game, depth, -Infinity, Infinity, isMaximizing);
    return result.bestMove || moves[0];
  }

  getCoachAdvice(game) {
    if (game.game_over()) return null;

    // Use deterministic depth 3 search
    const bestMove = this.getBestMoveDeterministic(game, 3);
    if (!bestMove) return null;

    const pieceNames = {
      p: 'Pion',
      n: 'Kuda',
      b: 'Gajah',
      r: 'Benteng',
      q: 'Queen (Menteri)',
      k: 'Raja'
    };

    const movingPiece = pieceNames[bestMove.piece] || 'Bidak';
    const targetSquare = bestMove.to;
    const originSquare = bestMove.from;
    let reason = '';

    if (bestMove.flags.includes('k') || bestMove.flags.includes('q')) {
      reason = 'Lakukan Rokade sekarang untuk mengamankan Raja ke sudut dan mengaktifkan Benteng!';
    } else if (bestMove.captured) {
      const capturedName = pieceNames[bestMove.captured] || 'bidak';
      reason = `Makan ${capturedName} lawan di ${targetSquare} untuk mendapatkan keunggulan poin!`;
    } else if (bestMove.san.includes('+')) {
      reason = `Beri Skak pada Raja lawan di ${targetSquare} untuk menekan posisinya!`;
    } else if (['e4', 'd4', 'e5', 'd5'].includes(targetSquare) && bestMove.piece === 'p') {
      reason = `Kuasai 4 petak pusat utama dengan mendorong Pion ke ${targetSquare}.`;
    } else if (['n', 'b'].includes(bestMove.piece) && ['1', '8'].includes(originSquare[1])) {
      reason = `Kembangkan (develop) ${movingPiece} dari ${originSquare} ke petak aktif ${targetSquare}.`;
    } else {
      reason = `Pindahkan ${movingPiece} ke ${targetSquare} untuk meningkatkan koordinasi dan keamanan posisi.`;
    }

    return {
      move: bestMove,
      san: bestMove.san,
      from: bestMove.from,
      to: bestMove.to,
      adviceText: `💡 Rekomendasi Pelatih: ${bestMove.san} (${movingPiece} ke ${targetSquare}) — ${reason}`
    };
  }

  /**
   * Fast evaluation mapping to Win Probability (0 to 100)
   */
  evalToWinPct(evalScore) {
    // Sigmoid mapping where +400 cp is ~90% win rate
    return 100 / (1 + Math.exp(-evalScore / 250));
  }

  /**
   * Fast 2-ply evaluation for move quality analysis without freezing UI
   */
  fastEvaluatePosition(game) {
    if (game.in_checkmate()) {
      return game.turn() === 'w' ? -99999 : 99999;
    }
    if (game.in_draw() || game.in_threefold_repetition() || game.in_stalemate()) {
      return 0;
    }

    const isMaximizing = game.turn() === 'w';
    // 1-2 ply fast alpha beta is instant (<1ms)
    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return 0;

    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (const m of moves) {
      game.move(m);
      if (game.in_checkmate()) {
        game.undo();
        return isMaximizing ? 99999 : -99999;
      }
      const score = this.evaluateBoard(game);
      game.undo();

      if (isMaximizing) {
        if (score > bestScore) bestScore = score;
      } else {
        if (score < bestScore) bestScore = score;
      }
    }

    return bestScore === -Infinity || bestScore === Infinity ? this.evaluateBoard(game) : bestScore;
  }

  /**
   * Blazing-fast, mathematically accurate game analyzer (Chess.com CAPS style)
   */
  analyzeGame(movesHistory, playerColor = 'white', startingFen = null) {
    const replayGame = new Chess();
    if (startingFen) {
      try { replayGame.load(startingFen); } catch (e) {}
    }

    const analysisReport = {
      positions: [],
      keyMoments: [],
      blunders: 0,
      mistakes: 0,
      inaccuracies: 0,
      bestMoves: 0,
      accuracyPct: 90,
      playerColor: playerColor
    };

    if (!movesHistory || movesHistory.length === 0) {
      return analysisReport;
    }

    let moveAccuracies = [];

    for (let i = 0; i < movesHistory.length; i++) {
      const fenBefore = replayGame.fen();
      const isWhiteTurn = replayGame.turn() === 'w';
      const isPlayerMove = (isWhiteTurn && playerColor === 'white') || (!isWhiteTurn && playerColor === 'black');

      const rawEvalBefore = this.fastEvaluatePosition(replayGame);
      const winPctBefore = this.evalToWinPct(playerColor === 'white' ? rawEvalBefore : -rawEvalBefore);

      // Best move in position
      const legalMoves = replayGame.moves({ verbose: true });
      let bestMoveBefore = null;
      let maxScore = -Infinity;

      for (const m of legalMoves) {
        replayGame.move(m);
        const s = isWhiteTurn ? this.evaluateBoard(replayGame) : -this.evaluateBoard(replayGame);
        replayGame.undo();
        if (s > maxScore) {
          maxScore = s;
          bestMoveBefore = m;
        }
      }

      const moveStr = movesHistory[i];
      let moveObj = null;
      try {
        moveObj = replayGame.move(moveStr, { sloppy: true }) || replayGame.move(moveStr);
      } catch (e) {
        console.warn('Move replay error:', moveStr);
      }

      if (!moveObj) continue;

      const rawEvalAfter = this.fastEvaluatePosition(replayGame);
      const winPctAfter = this.evalToWinPct(playerColor === 'white' ? rawEvalAfter : -rawEvalAfter);
      const moveNumber = Math.floor(i / 2) + 1;

      // Win rate loss for the player (0% to 100%)
      const winPctLoss = Math.max(0, winPctBefore - winPctAfter);

      let classification = 'good';
      let explanation = '';

      if (isPlayerMove) {
        // Individual move accuracy (Chess.com CAPS formula approximation)
        const moveAcc = Math.max(0, Math.min(100, 100 - (winPctLoss * 2.2)));
        moveAccuracies.push(moveAcc);

        const isExactMatch = bestMoveBefore && ((moveObj.from + moveObj.to) === (bestMoveBefore.from + bestMoveBefore.to));

        // Check if player delivered checkmate or made top move
        if (replayGame.in_checkmate()) {
          classification = 'best';
          analysisReport.bestMoves++;
        } else if (isExactMatch || winPctLoss <= 3) {
          classification = 'best';
          analysisReport.bestMoves++;
        } else if (winPctLoss >= 30 || (rawEvalAfter <= (playerColor === 'white' ? -80000 : 80000))) {
          classification = 'blunder';
          analysisReport.blunders++;
          explanation = `🔴 BLUNDER: Menurunkan peluang menang sebesar ${Math.round(winPctLoss)}%. Memberikan keuntungan taktis besar bagi lawan.`;
        } else if (winPctLoss >= 15) {
          classification = 'mistake';
          analysisReport.mistakes++;
          explanation = `🟠 MISTAKE: Kurang akurat. Terdapat opsi langkah yang jauh lebih menguntungkan posisi Anda.`;
        } else if (winPctLoss >= 7) {
          classification = 'inaccuracy';
          analysisReport.inaccuracies++;
          explanation = `🟡 INACCURACY: Langkah pasif. Sebaiknya perbaiki koordinasi perwira di petak aktif.`;
        } else {
          classification = 'good';
        }

        if (['blunder', 'mistake', 'inaccuracy'].includes(classification)) {
          const betterSan = bestMoveBefore ? bestMoveBefore.san : '-';
          analysisReport.keyMoments.push({
            plyIndex: i,
            moveNumber: moveNumber,
            playerMove: moveObj.san,
            bestMove: betterSan,
            bestMoveFrom: bestMoveBefore ? bestMoveBefore.from : null,
            bestMoveTo: bestMoveBefore ? bestMoveBefore.to : null,
            playedFrom: moveObj.from,
            playedTo: moveObj.to,
            classification: classification,
            fenBefore: fenBefore,
            explanation: `${explanation} Langkah terbaik adalah ${betterSan}.`,
            evalDelta: -Math.round(winPctLoss)
          });
        }
      }

      analysisReport.positions.push({
        plyIndex: i,
        moveNumber: moveNumber,
        san: moveObj.san,
        fen: replayGame.fen(),
        evalScore: this.getEvaluationScore(replayGame),
        classification: classification,
        isPlayerMove: isPlayerMove
      });
    }

    if (moveAccuracies.length > 0) {
      const avg = moveAccuracies.reduce((a, b) => a + b, 0) / moveAccuracies.length;
      analysisReport.accuracyPct = Math.round(avg);
    } else {
      analysisReport.accuracyPct = 95;
    }

    return analysisReport;
  }
}

window.ChessEngine = ChessEngine;
