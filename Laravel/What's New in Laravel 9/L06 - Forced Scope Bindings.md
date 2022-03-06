# Forced Scope Bindings

In Laravel 9, you can now "turn on" forced scope bindings in your route declarations through a simple method call. You may find that this adds just a bit more clarity and intent.

First, we use ```touch database/database.sqlite```
to create a sqlite database, and migrate a post table

We could use following route to get the posts:

```php
Route::get('/users/{user}/posts/{post}', function(User $user, Post $post){
    return $post;
});
```

when u visit: /users/1/posts/1

```json
{
"id": 1,
"user_id": 1,
"title": "Ut qui accusamus autem ut.",
"body": "Labore deserunt dolorem vel. Harum aut sed earum corporis. Qui iure est occaecati delectus qui voluptatem. Et repellendus qui atque. Id ea quia id ipsam unde voluptatem.",
"created_at": "2022-03-05T22:08:32.000000Z",
"updated_at": "2022-03-05T22:08:32.000000Z"
}
```

/users/1/posts/9

```json

"id": 9,
"user_id": 9,
"title": "Molestiae similique rem qui officiis voluptates ut minus.",
"body": "Eum quia et eligendi voluptatibus velit quasi. Dicta modi aut sed eum in sequi cum. Quae consequatur velit accusantium nisi. Qui et et rerum vel ratione sint quo in.",
"created_at": "2022-03-05T22:08:33.000000Z",
"updated_at": "2022-03-05T22:08:33.000000Z"
}
```

the second one actually belongs to user id 9, not user 1

You can use scope bindings to not allow it.

By L9, you can do:

```php
Route::get('/users/{user}/posts/{post:id}', function(User $user, Post $post){
    return $post;
});
```

(it will verify the posts method in your user class.)

and create a posts() method in the User class

```php
public function posts()
{
    return $this->hasMany(Post::class);
}
```

And now we try it again, we go a 404 response, which is we expected.

cause post id 9 did not belong to user 1.

But we will have no problem to get users/1/posts/1

You can also do:

```php
Route::get('/users/{user}/posts/{post}', function(User $user, Post $post){
    return $post;
})->scopeBindings();
```

to realize this.
