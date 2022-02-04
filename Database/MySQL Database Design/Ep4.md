# Laravel and Foreign Key Constraints

> Now that you understand keys a bit more, let's switch over to a fresh Laravel app and review how we can represent these relationships and constraints through Laravel migrations.

## Tips and Notes

- Normally you can create a foreign key with type unsignedBigInteger. Up laravel 5.8 all new migrations hat the primary key set to a bigInteger(bigIncrements), make sure that the fk also has the exact same type with pk.

- Set up a fk constraint:

```php
$table->foreign('post_id')
    ->references('id')
    ->on('posts')
    ->onDelete('cascade')
    // default is restrict, no action
```
