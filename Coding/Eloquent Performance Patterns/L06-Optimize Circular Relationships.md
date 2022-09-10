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

we need the feature for every comment and we need the comments for that feature, let's add that:

```php
public function show(Feature $feature)
{
    $feature->load('comments.user', 'comments.feature.comments');

    return view('feature', ['feature' => $feature])
}
```

Debuggbar:

we back down to 5 queries, but still 103 models (82 comment models)

look at query: we load feature and comment and then we load them once again.

Another approach:

```php
public function show(Feature $feature)
{
    $feature->load('comments.user');

    // iterate through each comment
    // manually set the relationship
    // pass the $feature that we've already had in the memory
    $feature->comments->each->setRelation('feature', $feature)

    return view('feature', ['feature' => $feature])
}
```

Debuggbar:

back down to 3 queries and 61 models

The reason it works: set relation eloquent method.

Eloquent users this method anytime. It loads a relationship and that has to assign it to a specific model. What would essentially done here is manually eager load the feature for all of these comments except we didn't actually have to load it from the database because we already have that feature in memory.

So next time you run into a situation like this where you have a circular relationship definitely keep the set relation method in mind.
