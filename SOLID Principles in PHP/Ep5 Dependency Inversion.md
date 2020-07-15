# Dependency Inversion（倒置，反转） does not equal Dependency Injection

> Depend on abstractions not on concretions（具体编码）

> All of this is about decoupling code.

## High level vs. low level code

> High level code isn't as concerned with details
> Low level code is more concerned with details and specifics.

-> Your high level code should never depend on the low level code, or one class should never force to depend upon an implementation, it should depend upon a contract, an abstraction or an interface.

## Example

1.
> Image you have a TV or stereo, we need someway to provide power to these devices. But image we didn't have, instead we have to connect the wiring from you house, up the wiring to the devices. We have an outlets, and think of outlet as an interface, or in another word, these devices don't need to understand how they receive power,they simply need to rely on the fact,  there is some interface they can hook into that will give them what they need.

> Notice: all the devices they don't own the interface, they confirm the interface.

2. Bad example:

```php
class PasswordReminder {
    private $dbConnection;

    public function __construct(MySQLConnection $dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }
}
```

High level module: PasswordReminder should not upon low level module: MySQLConnection

Instead we will code to an interface


```php
interface ConnectionInterface {
    public function connect();
}

class DbConnection implements ConnectionInterface {
    public function connect()
    {
        
    }
}

class PasswordReminder {
    private $dbConnection;

    public function __construct(ConnectionInterface $dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }
}
```

all depend on abstraction.

> Dependency Injection is important: it allow us to confirm the principle, it makes test ability much easier, etc.

### Who owns above interface?

Inversion of Control(IOC)