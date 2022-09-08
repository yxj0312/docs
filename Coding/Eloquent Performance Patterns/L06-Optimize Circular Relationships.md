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
