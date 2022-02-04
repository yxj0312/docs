> Because the web is stateless, we can use sessions as a mechanism for recording important user information from page to page. In this lesson, we'll review the basic sessions API and flash messaging. Finally, for extra credit, we'll review how to make Composer autoload a helpers.php file that contains useful helper functions for our application.

config->session.php: default driver: encrypted cookie, redis, database, memcached, file..

If hundred different people access the application, and hit the route, they are not going to share the same session data. Session data is unique to the current users session.

users session vs. cache

Use helper function
```php
Route::get('/session', function(){
    // get the session
    // return session('name', 'A default value');
    // Set a session
    session(['name' => 'JohnDoe']);
    // you can push the session to a array
    session(['name' => 'JohnDoe']);

    return view('welcome');
});
```

Alternatively you fetch of the request 
```php
Route::get('/session', function(Request $request){
    $request->session()->put('foobar', 'baz');

    // return $request->session()->get('foobar');

    return view('welcome');
});
```

Flash messaging
```php
Route::post('/projects', function(){
    // validate the project
    // save the project

    // Difference 1. store into the session, 2. stored in a single request.
    // session(['message' => 'Your Project has...']);
    session()->flash('message', 'Your project has been created.');

    return redirect('/');
});
```

Helper function
GO to composer.json find "autoload" add "file"

```php
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        },
        "classmap": [
            "database/seeds",
            "database/factories"
        ],
        "files": [
            "app/helpers.php"
        ]
    },
```

remember to run composer dump-autoload

Then go to autoload_files.php, you should see your helpers.php

Then you need to register it in the service provider. see https://tutsforweb.com/creating-helpers-laravel/ for more details.