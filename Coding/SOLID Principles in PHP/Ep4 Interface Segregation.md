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

Some real world example:

PasswordBroker.php of Laravel (old version)

```php
class PasswordBroker {
    public function sendReminder(RemindableInterface $user, $token, Closuer $callback = null)
    {
        
    }
}
```

Why RemindableInterface is used here, not just User Model?

Because User is extends from Eloquent, which means, if we use User here, PasswordBroker is depend upon user/Eloqquent.

You make one small change in one part of the application, it influence the other part of the application, that depend on it.

And Why/Does the passwordBroker need the knowledge of Eloquent?

The answer is no. it just need to access some kind of object to provide the necessary methods.

So let's take a look at RemindableInterface

```php
interface RemindableInterface {
    /**
    * Get the e-mail address where password reminders are sent.
    * @return string
    */
    public function getReminderEmail()
    {
        
    }
}
```

we just call getReminderEmail in the sendReminder()

we go back to User object, it implements RemindableInterface, which get the e-mail address in the user object. That's the only thing we need.
