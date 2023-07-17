import partition from "../../src/index.js";

const data = [
    { name: 'John', sex: 'male', age: 34, height: 'tall', hair: { length: 'long', color: 'brown' }},
    { name: 'Lindsay', sex: 'female', age: 25, height: 'tall', hair: { length: 'short', color: 'blonde' }},
    { name: 'Eric', sex: 'male', age: 43, height: 'tall', hair: { length: 'short', color: 'blonde' }},
    { name: 'Lucy', sex: 'female', age: 35, height: 'short', hair: { length: 'long', color: 'brown' }},
    { name: 'Bill', sex: 'male', age: 55, height: 'short', hair: { length: 'long', color: 'brown' }}
];
const nums = [1, 2, 2, 4, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

describe('partition', () => {
    it('should correctly sort and partition array into quartiles', () => {
        const result = partition().quartile(nums);

        expect(result).toEqual([
            [1, 1, 2, 2],
            [3, 4, 4, 5],
            [6, 7, 8, 9],
            [10, 11, 12]
        ]);
    });

    it('should correctly sort and partition array into quartiles and removes sub arrays', () => {
        const aNums = [1, [2], 3, 4, 5, 6, 7, 8, 9, 10];
        const result = partition().quartile(aNums);

        expect(result).toEqual([
            [1, 3],
            [4, 5, 6],
            [7, 8],
            [9, 10]
        ]);
    });

    it('should correctly sort and partition array into quartiles and removes objects', () => {
        const oNums = [1, {two: 2}, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = partition().quartile(oNums);

        expect(result).toEqual([
            [1, 3],
            [4, 5, 6],
            [7, 8],
            [9, 10]
        ]);
    });

    it('should correctly partition array into quarters', () => {
        const result = partition().quarter(nums);

        expect(result).toEqual([
            [1, 2, 2],
            [4, 1, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12]
        ]);
    });

    // Add more tests for the other functions
});
