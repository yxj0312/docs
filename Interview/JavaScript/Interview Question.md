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

The JavaScript this keyword refers to the object it belongs to. This has different values depending on where it is used. In a method, this refers to the owner object and in a function, this refers to the global object.

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

Strict mode is a way to introduce better error-checking into your code.

```JavaScript
x = 'abacaba'; // using an undeclared variable is not allowed in strict mode

delete x; // deleting variables is also not allowed

function(x1, x1) {} // duplicating argument names is not allowed
```

### How can you create an object in JavaScript

```JavaScript
var emp = {
name: "Daniel",
age: 23
};
```

### How can you create an Array in JavaScript

```JavaScript
var x = [];
var y = [1, 2, 3, 4, 5];
```

### What is argument objects in JavaScript & how to get the type of arguments passed to a function

```JavaScript
function func(x){
console.log(typeof x, arguments.length);
}
func(); //==> "undefined", 0
func(7); //==> "number", 1
func("1", "2", "3"); //==> "string", 3
```

### What is Callback

A callback is a plain JavaScript function passed to some method as an argument or option. It is a function that is to be executed after another function has finished executing, hence the name ‘call back‘. In JavaScript, functions are objects. Because of this, functions can take functions as arguments, and can be returned by other functions.

### What is Closure? Give an example

Closures are created whenever a variable that is defined outside the current scope is accessed from within some inner scope. It gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created. To use a closure, simply define a function inside another function and expose it.

```JavaScript
function init() {
    var name = "Mozilla"; // name is a local variable created by init
    function displayName() { // displayName() is the inner function, a closure
        alert (name); // displayName() uses variable declared in the parent function
    }
    displayName();
}
init();
```

### What is the difference between Attributes and Property

Attributes-  provide more details on an element like id, type, value etc.

Property-  is the value assigned to the property like type=”text”, value=’Name’ etc.

### What is the difference between Local storage & Session storage

Local Storage – The data is not sent back to the server for every HTTP request (HTML, images, JavaScript, CSS, etc) – reducing the amount of traffic between client and server. It will stay until it is manually cleared through settings or program.

Session Storage – It is similar to local storage; the only difference is while data stored in local storage has no expiration time, data stored in session storage gets cleared when the page session ends. Session Storage will leave when the browser is closed.

### What is the difference between null & undefined

Undefined means a variable has been declared but has not yet been assigned a value. On the other hand, null is an assignment value. It can be assigned to a variable as a representation of no value. Also, undefined and null are two distinct types: undefined is a type itself (undefined) while null is an object.

### What is the difference between undeclared & undefined

Undeclared variables are those that do not exist in a program and are not declared. If the program tries to read the value of an undeclared variable, then a runtime error is encountered. Undefined variables are those that are declared in the program but have not been given any value. If the program tries to read the value of an undefined variable, an undefined value is returned.

### What is NaN in JavaScript

NaN is a short form of Not a Number. Since NaN always compares unequal to any number, including NaN, it is usually used to indicate an error condition for a function that should return a valid number. When a string or something else is being converted into a number and that cannot be done, then we get to see NaN.

### How do JavaScript primitive/object types passed in functions

One of the differences between the two is that Primitive Data Types are passed By Value and Objects are passed By Reference.

By Value means creating a COPY of the original. Picture it like twins: they are born exactly the same, but the first twin doesn’t lose a leg when the second twin loses his in the war.
By Reference means creating an ALIAS to the original. When your Mom calls you “Pumpkin Pie” although your name is Margaret, this doesn’t suddenly give birth to a clone of yourself: you are still one, but you can be called by these two very different names.

### How can you convert the string of any base to integer in JavaScript

 The parseInt() function is used to convert numbers between different bases. It takes the string to be converted as its first parameter, and the second parameter is the base of the given string.

### What are Exports & Imports

 Imports and exports help us to write modular JavaScript code. Using Imports and exports we can split our code into multiple files.

### What are some advantages/disadvantages to testing your code

Advantages:

- The tests give you confidence that you haven't broken anything, when you refactor or add new code.
  
- You can test your code before it's deployed, this gives you quick feedback.

- Having unit tests will allow you to test your classes in isolation, thereby helping you pinpoint which class has a problem when trying to debug.

- If you drive your code through tests, you will endup in writing testable code, which is clean.

Disadvantages:

- If u don't write your test properly, it will give u a misdirection.

### What tools would you use to test your code's functionality

Jest, Mocha, Jesmine, Pupperteer(libaray, mock resources, wriiten and maintained by the google chrome devs)

### What is the difference between a unit test and a functional/integration test

Unit: Testing smallest units or modules individually.

Integration: Testing integration of two or more units/modules combined for performing tasks.

Functional: Testing the behavior of the application as per the requirement

### What is the purpose of a code style linting tool

Linting is a process by a linter program that analyzes source code in a particular programming language and flag potential problems like syntax errors, deviations from a prescribed coding style or using constructs known to be unsafe.

### What are some of the testing best practices

- Rely Only on a Controlled Security Environment for Testing

- Carry Tests Throughout the Software Development Cycle

- Break Tests in Small Fractions

- Write Tests for Maximum Coverage

- Carry Regression Tests

- Programmers Should Not Write Tests

- Note and Report All Tests

- Clean the Test Code Prior to Final Release of Software Product

- Isolate the Application from Developers

- Customize Testing

- Accumulated Skilled Testers

- Build a Target Operating Model for Testing

- Have a Mix of In-house and Offshore Teams

### What is an event bubbling in JavaScript

Event bubbling is a way of event propagation in the HTML DOM API, when an event occurs in an element inside another element, and both elements have registered a handle for that event. With bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements. The execution starts from that event and goes to its parent element. Then the execution passes to its parent element and so on till the body element.

### What is the difference between Call & Apply

The call() method calls a function with a given this value and arguments provided individually.

```JavaScript
fun.call(thisArg[, arg1[, arg2[, ...]]])
```

The apply() method calls a function with a given this value, and arguments provided as an array.

```JavaScript
fun.apply(thisArg, [argsArray])
```

### How to empty an Array in JavaScript

Method 1: 

```JavaScript
arrayList = [];
```

Above code will set the variable arrayList to a new empty array. This is recommended if you don’t have references to the original array arrayList anywhere else, because it will actually create a new, empty array. You should be careful with this method of emptying the array, because if you have referenced this array from another variable, then the original reference array will remain unchanged.

Method 2: 

```JavaScript
arrayList.length = 0; 
```

The code above will clear the existing array by setting its length to 0.
This way of emptying the array also updates all the reference variables that point to the original array.

Method 3:

```JavaScript
arrayList.splice(0, arrayList.length);
```

Method 4:

```JavaScript
while(arrayList.length)
{
arrayList.pop();
}
```

### Delete operator

The delete operator is used to delete properties from an object.

### What is the reason for wrapping the entire content of a JavaScript source file in a function book

This is an increasingly common practice, employed by many popular JavaScript libraries. This technique creates a closure around the entire contents of the file which, perhaps most importantly, creates a private namespace and thereby helps avoid potential name clashes between different JavaScript modules and libraries.
Another feature of this technique is to allow for an easy alias for a global variable. This is often used in jQuery plugins.

### What are escape characters in JavaScript

JavaScript escape characters enable you to write special characters without breaking your application. Escape characters (Backslash) is used when working with special characters like single quotes, double quotes, apostrophes and ampersands. Place backslash before the characters to make it display.
