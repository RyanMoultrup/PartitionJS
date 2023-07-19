const { parentPort, Worker } = require("worker_threads");

function workerize (fn, workerOptions = {}) {
    /**
     * Workerized function
     *
     * @function workerized
     * @param {any} workerData Any data type supported by https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
     * @returns {Promise<any>} Result returned by function workerFn when it exists
     * @async
     */
    return function workerized(...workerData) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(`
            const { workerData, parentPort } = require('worker_threads')
            Promise.resolve((${fn.toString()})(...workerData)).then(returnedData => {
              parentPort.postMessage(returnedData)
            })`, {...workerOptions, eval: true, workerData})

            worker.on('message', resolve)
            worker.on('error', reject)
            worker.on('exit', code => {
                if (code === 0) {
                    resolve(null)
                } else {
                    reject(new Error(`Worker stopped with exit code ${code}`))
                }
            })
        })
    }
}

const spawnWorker = workerize(({ data, callback }) => {
    const filter = new Function('', `return ${callback}`)();
    const result = data.filter(item => filter(item));
    parentPort.postMessage(result);
})

export default spawnWorker;
