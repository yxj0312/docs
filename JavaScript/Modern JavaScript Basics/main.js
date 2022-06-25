'use strict'
// Ep02
// var name = 'Andrew'

// function init() {
//     if (true) {
//     //    var email = 'andre@example.com' 
//        let email = 'andre@example.com' 
//     }

//     document.getElementById('output').innerHTML = email
// }

// const username = {
//     name: 'Andrew',
//     email: 'andrew@example.com'
// }
// username.name = "Ashley"
// username.email = 'ashley@example.com'

// function init() {
//     document.getElementById('output').innerHTML = `${username.name}(${username.email})` 
// }

// Ep03

// const username = {
//     name: 'Andrew',
//     email: 'andrew@example.com'
// }
// username.name = "Ashley"
// username.email = 'ashley@example.com'

// // function init(name, isTrue) {
// //     document.getElementById('output').innerHTML = `${username.name}(${username.email})` 
// // }

// const init = (name, isTrue) => {
//     document.getElementById('output').innerHTML = `${username.name}(${username.email})`
// }

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

// init()

document.getElementById('btn').addEventListener('click', function() {
    function getDetails() {
        return `The button id is ${this.getAttribute('id')}`
    }

    document.getElementById('output').innerHTML = getDetails()
})