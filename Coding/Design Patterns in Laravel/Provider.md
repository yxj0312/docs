# Provider pattern

The provider pattern is the core of the Laravel framework and the packages we use. It’s a set of patterns for some essential services. It’s like a plug-in or packages into our service.

It provides classes that we can use in our namespace. Suppose, we’re going to sell Toyota’s car and want to create our franchise. Toyota will give us the way to build cars. How we set up our warehouse, it’s totally up to us.

But, the ways of making all the cars, necessary car parts and all the paperwork they’ll provide to us. So, in that case, they are the provider. In this case, our CarBuilder or CarManager is provided by Toyota.

```php
class ToyotaServiceProvider extends ServiceProvider
{
    public function register(){
        //Register your services here
    }
}
```

So, when we look at the provider pattern, we have a register method here like a normal service provider. So, basically, we need to tell Laravel that we have an implementation available for us in the cod

```php
use App\Toyotas\CarManager;
class CarServiceProvider extends ServiceProvider
{
    public function register()
    {
         $this->app->bind('car-manager', function($app) {
            return new CarManager();
         });
    }
}
```

When want to access that manager class for our application, we have to bind it to our ServiceProvider and it becomes available in our code. Basically, we ask laravel to create the class for us, when we ask for that string.

The ServiceProvider is used to register services to the container. Knowingly or unknowingly we use it a lot because every functionality in Laravel is a service like the Eloquent, Translation, Cache, Config provider, etc that are included in our app.php file. They are the provider pattern and they are interchangeable. We can also add our own implementation there.

```php
//Using instantiation
$carManager = new \App\Toyotas\CarManager();
//Using the provider pattern and the container
$carManager = app('car-manager');

$carone= $carManager->driver('carone');
```

So, when we call the CarManager, we can instantiate in a normal way or we can use the App\ helper. In the end, we can call those methods on carManager and call the driver method on it and the new car ‘carone’ is back. In the same way, we can create many new cars like this-

```php
$cartwo= $carManager->driver('cartwo');
$carthree= $carManager->driver('carthree');
```

The provider pattern extends the usability of those classes in our application.
