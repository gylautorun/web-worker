const connectedClients = new Set();
let connectId = 1;

function sendMessageToClients(payload) {
    //将消息分发给各个页面
    connectedClients.forEach(({client}) => {
        client.postMessage(payload);
    });
}

function setupClient(clientPort) {
    //通过 onmessage 监听来自主进程的消息
    clientPort.onmessage = (event) => {
        const {id, value} = event.data;
        sendMessageToClients({
            action: 'message',
            value: value,
            id: id,
        });
    };
}

// 通过 onconnect 函数监听，来自不同页面的 Worker 连接
onconnect = (event) => {
    const newClient = event.ports[0];
    // 保存连接到 Worker 的页面引用
    connectedClients.add({
      client: newClient,
      id: connectId,
    });

    setupClient(newClient);

    // 页面同 Worker 连接成功后, 将当前连接的 Id 返回给页面
    newClient.postMessage({
        action: 'id',
        value: connectId,
    });
    connectId++;
};