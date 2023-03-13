import { CsvRow, Graph, GraphEdge } from '../types';
import { getMinutesDifference } from '../utils/time';

export const createGraph = (rows: CsvRow[]) => {
  const graph: Graph = {
    nodes: {},
    edges: [],
  };

  // Iterate over each row and create nodes and edges as we go
  rows.forEach(row => {
    // Create start node if it doesn't exist
    let startNode = graph.nodes[row.start_stop];

    if (!startNode) {
      startNode = {
        stopId: row.start_stop,
        stopName: row.start_stop,
        latitude: row.start_stop_lat,
        longitude: row.start_stop_lon,
        outgoingEdges: [],
      };
      graph.nodes[row.start_stop] = startNode;
    }

    // Create end node if it doesn't exist
    let endNode = graph.nodes[row.end_stop];
    if (!endNode) {
      endNode = {
        stopId: row.end_stop,
        stopName: row.end_stop,
        latitude: row.end_stop_lat,
        longitude: row.end_stop_lon,
        outgoingEdges: [],
      };
      graph.nodes[row.end_stop] = endNode;
    }

    // Create edge
    const edge: GraphEdge = {
      startNodeId: row.start_stop,// useless
      endNodeId: row.end_stop,// useless
      lineName: row.line,
      departureTime: row.departure_time,
      arrivalTime: row.arrival_time,
      startNode,
      endNode,
      durationMinutes: getMinutesDifference(row.departure_time, row.arrival_time)
    };
    graph.edges.push(edge);

    // Add edge to start node's outgoing edges
    startNode.outgoingEdges.push(edge);
  });

  return graph;
};
