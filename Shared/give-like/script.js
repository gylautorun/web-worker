const $btn = document.getElementById('btn');
const $count = document.getElementById('count');

let state = {
    count: 0
};

const worker = new SharedWorker('shared-worker.js');
worker.port.start();

const promisePort = (data) => {
    return new Promise((resolve) => {
        worker.port.postMessage(data);
        worker.port.addEventListener('message', (e) => resolve(e.data));
    })
};
const getState = () => promisePort({ action: 'GET' });
const setState = (data) => promisePort({ action: 'SET', state: data});

const syncState = async () => {
    state = await getState();
    $count.innerHTML = state.count;
};
// 进来同步更新一次
syncState();

const addCount = async () => {
    const newState = { ...state, count: state.count + 1};
    state = await setState(newState);
    $count.innerHTML = state.count;
};
$btn.addEventListener('click', addCount);
// $btn.onclick = () => addCount();

// 窗口聚焦或可见时更新
window.addEventListener('focus', () =>  syncState());
window.addEventListener('visibilitychange', () =>  syncState());

