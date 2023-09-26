# Automatic Login

Once a user is logged into our app, we want the ability to keep them logged in, even if they refresh the browser or close the tab our app is running in. In this lesson, we’ll learn how to accomplish this through a process of automatic login.

## The user State disappears

Currently if we refresh the browser when a user is logged in, we can see in the Vuex tab of the Vue DevTools that our user State disappears. This also happens if we were to close the app and reopen it in a new tab. But we don’t necessarily want to force our user to log back in every time one of these things happen. Instead, we can utilize the user data we already have in the browser’s local storage to restore this Vuex state, which effectively logs the user back in automatically.

To handle this, we’ll head into our main.js file and add some code that will run every time the app is created.

## Implementing Automatic Login

When our app is created, we want to check if there is a user in our local storage, and if so, we can restore the Vuex user State with that user data. If you recall from earlier in this course, when a user logs in we set our user data by using the Vuex Mutation by the same name: SET_USER_DATA. We can make use of that Mutation to restore our user State with the user data we have in our local storage, when the app is created.

Let’s make that happen within our main.js file now.

src/main.js

```js
new Vue({
      router,
      store,
      created () {
        const userString = localStorage.getItem('user') // grab user data from local storage
        if (userString) { // check to see if there is indeed a user
          const userData = JSON.parse(userString) // parse user data into JSON
          this.$store.commit('SET_USER_DATA', userData) // restore user data with Vuex
        }
      },
      render: h => h(App)
    }).$mount('#app')
```

As you can see in the created hook, we’re checking to see if user data exists in our local storage, and if it does we’re parsing that data into JSON and passing it in as the payload when we commit the SET_USER_DATA mutation, which effectively logs our user back in.

Great. Now our user won’t have to log in every time the browser is refreshed. They could even close their entire browser, go to bed, and navigate to our app the next day and find themselves “still” logged in. I say “still” because technically they were logged out, but we forced that re-login process when they pulled up the app.

## Adding a Security Measure
