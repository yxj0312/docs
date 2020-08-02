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

### What is the difference between == and ===

The way JS engine understands it, == allows type coercion(强制类型转换) and === disallows. Type coercion is the automatic type conversion by the interpreter. This is the source of most confusion in JS (like [] == ![] being true). You can observe the difference in this snippet:

```JavaScript
/* Here, '5' will be converted to 5 */
5 == '5'; // true
5 === '5'; // false

/* Here, true will be converted to 1 */
1 == true; // true
1 > false; // true
0 === false; // false

// Here, JS will try to convert both of these to number
// Number('true') = NaN (Not a Number), but Number(true) = 1
'true' == true; // false
'true' === true; // false
```

### What does ‘this’ keyword mean

this keyword is available in any function and points to the object that contains this function.

```JavaScript
const myObject = {
  a: 'b',
  b: 'c',
  doStuff: function() {
    // Here, this refers to myObject
    console.log(this.a + this.b);
  }
}

myObject.doStuff(); // bc

// BUT:
const anotherObject = {
  a: 'abacaba',
  b: '!'
};
anotherObject.doStuff = myObject.doStuff;
anotherObject.doStuff(); // abacaba!

// Arrow functions do not have their own this and refer to the outer one:
const arrowObject = {
  a: 'b',
  // here, this refers to the root function (file itself), which has no idea about a
  doMoreStuff: () => console.log(this.a)
};

arrowObject.doMoreStuff(); // undefined
```

### What is a constructor function

A constructor function is called with new keyword and returns whatever the value of this is. Note that in constructor functions this does not point to the outer object, but instead used as a placeholder object:

```JavaScript
function Car(name, make) {
  // Here, this is not a reference to outer object
  // But a placeheloder object you can use to construct the
  // desired value
  this.name = name;
  this.make = make;
  // you do not have to return anything, as this is automatically returned
}

const myCar = new Car('Outback', 'Subaru');
console.log(myCar.name); // Outback
```

### Convert this callback-based call to a Promise-based one

```JavaScript
// the function itself
function getData(callback, errorCallback) {
  try {
    // Do some network/api stuff...
    callback(result)
  } catch (e) {
    errorCallback(e);
  }
}

// Here is how you would use it:
getData(result => console.log(result), error => console.error(error));

// Here is how to create a Promise-based function from it:

function getDataAsync() {
  return new Promise((resolve, reject) => {
    getData(resolve, reject);
  });
}

getDataAsync()
  .then(result => console.log(result))
  .catch(error => console.error(error));

// OR

async function main() {
  const result = await getDataAsync();
  console.log(result);
}
```

The Promise constructor function accepts a callback, which receives two functions: resolve and reject. Inside the callback, you perform your time-consuming tasks and call resolve or reject, based on the outcome.

### NaN === NaN?

False. This is an endless source of debate and one of the most confusing parts about JS. In a nutshell, NaN stands for Not a Number, and just because one value is not a number and another one is not a number does not imply they are equal. The downside is you cannot really check if a variable is NaN using myVariable === NaN. You can use the Number.isNaN function or myVariable !== myVariable to check for it.

### 0.1 + 0.2 === 0.3?

False. This trick does not apply only to JS: it is common among floating-point operations in any language. It has to do with the way the CPU processes floating-point numbers. The actual value of 0.1 + 0.2 will be something like 0.300000001 and to check for equality you would write Math.abs(0.3 - (0.2 + 0.1)) <= EPS, where EPS is an arbitrary small value (0.00001, for example).

### What are the primitive data types in JS

A primitive data type in JS is data that is not an object and that has no methods. Here is the list of primitive data types in JS:

- Boolean
- Null
- Undefined
- Number
- BigInt
- String
- Symbol

### What is “strict” mode

In JS, you enable strict mode by putting "use strict"; at the beginning of the file. Strict mode enables more rigorous error-checking in your code and makes debugging easier. For example, this snippet will work in regular JS, but not strict:

```JavaScript
x = 'abacaba'; // using an undeclared variable is not allowed in strict mode

delete x; // deleting variables is also not allowed

function(x1, x1) {} // duplicating argument names is not allowed
```