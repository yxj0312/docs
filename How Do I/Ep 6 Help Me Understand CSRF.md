VerifyCsrfToken in middleware of kernel.php

How do we verify a token mismatch?

    - tokensMatch method in above class

What happened if no token or token mismatched?

    - above method will throw a exception

How do u set the token?

    - put a random string(Str::random(40)) into a session

        - StartSession middleware group

            - in start() method of Store.php

litte hints:

Add timestamps on the pivot table

```php
    public function watches()
    {
        return $this->belongsToMany(Video::class, 'watching')
            ->withTimestamps();
    }
```

If you don't have csrf token

    - That means, anyone could submit the form and create record, even somebody on the different site.

    like: somebody on the other site, created a form like this

```html
    <form method="POST" action="http:://my-app.dev/watching/500">
    </form>
```

    ->Session hijacking.

