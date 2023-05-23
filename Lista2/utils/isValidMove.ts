import { ReversiBoard, directions } from '../types';

export function isValidMove(
  board: ReversiBoard,
  player: number,
  row: number,
  col: number
): boolean {
  // Check if space is empty
  if (board[row][col] !== 0) return false;

  // Check if move is adjacent to opponent's piece
  const opponent = player === 1 ? 2 : 1;
  let isAdjacentToOpponent = false;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i < 0 || i >= board.length || j < 0 || j >= board[i].length) {
        continue;
      }
      if (board[i][j] === opponent) {
        isAdjacentToOpponent = true;
        break;
      }
    }
    if (isAdjacentToOpponent) {
      break;
    }
  }
  if (!isAdjacentToOpponent) {
    return false;
  }

  // Check if move creates a valid line
  let isValid = false;
  for (const [dx, dy] of directions) {
    let hasOpponent = false;
    let x = row + dx;
    let y = col + dy;
    while (x >= 0 && x < board.length && y >= 0 && y < board[x].length) {
      if (board[x][y] === 0) {
        break;
      } else if (board[x][y] === player) {
        isValid = hasOpponent;
        break;
      } else {
        hasOpponent = true;
      }
      x += dx;
      y += dy;
    }
    if (isValid) {
      break;
    }
  }
  return isValid;
}
