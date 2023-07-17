export default (data, divisions) => {
    const size = Math.floor(data.length / divisions);
    const remainder = data.length % divisions;

    return Array.from({ length: divisions }, (_, i) => {
        const start = i * size + Math.min(i, remainder);
        const end = start + size + (i < remainder ? 1 : 0);
        return data.slice(start, end);
    });
}
