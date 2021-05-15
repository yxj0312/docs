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
  dep.forEach(effect => effect()) // Re-run all the code in storage
}
```

This goes through all the anonymous functions we have stored inside the dep Set and executes each of them. Then in our code, we can just:

```javaScript
product.price = 20
console.log(total) // => 10
trigger()
console.log(total) // => 40
```

### Problem: Multiple Properties

We could go on tracking effects as needed, but our reactive objects are going to have different properties, and those properties each need their own dep (which is a set of effects). Take a look at our object here:

```javaScript
let product = { price: 5, quantity: 2 }
```

Our price property needs it’s own dep (set of effects) and our quantity needs it’s own dep (set of effects). Let’s build out our solution to properly record these.

> dep: A dependency which is a set of effects that should get re-run when values change

### Solution: depsMap

When we call track or trigger we now need to know which property in our object we’re targeting (price or quantity). To do this we’ll create a depsMap, which is of type Map (think keys and values).

depsMap: A map where we store the dependency object for each property

Notice how the depsMap has a key which will be the property name we want to add (or track) a new effect on. So we’ll need to send in this key to the track function.

```javaScript
const depsMap = new Map()
function track(key) {
  // Make sure this effect is being tracked.
  let dep = depsMap.get(key) // Get the current dep (effects) that need to be run when this key (property) is set
  if (!dep) {
    // There is no dep (effects) on this key yet
    depsMap.set(key, (dep = new Set())) // Create a new Set
  }
  dep.add(effect) // Add effect to dep
}
  }
function trigger(key) {
  let dep = depsMap.get(key) // Get the dep (effects) associated with this key
  if (dep) { // If they exist
    dep.forEach(effect => {
      // run them all
      effect()
    })
  }
}

let product = { price: 5, quantity: 2 }
let total = 0

let effect = () => {
  total = product.price * product.quantity
}

track('quantity')
effect()
console.log(total) // --> 10

product.quantity = 3
trigger('quantity')
console.log(total) // --> 40
```

### Problem: Multiple Reactive Objects

This works great, until we have multiple reactive objects (more than just product) which need to track effects. Now we need a way of storing a depsMap for each object (ex. product). We need another Map, one for each object, but what would be the key? If we use a WeakMap we can actually use the objects themselves as the key. WeakMap is a JavaScript Map that uses only objects as the key. For example:

```javaScript
let product = { price: 5, quantity: 2 }
const targetMap = new WeakMap()
targetMap.set(product, "example code to test")
console.log(targetMap.get(product)) // ---> "example code to test"
```

Obviously this isn’t the code we’re going to use, but I wanted to show you how our targetMap uses our product object as the key. We call our WeakMap targetMap because we’ll consider target the object we’re targeting. There’s another reason it’s called target which will become more obvious in the next lesson.

When we call track or trigger we now need to know which object we’re targeting. So, we’ll send in both the target and the key when we call it.

```javaScript
const targetMap = new WeakMap() // targetMap stores the effects that each object should re-run when it's updated

function track(target, key) {
  // We need to make sure this effect is being tracked.
  let depsMap = targetMap.get(target) // Get the current depsMap for this target

  if (!depsMap) {
    // There is no map.
    targetMap.set(target, (depsMap = new Map())) // Create one
  }

  let dep = depsMap.get(key) // Get the current dependencies (effects) that need to be run when this is set
  if (!dep) {
    // There is no dependencies (effects)
    depsMap.set(key, (dep = new Set())) // Create a new Set
  }

  dep.add(effect) // Add effect to dependency map
}

function trigger(target, key) {
  const depsMap = targetMap.get(target) // Does this object have any properties that have dependencies (effects)
  if (!depsMap) {
    return
  }

  let dep = depsMap.get(key) // If there are dependencies (effects) associated with this
  if (dep) {
    dep.forEach(effect => {
      // run them all
      effect()
    })
  }
}

let product = { price: 5, quantity: 2 }
let total = 0
let effect = () => {
  total = product.price * product.quantity
}

track(product, 'quantity')
effect()
console.log(total) // --> 10

product.quantity = 3
trigger(product, 'quantity')
console.log(total) // --> 15
```

## Lesson 2 Proxy and Reflect

> In our last lesson we learned how Vue 3 keeps track of effects to re-run them when needed. However, we’re still having to manually call track and trigger. In this lesson we’ll learn how to use Reflect and Proxy to call them automatically.

### How to intercept Get and Set

- In Vue 2
  We used ES5 Object.defineProperty()

- In Vue 3
  We will use ES6 Reflect and Proxy

### Solution: Hooking onto Get and Set

#### Understanding ES6 Reflect

```javaScript
let product = { price: 5, quantity: 2}
```

There are three ways to print out a property on an object

```javaScript
// Dot notation
console.log('quantity is ' + product.quantity)

// Bracket notation
console.log('quantity is ' + product['quantity'])

// Reflect
console.log('quantity is ' + Reflect.get(product, 'quantity'))
```

### Understanding ES6 Proxy

A Proxy is a placeholder for another object, which by default delegates to the object. So if I run the following code:

```javaScript
let product = { price: 5, quantity: 2 }
let proxiedProduct = new Proxy(product, {})
console.log(proxiedProduct.quantity)
```

The proxiedProduct delegates to the product which returns 2 as the quantity. Notice the second argument on Proxy with {}? This is called a handler and can be used to define custom behavior on the proxy object, like intercepting get and set calls. These interceptor methods are called **traps** and here’s how we would set a get trap on our handler:

```javaScript
let product = { price: 5, quantity: 2 }

