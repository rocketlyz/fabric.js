import { reViewBoxAttrValue } from './constants';

import { describe, expect, it } from 'vitest';

describe('reViewBoxAttrValue', () => {
  it('should correctly parse valid viewBox values', () => {
    const validValues = [
      { input: '0 0 100 100', expected: [0, 0, 100, 100] },
      { input: '0,0,100,100', expected: [0, 0, 100, 100] },
      { input: ' 0,0, 100, 100 ', expected: [0, 0, 100, 100] },
      { input: '10.5 20.5 30.5 40.5', expected: [10.5, 20.5, 30.5, 40.5] },
      { input: '-10 -20 100 200', expected: [-10, -20, 100, 200] },
      { input: '1e-6 2e-6 3e-6 4e-6', expected: [1e-6, 2e-6, 3e-6, 4e-6] },
      { input: '1.5e+2 2.5e+2 3.5e+2 4.5e+2', expected: [150, 250, 350, 450] },
    ];

    validValues.forEach(({ input, expected }) => {
      const match = input.match(reViewBoxAttrValue);
      expect(match).not.toBeNull();
      const parsedValues = match!.slice(1, 5).map(Number);
      expect(parsedValues).toEqual(expected);
    });
  });

  it('should not match invalid viewBox values', () => {
    const invalidValues = [
      '0 0', // too few values
      '0 0 100', // too few values
      '0,0,100 , 100', // no empty spaces before commas
      '0 0 100 100 extra', // too many values
      'abc def ghi jkl', // non-numeric values
      '', // empty string
    ];

    invalidValues.forEach((value) => {
      expect(reViewBoxAttrValue.test(value)).toBe(false);
    });
  });
});
