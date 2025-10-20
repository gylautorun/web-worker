let connectState = {count: 0};

onconnect = function(e) {
    const port = e.ports[0];
    port.onmessage = function ({data}) {
        const {action, state} = data;

        if (action === 'GET') {
            port.postMessage(connectState);
        } else if (action === 'SET') {
            connectState = Object.assign(connectState, state);
            port.postMessage(connectState);
        }
    };
};