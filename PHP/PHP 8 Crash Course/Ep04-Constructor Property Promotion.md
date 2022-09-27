# Constructor Property Promotion

> Next up is constructor property promotion, which allows you to remove much of the tedious class initialization boilerplate code that you likely write for every any that accepts a dependency.

```php
class Signup
{
    protected User $user;
    protected Plan $plan;

    public function __construct(User $user, Plan $plan)
    {
        $this->user = $user;
        $this->plan = $plan;
    } 
}
```

PHP 8

```php
class Signup
{
    protected User $user;
    protected Plan $plan;

    public function __construct(User $user, Plan $plan)
    {
        $this->user = $user;
        $this->plan = $plan;
    } 
}
```
