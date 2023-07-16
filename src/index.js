import Partition from "./Partition.js";

/**
 * Partition is an array utility that will take in an array of integers or an
 * array of objects and partition them into separate arrays based on registered
 * callback functions that. If an item of the original array passes the truth
 * test of a callback function it will be added to the partition that function creates
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
 *   .split(data);
 *
 * @returns {Function}
 */
export default () => new Partition();