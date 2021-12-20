# Service Containers in 3 Levels

[Service Containers in 3 Levels](https://laracasts.com/series/jeffreys-larabits/episodes/16)

In this Larabit, I'll teach you the essentials of how to build a service container in three levels.

Beginning with level one, we'll prepare a laughably basic container to illustrate the general concept. For levels two and three, we'll slowly work our way up and develop a container that can perform bindings, handle singletons, and even magically instantiate dependencies on the fly.

## Level 1 It's Like a Toy Chest

An Array could be a container

```php
/** @test */
function its_a_toy_chest()
{
    $container = [
        'foo' => 'bar'
    ];

    // reach the value by:
    var_dump($container['foo']);
}
```

Now what if we bind the container with a closure?

```php
/** @test */
function its_a_toy_chest()
{
    $container = [
        'foo' => function() {
            return 'bar';
        }
    ];

    var_dump($container['foo']());
}
```

It might be nice, if our container would smart enough to know this is closure.

To do this, We wrap this out with a class

```php
/** @test */
function its_a_toy_chest()
{
    $container = new Container();

    $container->bind('foo', 'bar');

    $this->assertEquals('bar', $container->get('foo'));
}


// with creating a class

// Container.php
   <?php

    namespace App;

    class Container 
    {
        protected array $bindings = [];

        public function bind($key, $value)
        {
            $this->bindings[$key] = $value;
        }

        public function get($key)
        {
            return $this->bindings[$key];
        }
    }
```

## Level 2 It can register functions and singletons

Instead of binding foo to the string 'bar', now we bind it with a closure.

Maybe within that closure, we will do something like: time consuming, configuration...

In this case, we return a Newsletter class

```php
/** @test */
   function LEVEL_TWO_it_can_lazily_resolve_functions()
   {
        $container = new Container();

        $container->bind('newsletter', function() {
            return new Newsletter();
        });
        
        $this->assertInstanceOf(Newsletter::class, $container->get('newsletter'));
   }
```

let's work on the Newsletter class

```php
class Newsletter
{
}
```

notice, if i can $container->get('newsletter') 3 times, i get three new instances.

but in some case, you don't want that. instead, you want a singleton, or a single instance, that can be shared globally.

```php
/** @test */
   function LEVEL_TWO_it_can_lazily_resolve_functions()
   {
        $container = new Container();

        $container->singleton('newsletter', function() {
            return new Newsletter();
        });

        $this->assertInstanceOf(Newsletter::class, $container->get('newsletter'));
   }
```

Then we create a singleton method in container, we give it a shared state.

```php
    public function bind($key, $concrete, $shared = false)
    {
        $this->bindings[$key] = [
            'concrete' => $concrete,
            'shared' => $shared
        ];
    }
    
    public function singleton($key, $concrete)
    {
        $this->bind($key, $concrete, true);
    }
```

we need to rewrite get method to make the test pass

```php
    public function get($key)
    {
        $concrete =  $this->bindings[$key]['concrete'];

        if ($this->bindings[$key]['shared'] && isset($this->singletons[$key])) {
            return $this->singletons[$key];
        }

        if ($concrete instanceof Closure) {
            $concrete = $concrete();

            if ($this->bindings[$key]['shared']) {
                $this->singletons[$key] = $concrete;
            }
            return $concrete;
        }

        return $concrete;
    }
```

```php
/** @test */
   function LEVEL_TWO_it_can_lazily_resolve_functions()
   {
        $container = new Container();

        // $container->bind('newsletter', function() {
        //     return new Newsletter();
        // });
        

        $container->singleton('newsletter', function() {
            return new Newsletter(uniqid());
        });

        var_dump($container->get('newsletter'));
        var_dump($container->get('newsletter'));
        var_dump($container->get('newsletter'));

        $this->assertInstanceOf(Newsletter::class, $container->get('newsletter'));
   }
```

to test the instance only be called once

## Level 3 It Can Do Magic

let's no bind anything to the container. If i try to get something out of the container, and we follow certain conversion, maybe that container can make it.

```php
function LEVEL_THREE_it_can_do_magic()
   {
       $container = new Container();

       $this->assertInstanceOf(Newsletter::class, $container->get(NewsLetter::class));
   }
```

```php
 if (!isset($this->bindings[$key])) {
            // can we do some magic??

            if (class_exists($key)) {
                return new $key();
            } 

            throw new Exception('No binding was registered for ' . $key);
        }
```

if we remove the construct method in newsletter, add the above to the get method,  this test will pass.

if we added the construct method back, how about our Newsletter has dependency of its own?

The answer is no. Because we have no clue how ist the parameter type, maybe a string or a int.

but how about a third party API, like mailchimp?

```php
class Newsletter
{

    public function __construct(Mailchimp $api)
    {
        
    }
}
```

Let's use php reflection API to peek into this class and figure out what needs.

```php
// in tinker we run:
$r = new \ReflectionClass("App\Newsletter")

$r->getConstructor()->getParameters()[0]->getType()

// add we get:

=> ReflectionNamedType {#3536
     name: "App\Mailchimp",
     allowsNull: false,
     isBuiltin: false,
   }

```

Then we refactor our container

we can get the type, that we try to inject by loop the constructor

```php
if (class_exists($key)) {
                $reflector = new ReflectionClass($key);

                $constructor = $reflector->getConstructor();

                if (!$constructor) {
                    return new $key();
                }

                $dependencies = [];

                foreach ($constructor->getParameters() as $parameter) {
                    $dependency = $parameter->getType()->getName();

                    $dependencies[] = new $dependency();
                }

                return $reflector->newInstanceArgs($dependencies);
            } 
```

let's say Mailchimp has its own dependency, like a http class

```php
<?php

namespace App;

class Mailchimp
{
    public function __construct(protected Http $http)
    {
        
    }
}
```

we can do a wild loop to accomplish this.

```php
protected function make(string $key): mixed
    {
        $reflector = new \ReflectionClass($key);

        $constructor = $reflector->getConstructor();

        if (!$constructor) {
            return new $key();
        }

        $dependencies = [];

        foreach ($constructor->getParameters() as $parameter) {
            $dependency = $parameter->getType()->getName();

            $dependencies[] = $this->make($dependency);
        }

        return $reflector->newInstanceArgs($dependencies);
    }


```

```php
public function get($key)
    {
        if (!isset($this->bindings[$key])) {
            // can we do some magic??

            if (class_exists($key)) {
                return $this->make($key);
            } 

            throw new Exception('No binding was registered for ' . $key);
        }

        $binding = $this->bindings[$key];


        if ($binding['shared'] && isset($this->singletons[$key])) {
            return $this->singletons[$key];
        }

        if ($binding['concrete'] instanceof Closure) {
        
            if ($binding['shared']) {
                $this->singletons[$key] = $binding['concrete'];
            }
            return $binding['concrete']();
        }

        return $binding['concrete'];
    }
```
