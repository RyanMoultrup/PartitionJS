import quartile from '../../src/quartile.js';
import median from '../../src/median.js';

jest.mock('../../src/median.js');

describe('quartiles', function() {
    it('should correctly calculate quartiles', function() {
        median
            .mockReturnValueOnce(2.5) // Q1
            .mockReturnValueOnce(5.5) // Q2
            .mockReturnValueOnce(7.5); // Q3

        const mockData = [5, 2, 3, 4, 1, 6, 7, 8, 9, 10];
        const result = quartile(mockData);

        expect(result).toEqual([
            [1, 2],
            [3, 4, 5],
            [6, 7],
            [8, 9, 10]
        ]);
    });

    it('should handle values that are an array by removing them before sorting', function() {
        median
            .mockReturnValueOnce(3.5) // Q1
            .mockReturnValueOnce(6) // Q2
            .mockReturnValueOnce(8.5); // Q3

        const mockData = [5, [1, 2], 3, 4, 1, 6, 7, 8, 9, 10];
        const result = quartile(mockData);

        expect(result).toEqual([
            [1, 3],
            [4, 5, 6],
            [7, 8],
            [9, 10]
        ]);
    });

    it('should handle values that are an object by removing them before sorting', function() {
        median
            .mockReturnValueOnce(3.5) // Q1
            .mockReturnValueOnce(6) // Q2
            .mockReturnValueOnce(8.5); // Q3

        const mockData = [5, { one: 1, two: 2 }, 3, 4, 1, 6, 7, 8, 9, 10];
        const result = quartile(mockData);

        expect(result).toEqual([
            [1, 3],
            [4, 5, 6],
            [7, 8],
            [9, 10]
        ]);
    });

    it('should handle values that are a string by removing them before sorting', function() {
        median
            .mockReturnValueOnce(3.5) // Q1
            .mockReturnValueOnce(6) // Q2
            .mockReturnValueOnce(8.5); // Q3

        const mockData = [5, "2", 3, 4, 1, 6, 7, 8, 9, 10];
        const result = quartile(mockData);

        expect(result).toEqual([
            [1, 3],
            [4, 5, 6],
            [7, 8],
            [9, 10]
        ]);
    });

    it('should handle empty array', function() {
        const result = quartile([]);
        expect(result).toEqual([[], [], [], []]);
    });
});
