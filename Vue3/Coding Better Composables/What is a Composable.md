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
