import { describe, test, expect } from '@jest/globals';
import { GraphNode } from '../types';
import { euclideanDistanceNodes } from '../utils/distance';
import { calculateTimeCost, getMinutesDifference } from '../utils/time';

describe('Utils', () => {
  describe('getTimeDifference', () => {
    test('Should return minutes', () => {
      const h1 = '15:21';
      const h2 = '16:20';
      const diff = getMinutesDifference(h1, h2);
      expect(diff).toBe(59);
    });

    test('Should throw error', () => {
      const h1 = '15:21';
      const h2 = '14:20';
      expect(() => getMinutesDifference(h1, h2)).toThrow();
    });

    test('Should return zero', () => {
      const h1 = '15:21';
      const h2 = '15:21';
      const diff = getMinutesDifference(h1, h2);
      expect(diff).toBe(0);
    });
  });

  describe('calculateTimeCost', () => {
    test('Should return minutes when first is before second', () => {
      const h1 = '15:21';
      const h2 = '16:20';
      const diff = calculateTimeCost(h1, h2);
      expect(diff).toBe(59);
    });

    test('Should return minutes when second is after first - next day', () => {
      const h1 = '15:21';
      const h2 = '14:20';
      const diff = calculateTimeCost(h1, h2);
      expect(diff).toBe(1379);
    });

    test('Should return zero', () => {
      const h1 = '15:21';
      const h2 = '15:21';
      const diff = calculateTimeCost(h1, h2);
      expect(diff).toBe(0);
    });

    test('Should return minutes when second is after first - next day', () => {
      const h1 = '15:21';
      const h2 = '15:20';
      const diff = calculateTimeCost(h1, h2);
      expect(diff).toBe(1439);
    });
  });

  describe('distances', () => {
    // base on triangle with sides, 3, 4, 5

    // longitude is x
    // latitude is y

    const testNode: GraphNode = {
      stopId: '',
      stopName: '',
      latitude: 0,
      longitude: 0,
      outgoingEdges: []
    }

    test('Points in first Quater', () => {
      const n1: GraphNode = {...testNode, longitude: 1, latitude: 1 };
      const n2: GraphNode= {...testNode, longitude: 4, latitude: 5 };

      const distance = euclideanDistanceNodes(n1, n2);
      expect(distance).toBe(5);
    });

    test('Points in second Quater', () => {
      const n1: GraphNode = {...testNode, longitude: -4, latitude: 1 };
      const n2: GraphNode= {...testNode, longitude: -1, latitude: 5 };

      const distance = euclideanDistanceNodes(n1, n2);
      expect(distance).toBe(5);
    });

    test('Points in third Quater', () => {
      const n1: GraphNode = {...testNode, longitude: -4, latitude: -5 };
      const n2: GraphNode= {...testNode, longitude: -1, latitude: -1 };

      const distance = euclideanDistanceNodes(n1, n2);
      expect(distance).toBe(5);
    });

    test('Points in fourth Quater', () => {
      const n1: GraphNode = {...testNode, longitude: 1, latitude: -5 };
      const n2: GraphNode= {...testNode, longitude: 4, latitude: -1 };

      const distance = euclideanDistanceNodes(n1, n2);
      expect(distance).toBe(5);
    });

    test('Points in first and second Quater', () => {
      const n1: GraphNode = {...testNode, longitude: 1, latitude: 1 };
      const n2: GraphNode= {...testNode, longitude: -2, latitude: 5 };

      const distance = euclideanDistanceNodes(n1, n2);
      expect(distance).toBe(5);
    });

   })
});
