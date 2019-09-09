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
```
Let's reform it:
```php
function readLogFile($file) {
    $fp = fopen($file, 'r');

    while ($line = fget($fp){
        yield $line;
    })
}

Route::get('/', function(){
    foreach (readLogFile(storage_path('log/laravel-2019-09-03.log')) as $line){
        dump($line);
    }

    return 'Done';
});
```
We could turn it to a lazy collection

```php
Route::get('/', function(){
    // $lines = new LazyCollection(function (){
    $lines  = LazyCollection::make(function (){
        $fp = fopen(storage_path('log/laravel-2019-09-03.log'), 'r');

        while ($line = fget($fp){
            yield $line;
        })
    });

    // or you can continue chaining it
    collection->map(...)

    // You can use any collection methods to iterator it
    $lines->map(function ($line){
        return strlen($line);
    })->all();

    return 'Done';
});
```