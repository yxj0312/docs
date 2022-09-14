# Getting LIKE to use an Index

> In this episode, we'll begin optimizing the search query that we wrote in the previous episode. We'll start by adding three indexes, which, surprisingly, doesn't solve the problem. How come?

company migration

```php
public function up()
{
    Schema::create('companies', function(Blueprint $table) {
        $table->id();
        $table->string('name')->index();
        $table->timestamps();
    });
}
```

also add index() to firstname and lastname of user migration.

Debugbar: run time changes to 329ms (slightly increased)

we could use EXPLAIN on the query to look for the reason.

let's pay attention to "possible_keys" and "key" columns:

possible_keys represents indexes that potentially can be used in this query
key represents indexes that are actually being used

So, you can see our indexes for firstname, lastname and company name are not being used at all. The only index that's being used is the primary ID on the company's table.

One of the reasons for this is because of the wild card prefix that have in our search terms. MySQL ist unable to use an index, if  search term starts with a wild card symbol. So let's start by removing that.

Now, firsname, lastname and company name are in the "possible_keys", but still not being used.

So what's preventing our query from using all of these indexes?

If we delete all subqueries, the indexes are used.

So we have two issues:

1. We need to remove the wild card prefix

   ```php
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function scopeSearch($query, String $terms = null)
    {
        
        collect(explode('', $terms))->filter()->each(function($term) use($query){
            $term = $term.'%';
            $query->where(function ($query) use ($term) {
                $query->where('first_name', 'like', $term)
                    ->orWhere('last_name', 'like', $term)
                    ->orWhereHas('company', function($query) use ($term){
                        query->where('name', 'like', $term)
                    });
            });
        });
    }
    ```

    Edge Limit: we can no longer find result when we input 'bill gates microsoft corp'.
    But we can search term like 'bill gates "microsoft corp"'
    '
    We could use the string_getcsv function.

    ```php
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function scopeSearch($query, String $terms = null)
    {
        
        collect(str_getcsv($terms, ' ', '"'))->filter()->each(function($term) use($query){
            $term = $term.'%';
            $query->where(function ($query) use ($term) {
                $query->where('first_name', 'like', $term)
                    ->orWhere('last_name', 'like', $term)
                    ->orWhereHas('company', function($query) use ($term){
                        query->where('name', 'like', $term)
                    });
            });
        });
    }
    ```

1. We need  some solution for the company subquery
