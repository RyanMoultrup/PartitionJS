export default (data) => {
    const Q1 = Math.floor(data.length / 4);
    const Q2 = Math.floor(data.length / 2);
    const Q3 = Math.floor(3 * data.length / 4);

    return [
        data.slice(0, Q1),
        data.slice(Q1, Q2),
        data.slice(Q2, Q3),
        data.slice(Q3)
    ];
}
