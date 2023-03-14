# Defining a Store

When we look inside of Pinia in our Vue DevTools, you’ll probably notice that it’s completely empty. But this is expected because we haven’t defined a store yet. So let’s go ahead and define our very first store in Pinia.

To start, let’s do a quick review on what the standard Vuex store looks like. We’ll open index.js, and we can see that the store is being created by calling createStore from Vuex. And then we’re passing in various properties like state, mutations, and actions to configure the store. So, of course the question is, how does this work in Pinia?

Rather than using a generic global store, like Vuex does with index.js, we’re going to create a specific store for our event data by creating EventStore.js within our stores directory.

Once that’s complete, we’re going to go ahead and import a function from Pinia that’s very similar to create store in Vuex, and that is the defineStore function.

## Anatomy of defineStore

Unlike createStore in Vuex, defineStore in Pinia takes two arguments.

- The first is a string that will be the name of the store. I usually call it whatever name the file is since that will usually be unique. So in this case, we’re calling it CountStore.
- The second argument is the object that contains how the store will be configured, which is very similar to Vuex. We’ll learn more about this in the upcoming lessons.
