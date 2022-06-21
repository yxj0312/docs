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
    }

    document.getElementById('output').innerHTML = email
}

init()


// output: 
// error: email is not defined
```

because email is not accessible outside the block
