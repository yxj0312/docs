# Vue 3 Overview

This Vue 3 course with Evan You will help you learn how Vue is put together, so you can more effectively build and scale Vue applications. The majority of it is taught by Evan, but before I hand over the teaching to him, it’s important that you understand some core Vue concepts.

## What is the DOM?

Dom stands for Document Object Model, and it’s the our browser’s interface (API) to change what is displayed in the browser.

```html5
<html>
    <head>
        <title>My title</title>
    </head>
    <body>
        <h1>A heading</h1>
    </body>
</html>
```

document
    - html (root element)
      - head (element)
        - title (element)
          - My title(Text)
    - body (element)
      - h1 (element)
        - A heading(Text)

This HTML maps to a series of DOM nodes that we can manipulate.

```javaScript
let item = document.getElementsByTagName("h1")[0];
item.textContent = "New Heading";
```

This would update our h1 heading.

## The Problem with the DOM

The underlying problem with using and manipulating the DOM is that some pages have thousands of nodes. This is why some frameworks (like Vue) have something called the Virtual DOM.

The Virtual DOM is a way of representing the actual DOM with JavaScript Objects.

```javaScript
<div>Hello</div>

->

{
    tag: "div",
    children: [
        {
            text: "Hello"
        }
    ]
}

-> mount it onto the dom
Element: <div>

Text: "Hello"
```

## What is a Render Function?

When Vue receives a template, before creating a Virtual Node, it first compiles it into a render function. You can see this below

```javaScript
<div>Hello</div>

->render function

render(h) {
    return h('div', 'hello')
}

->

{
    tag: "div",
    children: [
        {
            text: "Hello"
        }
    ]
}

-> mount it onto the dom
Element: <div>

Text: "Hello"
```

The render function is what creates the virtual node, which gets sent to Vue to update the DOM. Later, if the data used by the render function changes, the render function will get run again producing a new Virtual DOM Node. Then Vue takes the old and the new node, compares the two, and makes the appropriate DOM calls to change the webpage.

## An Analogy of the Virtual DOM

A good way of understanding the Virtual DOM vs the Actual DOM, is blueprints (Virtual DOM) vs the actual building (Actual DOM).

If I make changes to the 29th floor of the building, such as changing the layout of the furniture and adding new kitchen cabinets, I can make updates to the building in two ways:

1. I can demolish everything on the 29th floor and start from scratch.
2. I can create new blueprints, compare the differences, and make updates to the minimal amount of work.
Obviously, the second option is going to be faster.
