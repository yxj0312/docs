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