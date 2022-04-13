# Review 2022

## PHP

### Dependency Injection

#### Definition

[Dependency Injection: Huh?](https://code.tutsplus.com/tutorials/dependency-injection-huh--net-26903)

- Dependency injection
  
    Dependency injection is a technique in which an object receives other objects that it depends on.

- Dependency/Service/Client
  
    These other objects are called dependencies.

    In the typical "using" relationship the receiving object is called a client and the passed (that is, "injected") object is called a service.

    "Dependency Injection is where components are given their dependencies through their constructors, methods, or directly into fields."

- Ioc: Inversion of Control (IoC) / Container
  
    Solution: Inversion of Control (IoC), to create a container class that will handle the brunt of the work for us.

- Laravel Service Container
  
  The Laravel service container is a powerful tool for managing class dependencies and performing dependency injection. Dependency injection is a fancy phrase that essentially means this: class dependencies are "injected" into the class via the constructor or, in some cases, "setter" methods.

- PHP - The __construct Function
  
  A constructor allows you to initialize an object's properties upon creation of the object. If you create a __construct() function, PHP will automatically call this function when you create an object from a class. Notice that the construct function starts with two underscores (__)!

### SOLID

- Single Responsibility
- Open-Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

### Design Pattern

[Laravel Design Pattern](https://codesource.io/brief-overview-of-design-pattern-used-in-laravel/)

#### Builder

#### Factory

#### Provider

#### Repository

#### Facade

#### Decorator

#### Adapter

#### Template

#### Strategy

#### The Chain of Responsibility

### Laravel architecture Concepts

#### Laravel Service Container

#### Laravel Service Providers

#### Facades

Facades provide a "static" interface to classes that are available in the application's service container.

## JavaScript

### Vue

#### Vue3 Reactivity

#### Vuex

#### Vue Testing

### Web Api

#### GraphQL

### DevOps

#### Docker

### Database

### Join

- Inner join: identical with join in MySQL, only give the result where there are some matchers on both tables

- With this query is saying: on the condition, that there is no match, what should I do?

  - Inner join: forget it, discard entirely.
  - Left join: on the condition there is no match, I want to favor the left side (in this query, it is store table): So if there is no match, favor the store table, I alway want to see every records of the store table.
  - Right join: we switch it, if there is no match favor the right side of the joined table, which is address here.
  - Left join and left outer join are the same thing

- COALESCE takes any number of arguments and returns the first value that is not null.

```
  COALESCE(x,y,z) = x if x is not NULL
  COALESCE(x,y,z) = y if x is NULL and y is not NULL
  COALESCE(x,y,z) = z if x and y are NULL but z is not NULL
  COALESCE(x,y,z) = NULL if x and y and z are all NULL
```

COALESCE can be useful when you want to replace a NULL value with some other value. In this example you show the name of the party for each MSP that has a party. For the MSP with no party (such as Canavan, Dennis) you show the string Non

- CASE allows you to return different values under different conditions.

If none of the conditions match (and there is not ELSE) then NULL is returned.

### JavaScript

#### var and let

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
