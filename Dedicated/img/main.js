function createImgNode(index) {
    const img = document.createElement('img');
    img.setAttribute('id', `img${index}`);
    return img;
}
$imgBox = document.querySelector('.img-box');
const worker = new Worker('worker.js');
worker.onmessage = (e) => {
    const {url, id} = e.data; // `img${i}`
    const $img = document.getElementById(id);
    if ($img) {
        $img.src = url
    }
}
for (let i = 0; i < images.length; i++) {
    $imgBox.appendChild(createImgNode(i));
    worker.postMessage({url: images[i], id: `img${i}`});
}