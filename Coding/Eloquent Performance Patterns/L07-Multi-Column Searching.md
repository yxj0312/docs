# Multi-Column Searching

> Let's now begin a new chapter, where we build out a search feature using only string matching and the LIKE operator.

image we have an application, when someone search term, we want to filter the results to only users that have a match against their first name or their last name or their company name.

This application has two models: a user model and a company model
every user belongs to a company

UsersController

```php
public function index()
{
    $users = User::query()
        ->search(request('search'))
        ->with('company')
        ->paginate();
    
    return view('users', ['users' => $users]);
}
```

let's add search scope in the user model

```php
public function company()
{
    return $this->belongsTo(Company::class);
}

public function scopeSearch($query, String $terms = null)
{
    // wrap it in a collection, so we can do subsequent operations on it
    // explode the search terms using a space as the delimiter
    // we'll filter out any blank values
    // and then we'll iterate through each term to add the necessary query logic
    collect(explode('', $terms))->filter()->each(function($term) use($query){
        $term = '%'.$term.'%';
        // we want to check each keyword in isolation
        // we need to wrap our orWhere conditions in a closure
        $query->where(function ($query) use ($term) {
            $query->where('first_name', 'like', $term)
                ->orWhere('last_name', 'like', $term)
                // company info doesn't exist in users' table
                // orWhereHas accepts the relationship name as the 
                //first argument and a closure as a second argument 
                // which receives an instance of the query builder
                ->orWhereHas('company', function($query) use ($term){
                    query->where('name', 'like', $term)
                });
        });
    });
}
```
