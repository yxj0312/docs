# Maps and Sets are Special Objects

> Usually when working with sets of data in JavaScript, you're either using arrays or objects. However, ES6 introduced two new special objects to use, maps and sets, both of which come with their own methods, use cases, and limitations.

Map example:

```JavaScript

const fruit = new Map();

fruit.set(1, 'Banana');
fruit.set(2, 'Apple');
fruit.set(3, 'Strawberry');

document.getElementById('output').innerHTML = fruit.get(2)


fruit.set(4, {
    type: 'Orange',
    color: 'orange',
    flavor: 'orangey'
})

document.getElementById('output').innerHTML = fruit.get(4).flavor

```

```JavaScript
// object could also be used as key, and function could also be used as value in map
users.set({
    name: 'Andrew',
    email: 'andrew@example.com'
}, function(user) {
    document.getElementById('output').innerHTML += `${user.name} (${user.email}) <br>`
})

users.set({
    name: 'Ashley',
    email: 'ashley@example.com'
}, function(user) {
    document.getElementById('output').innerHTML += `(${user.email})${user.name} <br>`
})

users.forEach((value,key) => {
    value(key)
})

// Andrew (andrew@example.com)
// (ashley@example.com)Ashley

// has methods
let userAshleyExists = users.has({
    name: 'Ashley',
    email: 'ashley@example.com'
})

console.log('userAshleyExists:', userAshleyExists)
```

we should get a true, but actually we get a false. Because they are not the same object.

instead:

```JavaScript
users.set({
    name: 'Andrew',
    email: 'andrew@example.com'
}, function(user) {
    document.getElementById('output').innerHTML += `${user.name} (${user.email}) <br>`
})

const userAshley = {
    name: 'Ashley',
    email: 'ashley@example.com'
}

users.set(userAshley, function(user) {
    document.getElementById('output').innerHTML += `(${user.email})${user.name} <br>`
})

users.forEach((value,key) => {
    value(key)
})

let userAshleyExists = users.has(userAshley)

console.log('userAshleyExists:', userAshleyExists)

// true
```
