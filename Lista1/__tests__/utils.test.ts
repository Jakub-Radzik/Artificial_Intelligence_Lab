import { describe, test, expect } from '@jest/globals';
import { getMinutesDifference } from '../utils/time';

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
});
