/**
 * USE TYPE NUMBER IN BOARD
 * 0 - EMPTY
 * 1 - PLAYER 1
 * 2 - PLAYER 2
 * X - AVAILABLE MOVE
 */

export enum ReversiPlaceState {
  EMPTY = 0,
  PLAYER_1 = 1,
  PLAYER_2 = 2,
  AVAILABLE_MOVE = 'X',
}

export type ReversiBoard = ReversiPlaceState[][];

export interface Heuristic {
  (board: ReversiBoard, player: number): number;
}

export type HeuristicSet = {
  [key: string]: Heuristic;
};

export type Heuristics = {
  player_1: HeuristicSet;
  player_2: HeuristicSet;
};

export const directions: [number, number][] = [
  [0, 1], // right
  [0, -1], // left
  [1, 0], // down
  [-1, 0], // up
  [1, 1], // diagonal down-right
  [1, -1], // diagonal down-left
  [-1, 1], // diagonal up-right
  [-1, -1], // diagonal up-left
];
