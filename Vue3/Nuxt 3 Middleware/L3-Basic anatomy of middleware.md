# Basic anatomy of middleware

## What is middleware

At its core, it’s a normal JavaScript function.

## What makes it different

What makes it unique is that it always receives arguments: to and from

```javaScript
function (to, from) {
  // The route users are going to
  console.log(to)

  // The route users are coming from
  console.log(from)
}
```

## What can you return from it

There are three primary actions you can take with route middleware.

1. navigateTo() - Redirects to the specific route.

- The replace option in the navigateTo helper for Nuxt 3 determines the behavior of the browser’s history when navigating to a new route. By default, this is false so that all navigation changes are pushed onto the browser history. If set to true, it will replace the current history and thus the ability to go back to the previous route.
- The redirectCode is a way for you to specify what kind of redirect is happening if necessary.
- The external property is required when you want users to go to an entirely separate website. By default it is false to provide better security for your application.

```javaScript
function (to, from) {
  if (to.path === '/admin' && user.admin === false) {
      return navigateTo('www.vuemastery.com', {
          replace: true,
          redirectCode: 302,
          external: true
      })
  }
}
```

abortNavigation() - Stops navigation and gives you the option to throw an error message as well. We’ll cover this more in another lesson on error handling in middleware.

```javaScript
function (to, from) {
  if (to.path === '/admin' && user.admin === false) {
      return abortNavigation()
  }
}

```

Do nothing. You don’t have to do any of this if it’s not needed
