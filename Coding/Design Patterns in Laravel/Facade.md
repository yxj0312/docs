# Facade pattern

The facade pattern provides a combined interface to a set of interfaces in a subsystem. A facade defines a higher-level interface that makes the subsystem easier to use.

The facade pattern isn’t all about covering up bad code, though. It can be used to create a simple public interface that bonds multiple classes working together in some way. Suppose you’re dealing with a large subsystem with hundreds of public methods but you only need a few of them.

You want the facade to correctly construct the various classes in the subsystem and provide those interfaces to you such that you can use them with ease. All of Laravel’s facades are defined in the Illuminate\Support\Facades namespace. Let’s see an example-

In this App\Repositories folder, let’s create a PHP file called Addition.php.

Addition.php:

```php
<?php
namespace App\Repositories;

class calculation
{
    public function sum(){
 $a = 10;
 $b = 20;
 $result = $a + $b;
    }
}
?>
```

We have a class called calculation and it has a function called sum. It’s a simple function that returns the sum of two numbers. Now, we can access this function in our application from anywhere. For that, at first, we have to bind it to our service provider.

Let’s create a provider class, where we’re going to bind this class. You can create a service provider with the following PHP artisan command-

```php
php artisan make:provider CustomServiceProvider
```

In this example, we’re going to use the name CustomServiceProvider.

```php
public function register()
{
    app()->bind('calculation', function(){
        return new \App\Repositories\Addition;
    });
}
```

In the CustomServiceProvider, there is a register function, where we actually bind our class. The first parameter of our bind function takes the class name which is the calculation and as a second parameter, it passes a function that returns the object of that class.

Now, let’s define a custom class, where we can define the getFacadeAccessor() method. It defines what to resolve from the container class. The Facade base class makes use of the __callStatic() magic-method to defer calls from our facade to the resolved object.

```php
<?php
namespace App\Repositories;
use Illuminate\Support\Facades\Facade;

class Test extends Facade{
    protected static function getFacadeAccessor() {
 return 'calculation';
    }
}
?>
```

Inside of the App\Repositories, we created a file called TestFacades.php, and we have a Test class that extends Facade. The static method getFacadeAccessor() returns the calculation class that is defined in our Addition.php. Now, we have to add this CustomServiceProvider inside of our config.php file.

‘providers’ => []:

```php
App\Providers\CustomServiceProvider::class,
```

‘aliases’ => []:

Inside of aliases, we also have to define our TestFacades class name like this-

```php
'Test' => App\Repositories\TestFacades::class,
```

Now, all the processes are set, we can access the sum() method from anywhere in our applicaiton.

```php
Route::get('/index', function(){
    Test::sum();
});
//Result: 30
```

This ‘Test’ is the name we gave in our aliases array. Now if we have multiple methods in the calculation class, we can access them too.

```php
<?php
namespace App\Repositories;

class calculation
{
    public function sum(){
 $a = 10;
 $b = 20;
 $result = $a + $b;
    }

    public function another_sum(){
 $a = 50;
 $b = 50;
 $result = $a + $b;
    }
}
?>
```

In the calculation class, suppose we have another method called another_sum(). We can access it too in the same way.

```php
Route::get('/index', function(){
    Test::another_sum();
});
//Result: 100
```
