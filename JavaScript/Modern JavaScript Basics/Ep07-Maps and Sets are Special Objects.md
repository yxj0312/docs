# Maps and Sets are Special Objects

> Usually when working with sets of data in JavaScript, you're either using arrays or objects. However, ES6 introduced two new special objects to use, maps and sets, both of which come with their own methods, use cases, and limitations.

```JavaScript

const fruit = new Map();

fruit.set(1, 'Banana');
fruit.set(2, 'Apple');
fruit.set(3, 'Strawberry');

document.getElementById('output').innerHTML = fruit.get(2)

```
