# The chain of responsibility pattern (Zuständigkeitskette)

> The chain of responsibility pattern is definitely an interesting one. It literally allows us to chain any number of objects, where each has the option of either handling a particular request, or deferring to the next object in the cycle.

### Example

> Imaging that when you leave home, all the things you need to check:
- Is the alarm on?
- Are the lights off?
- Have you lock the doors?

Let's the chain of responsibility pattern to illustrate this flow:

These classes are responsible to the insurance that the home is in the proper. 

```php
class Locks {
    public function check($request)
    {
        
    }
}

class Lights {

}

class Alarm {

}

// DTO(data transfer object)
class HomeStatus {
    public $alarmOn = true;
    public $locked = true;
    public $lightsOff = true
}

```

