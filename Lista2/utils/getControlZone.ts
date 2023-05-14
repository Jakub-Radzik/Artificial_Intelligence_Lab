import { ReversiBoard } from '../types';

export function getControlledZone(
  board: ReversiBoard,
  row: number,
  col: number
): number[][] {
  const controlledZone = [];
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (
        i >= 0 &&
        i < board.length &&
        j >= 0 &&
        j < board[i].length &&
        (i !== row || j !== col)
      ) {
        controlledZone.push([i, j]);
      }
    }
  }
  return controlledZone;
}
