# Objects

> If a class is the blueprint, then an object is an instance (or implementation) of that blueprint. In this lesson, you'll learn how to create multiple instances of a class, how to define and set internal state, and how to declare static constructors that better reflect how you might speak in real life.

```php
<?php

class Team
{
    protected $name;

    protected $members = [];

    public function __construct($name, $members = [])
    {
        $this->name = $name;
        $this->members = $members;
    }

    // public static function start($name, $members = [])
    public static function start(...$params)
    {
        return new static(...$params);
    }

    public function name()
    {
        return $this->name;
    }

    public function members()
    {
        return $this->members;
    }

    public function add($name)
    {
        $this->members[] = $name;
    }

    public function cancel()
    {
        
    }
}

class Member
{
    protected $name;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function lastViewed()
    {
        
    }

}

// $acme = new Team('Acme');
// $acme = new Team('Acme', [
//     'John Doe',
//     'Jane Doe'
// ]);
// $acme = Team::start('Acme', [
//     'John Doe',
//     'Jane Doe'
// ]);
$acme = Team::start('Acme', [
    new Member('John Doe'),
    new Member('Jane Doe')
]);

$laracasts = new Team('Laracasts');

$foo = new Team('Foo');

// a static method
```