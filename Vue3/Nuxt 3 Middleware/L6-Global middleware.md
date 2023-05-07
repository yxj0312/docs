# Global middleware

Now that we’ve learned about inline and named middleware, it’s time to learn about the last and final type of middleware, which is known as global middleware.

## What is global middleware?

As you might suspect, global middleware is middleware that runs on any route regardless of whatever page is being loaded.

While we typically avoid global code for performance reasons, there are some common scenarios where global middleware makes sense. Examples include tracking some cookies that you want to send to an analytics database, or maybe you want to leverage some data transformation. It really does depend on each application and your use case.

My one note of caution to you though is that since this is something that will run everywhere, be cautious of how much code is being run since there will be performance implication. Make sure that the trade-offs you are making will be worth it in the end.

## Why do we need global middleware?

Let’s assume that the scenario where we need to run a middleware that collects analytics. Using what we know so far, your first instinct is probably to create a named middleware called analytics.js.

For the sake of simplicity, let’s assume that all the analytics will do is log out where the user is coming from and where they’re going to.

Here’s an example of what that might like look:

```javaScript
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('from:', from)
  console.log('to:', to)
})
```

Now that we want it to run on every route, we could implement this inside of every page via the definePageMeta property. For example:

```javaScript
<script setup>
definePageMeta({
  middleware: ['analytics']
})
</script>
```

Great. This will work as expected. However, we want to actually do this at a global scale. And so of course it wouldn’t really make sense to then define this on every single page since that would be difficult to maintain and scale.

## How do we create global middleware?

Believe it or not. All it takes to make middleware global is by adding a suffix to a named middleware. So if we take the named middleware: analytics.js, we append the global suffix right in between the file extension (i.e., .js) and then name of the middleware (i.e., analytics).

The result: analytics.global.js

Once you update the name of the file and restart the dev server, Nuxt will know to run this middleware on all routes. As the final step, we can delete any references to this middleware inside of our codebase.

As you navigate through your app, you should know see your logs inside of your browser console.

And just like that, you now have global middleware running an app!
