# When it Makes Sense to Run Additional Queries

> In the last episode, we discussed how using a whereIn subquery can be much faster than whereHas. But now, let's review a more radical approach for solving this problem: running multiple database queries

Isolation the query make the query to use all the indexes and much faster

```php
    public function scopeSearch($query, String $terms = null)
    {
        collect(str_getcsv($terms, ' ', '"'))->filter()->each(function($term) use($query){
            $term = $term.'%';
            $query->where(function ($query) use ($term) {
                $query->where('first_name', 'like', $term)
                    ->orWhere('last_name', 'like', $term)
                    ->orWhereIn('company_id', Company::query()
                        ->where('name', 'like', $term)
                        ->pluck('id'));
            });
        });
    }
```

Debuggbar:

3.93ms for run time
