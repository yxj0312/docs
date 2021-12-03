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

    var_dump($container['foo']);
}
```
