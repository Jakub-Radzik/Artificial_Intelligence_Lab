export type GraphNode = {
  stopId: string;
  stopName: string;
  latitude: string;
  longitude: string;
  outgoingEdges: GraphEdge[];
};

export type GraphEdge = {
  startNodeId: string;
  endNodeId: string;
  lineName: string;
  departureTime: string;
  arrivalTime: string;
  startNode?: GraphNode;
  endNode?: GraphNode;
  durationMinutes?: number; 
};

export type Graph = {
  nodes: Record<string, GraphNode>;
  edges: GraphEdge[];
};
