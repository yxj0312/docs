# Union and Pseudo Types

> Next up, we'll discuss PHP 8's support for union types, as well as a new catch-all mixed pseudo-type. We can now - without resorting to docblocks - specify that a method parameter may accept multiple types.

```php

class User
{

    /**
     * @param User|string $user
     */
    // before php 8, set ? for null situation, or doc types
    public function makeFriendsWith(?User $user)
    {
        var_dump('Yay friends');
    }
}

$joe = new User;
$sam = new User;

$joe->makeFriendsWith($sam);
$joe->makeFriendsWith(null);
```

```php
class User
{
    // for php 8
    // or public function makeFriendsWith(User|string $user)
    public function makeFriendsWith(User|null $user)
    {
        var_dump('Yay friends');
    }
}

```

```php
class User
{
    
    public function cancel(boll $immediate = false)
    {
        var_dump('Yay friends');
    }
}

$joe = new User;
$joe->cancel();
$joe->cancel(true);

// will it be accepted?
$joe->cancel('next week');

// The answer is yes! Php prase that string into a boolean.

// we can use declare type to avoid this.
declare(strict_types=1);
```

If we want this to work, we need a union type

```php
class User
{
    
    public function cancel(boll|string $immediate = false)
    {
        var_dump('Yay friends');
    }
}
```
