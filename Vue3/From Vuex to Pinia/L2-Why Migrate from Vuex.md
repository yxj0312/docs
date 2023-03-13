# Why Migrate from Vuex?

One of the first questions you’re probably thinking is why would I want to migrate from ? And that’d be a great question. After all the amount of effort it takes to migrate from one library to another, it’s not trivial.

And while I completely understand the desire to use the latest and greatest, when it comes to big production, apps, migration often takes a lot of time and energy. So you want to make sure that it’s worth it in the end.

With that let’s go in and talk about some of the benefits you’ll get when migrating from Vuex to Pinia.

## Benefits of Pinia

### Simpler API

One of the biggest criticisms of Vuex is the complexity and repetitiveness behind that action / mutation pattern. If you followed the standard practice, every state change required a lot of boilerplate.

Here we have a Vuex store that’s tracking the state of a counter app where we have:

- the current count being tracked inside of the state
- actions that will go ahead and commit a mutation in order to increment the count
- and then we had the mutation itself, which actually increment the count

```javaScript
import { createStore } from 'vuex'

const CounterStore = createStore({
  state() {
    return {
      count: 0
    }
  },
  actions: {
    increment(context) {
      context.commit('incrementCount')
    }
  },
  mutations: {
    incrementCount(state) {
      state.count++
    }
  }
})
```

And what we’ll notice here is that the action and the mutation are actually quite similar. And so, especially when the Vuex store gets more complicated and larger, this led to a lot of repetitiveness and boilerplate when it came to writing these things. And so this was one of the frustrations that people had.

What might this look like in Pinia?

We’re going to go ahead and do some pseudo-code here just to show how this API could be simplified. One of the things that occurred to the team is the idea that what if we didn’t have mutations at all?

```javaScript
// The following is pseudocode

import { createStore } from 'pinia'

const CounterStore = createStore({
  state() {
    return {
      count: 0
    }
  },
  actions: {
    increment() {
      state.count++
    }
  }
})
```

So instead of having to commit your mutation, what if you could just do that directly inside of your action.

And then as a result, you can get rid of mutations entirely and you don’t even need to track the context. What if it could be this simple?

And then if you want to call the action inside of your component, what if it could be called just like a normal JavaScript function?

```javaScript
// Calling an action with Vuex
store.$dispatch('increment')

// Calling an action with Pinia
store.increment()
```

## Solid TypeScript Support

Another common complaint about Vuex is that it’s not as TypeScript friendly. And Pinia and aims to solve that by providing first-class TypeScript support.

And if you’re thinking, wait, I don’t use TypeScript. How do I benefit from this?

The truth is, is that when libraries have TypeScript support, it makes it a lot easier for code tooling to do things like auto-suggestion And auto-completion rather than having to deal with things such as like strings, as we see here in the code example, where when you commit something, you have to actually go ahead and write the correct name.

```javaScript
import { createStore } from 'vuex'

const store = createStore({
  actions: {
    increment(context) {
      context.commit('incrementCount')
    }
  }
})
```

After all, a mutation is defined via a string which is prone to user error.

## One more thing…

While all these benefits are great, a contextual question that you should ask yourself before seriously considering migrating is:

“Is your app being actively developed?”

If your app is primarily in maintenance mode with little feature development, the benefits you would get from using Pinia over Vuex are unlikely to justify the amount of work it would take to migrate.
