import { default as median } from "./median.js";
import { sort, numericOnly } from "./helpers.js";

export default (data) => {
    const sortedData = sort(numericOnly(data));

    const Q1 = median(sortedData, 0, Math.floor(sortedData.length / 2) - 1);
    const Q2 = median(sortedData, 0, sortedData.length - 1);
    const Q3 = median(sortedData, Math.ceil(sortedData.length / 2), sortedData.length - 1);

    return sortedData.reduce((partition, n) => {
        if (n <= Q1) partition[0].push(n);
        if (n > Q1 && n <= Q2) partition[1].push(n);
        if (n > Q2 && n <= Q3) partition[2].push(n);
        if (n > Q3) partition[3].push(n);

        return partition;
    }, [[], [], [], []]);
}
