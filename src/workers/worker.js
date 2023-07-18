let worker;

if (process.env.BUILD_ENV === 'node') {
    // Node.js environment
    worker = await import('./node.worker.js');
} else {
    // Browser environment
    worker = await import('./web.worker.js');
}

export default worker;
