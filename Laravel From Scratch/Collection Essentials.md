https://laracasts.com/series/laravel-from-scratch-2018/episodes/35

Some usages:
```php
$users->first()
$users->last()
$user->find(4)
```
Go to '\Illuminate\Support\Collection.php' We got more, like:
```php
where(), each(), every()...

$users->where('email','xyz@email.com')->first();
```

```php
$users->pluck('email')
```
This returns a new collection which only email items

You can convert that to array with
```php
$users->pluck('email')->toArray();
```

Another way to do this is map():
```php
$users->map(function ($user) { return $user->name });
```

Another option is filter():
```php
$users->filter(function ($user) { return $user->id >= 3; });
```
Some examples:
```php
collect(['foo', 'bar', 'baz'])->map(function ($item) {
    return strtouppper($item);
});
```

```php
$song1 = (object) ['name' => 'Something', 'length' => 300];
$song2 = (object) ['name' => 'Foobar', 'length' => 200];
$song3 = (object) ['name' => 'Foobar Buzz', 'length' => 400];

$songs = collect([$song1, $song2, $song3]);

$songs->pluck('name');
$songs->pluck('length');
$songs->sum('length');
```

Higer order collections:
test
