# Object Composition and Abstractions

> Let's move on to object composition. To break it down into the simplest of terms, composition is when one object holds a pointer to another object. This allows us to construct complex functionality by combining various types.

## Example:

```php
    class subscription
    {
        public function create()
        {
            
        }

        public function cancel()
        {
            // api request
            // find stripe customer
            // find stripe subscription by customer
        }

        public function invoice()
        {
            
        }

        public function swap($newPlan)
        {
            
        }
    }
```

### 3 Ways to add the related functions of cancel

1. Add them into the class

```php
class subscription
{
    ...

    protected function findStripeCustomer()
    {
        
    }

    protected function findStripeSubscriptionByCustomer()
    {
        
    }

    ...
}
```

2. Inheritance
   
   ```php
    class BillableSubscription extends Subscription
    {
        protected function findStripeCustomer()
        {
            
        }

        protected function findStripeSubscriptionByCustomer()
        {
            
        }
    }
   ```

3. Object Composition

    ```php
        class StripeGateway
        {
            public function findStripeCustomer()
            {
                
            }

            public function findStripeSubscriptionByCustomer()
            {
                
            }
        }

        <!-- Add an construction method to Subscription -->
        class Subscription
        {
            protected StripeGateway $gateway;

            public function __construct(StripGateway $gateway)
            {
                $this->gateway = $gateway;
            }

            ...

            public function cancel()
            {
                // api request
                // find stripe customer
                $customer = $this->gateway->findStripeSubscriptionByCustomer();
                // find stripe subscription by customer
            }
        }
    ```

    ### Abstraction

    > 'Depending Abstraction'

    In this example, Subscription class should not care about which exactly is the bill provider(Stripe or other provider).
    We should refactor the above codes to:

    ```php
        interface Gateway
        {
            public function findCustomer();
            public function findSubscriptionByCustomer();
        }

        class StripeGateway implements Gateway
        {
            public function findCustomer()
            {

            }

            public function findSubscriptionByCustomer()
            {

            }
        }

        class Subscription
        {
            ...

            public function __construct(Gateway $gateway)
            {
                $this->gateway = $gateway;
            }

            ...
        }

        <!-- You can add another provider like Braintree -->
        class BraintreeGateway implements Gateway
        {
            public function findCustomer()
            {

            }

            public function findSubscriptionByCustomer()
            {

            }
        }
    ``` 