# Weak Maps

> Weak maps are effectively key value stores that allow for garbage collection. You won't reach for these often, but they're nonetheless an important tool to have in your belt.

```php

$map = new WeakMap();

$obj = new stdClass();

// in the past, if u did want an object associated with a piece of data

$store = new SplObjectStorage();

$store[$obj] = "foobar";


// the key is our object
var_dump($store);

var_dump($store[$obj])
```
