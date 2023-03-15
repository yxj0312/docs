# Defining a Store

When we look inside of Pinia in our Vue DevTools, you’ll probably notice that it’s completely empty. But this is expected because we haven’t defined a store yet. So let’s go ahead and define our very first store in Pinia.

To start, let’s do a quick review on what the standard Vuex store looks like. We’ll open index.js, and we can see that the store is being created by calling createStore from Vuex. And then we’re passing in various properties like state, mutations, and actions to configure the store. So, of course the question is, how does this work in Pinia?

Rather than using a generic global store, like Vuex does with index.js, we’re going to create a specific store for our event data by creating EventStore.js within our stores directory.

Once that’s complete, we’re going to go ahead and import a function from Pinia that’s very similar to create store in Vuex, and that is the defineStore function.

## Anatomy of defineStore

Unlike createStore in Vuex, defineStore in Pinia takes two arguments.

- The first is a string that will be the name of the store. I usually call it whatever name the file is since that will usually be unique. So in this case, we’re calling it CountStore.
- The second argument is the object that contains how the store will be configured, which is very similar to Vuex. We’ll learn more about this in the upcoming lessons.

## Defining Event Store

Back inside of our app. We’ll go ahead and start by declaring a constant called useEventStore.

```javaScript
import { defineStore } from 'pinia'

const useEventStore
```

This naming pattern of prefixing our store name with use comes from the Composition API, since we’ll be calling this function later on to request our store.

Next, we’ll assign a value to our constant useEventStore by calling defineStore. And the first argument we’ll pass in will be the store name, which is EventStore. And then we’ll pass an empty object since it’s not ready to configure the store just yet.

```javaScript
import { defineStore } from 'pinia'

const useEventStore = defineStore('EventStore', {})
```

Finally to get our store ready to use. We need to use the export keyword in front of const so that we can import it later on.

And believe it or not, that’s all there is to it. Once you’ve defined both properties, your store is ready to go. 🎉

## Modular Stores

Within our app. You’ll notice that we’re managing both event and user data within a single store. And for those of use Vuex, a common desire would be to eventually modularize and namespace these into separate stores. While this used to require a bit of configuration, luckily for us, creating modular stores in Pinia is how things work by default.

So without any additional work, EventStore.js is actually its own module! 🥳

## Creating User Store

Let’s go ahead and create a user store module to practice that once more.

We’ll start by creating a new file inside of our stores directory and we’ll call it UserStore.js. Inside of here, we’ll start by importing our defineStore function from Pinia. And then just like before, we’ll go ahead and export a constant using the naming pattern we talked about earlier and call it useUserStore.

```javaScript
import { defineStore } from 'pinia'

const useUserStore
```

Then we’ll assign the value by calling defineStore where we pass in the first argument, which is the string of the store name, which we’ll call it UserStore. And finally we’ll pass in an empty object, which we’ll configure in the next lesson.

```javaScript
import { defineStore } from 'pinia'

const useUserStore = defineStore('UserStore', {})
```

And with that, you’ve now learned how to define a store in Pinia that’s modular by default.
