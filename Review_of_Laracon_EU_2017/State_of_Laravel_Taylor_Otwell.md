# State of Laravel 
### Speaker: Taylor Otwell
### Schedule: 2017.8.29 17:00
### Duration: 53:42
### Links: [Taylor Otwell - State of Laravel - Laracon EU 2017](https://www.youtube.com/watch?v=2pLL00WR5iU&index=12&list=PLMdXHJK-lGoBFZgG2juDXF6LiikpQeLx2)
### Contents:
#### Opening:
- in live code the  whole time
- laravel 5.5 stuffs
- laravel horizon/demo for another features

### Misc
- 1:06 - color scheme of sublime text: github inspire/font: operator mono font

### 5.5 Stuffs

- 1:50 -  new helpes: optional

```php 
Route::get('/optional', function() {
    dd(Auth::user());
    
    if(optional(Auth::user())->doSomething(){
        return 'Did Something!'
    })

    return 'Did Nothing'
})
```
> use this, people don't need to check null like

```php
{{Auth::user() && Auth::user()->doSomething() ? 'yes':'no'}}
```
> just

```php
{{optional(Auth::user())->doSomething() ? 'yes': 'no'}}
```
----
- 3:54 - horizon for queue
> https://laravel.com/docs/5.6/horizon

- 5:15 - time-based expirations
> retryUntil method in job

- 6:35 - another approach to how you can deal with job timeouts:
rate limiting
> Duration based rate limiting (using redis)
```php
Route::get('/rate', function(){
    for ($i=0; $i < 10; $i++) { 
        App\Jobs\RateLimitedJob::dispatch();
    }

    return 'OK';
})


public function handle(){
    // 'key' could be: 'job.name'.$this->id
    Redis::throttle('key')->allow(1)->every(5)->then(function() {
        // job logic...

        sleep(1);
    }, function() {
        // with a delay of 10 seconds
        return $this->release(10)
    })
}
```
>Concurrency based rate limiting (using redis)

- 9:30 - lets say: we have four jobs that update like nginx configurations a restart PHP fpm(like forge) and we really only want one job at the time restarting PHP fpm on any given server because if you have a bunch of jobs competing to restart fpm you can kind of get fpm in this you can basically get it in this error state where it's not running at all
```php
Route::get('/concurrent', function() {
    for ($i=0; $i < 10; $i++) { 
        App\Jobs\ConcurrencyLimitedJob::dispatch();
    }

    return 'OK';
})

<!-- Limit to one job running at a time -->
public function handle(){
    Redis::throttle('key')->limit(1)->then(function() {
        info(now()->toDateTimeString());

        sleep(2);
    }, function() {
        return $this->release(2)
    })
}
```

It will be very useful to use the retryUntil method because you don't relly know how long it's gonna be before you can acquire a log you might try you job ten times before a lot becomes available so it's a little bit eaiser to think of it in terms of a time-based timeout instead of  an attempt space timeout beacuase you could have in a lot of attempts without something neccessarily being wrong
```php
public function retryUntil() {

}
```

- 12:02 - throttle: ThrottleRequestWithRedis

> better performance if you're using redis

- 13:22 - carbon

> extend carbon with our own illuminate support carbon
- macro
```php
<!-- define a macro to get UNIX timestamp-->
Route::get('/carbon', functioni(){
    Illuminate\Support\Carbon::macro('unix', function(){
        return $this->format('U');
    });

    return now()->addYears(1)->unix();
    return today('UTC')->addYears(1)->unix();
})
```

### Api Transformation 

- json serializable
```php
Route::get('/carbon-json', function(){
    Illuminate\Support\Carbon::serializeUsing(function ($carbon){
        return $carbon->toDateTimeString();
    });

    $array=[
        'id' => 1,
        'created_at' => now(),
    ];

    return $array;
})
```

- 15:30 - responsable objects...
```php
use Illuminate\Contracts\Support\Responsable;

class SomeResponse implements Responsable
{
    public function toResponse($request)
    {
        return response('Hello Responsable.');
    }
}
<!-- return it directly from a router controller -->
Route::get('/responsable', function(){
    return new SomeResponse;
})
```
> why that is cool?

could be used to build such as a model transformation layer for your apis

```php
use App\Http\Resources\User as UserResource;

Route::get('/resource', function() {
    return new UserResource(User::find(1));
})

<!-- in UserResource -->

public function toArray($request)
{
    // don't have password, because don't wanna provide that in the api
    return [
        'id' => $this->id,
        'name' => $this->name,
        'email' => $this->email,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at
    ];
}

<!-- can also combine the carbon serialziation stuffs -->

Illuminate\Support\Carbon::serializeUsing(function ($carbon){
    // no more timezone and timezone_type in the returning 'created_at' and 'updated_at'
    return $carbon->toDateTimeString();
});
```

