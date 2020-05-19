# Handshakes and Interfaces

> Think of an interface as a class with no behavior. Instead, it describes the terms for a particular contract. Any class that signs this contract must adhere to those terms. Let's review this idea using the example of a newsletter signup.

```php
class CampaignMonitor
{
    // protected $apiKey;

    // public function __construct($apiKey)
    // {
    //     $this->apiKey = $apiKey;
    // }

    public function subscribe($email)
    {
        die('subscribing with Campaign Monitor');
    }
}


class NewsletterSubscriptionsController
{
    public function store(CampaignMonitor $newsletter)
    {
        $email = 'joe@example.com';

        // $newsletter = new CampaignMonitor(config('services.cm.key'));

        $newsletter->subscribe(auth()->user()->email);
    }
}
```

```php

// A different newsletter provider: drip
// Let's make sure drip does the same thing as above
// lets make sure they confirm the same interface.
class Drip
{
    // it wil be very different from above subscribe.
    public function subscribe($email)
    {
        die('subscribing with Drip');
    }
}


class NewsletterSubscriptionsController
{
    public function store(Drip $newsletter)
    {
        $newsletter->subscribe(auth()->user()->email);
    }
}
```

```php
$controller = new NewsletterSusbcriptionsController();

// In drip u new call Drip store method.
$controller->store(new Drip('api'))

// but u cant use CampaignMonitor store method, even if they do the same thing

```

- Why does the controller care which implementation it uses?

-> We have couple ways to deal with it:

1. Duck-Typing:

    If it walks like a duck and it quacks like a duck, then it must be a duck(<https://de.wikipedia.org/wiki/Duck-Typing)>

    > Duck typing in computer programming is an application of the duck test—"If it walks like a duck and it quacks like a duck, then it must be a duck"—to determine if an object can be used for a particular purpose. With normal typing, suitability is determined by an object's type. In duck typing, an object's suitability is determined by the presence of certain methods and properties, rather than the type of the object itself.[1]

    ```php
    class NewsletterSubscriptionsController
    {
        <!-- Remove Drip entirely-->
        public function store($newsletter)
        {
            $newsletter->subscribe(auth()->user()->email);
        }
    }

    <!-- Now -->
    $controller = new NewsletterSusbcriptionsController();

    $controller->store(new CampaignMonitor());
    <!-- If i switch to drip, i just need to update here -->
    $controller->store(new Drip());
    ```
2. Define an interface: it doesn't care how u subscribe users. It only cares that u suppose to behavior that u can subscribe.
   
   ```php
    interface Newsletter
    {
        public function subscribe($email);
    }

    class NCampaignMonitor implements Newsletter
    {
        public function subscribe($email)
        {
            die('subscribing with CampaignMonitor');
        }
    }

    class Drip implements Newsletter
    {
        public function subscribe($email)
        {
            die('subscribing with Drip');
        }
    }

    <!-- Now we can do -->
    $controller = new NewsletterSusbcriptionsController();

    $controller->store(new CampaignMonitor());
    <!-- If i switch to drip, i just need to update here -->
    $controller->store(new Drip());
   ```

   The only difference is this time we turn that handshake into a formal  contract.
   