# User Logout

Now that we understand how to log users into our app, we can start thinking about what it takes to successfully log a user out of our app. As you might expect, logging a user out will essentially require us to reverse the steps we took when we logged a user in. This means we’ll need to remove the user data from our Vuex State, remove the user data from our local storage, and take the JWT token out of our axios Authorization header. Let’s get started adding all of this functionality.

## Creating a Logout Button

## Adding to the Store

## Checking the browser

## Blocking private routes

In order to block access to a private route via Vue Router, we can use a navigation guard, which we learned about in our Next-Level Vue course. Our first step will be to make use of the meta tag, which can be used to add protections to a given route. So let’s make it so that the dashboard route requiresAuth.

src/router.js

```js
 {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    }
```

Now we can start building out our beforeEach method, which receives three arguments: to : the route being navigated to from: the current route being navigated away from next the function called to resolve the hook

src/router.js

```js
  router.beforeEach((to, from, next) => {
            // now what?
    })
```

What do we need to happen inside this guard? First, we’ll need to know a couple things:

1.Do we have a user logged in?
2.Does the route being navigated to requireAuth?
So let’s handle step one. We can find that out by simply checking our local storage, like so:

src/router.js

```js
   router.beforeEach((to, from, next) => {
      const loggedIn = localStorage.getItem('user')
    })
```

Now we can check if the route being navigated to requiresAuth:

 src/router.js

 ```js
   router.beforeEach((to, from, next) => {
      const loggedIn = localStorage.getItem('user')
    
            if (to.matched.some(record => record.meta.requiresAuth)) {
                    // now what?
            }
    })
```

Here we are saying if the route being navigated to matches one of our routes (record) where the meta tag includes requiresAuth = true, then we’ll do something. What do we want to do now? We need to see if we have a user loggedIn. If not, then we will redirect to the home route and return the function.

 src/router.js

  ```js
   router.beforeEach((to, from, next) => {
      const loggedIn = localStorage.getItem('user')
    
            if (to.matched.some(record => record.meta.requiresAuth)) {
                    if (!loggedIn) {
          next('/')
              return
        }
                next()
              }
    })
```

Otherwise, the function continues to run and we’ll hit the second next() and fulfill that route request. And we need to add a third next() outside of the initial if statement so that we can fulfill the route request if the route is simply public.

```js
   router.beforeEach((to, from, next) => {
      const loggedIn = localStorage.getItem('user')
    
            if (to.matched.some(record => record.meta.requiresAuth)) {
                    if (!loggedIn) {
          next('/')
              return
        }
                next()
              }
              next()
    })
```

If you’re looking at this code and wondering, “Can’t this be done with less code?” You’re right! This is how we could simplify it further:

src/router.js

```js
   router.beforeEach((to, from, next) => {
      const loggedIn = localStorage.getItem('user')
    
            if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
          next('/')
              return
        }
                next()
    })
```
Great. Now every time we navigate to a new route ( beforeEach ), we are checking if that route requires authentication and if we have a user logged in. If it does require authentication and we don’t have a user, we’ll redirect to our home route. Otherwise, we can fulfill that route request. We’re almost done, there’s just one little feature we need to add.
## Hiding the Dashboard Link
