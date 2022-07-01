# Class is in Session

> If you wanted to use OOP practices in JavaScript before ES6, you'd have to do something pretty hacky with functions and prototypes. Now though, classes are standard in the language and a breeze to work with.

before ES6:

```JavaScript

// Initialize an Item class
function Item(name, category) {
    this.name = name;
    this.category = category
}

// Create a method called getDetails() for an Item
Item.prototype.getDetails = function() {
    return `${this.name} - ${this.category}`
}

// Initialize a PurchasedItem class, inherits the Item class
function PurchasedItem(name, category, price) {
    Item.call(this, name, category)
    this.price = price
}

// Sets the inherited methods and properties of the base class
PurchasedItem.prototype = Object.create(Item.prototype)
PurchasedItem.prototype.constructor = PurchasedItem

// Creates a new method just for the extended PurchasedItem class
PurchasedItem.prototype.getDetailsWithPrice = function() {
    return `${this.name} - ${this.category} - $${this.price}`
}

var item = new Item('Coffee', 'Food')

item.category = 'Drinks'

var purchasedItem = new PurchasedItem('Sugar', 'Food', '2.49')


document.getElementById('output').innerHTML = item.getDetails()
document.getElementById('output').innerHTML = purchasedItem.getDetailsWithPrice()

// output:
// Coffee - Drinks
// Sugar - Food - $2.49

```

OOP after ES6

```JavaScript

class Item {
    constructor(name, category) {
        this.name = name
        this.category = category
    } 

    getDetails() {
        return `${this.name} - ${this.category}`
    }
}

class PurchasedItem extends Item {
    constructor(name, category, price) {
        super(name, category) 
        this.price = price
    }

    getDetailsWithPrice() {
        return `${this.name} - ${this.category} - $${this.price}`
    }
}

let item = new Item('Coffee', 'Food')
item.category = 'Drinks'

let purchasedItem = new PurchasedItem('Sugar', 'Food', '2.49')

document.getElementById('output').innerHTML = item.getDetails()
document.getElementById('output').innerHTML = purchasedItem.getDetailsWithPrice()

```

Call static function by:

```JavaScript

class Item {
    constructor(name, category) {
        this.name = name
        this.category = category
    } 

    static maxItems = 10

    static getHelperText() {
        return 'Add some items to your grocery list'
    }

    getDetails() {
        return `${this.name} - ${this.category}`
    }

}

document.getElementById('output').innerHTML = Item.getHelperText()

```

by inherit

```JavaScript
class PurchasedItem extends Item {
    constructor(name, category, price) {
        super(name, category) 
        this.price = price
    }

    getDetailsWithPrice() {
        return `${this.name} - ${this.category} - $${this.price}`
    }

    static getNumberOfItems() {
        return `3 / ${super.maxItems}`
    }
}

document.getElementById('output').innerHTML = PurchasedItem.getNumberOfItems()

```
