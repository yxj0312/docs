# Managing Getters

If you want to follow along with this lesson, you can checkout branch 06-Begin.

To start, we’re going to open up index.js to take a look at our Vuex store. We’re here to talk about migrating getters from Vuex, but we don’t have any at the moment, so let’s go ahead and create one.

## Getters in Vuex

In our Vuex store, let’s start by defining the getters section. And for our getter, let’s say we want to know how many events are available. The way we would accomplish this is with the following code:

```javaScript
createStore({
  state: {
    events: []
  },
  getters: {
    numberOfEvents(state) {
      return state.events.length
    }
  }
})
```

The main thing to note here is that you need to pass in the state in order to the developer to reference it properly.

Let’s go ahead and show this inside the page to show that everything works by adding the snippet.

```javaScript
<h1>{{ $store.getters.numberOfEvents }} Events for Good</h1>
```

Once we save, we can see that the variable is showing up as expected with “3 Events for Good.”

## Defining Getters in Pinia

Now that we’ve established this, let’s show you how things are a little different in Pinia.

## Standard Function Definition

Let’s use the example of wanting to derive a first name from the user in our UserStore.js.

Just like Vuex, we start by defining a getters property in our store, and then we’ll declare a function called firstName.

```javaScript
defineStore('UserStore', {
  state: () => ({
    user: 'Ben Hong'
  }),
  getters: {
    firstName() {}
  }
})

```

Unlike Vuex however, we will not be passing in the state to the function. The reason for this is because in Pinia, you have access to the entire store with the this keyword. This should feel familiar given this is how computed properties also work in the Options API!

So all we need to do to get the first name, is return our user data and split it up by a space and then return the first item which is the first name!

```javaScript
defineStore('UserStore', {
  state: () => ({
    user: 'Ben Hong'
  }),
  getters: {
    firstName() {
      return this.user.split(' ')[0]
    }
  }
})

```

And when we refresh our page and check the devtools, we’ll see here that our getters is showing up as expected!

## Arrow Function Definition

On the other hand, there are times when people want to use the arrow function. And when that’s the case, how is it different?

Let’s go over to our EventStore.js to re-implement the same numberOfEvents property we defined earlier in our Vuex store.

With the arrow function definition, the key thing to remember is that the this context is reset in every arrow function. So this is the time where you are automatically passed the state as the first argument, which means we can write our getters as concisely as:

```javaScript
defineStore('EventStore', {
  state: () => ({
    events: []
  }),
  getters: {
    numberOfEvents: state => state.events.length
  }
})

```

## Using Getters from Pinia

Now that we know how to configure getters in Pina, it’s time to use it in our app!

Inside of App.vue, let’s go ahead and switch out the user’s full name to only using the first name.

While Vuex would normally require you to specify getters with something like $store.getters.firstName, Pinia’s new mental model of having everything defined as a property of the store means that it’s as easy as switching out userStore.user for userStore.firstName.

And believe it or not. That’s it!
