# Arrow Functions Point the Way

> Now in JavaScript, you can write functions in a completely different way, called arrow notation. What's even better is that if your function only has a single return value, you can reduce your entire functions declaration and body to just one line.

## Clearer syntax

```JavaScript
const username = {
    name: 'Andrew',
    email: 'andrew@example.com'
}
username.name = "Ashley"
username.email = 'ashley@example.com'

// function init(name, isTrue) {
//     document.getElementById('output').innerHTML = `${username.name}(${username.email})` 
// }

const init = (name, isTrue) => {
    document.getElementById('output').innerHTML = `${username.name}(${username.email})`
}

init()
```

## Behavior slightly different as traditional function

```JavaScript
// traditional
function nameString() {
    return `${username.name}(${username.email})`
}

// arrow function
const nameString = () => `${username.name}(${username.email})`
```

```JavaScript
// traditional
function nameString() {
    return `${username.name}(${username.email})`
}

// arrow function
const nameString = name => `${name}(${username.email})`

document.getElementById('output').innerHTML = nameString('Andrew')
```

```JavaScript

let users = [
    {
        name: 'Andrew',
        email: 'andrew@example.com'
    },
    {
        name: 'Ashley',
        email: 'ashley@example.com'
    }
]

let names = [];

// users.forEach(function(user) {
//     names.push(user.name)
// })

users.forEach(user => names.push(user.name))

document.getElementById('output').innerHTML = names.join(', ')

// output: Andrew, Ashley
```

## One of the large difference between traditional function and arrow function

How they treat "this" keyword in object

```JavaScript

document.getElementById('btn').addEventListener('click', function() {
    function getDetails() {
        return `The button id is ${this.getAttribute('id')}`
    }

    document.getElementById('output').innerHTML = getDetails()
})


// output
// Uncaught TypeError: Cannot read properties of undefined (reading 'getAttribute')
//     at getDetails (main.js:67:41)
//     at HTMLButtonElement.<anonymous> (main.js:70:51)
```
