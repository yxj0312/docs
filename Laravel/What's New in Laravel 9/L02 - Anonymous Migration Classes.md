# L02 - Anonymous Migration Classes

This next one is just a little tweak, but it's still something to be aware of. When generating migration classes, you'll notice that Laravel now leverages anonymous classes.

2014_10_12_000000_create_users_table by L9:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    ...
```
