1. Add a subquery
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