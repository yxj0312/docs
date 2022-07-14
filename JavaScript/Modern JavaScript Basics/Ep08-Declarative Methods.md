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
