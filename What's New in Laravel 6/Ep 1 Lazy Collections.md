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

if you dump the projects you will get a lazy collection

you can use a db listener to see what happens:

```php
Route::get('/', function(){
    DB::listen(function ($query) {
        dump($query->sql);
    });

    $projects = \App\Project::cursor();

    return 'Done';
});
```

The benefit is: we performing the query, but we are not loading at all in the memory

### Iterator
```php
Route::get('/', function(){
    $projects = \App\Project::cursor();

    foreach ($projects as $project) {
        logger($project->name);
    }

    return 'Done';
});