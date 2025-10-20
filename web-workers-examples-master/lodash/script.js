const worker = new Worker('worker.js');
worker.onmessage = (e) => {
    console.log(`Main: Received kebab case message - ${e.data}`)
}
worker.postMessage('a hello world program is generally a computer program');