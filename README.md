# PartitionJS
PartitionJS is a JavaScript Array utility that will take an array of data and partition it into any number of arrays based on different criteria.
The output is a 2D array where each array represents a partition of the original data that meets the criteria.

## Basic Usage
Import PartitionJs into the code you want to use it. By calling <code>partition</code> you'll have all the partitioning methods available
to you. Each time you call <code>partition</code> a new instance is created that will retain any additional setting passed to the instance.
```javascript
import partition from "partition-js";

const partitioner = partition()
```
PartitionJS takes in a array. The array can contain any type of primitives.
```javascript
const arr1 = [1, 2, 3, 4] // This will work
const arr2 = [1, [2], 3, 4] // this will work
const arr3 = [1, [2, 3], 4] // this will work
const arr4 = ['one', [2, 3], 4]; //this will work
const arr5 = ['one', {two: 2, three:3}, 4, [5]] // this will work
const arr6 = [
    { one: 1 , type: 'int'},
    { one: 2 , type: 'int'},
    { one: "3" , type: 'string'},
] // this will also work

const obj = {
    one: { one: 1 , type: 'int'},
    two: { one: 2 , type: 'int'},
    three: { one: "3" , type: 'string'},
} // this will NOT work and will simplyi return an empty array
```
You can then divide any valid array into any number of partitions by calling <code>divide</code>. The second parameter passed to <code>divide</code> tells PartitionJS
how many partitions to create from the array.
```javascript
const [partition1, partition2] = partition().divide([1, 2, 3, 4], 2)
const [objPartition1, objPartition2] = partition().divide([{one: 1}, {two: 2}, {three: 3}, {four: 4}], 2)
```
```
partition1 => [1, 2]
partition2 => [3, 4]

objPartition1 => [{one: 1}, {two: 2}]
objPartition2 => [{three: 3}, {four: 4}]
```
## API Reference
There are a number of ways that your data can be partitioned with PartitionJS.

