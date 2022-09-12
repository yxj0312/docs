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
        $query->where('first_name', 'like', $term)
        ->orwhere('last_name', 'like', $term)
    });
}
```
