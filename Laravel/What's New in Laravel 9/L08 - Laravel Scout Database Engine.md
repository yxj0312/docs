# Laravel Scout Database Engine

Laravel Scout originally launched with a focus on Algolia. However, since then, a number of alternative "engines" have been introduced. As part of Laravel 9, for small to medium sized applications, you may decide to leverage the new database engine.

1. install laravel scout

```php
composer require laravel/scout
````

2. vendor:publish to get scoutServiceProvider

3. in .env add

```php
SCOUT_DRIVER=database
```

4. add searchable trait to model you want to index

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\scout\Searchable;

class Post extends Model
{
    use HasFactory, Searchable;
}
```

5. Add a searchableArray method in the model

```php
public function toSearchableArray()
{
    return [
        'title' => $this->title,
        'body' => $this->body
    ];
}
```
