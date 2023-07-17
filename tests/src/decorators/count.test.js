import count from '../../../src/decorators/count.js';

describe('count', function() {
    it('should compute the count when count is true', function() {
        const mockPartition = { partition: [1, 2, 3, 4] };
        const mockRest = { sum: false, avg: false, count: true };

        const result = count(mockPartition, mockRest);

        // The count of [1, 2, 3, 4] is 4
        expect(result).toEqual({ partition: [1, 2, 3, 4], count: 4 });
    });

    it('should not compute the count when count is false', function() {
        const mockPartition = { partition: [1, 2, 3, 4] };
        const mockRest = { sum: false, avg: false, count: false };

        const result = count(mockPartition, mockRest);

        // If count is false, the function should return the partition object without modification
        expect(result).toEqual({ partition: [1, 2, 3, 4] });
    });
});
