# Promises are Made

```JavaScript

let myPromise = new Promise((resolve, reject) => {
    //  call an api
    let user = {
        name: 'Andrew',
        email: 'andrew@example.com'
    };

    setTimeout(() => {
        resolve(user);
    }, 2000)
});

// be executed after 2sec, because of setTimeOut
myPromise.then((user) => {
    document.getElementById('output').innerHTML = `${user.name} (${user.email})`
})


// be executed first
document.getElementById('output').innerHTML = 'Look ma, no blocking!'

```

Rejection:

```JavaScript

let myPromise = new Promise((resolve, reject) => {
    //  call an api
    let user = {
        name: 'Andrew',
        email: 'andrew@example.com'
    }

    setTimeout(() => {
        // resolve(user);
        reject('Sorry, could not  retrieve the user.')
    }, 2000)
})

// be executed after 2sec, because of setTimeOut
myPromise.then((user) => {
    document.getElementById('output').innerHTML = `${user.name} (${user.email})`
}).catch((error) => {
    document.getElementById('output').innerHTML = error
})

// output: 
// Sorry, could not retrieve the user.

```

How chained function works

```JavaScript

const getAdditionalUserData = user => {
    document.getElementById('output').innerHTML = `${user.name} (${user.email})`

    return new Promise((resolve,reject) => {
        // calling another api to get more user data
        // let additionalData = {
        //     favoriteColor: 'Blue',
        //     currentDrink: 'La Croix'
        // }
        
        user.favoriteColor = 'Blue'
        user.currentDrink = 'La Croix'

        setTimeout(() => {
            resolve(user)
        }, 2000);
    })
}

myPromise.then(getAdditionalUserData)
.then((user) => {
    document.getElementById('output').innerHTML = `${user.name} (${user.email}) - ${user.currentDrink}` 
})
.catch((error) => {
    document.getElementById('output').innerHTML = error
})

//output
// Look ma, no blocking!
// 2sec
// Andrew (andrew@example.com)
// 2sec
// Andrew (andrew@example.com) - La Croix

```
