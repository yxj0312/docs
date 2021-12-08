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
