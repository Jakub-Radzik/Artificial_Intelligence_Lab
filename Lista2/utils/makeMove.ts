import { ReversiBoard, ReversiPlaceState } from '../types';
import { isValidMove } from './isValidMove';

export const makeMove = (
  board: ReversiBoard,
  player: number,
  row: number,
  col: number
): ReversiBoard => {
  const newBoard: ReversiBoard = JSON.parse(JSON.stringify(board));

  // check if move is valid
  if (!isValidMove(board, player, row, col)) {
    throw new Error('Invalid move - HOW DID YOU DO THAT ?');
  }
  newBoard[row][col] = player;

  // Change opponent's pieces between player's pieces to player's color
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (
        i >= 0 &&
        i < 8 &&
        j >= 0 &&
        j < 8 &&
        board[i][j] !== 0 &&
        board[i][j] !== player
      ) {
        const rowDiff = i - row;
        const colDiff = j - col;
        let k = 2;
        while (true) {
          const r = row + k * rowDiff;
          const c = col + k * colDiff;
          if (r < 0 || r >= 8 || c < 0 || c >= 8 || board[r][c] === 0) {
            break;
          }
          if (board[r][c] === player) {
            for (let l = 1; l < k; l++) {
              newBoard[row + l * rowDiff][col + l * colDiff] = player;
            }
            break;
          }
          k++;
        }
      }
    }
  }

  return newBoard;
};
