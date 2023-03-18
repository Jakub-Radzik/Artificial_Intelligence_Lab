import { GraphNode } from '../types';

export const manhattanDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const euclideanDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

export const euclideanDistanceNodes = (
  node1: GraphNode,
  node2: GraphNode
): number =>
  euclideanDistance(
    node1.longitude,
    node1.latitude,
    node2.longitude,
    node2.latitude
  );

export const manhattanDistanceNodes = (
  node1: GraphNode,
  node2: GraphNode
): number =>
  manhattanDistance(
    node1.longitude,
    node1.latitude,
    node2.longitude,
    node2.latitude
  );
