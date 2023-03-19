import moment = require('moment');
import { GraphEdge, GraphNode } from '../../types';
import { distance } from '../../utils/distance';

export const aStar = (
  start: GraphNode,
  end: GraphNode,
  initialDepartureTime: string,
) => {
  const startMoment = moment();
  let arrivalTimeToStop = moment(initialDepartureTime, 'HH:mm');

  const f = (node: GraphNode) => node.g + node.h;

  const h = (node: GraphNode, endNode: GraphNode) => {
    return distance(
      node.latitude,
      node.longitude,
      endNode.latitude,
      endNode.longitude
    );
  };

  // pass startNode because in edge.StartNode g value is undefined
  //   startNode.g = 0; // distance from start
  const g = (edge: GraphEdge, arrivalTimeToStop: moment.Moment) => {
    let departureTime = moment(edge.departureTime, 'HH:mm');
    let arrivalTime = moment(edge.arrivalTime, 'HH:mm');

    if (departureTime.isBefore(arrivalTimeToStop)) {
      departureTime.add(1, 'day');
      arrivalTime.add(1, 'day');
    }

    // time between our arrival to stop and departure from stop
    // duration of the edge
    // const a = departureTime.diff(arrivalTimeToStop, 'minutes')
    // const c = arrivalTime.diff(departureTime, 'minutes');

    const timeThroughNode =
      departureTime.diff(arrivalTimeToStop, 'minutes') +
      arrivalTime.diff(departureTime, 'minutes');

    return timeThroughNode;
  };

  const startNode: GraphNode = {
    ...start,
    g: 0,
    h: 0,
    f: 0,
    currentDuration: 0,
  };
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
    arrivalTimeToStop.add(wezel.currentDuration || 0, 'minutes');

    if (wezel.stopId === endNode.stopId) {
      const timeOfCalculations = moment().diff(startMoment, 'milliseconds');
      // construct path
      const path: { node: GraphNode; edge?: GraphEdge }[] = [];
      let currentNode = end;
      let edge = end.cameUsing;

      while (currentNode.stopId !== start.stopId) {
        path.push({ node: currentNode, edge });
        currentNode = currentNode.cameFrom;
        edge = currentNode.cameUsing;
      }
      path.push({ node: start });

      path.reverse();

      console.log(
        `You want to go from ${start.stopName} to ${end.stopName} and you start at ${initialDepartureTime}`
      );
      for (let i = 1; i < path.length; i++) {
        console.log(
          `${path[i].edge.startNode.stopName} (${path[i].edge.departureTime}) -> ${path[i].edge.endNode.stopName} (${path[i].edge.arrivalTime}) [LINE: ${path[i].edge.lineName}]`
        );
      }
      console.log(`COST: ${end.f}`);
      console.log(`Time of calc: ${timeOfCalculations}ms`);

      return { path };
    }

    open.splice(open.indexOf(wezel), 1);
    closed.push(wezel);

    for (const edge of wezel.outgoingEdges) {
      const wezel_nastepny = edge.endNode;
      if (!open.includes(wezel_nastepny) && !closed.includes(wezel_nastepny)) {
        open.push(wezel_nastepny);
        wezel_nastepny.currentDuration = moment(edge.arrivalTime, 'HH:mm').diff(
          moment(initialDepartureTime, 'HH:mm'),
          'minutes'
        );

        wezel_nastepny.h = h(wezel, endNode);
        wezel_nastepny.g = wezel.g + g(edge, arrivalTimeToStop);
        wezel_nastepny.f = wezel_nastepny.g + wezel_nastepny.h;
      } else {
        if (wezel_nastepny.g > wezel.g + g(edge, arrivalTimeToStop)) {
          wezel_nastepny.g = wezel.g + g(edge, arrivalTimeToStop);
          wezel_nastepny.f = wezel_nastepny.g + wezel_nastepny.h;
          wezel_nastepny.currentDuration = moment(
            edge.arrivalTime,
            'HH:mm'
          ).diff(moment(initialDepartureTime, 'HH:mm'), 'minutes');

          wezel_nastepny.cameFrom = wezel;
          wezel_nastepny.cameUsing = edge;

          if (closed.includes(wezel_nastepny)) {
            open.push(wezel_nastepny);
            closed.splice(closed.indexOf(wezel_nastepny), 1);
          }
        }
      }
    }

    arrivalTimeToStop.subtract(wezel.currentDuration, 'minutes');
  }

  return {};
};
