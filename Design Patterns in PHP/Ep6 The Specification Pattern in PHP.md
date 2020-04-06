# The Specification Pattern in PHP

> It allows you to take any kind of business rule and prompt or elevate to first class citizen.

```php
    // if customer is label gold, and he get access all these conditional things
    class CustomerIsGold {
        public function isSatisfiedBy(Customer $customer)
        {
            $customer->type == 'gold';
        }
    }
```

why not just do like the following?

```php
    // if customer is label gold, and he get access all these conditional things
    class Customer {
        public function isGold()
        {
            $customer->type == 'gold';
        }
    }
```

it's also ok. in fact the second will be mostly used. But if u are in the case, like: reference the method elsewhere, or i need to perform a sql-query by using this domain logic and i don't wanna duplicate balabala...

> Next: How do we actually interact of this?

```php
$spec = new CustomerIsGold;

$spec->isSatisfiedBy(new Customer);

```

> Let's write a test for this

Say we have a customer

```php
class Customer {
    public function __constuct($plan)
    {
        $this->plan = $plan;
    }
}

// TEST
class CustomerIsGoldTest extends PHPUnit_Framework_TextCase
{
    /** @text */
    function a_customer_is_gold_if_they_have_the_respective_type()
    {

    }
}
```