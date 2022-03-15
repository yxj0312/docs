# Consider API Resources

Next up, we can move on to API resources, which I leverage heavily in my own projects. Think of an API resource as a transformer class that converts an Eloquent model instance into its respective JSON representation. While models can do this automatically, resource classes provide a greater level of configurability.

## API Resources

```php
return UserResource::collection(User::all());
```

You can disable the data wrapping by in AppServiceProvider

```php
public function boot()
{
    // JsonResource::withoutWrapping();
}
```

override toArray method in userResource

```php
public function toArray($request)
{
   return [
            'id' => $this->id,
            'name' => $this->name,
            'can' => [
                'edit' => Auth::user()->can('edit', $this->resource)
            ]
        ];
}
```

```php
 'users' => UserResource::collection(User::query()->when(Request::input('search'), function ($query, $search) {
        $query->where('name', 'like', "%{$search}%");
    })->paginate(50)->withQueryString()),
```

for show method

```php
'user' => UserResource::make($user)
```

## Conditional Loading

## Handling Pagination
