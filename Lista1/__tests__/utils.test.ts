import { describe, test, expect } from '@jest/globals';
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
});
