import moment = require('moment');
import { dijkstra } from './algorithms/dijkstra';
import { createGraph } from './algorithms/graphCreator';
import { readCsv } from './utils/csv';

const main = async () => {
  const rows = await readCsv('./data/connection_graph.csv');
  const graph = createGraph(rows);

  const time1 = moment('15:00', 'HH:mm');
  const time2 = moment('15:01', 'HH:mm');

  const diffInMinutes = time1.diff(time2, 'minutes');
  const nodeLesnica = graph.nodes['LEŚNICA'];
  const nodeWschowska = graph.nodes['FAT'];

  const res = dijkstra(graph, nodeLesnica, nodeWschowska, '15:00');

  console.log(res);
};

main();
