import { dijkstra } from './algorithms/dijkstra';
import { createGraph } from './algorithms/graphCreator';
import { readCsv } from './utils/csv';

const main = async () => {
  const rows = await readCsv('./data/connection_graph.csv');
  const graph = createGraph(rows);

  const nodeStart = graph.nodes['LEŚNICA'];
  const nodeEnd = graph.nodes['FAT'];

  dijkstra(graph, nodeStart, nodeEnd, '15:00');

};

main();
