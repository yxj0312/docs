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

we do: Collection-Iterator-Aggregate:
```php
class collection implements IteratorAggregate
{
    /**
     * The collection contents.
     *
     * @var array
     */
    protected $items

    /**
     * Create a new counter instance.
     *
     * @param array $items
     */
    public function __construct($items = [])
    {
        $this->items = items;
    }

    /**
     * Retrieve the iterator.
     *
     * @return ArrayIterator
     */
    public function getIterator()
    {
        // pass through whatever we want to iterator
        return new ArrayIterator($this->items);
    }
}

// Usage:
$collection = new Collection(['a', 'b', 'c']);

foreach($collection as $item) {
    var_dump($item);
}
```

When you need quite a bit more controll, you are not just dealing with the simple array. like reading a file.

Collection-Iterator:
```php
<?php
class Collection implements Iterator
{
    /**
     * The collection contents.
     *
     * @var array
     */
    protected $items;

    /**
     * Create a new counter instance.
     *
     * @param array $items
     */
    public function __construct($items = [])
    {
        $this->items = $items;
    }

    /**
     * Fetch the current item.
     *
     * @return mixed
     */
    public function current()
    {
        return current($this->items);
    }

    /**
     * Get the key for the current item.
     *
     * @return mixed
     */
    public function key()
    {
        return key($this->items);
    }

    /**
     * Move the pointer to the next item.
     *
     * @return mixed
     */
    public function next()
    {
        return next($this->items);
    }

    /**
     * Rewind the pointer to the first item.
     *
     * @return integer
     */
    public function rewind()
    {
        return reset($this->items);
    }

    /**
     * Determine if there are more items to iterate over.
     *
     * @return boolean
     */
    public function valid()
    {
        return current($this->items);
    }
}

// Usage:
$collection = new Collection(['a', 'b', 'c']);

foreach ($collection as $item) {
    var_dump($item);
}
```

```php
<?php
class Counter implements Iterator
{
    /**
     * The initial count.
     *
     * @var integer
     */
    protected $start;

    /**
     * The count to end at.
     *
     * @var integer
     */
    protected $end;

    /**
     * The current count.
     *
     * @var integer
     */
    protected $current;

    /**
     * Create a new counter instance.
     *
     * @param integer $start
     * @param integer $end
     */
    public function __construct($start, $end)
    {
        $this->start = $start;
        $this->end = $end;
        $this->current = $start;
    }

    /**
     * Prepare a new counter.
     *
     * @param  integer $start
     * @param  integer $end
     * @return static
     */
    public static function start($start, $end)
    {
        return new static($start, $end);
    }

    /**
     * Fetch the current count.
     *
     * @return integer
     */
    public function current()
    {
        return $this->current;
    }

    /**
     * Get the key for the current item.
     *
     * @return integer
     */
    public function key()
    {
        return $this->current;
    }

    /**
     * Move the pointer to the next item.
     *
     * @return integer
     */
    public function next()
    {
        return $this->current++;
    }

    /**
     * Rewind the pointer to the first item.
     *
     * @return integer
     */
    public function rewind()
    {
        return $this->current = $this->start;
    }
     
    /**
     * Determine if there are more items to iterate over.
     *
     * @return boolean
     */
    public function valid()
    {
        return $this->current <= $this->end;
    }
}

// Usage:
// Or: range(1, 10) :)
foreach (Counter::start(1, 10) as $number) {
    var_dump($number);
}


```