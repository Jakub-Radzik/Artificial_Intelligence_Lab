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

export function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);
  const deltaPhi = toRadians(lat2 - lat1);
  const deltaLambda = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  return parseFloat((d / 1000).toFixed(3));
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
