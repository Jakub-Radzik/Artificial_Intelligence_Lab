import getAvailableMoves, {
  showAvailableMovesOnBoard,
} from './algorithms/availableMoves';
import { ReversiBoard } from './types';
import { printReversi } from './utils/printReversi';

const main = async () => {
  // 0 - free space
  // 1 - player 1
  // 2 - player 2
  const reversi: ReversiBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 2, 2, 2, 2, 0],
    [0, 1, 1, 1, 1, 1, 2, 0],
    [0, 1, 1, 1, 1, 1, 2, 0],
    [0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 2, 0],
    [0, 1, 1, 1, 1, 1, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  // 1 or 2
  const player = 2;

  // Current state
  console.log('Current state:');
  printReversi(reversi);

  const availableMoves = getAvailableMoves(reversi, player);
  const availableMovesOnBoard = showAvailableMovesOnBoard(
    reversi,
    availableMoves
  );

  console.log('available moves:');
  printReversi(availableMovesOnBoard);

  console.log('after:');
  printReversi(reversi);
};

main();
