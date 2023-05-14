import { ReversiBoard } from '../types';

export const isBoardFull = (board: ReversiBoard): boolean => {
  // console.log(board);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
};
