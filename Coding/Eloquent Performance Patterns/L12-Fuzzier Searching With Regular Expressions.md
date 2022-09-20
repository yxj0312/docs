# Fuzzier Searching With Regular Expressions

> To finish up this chapter, let's figure out how to make our search a bit more fuzzy by combining regular expressions and virtual indices.

issue: Our users must type the search term exactly as it is or the search will not find a match. i.e "tim oreilly" will not find anything, only "tim o'reilly" can.

Normalization:

I like to normalize the search terms in a regular expression that simply removes all the non alphanumeric characters from the search term as well as from the search columns.

```php
    public function scopeSearch($query, String $terms = null)
    {
        collect(str_getcsv($terms, ' ', '"'))->filter()->each(function($term) use($query){
            // preg_replace function to automatically remove all characters from our serch term that are not an uppercase or lowercase letter or a number.
            $term = preg_replace('/[^A-Za-z0-9]/','',$term).'%';
            $query->whereIn('id', function($query) use ($term){
                $query->select('id')
                    ->from(function ($query) use ($term){
                        $query->select('id')
                            ->from('users')
                            ->whereRaw("regexp_replace(first_name, '[^A-Za-z0-9]', '') like ?", [$term])
                            ->orWhereRaw("regexp_replace(last_name, '[^A-Za-z0-9]', '') like ?", [$term])
                            ->union(
                                $query->newQuery()
                                    ->select('users.id')
                                    ->from('users')
                                    ->join('companies', 'companies.id', '=', 'users.company_id')
                                    ->->whereRaw("regexp_replace(companies.name, '[^A-Za-z0-9]', '') like ?", [$term])
                            );
                    }, 'matches')
            });
        });
    
```

Debuggbar: run time up to 595ms. we are now unable to use our indexes.
