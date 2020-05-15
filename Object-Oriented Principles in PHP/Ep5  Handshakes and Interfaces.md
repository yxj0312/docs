# Handshakes and Interfaces

> Think of an interface as a class with no behavior. Instead, it describes the terms for a particular contract. Any class that signs this contract must adhere to those terms. Let's review this idea using the example of a newsletter signup.

```php
class CampaignMonitor
{
    protected $apiKey;

    public function __construct($apiKey)
    {
        $this->apiKey = $apiKey;
    }

    public function subscribe($email)
    {

    }
}


class NewsletterSubscriptionsController
{
    public function store(CampaignMonitor $newsletter)
    {
        $newsletter->subscribe(auth()->user()->email);
    }
}
```

```php

// Let's make sure drip does the same thing as above
class Drip
{
    public function subscribe($email)
    {

    }
}
```