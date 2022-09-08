# Optimize Circular Relationships

check if the user is author for each comment

Comment.php

```php
public function feature()
{
    return $this->belongsTo(Feature::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}


public function isAuthor()
{
    return $this->feature->comment->first()->user_id === $this->user_id;
}
```

Debuggbar:
Before: 3 queries and 61 models

After: We up to 85 database queries (n+1 issue)
and 1783 models (1782 comments within)

in FeaturesController, we already loading all the comments and the users.

```php
public function show(Feature $feature)
{
    $feature->load('comments.user');

    return view('feature', ['feature' => $feature])
}
```
