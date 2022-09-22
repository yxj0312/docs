# Single Responsibility

> The most popular of the SOLID design principles, the single responsibility principle dictates that a class should have only one reason to change. To illustrate this a bit more, let's dig into a simple example.

"A class should have one, and only one reason to change."

```php
class SalesReporter {
    public function between($startDate, $endDate)
    {
        // perform authentication
        if (! Auth::check()) throw new Exception('Authentication required for reporting.')

        // get sales from db
        $sales = $this->queryDBForSalesBetween($startDate, $endDate);

        // return results
        return $this->format($sales);
    }

    public function queryDBForSalesBetween($startDate, $endDate)
    {
        return DB::tables('sales')->whereBetween('created_at', [$startDate, $endDate])->sum('charge') / 100;
    }

    protected function format($sales)
    {
        return "<h1>Sales: $sales</h1>";
    }
}


```
