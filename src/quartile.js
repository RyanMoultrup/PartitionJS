import { default as median } from "./median.js";
export default (data) => {
    data.sort((a, b) => a - b);

    const Q1 = median(data, 0, Math.floor(data.length / 2) - 1);
    const Q2 = median(data, 0, data.length - 1);
    const Q3 = median(data, Math.ceil(data.length / 2), data.length - 1);

    return [
        data.filter(n => n <= Q1),
        data.filter(n => n > Q1 && n <= Q2),
        data.filter(n => n > Q2 && n <= Q3),
        data.filter(n => n > Q3)
    ]
}
