export default (partition, { count }) => {
    return count ? { ...partition, count: partition.partition.length } : { ...partition };
}