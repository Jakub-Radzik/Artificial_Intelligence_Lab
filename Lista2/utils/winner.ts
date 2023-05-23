import { ReversiBoard } from '../types';

// Winner in the moment of the game
export const winner = (board: ReversiBoard) => {
  let player_1Counter = 0;
  let player_2Counter = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === 1) {
        player_1Counter++;
      } else if (board[i][j] === 2) {
        player_2Counter++;
      }
    }
  }

  if (player_1Counter > player_2Counter) {
    return 1;
  } else if (player_1Counter < player_2Counter) {
    return 2;
  } else {
    return 0;
  }
};
