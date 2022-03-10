# Simplified Accessors and Mutators

Laravel's traditional getXAttribute and setXAttribute API for declaring accessors and mutators is not going away; however, there's a new, simplified approach that will be recommended going forward. Let's have a look.

```php

class Post extends Model
{
    use HasFactory, Searchable;

    protected $casts = [
        'state' => PostState::class
    ];

    protected $appends = [
        'path'
    ];

    public function path(): Attribute
    {
        return Attribute::get(fn() => route('posts.show', $this));
        // return new Attribute(fn() => route('posts.show', $this));
    }
}
```

- set example

```php
public function username(): Attribute
{
    return new Attribute(
        fn($value) => ucwords($value),
        fn($value) => strtolower($value)
    );
}

//or

 public function username(): Attribute
{
    return new Attribute(
        get: fn($value) => ucwords($value),
        set: fn($value) => strtolower($value)
    );
}

```
