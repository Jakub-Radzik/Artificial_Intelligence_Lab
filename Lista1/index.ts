import moment = require('moment');
import { aStar } from './algorithms/a-star-time';
import { aStar as aStarLine } from './algorithms/a-star-line-change';
import { dijkstra } from './algorithms/dijkstra';
import { createGraph } from './algorithms/graphCreator';
import { readCsv } from './utils/csv';

const run = async (
  start: string,
  end: string,
  time: string,
  type: 'd' | 't' | 'p'
) => {
  const rows = await readCsv('./data/connection_graph.csv');

  let graph = createGraph(rows);
  const nodeStart = graph.nodes[start];
  const nodeEnd = graph.nodes[end];

  if (!nodeStart || !nodeEnd) {
    throw new Error('Node not found');
  }

  if (type === 'd') {
    console.log(
      '----------------------------------------------------------------------------'
    );
    console.log(`Dijkstra: ${start} -> ${end}`);
    const { path, timeOfCalculations, cost } = dijkstra(
      graph,
      nodeStart,
      nodeEnd,
      time
    );
    return `(   DIJKSTRA   )  START AT:${time} ${start} -> ${end} |CALC: ${timeOfCalculations}ms | ${cost}| DURATION: ${moment(
      path[path.length - 1].edge.arrivalTime,
      'HH:mm'
    ).diff(moment(time, 'HH:mm'), 'minutes')}`;
  }
  if (type === 't') {
    console.log(
      '----------------------------------------------------------------------------'
    );
    console.log(`A* TIME: ${start} -> ${end}`);
    const { path, timeOfCalculations, cost } = aStar(nodeStart, nodeEnd, time);
    return `( A* min. TIME )  START AT:${time} ${start} -> ${end} |CALC: ${timeOfCalculations}ms | ${cost}| DURATION: ${
      path[path.length - 1].node.currentDuration
    }`;
  }

  if (type === 'p') {
    console.log(
      '----------------------------------------------------------------------------'
    );
    console.log(`A* TIME: ${start} -> ${end}`);
    const { path, timeOfCalculations, cost } = aStarLine(
      nodeStart,
      nodeEnd,
      time
    );
    return `(A* min. CHANGE)  START AT:${time} ${start} -> ${end} |CALC: ${timeOfCalculations}ms | ${cost}| DURATION: ${
      path[path.length - 1].node.currentDuration
    }`;
  }
};

const main = async () => {
  const res = [];

  // res.push(await run('LEŚNICA', 'BISKUPIN', '15:00', 'd'));
  // res.push(await run('LEŚNICA', 'BISKUPIN', '15:00', 't'));
  // res.push(await run('LEŚNICA', 'BISKUPIN', '15:00', 'p'));

  // res.push(await run('LEŚNICA', 'Rynek', '15:00', 'd'));
  // res.push(await run('LEŚNICA', 'Rynek', '15:00', 't'));
  // res.push(await run('LEŚNICA', 'Rynek', '15:00', 'p'));

  // res.push(await run('LEŚNICA', 'KROMERA', '21:37', 'd'));
  // res.push(await run('LEŚNICA', 'KROMERA', '21:37', 't'));
  // res.push(await run('LEŚNICA', 'KROMERA', '21:37', 'p'));

  // res.push(await run('Hala Stulecia', 'Jerzmanowska nr 9', '05:37', 'd'));
  // res.push(await run('Hala Stulecia', 'Jerzmanowska nr 9', '05:37', 't'));
  // res.push(await run('Hala Stulecia', 'Jerzmanowska nr 9', '05:37', 'p'));

  // INIT
  const start = 'Hala Stulecia';
  const end = 'Jerzmanowska nr 9';
  const time = '05:39';
  const k = 'p';

  res.push(await run(start, end, time, k));

  console.log(res);
};

main();
