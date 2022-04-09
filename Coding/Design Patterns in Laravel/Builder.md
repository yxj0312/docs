# Builder pattern

The Builder pattern is one of the main design patterns of Laravel. It separates the construction of a complex object from its representation so that the same construction process can create different representations. A builder is good for creating complex products.

All the creational patterns focus on producing products. Some products are just naturally complex, though. So in that case, you can represent the building process to a director and builder.

A real-life example of the Builder pattern is the construction of a car. Let’s think we have a builder class called CarBuilder.

```php
class CarBuilder
{
    public function make(CarBuilderInterface $car):Car
    {
        $car->start();
        $car->break();
        return $car;   
    }
}
```

It returns an object which implements the Car interface. Those start() and break() methods are defined into CarBuilderInterface initially.

```php
interface CarBuilderInterface
{
    public function start();
    public function break();
}
```

Now, if we want to make a new car, at first we have to create an object of the CarBuilder class and then create a new car using builder which returns the Car instance. The code of creating an object of the CarBuilder is given below-

```php
class CarBuilder{
    public function make(CarBuilderInterface $car):Car
    {
        $car->start();
        $car->break();
        return $car;
    }
}
//Create a object of CarBuilder class
$carBuilder= new CarBuilder();
//Create car using builder which returns Car instance
$car= $carBuilder->make(new CaroneBuilder());
```

Now we can add much functionality to CaroneBuilder as our needs.

```php
class CaroneBuilder implements CarBuilderInterface
{
    protected $car;

    public function start():Car
    {
        $this->car = new Car();
        return $this->car;
    }
    public function break():Car
    {
        $this->car = new Car();
        return $this->car;
    }
}
```

We can also create many new model car by using the CarBuilder class.

The Builder pattern in Laravel is also called the manager pattern. It builds complex objects step by step and returns them. It can decide whether to return something or not.

The above example was to understand the core concept of a Builder class. Now let’s see, how Laravel does it for the default builder class-

```php
Illuminate\Mail\TransportManager

class TransportManager extends Manager
{
    protected function createSmtpDriver()
    {
        //Code for building a SmtpTransport class
    }
    protected function createMailgunDriver()
    {
        //Code for building a MailgunTransport class
    }
    protected function createSparkpostDriver()
    {
        //Code for building a SparkpostTransport class
    }
    protected function createLogDriver()
    {
        //Code for building a LogTransport class
    }
}
```

For example, here we’re using TransportManager, which is for sending emails. Let’s think we have to create a SmtpDriver which is responsible for creating the SmtpTransport class and this class is also responsible for sending emails. But in the end, it extends the Transport class. So, we always have to have the same interface get back from the TransportManager. Let’s look at the default driver method-

```php
class TransportManager extends Manager
{
    public function getDefaultDriver()
    {
        return $this->app['config']['mail.driver'];
    }
}
```

The default driver method in Laravel uses config, so. it’s easy to switch around. Suppose we’re using the Smtp and want to switch to MailGun or another email service, in this default driver we can do that easily. This is because of the manager(builder) pattern. The manager pattern exactly knows how to create these objects and return them to us. In the config file, we have to use the Smtp driver.

```php
//config/mail.php
'driver' => env('MAIL_DRIVER', 'smtp'),
```

When the TransportManager calls the method getDefaultDriver() and finds the Smtp is set then it creates the SmtpDriver. Then we can send an email.

Laravel manager pattern examples:

```php
Illuminate\Auth\AuthManager
Illuminate\Broadcasting\BroadcastManager
Illuminate\Cache\CacheManager
Illuminate\Filesystem\FilesystemManager
Illuminate\Mail\TransportManager
Illuminate\Notifications\ChannelManager
Illuminate\Queue\QueueManager
Illuminate\Session\SessionManager
```
