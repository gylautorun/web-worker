// 排序
function sortBigArray(array) {
    return array.sort((a, b) => a - b);
}

// 生成大数组
function generatedArray(length) {
    const $generated = getElementById('generated');
    // console.log(`generating ${length} random numbers...`);
    const start = performance.now();
    const array = Array(length).fill().map(() => Math.random());
    const end = performance.now();
    $generated.innerHTML = end - start;
    // console.log(`generated ${length} numbers is ${generatedEnd - generatedStart}`);
    console.log(array)
    return array;
}

// Promise 里运行 worker
const sortArrayWithWorker = arr => {
    return new Promise((resolve, reject) => {
        let worker = new Worker('worker.js');
        worker.onmessage = ({data}) => resolve(data);
        worker.onerror = reject;
        worker.postMessage(arr);
    });
};

// 数组分配给不同的worker
async function sortWithWorkers(data) {
    const {array, length, maxWorkers} = data;
    // 每个worker应该排序多少个元素
    const segmentsPerWorker = Math.round(length / maxWorkers);
    const chunks = _.chunk(array, segmentsPerWorker);

    // 每个Worker处理自己的部分
    const promises = chunks.map(c => sortArrayWithWorker(c));

    // 合并数组所有片段
    const results = await Promise.all(promises);
    return results.reduce((acc, arr) => acc.concat(arr), []);
}

async function run(data) {
    const $withWorker = getElementById('with-worker');
    const $withoutWorker = getElementById('without-worker');
    // sort with workers
    const sortedWorkerStart = performance.now();
    const list = await sortWithWorkers(data);
    console.log(list)
    const sortedWorkerEnd = performance.now();
    $withWorker.innerHTML = sortedWorkerEnd - sortedWorkerStart;
    // console.log(`sorted ${elements} numbers is ${sortedWorkerEnd - sortedWorkerStart} with ${maxWorkers} workers`);

    // sort with no workers
    const sortedStart = performance.now();
    const list2 = sortBigArray(data.array);
    console.log(list2)
    const sortedEnd = performance.now();
    $withoutWorker.innerHTML = sortedEnd - sortedStart;
    // console.log(`sorted ${elements} numbers is ${sortedEnd - sortedStart} without workers`);

    console.log('Done!')
}

function getElementById(id) {
    return document.getElementById(id);
}

window.onload = function() {
    const data = {
        arry: [],
        length: 0,
        maxWorkers: 0, //  navigator.hardwareConcurrency || 4
    };
    
    const $arrayLengthInput = getElementById('array-length');
    const $maxWorkersInput = getElementById('worker-length');
    const $btn = getElementById('btn');

    $arrayLengthInput.addEventListener('change', function(e) {
        const value = e.target.value || '0';
        data.length = parseInt(value, 10);
    });
    $maxWorkersInput.addEventListener('change', function(e) {
        const value = e.target.value || '0';
        data.maxWorkers = parseInt(value, 10);
    });
    
    $btn.addEventListener('click', function() {
        const {length, maxWorkers} = data;
        if (!length || !maxWorkers) {
            return;
        }
        data.array = generatedArray(length);
        run(data).catch((err) => {
            console.log('err', err)
        });
    });
}
