import { createGraph } from './algorithms/graphCreator';
import { readCsv } from './utils/csv';

const main = async () => {
  const rows = await readCsv('./data/connection_graph.csv');
  const nodes = createGraph(rows);
  console.log(nodes);
};

main();
