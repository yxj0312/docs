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

// 

// Ep04

// // Initialize an Item class
// function Item(name, category) {
//     this.name = name;
//     this.category = category
// }

// // Create a method called getDetails() for an Item
// Item.prototype.getDetails = function() {
//     return `${this.name} - ${this.category}`
// }

// // Initialize a PurchasedItem class, inherits the Item class
// function PurchasedItem(name, category, price) {
//     Item.call(this, name, category)
//     this.price = price
// }

// // Sets the inherited methods and properties of the base class
// PurchasedItem.prototype = Object.create(Item.prototype)
// PurchasedItem.prototype.constructor = PurchasedItem

// // Creates a new method just for the extended PurchasedItem class
// PurchasedItem.prototype.getDetailsWithPrice = function() {
//     return `${this.name} - ${this.category} - $${this.price}`
// }

// var item = new Item('Coffee', 'Food')

// item.category = 'Drinks'

// var purchasedItem = new PurchasedItem('Sugar', 'Food', '2.49')

// document.getElementById('output').innerHTML = purchasedItem.getDetailsWithPrice()


// Ep04
// class Item {
//     constructor(name, category) {
//         this.name = name
//         this.category = category
//     } 

//     static maxItems = 10

//     static getHelperText() {
//         return 'Add some items to your grocery list'
//     }

//     getDetails() {
//         return `${this.name} - ${this.category}`
//     }

// }



// class PurchasedItem extends Item {
//     constructor(name, category, price) {
//         super(name, category) 
//         this.price = price
//     }

//     getDetailsWithPrice() {
//         return `${this.name} - ${this.category} - $${this.price}`
//     }

//     static getNumberOfItems() {
//         return `3 / ${super.maxItems}`
//     }
// }

// let item = new Item('Coffee', 'Food')
// item.category = 'Drinks'

// let purchasedItem = new PurchasedItem('Sugar', 'Food', '2.49')

// // document.getElementById('output').innerHTML = item.getDetails()
// // document.getElementById('output').innerHTML = purchasedItem.getDetailsWithPrice()
// // document.getElementById('output').innerHTML = Item.getHelperText()
// document.getElementById('output').innerHTML = PurchasedItem.getNumberOfItems()


// Ep04
// let myPromise = new Promise((resolve, reject) => {
//     //  call an api
//     let user = {
//         name: 'Andrew',
//         email: 'andrew@example.com'
//     }

//     setTimeout(() => {
//         resolve(user);
//         // reject('Sorry, could not  retrieve the user.')
//     }, 2000)
// })

// const getAdditionalUserData = user => {
//     document.getElementById('output').innerHTML = `${user.name} (${user.email})`

//     return new Promise((resolve,reject) => {
//         // calling another api to get more user data
//         // let additionalData = {
//         //     favoriteColor: 'Blue',
//         //     currentDrink: 'La Croix'
//         // }
        
//         user.favoriteColor = 'Blue'
//         user.currentDrink = 'La Croix'

//         setTimeout(() => {
//             resolve(user)
//         }, 2000);
//     })
// }

// // be executed after 2sec, because of setTimeOut
// // myPromise.then((user) => {
// //     // document.getElementById('output').innerHTML = `${user.name} (${user.email})`
// // }).catch((error) => {
// //     document.getElementById('output').innerHTML = error
// // })


// myPromise.then(getAdditionalUserData)
// .then((user) => {
//     document.getElementById('output').innerHTML = `${user.name} (${user.email}) - ${user.currentDrink}` 
// })
// .catch((error) => {
//     document.getElementById('output').innerHTML = error
// })


// // be executed first
// document.getElementById('output').innerHTML = 'Look ma, no blocking!'

// Ep06
// async function init() {
//     const start = Date.now();
//     document.getElementById('output').innerHTML = `0: init()`;

//     const userPromise = getUserData();
//     const welcomeStringPromise = getWelcomeString();

//     const user = await userPromise;
//     document.getElementById('output').innerHTML += `<br>${Date.now() - start}: ${user.name}`;

//     const welcomeString = await welcomeStringPromise;
//     document.getElementById('output').innerHTML += `<br>${Date.now() - start}: ${welcomeString}`;
// }

// function getUserData() {
//     return new Promise((resolve,reject) => {
//         let user = {
//             name: 'Andrew',
//             email: 'andrew@example.com'
//         }
//         setTimeout(() => {
//             resolve(user)
//         }, 2000);
//     })
// }

// function getWelcomeString() {
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             resolve('welcome to my asyncronous program ')
//         }, 2000);
//     })
// }

// init()

// Ep07
// const fruit = new Map();

// fruit.set(1, 'Banana');
// fruit.set(2, 'Apple');
// fruit.set(3, 'Strawberry');

// document.getElementById('output').innerHTML = fruit.get(2)

// fruit.delete(2)
// fruit.forEach(item => {
//     document.getElementById('output').innerHTML += '<br>' + item
// })

// fruit.set(4, {
//     type: 'Orange',
//     color: 'orange',
//     flavor: 'orangey'
// })

// document.getElementById('output').innerHTML = fruit.get(4).flavor

const users = new Map();

// object could also be used as key, and function could also be used as value in map
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