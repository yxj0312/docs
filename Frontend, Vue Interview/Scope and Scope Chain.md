# Scope and Scope Chain

## 作用域和作用域链

> [原型、原型链、作用域、作用域链、闭包](https://juejin.im/post/5c70c6ebe51d457c2a224ac2)

> 所谓作用域，就是变量或者是函数能作用的范围. 作用域是可访问变量的集合。

在 JavaScript 中, 对象和函数同样也是变量。

在 JavaScript 中, 作用域为可访问变量，对象，函数的集合。

JavaScript 函数作用域: 作用域在函数内修改。

- 全局作用域

> 除了函数中定义的变量之外，都是全局作用域。


```JavaScript
var a = 10;
function bar(){
    console.log(a);
    var a = 20;
}
bar();//undefined
```

[变量提升 hoisting（预解析）](https://juejin.im/post/5e0e97b76fb9a0481d28b1b4)

Why?

```JavaScript
// 预编译
var a = undefined
var a = undefined
function bar(){
    console.log(a);
    var a = 20;
}
bar(); 

----
// 在bar（）里预编译
var a =  undefined
console.log(a) //undefined

// 如果没有这个var a = 20, 他就会在bar里调用全局变量 a = 10, 然后得到10
```

- 局部作用域

> 函数里用var声明的变量。

- 块级作用域 (Block scoping)

[ES6之块级作用域](https://www.cnblogs.com/giggle/p/5572006.html)
[es6 let块级作用域了解知多少](https://zhuanlan.zhihu.com/p/53349326)
