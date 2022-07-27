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

## useInterval

First, let’s take a deeper look at how [useInterval](https://vueuse.org/shared/useinterval/#useinterval) works.

This composable will update a counter on every interval:

```JavaScript
// Updates `counter` every 500 milliseconds
const counter = useInterval(500);
```

At [the very top](https://github.com/vueuse/vueuse/blob/e484c4f8e4320ff58da95c2d18945beb83772b72/packages/shared/useInterval/index.ts#L26) of the composable we destructure our options object, pulling out the controls option and renaming it to exposeControls. By default we won’t show the controls:

```JavaScript
const {
  controls: exposeControls = false,
  immediate = true,
} = options;

```

Then, [at the end](https://github.com/vueuse/vueuse/blob/e484c4f8e4320ff58da95c2d18945beb83772b72/packages/shared/useInterval/index.ts#L33-L41), we have an if statement that switches on exposeControls. Either we return an object that includes the counter ref and all of the controls, or just the counter ref:

```JavaScript
if (exposeControls) {
  return {
    counter,
    ...controls,
  };
else {
  return counter;
}

```

The extra controls come from a helper composable used by the useInterval composable. We’ll see this being used again in the next composable.

With these two code snippets, we can make any composable have a more flexible return statement.

Now let’s take a look at the useNow composable.

## useNow

The [useNow](https://vueuse.org/core/usenow/) composable lets us grab a Date object that represents now and updates reactively:

```JavaScript
const now = useNow();
```

By default, it will refresh itself every frame — typically 60 times per second. We can change how often it updates, but we can also pause and resume the update process:

```JavaScript
const { now, pause, resume } = useNow({ controls: true });
```

This composable works in a very similar way to the useInterval composable. Internally they both use the useIntervalFn helper that [VueUse exposes](https://vueuse.org/shared/useintervalfn/).

First, we [destructure the options](https://github.com/vueuse/vueuse/blob/f65707876e1d93211c44414c2a30dc90b1178d68/packages/core/useNow/index.ts#L32-L35) object to get the controls option, again renaming it to exposeControls to avoid a naming collision:
