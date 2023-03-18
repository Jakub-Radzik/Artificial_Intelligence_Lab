import moment = require('moment');
import { GraphEdge, GraphNode } from '../../types';
import { euclideanDistanceNodes } from '../../utils/distance';

// type AStarNode = {
//     node: GraphNode;
//     g: number;
//     h: number;
//     f: number;
// }

export const aStar = (
  start: GraphNode,
  end: GraphNode,
  initialDepartureTime: string
) => {
  let arrivalTimeToStop = moment(initialDepartureTime, 'HH:mm');

  const f = (node: GraphNode) => node.g + node.h;

  const h = (node: GraphNode, endNode: GraphNode) => {
    return euclideanDistanceNodes(node, endNode);
  };

  // pass startNode because in edge.StartNode g value is undefined
  //   startNode.g = 0; // distance from start
  const g = (startNode: GraphNode, edge: GraphEdge) => {
    let departureTime = moment(edge.departureTime, 'HH:mm');
    let arrivalTime = moment(edge.arrivalTime, 'HH:mm');

    if (departureTime.isBefore(arrivalTimeToStop)) {
      departureTime.add(1, 'day');
      arrivalTime.add(1, 'day');
    }

    // time between our arrival to stop and departure from stop
    // prevoious stop cost
    // duration of the edge

    // const a = departureTime.diff(arrivalTimeToStop, 'minutes')
    // const b = startNode.f
    // const c = arrivalTime.diff(departureTime, 'minutes');

    const timeThroughNode =
      departureTime.diff(arrivalTimeToStop, 'minutes') +
      startNode.f +
      arrivalTime.diff(departureTime, 'minutes');

    return timeThroughNode;
  };

  const startNode: GraphNode = { ...start, g: 0, h: 0, f: 0 };
  const endNode: GraphNode = { ...end };
  //   const graphCopy: Graph = { ...graph };

  const open: GraphNode[] = [startNode];
  const closed: GraphNode[] = [];

  while (open.length > 0) {
    let wezel: GraphNode | null = null;
    let koszt_wezla = Infinity;

    for (const wezel_testowy of open) {
      const cost = f(wezel_testowy);

      if (cost < koszt_wezla) {
        wezel = wezel_testowy;
        koszt_wezla = cost;
      }
    }

    // here add minutes we spent on the edge
    arrivalTimeToStop.add(wezel.g || 0, 'minutes');

    if (wezel.stopId === endNode.stopId) {
      console.log('path exists - I HOPE');
      return {};
    }

    open.splice(open.indexOf(wezel), 1);
    closed.push(wezel);

    for (const edge of wezel.outgoingEdges) {
      const wezel_nastepny = edge.endNode;
      if (!open.includes(wezel_nastepny) && !closed.includes(wezel_nastepny)) {
        open.push(wezel_nastepny);
        wezel_nastepny.h = h(wezel, endNode);
        wezel_nastepny.g = wezel.g + g(wezel, edge);
        wezel_nastepny.f = wezel_nastepny.g + wezel_nastepny.h;
      } else {
        if (wezel_nastepny.g > wezel.g + g(wezel, edge)) {
          wezel_nastepny.g = wezel.g + g(wezel, edge);
          wezel_nastepny.f = wezel_nastepny.g + wezel_nastepny.h;

          //   i think here
          wezel_nastepny.cameFrom = wezel;
          wezel_nastepny.cameUsing = edge;

          if (closed.includes(wezel_nastepny)) {
            open.push(wezel_nastepny);
            closed.splice(closed.indexOf(wezel_nastepny), 1);

            // or heere !!!!!!!!!
          }
        }
      }
    }

    arrivalTimeToStop.subtract(wezel.g, 'minutes');
  }

  return {};
};
