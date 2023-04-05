import { ReversiBoard, ReversiPlaceState } from '../types';

function getAvailableMoves(
  board: ReversiBoard,
  player: number
): [number, number][] {
  const moves: [number, number][] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === ReversiPlaceState.EMPTY) {
        if (isValidMove(board, i, j, player)) {
          moves.push([i, j]);
        }
      }
    }
  }
  return moves;
}

function isValidMove(
  board: ReversiBoard,
  row: number,
  col: number,
  player: number
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
  const directions = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
    [1, 1], // diagonal down-right
    [1, -1], // diagonal down-left
    [-1, 1], // diagonal up-right
    [-1, -1], // diagonal up-left
  ];
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
