# Style Guide

## [Multi-word component names](https://vuejs.org/v2/style-guide/#Multi-word-component-names-essential)

Component names should always be multi-word, except for root App components, and built-in components provided by Vue, such as &<transition> or <component>.

This prevents conflicts with existing and future HTML elements, since all HTML elements are a single word.

Bad

```javaScript
Vue.component('todo', {
  // ...
})

export default {
  name: 'Todo',
  // ...
}
```

Good

```javaScript
Vue.component('todo-item', {
  // ...
})

export default {
  name: 'TodoItem',
  // ...
}
```

## [Component name casing in templates](https://vuejs.org/v2/style-guide/#Component-name-casing-in-templates-strongly-recommended)

Good

```javaScript
<!-- In single-file components and string templates -->
<MyComponent/>
<!-- In DOM templates -->
<my-component></my-component>
```

OR

```javaScript
<!-- Everywhere -->
<my-component></my-component>
```
