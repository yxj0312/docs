# What is a Composable?

This course is based on our [Coding Better Composables](https://www.vuemastery.com/blog/coding-better-composables-1-of-5/) blog series authored by Michael Thiessen

Composables are, by far, the best way to organize business logic in your Vue 3 app.

They let you extract small pieces of logic into functions that you can easily reuse repeatedly. This makes your code easier to write and read.

Since this way of writing Vue code is relatively new, you might be wondering what the best practices are when writing composables. This tutorial series will serve as your guide on how to craft solid composables that you and your team can rely on.

Here’s what we’ll be covering:

1. How to use an options object parameter to make your composables more configurable 👈 we’re here
2. Using the ref and unref to make our arguments more flexible
3. A simple way to make your return values more useful
4. Why starting with the interface makes your composables more robust
5. How to use async code without the need for await — making your code easier to understand

First, though, we need to make sure we’re on the same page. So let me take a bit to explain what, exactly, a composable is.

## What is a Composable?

According to the Vue documentation, a composable is “a function that leverages Vue Composition API to encapsulate and reuse stateful logic”.

This means that any code that uses reactivity can be turned into a composable.

Here’s a simple example of a useMouse composable from the Vue.js docs:

```JavaScript
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

We define our state as refs, then update that state whenever the mouse moves. By returning the x and y refs, we can use them inside of any component (or even another composable).

Here’s how we’d use this composable inside of a component:

```JavaScript
<template>
  X: {{ x }} Y: {{ y }}
</template>

<script setup>
  import { useMouse } from './useMouse';
  const { x, y } = useMouse();
</script>
```

As you can see, using the useMouse composable allows us to easily reuse all of this logic. With very little extra code, we’re able to grab the mouse coordinates in our component.

Now that we’re on the same page, let’s look at the first pattern that will help us to write better composables.

## How to create composable inputs?

There are a few ways we could do it. We could use an argument for each property:

```JavaScript
const title = useTitle('Product Page', true, '%s | My Socks Store')
```

We could also use an options argument:

```JavaScript
const title = useTitle({ title: 'Product Page', 
                         observe: true, 
                         titleTemplate: '%s | Socks Store' })
```

The benefit here is we don’t have to remember the correct ordering, we know what each option does, and easier to add new options.

Or we could use a combination of both:

```JavaScript
const title = useTitle('Product Page', { observe: true, 
                                         titleTemplate: '%s | Socks Store' })
```

Here we are putting the required arguments first and the other arguments are optional.

It’ll also be much easier to add new options later on. This applies both to adding new options to the composable itself, and to adding options when using the composable.

So, using an options object is great. But how do we implement that, and parse them out.

## How to parse the options argument?

Here’s how you would implement the options object pattern in a composable:

```JavaScript
export function useTitle(newTitle, options) {
    const {
      observe = false,
      titleTemplate = '%s',
    } = options;
    
    // ...
  }
```

Here, we can accept newTitle (our required argument), and then the last argument is the options object. The next step is to destructure the options object. By destructuring, we can access all the values, and clearly provide defaults for each possible option.

## Introducing VueUse

Now we’ll look at how two different composables from VueUse apply this pattern. VueUse is an open source collection of composables for Vue 3, and is very well written. It’s a great resource to learn how to write great composables! To use VueUse composables in our application, we can install it in an existing Vue 3 project by running:

```JavaScript
npm i @vueuse/core
```

Now let’s try using a composable from VueUse. First, we’ll look at useTitle, and then we’ll see how useRefHistory works.

## Using useTitle

The useTitle composable is fairly straightforward. It let’s you update the page’s title:

```JavaScript
<script setup>
import { useTitle } from '@vueuse/core'

const title = useTitle('Green Socks', { titleTemplate: '%s | My Store' })
</script>

<template>
    <h1>Title Composable</h1>
    <input v-model="title" type="text">
</template>
```

Now let’s look at a slightly more complicated composable that also uses this options object pattern.

## useRefHistory

The useRefHistory composable is a bit more interesting. It let’s you track all of the changes made to a ref, allowing you to perform undo and redo operations fairly easily:

```JavaScript
import { useRefHistory } from '@vueuse/core'

// Set up the count ref and track it
const count = ref(0);
const { undo } = useRefHistory(count);

// Increment the count
count.value++;

// Log out the count, undo, and log again
console.log(counter.value);
// 1
undo();
console.log(counter.value);
// 0
```

This composable can take a bunch of different options, we could call it like so:

```JavaScript
import { useRefHistory } from '@vueuse/core'

const state = ref({});
const { undo } = useRefHistory(state, {
  deep: true,  // Track changes inside of arrays and objects
  capacity: 15 // Limit how many steps we track
});
```

If we look at the source code for this composable, we see it uses the exact same object destructuring pattern that useTitle does:

```JavaScript
export function useRefHistory(source, options) {
  const {
    deep = false,
    flush = 'pre',
    eventFilter,
  } = options;

// ...
}
```

However, in this example we only pull out a few values from the options object here at the start.

This is because useRefHistory relies on the useManualRefHistory composable internally. The rest of the options are passed as that composable’s options object later on in the composable:

```JavaScript
// ...const manualHistory = useManualRefHistory(
  source,
  {
// Pass along the options object to another composable
    ...options,
    clone: options.clone || deep,
    setSource,
  },
);

// ...
```

This also shows something I mentioned earlier: composables can use other composables!
