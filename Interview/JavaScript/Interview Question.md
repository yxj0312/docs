# Questions

## JavaScript

### new in JavaScript ES6(ECMAScript 2015)

#### const and let

const is a new keyword in ES6 for declaring variables. const is more powerful than var. Once used, the variable can’t be reassigned. In other words, it’s an immutable variable except when it used with objects.

This is really useful for targeting the selectors. For example, when we have a single button that fires an event, or when you want to select an HTML element in JavaScript, use const instead of var. This is because var is ‘hoisted’. It’s always preferable to use const when don’t want to reassign the variable .

let can be reassigned and take new value. It creates a mutable variable.

let is the same as const in that both are blocked-scope. It means that the variable is only available within its scope.

#### var and let

The difference is in the level of scope. var is function-scoped, but let (and const) are block-scoped. To understand the difference, check out this example:

```JavaScript
function doStuff() {
  // both a and b will be available for this function, but not outside
  let a = 5;
  var b = 5;
  
  console.log(a + b); // 10
}

doStuff(); // 10;
console.log(a); // ReferenceError
console.log(b); // ReferenceError

function doMoreStuff() {
  if (2 + 2 === 4) {
    // Here, a will be available for the whole function
    var a = 5;
    // But b will be available only inside this if block
    let b = 5;
  }
  console.log(a); // 5
  console.log(b); // ReferenceError
}

doMoreStuff();
// 5
// ReferenceError

for (let i = 0; i < 5; i++) {
  // i is reccreated on every interation
  // and setTimeout gets a new i every time
  setTimeout(() => console.log(i), 100);
}
/*
0
1
2
3
4
*/

for (var j = 0; j < 5; j++) {
  // j is scoped to the outside function (which is the file itself)
  // thus, it is not recreated and setTimeout gets the same reference to j
  setTimeout(() => console.log(j), 100);
}
/*
5
5
5
5
5
*/
```

#### Arrow functions

The arrow function is really awesome, and makes your code more readable, more structured, and look like modern code.

Also, you can use Arrow function with map, filter, and reduce built-in functions.

#### Template Literals

Template literals or template strings are pretty cool. We don’t have to use the plus (+) operator to concatenate strings, or when we want to use a variable inside a string.

#### Default parameters

But if we used the default parameter, it won’t return undefined, and it will use its value when we forget to assign a parameter!

#### Array and object destructing

With ES5, we have to assign each value to each variable. With ES6, we just put our values within curly brackets to get any property of the object.

#### Import and export

Using import and export in your JavaScript application makes it more powerful. They allow you to create separate and reusable components.

#### Promises

Promises are a new feature of ES6. It’s a method to write asynchronous code.

#### Rest parameter and Spread operator

The rest parameters are used to get the argument of an array, and return a new array.

#### Classes

Classes are the core of object oriented programming (OOP). They make your code more secure and encapsulated. Using classes gives your code a nice structure and keeps it oriented.

### ES7 and ES8

ES7: some new methods, like n = 2**10 // 2^10

ES8: async and await

Man kann nun Methoden oder Funktionen als async deklarieren. Diese Funktionen müssen dann ein Promise zurückgeben.

Mit dem await-Schlüsselwort kann man nun darauf warten, dass das Promise fertig wird.