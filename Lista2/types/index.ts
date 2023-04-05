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
