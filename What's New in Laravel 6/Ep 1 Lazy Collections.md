### Example

say: we have a route:

```php
Route::get('/', function(){
    $projects = \App\Project::all();

    return 'Done';
});
```

If there are two many projects, it blows up because our memorey limits.

In this situation, we not only query so many projects, but also create so many projects collections.

### Lazy Collection

```php
Route::get('/', function(){
    $projects = \App\Project::cursor();

    return 'Done';
});
```

cursor() will run our query and return a generator.