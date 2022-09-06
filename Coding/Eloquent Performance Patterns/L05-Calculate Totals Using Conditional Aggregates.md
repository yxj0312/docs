# Calculate Totals Using Conditional Aggregates

> In this lesson, you'll learn how to calculate totals in the database using conditional aggregates. To illustrate this, we'll review a demo application that tracks customer feature requests.

FeaturesController

```php
public function index()
{
    $statuses = (object) [];
    $statuses->requested = Feature::where('status','requested');
    $statuses->planned = Feature::where('status','planned');
    $statuses->completed = Feature::where('status','completed');

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
