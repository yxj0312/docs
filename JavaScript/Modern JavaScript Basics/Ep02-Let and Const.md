# Let and Const

var: it scopes to the function level in the javaScript

``` javaScript
function init() {
    if (true) {
       var email = 'andre@example.com' 
    }

    document.getElementById('output').innerHTML = email
}

init()


// output: andre@example.com
```

we change it in const and let. they are called: block scope.

``` javaScript
function init() {
    if (true) {
       let email = 'andre@example.com' 
       document.getElementById('output1').innerHTML = email
    }

    document.getElementById('output2').innerHTML = email
}

init()


// output1:
// andre@example.com
// output2: 
// error: email is not defined
```

because email is not accessible outside the block

if  we take codes like this:

``` javaScript
function init() {
    document.getElementById('output').innerHTML = email
    var email = 'andre@example.com' 
}

init()


//  output:
// undefined
```

It shows undefined, but the value really exists. And there's no error in the console.

Because javaScript takes this variable(email), and puts it on the top of the code as undefined. It does reference a variable that is set, but has no defined value.

but if we

``` javaScript
function init() {
    document.getElementById('output').innerHTML = email
    let email = 'andre@example.com' 
}

init()


//  output:
// error: Uncaught ReferenceError: Cannot access 'email' before initialization
```
