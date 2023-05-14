import { Heuristic, ReversiBoard } from '../types';

export const evaluateBoard = (
  board: ReversiBoard,
  currentPlayer: number,
  heuristic: Heuristic
): number => {
  return heuristic(board, currentPlayer);
};
