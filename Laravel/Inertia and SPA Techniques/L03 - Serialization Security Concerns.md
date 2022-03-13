# Serialization Security Concerns

Let's next move on to some potential security concerns that you might run into when converting a large server-side application to an SPA. You can of course no longer blindly pass an Eloquent model or collection to the client. Instead, it's vital that you be conscientious about every attribute you pass. Let's review a few options you might consider.

## Eloquent Serialization

```php
protected $visible = [
    'name',
    'email'
];

// or
protected $visible = [
    '*'
];

```

## Overriding toArray()

override toArray method in the model

for example

```php
public function show(User $user)
{
    return Inertia::render('Users/Show', [
        'user' => $user->only(['id', 'name', 'email', 'created_at'])
    ]);
}


public function toArray()
{
    return [];
}
```

## Hiding Attributes

```php
protected $hidden = [
    'password',
    'stripe_token'
];
```
