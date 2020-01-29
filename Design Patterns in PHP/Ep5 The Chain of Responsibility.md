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
abstract class HomeChecker {

    protected $successor;

    public abstract function check(HomeStatus $home);

    public function succeedWith(HomeChecker $successor)
    {
        $this->successor = $successor;
    }

    public function next(HomeStatus $home)
    {
        if ($this->successor) {
            $this->successor->check($home);
        }
    }
}

class Locks extends HomeChecker {
    public function check(HomeStatus $home)
    {
        if (! $home->locked) {
            throw new Exception('The doors are not locked!! Abort abort.')
        }

        $this->next($home);
    }
}

class Lights {
    public function check(HomeStatus $home)
    {
        if (! $home->lightsOff) {
            throw new Exception('The lights are still on!! Abort abort.')
        }

        $this->next($home);
    }
}

class Alarm {
    public function check(HomeStatus $home)
    {
        if (! $home->alarmOn) {
            throw new Exception('The alarm has not been set!! Abort abort.')
        }

        $this->next($home);
    }
}

// DTO(data transfer object)
class HomeStatus {
    public $alarmOn = true;
    public $locked = true;
    public $lightsOff = true
}

$locks = new Locks;
$lights = new Lights;
$alarm = new Alarm;

$status = new HomeStatus;

$locks->check($status);

```

