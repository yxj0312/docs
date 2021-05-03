# [Vue 3 Reactivity](https://www.vuemastery.com/courses/vue-3-reactivity/vue3-reactivity/)

## Lesson 1 Vue 3 Reactivity

Purpose:

- Learn Vue.js design patterns
- Improved debugging skills
- Using the Reactive library

### A Simple Vue App

```javaScript
    var vm = new Vue({
        el: '#app',
        data: {
            price: 5.00,
            quantity:2
        },
        computed: {
            totalPriceWithTax() {
                return this.price * this.quantity * 1.03
            }
        }
    })
```

```html
    <div>
        <div>Price: ${{ price }}</div>
        <div>Total: ${{ price * quantity}}</div>
        <div>Taxes: ${{ totalPriceWithTax }}</div>
    </div>
```

And somehow Vue’s Reactivity system just knows that if price changes, it should do three things:

- Update the price value on our webpage.
- Recalculate the expression that multiplies price * quantity, and update the page.
- Call the totalPriceWithTax function again and update the page.

#### how does Vue’s Reactivity system know what to update when the price changes, and how does it keep track of everything?

**This is not how JavaScript programming usually works**.

For example:

```javaScript
    let product = { price: 5, quantity: 2 }
    let total = product.price * product.quantity  // 10 right?
    product.price = 20
    console.log(`total is ${total}`)
```

Since we’re not using Vue, it’s going to print 10.

```
total is 10
```

In Vue we want total to get updated whenever price or quantity get updated. We want:

```
total is 40
```

Unfortunately, JavaScript is procedural, not reactive, so this doesn’t work in real life. In order to make total reactive, we have to use JavaScript to make things behave differently.

### Solution: Build a Reactivity engine from scratch

1. First off, we need some way to tell our application, “Store the code (effect) I’m about to run, I may need you to run it at another time.” Then we’ll want to run the code, and if price or quantity variables get updated, run the stored code again.

We might do this by recording the function (effect) so we can run it again.

```javaScript
let product = { price: 5, quantity: 2 }
let total = 0

let effect = function () { 
  total = product.price * product.quantity
})

track() // Remember this in case we want to run it later
effect() // Also go ahead and run it
...
trigger() // Run all the code I've saved
```

Notice that we store an anonymous function inside the effect variable, and then call a track function. Using the ES6 arrow syntax I could also write this as:

> BTW, the names used here are same in the vue2/3 Reactivity

```javaScript
let effect = () => { total = product.price * product.quantity }
```

In order to define track, we need a place to store our effects, we may have many of them. We’ll create a variable called dep, as in dependency. We call it dependency because typically with the Observer design pattern a dependency has subscribers (in our case effects) which will get notified when an object changes state. We might make dependency a class with an array of subscribers, like we did in the Vue 2 version of this tutorial. However, since all it needs to store is a set of effects, we can simply create a Set.

```javaScript
let dep = new Set() // Our object tracking a list of effects
```

Then our track function can simply add our effects to this collection:

```javaScript
function track () {
  dep.add(effect) // Store the current effect
}
```

We’re storing the effect (in our case the { total = price * quantity }) so we can run it later.

Let’s write a trigger function that runs all the things we’ve recorded.

```javaScript
function trigger() { 
  dep.forEach(effect => effect()) 
}
```

This goes through all the anonymous functions we have stored inside the dep Set and executes each of them. Then in our code, we can just:

```javaScript
product.price = 20
console.log(total) // => 10
trigger()
console.log(total) // => 40
```
