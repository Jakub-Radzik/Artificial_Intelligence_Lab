import { aStar } from './algorithms/a-star';
import { dijkstra } from './algorithms/dijkstra';
// import { dijkstra } from './algorithms/dijkstra';
import { createGraph } from './algorithms/graphCreator';
import { readCsv } from './utils/csv';

const main = async () => {
  const rows = await readCsv('./data/connection_graph.csv');
  let graph = createGraph(rows);

  const nodeStart = graph.nodes['Sołtysowicka'];
  const nodeEnd = graph.nodes['BRZEZINA (pętla)'];

  // const nodeStart =  graph.nodes['BRZEZINA (pętla)'];
  // const nodeEnd = graph.nodes['Sołtysowicka'];

  // const nodeStart =  graph.nodes['LEŚNICA'];
  // const nodeEnd = graph.nodes['BISKUPIN'];

  console.log('Dijkstra: ');
  dijkstra(graph, nodeStart, nodeEnd, '15:00');

  console.log('AStar: ');
  graph = createGraph(rows);
  aStar(nodeStart, nodeEnd, '15:00');
};

main();
