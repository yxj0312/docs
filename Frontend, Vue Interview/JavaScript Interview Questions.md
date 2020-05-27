# JavaScript Interview Questions

## What is prototype and prototype chain? 什么是原型、原型链

> [原型、原型链、作用域、作用域链、闭包](https://juejin.im/post/5c70c6ebe51d457c2a224ac2)
>
> [做了两年前端开发，平时就是拿 Vue 写写页面和组件，简历的项目经历应该怎么写得好看？](https://www.zhihu.com/question/384048633/answer/1134746899)
>
> [JavaScript Prototype and Prototype Chain explained.](https://medium.com/@chamikakasun/javascript-prototype-and-prototype-chain-explained-fdc2ec17dd04)

原型：相当于一个模具，用来生产实例对象。

Prototype is basically a property of a JavaScript function.

Prototype Example

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


原型链：原型对象有个指针指向构造函数，实例对象又有一个指针指向原型对象，就形成了一条原型链，最终指向null。

