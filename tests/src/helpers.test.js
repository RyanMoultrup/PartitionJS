import {
    isArray,
    isObject,
    isInteger,
    isFloat,
    isNumber,
    isString,
    shouldReject,
    isValidData,
    sort,
    numericOnly
} from '../../src/helpers.js';

describe('helper functions', () => {
    test('isArray', () => {
        expect(isArray([])).toBe(true);
        expect(isArray({})).toBe(false);
        expect(isArray('string')).toBe(false);
        expect(isArray(123)).toBe(false);
        expect(isArray(null)).toBe(false);
    });

    test('isObject', () => {
        expect(isObject({})).toBe(true);
        expect(isObject([])).toBe(false);
        expect(isObject('string')).toBe(false);
        expect(isObject(123)).toBe(false);
        expect(isObject(null)).toBe(false);
    });

    test('isInteger', () => {
        expect(isInteger(123)).toBe(true);
        expect(isInteger('123')).toBe(false);
        expect(isInteger(123.5)).toBe(false);
        expect(isInteger(null)).toBe(false);
        expect(isInteger([])).toBe(false);
    });

    test('isFloat', () => {
        expect(isFloat(123.456)).toBe(true);
        expect(isFloat(123)).toBe(false);
        expect(isFloat('123.456')).toBe(false);
        expect(isFloat([])).toBe(false);
        expect(isFloat({})).toBe(false);
        expect(isFloat(null)).toBe(false);
    });

    test('isNumber', () => {
        expect(isNumber(123.456)).toBe(true); // float
        expect(isNumber(123)).toBe(true); // integer
        expect(isNumber('123')).toBe(false);
        expect(isNumber([])).toBe(false);
        expect(isNumber({})).toBe(false);
        expect(isNumber(null)).toBe(false);
    });

    test('isString', () => {
        expect(isString('string')).toBe(true);
        expect(isString(123)).toBe(false);
        expect(isString([])).toBe(false);
        expect(isString({})).toBe(false);
        expect(isString(null)).toBe(false);
    });

    test('shouldReject', () => {
        expect(shouldReject(123)).toBe(false);
        expect(shouldReject('123')).toBe(true);
        expect(shouldReject([])).toBe(true);
        expect(shouldReject({})).toBe(true);
        expect(shouldReject(null)).toBe(true);
    });

    test('isValidData', () => {
        expect(() => isValidData([])).not.toThrow();
        expect(() => isValidData('string')).toThrow('PartitionJS input data must be an array.');
        expect(() => isValidData(123)).toThrow('PartitionJS input data must be an array.');
        expect(() => isValidData(null)).toThrow('PartitionJS input data must be an array.');
        expect(() => isValidData({})).toThrow('PartitionJS input data must be an array.');
    });

    test('sort', () => {
        expect(sort([5, 2, 3, 1, 4])).toEqual([1, 2, 3, 4, 5]);
        expect(sort([3, 1])).toEqual([1, 3]);
        expect(sort([3])).toEqual([3]);
        expect(sort([])).toEqual([]);
        // expect(() => sort([3, 1, 'a'])).toThrow(); // Assuming numerical sort
    });

    it('should filter out non-numeric values', function() {
        const data = [1, 2, '3', 'hello', 4, {}, 5, undefined, 6, null];
        const result = numericOnly(data);

        // all elements in the result should be numeric
        result.forEach(i => {
            expect(isNumber(i)).toBe(true);
        });

        // the result should only contain the numeric values from the original array
        expect(result).toEqual([1, 2, 4, 5, 6]);
    });

    it('should return an empty array if no numeric values are present', function() {
        const data = ['hello', {}, undefined, null];
        const result = numericOnly(data);

        // the result should be an empty array
        expect(result).toEqual([]);
    });

    it('should return the original array if all values are numeric', function() {
        const data = [1, 2, 3, 4, 5];
        const result = numericOnly(data);

        // the result should be the same as the original array
        expect(result).toEqual(data);
    });
});
