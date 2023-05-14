import getAvailableMoves, {
  showAvailableMovesOnBoard,
} from './algorithms/availableMoves';
import { heuristics } from './heuristics';
import { ReversiBoard } from './types';
import { evaluateBoard } from './utils/evaluateBoard';
import { isBoardFull } from './utils/isBoardFull';
import { makeMove } from './utils/makeMove';
import { printReversi } from './utils/printReversi';
import { winner } from './utils/winner';

type MinimaxResult = {
  board: ReversiBoard;
  score: number;
}

const main = async () => {

  const player1_heuristic = heuristics.player_1.countMyPieces;
  const player2_heuristic = heuristics.player_1.countMyPieces;

  var invocations = 0;
  var time = 0; // ms

  function minimax(board: ReversiBoard, depth: number, maximizingPlayer: boolean): MinimaxResult {
      invocations++;

      const currentPlayer = maximizingPlayer ? 1 : 2;
      const oponent = maximizingPlayer ? 2 : 1;
      
      // Sprawdzamy czy osiągnęliśmy maksymalną głębokość, lub plansza jest już pełna

      if(isBoardFull(board) || depth === 0){
        return {
          board,
          score: evaluateBoard(board, currentPlayer, currentPlayer === 1 ? player1_heuristic : player2_heuristic),
        }
      }
    
      if (maximizingPlayer) {
        let maxEval = Number.NEGATIVE_INFINITY;
        let maxBoard = board;
        const availableMoves = getAvailableMoves(maxBoard, currentPlayer);

        if(availableMoves.length){
          for(let i = 0; i < availableMoves.length; i++){
            const newBoard = makeMove(board,currentPlayer, availableMoves[i][0], availableMoves[i][1]);
            const evaluation = minimax(newBoard, depth - 1, !maximizingPlayer);
            if(evaluation.score > maxEval) {
              maxBoard = evaluation.board;
              maxEval = evaluation.score;
            };
          }
          return {
            board: maxBoard,
            score: maxEval,
          };
        }else{
          // someone won and board is not full
          const winPlayer = winner(board);
          if(winPlayer === currentPlayer){
            return {
              board: maxBoard,
              score: Number.POSITIVE_INFINITY,
            };
          }else if(winPlayer === oponent){
            return {
              board: maxBoard,
              score: Number.NEGATIVE_INFINITY,
            };
          }else{
            return {
              board:maxBoard,
              score: 0,
            }
          }
        }
      } else {
        let minEval = Number.POSITIVE_INFINITY;
        let minBoard = board;

        const availableMoves = getAvailableMoves(minBoard, currentPlayer);

        if(availableMoves.length){
          for(let i = 0; i < availableMoves.length; i++){
            const newBoard = makeMove(board,currentPlayer, availableMoves[i][0], availableMoves[i][1]);
            const evaluation = minimax(newBoard, depth - 1, !maximizingPlayer);
            if(evaluation.score < minEval) {
              minBoard = evaluation.board;
              minEval = evaluation.score;
            }
          }
          return {
            board: minBoard,
            score: minEval,
          };
        }else{
          const winPlayer = winner(board);
          if(winPlayer === currentPlayer){
            return {
              board: minBoard,
              score: Number.NEGATIVE_INFINITY,
            };
          }else if(winPlayer === oponent){
            return {
              board: minBoard,
              score: Number.POSITIVE_INFINITY,
            };
          }else{
            return {
              board:minBoard,
              score: 0,
            }
          };
        }
      }
  };


  var invocations_ab = 0;
  var time_ab = 0; // ms
  function alphaBeta(board: ReversiBoard, depth: number, maximizingPlayer: boolean, alpha: number, beta: number): MinimaxResult {
    invocations_ab++;

    const currentPlayer = maximizingPlayer ? 1 : 2;
    const oponent = maximizingPlayer ? 2 : 1;
    
    // Sprawdzamy czy osiągnęliśmy maksymalną głębokość, lub plansza jest już pełna

    if(isBoardFull(board) || depth === 0){
      return {
        board,
        score: evaluateBoard(board, currentPlayer, currentPlayer === 1 ? player1_heuristic : player2_heuristic),
      }
    }
  
    if (maximizingPlayer) {
      let maxEval = Number.NEGATIVE_INFINITY;
      let maxBoard = board;
      const availableMoves = getAvailableMoves(maxBoard, currentPlayer);

      if(availableMoves.length){
        for(let i = 0; i < availableMoves.length; i++){
          const newBoard = makeMove(board,currentPlayer, availableMoves[i][0], availableMoves[i][1]);
          const evaluation = alphaBeta(newBoard, depth - 1, !maximizingPlayer, alpha, beta);
          if(evaluation.score > maxEval) {
            maxBoard = evaluation.board;
            maxEval = evaluation.score;
          };

          alpha = Math.max(alpha, evaluation.score);
          if(beta <= alpha){
            break;
          }
        }
        return {
          board: maxBoard,
          score: maxEval,
        };
      }else{
        // someone won and board is not full
        const winPlayer = winner(board);
        if(winPlayer === currentPlayer){
          return {
            board: maxBoard,
            score: Number.POSITIVE_INFINITY,
          };
        }else if(winPlayer === oponent){
          return {
            board: maxBoard,
            score: Number.NEGATIVE_INFINITY,
          };
        }else{
          return {
            board:maxBoard,
            score: 0,
          }
        }
      }
    } else {
      let minEval = Number.POSITIVE_INFINITY;
      let minBoard = board;

      const availableMoves = getAvailableMoves(minBoard, currentPlayer);

      if(availableMoves.length){
        for(let i = 0; i < availableMoves.length; i++){
          const newBoard = makeMove(board,currentPlayer, availableMoves[i][0], availableMoves[i][1]);
          const evaluation = alphaBeta(newBoard, depth - 1, !maximizingPlayer, alpha, beta);
          if(evaluation.score < minEval) {
            minBoard = evaluation.board;
            minEval = evaluation.score;
          }
          
          beta = Math.min(beta, evaluation.score);
          if(beta <= alpha){
            break;
          }
        }
        return {
          board: minBoard,
          score: minEval,
        };
      }else{
        const winPlayer = winner(board);
        if(winPlayer === currentPlayer){
          return {
            board: minBoard,
            score: Number.NEGATIVE_INFINITY,
          };
        }else if(winPlayer === oponent){
          return {
            board: minBoard,
            score: Number.POSITIVE_INFINITY,
          };
        }else{
          return {
            board:minBoard,
            score: 0,
          }
        };
      }
    }
};


  // 0 - free space
  // 1 - player 1
  // 2 - player 2
  // const reversi: ReversiBoard = [
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 1, 2, 2, 2, 2, 2, 0],
  //   [0, 1, 1, 1, 1, 1, 2, 0],
  //   [0, 1, 1, 1, 1, 1, 2, 0],
  //   [0, 1, 1, 1, 1, 1, 0, 0],
  //   [0, 1, 1, 1, 1, 1, 2, 0],
  //   [0, 1, 1, 1, 1, 1, 2, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  // ];

  const reversi: ReversiBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
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

  // MINIMAX
  let start = new Date();
  let rounds = 0;
  // Parzysta głębokość i maximizing na true - gracz 1
  const depth = 3;
  const maximizingPlayer = true;

  let res = minimax(reversi, depth, maximizingPlayer);
  rounds+=depth;
  let isOver = isBoardFull(res.board);
  printReversi(res.board);

  while(!isOver){
    res = minimax(res.board, depth, rounds % 2 === 0 ? maximizingPlayer : !maximizingPlayer );
    rounds += depth;
    isOver = !getAvailableMoves(res.board, 1).length || !getAvailableMoves(res.board, 2).length;
  }

  time = new Date().getTime() - start.getTime();

  console.log('MiniMax result:');
  printReversi(res.board);
  console.log(`Rounds: ${rounds}; Time: ${time}ms; Invocations: ${invocations}; Winner: ${winner(res.board)}`);


  // ALPHABETA
  let start_ab = new Date();
  let rounds_ab = 0;

  let res_ab = alphaBeta(reversi, depth, maximizingPlayer, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  rounds_ab+=depth;
  let isOverAB = isBoardFull(res_ab.board);
  printReversi(res_ab.board);

  while(!isOverAB){
    res_ab = alphaBeta(res_ab.board, depth, rounds_ab % 2 === 0 ? maximizingPlayer : !maximizingPlayer, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY );
    rounds_ab += depth;
    isOverAB = !getAvailableMoves(res_ab.board, 1).length || !getAvailableMoves(res_ab.board, 2).length;
  }

  time_ab = new Date().getTime() - start_ab.getTime();

  console.log('AlphaBeta result:');
  printReversi(res_ab.board);
  console.log(`Rounds: ${rounds_ab}; Time: ${time_ab}ms; Invocations: ${invocations_ab}; Winner: ${winner(res_ab.board)}`);


};

main();
