# Enum Attribute Casting

Now that PHP 8 offers first-class support for enums, Laravel 9 has been updated to include Eloquent attribute casting to and from an enum object.

1. We can now create a enum class since php 8.1

```php
<?php

namespace App\Enums;

enum PostState
{
    case Draft;
    case Published;
    case Archived;
}
```

2. We should also in migration do:

```php
$table->enum('state', ['draft', 'archived', 'published']);
// $table->string('state')->default('draft');
```

You might 1 and 2 are a little bit duplicated?

You can do:

```php
$table->enum('state', PostState::class);
```

Problem: work in different team, and some one changed the class.

Attribute castings is a two way casting. we got add some values to:

```php
<?php

namespace App\Enums;

enum PostState: string
{
    case Draft = "draft";
    case Published = "published";
    case Archived = "archived";
}
```

now PostState is an object, we can get its value by:

```php
return Post::first()->state->value;
```

We can set state like:

```php
$post = new Post;

$post->user_id = 1;
$post->title= 'My title';
$post->body = 'My body';

$post->state = PostState::Published;

$post->save();

return 'Done';
```

get State by uri wildcard binding

```php
Route::get('/posts/{state}', function(PostState $state){
    dd($state);
});
```
