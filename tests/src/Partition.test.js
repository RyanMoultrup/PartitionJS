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

    it('should correctly divide an array into two partitions', () => {
        const result = partition().divide(nums, 2);

        expect(result).toEqual([
            [1, 2, 2, 4, 1, 3, 4, 5],
            [6, 7, 8, 9, 10, 11, 12]
        ]);
    });

    it('should correctly divide an array into three partitions', () => {
        const result = partition().divide(nums, 3);

        expect(result).toEqual([
            [1, 2, 2, 4, 1],
            [3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12]
        ]);
    });

    it('should correctly divide an array into four partitions', () => {
        const result = partition().divide(nums, 4);

        expect(result).toEqual([
            [1, 2, 2, 4],
            [1, 3, 4, 5],
            [6, 7, 8, 9],
            [10, 11, 12]
        ]);
    });

    it('should correctly splits array based on callbacks with empty rejected array', () => {
        const result = partition()
            .add(i => i < 6)
            .add(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual([
            [1, 2, 2, 4, 1, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12],
            []
        ]);
    });

    it('should correctly splits array based on callbacks and add sum to all results along with empty rejected array', () => {
        const result = partition()
            .sum()
            .add(i => i < 6)
            .add(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual( [
            {"partition": [1, 2, 2, 4, 1, 3, 4, 5], "sum": 22},
            {"partition": [6, 7, 8, 9, 10], "sum": 40},
            {"partition": [11, 12], "sum": 23},
            []
        ]);
    });

    it('should correctly splits array based on callbacks and add count to all results along with empty rejected array', () => {
        const result = partition()
            .count()
            .add(i => i < 6)
            .add(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual( [
            {"partition": [1, 2, 2, 4, 1, 3, 4, 5], "count": 8},
            {"partition": [6, 7, 8, 9, 10], "count": 5},
            {"partition": [11, 12], "count": 2},
            []
        ]);
    });

    it('should correctly splits array based on callbacks and add average to all results along with empty rejected array', () => {
        const result = partition()
            .avg()
            .add(i => i < 6)
            .add(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual( [
            {"partition": [1, 2, 2, 4, 1, 3, 4, 5], "avg": 2.75},
            {"partition": [6, 7, 8, 9, 10], "avg": 8},
            {"partition": [11, 12], "avg": 11.5},
            []
        ]);
    });

    it('should correctly splits array based on callbacks and adds sum and count to all results along with empty rejected array', () => {
        const result = partition()
            .sum()
            .count()
            .add(i => i < 6)
            .add(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual( [
            {"partition": [1, 2, 2, 4, 1, 3, 4, 5], "count": 8, "sum": 22},
            {"partition": [6, 7, 8, 9, 10], "count": 5, "sum": 40},
            {"partition": [11, 12], "count": 2, "sum": 23},
            []
        ]);
    });

    it('should correctly splits array based on callbacks and adds sum and average to all results along with empty rejected array', () => {
        const result = partition()
            .sum()
            .avg()
            .add(i => i < 6)
            .add(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual( [
            {"partition": [1, 2, 2, 4, 1, 3, 4, 5], "avg": 2.75, "sum": 22},
            {"partition": [6, 7, 8, 9, 10], "avg": 8, "sum": 40},
            {"partition": [11, 12], "avg": 11.5, "sum": 23},
            []
        ]);
    });

    it('should correctly splits array based on callbacks and adds count and average to all results along with empty rejected array', () => {
        const result = partition()
            .count()
            .avg()
            .add(i => i < 6)
            .add(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual( [
            {"partition": [1, 2, 2, 4, 1, 3, 4, 5], "avg": 2.75, "count": 8},
            {"partition": [6, 7, 8, 9, 10], "avg": 8, "count": 5},
            {"partition": [11, 12], "avg": 11.5, "count": 2},
            []
        ]);
    });

    it('should correctly splits array based on callbacks and adds count average and sum to all results along with empty rejected array', () => {
        const result = partition()
            .count()
            .avg()
            .sum()
            .add(i => i < 6)
            .add(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual( [
            {"partition": [1, 2, 2, 4, 1, 3, 4, 5], "avg": 2.75, "count": 8, "sum": 22},
            {"partition": [6, 7, 8, 9, 10], "avg": 8, "count": 5, "sum": 40},
            {"partition": [11, 12], "avg": 11.5, "count": 2, "sum": 23},
            []
        ]);
    });

    it('should correctly splits array based on callbacks and adds count to middle partition along with empty rejected array', () => {
        const result = partition()
            .add(i => i < 6)
            .addCount(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual( [
            [1, 2, 2, 4, 1, 3, 4, 5],
            {"partition": [6, 7, 8, 9, 10], "count": 5},
            [11, 12],
            []
        ]);
    });

    it('should correctly splits array based on callbacks and adds sum to middle partition along with empty rejected array', () => {
        const result = partition()
            .add(i => i < 6)
            .addSum(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual( [
            [1, 2, 2, 4, 1, 3, 4, 5],
            {"partition": [6, 7, 8, 9, 10], "sum": 40},
            [11, 12],
            []
        ]);
    });

    it('should correctly splits array based on callbacks and adds sum and count to individual partitions along with empty rejected array', () => {
        const result = partition()
            .addCount(i => i < 6)
            .addSum(i => i > 5 && i < 11)
            .add(i => i > 10 && i < 14)
            .split(nums);

        expect(result).toEqual( [
            {"partition": [1, 2, 2, 4, 1, 3, 4, 5], "count": 8},
            {"partition": [6, 7, 8, 9, 10], "sum": 40},
            [11, 12],
            []
        ]);
    });

    it('should correctly partition array of objects based on callbacks with rejected array', () => {
        const result = partition()
            .add(i => i.sex === 'male')
            .add(i => i.sex === 'female')
            .add(i => i.height === 'tall')
            .add(i => i.hair.length === 'short')
            .add(i => i.hair.color === 'blonde')
            .split(data);

        expect(result).toEqual( [
            [
                {"name": "John", "sex": "male", "age": 34, "height": "tall",  "hair": {"length": "long","color": "brown"}},
                {"name": "Eric", "sex": "male", "age": 43, "height": "tall",  "hair": {"length": "short","color": "blonde" }},
                {"name": "Bill", "sex": "male", "age": 55, "height": "short",  "hair": {"length": "long","color": "brown" }}
            ],
            [
                {"name": "Lindsay",  "sex": "female", "age": 25, "height": "tall", "hair": {"length": "short","color": "blonde"}},
                {"name": "Lucy",  "sex": "female",  "age": 35, "height": "short",  "hair": {"length": "long","color": "brown" }}
            ],
            [
                {"name": "John", "sex": "male",  "age": 34, "height": "tall", "hair": {"length": "long","color": "brown"}},
                {"name": "Lindsay", "sex": "female",  "age": 25, "height": "tall", "hair": {"length": "short","color": "blonde" }},
                {"name": "Eric", "sex": "male", "age": 43, "height": "tall", "hair": {"length": "short","color": "blonde" }}
            ],
            [
                {"name": "Lindsay", "sex": "female", "age": 25, "height": "tall", "hair": {"length": "short","color": "blonde"}},
                {"name": "Eric", "sex": "male", "age": 43, "height": "tall", "hair": {"length": "short","color": "blonde"}}
            ],
            [
                {"name": "Lindsay", "sex": "female", "age": 25, "height": "tall", "hair": {"length": "short","color": "blonde"}},
                {"name": "Eric",  "sex": "male", "age": 43, "height": "tall", "hair": {"length": "short", "color": "blonde" }}
            ],
            []
        ]);
    });

    it('should correctly partition array of objects and multiple conditions in callbacks with rejected array', () => {
        const result = partition()
            .add(i => i.sex === 'male' && i.hair.length === 'long')
            .add(i => i.sex === 'female' && i.hair.color === 'brown')
            .split(data);

        expect(result).toEqual( [
            [
                {"name": "John", "sex": "male", "age": 34, "height": "tall", "hair": {"length": "long", "color": "brown"}},
                {"name": "Bill", "sex": "male", "age": 55, "height": "short", "hair": {"length": "long", "color": "brown"}}
            ],
            [
                {"name": "Lucy", "sex": "female", "age": 35, "height": "short", "hair": {"length": "long", "color": "brown"}}
            ],
            [
                {"name": "Lindsay", "sex": "female", "age": 25, "height": "tall", "hair": {"length": "short", "color": "blonde"}},
                {"name": "Eric", "sex": "male", "age": 43, "height": "tall", "hair": {"length": "short", "color": "blonde"}}
            ]
        ]);
    });

    it('should correctly partition array of objects and multiple conditions and count partition in callbacks with rejected array', () => {
        const result = partition()
            .addCount(i => i.sex === 'male' && i.hair.length === 'long')
            .add(i => i.sex === 'female' && i.hair.color === 'brown')
            .split(data);

        expect(result).toEqual( [
            {
                "partition": [
                    {"name": "John", "sex": "male", "age": 34, "height": "tall", "hair": {"length": "long", "color": "brown"}},
                    {"name": "Bill", "sex": "male", "age": 55, "height": "short", "hair": {"length": "long", "color": "brown"}}
                ],
                "count": 2
            },
            [
                {"name": "Lucy", "sex": "female", "age": 35, "height": "short", "hair": {"length": "long", "color": "brown"}}
            ],
            [
                {"name": "Lindsay", "sex": "female", "age": 25, "height": "tall", "hair": {"length": "short", "color": "blonde"}},
                {"name": "Eric", "sex": "male", "age": 43, "height": "tall", "hair": {"length": "short", "color": "blonde"}}
            ]
        ]);
    });

    it('should divide partition in half if only split is called with no callbacks', () => {
        const result = partition()
            .split(data);

        expect(result).toEqual( [
            [
                {"name": "John", "sex": "male", "age": 34, "height": "tall", "hair": {"length": "long", "color": "brown"}},
                {"name": "Lindsay", "sex": "female", "age": 25, "height": "tall", "hair": {"length": "short", "color": "blonde"}}
            ],
            [
                {"name": "Eric", "sex": "male", "age": 43, "height": "tall", "hair": {"length": "short", "color": "blonde"}},
                {"name": "Lucy", "sex": "female", "age": 35, "height": "short", "hair": {"length": "long", "color": "brown"}},
                {"name": "Bill", "sex": "male", "age": 55, "height": "short", "hair": {"length": "long", "color": "brown"}}
            ]
        ]);
    });

    // Add more tests for the other functions
});
