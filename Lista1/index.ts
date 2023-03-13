import { findShortestPath } from './algorithms/dijkstra';
import { createGraph } from './algorithms/graphCreator';
import { readCsv } from './utils/csv';

const main = async () => {
  const rows = await readCsv('./data/connection_graph.csv');
  const graph = createGraph(rows);

  // console.log(graph);

  const nodeLesnica = graph.nodes['LEŚNICA'];
  const nodeWschowska = graph.nodes['Wschowska'];
  const startTime = new Date('2020-01-01T12:20:00.000Z');

  const res = findShortestPath(nodeLesnica, nodeWschowska, startTime);

  console.log(res);
};

main();
