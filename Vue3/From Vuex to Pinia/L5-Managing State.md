# Managing State

Inside of our Vuex store, we can see here that we’re managing the state for events and user here. Let’s start by migrating this state over to Pinia.

## Defining State in a Pinia Store

We’ll start by moving any related event state, so we’ll go ahead and open up our EventStore.js file which contains our modular store from Pinia. Once we’re in the file, it’s time to focus on that empty object we defined in the last lesson, which will contain the store configuration.

Similar to Vuex, we configure the state of our store by using the state keyword. The main difference though, is that you’ll see I’m using a function to return an object which contains the state.

```javaScript
import { defineStore } from 'pinia'

export const useEventStore = defineStore('EventStore', {
  state() {
    return {
      // Define state in here
    }
  }
})
```

While it might seem odd at first, this is actually similar to how we define the data property on components when managing state locally!

```javaScript
export default {
  name: 'EventList',
  data() {
    return {
      // Define local state in here
    }
  }
}
```

Once we’ve set that up, we can go ahead and define events as an empty array, and event as an empty object just like it currently is in our global Vuex store.

```javaScript
import { defineStore } from 'pinia'

export const useEventStore = defineStore('EventStore', {
  state() {
    return {
      events: [],
      event: {}
    }
  }
})
```

Next, let’s go ahead and migrate the user data over to the UserStore.js .

Just like before, we’ll go ahead and define a state property on our store configuration object that is a function which returns an object that contains what we want to track. In this case, we’ll be tracking the the user’s name. So since I’m currently typing, the value is “Ben Hong.”

```javaScript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
  state() {
    return {
      user: 'Ben Hong'
    }
  }
})
```

In case you’re thinking this way of defining things is a bit verbose, there’s a shorthand you can use where you use an arrow function to directly return an object like this!

```javaScript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: 'Ben Hong'
  })
})
```

It’s up to you as to which you prefer, so feel free to use whichever one you like better.
