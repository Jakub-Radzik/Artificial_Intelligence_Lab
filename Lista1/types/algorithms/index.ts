//Used in dijkstra algo
export type Distance = Record<
  string,
  {
    node: GraphNode;
    distance: number;
    time: number;
  }
>;

export type ParentMap = Record<
  string,
  {
    nodeName: string;
    edge: GraphEdge;
  }
>;