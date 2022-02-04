# Template method pattern (Schablonenmethode)

## Definition

> The template method is a method in a superclass, usually an abstract superclass, and defines the skeleton of an operation in terms of a number of high-level steps. These steps are themselves implemented by additional helper methods in the same class as the template method.

## Example

> Imaging you are entering a sub-sandwich shop. And you have all of these different classes that represent different kinds of sandwich you can order.

```php
namespace App;
class TurkeySub {
    public function make()
    {
        return $this
            ->layBread()
            ->addLettuce()
            ->addTurkey()
            ->addSauces();
    }

    public function layBread()
    {
        var_dump('laying down the bread');

        return $this;       
    }

    public function addLettuce()
    {
        var_dump('add some lettuce');

        return $this;
    }       

    public function addTurkey()
    {
        var_dump('add some turkey');

        return $this;
    }

    public function addSauces()
    {
        var_dump('add oil and vinegar');

        return $this;
    }
}

(new App\TurkeySub)->make();
```
Then a veggie sub:
```php
namespace App;
class VeggieSub {
    public function make()
    {
        return $this
            ->layBread()
            ->addLettuce()
            ->addVeggies()
            ->addSauces();
    }

    public function layBread()
    {
        var_dump('laying down the bread');

        return $this;       
    }

    public function addLettuce()
    {
        var_dump('add some lettuce');

        return $this;
    }       

    public function addVeggies()
    {
        var_dump('add some veggies');

        return $this;
    }

    public function addSauces()
    {
        var_dump('add oil and vinegar');

        return $this;
    }
}

(new App\VeggieSub)->make();
```

So we create an abstract class
1. Those are identical methods go to abstract class
```php
abstract class Sub {
    public function layBread()
    {
        var_dump('laying down the bread');

        return $this;       
    }

    public function addLettuce()
    {
        var_dump('add some lettuce');

        return $this;
    }

    public function addSauces()
    {
        var_dump('add oil and vinegar');

        return $this;
    }
}
-------
class VeggieSub extends Sub {
    public function make()
    {
        return $this
            ->layBread()
            ->addLettuce()
            ->addVeggies()
            ->addSauces();
    }

    public function addVeggies()
    {
        var_dump('add some veggies');

        return $this;
    }
}
-------
class TurkeySub extends Sub {
    public function make()
    {
        return $this
            ->layBread()
            ->addLettuce()
            ->addTurkey()
            ->addSauces();
    }

    public function addTurkey()
    {
        var_dump('add some turkey');

        return $this;
    }
}
```

2. We could sort of think of make method as our algorithm. So this where we define the makeup of sub-sandwich, noticed most of that are identical.
```php
abstract class Sub {
    public function make()
    {
        return $this
            ->layBread()
            ->addLettuce()
            ->addPrimaryToppings()
            ->addSauces();
    }

    protected function layBread()
    {
        var_dump('laying down the bread');

        return $this;       
    }

    protected function addLettuce()
    {
        var_dump('add some lettuce');

        return $this;
    }

    protected function addSauces()
    {
        var_dump('add oil and vinegar');

        return $this;
    }

    // abstract methods: we are saying that this class is going to require a subclass to offer this method
    protected abstract function addPrimaryToppings();
}

----
class VeggieSub extends Sub {
    public function addPrimaryToppings()
    {
        var_dump('add some veggies');

        return $this;
    }
}
----
class TurkeySub extends Sub {
    public function addPrimaryToppings()
    {
        var_dump('add some turkey');

        return $this;
    }
}

(new App\VeggieSub)->make();
(new App\TurkeySub)->make();
```

We have removed the duplications.

## Real world examples

https://github.com/laracasts/GitHub-Authentication-With-Laravel
-> GitHub-Authentication-With-Laravel/app/Accounts/Providers/Contracts/Provider

```php
interface Provider {

    /**
     * @return mixed
     */
    public function authorize();

    /**
     * @param $code
     * @return mixed
     */
    public function user($code);

}

---

abstract class Provider {

    /**
     * @var Redirector
     */
    protected  $redirector;

    /**
     * @var string
     */
    protected $clientId;

    /**
     * @var string
     */
    protected $clientSecret;

    /**
     * @var ClientInterface
     */
    protected $http;

    /**
     * @param Redirector $redirector
     * @param ClientInterface $http
     * @param $clientId
     * @param $clientSecret
     */
    public function __construct(Redirector $redirector, ClientInterface $http, $clientId, $clientSecret)
    {
        $this->redirector = $redirector;
        $this->http = $http;
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
    }

    /**
     * @return mixed
     */
    abstract protected function getAuthorizationUrl();

    /**
     * @return mixed
     */
    abstract protected function getAccessTokenUrl();

    /**
     * @param $token
     * @return mixed
     */
    abstract protected function getUserByToken($token);

    /**
     * @param array $user
     * @return mixed
     */
    abstract protected function mapToUser(array $user);

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function authorize()
    {
        return $this->redirector->to($this->getAuthorizationUrl());
    }

    /**
     * @param $code
     * @return User
     */
    public function user($code)
    {
        // request that access token
        $token = $this->requestAccessToken($code);

        $user = $this->getUserByToken($token);

        return $this->mapToUser($user->json());
    }

    /**
     * @param $code
     */
    protected function requestAccessToken($code)
    {
        $response = $this->http->post($this->getAccessTokenUrl(), [
            'body'    => [
                'code'          => $code,
                'client_id'     => $this->clientId,
                'client_secret' => $this->clientSecret
            ],
            'headers' => [
                'Accept' => 'application/json'
            ]
        ]);

        return $response->json()['access_token'];
    }

} 

----

class GitHub extends Provider implements ProviderInterface {

    /**
     * @var string
     */
    protected $accessTokenUrl = 'https://github.com/login/oauth/access_token';

    /**
     * @return string
     */
    protected function getAccessTokenUrl()
    {
        return $this->accessTokenUrl;
    }

    /**
     * @return string
     */
    protected function getAuthorizationUrl()
    {
        $url = 'https://github.com/login/oauth/authorize?';

        return $url . http_build_query([
            'client_id' => $this->clientId,
            'scope' => 'user:email'
        ]);
    }

    /**
     * @param $token
     * @return mixed
     */
    protected function getUserByToken($token)
    {
        return $this->http->get('https://api.github.com/user', [
            'headers' => ['Authorization' => "token {$token}"]
        ]);
    }

    /**
     * @param array $user
     * @return mixed
     */
    protected function mapToUser(array $user)
    {
        // Reader: Be sensitive to the Eloquent dependency here.

        return new User([
            'username' => $user['login'],
            'email' => $user['email'],
            'avatar' => $user['avatar_url']
        ]);
    }
}
```

