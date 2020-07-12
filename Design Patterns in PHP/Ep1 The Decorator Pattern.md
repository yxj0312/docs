> Image you run some car repair or car maintain shop, you will offer some services. One of them will be the basic-inspection.

```php
class BasicInspection
{
    public function getCost()
    {
        return 19;
    }
}


// If the customer want to know how much is the inspection, call the function, and get 19
echo(new BasicInspection())->getCost(); 
```

> But now what about a basic inspection as well as an oil change, how might we do that?

>maybe u do that

```php
class BasicInspectionAndOilChange
{
    public function getCost()
    {
        return 19 + 19;
    }
}


// If the customer want to know how much is the inspection, call the function, and get 19 + 19
echo(new BasicInspectionAndOilChange())->getCost();
```

And how about a tire rotation

```php
class BasicInspectionAndOilChangeAndTireRotation
{
    public function getCost()
    {
        return 19 + 19 + 10;
    }
}


// If the customer want to know how much is the inspection, call the function, and get 19 + 19 + 10
echo(new BasicInspectionAndOilChangeAndTireRotation())->getCost(); 
```

> Very quickly the server breaks down for following reasons:

1. The class numbers will be insane
2. Hard coding here, if the  basic inspection changes to 25, you will have to change it in multiple place
3. There is no way to decorator or extend the behavior of our basicInspection without hard coding or creating these new classes

> So we can begin with a contract called CarService

```php
interface CarService {
    public function getCost();
}

class BasicInspection implements CarService
{
    public function getCost()
    {
        return 25;
    }
}
```

> Now if we want to stack on responsibilities, we could had a decorator

```php
class OilChange implements CarService
{
    public function getCost()
    {
        return 29;
    }
} 
```

> How can we add these cost?

For a decorator we could inject it.

```php
class OilChange implements CarService
{
    protected $carService;

    function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }

    public function getCost()
    {
        return 29 + $this->carService->getCost();
    }
}
```

```php
// 25
echo(new BasicInspection())->getCost();

// Now we want to decorator this
// Wrapper our core services with any number of decorators

echo(new OilChange(new BasicInspection()))->getCost();
```

> Tips: 

- You have your core service: BasicInspection
- And then you have your decorator that you force to implement the same contract: OilChange
- The decorator must accept the constructor, some instances or implementation of that some contract: CarService
- This allows us to build up this object in run time rather than falling back to something like inheritance.


```php
class TireRotation implements CarService
{
    protected $carService;

    function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }

    public function getCost()
    {
        return 15 + $this->carService->getCost();
    }
} 

echo(new TireRotation(new OilChange(new BasicInspection())))->getCost(); 
```

> What is cool about this pattern

- Build up this object at run time
- And had them be as dynamic as they need to be

```php
interface CarService {
    public function getCost();

    public function getDescription();
}

class BasicInspection implements CarService
{
    public function getCost()
    {
        return 25;
    }

    public function getDescription()
    {
        return 'Basic Inspection';
    }
}

class OilChange implements CarService
{
    protected $carService;

    function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }

    public function getCost()
    {
        return 29 + $this->carService->getCost();
    }

    public function getDescription()
    {
        return $this->carService->getDescription() . ', and oil change';
    }
} 

class TireRotation implements CarService
{
    protected $carService;

    function __construct(CarService $carService)
    {
        $this->carService = $carService;    
    }

    public function getCost()
    {
        return 15 + $this->carService->getCost();
    }

    public function getDescription()
    {
        return $this->carService->getDescription() . ', and a tire rotation';
    }
} 
```
```php
// We want to add tire rotation, we don't have to build up another class or refer to an inheritance to find a way to make this work,  we just decorated as needed at run time
$service = newTireRotation(new BasicInspection);

echo $service->getDescription();
echo $service->getCost();
```

> Understanding when this will be appropriated vs. inheritance.

- Here, why is exactly that case?

Image we just have a simple car service class here (wasn't part of that contract):

```php
class CarService
{
    protected $cost = 25;

    public function getCost()
    {
        return $this->cost;
    }

    public function setCost()
    {
        $this->cost = $cost;
    }

    public function getDescription()
    {
        return 'Basic Inspection';
    }

    // Following functions will dynamically update the cost
    public function withOilChange()
    {
        return $this->cost += 29;
    }

    public function withTireRotation()
    {
        return $this->cost += 15;
    }
}
```

> what the downside into this?

- We are completely breaking many of this SOLID principle, specifically the 'Open Close Principle (OCP)'
    - Open to extension but close to modification
    - Ist this close to modification?
        - No. Every time we add a new service, you would have to return to this class 'CarService' and add additional methods and possibly change existing codes -> break and more bugs
        - However, if we instead to use interface to extend functionality and behavior what we need to, we never have to worry about any of this stuffs.
        - We can get ride of all of this, and prefer to decorate to add behavior what we need to 
        - As long as each of this related decorators implement a carService interface, doing this stuff is trivial(不重要的). Just make sure that you extend will eventually(终究) make a call to that class that is wrapping.

```php
// i.e. TireRotation is wrapping OilChange, and OilChange is wrapping BasicInspection
echo(new TireRotation(new OilChange(new BasicInspection())))->getCost(); 
```

> End

This Pattern is appropriate for the most instance, where:
you want to change or just behavior in some way and you are feeling pressure than to simply inherit from another class

> Always ask yourself

If I inherit from that class, do I really need to pulling the entirety(整体) of that functionality or do I instead simply need a behavior of one or two methods

If that is the case, then maybe you could prefer to the decorator pattern
