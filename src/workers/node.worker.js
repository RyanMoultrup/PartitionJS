const { parentPort } = require('worker_threads');

parentPort.on('message', ({ data, callback }) => {
    const filter = new Function('', `return ${callback}`)();
    const result = data.filter(item => filter(item));
    parentPort.postMessage(result);
});