Open php tinker.
### cookie:

cookie unique to a user.

```php
// get
Cookie::get('foo')
//
Cookie::forever('key', 'value');
```

Cookie can be viewed by the client, is unsecured. Laravel will encrypt every single cookie.


### Session

They are unique to the user, be stored on the server.

```php
// get
Session::put('foo', 'bar')
//
Session::get('foo');
```

Session will expire by default. Go to app/config/session.php
```php
'lifetime' => env('SESSION_LIFETIME', 120),
```

Think of it as a 'name-tag'

User sign in your app, they give to you a 'name-tag', this is an unique identifier for them.

Example: Shopping cart:

it is properly been stored in the session, if you abandoned that site and come back a couple days later. The cart will likely be empty.

We can associate any kind of data with key in session
```php
// get
Session::put('foo', [])
//
Session::get('foo');
-> array {

}
Session::push('favorites', 4);
Session::get('favorites');
Session::push('favorites', 9);
Session::get('favorites');
-> array {
    0 => 4,
    1 => 9
}
```

### Caching

all users in your app.

Browser caching:

it is stored in the users machine, we don't have to re-fetch the script, asset, or images every single time.

In Laravel:

you can cache every thing from database queries to rendered view itself.

Example:

Your blog is only updated once a week. It's not necessary for each user to make a database query before they are reaching your website. 

Imaging we have a post model:

```php
// Caching 5 days
// Get all post from the database, cache the query for 7200 min.
// For next 5 days, every time laravel came to this query, it wont have to hit the database.
Post::remember(7200)->get();

```

Cache Facade
```php
Cache::put('favorites', [1,2], Carbon\Carbon::now()->addMinutes(60));
```

After 61 minutes, this will be cleared, and return null.