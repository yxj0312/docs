# Changing State with Actions

## The Model of Mutations and Actions in Vuex

One of the big things about Vuex is that it followed a model where you had two parts: actions and mutations. For better or worse, this model meant that you often had to define two things in order to update the state. You first needed a mutation to define how state was changed, and then you needed to commit that mutation with an action.

```javaScript
import { createStore } from 'vuex'

export default createStore({
  state: {
    events: []
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    fetchEvents({ commit }) {
      return EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          throw error
        })
    }
  }
})
```

While this presented a clean separation of concerns, this created a problem where developers often found themselves writing a lot of boilerplate and repetitive code. As a result, developers were naturally unhappy and frustrated with this given it generated a lot of friction when it came to maintenance.

Of course, the question for iterating on Vuex was, “Can we make this easier for developers?” And Pinia was a clear answer to the fact that, yes we can. Rather than explain the concept, I’ll go ahead and migrate an action from Vuex to show you the difference.

## Migrating a Vuex Action to Pinia

Let’s start by migrating fetchEvents from Vuex. This is the first function that kicks everything off by grabbing and loading the data into our app.

```javaScript
import { createStore } from 'vuex'

export default createStore({
  // Other configurations ommitted for consciseness
  actions: {
    fetchEvents({ commit }) {
      return EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          throw error
        })
    }
  }
})
```

And so what we’ll notice here when you’re inside of Vuex is that there’s a commit function that we are calling. And this commit is what calls a specific mutation in this account: SET_EVENTS. And then we pass in the response.data to the mutation which is defined way up here. And at the end of it, all it does is set state.events to the events that was passed in.

So let’s go and see what that looks like inside of Pinia. So I’m going to just start by copying this over into our event store. And so defining an action inside of Pinia is just like Vuex in that we just have the actions property, and then we define whatever it is. So then I’m just going to paste this in here.

```javaScript
import { defineStore } from 'pinia'
import EventService from '../services/EventService.js'

export const useEventStore = defineStore('EventStore', {
  // Code omitted for conciseness
  state: () => ({
    events: []
  }),
  actions: {
    fetchEvents({ commit }) {
      return EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          throw error
        })
    }
  }
})
```

Now, here’s the big aha moment of Pinia. You know what makes Pinia great? There are no more mutations!

Because there are no more mutations, this means we can get rid of the commit function. And rather than committing, because the function gets access to the this keyword which contains the entire store, we can update our state directly just like we did with getters.

```javaScript
import { defineStore } from 'pinia'
import EventService from '../services/EventService.js'

export const useEventStore = defineStore('EventStore', {
  // Code omitted for conciseness
  state: () => ({
    events: []
  }),
  actions: {
    fetchEvents() {
      return EventService.getEvents()
        .then(response => {
        // This one line takes care of the mutation
        // with no additional configuration!
          this.events = response.data
        })
        .catch(error => {
          throw error
        })
    }
  }
})
```

So in our case, all we need to do it set this.events to equal response.data.

Once we save, we won’t notice any changes in our app yet, but that’s because we haven’t changed it in the component yet, so let’s do that next.

## Dispatching Actions with Pinia

Inside of EventList.vue, we’ll see that in Vuex, any time you wanted to call an action, you had to invoke the dispatch function to do so. However, in Pinia, because every property is something that can be called directly on the store, we don’t need a special keyword. In other words, we can call our actions directly on the store.

To illustrate this, let’s start by import our useEventStore function from EventStore.js. And then we’ll instantiate it inside of a setup lifecycle hook just like we did in App.vue.

```javaScript
import { useEventStore } from '../stores/EventStore'

export default {
  // Other code omitted for conciseness
  setup() {
    const eventStore = useEventStore()

    return {
      eventStore
    }
  }
}
```

Once we do that, we can swap out the Vuex $store for our new Pinia store eventStore and then call fetchEvents directly rather than dispatching it.

```javaScript
import EventCard from '../components/EventCard.vue'
import { useEventStore } from '../stores/EventStore'

export default {
  // Other code omitted for conciseness
  setup() {
    const eventStore = useEventStore()

    return {
      eventStore
    }
  },
  created() {
    this.eventStore.fetchEvents().catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      })
    })
  },
}
```

And so if we save now, We’ll notice that when we refresh. There you go, everything is not working. Why is that? Well, the reason for this is because we’re actually referring to the events inside of Vuex still.

So let’s go ahead and make that change as well by removing the computed property and referring to the state directly in the template just like you see below:

```javaScript
<template>
  <h1>{{ eventStore.numberOfEvents }} Events for Good</h1>
  <div class="events">
    <EventCard
      v-for="event in eventStore.events"
      :key="event.id"
      :event="event"
    />
  </div>
</template>
```
