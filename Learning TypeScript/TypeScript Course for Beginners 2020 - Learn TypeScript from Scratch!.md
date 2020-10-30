# **TypeScript Course for Beginners 2020 - Learn TypeScript from Scratch!**

[links](https://www.youtube.com/watch?v=BwuLxPH8IDs&t=156s)

## What is TypeScript

- A JavaScript Superset
- Language building up on JavaScript
- Add new Features + Advantages to JavaScript
- Browser CAN'T execute it
- Features are compiled to JS "workarounds", possible errors are thrown

### Why TypeScript

Consider this example

```JavaScript
function add(num1, num2) {
    return num1 + num2;
}

console.log(add('2', '3'));
```

This is a unwanted behavior at runtime, we have a mitigation strategies in JS, that to add if check to add function validate & sanitize user input, but developers can still write invalid code. With TS we have a 'tool' that helps developer write better code.

### TypeScript Overview

TypeScipt adds...

- Types
- Next-gen JS Features(compiled down for older Browsers)
- Non-JS Features like Interfaces or Generics
- Meta-Programming Features like Decorators
- Rich Configuration Options
- Modern Tooling that helps even in non-TS Projects

## Working with Types

### Core Syntax & Features

#### Core Types

- number: 1, 5.3, -10
  
  All numbers, no differentiation between integers or floats

- string: 'Hi', 'Hi'
  
  All test values

- boolean: true, false

- object: {age: 30}

- array: [1,2,3]

#### Types Added by TS

- Tuple [1,2]
  
  Fixed-length array

- Enum enum { NEW, OLD }
  
  Automatically enumerated global constant identifiers

The key difference: JS uses "dynamic types" (resolved at runtime), TS uses "static types" (set during development)
