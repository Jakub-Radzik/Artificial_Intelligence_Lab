import { Graph, GraphEdge, GraphNode } from '../../types';
import { calculateTimeCost } from '../../utils/time';
import * as moment from 'moment';
import path = require('path');

type Distance = Record<
  string,
  {
    node: GraphNode;
    distance: number;
    time: number;
  }
>;

type ParentMap = Record<string, {
  nodeName: string;
  edge: GraphEdge
}>;

export const dijkstra = (graph: Graph, start: GraphNode, end: GraphNode, initialDepartureTime:string) => {
  const parentMap: ParentMap = {};
  const startTime = moment(initialDepartureTime, 'HH:mm');
  let arrivalTimeToStop = moment(initialDepartureTime, 'HH:mm');

  // STEP 1: Initialize distances from start to all other nodes to infinity
  const distances: Distance = {};
  for (const nodeId in graph.nodes) {
    distances[nodeId] = {
      node: graph.nodes[nodeId],
      distance: Infinity,
      time: Infinity,
    };
  }

  distances[start.stopId] = {
    node: start,
    distance: 0,
    time: 0,
  };

  // STEP 2: Create a set of unvisited nodes, initially containing all nodes in the graph.

  const unvisitedNodes = new Set(Object.keys(graph.nodes));

  // STEP 3: While there are still unvisited nodes, find the node with
  // the smallest distance to the starting node from the set of
  // unvisited nodes. This can be done by iterating over all nodes
  // in the set and keeping track of the node with the smallest distance.

  let endFound = false;
  let isFirstIteration = true;

  while (unvisitedNodes.size > 0 && !endFound) {
    const closestNodeName = findNodeWithClosestTime(
      distances,
      unvisitedNodes
    );
    if (closestNodeName) {
      // STEP 4: For the selected node, iterate over its outgoing edges and update
      // the distance to each neighboring node if the distance through
      // the current node is shorter than the previously calculated distance.
      // You can calculate the distance through the current node by adding
      // the distance property of the edge to the distance to the current node.
      // You can store the parent node of each neighboring node to reconstruct the shortest path later.

      const closestNode = distances[closestNodeName];

      arrivalTimeToStop.add(closestNode.time, 'minutes');

      closestNode.node.outgoingEdges.forEach(edge => {
        const neighbor = distances[edge.endNode.stopId];

        let departureTime = moment(edge.departureTime, 'HH:mm');
        let arrivalTime = moment(edge.arrivalTime, 'HH:mm');

        if(departureTime.isBefore(arrivalTimeToStop)){
          departureTime.add(1, 'day');
          arrivalTime.add(1, 'day');
        }

        const timeThroughNode = departureTime.diff(arrivalTimeToStop, 'minutes')  + closestNode.time+arrivalTime.diff(departureTime, 'minutes')

        const distanceThroughNode = closestNode.distance + edge.distance;

        if (timeThroughNode < neighbor.time) {
          distances[neighbor.node.stopId] = {
            node: neighbor.node,
            distance: distanceThroughNode,
            time: timeThroughNode,
          };
          //! here some way to remember edge
          parentMap[neighbor.node.stopId] = {
            nodeName: closestNode.node.stopId,
            edge
          };

          // parentMap[neighbor.node.stopId] = closestNode.node.stopId;
        }
      });
      arrivalTimeToStop.subtract(closestNode.time, 'minutes');

      // STEP 5: Once all neighboring nodes have been updated, 
      // remove the selected node from the set of unvisited nodes.

      unvisitedNodes.delete(closestNodeName);
      isFirstIteration = false;
      // STEP 6: Repeat steps 3-5 until the destination node
      //  is visited or there are no more unvisited nodes.

      endFound = closestNodeName === end.stopId;
    }
  }

  // STEP 7: Once the destination node is visited, 
  // the shortest path from the starting node 
  // to the destination node can be reconstructed 
  // by backtracking from the destination node using the parent pointers.

  // construct path
  const path: {node:GraphNode, edge?: GraphEdge}[] = [];
  let currentNode = end;
  let edge = parentMap[end.stopId].edge;
  while (currentNode.stopId !== start.stopId) {
    path.push({node: currentNode, edge});
    currentNode = graph.nodes[parentMap[currentNode.stopId].nodeName];
    edge = parentMap[currentNode.stopId]?.edge
  }
  path.push({node:start});

  path.reverse()
  
  console.log(`You want to go from ${start.stopName} to ${end.stopName} and you start at ${initialDepartureTime}`)
  for(let i = 1; i < path.length; i++ ){
    console.log(`${path[i].edge.startNode.stopName} (${path[i].edge.departureTime}) -> ${path[i].edge.endNode.stopName} (${path[i].edge.arrivalTime}) [LINE: ${path[i].edge.lineName}]`)
  }
  console.log(`COST: ${distances[end.stopId].time}`)

  return {
    path,
  }
};

function findNodeWithClosestTime(
  distances: Distance,
  unvisitedNodes: Set<string>,
): string | null {
  let smallestTime = Infinity;
  let closestNode: string | null = null;

  for (const nodeId of unvisitedNodes) {
    if (distances[nodeId].time < smallestTime) {
      smallestTime = distances[nodeId].time;
      closestNode = nodeId;
    }
  }

  return closestNode;
}


// we arrive at t1
// we have to wait for t2 = cost(t1, node.departureTime) + node.duration
