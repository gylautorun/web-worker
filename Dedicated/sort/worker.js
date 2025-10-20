function sortBigArray(array) {
    return array.sort((a, b) => a - b);
}

onmessage = ({data}) => {
    const sorted = sortBigArray(data);
    postMessage(sorted);
};
