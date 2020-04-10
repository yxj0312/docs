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
    protected $type;

    public function __construct($type)
    {
        $this->type = $type;
    }

    public function type()
    {
        return $this-type;
    }
}

// TEST
class CustomerIsGoldTest extends PHPUnit_Framework_TextCase
{
    /** @test */
    function a_customer_is_gold_if_they_have_the_respective_type()
    {
        $specification = new CustomerIsGold;

        $goldCustomer = new Customer('gold');
        $silverCustomer = new Customer('silver');

        $this->assertTrue($specification->isSatisfiedBy($goldCustomer));
        $this->assertFalse($specification->isSatisfiedBy($silverCustomer));
    }
}
```

> Possible Scenario: Image that you are using repository in your application, and you wanna find a way to fetch all items from the database or from your collection, which has a specification that you pass in.

```php
// TEST
class CustomersRepositoryTest extends PHPUnit_Framework_TextCase
{
    protected $customers;

    public function setUp()
    {
        $this->customers = new CustomersRepository(
            [
                new Customer('gold'),
                new Customer('bronze'),
                new Customer('silver'),
                new Customer('gold'),
            ]
        );
    }

    /** @test */
    public function it_fetches_all_customers()
    {
        $results = $this->customers->all();

        $this->assertCount(4, $results);
    }

    /** @test */
    public function it_fetches_all_customers_who_match_a_give_specification()
    {
        // $customers = new CustomersRepository(
        //     [
        //         new Customer('gold'),
        //         new Customer('bronze'),
        //         new Customer('silver'),
        //         new Customer('gold'),
        //     ]
        // );

        $results = $this->customers->bySpecification(new CustomerIsSpec);

        $this->assertCount(2, $results);
    }
}


// Implementation
class CustomersRepository {
    protected $customers;

    public function __construct(array $customers)
    {
        $this->customers = $customers;
    }

    public function bySpecification()
    {
        $matches = [];
        // homework: translate it to a array_filter
        foreach ($this->customers as $customer) {
            if ($specification->isSatisfiedBy($customer)) {
                $matches[] = $customer;
            }
        }

        return $matches;
    }

    public function all()
    {
        return $this->customers;
    }
}

```

> From comments:  this pattern could be considered a software anti-pattern! More on that on the wikipedia page: <https://en.wikipedia.org/wiki/Specification_pattern#Criticisms.>
> 