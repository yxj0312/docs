## How to access Facade?
### Though aliases class in config/app.php

### Dig more: aliases function:
in kernel.php in \Illuminate\Foundation\Http\Kernel.php

```php
    protected $bootstrappers = [
        \Illuminate\Foundation\Bootstrap\LoadEnvironmentVariables::class,
        \Illuminate\Foundation\Bootstrap\LoadConfiguration::class,
        \Illuminate\Foundation\Bootstrap\HandleExceptions::class,
        \Illuminate\Foundation\Bootstrap\RegisterFacades::class,
        \Illuminate\Foundation\Bootstrap\RegisterProviders::class,
        \Illuminate\Foundation\Bootstrap\BootProviders::class,
    ];

    public function bootstrap(Application $app)
    {
        Facade::clearResolvedInstances();

        Facade::setFacadeApplication($app);

        AliasLoader::getInstance(array_merge(
            $app->make('config')->get('app.aliases', []),
            $app->make(PackageManifest::class)->aliases()
        ))->register();
    }
```

## Static method in the facade
```php
/**
     * Handle dynamic, static calls to the object.
     *
     * @param  string  $method
     * @param  array   $args
     * @return mixed
     *
     * @throws \RuntimeException
     */
    public static function __callStatic($method, $args)
    {
        $instance = static::getFacadeRoot();

        if (! $instance) {
            throw new RuntimeException('A facade root has not been set.');
        }

        return $instance->$method(...$args);
    }
```
### how to assoiate facade(i.e. Gate) with the underline class(__callStatic)
```php
    /**
     * Get the root object behind the facade.
     *
     * @return mixed
     */
    public static function getFacadeRoot()
    {
        return static::resolveFacadeInstance(static::getFacadeAccessor());
    }

    //for example, File.php
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'files';
    }
```
### Then resolve the facade instance
```php
    /**
     * Resolve the facade root instance from the container.
     *
     * @param  string|object  $name
     * @return mixed
     */
    protected static function resolveFacadeInstance($name)
    {
        // Are we dealing with an object?
        if (is_object($name)) {
            return $name;
        }

        // Have we already done this?
        if (isset(static::$resolvedInstance[$name])) {
            return static::$resolvedInstance[$name];
        }

        // We are going to a resolvedInstance, and since it is an array, we gonna cache it, and we gonna look into the laravel service container and resolve the value of that key: (from getFacadeAccessor) out of service container. 
        // static::$app[$name] equals App::make(Gate::class)
        return static::$resolvedInstance[$name] = static::$app[$name];
    }
```

### Result
app(Illuminate...\Gate::class)->allows('update') equlas Gate::allows('update')