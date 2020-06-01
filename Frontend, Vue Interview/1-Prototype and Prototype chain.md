# JavaScript Interview Questions

## What is prototype and prototype chain? 什么是原型、原型链

> [原型、原型链、作用域、作用域链、闭包](https://juejin.im/post/5c70c6ebe51d457c2a224ac2)
>
> [做了两年前端开发，平时就是拿 Vue 写写页面和组件，简历的项目经历应该怎么写得好看？](https://www.zhihu.com/question/384048633/answer/1134746899)
>
> [JavaScript Prototype and Prototype Chain explained.](https://medium.com/@chamikakasun/javascript-prototype-and-prototype-chain-explained-fdc2ec17dd04)

原型：相当于一个模具，用来生产实例对象。

Prototype is basically a property of a JavaScript function.

### Prototype Example

Creating objects using constructor functions:

```JavaScript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
console.log(Person.prototype)
```

We will got:

A created function's prototype object, with two attributes:

1. ```constructor```
2. ```__proto__```

> when we create a function, it creates another object called prototype object which has a constructor property which points back to the function object and the function itself has a property called prototype which points to the function’s prototype object.

```JavaScript
Person.prototype.constructor === Person
Person.prototype === Person.prototype.constructor.prototype
```

- When we create a function, JavaSctipt engine automatically creates a Prototype object for that function and add prototype property to Function object which can be used to access that Prototype object, as well as it adds constructor property which points back to the Function object.

- Then when we create instances from the Function object, then again JavaScript engine adds add getter/setter (i.e ```__proto__```) to object’s instance which can be used to access the same prototype object of the Function object.

- This Prototype object of the constructor function is shared among all the objects created using the constructor function. We can add methods and properties into this prototype object and then those automatically will be available to its constructor function ’s instances.

## Prototype Chain

原型链：原型对象有个指针指向构造函数，实例对象又有一个指针指向原型对象，就形成了一条原型链，最终指向null。

### Prototype Chain Example

```JavaScript
const apple =  {};
alert('' + apple);

// We will get:
[object Object]

// Let's dig further:
console.log(apple);
// We will get:
{}
  __proto__:object

console.log(apple.__proto__)
// We will get:
{constructor:f, __defineGetter_: f, __defineSetter_: ....}

console.log(apple.toString()):
// We will get:
[object Object]
```

> In JavaScript, there are set of built-in Objects such as Object, Array, Date, Function etc and each of those objects will have respective prototype objects attached to it. In the above case, it was the Object construction function which invoked to create the apple instance. That is because const apple = {} is the same as const apple = new Object() where Object is the built-in constructor function.
> 
> Also please note that unlike other function’s prototype object, Object function constructor’s prototype object does not have a __proto__ property inside it. If we console log its value, it should be null.

```JavaScript
console.log(Object.prototype.__proto__)
// get:
null
```

### Reason of this

- When we look for a property of an object (including function declarations), the JavaScript engine will first check the object itself for the existence of that property.

- If not found, it’ll go to the object’s prototype object and check that object.
  
- If found, it’ll use that property.
  
  - If that is not found in that object then it will lookup on that prototype object’s prototype object

    - If found it there, it’ll use that property or else lookup continues until it finds an object with a ```__proto__``` property equal to null. That is the JavaScript built-in object’s prototype object. Here it has set to null in order to terminate the prototype lookup chain.
  
- This is called the prototype chain. This is why we see undefined for the values which are not defined in the any of the prototype type chain objects.

> By specification, all built-in Objects in JavaScript has prototype Object associated with it and it points to the Object.prototype object. That is why many people say “Everything in JavaScript is inheriting from Object.”
