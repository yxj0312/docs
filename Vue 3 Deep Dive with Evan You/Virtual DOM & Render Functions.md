# Virtual DOM & Render Functions

## Benefits of having a virtual DOM layer

1. Decouples rendering logic from the actual DOM
    - makes it straightforward to reuse it in non-browser environments.
e.g. rendering to a string (SSR), rendering to a canvas/WebGL, or native mobile rendering.

2. Provides the ability to programmatically construct, inspect, clone and create derivative structures using the full power of JavaScript

## Render functions

Vue 2 API

```JavaScript
render(h) {
    return h('div', {
        attrs: {
            id: 'foo'
        },
        on: {
            click: this.onClick
        }
    }, 'hello')
}
```

Instead of providing a template option,  you can give your component a render function instead.

In Vue 2, you will receive the h argument, directly as an argument to the render function. And you can use that to create virtual DOM nodes, or vnodes for short.

- A vnode takes the first argument is the type, so here we're creating a div.
- The second argument is an object, containing all the data, or props, on the vnode.
- In Vue2, the API is a little bit verbose, that you have to be specific about what type of binding you are passing to the node. For example, if you want to bind an attribute, you have to nest it under the ATTRS object. And if you want to bind an event listener, you have to list it under on.
- The third argument is the child nodes of this vnode.

Vue 3 API
    - Flat props structure
    - Globally imported `h` helper

```JavaScript
    import { h } from 'vue'

    render() {
        return h('div', {
            id: 'foo',
            onClick: this.onClick
        }, 'hello')
    }
```

- The second argument now is always a flat object, and you can directly pass an attribute to it.
- Listeners by convention will start with on. So you don't have to think about the nesting that much. Vue will intelligently the best way to check this keys  exists on the native DOM node as a property or attribute.
