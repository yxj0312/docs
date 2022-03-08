# Full Text Indexing

Laravel 9 also includes better support for MySQL or PostgreSQL full text indexing. You'll find a new fulltext() method when preparing new migrations, as well as a whereFulltext() method on your Eloquent builder.

## Blueprint fulltext() Method

```php
$table->text('body')->fulltext();
```

(php artisan migrate:fresh --seed --seeder="Database\Seeders\PostSeeder")

Get FullText Search by WhereFullText()

```php
 Post::whereFullText('body', 'occaecati')->count()
```

You can use php8 attributes:

```php
    #[SearchUsingFullText('body')]
    public function toSearchableArray()
    {
        return [
            'title' => $this->title,
            'body' => $this->body
        ];
    }
```
