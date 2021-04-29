# [Vue 3 Reactivity](https://www.vuemastery.com/courses/vue-3-reactivity/vue3-reactivity/)

## Vue 3 Reactivity

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