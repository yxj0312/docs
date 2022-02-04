# Open-Closed

Entities (class, method, function) should be open for extension, but closed for modification

- Open for extension: it should be simple to change the behavior of a particular entity (a class)

- Closed for modification: This is a goal -- change behavior without modifying source code

```php
class square {
    public $width;

    public $height;

    public function __construct($height, $width)
    {
        $this->height = $height;
        $this->width = $width;
    }
}

class AreCalculator {
    public function calculate($squares)
    {
        $area = 0;

        foreach($squares as $square)
        {
            $area += $square->$square->width*$square->height;
        }

        return $area; 
    }
}

class Circle {
    public $radius;

    public function __construct($radius)
    {
        $this->radius = $radius;
    }
}
```

To calculate the circle area,

we need refactor square to shape,  type check in the area method.

```php
class AreCalculator {
    public function calculate($shapes)
    {
        foreach($shapes as $shape)
        {
            // if (shape instanceof Square) {
            //     # code...
            // }
            if (is_a($shape, 'Square')) {
                $area += $square->$square->width*$square->height;

            }
            else {
                $area[] = $shape->radius * $shape->radius * pi();
            }
            $area += $square->$square->width*$square->height;
        }

        return array_sum($area); 
    }
}
```

But if there is a triangle..?

> Uncle Bob said: Separate extensible behavior behind an interface and flip the dependencies.

```php
// 1. Separate extensible behavior behind an interface
interface Shape {
    public function area();
}

class Square implements Shape {
    public $width;

    public $height;

    public function __construct($height, $width)
    {
        $this->height = $height;
        $this->width = $width;
    

    public function area()
    {
        return $this->width*$this->height;
    }
}

class Circle implements Shape {
    public $radius;

    public function __construct($radius)
    {
        $this->radius = $radius;
    }

    public function area()
    {
       return $this->radius * $this->radius * pi();
    }
}

// 2. flip the dependencies
class AreaCaculator {
    public function calculate($shapes)
    {
        foreach($shapes as $shape)
        {
            $area[] = $shape->area();
        }

        return array_sum($area);
    }
}
```

Then when we need a triangle, we never modify the above class, we just need to create a triangle class, and we pass that in to the AreaCalculator.

## Another Example

```php

class Checkout {
    public function begin(Receipt $receipt)
    {
        $this->acceptCash($receipt);
    }
}

public function acceptCash($receipt)
{
    // accept the cash
}

```

What if we not only accept cash, but also PayPal, credit card?

> Use Uncle Bob's advise above

```php
interface PaymentMethodInterface {
    public function acceptPayment($receipt)
}

class CashPaymentMethod implements PaymentMethodInterface {
    public function acceptPayment($receipt)
    {
        
    }
}

class Checkout {
    public function begin(Receipt $receipt, PaymentMethodInterface $payment)
    {
        $payment->acceptPayment();
    }
}
```