- fresh models
```php
Route::get('/create', function(){
    // Note: 201 returned for freshly created models...
    return new UserResouce(factory(User::class)->create());
});
```
- returning multiple resources...
```php
Route::get('/all', function(){
    return UserResource::collection(User::all());
});
```

- collection resource classes...

```php
use App\Http\Resources\UserCollection;

Route::get('/collection', function(){
    return new UserCollection(User::all());
});

<!-- in UserCollection -->

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    // Transform the resource collection into an array.
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'data' => $this->collection,
            // now u have some extra metadata 'links'
            'links' => [
                'some-link' => 'value',
            ]
        ];
    }
}
```
> we hava a user collection, we gonna load all the users and we gonna eager load in all the roles

```php
<!-- Another example -->

class Role extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}

<!-- three ways -->
Route::get('/with',function(){
    return new UserCollection(User::all()->load('roles'));

    return new RoleResource(Role::find(1));

    return (new UserCollection(User::all()->load('roles')))
            ->additional(['meta' => [
                'key' => 'value'
            ]]);
})

<!-- in User Rescource -->

public function toArray($request)
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'email' => $this->email,
        'roles' => Role::collection($this->roles),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}

<!-- json results: -->
{
    "data": [
        {
            "id": 1,
            "name": "123",
            "email": "123@123.com"
            "roles": [
                {
                    "id": 1,
                    "name": "Editor"
                }
            ],
            "created_at": "",
            "update_at": "",
        },
    ]
}
```
- with method in resouce

```php
public function with($request)
{
    return  [
        'meta' => [
            'key' => 'value'
        ],
    ];
}

<!-- json results: -->
{
    "data": {
        "id": 1,
        "name": "Editor"
    },
    "meta": {
        "key": "value"
    }         
},
```
- Collection: pagination

- "Data" wrapping
```php
Route::get('/wrapping', function() {
    Resource::withoutWrapping();

    return new UserCollection(User::all()->load('posts'));

    return new PostCollection(Post::all());

    return new UserCollection(usr::paginate());
})
```
> withWrapping: all of them have been wrapped with data on the outside like:
```php
{
    "data":[
        {
            "id": 1,
            ...
        }
    ]
}
```
>without:
```php
[
    {
        "id" : 1,
        ...
        ...
    }
]
```
> laravel can check things like 'data.data' and prevent them.

> even if u use withoutwrapping, there are still a data in your pagination collection.

- 31:32 - resources can return  a JSON serializable object

```php
class JsonApiResource implements JsonSerializable
{
     public function __constuct($resource)
     {
         $this->resource = $resource;
     }

     public function jsonSerialize()
     {
         return [
            'id' => $this->resource->id,
         ];
     }
}

<!-- in resource -->
public function toArray($request)
{
    return new \JsonApiResource($this->resource);    
}
```

- 33:12 Customizing the response (like header)
```php
Route::get('/response', function() {
    return (new UserCollection(User::all()))
        ->response()
        ->header('X-Conference','Laracon EU 2017');
    

    return new UserCollection(User::all());
})

<!-- 2nd Way to do it , on the usercollection -->
public function withResponse($request, $response)
{
    $response->header('X-Conference','Laracon EU 2017');
}
```

- 34:35 -  Cleaning up conditionals
```php
<!-- in collection toArray  if u do like the followings -->
'secret' => $this->isAdmin() ? 'value' : null,
<!-- U will get the 'secret' all the time, even 'isAdmin' is false, u will get a null value -->

<!-- Instead we can do this-->
'secret' => $this->when($this->isAdmin(), 'secret-value')
<!-- in this case, 'secret' will be entirely removed from the array -->
```
- for multiple values
```php
$this->mergeWhen($this->isAdmin(), [
    'secret1' => 'value',
    'secret2' => 'value',
]),
```
> this could also take a closure, do some expensive calculation or DB call

```php
$this->mergeWhen($this->isAdmin(), function (){
    return [    
        'secret1' => 'value',
        'secret2' => 'value',
    ];
}),
```
- also useful in relationships

> what if I want to always show the blog posts for the users in this response
```php
Route::get('/relations', function () {
    // way 1
    return new UserCollection(User::all());

    // way 2,'whenLoaded'
    return new UserCollection(User::all()->load('posts'));
})
```
one way: in collection toArray add:
```php
'posts' => new PostCollection($this->posts)
```
Now we get the post everytime. This can cause problem, because it can lead to n+1 problems on your API transform where every user is pulling all of its posts individually and you're sort of not eager loading. You could be gonna have a lot of extra database queries.

Instead,  we can do this:
```php
'posts' => new PostCollection($this->whenLoaded('posts'))
```
which means, I only want to include the posts when they're already been loaded when they're already on this user

- pivot table

this can also used for pivot table.
```php
'expires_at' => $this->whenPivotLoaded('role_users', function(){
    return $this->pivot->expires_at; 
})
```
### FAQ
