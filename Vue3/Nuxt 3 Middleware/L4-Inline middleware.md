# Inline middleware

Now the first type of middleware that we’ll be working with is known as inline middleware. One way to think of it is sort of like inline CSS styles where it is added directly on an HTML element, inline middleware is added directly on a page. In other words, this is this custom middleware to a specific page that we’re using inside of Nuxt.

For our first scenario, let’s go ahead and take a look at what’s going on with the login page.

## A common problem with login pages

If I go ahead and log in right now with the credentials bencodezen and the password, you’ll see that it correctly navigates me currently to the profile page for bencodezen. with the correct URL of /profile/bencodezen.

But if we jump back to the homepage, we’ll notice though if we go back to /login you’ll notice that it’s actually asking us to log in again. This doesn’t make a lot of sense because the user is already logged in, so why would we allow the user to see the login page?

## Building our first inline middleware

In order to define our first inline middleware, what we’re gonna leverage is the definePageMeta composable. This is a global available function that Nuxt 3 provides us that allows us to configure various things about the page. Inside of the function, we have access to the middleware key which allows us to declare our inline middleware.

```javaScript
<script setup>
definePageMeta({
  middleware
})
</scrpt>
```

You can learn more about definePageMeta in the official docs.

Now remember, what is middleware? It’s a JavaScript function, so we can basically declare a function here that takes a to and from parameter. To keep things simple, let’s start by actually logging out the to and from parameters.

```javaScript

<script setup>
definePageMeta({
  middleware: function (to, from) {
    console.log('to', to)
    console.log('from', from)
  }
})
</scrpt>
```

## Getting the cookies

Now, for the next step, we want to check if we actually have the cookies to indicate that the user is already authenticated. If we do, we will want to go ahead and move the user to the correct page. So how might we do this?

To accomplish this, we’ll leverage the useCookie composable that’s available to us from Nuxt 3 to easily track the value of a cookie in the browser. Once we have declared our cookie variables, we can write some custom logic to achieve the desired effect.

```javaScript
<script setup>
definePageMeta({
  middleware: function (to, from) {
    const isAuthenticated = useCookie('is-authenticated')
    const currentUser = useCookie('current-user')

    if (isAuthenticated.value && currentUser.value) {
      return navigateTo('/profile/' + currentUser.value)
    }
  }
})
</script>
```

## Coding Challenge

Now that you’ve seen me implement inline middleware a couple of times, it’s time for you to embark on your own code challenge. At this time, the app allows you to visit any “user” profile by appending any string to /user/RANDOM_USER_NAME. As you probably would expect, this could be problematic if users are only supposed to see their profile.

So, in this challenge, I’d like you to:

Create an inline middleware in the [username].vue page
Check the route params to see if the route params matches the cookie username
If yes, let the navigation resume as expected
Otherwise, navigate them to the correct page using the cookie value
If you haven’t been coding along, don’t worry. You can check out the branch 01-challenge in order to pick right up right here so that you can go ahead and code along. And then once you’re done, you can go ahead and check out the branch 01-end which will include the solution to the challenge.