* [divide](#divide)
* [quarter](#quarter)
* [quartile](#quartile)
* [split](#split)
  * [add](#add)
  * [addSum](#addSum)
  * [addCount](#addCount)
  * [sum](#sum)
  * [count](#count)
  * [avg](#avg)

### Divide
<a name="divide" href="#divide">#</a> partition().<b>divide</b>(<i>data, divisions</i>)

The <code>divide</code> method is the most basic way to create partitions. When you call this method PartitionJS is going to simply split
your data into the number of partitions specified and try and equally split your data between the partitions. 

<code>divide</code> will divide your array into as many partitions as you want. However if you tell <code>divide</code> to create more partitions
than the total size of your array empty arrays will be created in the additional division. 
```javascript
const data = [12, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1]
const [partitionTwo1, partitionTwo2] = partition().divide(data, 2)
const [partitionThree1, partitionThree2] = partition().divide(data, 3);
```
Will result in this
```
partitionTwo1 => [12, 2, 3, 4, 5, 6]
partitionTwo2 => [7, 8, 9, 10, 11, 1]

partitionThree1 => [12, 2, 3, 4]
partitionThree2 => [5, 6, 7, 8]
partitionThree3 => [9, 10, 11, 1]
```
{% note %}

**Note:** When calling <code>divide</code> the array is NOT sorted before the partitions are created

{% endnote %}

Often data does not divide equally into a specific number of partitions. PartitionJS will distribute your data as equally as possible
into each partition when the size of your array does not divide equally.
```javascript
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const [D1, D2, D3, D4] = partition().divide(data, 4);
```
```
D1 => [1, 2]
D2 => [3, 4, 5]
D3 => [6, 7]
D4 => [8, 9, 10]
```
{% note %}

**Note:** If you don't like how <code>divide</code> distributed your data into the partitions, you can use the <code>split</code> method to gain more control over what data goes in which partition.

{% endnote %}
### Quarter

<a name="divide" href="#divide">#</a> partition().<b>quarter</b>(<i>data</i>)

The <code>quarter</code> method is the same as calling <code>divide</code> and passing it 4. It simply divides your data into quarters as equally as possible.
```javascript
const data = [12, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1]

const [divide1, divide2, divide3, divide4] = partition().divide(data, 4)
const [quarter1, quarter2, quarter3, quarter4] = partition().quarter(data);
```
```
divide1 => [12, 2, 3]
divide2 => [4, 5, 6]
divide3 => [7, 8, 9]
divide4 => [10, 11, 1]

quarter1 => [12, 2, 3]
quarter2 => [4, 5, 6]
quarter3 => [7, 8, 9]
quarter4 => [10, 11, 1]
```
### Quartile

<a name="divide" href="#divide">#</a> partition().<b>quartile</b>(<i>data</i>)

The <code>quartile</code> method is similar to the <code>quarter</code> method insofar as each will partition your data into 4 equally distributed partitions. 
The only difference between the two is that <code>quartile</code> sorts the data first.

```javascript
const data = [12, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1]

const [quartile1, quartile2, quartile3, quartile4] = partition().quartile(data);
```
```
quartile1 => [1, 2, 3] // 1 is now is the first partition of the lowest quartile
quartile2 => [4, 5, 6]
quartile3 => [7, 8, 9]
quartile4 => [10, 11, 12]
```

### Split

<a name="divide" href="#divide">#</a> partition().<b>split</b>(<i>data</i>)

The <code>split</code> method is the most powerful feature of PartitionJS. With <code>split</code> you can partition arrays of objects as
well as have complete control over which array item goes in which partition.

If you simply call the <code>split</code> method and pass in your data it will create two partitions splitting your array in half (or as close to half as possible).

```javascript
const data = [
  {name: 'John', sex: 'male', hair: { length: 'long', color: 'brown' }},
  {name: 'Lindsay', sex: 'female', hair: { length: 'short', color: 'blonde' }},
  {name: 'Eric', sex: 'male', hair: { length: 'short', color: 'blonde' }},
  {name: 'Lucy', sex: 'female', hair: { length: 'long', color: 'brown' }},
  {name: 'Bill', sex: 'male', hair: { length: 'long', color: 'brown' }}
];

const [split1, split2] = partition().split(data)
```
```

split1 =>  [
  {"name": "John", "sex": "male", "height": "tall", "hair": {"length": "long", "color": "brown"}},
  {"name": "Lindsay", "sex": "female", "height": "tall", "hair": {"length": "short", "color": "blonde"}}
]
split2 =>  [
  {"name": "Eric", "sex": "male", "height": "tall", "hair": {"length": "short", "color": "blonde"}},
  {"name": "Lucy", "sex": "female", "height": "short", "hair": {"length": "long", "color": "brown"}},
  {"name": "Bill", "sex": "male", "height": "short", "hair": {"length": "long", "color": "brown"}}
]

```
The real power of the <code>split</code> method comes with the addition of the <code>add</code> method.

### Add

<a name="divide" href="#divide">#</a> partition().<b>add</b>(<i>callback</i>)

The <code>add</code> method allows you to specify how many partitions you would like to create out of your data. It takes a callback
function where you tell PartitionJS which array item you would like passed to each partition.

If you wanted to split the data below into two array, one containing all the females and the other the males, this is 
accomplished by calling the add method twice. Each add method takes a callback that lets PartitionJS know which object to add
to each array. Each item in your array will be passed to the callback function. If the callback return truthy the object will be added to that partition. 
```javascript
const data = [
  {name: 'John', sex: 'male', hair: { length: 'long', color: 'brown' }},
  {name: 'Lindsay', sex: 'female', hair: { length: 'short', color: 'blonde' }},
  {name: 'Eric', sex: 'male', hair: { length: 'short', color: 'blonde' }},
  {name: 'Lucy', sex: 'female', hair: { length: 'long', color: 'brown' }},
  {name: 'Bill', sex: 'male', hair: { length: 'long', color: 'brown' }}
];

const [males, females]  = partition()
  .add(i => i.sex === 'male')
  .add(i => i.sex === 'female')
  .split(data)
```
```
males => [
    {"name": "John","sex": "male", "hair": {"length": "long", "color": "brown"}},
    {"name": "Eric", "sex": "male", "hair": {"length": "short", "color": "blonde"}},
    {"name": "Bill","sex": "male","height": "short","hair": {"length": "long","color": "brown"}}
]

females => [
    {"name": "Lindsay", "sex": "female", "hair": {"length": "short","color": "blonde"}},
    {"name": "Lucy", "sex": "female", "hair": {"length": "long","color": "brown"}}
]
```
The order of the add methods is the order that the arrays will be indexed. The first add
method is index zero and so on. In the code below the data is being split into two arrays, one that contains all the females
and the other the males.

You can add additional conditions to your callback function to get more granular control over which object goes into
which array.

Let's say you want more control over the data in the second array. With a typical partitioning scipt/package you're stuck
with whatever happens to get rejected from the first partition. PartitionJS allows you control which objects goes into each
array by calling add again. Now you're able partition the array to an array with all the males and another array with females 
that have brown hair
```javascript
const data = [
  {name: 'John', sex: 'male', hair: { length: 'long', color: 'brown' }},
  {name: 'Lindsay', sex: 'female', hair: { length: 'short', color: 'blonde' }},
  {name: 'Eric', sex: 'male', hair: { length: 'short', color: 'blonde' }},
  {name: 'Lucy', sex: 'female', hair: { length: 'long', color: 'brown' }},
  {name: 'Bill', sex: 'male', hair: { length: 'long', color: 'brown' }}
];

const [ males, females ]  = partition()
  .add(i => i.sex === 'male' && i.hair.length === 'long')
  .add(i => i.sex === 'female' && i.hair.color === 'brown')
  .split(data)

console.log('males', males)
console.log('females', females)
```
```
males => [
    {"name": "John","sex": "male", "hair": {"length": "long", "color": "brown"}},
    {"name": "Bill","sex": "male","height": "short","hair": {"length": "long","color": "brown"}}
]

females => [
    {"name": "Lucy", "sex": "female", "hair": {"length": "long","color": "brown"}}
]
```
```javascript
const [ males, females, rejected ]  = partition()
  .add(i => i.sex === 'male' && i.hair.length === 'long')
  .add(i => i.sex === 'female' && i.hair.color === 'brown')
  .split(data)

console.log('males', males)
console.log('females', females)
consol.log('rejected', rejected)
```
```
males => [
    {"name": "John","sex": "male", "hair": {"length": "long", "color": "brown"}},
    {"name": "Bill","sex": "male","height": "short","hair": {"length": "long","color": "brown"}}
]

females => [
    {"name": "Lucy", "sex": "female", "hair": {"length": "long","color": "brown"}}
]
```
Each time you call add a new array will be created and all objects that meet the condition will be added to that array.
Objects can belong to more than on of the returned arrays if they meet the condition of multiple callbacks.
```javascript
const data = [
  {name: 'John', sex: 'male', hair: { length: 'long', color: 'brown' }},
  {name: 'Lindsay', sex: 'female', hair: { length: 'short', color: 'blonde' }},
  {name: 'Eric', sex: 'male', hair: { length: 'short', color: 'blonde' }},
  {name: 'Lucy', sex: 'female', hair: { length: 'long', color: 'brown' }},
  {name: 'Bill', sex: 'male', hair: { length: 'long', color: 'brown' }}
];

const [ males, females, shortHair, blondHair ]  = partition()
  .add(i => i.sex === 'male')
  .add(i => i.sex === 'female')
  .add(i => i.hair.length === 'short')
  .add(i => i.hair.color === 'blonde')
  .split(data)

console.log('males', males)
console.log('females', females)
console.log('shortHair', shortHair)
console.log('blondHair', blondHair)
```
```
males => [
    {"name": "John","sex": "male", "hair": {"length": "long", "color": "brown"}},
    {"name": "Eric", "sex": "male", "hair": {"length": "short", "color": "blonde"}},
    {"name": "Bill","sex": "male","height": "short","hair": {"length": "long","color": "brown"}}
]

females => [
    {"name": "Lindsay", "sex": "female", "hair": {"length": "short","color": "blonde"}},
    {"name": "Lucy", "sex": "female", "hair": {"length": "long","color": "brown"}}
]

shortHair => [
    {"name": "Lindsay", "sex": "female", "hair": {"length": "short","color": "blonde"}},
    {"name": "Eric", "sex": "male", "hair": {"length": "short","color": "blonde"}}
]

blondHair => [
    {"name": "Lindsay", "sex": "female", "hair": {"length": "short","color": "blonde"}},
    {"name": "Eric", "sex": "male", "hair": {"length": "short","color": "blonde"}}
]
```


