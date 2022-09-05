# Dynamic Relationships Using Subqueries

> In the last episode, we learned how to use subqueries to fetch a single relationship from a has-many relationship in the most optimal way. Now, we'll take that technique one step further!

Example: If we want to add additional infos for last login (i.e. IP Address)

```php
public function scopeWithLastLoginIpAddress($query)
{
    $query->addSelect(['last_login_ip_address' => Login::select('ip_address')
                    ->whereColumn('user_id', 'users.id')
                    ->latest()
                    ->take(1)
                    ]);
}

// blade

{{ $user->last_login_ip_address }}
```

but if we have another requirement, like generate last login links, it would be nice if we still have Login models and relationships

However this time we're gonna automatically eager load our last login relationship anytime this scope get called.

When using this  technique, eloquent has no idea that the last_login_id column isn't a real column. meaning everything just works as if it is.

User.php

```php
// we need to 'last_login_id' column in user table which we don't have
// so we need a sub query below
public function lastLogin()
{
    return $this->belongsTo(Login::class);
}

public function scopeWithLastLogin($query)
{
    $query->addSelect(['last_login_id' => Login::select('id')
        ->whereColumn('user_id', 'users.id')
        ->latest()
        ->take(1)
    ])->with('lastLogin');
}

```

update the query in the usersController

```php
public function index()
{
    $users = User::query()
        ->withLastLogin()
        ->orderBy('name')
        ->paginate();
}
```

and user's blade view, using last login relationship instead of last_login_at attribute

```php
{{ $user->lastLogin->create_at->diffForHumans }}

{{ $user->lastLogin->ip_address }}
```

You can't lazy load Dynamic relationships and this is because unless we explicitly call the with lastLogin scope.No last_login_id will be  present  on the model.However, I don't find this to be an issue since I tend to use Dynamic relationships and situations where I have already trying to solve a performance issue and in those situations lazy loading is generally not the best approach anyway.

If we could avoid all this work by simply using a has-one relationship with an order by?

Answer is no

```php

public function lastLogin()
{
    return $this->hasOne(Login::class)->latest();
}

public function index()
{
    $users = User::query()
        ->orderBy('name')
        ->paginate();
}

```

Debuggbar
Still 15 App\Login Models and 15 App\User Models
However, queries up to 17, (n+1 issue again)

If using eager loading

```php
public function index()
{
    $users = User::query()
        ->with('lastLogin')
        ->orderBy('name')
        ->paginate();
}

```

Back to 3 Database Queries
but back to 7515 Models.

Since laravel can't set a limit when eager loading the lastLogin relationship since it needs to get multiple records one for each user.

just underline why laravel works this way less force a wy to limit on our lastLogin relationship.

```php

public function lastLogin()
{
    return $this->hasOne(Login::class)->latest()->limit(1);
}

```

we will get error: trying to get property 'created_at' of non-object

it's because our view assumes that each user has a last_login record

if we add a if statement in the blade view

```php
@if ($user->lastLogin) {
    {{ $user->lastLogin->create_at->diffForHumans }}
}
@endif
```

and you can see we're only getting the last login information for one user.
