# Error handling

We’ve learned how to leverage middleware in order to do things like redirect users and run custom code all before our page renders, but an important scenario to consider is what happens when something goes wrong inside of middleware. After all, as much as it’s great to code for the success path, we need to also account for what happens when things go wrong. And so, in this lesson we’re gonna talk about error handling inside of middleware.

## Setting up the context

So let’s take a look at this setup global middleware that we have. Let’s assume for this instance, that this is an async function because we’re gonna fetch something from the database or the server and then we’re going to utilize it in our middleware.

```javaScript
export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('--Setup Global Middleware--')
})
```

When fetching something async, it’s common to see a try catch block in case something goes wrong. Let’s take a sample scenario where we need to fetch from an /api path and navigate the user correctly if data is fetched as expected.

```javaScript
export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('--Setup Global Middleware--')
  try {
    const data = await fetch('/api/this-path')

    return navigateTo('/profile' + data.user.name)
  } catch (error) {
    // What do we do here?
  }
})

```

While we could simply log out the error to the console, we’d like to do something a bit more sophisticated right? Rather than simply throwing an error, we need to properly handle the navigation. Well, this is the time to introduce the second method that can be returned: abortNavigation.

## Introducing abortNavigation

At its core, abortNavigation is a method that will tell Nuxt to return a 404 page. In its simplest form, we could update the code to return as follows:

```javaScript
export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('--Setup Global Middleware--')
  try {
    const data = await fetch('/api/this-path')

    return navigateTo('/profile' + data.user.name)
  } catch (error) {
    return abortNavigation()
  }
})
```

Here’s what you would see when you encounter the error:

What’s great about abortNavigation is that it can also take a string as an argument. So if we pass it a string, it will render out the custom error message on the page:

```javaScript
export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('--Setup Global Middleware--')
  try {
    const data = await fetch('/api/this-path')

    return navigateTo('/profile' + data.user.name)
  } catch (error) {
    return abortNavigation('Failed at global middleware')
  }
})
```

And what’s great is that abortNavigation doesn’t only take a string, you can always just pass an error to it directly! This makes it a lot easier to provide user much more specific errors on what’s happening when something goes wrong.

```javaScript
export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('--Setup Global Middleware--')
  try {
    const data = await fetch('/api/this-path')

    return navigateTo('/profile' + data.user.name)
  } catch (error) {
    return abortNavigation(error)
  }
})
```

## One more error method: createError

While abortNavigation is a common way to manage errors within middleware, I want to introduce to another error method from Nuxt 3 called createError. Here’s what it looks like in a simplified form:

```javaScript
throw createError({ 
  statusCode: 405, 
  statusMessage: 'Oh snap it broke!' 
})
```

In other words, rather than throwing a generic error, you can throw an error that has common fields you’d typically want to show to a user:

- statusCode - The HTTP response status code that corresponds with the error users expect to see when they run into
- statusMessage - A string that you can customize to give users context on why they’re getting a specific status code

Here’s an example of what it looks like:

## Be careful of the infinite redirect

Finally, a common pitfall that happens when people manage redirects in middleware is the infinite redirect. For example, let’s say you have some sort of logic that accidentally has you redirecting you to the profile page, but then there’s middleware on the profile page which redirects you to the login page, and that login page then redirects back to the profile page… You see where I’m going right?

When this happens, Nuxt will typically throw an error and try to help you out, but it’s something for you to remember as you architect your middleware
