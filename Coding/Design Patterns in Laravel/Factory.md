# Factory pattern

The Factory pattern is a creational pattern that uses factory methods to deal with the problem of creating objects by specifying their concrete classes. The factory is responsible for creating objects, not the clients. Multiple clients can call the same factory.

Let’s go with the example of a car. If we want to make a car, we need a lot of parts like battery, radiator, brake, fuel tank, etc. To create those car parts, we need a factory.

Now, we can create those parts of our own. But it’s time-consuming and let’s think we don’t want to wait that long instead of we want a quick process like we just want to assemble a car.

We can contact different companies who sell those parts and buy from them. So, in this case, those companies are the creator or factories.

We don’t care how they make them as long as we get those parts. With this factory pattern, it’s easy to test, mock and isolate.

```php
interface CarFactoryContract
{
    public function make(array $carbattery = []): Car;
}

class CarFactory implements CarFactoryContract
{
    public function make(array $carbattery = [])
    {
        return new Car($carbattery);
    }
}

$car= (new CarFactory)->make('lithium', 'nickel', 'cobalt');
```

So, if we look at this simple car factory example, we have CarFactory which is responsible to make a car, and in the end, we get an instance of a car.

Laravel uses this same pattern for the views. Let’s see an example:

```php
class PostsController
{
    public function index()
    {
        $posts= Post::all();
        return view('posts.index', ['posts' => $posts]);
    }
}
```

In this case, we’re using the view helper and calling the view method. Here, the view method is the helper method, which is calling the factory in the end. We give the view some data which the view needs to build.

```php
//Illuminate\Support\helpers.php
/**
 * @return \Illuminate\View\View\Illuminate\Contracts\View\Factory
 * /
function view($view = null, $data = [], $mergeData = [])
{
    $factory = app(ViewFactory::class);

    if(func_num_args() === 0){
        return $factory;
    }
    return $factory->make($view, $data, $mergeData);
}
```

When we look at the helper method, we see a factory is created which is the view factory. This factory calls the make() method and this method is a factory method that always creates and returns the view object for us. This factory is responsible for creating the views we use in our controller.