# Calculate Totals Using Conditional Aggregates

> In this lesson, you'll learn how to calculate totals in the database using conditional aggregates. To illustrate this, we'll review a demo application that tracks customer feature requests.

FeaturesController

```php
public function index()
{
    $statuses = (object) [];
    $statuses->requested = Feature::where('status','requested')->count();
    $statuses->planned = Feature::where('status','planned')->count();
    $statuses->completed = Feature::where('status','completed')->count();

    $features = Feature::query()
        ->withCount('comment')
        ->paginate();

    return View::make('features', [
        'statuses' => $statuses,
        ...
    ]);
}
```

Debugbar:

We're running 3 queries to get the 3 statuses

Now it is not a big problem, but if we have  more than 10 statuses?

```sql
select #
    count(case when status = 'Requested' then 1 end) as requested,
    count(case when status = 'Planned' then 1 end) as planned,
    count(case when status = 'Completed' then 1 end) as completed, 
from features


```

```php
public function index()
{
    $statuses = Feature::toBase()
        ->selectRaw("count(case when status = 'Requested' then 1 end) as requested")
        ->selectRaw("count(case when status = 'Planned' then 1 end) as planned")
        ->selectRaw("count(case when status = 'Completed' then 1 end) as completed")
        ->first();

    $features = Feature::query()
        ->withCount('comment')
        ->paginate();

    return View::make('features', [
        'statuses' => $statuses,
        ...
    ]);
}
```

now only 1 query to get statuts total
