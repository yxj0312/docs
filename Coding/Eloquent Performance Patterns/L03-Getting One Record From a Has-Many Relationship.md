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

- n+1 issue

    We are now running 17 database queries, 15 are the same->n+1 issue

    if our page displays 50 users, we are now executing a total of 52 queries.

    Better solution: eager loading

    UsersController.php

    ```php
    public function index()
    {
        $users = Users::query()
            ->with('logins')
            ->orderBy('name')
            ->paginate();
    }
    ```

    ```php
    {{ $user->logins()->sortByDesc('created_at')->first()->created_at->diffForHumans() }}
    ```

    Now queries down to 3.

- Some big problems: Models has been called 7515 times
  memory usage up to 13.24mb

  - Solution 1: cache the last login on the users table
  
        add  following to users table

        ```php
        $table->foreignId('last_login_id')->constrained('logins')
        ```

        and whenever a user logs in, we'll create a new login record and then simply update this new last login ID column on the user's table. And from there we can just use a normal last login relationship on our user model

        However, quite often caching isn't this simple in fact caching can get ridiculously complicated ridiculously fast.

    - Solution 2: subqueries
  
        subqueries allow us to add extra columns to our query that are computed from another table.

        we can run a sub query within our user's query to automatically get the user's last login

        let's remove usersController eager load first

        UsersController

        ```php
            <!-- take 1, because subquery can only take one column-->
            public function index()
            {
                $user = User::query()
                    ->addSelect(['last_login_at' => Login::select('created_at')
                    ->whereColumn('user_id', 'users.id')
                    ->latest()
                    ->take(1)
                    ])
            }
            
        ```

        blade file

        ```php
            {{ $user->last_login_at }}
            
        ```
