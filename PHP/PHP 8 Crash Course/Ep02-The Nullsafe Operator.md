# The Nullsafe Operator

> First up on the agenda is the new Nullsafe operator. This operator - represented as a question mark - allows you to call a method on the result of any expression if it does not evaluate to null. It sounds confusing, but it really isn't. Let's have a look.

```php
class User {
    public function profile()
    {
        // return new Profiles;
        return null;
    }
}

class Profile {
    public function employment()
    {
        return 'web developer';
    }
}


$user = new User;

// NULL (doesn't blow up)
// echo $user->profile()?->employment();
echo $user->profile()?->employment() ?? 'Not Provided';

```
