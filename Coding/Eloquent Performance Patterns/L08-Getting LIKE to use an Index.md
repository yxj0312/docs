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
