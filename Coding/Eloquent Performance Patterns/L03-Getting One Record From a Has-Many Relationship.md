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
            <!-- take 1, because subquery can only take one column (limit 1)-->
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

        Models back to 15 (only 15 user models, not loading any login models anymore), and memory usage down to 4.06 mb

        And only two database queries

        You might be wondering have we not simply moved our multiple database query problem from laravel to the database layer?

        The answer is yes, and no.

        Yes in that database is technically still responsible for running all of these queries. one query to get the user and then individual sub queries to get the last login date for each user. However, databases are highly optimized for performing tasks like this. They are much better suited for this type of work than laravel or php is. And not only that, for laravel perspective, we're now running only one database query to get this data which means only one round trip from our web server to our database server. The end result is much much better performance.

    At last, let's add dateformating.

    cause  $user->last_login_at is no more carbon date instance, we can not direct use the carbon method.

    query time casting (laravel feature)

    ```php
    public function index()
            {
                $user = User::query()
                    ->addSelect(['last_login_at' => Login::select('created_at')
                    ->whereColumn('user_id', 'users.id')
                    ->latest()
                    ->take(1)
                    ])
                    ->withCasts(['last_login_at' => 'datetime'])
                    ->orderBy('name')
                    ->paginate()
            }
    ```

Last thing to do: move the subquery logic to a scope on the user model

```php
    public function index()
            {
                $user = User::query()
                    ->withLastLoginAt()
                    ->orderBy('name')
                    ->paginate()
            }
```

```php
public function scopeWithLastLoginAt($query)
{
    $query->addSelect(['last_login_at' => Login::select('created_at')
                    ->whereColumn('user_id', 'users.id')
                    ->latest()
                    ->take(1)
                    ])
                    ->withCasts(['last_login_at' => 'datetime'])
}
```
