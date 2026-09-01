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
    return this.minimaxPV(game, depth, alpha, beta, isMaximizing);
  }

  minimaxPV(game, depth, alpha, beta, isMaximizing) {
    this.nodesEvaluated++;

    if (depth === 0 || game.game_over()) {
      return { score: this.evaluateBoard(game), bestMove: null, pv: [] };
    }

    let moves = game.moves({ verbose: true });
    moves = this.orderMoves(game, moves);
    if (moves.length === 0) {
      return { score: this.evaluateBoard(game), bestMove: null, pv: [] };
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      let bestPV = [];

      for (const move of moves) {
        game.move(move);
        const child = this.minimaxPV(game, depth - 1, alpha, beta, false);
        game.undo();

        if (child.score > maxEval) {
          maxEval = child.score;
          bestPV = [move, ...(child.pv || [])];
        }
        alpha = Math.max(alpha, child.score);
        if (beta <= alpha) break;
      }
      return { score: maxEval, bestMove: bestPV[0] || moves[0], pv: bestPV };
    } else {
      let minEval = Infinity;
      let bestPV = [];

      for (const move of moves) {
        game.move(move);
        const child = this.minimaxPV(game, depth - 1, alpha, beta, true);
        game.undo();

        if (child.score < minEval) {
          minEval = child.score;
          bestPV = [move, ...(child.pv || [])];
        }
        beta = Math.min(beta, child.score);
        if (beta <= alpha) break;
      }
      return { score: minEval, bestMove: bestPV[0] || moves[0], pv: bestPV };
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
      const result = this.minimaxPV(game, 1, -Infinity, Infinity, isMaximizing);
      return result.bestMove || moves[0];
    }

    // Level 3: Medium (~1200 ELO) -> Depth 2
    if (difficulty === 3) {
      const result = this.minimaxPV(game, 2, -Infinity, Infinity, isMaximizing);
      return result.bestMove || moves[0];
    }

    // Level 4: Hard (~1500 ELO) -> Depth 3
    if (difficulty === 4) {
      const result = this.minimaxPV(game, 3, -Infinity, Infinity, isMaximizing);
      return result.bestMove || moves[0];
    }

    // Level 5: Master (~1800 ELO) -> Depth 3 or 4
    if (difficulty === 5) {
      const depth = moves.length > 28 ? 3 : 4;
      const result = this.minimaxPV(game, depth, -Infinity, Infinity, isMaximizing);
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
   * Deterministic best move calculator for Coach and Analysis (No randomness, deep minimax)
   */
  getBestMoveDeterministic(game, depth = 3) {
    this.nodesEvaluated = 0;
    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return null;

    const isMaximizing = game.turn() === 'w';
    const result = this.minimaxPV(game, depth, -Infinity, Infinity, isMaximizing);
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
   * Ultra-Fast Non-Blocking Game Analyzer with Progress Feedback
   */
  async analyzeGameAsync(movesHistory, playerColor = 'white', startingFen = null, onProgress = null) {
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
    const totalMoves = movesHistory.length;

    for (let i = 0; i < totalMoves; i++) {
      // Yield to browser event loop every 3 moves to guarantee 60 FPS
      if (i % 3 === 0) {
        if (onProgress) {
          onProgress(Math.round((i / totalMoves) * 100));
        }
        await new Promise(resolve => setTimeout(resolve, 0));
      }

      const fenBefore = replayGame.fen();
      const isWhiteTurn = replayGame.turn() === 'w';
      const isPlayerMove = (isWhiteTurn && playerColor === 'white') || (!isWhiteTurn && playerColor === 'black');

      const rawEvalBefore = this.fastEvaluatePosition(replayGame);
      const winPctBefore = this.evalToWinPct(playerColor === 'white' ? rawEvalBefore : -rawEvalBefore);

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
      const winPctLoss = Math.max(0, winPctBefore - winPctAfter);

      let classification = 'good';
      let bestMoveBefore = null;
      let bestContinuationSteps = [];
      let bestContinuationSAN = '';
      let whyBestIsBetter = '';
      let whyPlayedIsBad = '';

      if (isPlayerMove) {
        const moveAcc = Math.max(0, Math.min(100, 100 - (winPctLoss * 2.2)));
        moveAccuracies.push(moveAcc);

        if (replayGame.in_checkmate()) {
          classification = 'best';
          analysisReport.bestMoves++;
        } else if (winPctLoss <= 4) {
          classification = 'best';
          analysisReport.bestMoves++;
        } else if (winPctLoss >= 25 || (rawEvalAfter <= (playerColor === 'white' ? -80000 : 80000))) {
          classification = 'blunder';
          analysisReport.blunders++;
        } else if (winPctLoss >= 12) {
          classification = 'mistake';
          analysisReport.mistakes++;
        } else if (winPctLoss >= 5) {
          classification = 'inaccuracy';
          analysisReport.inaccuracies++;
        } else {
          classification = 'good';
        }

        // Only compute deep continuation PV for suboptimal moves (blunders, mistakes, inaccuracies)
        if (['blunder', 'mistake', 'inaccuracy'].includes(classification)) {
          const simSearchGame = new Chess(fenBefore);
          const searchRes = this.minimaxPV(simSearchGame, 2, -Infinity, Infinity, isWhiteTurn);
          bestMoveBefore = searchRes.bestMove;
          const pvMoves = searchRes.pv || [];

          if (pvMoves.length > 0) {
            const simLineGame = new Chess(fenBefore);
            bestContinuationSteps.push({
              fen: fenBefore,
              san: 'Posisi Saat Ini',
              comment: 'Posisi sebelum Anda melangkah.',
              from: null,
              to: null
            });

            const sanList = [];
            for (let pIdx = 0; pIdx < pvMoves.length; pIdx++) {
              const pvMove = pvMoves[pIdx];
              const simRes = simLineGame.move(pvMove);
              if (simRes) {
                const movePrefix = `${Math.floor((i + pIdx) / 2) + 1}${simLineGame.turn() === 'b' ? '.' : '...'}`;
                sanList.push(`${movePrefix} ${simRes.san}`);
                
                let stepExplanation = '';
                if (simRes.captured) {
                  stepExplanation = `Memakan perwira di ${simRes.to} untuk merebut keunggulan materi poin.`;
                } else if (simRes.san.includes('+')) {
                  stepExplanation = `Memberi skak ke ${simRes.to} menekan Raja dan memaksa lawan bertahan.`;
                } else if (pIdx === 0) {
                  stepExplanation = `Langkah terbaik yang mendominasi kontrol sentral dan menekan kelemahan lawan.`;
                } else {
                  stepExplanation = `Langkah lanjutan terbaik untuk memaksimalkan keuntungan taktis posisi.`;
                }

                bestContinuationSteps.push({
                  fen: simLineGame.fen(),
                  san: `${movePrefix} ${simRes.san}`,
                  comment: stepExplanation,
                  from: simRes.from,
                  to: simRes.to
                });
              }
            }
            bestContinuationSAN = sanList.join(' ');
          }

          if (bestMoveBefore) {
            if (bestMoveBefore.captured) {
              whyBestIsBetter = `Saran langkah ${bestMoveBefore.san} langsung memakan perwira di ${bestMoveBefore.to} dan memenangkan materi.`;
            } else if (bestMoveBefore.san.includes('+')) {
              whyBestIsBetter = `Saran langkah ${bestMoveBefore.san} memberikan skak tajam yang merusak formasi lawan.`;
            } else {
              whyBestIsBetter = `Saran langkah ${bestMoveBefore.san} memaksimalkan koordinasi perwira dan menekan titik lemah lawan.`;
            }
          }

          if (moveObj.captured) {
            whyPlayedIsBad = `Langkah ${moveObj.san} Anda memakan bidak, tetapi membiarkan lawan mendapatkan inisiatif serangan balik yang lebih berbahaya.`;
          } else {
            whyPlayedIsBad = `Langkah ${moveObj.san} Anda terlalu pasif dan melepaskan tekanan menguntungkan yang seharusnya bisa Anda manfaatkan.`;
          }

          analysisReport.keyMoments.push({
            plyIndex: i,
            moveNumber: moveNumber,
            fenBefore: fenBefore,
            fenAfter: replayGame.fen(),
            playerMove: moveObj.san,
            playedFrom: moveObj.from,
            playedTo: moveObj.to,
            bestMove: bestMoveBefore ? bestMoveBefore.san : 'N/A',
            bestMoveFrom: bestMoveBefore ? bestMoveBefore.from : null,
            bestMoveTo: bestMoveBefore ? bestMoveBefore.to : null,
            continuationSteps: bestContinuationSteps,
            continuationSAN: bestContinuationSAN,
            whyBestIsBetter: whyBestIsBetter,
            whyPlayedIsBad: whyPlayedIsBad,
            classification: classification,
            winPctLoss: Math.round(winPctLoss),
            evalBefore: Math.round(winPctBefore),
            evalAfter: Math.round(winPctAfter)
          });
        }
      }

      analysisReport.positions.push({
        plyIndex: i,
        moveNumber: moveNumber,
        san: moveObj.san,
        fen: replayGame.fen(),
        evalScore: Math.round(this.evalToWinPct(rawEvalAfter)),
        classification: classification,
        isPlayerMove: isPlayerMove
      });
    }

    if (moveAccuracies.length > 0) {
      const avg = moveAccuracies.reduce((a, b) => a + b, 0) / moveAccuracies.length;
      analysisReport.accuracyPct = Math.round(avg);
    }

    if (onProgress) onProgress(100);
    return analysisReport;
  }

  analyzeGame(movesHistory, playerColor = 'white', startingFen = null) {
    return this.analyzeGameAsync(movesHistory, playerColor, startingFen);
  }
}

window.ChessEngine = ChessEngine;
