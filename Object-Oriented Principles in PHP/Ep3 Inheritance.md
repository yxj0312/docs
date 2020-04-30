# Inheritance

> Inheritance allows one object to acquire or inherit the behaviors of another object.

- Example 1
  
```php
<?php

class CoffeeMaker
{
    public function brew()
    {
        var_dump('Brewing the coffee');
    }
}

(new CoffeeMaker()->brew());


class SpecialtyCoffeeMaker extends CoffeeMaker
{
    public function brewLatte()
    {
        var_dump('Brewing a latte');
    }
}

(new SpecialtyCoffeeMaker()->brew());
(new SpecialtyCoffeeMaker()->brewLatte());

```

- Example 2

```php
<?php

class Collection
{
    protected array $items;

    public function __construct(array $items)
    {
        $this->items = $items;
    }

    public function sum($key)
    {
        // return array_sum(array_map(function ($items) use ($key){
        //     return $item->$key;
        // }, $this->items));

        // refactor:
        return array_sum(array_column($this->items, $key));
    }
}

class Video
{
    public $title;
    public $length;

    public function __construct($title, $length)
    {
        $this->title = $title;
        $this->length = $length;
    }
}

$collection = new Collection([
    new Video('Some Video', 100);
    new Video('Some Video 2', 200);
    new Video('Some Video 3', 300);
])

$collection->sum('length');

// "is a" relationship
// In this case, length is unique to videos, so it doesn't make sense to have a length() method in Collection class.
class VideosCollection extends Collection 
{
    public function length()
    {
        return $this->sum('length');
    }
}

$videos = new VideosCollection([
    new Video('Some Video', 100);
    new Video('Some Video 2', 200);
    new Video('Some Video 3', 300);
])

$videos->length();

```

- Example 3

```php
class Post extends Model
{
    
}
```
