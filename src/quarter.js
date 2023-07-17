export default (data) => {
    const Q1 = Math.floor(data.length / 4);
    const Q2 = Math.floor(data.length / 2);
    const Q3 = Math.floor(3 * data.length / 4);

    return data.reduce((partitions, currentVal, currentIndex) => {
        if (currentIndex < Q1) partitions[0].push(currentVal);
        else if (currentIndex < Q2) partitions[1].push(currentVal);
        else if (currentIndex < Q3) partitions[2].push(currentVal);
        else partitions[3].push(currentVal);
        return partitions;
    }, [[], [], [], []]);
};
