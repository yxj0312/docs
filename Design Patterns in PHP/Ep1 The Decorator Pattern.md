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


// If the customer want to know how much is the inspection, call the function, and get 19
echo(new BasicInspectionAndOilChange())->getCost(); 
```

And how about a tire rotation
