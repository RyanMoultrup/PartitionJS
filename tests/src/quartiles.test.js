import quartile from '../../src/quartile.js';
import median from '../../src/median.js';

jest.mock('../../src/median.js');

describe('quartiles', function() {
    it('should correctly calculate quartiles', function() {
        median
            .mockReturnValueOnce(2.5) // Q1
            .mockReturnValueOnce(5.5) // Q2
            .mockReturnValueOnce(7.5); // Q3

        const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = quartile(mockData);

        expect(result).toEqual([
            [1, 2],
            [3, 4, 5],
            [6, 7],
            [8, 9, 10]
        ]);
    });

    it('should handle different types of values', function() {
        median
            .mockReturnValueOnce(2.5) // Q1
            .mockReturnValueOnce(5.5) // Q2
            .mockReturnValueOnce(7.5); // Q3

        const mockData = [1, [1, 2], 3, 4, 5, 6, 7, 8, 9, 10];
        const result = quartile(mockData);

        expect(result).toEqual([
            [1],
            [3, 4, 5],
            [6, 7],
            [8, 9, 10]
        ]);
    });

    it('should handle empty array', function() {
        const result = quartile([]);
        expect(result).toEqual([[], [], [], []]);
    });
});
