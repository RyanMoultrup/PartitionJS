# PartitionJS
JavaScript Array utility that will take an array of objects and partition it into any number of arrays based on callback functions.

```javascript
import partition from '../lib/Partition.js'

const partitioner = partition()
```
How this code works explained below. The order of the add methods is the order that the arrays will be indexed. The first add
method is index zero and so on. In the code below the data is being split into two arrays, one that contains all the females
and the other the males. 

If you wanted to split the data below into two array, one containing all the females and the other the males, this is 
accomplished by calling the add method twice. Each add method takes a callback that lets PartitionJS know which object to add
to each array. If the callback return truthy the object will be added to the array. 
```javascript
const data = [
  {name: 'John', sex: 'male', hair: { length: 'long', color: 'brown' }},
  {name: 'Lindsay', sex: 'female', hair: { length: 'short', color: 'blonde' }},
  {name: 'Eric', sex: 'male', hair: { length: 'short', color: 'blonde' }},
  {name: 'Lucy', sex: 'female', hair: { length: 'long', color: 'brown' }},
  {name: 'Bill', sex: 'male', hair: { length: 'long', color: 'brown' }}
];

const [ males, females ]  = partition()
  .add(i => i.sex === 'male')
  .add(i => i.sex === 'female')
  .split(data)

console.log('males', males)
console.log('females', females)
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


