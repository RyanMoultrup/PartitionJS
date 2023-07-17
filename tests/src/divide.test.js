import divide from '../../src/divide';

describe('divide', () => {
    it('should divide array into correct number of divisions', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const divisions = 3;
        const result = divide(data, divisions);

        expect(result.length).toBe(divisions);
        expect(result).toEqual([
            [1, 2, 3, 4],
            [5, 6, 7],
            [8, 9, 10]
        ]);
    });

    it('should divide array with different lengths', () => {
        const data = [1, 2, 3, 4, 5];
        const divisions = 2;
        const result = divide(data, divisions);

        expect(result.length).toBe(divisions);
        expect(result).toEqual([
            [1, 2, 3],
            [4, 5]
        ]);
    });

    it('should handle arrays with nested arrays and objects', () => {
        const data = [1, 2, [3, 4], { a: 5 }, 6, 7];
        const divisions = 2;
        const result = divide(data, divisions);

        expect(result.length).toBe(divisions);
        expect(result).toEqual([
            [1, 2, [3, 4]],
            [{ a: 5 }, 6, 7]
        ]);
    });

    it('should handle divisions greater than size of array', () => {
        const data = [1, 2, 3];
        const divisions = 4;
        const result = divide(data, divisions);

        expect(result.length).toBe(divisions);
        expect(result).toEqual([
            [1],
            [2],
            [3],
            []
        ]);
    });

    it('should handle empty array', () => {
        const data = [];
        const divisions = 3;
        const result = divide(data, divisions);

        expect(result.length).toBe(divisions);
        expect(result).toEqual([[], [], []]);
    });
});
