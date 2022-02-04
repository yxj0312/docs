# Encapsulation

> Encapsulation allows a class to provide signals to the outside world that certain internals are private and shouldn't be accessed. So at it's core, encapsulation is about communication.

Example:

```php
class Person
{
    public $name;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function job()
    {
        return 'software developer';
    }

    public function favoriteTeam()
    {
        
    }

    private function thingsThatKeepUpAtNight()
    {
        
    }
}

$bob = new Person('Bob');

var_dump($bob->job());
```

public, private, protected:

public: it's public to the world.

private: this method is private to me.

how to call a private method outsides:
```php
$method = new \ReflectionMethod(Person::class, 'thingsThatKeepUpAtNight');
$method->setAccessible(true);

$person = new Person('Bob');
$method->invoke($person);
```

Problem of public

```php
$person = new Person('Bob');
// even if  it should never be allowed, but it sets to public, it can be done.
$person->name = null

```

Protected: protected encapsulation is the same as private but can be extended to the child/subclasses.

Another Example

```php
class TennisMatch
{
    protected $playerOne;

    public function score()
    {
        // is there a winner
        // does someone have an advantage
        // are they in deuce
    }

    // getter to access protected property
    public function playOne()
    {
        return $this->playerOne;
    }

    protected function hasWinner()
    {
        
    }

    protected function hasAdvantage()
    {
        
    }

    protected function inDeuce()
    {
        
    }
}
```

laravel protected example

```php
protected $fillable = ['code', 'canceled', 'team_id', 'recipient'];
```