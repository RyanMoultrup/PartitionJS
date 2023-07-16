export const isArray = variable => Array.isArray(variable);

export const isObject = variable => typeof variable === 'object' && variable !== null && !Array.isArray(variable);

export const isInteger = variable => Number.isInteger(variable);

export const isFloat = variable => Number(variable) === variable && variable % 1 !== 0;

export const isNumber = variable => isFloat(variable) || isInteger(variable);

export const numericOnly = arr => arr.filter(i => isNumber(i));

export const isString = variable => typeof variable === 'string' || variable instanceof String;

export const shouldReject = variable => !isInteger(variable);

export const isValidData = variable => {
    if (!isArray(variable)) {
        throw new Error('PartitionJS input data must be an array.');
    }
}

export const sort = data => [...data].sort((a, b) => a - b);
