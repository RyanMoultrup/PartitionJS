import decorator from "./decorator.js";
import { default as quartile } from "./quartile.js";
import { default as divide } from "./divide.js";
import { default as quarter } from "./quarter.js";
import { isValidData } from "./helpers.js";
import spawnWorker from 'worker:worker.js';

/**
 * Base class for Partition.js
 *
 * @class Partition
 */
export default class Partition {
    constructor () {
        this.calc = {
            sum: false,
            count:false,
            avg: false
        }
        this._count = false;
        this.callbacks = [];
        this._workers = false;
    }

    quartile (data) {
        return quartile(data);
    }

    quarter (data) {
        return quarter(data)
    }

    #splitArray (data) {
        const mid = Math.floor(data.length / 2);
        return [data.slice(0, mid), data.slice(mid)];
    }

    #partitionReducer (callback) {
        return (partition, item) => {
            try {
                if (callback.fn(item)) partition.push(item);
            } catch (e) {
                console.error(e.message);
            }
            return partition;
        }
    }

    #createPartitions (data) {
        return this.callbacks.map(callback => {
            const partition = data.reduce(this.#partitionReducer(callback), []);
            return decorator({
                partition,
                sum: callback.sum || this.calc.sum,
                count: callback.count || this._count,
                avg: this.calc.avg
            });
        }).map(partition => Object.keys(partition).length > 1 ? partition : partition.partition);
    }

    #createPartitionsWithWorkers (data) {
        const promises = this.callbacks.map(callback => {
            return new Promise(async (resolve, reject) => {
                const partition = await spawnWorker({ data, callback: callback.fn.toString() });
                resolve(partition);
            })
        });

        return Promise.all(promises)
            .then(results => {
                return results;
            });
    }

    #splitWithCallback (data) {
        return this._workers
            ? this.#createPartitionsWithWorkers(data)
            : this.#createPartitions(data);
    }

    #addCallback (fn) {
        this.callbacks.push(fn);
    }

    /**
     * Registers a new partition that will be created with all items that pass
     * the calls back function when the data is looped over. Items can exist in
     * multiple partitions if an item passed the callback truth test
     *
     * @example
     * const [ array1, array2 ]  = partition()
     *   .add(i => i.attribute === true)
     *
     * @param {Function} [fn]
     * @returns {this}
     */
    add (fn) {
        this.#addCallback({ fn, sum: false, count: false });
        return this;
    }

    addSum (fn) {
        this.#addCallback({ fn, sum: true, count: false });
        return this;
    }

    addCount (fn) {
        this.#addCallback({ fn, sum: false, count: true });
        return this;
    }

    sum () {
        this.calc.sum = true;
        return this;
    }

    count () {
        this._count = true;
        return this;
    }

    avg () {
        this.calc.avg = true;
        return this;
    }

    divide (data, divisions) {
        return divide(data, divisions);
    }

    async () {
        this._workers = true;
        return this;
    }

    /**
     * Accepts an array of data that will then be split into
     * multiple arrays based on the registered add functions
     *
     * If no add methods have been called split will simply
     * divide the array into two equal partitions
     *
     * @param {Array} [data]
     * @returns {Promise|Array}
     */
    split (data) {
        isValidData(data);
        if (this._workers) {
            new Promise((resolve, reject) => {
                try {
                    resolve(this.callbacks.length ? this.#splitWithCallback(data) : this.#splitArray(data));
                } catch (e) {
                    reject(e);
                }
            }).catch(e => {
                console.error(e.message);
                return [];
            });
        }

        try {
            return this.callbacks.length ? this.#splitWithCallback(data) : this.#splitArray(data);
        } catch (e) {
            console.error(e.message);
            return [];
        }
    }
}
