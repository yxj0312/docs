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
        ->with('company')
        ->paginate();
    
    return view('users', ['users' => $users]);
}
```
