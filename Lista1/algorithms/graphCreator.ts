import { CsvRow, Graph, GraphEdge, GraphNode } from '../types';
import { manhattanDistance } from '../utils/distance';
import { getMinutesDifference } from '../utils/time';

const rowToNode = (row: CsvRow): GraphNode => {
  return {
    stopId: row.start_stop,
    stopName: row.start_stop,
    latitude: parseFloat(row.start_stop_lat),
    longitude: parseFloat(row.start_stop_lon),
    outgoingEdges: [],
  };
};

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
      startNode = rowToNode(row);
      graph.nodes[row.start_stop] = startNode;
    }

    // Create end node if it doesn't exist
    let endNode = graph.nodes[row.end_stop];
    if (!endNode) {
      endNode = rowToNode(row);
      graph.nodes[row.end_stop] = endNode;
    }

    // Create edge
    const edge: GraphEdge = {
      lineName: row.line,
      departureTime: row.departure_time,
      arrivalTime: row.arrival_time,
      startNode,
      endNode,
      durationMinutes: getMinutesDifference(
        row.departure_time,
        row.arrival_time
      ),
      distance: manhattanDistance(
        startNode.longitude,
        startNode.latitude,
        endNode.longitude,
        endNode.latitude
      ),
    };
    graph.edges.push(edge);

    // Add edge to start node's outgoing edges
    startNode.outgoingEdges.push(edge);
  });

  return graph;
};
