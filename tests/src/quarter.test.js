import quarter from '../../src/quarter.js';

describe('partition', () => {
    it('should partition array into quartiles correctly', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = quarter(data);

        expect(result).toEqual([
            [1, 2], // Q1
            [3, 4, 5], // Q2
            [6, 7], // Q3
            [8, 9, 10] // Q4
        ]);
    });

    it('should partition array into quartiles correctly in same order', () => {
        const data = [5, 2, 3, 4, 1, 6, 7, 8, 9, 10];
        const result = quarter(data);

        expect(result).toEqual([
            [5, 2], // Q1
            [3, 4, 1], // Q2
            [6, 7], // Q3
            [8, 9, 10] // Q4
        ]);
    });

    it('should hadle data with less than four items', () => {
        const data = [5, 2, 3];
        const result = quarter(data);

        expect(result).toEqual([
            [],
            [5],
            [2],
            [3],
        ]);
    });

    it('should partition array into quartiles correctly with non numeric data', () => {
        const data = [1, [2], 3, { four: 4 }, 5, 6, 7, 8, 9, 10];
        const result = quarter(data);

        expect(result).toEqual([
            [1, [2]], // Q1
            [3, { four: 4 }, 5], // Q2
            [6, 7], // Q3
            [8, 9, 10] // Q4
        ]);
    });

    it('should handle empty array', () => {
        const result = quarter([]);

        expect(result).toEqual([[], [], [], []]);
    });
});
