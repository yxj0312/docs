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

// Walk through the codes
// 1. Our reactive function returns a proxy into our product object.
let product = reactive({ price: 5, quantity: 2 })
let total = 0

// 3. it will run track(product, 'price')
// 4. And inside the targetMap, it will create new mapping
// for product with the value of being a new depsMap
// and this will map the price property to a new dep,
// which is a set of effects,adding our total effect to the set.

// 5. Then we'll call product.quantity, which is another get request, we call the track(product, 'quantity')
//  This will access the dep map for our product, and map our quantity product, to a new dep set with our effect.
let effect = () => {
  total = product.price * product.quantity
}

// 2. When we here  try to get price
effect()

// 6. Then we'll print out our total to the console which is ten, 
console.log('before updated quantity total = ' + total)
// 7. Then we'll set quantity equal to 3. which we'll call trigger(product, 'quantity'), which then runs the stored effect.
product.quantity = 3
// 8. Then we run console.log(total) and it comes out to 15! 
console.log('after updated quantity total = ' + total)
```

Notice how we no longer need to call trigger and track because these are getting properly called inside our get and set methods. Running this code gives us:

before updated quantity total = 10

after updated quantity total = 15

Wow, we’ve come a long way! There’s only one bug to fix before this code is solid. Specifically, that we only want track to be called on a reactive object if it’s inside an effect. Right now track will be called whenever a reactive object property is get. We’ll polish this up in the next lesson.

## Lesson 3 activeEffect & ref

In this lesson we’ll continue to build out our reactivity code by fixing a small bug and then implementing reactive references, much like you might have seen in Vue 3. The bottom of our current code from the last lesson looks like this:

```javaScript
...
let product = reactive({ price: 5, quantity: 2 })
let total = 0

let effect = () => {
  total = product.price * product.quantity
}
effect()

console.log(total)

product.quantity = 3

console.log(total)
```

The problem arrives when we add code which GETs a property from our reactive object, like so:

```javaScript
console.log('Updated quantity to = ' + product.quantity)
```

The issue here is that track and all of it’s function will get called, even if we’re not inside an effect. We only want to look up and record the effect if get is called inside the active effect.

### Solution: activeEffect

To solve this problem, we’ll first create an activeEffect, a global variable we’ll store the currently running effect in. We’ll then set this inside a new function called effect.

```javaScript
let activeEffect = null // The active effect running
...
function effect(eff) {
  activeEffect = eff  // Set this as the activeEffect
  activeEffect()      // Run it
  activeEffect = null // Unset it
}

let product = reactive({ price: 5, quantity: 2 })
let total = 0

// 5
effect(() => {
  total = product.price * product.quantity
})

// We no longer need to call the effect. It's getting called we send our function in.
// 2.
effect(() => {
  salePrice = product.price * 0.9
})

console.log(
  `Before updated total (should be 10) = ${total} salePrice (should be 4.5) = ${salePrice}`
)

// 1. when we update the quantity, that's going to rerun the total at 2.
product.quantity = 3

// 3. Then it prints out the updated total, sale price is still the same.
console.log(
  `After updated total (should be 15) = ${total} salePrice (should be 4.5) = ${salePrice}`
)

// 4. When we set the price though, that should run both the above effects( 2 and 5)
product.price = 10

