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
    ]);
}

```

However this time we're gonna automatically eager load our last login relationship
