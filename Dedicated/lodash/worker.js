importScripts('https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.15/lodash.min.js');
onmessage = ({data}) => {
    console.log(`Worker: Received message - ${data}`)
    postMessage(_.kebabCase(data));
};



