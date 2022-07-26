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
