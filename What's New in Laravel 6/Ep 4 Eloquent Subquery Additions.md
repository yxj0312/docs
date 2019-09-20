## Add a subquery
```php
App\User::addSelect(['last_watched_video' => function ($query) {
    $query->select('lessson_id')
        ->from('watching')
        ->whereColumn('user_id', 'users.id')
        ->limit(1)
        ->latest();
}])->find([41, 50]);
```
=> all: [
    App\User {
        id: 41,
        name: "
        ...
        last_watched_video: 1044,
    },

    App\User {
        id:50,
        name:
        ...
        last_watched_video: 1158
    }
]

### what's happening there
```php
DB::listen(function ($query) { var_dump($query->sql);});
```

## Another example: grap our users, order them according to those who recently watched videos.
```php
App\User::orderByDesc(function ($query){
    $query->select('created_at')
        ->from('watching')
        ->latest()
        ->whereColumn('user_id', 'users.id')
        ->limit(1);
})->find(41, 50)
```