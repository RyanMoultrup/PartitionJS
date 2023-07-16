import sum from 'decorators/sum.js';
import count from 'decorators/count.js';
import avg from 'decorators/average.js';

const decorators = [
    sum,
    count,
    avg
]

const compose = (...functions) => {
    return ({ partition, ...rest }) => functions.reduceRight((arg, fn) => fn(arg, { ...rest }), { partition })
};

const decorator = compose(...decorators);

export default decorator;