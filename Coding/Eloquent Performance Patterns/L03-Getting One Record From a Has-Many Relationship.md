# Getting One Record From a Has-Many Relationship

> In this lesson, we'll review how to fetch one record from a has-many relationship in the most efficient way. It's not enough to simply eager the desired relationship. In some cases, that can actually be worse for performance. Instead, we'll leverage database subqueries.

create_logins_tables.php

```php
public function up()
{
    Schema::create('logins', function(Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users');
        $table->string('ip_address', 50);
        $table->timestamp('created_at')
    });
}

```

User.php

```php
public function logins()
{
    return $this->hasMany(Login::class);
}
```
