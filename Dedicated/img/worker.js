const cache = {};
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/png;base64,' + btoa(binary);
}

function imgToBase64({url, id}) {
    return new Promise((resolve, reject) => {
        if (cache[url]) {
            // console.log(cache[url]);
            resolve({status: 'ok', data: cache[url]});
        }
        else {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onreadystatechange = () => {
                const {readyState, status, response} = xhr;
                if (readyState == 4) {
                    if (status === 200) {
                        cache[url] = arrayBufferToBase64(response);
                        let base64 = cache[url];
                        resolve({status: 'ok', data: base64});
                    }
                    else {
                        reject({status: 'fail', messgae: '图片加载异常'});
                    }
                }
            }
            xhr.send();
        }
    })
}

onmessage = e => {
    const {url, id} = e.data;
    imgToBase64({url, id}).then(({status, data, messgae}) => {
        if (status === 'ok') {
            // 向主线程发送消息
            postMessage({url: data, id})
        }
    });
}