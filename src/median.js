export default (arr, start, end) => {
    const length = end - start + 1;
    const middle = start + Math.floor(length / 2);
    return length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
}
