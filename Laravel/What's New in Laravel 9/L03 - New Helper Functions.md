# L03 - New Helper Functions

Upon installing Laravel 9, you'll notice two new global helper functions - str() and to_route(). Let's quickly review both.

> Things You'll Learn
>
> - str() Helper Function
> - to_route() Helper Function

## str() Helper Function

```php
// Before L9, Output: HELLO WORLD
Str::of('hello world')->upper();

// L9, you can use helper function
str('hello world')->upper();
```

## to_route() Function

```php
// Before L9
Route::get('/endpoint', function () {
    return redirect()->route('name');
});

//L9
Route::get('/endpoint', function () {
    return to_route('home');
});

```
