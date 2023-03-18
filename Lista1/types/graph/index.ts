export type GraphNode = {
  stopId: string;
  stopName: string;
  latitude: number;
  longitude: number;
  outgoingEdges: GraphEdge[];
  g?: number;
  h?: number;
  f?: number;
  cameFrom?: GraphNode;
  cameUsing?: GraphEdge;
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
