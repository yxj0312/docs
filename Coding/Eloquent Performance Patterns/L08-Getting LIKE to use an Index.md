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
