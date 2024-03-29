# Named Parameters

> Next up, we have named parameters. This new PHP 8 feature allows you to pass function arguments according to, not their order, but the parameter name, itself. Let's discuss the pros and cons of adopting named parameters/arguments in your own projects.

```php
class Invoice
{
    public function __construct($description, $total, $date, $paid)
    {
        $this->description = $description;
        $this->total = $total;
        $this->date = $date;
        $this->paid = $paid;
    }
}

new Invoice(
    'Customer installation',
    10000,
    new DateTime(),
    true
);
```

in php 8, you can do:

```php
new Invoice(
    description: 'Customer installation',
    total: 10000,
    date: new DateTime(),
    paid: true
);
```

Problem: if u change the parameter name in the class, u have to keep it sync.

btw u can do the construction like this

```php
class Invoice
{
    public function __construct(
        private  $description;
        private  $total;
        private  $date;
        private  $paid;
    ) 
    {
    }
}

new Invoice(
    'Customer installation',
    10000,
    new DateTime(),
    true
);
```

```php
class Invoice
{
    public function __construct(
        private  $description;
        private  $total;
        private  $date;
        private  $paid;
    ) 
    {
    }
}

new Invoice(
    'Customer installation',
    10000,
    new DateTime(),
    true
);
```
