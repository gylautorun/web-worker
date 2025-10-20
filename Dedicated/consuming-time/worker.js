onmessage = e => {
    const num = e.data;
    let result = 0;
    console.time()
    // 循环计算求和
    for (let i = 0; i <= num; i++) {
        result += i;
    }
    console.log(`计算: ${num} 累加值时间`)
    console.timeEnd();
    // 向主线程发送消息
    postMessage(result)
}