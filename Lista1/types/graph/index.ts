export type GraphNode = {
  stopId: string;
  stopName: string;
  latitude: number;
  longitude: number;
  outgoingEdges: GraphEdge[];
};

export type GraphEdge = {
  startNode: GraphNode;
  endNode: GraphNode;
  lineName: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  distance: number;
};

export type Graph = {
  nodes: Record<string, GraphNode>;
  edges: GraphEdge[];
};
