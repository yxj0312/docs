# Async and Await

```javaScript

async function init() {
    const start = Date.now()
    document.getElementById('output').innerHTML = `0:init()`

    const user = await getUserData()
    document.getElementById('output').innerHTML += `<br>${Date.now() - start}: ${user.name} ${user.email}`
}

function getUserData() {
    return new Promise((resolve,reject) => {
        let user = {
            name: 'Andrew',
            email: 'andrew@example.com'
        }
        setTimeout(() => {
            resolve(user)
        }, 2000);
    })
}

init()

// 0:init()
// 2001 Andrew andrew@example.com

```

```javaScript
async function init() {
    const start = Date.now()
    document.getElementById('output').innerHTML = `0:init()`

    const user = await getUserData()
    document.getElementById('output').innerHTML += `<br>${Date.now() - start}: ${user.name} ${user.email}`


    const welcomeString = await getWelcomeString()
    document.getElementById('output').innerHTML += `<br>${Date.now() - start}: ${user.name} ${user.email}`
}

function getUserData() {
    return new Promise((resolve,reject) => {
        let user = {
            name: 'Andrew',
            email: 'andrew@example.com'
        }
        setTimeout(() => {
            resolve(user)
        }, 2000);
    })
}

function getWelcomeString() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('welcome to my asyncronous program ')
        }, 2000);
    })
}

init()

// 0:init()
// 2005: Andrew andrew@example.com
// 4015: Andrew andrew@example.com
```
