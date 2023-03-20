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