let proxiedProduct = new Proxy(product, {
  get() {
    console.log('Get was called')
    return 'Not the value'
  }
})

console.log(proxiedProduct.quantity)
```

A trap allows us to intercept fundamental operations (property lookup, Enumeration, Function invocation)

In the console I’d see:

Get was called

Not the value

We’ve re-written what get returns when the property value is accessed. We should probably return the actual value, which we can do like:

```javaScript
let product = { price: 5, quantity: 2 }

let proxiedProduct = new Proxy(product, {
  get(target, key) {  // <--- The target (our object) and key (the property name)
    console.log('Get was called with key = ' + key)
    return target[key]
  }
})

console.log(proxiedProduct.quantity)
```

Notice that the get function has two parameters, both the target which is our object (product) and the key we are trying to get, which in this case is quantity. Now we see:

Get was called with key = quantity

2

This is also where we can use Reflect and add an additional argument to it.

```javaScript
let product = { price: 5, quantity: 2 }
let proxiedProduct = new Proxy(product, {
  get(target, key, receiver) {  // <--- notice the receiver
    console.log('Get was called with key = ' + key)
    return Reflect.get(target, key, receiver) // <----
  }
})
```

Notice our get has an additional parameter called receiver which we’re sending as an argument into Reflect.get. This __ensures that the proper value of this is used when our object has inherited values / functions from another object.__ This is why we always use Reflect inside of a Proxy, so we can keep the original behavior we are customizing.

Now let’s add a setter method, there shouldn’t be any big surprises here:

```javaScript
let product = { price: 5, quantity: 2 }

let proxiedProduct = new Proxy(product, {
  get(target, key, receiver) {  
    console.log('Get was called with key = ' + key)
    return Reflect.get(target, key, receiver) 
  }
  set(target, key, value, receiver) {
    console.log('Set was called with key = ' + key + ' and value = ' + value)
    return Reflect.set(target, key, value, receiver)
  }
})

proxiedProduct.quantity = 4
console.log(proxiedProduct.quantity)
```

Notice that set looks very similar to get except that it’s using Reflect.set which receives the value to set the target (product). Our output as expected is:

Set was called with key = quantity and value = 4

Get was called with key = quantity

4

There’s another way we can encapsulate this code, which is what you see in the Vue 3 source code. First, we’ll wrap this proxying code in a reactive function which returns the proxy, which should look familiar if you’ve played with the Vue 3 Composition API. Then we’ll declare our handler with it’s traps separately and send them into our proxy.

```javaScript
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log('Get was called with key = ' + key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      console.log('Set was called with key = ' + key + ' and value = ' + value)
      return Reflect.set(target, key, value, receiver)
    }
  }
  return new Proxy(target, handler)
}

let product = reactive({ price: 5, quantity: 2 }) // <-- Returns a proxy object
product.quantity = 4
console.log(product.quantity)
```

This would return the same as above, but now we can easily create multiple reactive objects.

### Combining Proxy + Effect Storage

If we take the code we have for creating reactive objects, and remember:

GET property => We need to track the current effect

SET property => We need to trigger any tracked dependencies (effects) for this property

We can start to imagine where we need to call track and trigger with the code above:

```javaScript
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver)
        // Track
      return result
    },
    set(target, key, value, receiver) {
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (result && oldValue != value) { // Only if the value changes 
        // Trigger
      } 
      return result
    }
  }
  return new Proxy(target, handler)
}
```

Now let’s put the two pieces of code together:

```javaScript
const targetMap = new WeakMap() // targetMap stores the effects that each object should re-run when it's updated
function track(target, key) {
  // We need to make sure this effect is being tracked.
  let depsMap = targetMap.get(target) // Get the current depsMap for this target
  if (!depsMap) {
    // There is no map.
    targetMap.set(target, (depsMap = new Map())) // Create one
  }
  let dep = depsMap.get(key) // Get the current dependencies (effects) that need to be run when this is set
  if (!dep) {
    // There is no dependencies (effects)
    depsMap.set(key, (dep = new Set())) // Create a new Set
  }
  dep.add(effect) // Add effect to dependency map
}
function trigger(target, key) {
  const depsMap = targetMap.get(target) // Does this object have any properties that have dependencies (effects)
  if (!depsMap) {
    return
  }
  let dep = depsMap.get(key) // If there are dependencies (effects) associated with this
  if (dep) {
    dep.forEach(effect => {
      // run them all
      effect()
    })
  }
}

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver)
      track(target, key) // If this reactive property (target) is GET inside then track the effect to rerun on SET
      return result
    },
    set(target, key, value, receiver) {
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (result && oldValue != value) {
        trigger(target, key) // If this reactive property (target) has effects to rerun on SET, trigger them.
      }
      return result
    }
  }
  return new Proxy(target, handler)
}

let product = reactive({ price: 5, quantity: 2 })
let total = 0

let effect = () => {
  total = product.price * product.quantity
}
effect()

console.log('before updated quantity total = ' + total)
product.quantity = 3
console.log('after updated quantity total = ' + total)
```
Notice how we no longer need to call trigger and track because these are getting properly called inside our get and set methods. Running this code gives us:

before updated quantity total = 10

after updated quantity total = 15

Wow, we’ve come a long way! There’s only one bug to fix before this code is solid. Specifically, that we only want track to be called on a reactive object if it’s inside an effect. Right now track will be called whenever a reactive object property is get. We’ll polish this up in the next lesson.