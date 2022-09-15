# Faster Options Than whereHas

> We still have an issue where our indexes are not properly being leveraged. In this lesson, we'll explore some alternative options that should fix this and lead to faster query speeds.

Approach one: joins

```php
    public function scopeSearch($query, String $terms = null)
    {
        $query->join('companies', 'companies.id', '=', 'users.company_id');

        collect(str_getcsv($terms, ' ', '"'))->filter()->each(function($term) use($query){
            $term = $term.'%';
            $query->where(function ($query) use ($term) {
                $query->where('first_name', 'like', $term)
                    ->orWhere('last_name', 'like', $term)
                    ->orWhere('companies.name','like',$term);
            });
        });
    }
```

We are now 322ms. our indexes are being listed in the possible_keys column, but still not used.

Approach two:

We're directly linking the users and the company's tables together. Both of these  approaches require us to check the company ID against the user's company ID. As a result, the companies table is essentially become a dependency of the user's table. Another way to tackle this problem is using a whereIn clause. It will let us remove the dependency between the tables.

```php
    public function scopeSearch($query, String $terms = null)
    {
        collect(str_getcsv($terms, ' ', '"'))->filter()->each(function($term) use($query){
            $term = $term.'%';
            $query->where(function ($query) use ($term) {
                $query->where('first_name', 'like', $term)
                    ->orWhere('last_name', 'like', $term)
                    ->orWhereIn('company_id',function($query) use ($term) {
                        $query->select('id')
                            ->from('companies')
                            ->where('name', 'like', $term)
                    });
            });
        });
    }
```

Run time: 113ms, our companies_name_index is being used
