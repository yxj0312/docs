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
