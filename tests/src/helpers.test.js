import { isArray, isObject, isInteger, isString, shouldReject, isValidData } from '../../src/helpers.js';

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
});
