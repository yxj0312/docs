# Union and Pseudo Types

> Next up, we'll discuss PHP 8's support for union types, as well as a new catch-all mixed pseudo-type. We can now - without resorting to docblocks - specify that a method parameter may accept multiple types.

```php

class User
{
    public function makeFriendsWith(User $user)
    {
        var_dump('Yay friends');
    }
}

$joe = new User;
$sam = new User;

$joe->makeFriendsWith($sam);
```
