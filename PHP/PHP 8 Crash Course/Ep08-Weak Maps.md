# Weak Maps

> Weak maps are effectively key value stores that allow for garbage collection. You won't reach for these often, but they're nonetheless an important tool to have in your belt.

```php
$obj = new stdClass();

// in the past, if u did want an object associated with a piece of data

$store = new SplObjectStorage();

$store[$obj] = "foobar";


// the key is our object
var_dump($store);

var_dump($store[$obj])
```

This Approach can make garbage collection:

```php
unset($obj);

// it doesn't get cleaned up
var_dump($store)
```

```php
$obj = new stdClass();

// in the past, if u did want an object associated with a piece of data

$store = new WeakMap();

$store[$obj] = "foobar";


// the key is our object
var_dump($store);

unset($obj);

// removed from WeakMap
var_dump($store[$obj])
```

```php
interface Event{}

class SomeEvent implements Event {}

class Dispatcher {
    protected WeakMap $dispatchCount;

    public function __construct()
    {
        $this->dispatchCount = new WeakMap();
    }

    public function dispatch(Event $event)
    {
        $this->$this->dispatchCount[$event] ??= 0;
        // if(! isset($this->$this->dispatchCount[$event])) {
        //     $this->dispatchCount[$event] = 0;
        // }

        $this->dispatchCount[$event]++;

        // dispatch the event
    }
}


$dispatcher = new Dispatcher();

$event = new SomeEvent();
$dispatcher->dispatch($event);
$dispatcher->dispatch($event);

$anotherEvent = new AnotherEvent();
$dispatcher->dispatch($anotherEvent);

// show the event name and dispatch times in the array
var_dump($dispatcher)
```
