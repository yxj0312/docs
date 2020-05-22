# Value Objects and Mutability

> A value object is an object whose equality is determined by its data (or value) rather than any particular identity. To illustrate this, imagine three five dollar bills resting on a table. Does one bill have a unique identity compared to the other two? From our perspective, no. Five dollars is five dollars regardless of which bill you choose. However, compare this with two human beings who have the same first and last name. Are they identical, or does each person have a unique identity? Of course in this case, the latter is the correct answer.

## Value object

### Example

```php
public function register(string $name, int $age)
{
    // #codes
}

register('John Doe', 35);
// invalid
register('John Doe', -35);
register('John Doe', 500);
```

However the age can not be minus. To fix that, we can add a basic validation like

```php
public function register(string $name, int $age)
{
    if ($age < 0 || $age > 120) {
        throw new InvalidArgumentException('That makes no sense');
    }
}

register('John Doe', -35);
```

We were making a brand new type, it's not only an integer, which we call a value object.

```php
class Age
{
    public $age;

    public function __construct($age)
    {
        if ($age < 0 || $age > 120) {
            throw new \InvalidArgumentException('That makes no sense');
        }

        $this->age = $age;
    }
}

public function register(string $name, Age $age)
{

}

register('John Doe', -35);

<!-- it works as well -->
register('John Doe', new Age(500));
```

However, because $age is public,  we could bypass this validation by:

```php
$age = new Age(35);

$age->age = 500;

// run the code and it works
register('John Doe', $age);
```

To fix this: changing it to private

Then how to do if u wanna change the age?

```php
// u do it like u do it with an integer
...
$age = 36;
```

## Mutability

### Mutable vs. Immutable

A mutable object is an object, whose stats can be changed (in a class).

Immutable: stats can/should be never changed.

#### Mutable example

```php
class Age
{
    ...

    public function increment()
    {
        $this->age += 1;
    }

    public function get()
    {
        return $this->age;
    }

    $age = new Age(35);
    $age->increment();
    // 36
    var_dump($age->get());
}
```

#### Immutable example

```php
class Age
{
    ...

    public function increment()
    {
        // self: A new instance of the class
        return new self($this->age + 1);
    }

    public function get()
    {
        return $this->age;
    }

    $age = new Age(35);
    $age = $age->increment();
    // 36
    var_dump($age->get());
}
```

### Benefits of value object

1. Avoids primitive obsession - and readability.

2. Helps with consistency.

3. Benefits of immutability (By avoiding any sets Benefits of immutability. and set to private).

### Real world cautions

1. Too many value object:

```php
public function register(FirstName $first, LastName $last, Age $age,EmailAddress $email, Password $password)
{
    
}
```

2. Two different sets of data are joined or connected.

```php
class Coordinates
{
    private $x;
    private $y;

    public function __construct($x, $y)
    {
        $this->x = $x;
        $this->y = $y;
    }
}

// public function pin($x, $y)
// {
    
// }
// refactor to 

public function pin(Coordinates $coordinates)
{
    // #codes
}


// coordinate
// public function distance($x1, $y1, $x2, $y2)
// {
    
// }
// refactor to
public function distance(Coordinates $begin, Coordinates $end)
{
    // #codes
}
```

Another example of connected data

```php
    class DateSpan
    {

    }

    public function scheduleVacation($arrive, $depart)
    {
        
    }
```
