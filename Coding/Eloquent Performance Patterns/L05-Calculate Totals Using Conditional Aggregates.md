# Calculate Totals Using Conditional Aggregates

> In this lesson, you'll learn how to calculate totals in the database using conditional aggregates. To illustrate this, we'll review a demo application that tracks customer feature requests.

FeaturesController

```php
public function index()
{
    $statuses = (object) [];
    $statuses->requested = '-';
    $statuses->planned = '-';
    $statuses->completed = '_';

    $features = Feature::query()
        ->withCount('comment')
        ->paginate();

    return View::make('features', [
        'statuses' => $statuses,
    ]);
}
```
