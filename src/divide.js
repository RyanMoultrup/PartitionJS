export default (data, divisions) => {
    const size = Math.ceil(data.length / divisions);
    return Array.from({ length: divisions }, (_, i) => data.slice(i * size, i * size + size));
}
