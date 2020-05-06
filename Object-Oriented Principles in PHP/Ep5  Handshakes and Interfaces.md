# Handshakes and Interfaces

> Think of an interface as a class with no behavior. Instead, it describes the terms for a particular contract. Any class that signs this contract must adhere to those terms. Let's review this idea using the example of a newsletter signup.

```php
class CampaignMonitor
{
    public function subscribe($email)
    {

    }
}

class NewsletterSubscriptionsController
{
    public function store()
    {
        // 
    }
}
```