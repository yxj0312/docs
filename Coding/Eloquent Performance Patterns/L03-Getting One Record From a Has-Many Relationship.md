# Getting One Record From a Has-Many Relationship

> In this lesson, we'll review how to fetch one record from a has-many relationship in the most efficient way. It's not enough to simply eager the desired relationship. In some cases, that can actually be worse for performance. Instead, we'll leverage database subqueries.

Example: we want to get the user's last login date.

create_logins_tables.php

```php
public function up()
{
    Schema::create('logins', function(Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users');
        $table->string('ip_address', 50);
        $table->timestamp('created_at')
    });
}

```

User.php

```php
public function logins()
{
    return $this->hasMany(Login::class);
}
```

blade file

```php
{{ $user->logins()->latest()->first()->created_at->diffForHumans() }}
```

Debugbar:

We are now running 17 database queries, 15 are the same->n+1 issue

if our page displays 50 users, we are now executing a total of 52 queries.
