import sum from '../../../src/decorators/average.js';

describe('average', function() {
    it('should compute the average when avg is true', function() {
        const mockPartition = { partition: [1, 2, 3, 4] };
        const mockRest = { sum: true, avg: true, count: false };

        const result = sum(mockPartition, mockRest);

        // The average of [1, 2, 3, 4] is (1 + 2 + 3 + 4) / 4 = 2.5
        expect(result).toEqual({ partition: [1, 2, 3, 4], avg: 2.5 });
    });

    it('should not compute the average when avg is false', function() {
        const mockPartition = { partition: [1, 2, 3, 4] };
        const mockRest = { sum: true, avg: false, count: false };

        const result = sum(mockPartition, mockRest);

        // If avg is false, the function should return the partition object without modification
        expect(result).toEqual({ partition: [1, 2, 3, 4] });
    });
});
