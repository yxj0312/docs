# Enum Attribute Casting

Now that PHP 8 offers first-class support for enums, Laravel 9 has been updated to include Eloquent attribute casting to and from an enum object.

1. We can now create a enum class since php 8.1

```php
<?php

namespace App\Enums;

enum PostState
{
    case Draft;
    case Published;
    case Archived;
}
```

2. We should also in migration do:

```php
$table->enum('state', ['draft', 'archived', 'published']);
// $table->string('state')->default('draft');
```

You might 1 and 2 are a little bit duplicated?

You can do:

```php
$table->enum('state', PostState::class);
```

Problem: work in different team, and some one changed the class.
