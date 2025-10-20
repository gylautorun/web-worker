window.onload = () => {
    const worker = new SharedWorker('./worker.js');
    const $chatList = document.getElementById('chatList');
    const $submit = document.getElementById('submitBtn');
    const $input = document.getElementById('input');
    const $user = document.getElementById('user');
  
    let id = null;

    worker.port.start();
    worker.port.onmessage = (event) => {
        const {data} = event;
        switch (data.action) {
            case 'id': // 接收 Worker 实例化成功之后返回的 id
                id = data.value;
                $user.innerHTML = `Client ${id}`;
                break;
            case 'message': // 接收 Worker 返回的来自各个页面的信息
                $chatList.innerHTML += `
                <li
                  class='${
                      data.id === id ? 'right' : 'left'
                  }'
                >
                    <span>Client ${data.id}</span>
                    <p>${data.value}</p>
                </li>`;
                break;
        }
    };
  
    $submit.addEventListener('click', () => {
        const value = $input.value;
        // 将当前用户 ID 及消息发送给 Worker
        worker.port.postMessage({
            action: 'message',
            value: value,
            id,
        });
        $input.value = '';
    });
  };