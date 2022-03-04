# L01 - Controller Router Groups

First up on our list is a new Route::controller() method that may help to shorten and simplify routes that share a common controller namespace.

```php
Route::get('/posts', [PostsController::class, 'index']);
Route::get('/posts/{post}', [PostsController::class, 'show']);
Route::post('/posts/', [PostsController::class, 'store']);
```

In Laravel 9, we could do:

```php
Route::controller(PostsController::class)->group(function() {
    Route::get('/posts', 'index');
    Route::get('/posts/{post}', 'show');
    Route::post('/posts/', 'store');
});
```
