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
