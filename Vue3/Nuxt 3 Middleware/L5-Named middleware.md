# Named middleware

Now that we’ve learned about inline middleware, which is incredibly useful for defining middleware specifically for a specific route, it is time to learn about the second type of middleware which is known as name middleware.

## Quick review of the code challenge

```javaScript
<script>
definePageMeta({
  middleware: function (to, from) {
    const currentUser = useCookie('current-user')
    const isAuthenticated = useCookie('is-authenticated')
    if (!isAuthenticated.value) {
      return navigateTo('/login')
    } else if (to.params.username !== currentUser.value) {
      return navigateTo('/profile/' + currentUser.value)
    }
  })
}
</script>
```

In the solution, you’ll see that the inline middleware accomplishes the following things:

1. Checks to see if the user is authenticated
2. If not, redirect them to the /login page
3. If they are authenticated and going to a username that does not match the currentUser, we redirect them to the correct /profile page
4. And though it’s not explicitly defined, if they are logged in and the parameter matches the currentUser, the middleware simply stands aside and lets the app route as expected.

This is great! Because we’ve now properly protected the right routes while keeping the code that manages that logic straightforward and easy to maintain.

## But wait… what about the other pages?

This functionality that we defined is actually something that is pretty common. In fact, if you try to visit the /profile page, you’ll notice that it currently has no landing page and generates a 404 error as a result. However, given the conventions that users are used to, it’s no surprise that we probably expect that users might visit /profile as a shorthand to get to their profile page. And while we could theoretically define the same inline middleware for /pages/profile/index.vue just like we did for /pages/profile/[username].vue, this seems like an obvious case for reuse.

## Introducing named middleware

You know how I mentioned that inline middleware can be thought of as inline CSS? Well that analogy extends into how inline CSS can’t be reused across multiple elements or pages, and that is the same case for inline middleware. However, with named middleware, this no longer is the case.

Named middleware is quite literally as it is labelled. It is middleware that has been given a name that can be used on any page. 🙂 So, extending on that CSS styling analogy, they are the equivalent of a CSS class name that can be used on multiple pages (assuming they share they same stylesheet). In other words, it’s a way for you to create modular and reusable middleware across your app.

## Creating named middleware

To create your first named middleware, you’ll need to create a middleware directory at the root of your app. Inside of here, any JavaScript / TypeScript file will be referenced by its filename. So for our instance, we’ll create a middleware called profile by creating a file inside the middleware directory: /middleware/profile.js.

So what goes inside of here? Given what we’ve learned so far, you might just try to export a standard JavaScript function like we defined for inline middleware. However, one of the things that’s becoming more and more common with frontend frameworks is that we want to be a little bit more explicit than just declaring an anonymous function that really doesn’t tell you much as far as what you should expect. Regardless of whether you use TypeScript or not, this can make for difficult debugging over time.

So, rather than just define a normal JavaScript function, we’ll get a little assistance from Nuxt by utilizing their defineNuxtRouteMiddleware helper method to automatically add types to our function that will make things like autocomplete and other things much smoother for us.

```javaScript
export default defineNuxtRouteMiddleware()
```

Once we have the helper method, we can pass in the standard middleware function that we’ve been learning about in.

```javaScript
export default defineNuxtRouteMiddleware(to => {
  const currentUser = useCookie('current-user')
  const isAuthenticated = useCookie('is-authenticated')
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  } else if (to.params.username !== currentUser.value) {
    return navigateTo('/profile/' + currentUser.value)
  }
})
```

And that’s all it takes to define a named middleware!

## How to call named middleware

Now that we have this our profile.js middleware defined, you’re probably wondering, “Okay, so how do we invoke it?”

Up to this point, we’ve been passing a JavaScript function to our middleware key when calling the definePageMeta composable in a page. Now that we’re using named middleware, it’s time for us to learn about the other value that we can pass which is an array.

```javaScript
<script>
definePageMeta({
  middleware: []
}
</script>
```

In this array, you can pass either strings or functions. As you might have guessed, the strings correspond to whatever named middleware that you expect to invoke inside of the page. So in our instance of wanting to invoke the profile.js middleware, all we have to do is add the profile string to our middleware array.

```javaScript
<script>
definePageMeta({
  middleware: ['profile']
}
</script>
```

And just like that, any page that we want to use the profile middleware can be added while maintaining the code in a single place. Feels great when we follow the DRY principle doesn’t it?
