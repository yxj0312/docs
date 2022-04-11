# Strategy pattern

The strategy pattern is a behavioral pattern. Defines a family of interchangeable algorithms. It always uses an interface. This means the implementation details remain in separate classes. Its programs are to an interface, not an implementation.

Let’s go with the example of the car. Suppose, we have a new car ready and we’re going to deliver it. To deliver the car, we need a strategy. There are many ways to deliver a car. At first, we need to define the interface.

```php
interface DeliveryStrategy
{
    public function deliver(Address $address):DeliveryTime;
}
```

Here, our interface name is DeliveryStrategy. In this interface, we have a method called deliver. We’re going to provide an address and it’ll return something for us. So, each strategy needs a deliver method and an address object.

```php
class ShipDelivery implements DeliveryStrategy
{
    public function deliver(Address $addrress):
    {
        $route= new ShipRoute($address);
        echo $route->calculateCosts();
        echo $route->calculateDeliveryTime();
    }
}
```

For example, we’re going to deliver the car by ship. The shipping delivery uses the shipping route. It calculates the delivery costs and time for us. We can now create a CarDelivery class that expects one of the delivery strategies and deliver the car to us.

```php
class CarDelivery
{
    public function deliverCar(DeliveryStrategy $strategy, Address $address)
    {
        return $strategy->deliver($address);
    }
}
$address= new Address('example address 12345');
$delivery= new CarDelivery();
$delivery=>deliver(new ShipDelivery(), $address);
```

Because the DeliveryStrategy is an interface we give it to the CarDelivery class to add new strategies. We already have ShipDelivery and now we can create another delivery strategy like TruckDelivery if we want to deliver the car by truck.

It can have different calculations but uses the same interface. Each implementation will be interchangeable means we can switch around but still, it’s going to do the same work which is delivery.

We can include our XML loader to translate the XML file and insert it. We can create our own loader folder and place it in our service provider.

```php
class XMLLoader implements Illuminate\Translation\LoaderInterface
{
    //Load the messages for the given locale.
    public function load($locale, $group, $namespace= null);

    //Add a new namespace to the loader. 
    public function addNamespace($namespace, $hint);

    //Get an array of all the registered namespaces.
    public function namespace();
}
```

In this example, class XMLloader expects the LoaderInterface which is the strategy just like our delivery strategy. There is only one load implemented in Laravel, but as we’ve seen, we can create our own load. The addNamespace() method passes the namespaces to the load() function as grouped.
