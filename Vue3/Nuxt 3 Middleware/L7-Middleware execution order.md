# Middleware execution order

All right. So far, we’ve covered three types of middleware. We’ve got inline, named, and global. Now, this is all great when it comes to the basic theory and what to do with each. But of course, the question that eventually arises is: “How do we determine what order things run in?” So that’s what we’re going to focus on in this lesson.

## Global vs Page Middleware

So to kick things off, let’s open up our username page and take a look at what’s going on in here. Based on how things are currently configured, let’s go ahead and add a specific console log message in each one to see what order they run in

```javaScript
export default defineNuxtRouteMiddleware((to, from) => {
  // Removed other code to make the example more succinct.
  console.log('--- Analytics Middleware ---')
})
📄 prof
```

```javaScript
export default defineNuxtRouteMiddleware((to, from) => {
  // Removed other code to make the example more succinct
  console.log('--- Profile Middleware ---')
})
```

When we run our app and visit the username page, we should see that analytics.global.js runs before profile.js.

If we think about this, this is expected behavior. After all, global middleware is something to be run on every single page, so it’s assumed that it takes priority as far as the order of operations. However, now that we know that global takes priority middleware over middleware defined on a page, what about named vs inline middleware?

## Named Middleware vs Inline Middleware

To test this out, we can use out logout page as a place to experiment. We’ll start by adding a console log to our inline middleware.

```javaScript
<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      // Removed other code to make the example more succinct.
      console.log('--- Inline Logout Middleware')
    }
  ]
})
</script>
```

Next, we’ll create a placeholder middleware called logout.js to establish a named middleware to compare to:

```javaScript
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('--- Named Logout Middleware ---')
})
```

Then we could invoke it inside of our array:

```javaScript
<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      // Removed other code to make the example more succinct.
      console.log('--- Inline Logout Middleware')
    },
    'logout'
  ]
})
</script>
```

When we test this out, we’ll see that the inline middleware runs before the named middleware. But wait! Before you jump to conclusions that inline middleware beats named middleware, what if we were to flip the order of the array?

```javaScript
<script setup>
definePageMeta({
  middleware: [
    'logout', 
    function (to, from) {
      // Removed other code to make the example more succinct.
      console.log('--- Inline Logout Middleware')
    }
  ]
})
</script>
```

Once we save and refresh, you’ll notice that it actually flips the order of operation! So, rather than comparing named and inline middleware in terms of priority, you should think of it as the order it is invoked inside of the middleware array.

## Ordering Global Middleware

Now that we’ve compared the three basic middleware, there is something that’s worth mentioning when it comes to ordering your middleware: what happens when you need global middleware to run in a specific order.

For this scenario, let’s consider that we have two global middleware:

├── middlware
│   ├── analytics.global.js
│   ├── setup.global.js
If we are to run a similar experiment as we have done in this lesson by adding console logs to each one to see which runs first, you would see that analytics.global.js runs before setup.global.js. While this might be fine in some scenarios, let’s assume that the setup.global.js middleware needs run before analytics.global.js.

Since global middleware are not defined inside an array that can be easily changed, the important thing to understand is that global middleware is run alphabetically by its filename. As a result, in order to run things in a specific order, a recommended strategy is prepending each global middleware with the correct alpha-number.

├── middlware
│   ├── 1.setup.global.js
│   ├── 2.analytics.global.js
Once you prepend them as such, the setup global middleware will run as desired before the analytics global middleware.

That said, something you may have noticed is that I used the term “alpha-number.” What I mean by this is that the “number” we’re prepending to filename is not truly a number. File systems sort the number alphabetically rather than numerically.

For example:

├── middlware
│   ├── 1.setup.global.js
│   ├── 2.analytics.global.js
│   ├── 10.new.global.js
At first glance, you would expect the new global middleware to run last cause it’s prepended with the number 10, but because it’s sorted alphabetically, this is the actual order it would be run in:

├── middlware
│   ├── 1.setup.global.js
│   ├── 10.new.global.js
│   ├── 2.analytics.global.js
As a result, depending on how many global middleware you plan on running, make sure to prepend your “alpha-numbers” with the appropriate number of zeroes so it’s sorted correctly. In the example we have, this is what a properly labelled global middleware would look like:

├── middlware
│   ├── 01.setup.global.js
│   ├── 02.analytics.global.js
│   ├── 10.new.global.js

## Middleware Chaining

When it comes to determining the order of execution when it comes to your middleware, the important thing to remember is that it’s happening basically a long chain. And so the moment it hits a return statement that says, “Hey, look, you should stop what you’re doing and navigate over,” it basically stops any remaining middleware from running.

In other words, you actually cannot guarantee that all of the middleware will run, because there is a logic flow. So if something cuts it off early on, there’s no reason for Nuxt to run any subsequent middleware. So this is basically called middleware chaining and something to consider when it comes to the order of operations of what you’re checking and how the middleware works together.

Let’s Revue
