import decorator from '../../src/decorator.js';
import sum from '../../src/decorators/sum.js';
import count from '../../src/decorators/count.js';
import avg from '../../src/decorators/average.js';

// Mock the imported modules
jest.mock('../../src/decorators/sum.js');
jest.mock('../../src/decorators/count.js');
jest.mock('../../src/decorators/average.test.js');

describe('decorator', function() {
    it('should call the decorator functions with the correct arguments', function() {
        // Given
        const mockPartition = [1, 2, 3, 4, 5];
        const modifierFlags = { sum: false, avg: false, count: false };

        // Setup the mock functions
        sum.mockImplementation((arg, rest) => ({ ...arg }));
        count.mockImplementation((arg, rest) => ({ ...arg }));
        avg.mockImplementation((arg, rest) => ({ ...arg }));

        // When
        const result = decorator({ partition: mockPartition, ...modifierFlags });

        // Then
        expect(result).toEqual({
            partition: mockPartition
        });

        // Ensure the decorators are called with the correct arguments
        expect(sum).toHaveBeenCalledWith({ partition: mockPartition }, modifierFlags);
        expect(count).toHaveBeenCalledWith({ partition: mockPartition }, modifierFlags);
        expect(avg).toHaveBeenCalledWith({ partition: mockPartition }, modifierFlags);
    });
});
