# Flexible Arguments

When using composables in Vue.js, sometimes you already have a ref that you want to use. Other times, you don’t. This lesson will go through a pattern that lets you use your composables either way, giving you more flexibility when writing your applications.

## What are flexible arguments?

Almost all composables require some type of argument as an input. Often, this is a reactive ref. It can also be a primitive Javascript type, like a string, number, or object. But we want to write our composables to be even more flexible and reusable, right?

Instead of requiring either a ref or a primitive, we can accept either. The useTitle composable that we saw in the previous article applies the flexible argument pattern.

When you pass in a ref, it’s linked to the document title. Then the title will be set to the value of that ref:

```JavaScript
const title = ref('This is the title');
useTitle(title);
title.value = 'New title please';
```

If you pass in just a string, it will create a new ref for you and then proceed to link it up to the document title:

```JavaScript
const title = useTitle('This is the title');
title.value = 'New title please';
```

In these contrived examples, it doesn’t look like much of a difference. However, when you’re using other methods and composables, you might already have a ref from somewhere else. Or you might not. Either way, this composable can adapt to what you need.

Now let’s see how to make this work in our composables.

## Implementing flexible arguments in a composable

To make the flexible arguments pattern work, we need to use either the ref function or the unref function on the argument we get:

```JavaScript
// When we need to use a ref in the composable
export default useMyComposable(input) {
  const ref = ref(input);
}

// When we need to use a raw value in the composable
export default useMyComposable(input) {
  const rawValue = unref(input);
}
```

The ref function will create a new ref for us. But if we pass it a ref, it just returns that ref to us:

```JavaScript
// Create a new refconst myRef = ref(0);

// Get the same ref back
assert(myRef === ref(myRef));
```

Let’s see how some composables from VueUse implement this pattern. VueUse is an open-source collection of composables for Vue 3 and is very well written. It’s a great resource to learn how to write great composables!

## useTitle

We’ll come back to the useTitle composable since we’re already familiar with it.

This composable lets us pass in either a string or a ref of a string. It doesn’t care which we provide:

```JavaScript
// Pass in a string
const titleRef = useTitle('Initial title');

// Pass in a ref of a string
const titleRef = ref('Initial title');
useTitle(titleRef);
```

In the source code, you can see that right after we destructure our options object, we create the title ref. We use the ref function here, which allows us to use either a ref or a string to make the title ref:

```JavaScript
// ...
const title = ref(newTitle ?? document?.title ?? null)
// ...
```

The ?? syntax is the nullish coalescing operator — a fancy-sounding name for “if the value on the left is null or undefined, use the value on the right.” So this line first tries to use newTitle, but if that isn’t defined, it will use document.title, and if that isn’t defined, it will give up and use null.

Something interesting to note for you TypeScript connoisseurs:

The newTitle variable used here has the type MaybeRef<string>. Here is what the type is defined as:

```JavaScript
type MaybeRef<T> = T | Ref<T>

```

This type definition means that the type MaybeRef<string> can either be a string or a Ref<string>, which is a ref with a string value inside.

The next composable we’ll look at also uses this type to implement this pattern.
