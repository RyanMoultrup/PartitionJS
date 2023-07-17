import median from '../../src/median.js';

describe('median', function() {
    it('should calculate the median of an odd length array', function() {
        const array = [1, 2, 3, 4, 5];
        const result = median(array, 0, array.length - 1);
        expect(result).toEqual(3);
    });

    it('should calculate the median of an even length array', function() {
        const array = [1, 2, 3, 4, 5, 6];
        const result = median(array, 0, array.length - 1);
        expect(result).toEqual(3.5);
    });

    it('should calculate the median of a subarray', function() {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = median(array, 2, 7);
        expect(result).toEqual(5.5);
    });

    it('should return the single element when start and end are the same', function() {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = median(array, 5, 5);
        expect(result).toEqual(6);
    });
});
