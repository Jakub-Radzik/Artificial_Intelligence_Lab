import { ReversiBoard } from '../types';

export const printReversi = (reversi: ReversiBoard) => {
  let res = '';

  for (let i = 0; i < reversi.length; i++) {
    for (let j = 0; j < reversi[i].length; j++) {
      res += `${reversi[i][j]} `;
    }
    res += '\n';
  }

  console.log(res);
  return res;
};
