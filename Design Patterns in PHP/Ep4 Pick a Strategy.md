# Strategy

## Definition (Entwurfsmuster)

>  The strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use.

### Define a family of algorithms
algorithm or a task can be executed in multiple ways.

#### Example
> I need to log some data, there are multiple strategy to execute this task. i.e. We can log this values to a file, or get it to a database or send some to a web-base.

```php
class LogToFile {

}

class LogToDatabase {

}

class LogToXWebService {

}
```


### Encapsulate and make them interchangeable

#### By Creating an interface, because basic concept are depending upon abstraction rather than con-creation.

```php
interface Logger {
    public function log($data)
    {
        
    }
}

class LogToFile implements Logger{
    public function log($data)
    {
        var_dump('Log the data to a file');
    }
}

class LogToDatabase implements Logger{
    public function log($data)
    {
        var_dump('Log the data to a database');
    }
}

class LogToXWebService implements Logger{
    public function log($data)
    {
        var_dump('Log the data to a Sass site');
    }
}
```

```php
// Context classes
class App {
    public function log($data)
    {
        $logger = new LogToFile;

        $logger->log($data);
    }
}

$app = new App;

$app->log('Some information here');
```

Strategy or polymorphisms
```php
// A helper function to call classes
class App {
    public function log($data, Logger $logger)
    {
        $logger->log($data);
    }
}

$app = new App;

$app->log('Some information here', new LogToXWebService);
$app->log('Some information here', new LogToDatabase);
```

1. You create a multiple way to execute a task
2. You force them to be a interchangeable by making them a common interface
3. In your context class, this class doesn't need to care about how you are doing it, it just needs to know, that you can't do it 

```php
// A helper function to call classes
class App {
    public function log($data, Logger $logger = null)
    {
        $logger = $logger ?: new LogToFile
        $logger->log($data);
    }
}

$app = new App;

$app->log('Some information here');
$app->log('Some information here', new LogToXWebService);
$app->log('Some information here', new LogToDatabase);
```

### Real world example

Maildriver in Laravel 5, we could use 'smtp', 'mail', 'mailgun', 'log' by it. All we have to do, is set a driver here.

Behind it, is a strategy design pattern. (Following codes are from laravel 6)

Go MailServiceProvider, 

```php
/**
* Register the Swift Transport instance.
*
* @return void
*/
protected function registerSwiftTransport()
{
$this->app->singleton('swift.transport', function ($app) {
    return new TransportManager($app);
});
}
```
Go TransportManager

```php
/**
    * Create an instance of the Mailgun Swift Transport driver.
    *
    * @return \Illuminate\Mail\Transport\MailgunTransport
    */
protected function createMailgunDriver()
{
    $config = $this->config->get('services.mailgun', []);

    return new MailgunTransport(
        $this->guzzle($config),
        $config['secret'],
        $config['domain'],
        $config['endpoint'] ?? null
    );
}
```
Go MailgunTransport, it extends Transport (but in laravel 5, it implements an interface called swift_transport)

```php
class MailgunTransport extends Transport
{
    /**
     * Guzzle client instance.
     *
     * @var \GuzzleHttp\ClientInterface
     */
    protected $client;
    ...
}
```

