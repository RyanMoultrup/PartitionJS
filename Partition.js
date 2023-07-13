/**
 * Base class for Partition.js
 *
 * @class Partition
 */
export class Partition {
    constructor () {
        this.fnCount = 0;
        this.callbacks = new Map();
    }

    #callbackReducer (item, response) {
        return (callback, key) => {
            try {
                if (!response[key]) response[key] = [];
                if (callback(item)) response[key].push(item);
            } catch (e) {
                console.error(e.message);
            }
        }
    }

    /**
     * Registers a new partition that will be created with all
     * items that pass the calls back function when the data
     * is looped over. Items can exist in multiple partitions if
     * an item passed the callback truth test
     *
     * @example
     * const [ array1, array2 ]  = partition()
     *   .add(i => i.attribute === true)
     *
     * @param {Function} [fn]
     * @returns {this}
     */
    add (fn) {
        this.callbacks.set(this.fnCount, fn);
        this.fnCount++;
        return this;
    }

    /**
     * Accepts an array of data that will then be split into
     * multiple arrays based on the registered add functions
     *
     * @param {Array} [data]
     * @returns {Array}
     */
    split (data) {
        return data.reduce((response, item) => {
            this.callbacks.forEach(this.#callbackReducer(item, response))
            return response;
        }, []);
    }
}

/**
 * Partition is an array utility that will take in an array of
 * objects and partition them into separate arrays based on
 * registered callback functions that. If an item of the original
 * array passes the truth test of a callback function it will be
 * added to the partition that function creates
 *
 * @example
 * const data = [
 *   { name: 'John', sex: 'male', height: 'tall', hair: { length: 'long', color: 'brown' } },
 *   { name: 'Lindsay', sex: 'female', height: 'tall', hair: { length: 'short', color: 'blonde' }  },
 *   { name: 'Eric', sex: 'male', height: 'tall', hair: { length: 'short', color: 'blonde' }  },
 *   { name: 'Lucy', sex: 'female', height: 'short', hair: { length: 'long', color: 'brown' }  },
 *   { name: 'Bill', sex: 'male', height: 'short', hair: { length: 'long', color: 'brown' }  }
 * ];
 *
 * const [ males, females, tallPeople, shortHair, blondHair]  = partition()
 *   .add(i => i.sex === 'male')
 *   .add(i => i.sex === 'female')
 *   .add(i => i.height === 'tall')
 *   .add(i => i.hair.length === 'short')
 *   .add(i => i.hair.color === 'blonde')
 *   .split(data);
 *
 * @returns {Function}
 */
export const partition = data => new Partition(data);

