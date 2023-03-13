import { dijkstra } from './algorithms/dijkstra';
import { createGraph } from './algorithms/graphCreator';
import { readCsv } from './utils/csv';

const main = async () => {
  const rows = await readCsv('./data/connection_graph.csv');
  const graph = createGraph(rows);

  // console.log(graph);

  const nodeLesnica = graph.nodes['LEŚNICA'];
  const nodeWschowska = graph.nodes['Wschowska'];

  const res = dijkstra(graph, nodeLesnica, nodeWschowska, '12:20:00');

  console.log(res);
};

main();
