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

To fix it: add a new virtual column for our regular expression table string. Let's also remove the existing index from the name column since we don't need it anymore. This is a good practice, it requires additional disk space and requires additional computation every time a column changes.

```php
public function up()
{
    Schema::create('companies', function(Blueprint $table) {
        $table->id();
        $table->string('name_normalized')->virtualAs("regexp_replace(name, '[^A-Za-z0-9]', '')")->index();
        $table->timestamps();
    });
}

public function up()
{
    Schema::create('users', function(Blueprint $table) {
        $table->id();
        ...
        $table->string('first_name_normalized')->virtualAs("regexp_replace(first_name, '[^A-Za-z0-9]', '')")->index();
        $table->string('last_name_normalized')->virtualAs("regexp_replace(last_name, '[^A-Za-z0-9]', '')")->index();
        ...
    });
}
```

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
                            ->where('first_name_normalized', 'like', $term)
                            ->orWhere('last_name_normalized', 'like', $term)
                            ->union(
                                $query->newQuery()
                                    ->select('users.id')
                                    ->from('users')
                                    ->join('companies', 'companies.id', '=', 'users.company_id')
                                    ->->where('companies.name_normalized', 'like', $term)
                            );
                    }, 'matches')
            });
        });
    
```

Debugbar: 6.87ms
