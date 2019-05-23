https://laracasts.com/series/how-do-i/episodes/3

A simple foreach:

```php
    foreach([1, 2, 3] as $number) 
    {
        var_dump($number);
    }
```

Supposed we have an object to iterate:

```php
    class User
    {
       public $name = 'John';
       public $age = 25;
    }

    foreach(new User as $prop) {
        var_dump($prop);
    }
```

But if the props are protected, we can not do this way.

Maybe iterating over a specific array that contains within the object.
- What about iterating MySQL query.
- Scaning a Directory
- Reading lines in a file


```php
// This is a collection, why we can still iterate it in laravel?
$users = User::all();

foreach($users as $user) {}

// Because this is a IteratorAggregate, a sort of string line way to use iterator.
```
```php
class collection
{
    protected $items

    public function __construct($items)
    {
        $this->items = items;
    }
}

$collection = new Collection(['a', 'b', 'c']);

```
So now, we wanna iterator over, not the public prop on the collection class, but the items(protected) within it.

we do:
```php
class collection implements IteratorAggregate
{
    protected $items

    public function __construct($items)
    {
        $this->items = items;
    }

    public function getIterator()
    {
        // pass through whatever we want to iterator
        return new ArrayIterator($this->items);
    }
}

foreach($collection as $item) {
    var_dump($item);
}
```