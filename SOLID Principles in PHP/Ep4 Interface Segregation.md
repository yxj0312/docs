# Interface Segregation

> "A client should not be forced to implement an interface that it doesn't use."

Example:

Imaging we are at the world of star trek

```php
// Because captain is depend upon worker, that means he also depend upon anything worker is depend upon.
class Captain {
    public function manage(Worker $worker)
    {
        $worker->work();
        $worker->sleep();
    }
}

class Worker {
    public function work()
    {
        
    }

    public function sleep()
    {
        
    }
}

```

And now when the caption start to hiring the android crew members, it going to be changed a little bit, because android never sleep

```php
interface WorkerInterface {
    public function work();
    public function sleep();
}

class HumanWorker implements WorkInterface {
    public function work()
    {
        return "human working";
    }

    public function sleep()
    {
        return "human sleeping";
    }
}

// We have an issue, because androidWorker implements the same interface
class AndroidWorker implements WorkInterface {
    public function work()
    {
        return "android working";
    }

    public function sleep()
    {
        return null;//Interface Segregation: A client should not be forced to implement an interface that it doesn't use."
    }
}
```

So how could we improve this?

```php
interface WorkableInterface {
    public function work();
}

interface SleepableInterface {
    public function work();
}

class HumanWorker implements WorkableInterface, SleepableInterface {
    public function work()
    {
        return "human working";
    }

    public function sleep()
    {
        return "human sleeping";
    }
}

// We could remove the sleep method entirely
class AndroidWorker implements WorkInterface {
    public function work()
    {
        return "android working";
    }

}
```

Now let's come back to our captain

```php
// Before: he had dependency of work, and whatever dependency, the worker have
// Now: he is not really interested, he just wanna to implement the workable interface
class Captain {
    public function manage(WorkableInterface $worker)
    {
        $worker->work();
    }
}
```

A Callback to open-close Principle: open to extension, but close to modification

```php
...

interface ManageableInterface {
    public function beManaged();
}

class HumanWorker implements WorkableInterface, SleepableInterface, ManageableInterface {
    public function work()
    {
        return "human working";
    }

    public function sleep()
    {
        return "human sleeping";
    }

    public function beManaged()
    {
        $this->work();
        $this->sleep();
    }
}

class AndroidWorker implements WorkInterface,  ManageableInterface{
    public function work()
    {
        return "android working";
    }

    public function beManaged()
    {
        $this->work();
    }

}



class Captain {
    public function manage(ManageableInterface $worker)
    {
        $worker->beManaged();
    }
}



```
