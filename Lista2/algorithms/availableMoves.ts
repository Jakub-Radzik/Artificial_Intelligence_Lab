import { ReversiBoard, ReversiPlaceState } from '../types';
import { isValidMove } from '../utils/isValidMove';

function getAvailableMoves(
  board: ReversiBoard,
  player: number
): [number, number][] {
  const moves: [number, number][] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === ReversiPlaceState.EMPTY) {
        if (isValidMove(board, player, i, j)) {
          moves.push([i, j]);
        }
      }
    }
  }
  return moves;
}

export const showAvailableMovesOnBoard = (
  board: ReversiBoard,
  availableMoves: [number, number][]
): ReversiBoard => {
  const newBoard = board.map(row => row.map(col => col));
  availableMoves.forEach(([row, col]) => {
    newBoard[row][col] = ReversiPlaceState.AVAILABLE_MOVE;
  });

  return newBoard;
};

export default getAvailableMoves;
