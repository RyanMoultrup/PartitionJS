const average = arr => {
    const sum = arr.reduce((accumulator, value) => accumulator + value, 0);
    return sum / arr.length;
}
export default (partition, { avg }) =>  {
    return avg ? { ...partition, avg: average(partition.partition) } : { ...partition };
}