// 6. We see that total is now 30 and sale price is now 9
// Our code is working and now track is only gonna be run, when we have an active effect.
console.log(
  `After updated total (should be 30) = ${total} salePrice (should be 9) = ${salePrice}`
)
```

There’s one more change we need to make, and that’s inside the track function. It needs to use our new activeEffect.

```javaScript
function track(target, key) {
  if (activeEffect) { // <------ Check to see if we have an activeEffect
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map())) 
    }
    let dep = depsMap.get(key) 
    if (!dep) {
      depsMap.set(key, (dep = new Set())) // Create a new Set
    }
    dep.add(activeEffect) // <----- Add activeEffect to dependency map
  }
}
```

now if we run our code we properly get:

```javaScript
Before updated total (should be 10) = 10 salePrice (should be 4.5) = 4.5
After updated total (should be 15) = 15 salePrice (should be 4.5) = 4.5
After updated total (should be 30) = 30 salePrice (should be 9) = 9
```

If you want to walk through this code executing line by line, definitely check out the video.

### The Need for Ref

When I was coding up this challenge I realized that the way I was calculating total might make a little more sense if it used the salePrice rather than price, like so:

```javaScript
effect(() => {
  total = salePrice * product.quantity
})
```

If we were creating a real store, we’d probably calculate the total based on the salePrice. However, this code wouldn’t work reactively. Specifically, when product.price is updated, it will reactively recalculate the salePrice with this effect:

```javaScript
effect(() => {
  salePrice = product.price * 0.9
})
```

But since salePrice isn’t reactive, the effect with total won’t get recalculated. Our first effect above won’t get re-run. We need some way to make salePrice reactive, and it’d be nice if we didn’t have to wrap it in another reactive object. If you’re familiar with the Composition API, which I teach in the Vue 3 Essentials Course, you might be thinking that I should use ref to create a Reactive Reference. Let’s do this:

```javaScript
let product = reactive({ price: 5, quantity: 2 })
let salePrice = ref(0)
let total = 0
```

According to the Vue documentation, __a reactive reference takes an inner value and returns a reactive and mutable ref object. The ref object has a single property .value that points to the inner value. So we’d need to change around our effects a little to use .value.__

```javaScript
effect(() => {
  salePrice.value = product.price * 0.9
})

effect(() => {
  total = salePrice.value * product.quantity
})
```

Our code should work now, properly updating the total when salePrice is updated. However, we still need to define ref. There’s two ways we could do it.

1. Defining Ref with Reactive

   First, we could simply use reactive as we’ve defined it:

   ```javaScript
    function ref(intialValue) {
      return reactive({ value: initialValue })
      }
   ```

However, this isn’t how Vue 3 defines ref with primitives, so let’s implement it differently.

### Understanding JavaScript Object Accessors (aka. computed properties)

In order to understand how Vue 3 defines ref, we first need to make sure we are familiar with object accessors. These are sometimes also known as JavaScript computed properties (not to be confused with Vue computed properties). Below you can see a simple example which uses Object Accessors:

```javaScript
let user = {
  firstName: 'Gregg',
  lastName: 'Pollack',

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  },

  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ')
  },
}

console.log(`Name is ${user.fullName}`)
user.fullName = 'Adam Jahr'
console.log(`Name is ${user.fullName}`)
```

The get and set lines are object accessors to get fullName and set fullName accordingly. This is plain JavaScript, and is not a feature of Vue.

2. Defining Ref with Object Accessors

Using Object Accessors, along with our track and trigger actions, we can now define ref using:

```javaScript
function ref(raw) {
  const r = {
    get value() {
      track(r, 'value')
      return raw
    },
    set value(newVal) {
      raw = newVal
      trigger(r, 'value')
    },
  }
  return r
}
```

That’s all there is to it. Now when we run the following code:

```javaScript
...
function ref(raw) {
  const r = {
    get value() {
      track(r, 'value')
      return raw
    },
    set value(newVal) {
      raw = newVal
      trigger(r, 'value')
    },
  }
  return r
}

function effect(eff) {
  activeEffect = eff
  activeEffect()
  activeEffect = null
}

let product = reactive({ price: 5, quantity: 2 })
let salePrice = ref(0)
let total = 0

effect(() => {
  salePrice.value = product.price * 0.9
})

effect(() => {
  total = salePrice.value * product.quantity
})

console.log(
  `Before updated quantity total (should be 9) = ${total} salePrice (should be 4.5) = ${salePrice.value}`
)
product.quantity = 3
console.log(
  `After updated quantity total (should be 13.5) = ${total} salePrice (should be 4.5) = ${salePrice.value}`
)
product.price = 10
console.log(
  `After updated price total (should be 27) = ${total} salePrice (should be 9) = ${salePrice.value}`
)
```

We get what we would expect:

```javaScript
Before updated total (should be 10) = 10 salePrice (should be 4.5) = 4.5
After updated total (should be 13.5) = 13.5 salePrice (should be 4.5) = 4.5
After updated total (should be 27) = 27 salePrice (should be 9) = 9
```

Our salePrice is now reactive and total gets updated when it changes!
