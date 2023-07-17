import sum from '../../../src/decorators/sum.js';

describe('sum', function() {
    it('should compute the sum when sum is true', function() {
        const mockPartition = { partition: [1, 2, 3, 4] };
        const mockRest = { sum: true, avg: false, count: false };

        const result = sum(mockPartition, mockRest);

        // The sum of [1, 2, 3, 4] is 1 + 2 + 3 + 4 = 10
        expect(result).toEqual({ partition: [1, 2, 3, 4], sum: 10 });
    });

    it('should not compute the sum when sum is false', function() {
        const mockPartition = { partition: [1, 2, 3, 4] };
        const mockRest = { sum: false, avg: false, count: false };

        const result = sum(mockPartition, mockRest);

        // If sum is false, the function should return the partition object without modification
        expect(result).toEqual({ partition: [1, 2, 3, 4] });
    });
});
