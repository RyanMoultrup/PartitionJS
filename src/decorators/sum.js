export default (partition, { sum }) => {
    return sum ? { ...partition, sum: partition.partition.reduce((value, i) => value + +i) } : { ...partition };
}