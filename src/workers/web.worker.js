function workerize(fn) {
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
            const code = `
        self.onmessage = ({data}) => {
          Promise.resolve((${fn.toString()})(...data))
            .then(result => postMessage(result))
            .catch(err => console.error(err));
        }
      `;
            const blob = new Blob([code], { type: "application/javascript" });
            const worker = new Worker(URL.createObjectURL(blob));

            worker.onmessage = ({ data }) => {
                resolve(data);
                worker.terminate();
            };
            worker.onerror = reject;

            worker.postMessage(workerData);
        });
    };
}

const addWorker = workerize(({ data, callback }) => {
    const filter = new Function('', `return ${callback}`)();
    return data.filter(item => filter(item));
});

export default addWorker;
