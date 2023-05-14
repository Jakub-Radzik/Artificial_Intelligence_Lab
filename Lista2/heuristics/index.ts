import getAvailableMoves from '../algorithms/availableMoves';
import { Heuristics, ReversiBoard } from '../types';
import { getControlledZone } from '../utils/getControlZone';

export const heuristics: Heuristics = {
  player_1: {
    /**
     * Liczba krążków:
     * Im więcej krążków ma gracz 1, tym lepszy jest jego stan.
     * Ta heurystyka po prostu liczy ile krążków ma gracz 1 w porównaniu z graczem 2.
     * @returns {number} Number of player 1's discs
     */
    countMyPieces: (board: ReversiBoard, player: 1 | 2) => {
      let count1 = 0;
      let count2 = 0;
      for (let row of board) {
        for (let piece of row) {
          if(piece === 1) count1++;
          if(piece === 2) count2++;
        }
      }
      return player === 1 ? count1-count2 : count2-count1; 
    },

    /**
     * Ruchy:
     * Im więcej możliwych ruchów ma gracz 1, tym lepszy jest jego stan.
     * Ta heurystyka może pomóc graczowi 1 kontrolować planszę i
     * utrudnić graczowi 2 wykonywanie ruchów.
     * @param board
     * @param player
     * @returns {number} Number of player 1's available moves
     */
    countMyMoves: (board: ReversiBoard, player: number) =>
      getAvailableMoves(board, player).length,

    /**
     * Strefa wpływu:
     * Ta heurystyka ocenia, ile przestrzeni
     * na planszy kontroluje gracz 1 w porównaniu z graczem 2.
     * Im więcej pól wokół pionków gracz 1 jest zajęte,
     * tym większy jest wpływ gracza 1 na planszę.
     * @returns {number} Number of player 1's influence zone
     */
    controlZone: (board: ReversiBoard, player: number) => {
      let count = 0;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === player) {
            // Jeśli pole należy do gracza, sprawdzamy jego kontrolowaną strefę.
            // Strefa kontrolowana to zbiór pól bezpośrednio przylegających do tego pola.
            // Sprawdzamy każde pole w strefie kontrolowanej i dodajemy punkt, jeśli pole jest wolne lub należy do gracza.
            const controlledZone = getControlledZone(board, i, j);
            for (let cell of controlledZone) {
              if (
                board[cell[0]][cell[1]] === 0 ||
                board[cell[0]][cell[1]] === player
              ) {
                count++;
              }
            }
          }
        }
      }
      return count;
    },
  },
  player_2: {
    /**
     * Heurystyka ta zwraca ilość stabilnych krążków gracza na planszy.
     * Stabilne krążki to takie, których pozycja na planszy jest trudna
     * do zmiany przez przeciwnika, czyli znajdują się na krańcach planszy
     * lub są otoczone krążkami gracza. Im więcej stabilnych krążków
     * posiada gracz, tym lepiej oceniana jest jego pozycja na planszy.
     * @param board
     * @param player
     * @returns {number} Number of player's stable discs
     */
    countStableDiscs: (board: ReversiBoard, player: number) => {
      let count = 0;
      const width = board[0].length;
      const height = board.length;
      const corners = [
        [0, 0],
        [0, height - 1],
        [width - 1, 0],
        [width - 1, height - 1],
      ];
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ];

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (board[i][j] === player) {
            let isStable = true;
            for (const [dx, dy] of directions) {
              let x = j + dx;
              let y = i + dy;
              while (x >= 0 && x < width && y >= 0 && y < height) {
                if (board[y][x] === 0) {
                  isStable = false;
                  break;
                } else if (board[y][x] === player) {
                  break;
                }
                x += dx;
                y += dy;
              }
              if (!isStable) {
                break;
              }
            }
            if (isStable) {
              count++;
              if (corners.some(([x, y]) => x === j && y === i)) {
                count += 5;
              }
            }
          }
        }
      }

      return count;
    },

    /**
     * Heurystyka ta zwraca ilość dostępnych ruchów gracza na planszy.
     * Im więcej możliwych ruchów ma gracz, tym większe ma możliwości
     * w grze i tym lepiej oceniana jest jego pozycja na planszy.
     * @param board
     * @param player
     * @returns {number} Number of player's available moves over opponent's available moves
     */
    countMobility: (board: ReversiBoard, player: number) => {
      const oponent = player === 1 ? 2 : 1;
      let playerMoves = getAvailableMoves(board, player);
      let oponentMoves = getAvailableMoves(board, oponent);

      return playerMoves.length - oponentMoves.length;
    },

    /**
     * Heurystyka ta zwraca ilość krążków gracza,
     * które znajdują się w rogach planszy.
     * Rogi planszy są bardzo ważne w grze w Reversi,
     * ponieważ ruchy wykonywane w ich pobliżu dają
     * dużo możliwości do zdobycia przewagi nad przeciwnikiem.
     * Im więcej krążków gracza znajduje się w rogach planszy,
     * tym lepiej oceniana jest jego pozycja na planszy.
     * @param board
     * @param player
     * @returns {number} Number of player's discs in corners
     */
    countCorners: (board: ReversiBoard, player: number) => {
      const corners = [
        [0, 0],
        [0, board.length - 1],
        [board[0].length - 1, 0],
        [board[0].length - 1, board.length - 1],
      ];

      let count = 0;
      for (const [x, y] of corners) {
        if (board[y][x] === player) {
          count++;
        }
      }

      return count;
    },
  },
};
