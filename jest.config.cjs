module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        'worker:worker.js': '<rootDir>/tests/__mocks__/node.worker.js',
    },
};
