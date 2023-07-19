# PartitionJS
PartitionJS is a JavaScript Array utility that will take an array of data and partition it into any number of arrays based on different criteria.
The output is a 2D array where each array represents a partition of the original data that meets the criteria.

Genuine asychronous array manipulation is able to be achieved through the use of worker threads that are spawned by PartitionJS to do the heavy lifing outside of the main
even loop executing the rest of your code. Performing <code>async</code> operations is optional and can be switched on and off for optimal code performance. 

* [Installation](#installation)
* [Basic Usage](#basic-usage)
* [API Reference](#api-reference)
* [Parallel Processing](#parallel-processing)

## Installation
PartitionJS is a multi-environment package. It will work in Node as well as the browser. Modern ES6 syntax is used when working with modern JS frameworks like React, Vue, etc. Additionally 
the build from the CDN is transpiled to work with legacy code direcly in HTML. 

Whether you're working in Node or the browser, installation is the same. PartitionJS will automatically deliver the correct version of the code for your environment.

Install from npm
```
npm install @rmoultrup/partitionjs
```

To install from CDN add this to the <code>head</code> of your HTML.
```html
<script src="https://cdn.jsdeliver.net/npm/@rmoultrup/partitionjs@0.0.7/dist/partitionjs.umd.min.js"></script>
```
```javascript
<script>
    var partitioner = partition()
</script>
```

## Basic Usage
Import PartitionJs into the code you want to use it. By calling <code>partition</code> you'll have all the partitioning methods available
to you. Each time you call <code>partition</code> a new instance is created that will retain any additional setting passed to the instance.

```javascript
import partition from "@rmoultrup/partitionjs";
const partition = require("@rmoultrup/partitionjs") // if you're using Node

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
const [objPartition1, objPartition2] = partition()
    .divide([{one: 1}, {two: 2}, {three: 3}, {four: 4}], 2)
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
  * [addSum](#addsum)
  * [addCount](#addcount)
* [Modifiers](#modifiers)
  * [async](#async)
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
const [partitionThree1, partitionThree2, partitionThree3] = partition().divide(data, 3);
```
Will result in this
```
partitionTwo1 => [12, 2, 3, 4, 5, 6]
partitionTwo2 => [7, 8, 9, 10, 11, 1]

partitionThree1 => [12, 2, 3, 4]
partitionThree2 => [5, 6, 7, 8]
partitionThree3 => [9, 10, 11, 1]
```

> **Note:** When calling <code>divide</code> the array is NOT sorted before the partitions are created


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

> **Note:** If you don't like how <code>divide</code> distributed your data into the partitions, you can use the <code>split</code> method to gain more control over what data goes in which partition.

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

<a name="divide" href="#divide">#</a> partition().<b>add</b>(<i>callback</i>).split(...)

The <code>add</code> method allows you to specify how many partitions you would like to create out of your data. It takes a callback
function where you tell PartitionJS which array item you would like passed to each partition. Each item in your array is passed to 
your callback function and if the item that passes your callback's truth test will be added to the partition.

If you wanted to split the data below into two array, one containing all the females and the other the males, this is 
accomplished by calling the add method twice. 
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

> **Note:** You must call any <code>add</code> methods before you call <code>split</code>.


The number of <code>add</code> methods that you call will determine the number of partitions that are created. Also the 
order that you call the <code>add</code> methods is the order that the arrays will be indexed. The first add
method is index zero and so on. In the code below the data is being split into two arrays, one that contains all the females
and the other the males.

You can add additional conditions to your callback function to get more granular control over which object goes into
which array.

Let's say you want more control over the data in the second array. You can simply add additions conditions to you <code>add</code>
methods and now you're able partition the array to an array with all the males with long hair and another array with females 
that have brown hair
```javascript
const data = [
  {name: 'John', sex: 'male', hair: { length: 'long', color: 'brown' }},
  {name: 'Lindsay', sex: 'female', hair: { length: 'short', color: 'blonde' }},
  {name: 'Eric', sex: 'male', hair: { length: 'short', color: 'blonde' }},
  {name: 'Lucy', sex: 'female', hair: { length: 'long', color: 'brown' }},
  {name: 'Bill', sex: 'male', hair: { length: 'long', color: 'brown' }}
];

const [ malesLongHair, femalesBrownHair ]  = partition()
  .add(i => i.sex === 'male' && i.hair.length === 'long')
  .add(i => i.sex === 'female' && i.hair.color === 'brown')
  .split(data)
```
```
malesLongHair => [
    {"name": "John","sex": "male", "hair": {"length": "long", "color": "brown"}},
    {"name": "Bill","sex": "male","height": "short","hair": {"length": "long","color": "brown"}}
]

femalesBrownHair => [
    {"name": "Lucy", "sex": "female", "hair": {"length": "long","color": "brown"}}
]
```

Each time you call <code>add</code> a new partition will be created and all objects that meet the condition will be added to that array.
<b>Objects can belong to more than one of the returned arrays if they meet the condition of multiple callbacks.</b> Keep note of this as you may
end up with unwanted duplicate data in your partitions if your callbacks are not filtering the way you thought they would.

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
Partitioning a mixed type array into partitions of the same type

```javascript
const arr = [
    1, 2, 3, 14, [33, 34],
    {n: 'jim'}, 5, 7, {n: 'jane'},
    'type', 22, 25, 'cat', 4, 'caller'
]

const [ints, strings, objects] = partition()
    .add(i => Number.isInteger(i))
    .add(i => typeof i === 'string' || i instanceof String)
    .add(i => typeof i === 'object' && i !== null && !Array.isArray(i))
    .split(arr)
```
```
ints => [1, 2, 3, 14, 5, 7, 22, 25, 4]
stings => ['type', 'cat', 'caller']
objects => [{n: 'jim'}, {n: 'jane'}]
```

### AddCount

<a name="divide" href="#divide">#</a> partition().<b>addCount</b>(<i>callback</i>)

By calling the <code>addCount</code> method you'll get the count of the number of items in your partition returned along with the
partition array.

Building on the previous example we can create some of our partitions with the <code>addCount</code> method

```javascript
const arr = [
    1, 2, 3, 14, [33, 34],
    {n: 'jim'}, 5, 7, {n: 'jane'},
    'type', 22, 25, 'cat', 4, 'caller'
]

const [ints, strings, objects] = partition()
    .addCount(i => Number.isInteger(i))
    .addCount(i => typeof i === 'string' || i instanceof String)
    .add(i => typeof i === 'object' && i !== null && !Array.isArray(i))
    .split(arr)
```
```
ints => { partition: [1, 2, 3, 14, 5, 7, 22, 25, 4], count: 9 }
stings => { partition: ['type', 'cat', 'caller'], count: 3 }
objects => [{n: 'jim'}, {n: 'jane'}]
```
The return from <code>split</code> when using <code>addCount</code> not destructured will look like this. PartitionJS will 
only add the additional count data to partitions that use <code>addCount</code> and the rest will be unchanged.

```
[
    { partition: [1, 2, 3, 14, 5, 7, 22, 25, 4], count: 9 },
    { partition: ['type', 'cat', 'caller'], count: 3 },
    [{n: 'jim'}, {n: 'jane'}]
]
```
> **Note:** Note that PartitionJS is still returning an array even though some items are now objects

### AddSum

<a name="divide" href="#divide">#</a> partition().<b>addSum</b>(<i>callback</i>)

The <code>addSum</code> method is similar to <code>addCount</code> but it will sum up all the values of the partition and
add that data to the returned partition. <code>addSum</code> only works with integers. If there are non-integer values in 
a partition created with <code>addSum</code> they will be stripped out before the sum calculation takes place.

```javascript
const arr = [
    1, 2, 3, 14, [33, 34],
    {n: 'jim'}, 5, 7, {n: 'jane'},
    'type', 22, 25, 'cat', 4, 'caller'
]

const [ints, strings, objects] = partition()
    .addSum(i => Number.isInteger(i))
    .addCount(i => typeof i === 'string' || i instanceof String)
    .add(i => typeof i === 'object' && i !== null && !Array.isArray(i))
    .split(arr)
```
```
ints => { partition: [1, 2, 3, 14, 5, 7, 22, 25, 4], sum: 83 }
stings => { partition: ['type', 'cat', 'caller'], count: 3 }
objects => [{n: 'jim'}, {n: 'jane'}]
```

## Modifiers
Modifiers are additional methods that can be called that will modify all the other medhods available in PartitionJS in some way.

The available modifier in PartitionJS are <code>async</code>, <code>sum</code>, <code>count</code>, and <code>avg</code>.

### Async

<a name="divide" href="#divide">#</a> partition().<b>async()</b>.add(...).add(...)

The <code>async</code> modifier will make PartitionJS async. You can now <code>await</code> the response from PartitionJS or use <code>then</code>.

In JavaScript, array methods are blocking operations, meaning code will wait until the array method has returned before continuing to execute. With PartitionJS you can do the same reduction
on the array in a non-blocking async way. 

> **Note:** Async is only currently available when using the <code>split</code> method. However, anything the other methods are doing can easily be achieved with <code>.add(...).split(data)</code>. The other methods are more convenience methods to not have to write additional code. 

When reducing a really big array code execution will stop until <code>array.reduce</code> has finished.
```javascript
const reallyBigArray = [1, ... , 1000000]

console.log('--- start ---');

const reduced = reallyBigArray.reduce((reducer, i) => {
      if (i < 33) reducer[0].push(i)
      else if (i => i > 32 && i < 66) reducer[1].push(i)
      else if (i => i > 67) reducer[2].push(i)
      return reducer
    }, [[], [], []])

console.log('array.reduce done processing');
console.log('--- UI element loaded ---');
```

```
'--- start ---'
'array.reduce done processing'
'--- UI element loaded ---'
```

With PartitionJS this same operation can be made asynchronous allowing execution to continue while the array is partitioned. 
```javascript
const reallyBigArray = [1, ... , 1000000]

console.log('--- start ---');

partition()
    .async()
    .add(i => i < 33)
    .add(i => i > 32 && i < 66)
    .add(i => i > 67)
    .split(reallyBigArray)
    .then(result => {
      console.log('Partitions done processing');
    });

console.log('--- UI element loaded ---');
```
```
'--- start ---'
'--- UI element loaded ---'
'Partitions done processing'
```
See the Paralell Processing section to lean more about how PartitionJS does async operations.

### Sum

<a name="divide" href="#divide">#</a> partition().<b>sum()</b>.add(...).add(...)

When you call <code>sum</code> as a modifier it will apply <code>addSum</code> to all your partitions.

```javascript
const nums = [1, 2, 2, 4, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const splitSum = partition()
        .sum()
        .add(i => i < 6)
        .add(i => i > 5 && i < 11)
        .add(i => i > 10 && i < 14)
        .split(nums);
```
```
splitSum => [
    {
        "partition": [1, 2, 2, 4, 1, 3, 4, 5],
        "sum": 22
    },
    {
        "partition": [6, 7, 8, 9, 10],
        "sum": 40
    },
    {
        "partition": [11, 12],
        "sum": 23
    }
]
```

### Count

<a name="divide" href="#divide">#</a> partition().<b>count()</b>.add(...).add(...)

When you call <code>count</code> as a modifier it will apply <code>addCount</code> to all your partitions.

```javascript
const nums = [1, 2, 2, 4, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const splitCount = partition()
        .count()
        .add(i => i < 6)
        .add(i => i > 5 && i < 11)
        .add(i => i > 10 && i < 14)
        .split(nums);
```
```
splitCount => [
    {
        "partition": [1, 2, 2, 4, 1, 3, 4, 5],
        "count": 8
    },
    {
        "partition": [6, 7, 8, 9, 10],
        "count": 5
    },
    {
        "partition": [11, 12],
        "count": 2
    }
]
```

### Avg

<a name="divide" href="#divide">#</a> partition().<b>avg()</b>.add(...).add(...)

When you call <code>avg</code> as a modifier it will add the average of each of your partitions as extra data in the return array.

```javascript
const nums = [1, 2, 2, 4, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const splitAvg = partition()
        .avg()
        .add(i => i < 6)
        .add(i => i > 5 && i < 11)
        .add(i => i > 10 && i < 14)
        .split(nums);
```
```
splitAvg => [
    {
        "partition": [1, 2, 2, 4, 1, 3, 4, 5],
        "avg": 2.75
    },
    {
        "partition": [6, 7, 8, 9, 10],
        "avg": 8
    },
    {
        "partition": [11, 12],
        "avg": 11.5
    }
]
```

All three modifiers can be used together.

```javascript
const nums = [1, 2, 2, 4, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const splitAvgCountSum = partition()
        .avg()
        .count()
        .sum()
        .add(i => i < 6)
        .add(i => i > 5 && i < 11)
        .add(i => i > 10 && i < 14)
        .split(nums);
```
```
splitAvgCountSum => [
    {
        "partition": [1, 2, 2, 4, 1, 3, 4, 5],
        "avg": 2.75,
        "count": 8,
        "sum": 22
    },
    {
        "partition": [6, 7, 8, 9, 10],
        "avg": 8,
        "count": 5,
        "sum": 40
    },
    {
        "partition": [11, 12],
        "avg": 11.5,
        "count": 2,
        "sum" 23
    }
]
```

Because PartitionJS returns an array you have access to the built in JavaScript array functions. If you wanted to implement
your own modifiers this can be accomplished by mapping the results of <code>split</code>

```javascript
const nums = [1, 2, 2, 4, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const splitMap = partition()
        .add(i => i < 6)
        .add(i => i > 5 && i < 11)
        .add(i => i > 10 && i < 14)
        .split(nums)
        .map(partition => {
            return partition.map(i => i * 2)
        });
```
```
splitMap => [
    [2, 4, 4, 8, 2, 6, 8, 10],
    [12, 14, 16, 18, 20],
    [22, 24]
]
```

## Parallel Processing
PartitionJS is able to achieve real async operations on arrays by utilizing <code>Web Workers</code> when running in the browser and Node <code>Worker Threads</code> when running in Node.js. When the <code>async</code> modifier is used the actual processing of the array into paritions is handled in separate threads. This is accomplished by spawning workers that can do the heavy lifting off the main event loop and resolve the promise when execution has completed. This allows you to process large arrays asynchronously which is not possible with the JavaScript's built in array methods. 
