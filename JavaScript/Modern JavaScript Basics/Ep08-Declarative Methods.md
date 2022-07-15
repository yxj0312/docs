# Declarative Methods

> You might have heard the term "Declarative Programming" before, but if you haven't, it's a way of writing code that explains what data you're retrieving instead of how. Using these modern JavaScript methods helps you do just that, and improves your code readability.

```JavaScript

let fruit = ['Banana', 'Strawberry', 'Orange', 'Apple', 'Grape', 'Plum']

let fruitsThatContainE = []

fruit.forEach(function(fruit) {
    if (fruit.includes('e')) {
        fruitsThatContainE.push(fruit)
    }
})

document.getElementById('output').innerHTML = fruitsThatContainE.join(',')

// Strawberry,Orange,Apple,Grape
```

Declarative Methods of JavaScript could before

```JavaScript
let fruit = ['Banana', 'Strawberry', 'Orange', 'Apple', 'Grape', 'Plum']

// let fruitsThatContainE = []

// fruit.forEach(function(fruit) {
//     if (fruit.includes('e')) {
//         fruitsThatContainE.push(fruit)
//     }
// })

let fruitsThatContainE = fruit.filter(f => f.includes('e'))

document.getElementById('output').innerHTML = fruitsThatContainE.join(',')
```

other helpful array methods to declare the codes like above in es6

- reduce

```JavaScript
//  reduce example
let users = [
    {
        name: 'Andrew',
        email: 'andrew@example.com',
        stars: 5
    },
    {
        name: 'Ashley',
        email: 'ashley@example.com',
        stars: 9
    },
    {
        name: 'Gaston',
        email: 'gaston@example.com',
        stars: 1
    },
]

// reduce, first argument means: acc: the value that returns back, after this function finishes up (here stars)
// the second argument, is the item in the array that currently performing an action on
// Now what we have to do inside this function: is to manipulate the acc in order to get back that value that we want
// in our case, wa are adding the stars we have to the main stars collection
// reduce needs a default value (here 0)
// if we exclude the default value, reduce will throw an exception, if nothing available. but if 0 here, then it returns 0
let totalStars = users.reduce((stars, user) => stars += user.stars, 0)
```

- map

```JavaScript
// map example

let userEmails = users.map(user => user.email)
document.getElementById('output').innerHTML = '<br>Email: ' + userEmails
```
