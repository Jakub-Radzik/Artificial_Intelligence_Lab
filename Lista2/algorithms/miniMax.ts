import { heuristics } from '../heuristics';
import { ReversiBoard } from '../types';
import { evaluateBoard } from '../utils/evaluateBoard';
import { isBoardFull } from '../utils/isBoardFull';
import { makeMove } from '../utils/makeMove';
import { printReversi } from '../utils/printReversi';
import getAvailableMoves from './availableMoves';

function minimax(
  board: ReversiBoard,
  depth: number,
  maximizingPlayer: boolean
): number | ReversiBoard {
  console.log('minimax');
  printReversi(board);
  const currentPlayer = maximizingPlayer ? 1 : 2;
  const oponent = maximizingPlayer ? 2 : 1;

  // Sprawdzamy czy osiągnęliśmy maksymalną głębokość, lub plansza jest już pełna

  // leaf node
  if (isBoardFull(board)) {
    return board;
  }

  if (depth === 0) {
    return evaluateBoard(
      board,
      currentPlayer,
      heuristics.player_1.countMyPieces
    );
  }

  if (maximizingPlayer) {
    let maxEval = Number.NEGATIVE_INFINITY;
    const availableMoves = getAvailableMoves(board, currentPlayer);

    if (availableMoves.length) {
      for (let i = 0; i < availableMoves.length; i++) {
        const newBoard = makeMove(
          board,
          currentPlayer,
          availableMoves[i][0],
          availableMoves[i][1]
        );
        const evaluation = minimax(newBoard, depth - 1, !maximizingPlayer);

        if (typeof evaluation !== 'number') return evaluation;

        maxEval = Math.max(maxEval, evaluation);
      }
      return maxEval;
    } else {
      // someone won and board is not full
      return board;
    }
  } else {
    let minEval = Number.POSITIVE_INFINITY;
    const availableMoves = getAvailableMoves(board, currentPlayer);

    if (availableMoves.length) {
      for (let i = 0; i < availableMoves.length; i++) {
        const newBoard = makeMove(
          board,
          currentPlayer,
          availableMoves[i][0],
          availableMoves[i][1]
        );
        const evaluation = minimax(newBoard, depth - 1, !maximizingPlayer);

        if (typeof evaluation !== 'number') return evaluation;

        minEval = Math.min(minEval, evaluation);
      }
      return minEval;
    } else {
      // someone won and board is not full
      return board;
    }
  }
}

export default minimax;
