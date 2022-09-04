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
