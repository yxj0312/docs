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


// be executed first
document.getElementById('output').innerHTML = 'Look ma, no blocking!'