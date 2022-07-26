# Dynamic Return Values

This course is based on our Coding Better Composables blog series authored by Michael Thiessen.

What if your composable could change what is returned based on its use? If you only needed a single value, it could do that. And if you needed a whole object returned, it could do that, too.

This article will look at a pattern for adding dynamic returns to composables. We’ll understand when to use this pattern, how to implement it, and look at some examples of the pattern in use.

## The Pattern of Dynamic Return Values

If we take a look at the documentation for the useInterval composable, we can see that it can have two different return values:

```JavaScript
// Returns a single value
const counter = useInterval(200)

// Returns an object of values
const {
  counter,
  pause,
  resume,
} = useInterval(1000, { controls: true });
```

But how is this possible? JavaScript by default doesn’t allow for this type of behavior, we’ll have to code it up.

## Implementing in a composable

To implement this pattern, we need to do two things:

1. Add a controls option to let the composable know we want alternate return values.
2. Use controls to change the return statement.

Here’s a simple sketch of what this looks like:

```JavaScript
export default useComposable(input, options) {
// 1. Add in the `controls` option
const { controls = false } = options;

...

// 2. Either return a single value or an object
if (controls) {
    return { singleValue, anotherValue, andAnother };
  } else {
    return singleValue;
  }
}

```

How you decide to do this switching is ultimately up to you. Do what makes the most sense for you and your composable.

Perhaps you’ll want to switch on an existing option instead of using a controls option only for this purpose. Maybe it will be cleaner to use a ternary in the return instead of an if statement. Or maybe there’s an entirely different way that works best for you. The important thing with this pattern is the switching, not how the switching works.

Next, let’s see how some composables from VueUse implement this pattern.
