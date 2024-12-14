# Laravel's Service Container Explained in One Minute

<https://laracasts.com/series/jeremys-larabits/episodes/16>

Service Container

It is responsible for managing the dependencies that are created and provided to other parts of your application.

It is a box that you can put things into, and whenever you need to use those things, you can just reach in, grab a copy, and then use it wherever you need in your application.

Example:

```php

use Illuminate/Http/Request;
use Illuminate/Support/Facades/Route;

Route::get('/example', function(Request $request){
    $input = $request->input('key');

    return $input;
});
```

The Route depends upon the Request object, So Laravel is going to reach into the Service Container, it is going to pull out a copy of the request object, and provide it to our closure.

It is what we call zero configuration resolution.
