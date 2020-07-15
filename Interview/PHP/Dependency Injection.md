# Dependency Injection

## What is dependency injection

[Dependency Injection: Huh?](https://code.tutsplus.com/tutorials/dependency-injection-huh--net-26903)

Dependency injection is a technique in which an object receives other objects that it depends on.

These other objects are called dependencies. In the typical "using" relationship the receiving object is called a client and the passed (that is, "injected") object is called a service.

"Dependency Injection is where components are given their dependencies through their constructors, methods, or directly into fields."



````php
// Instead hardcoding
class Photo {
    /**
     * @var PDO The connection to the database
     */
    protected $db;
 
    /**
     * Construct.
     */
    public function __construct()
    {
        $this->db = DB::getInstance();
    }
}

// We should do

class Photo {
    /**
     * @var PDO The connection to the database
     */
    protected $db;
 
    /**
     * Construct.
     * @param PDO $db_conn The database connection
     */
    public function __construct($dbConn)
    {
        $this->db = $dbConn;
    }
}
 
$photo = new Photo($dbConn);

// Or with a set injection

class Photo {
    /**
     * @var PDO The connection to the database
     */
    protected $db;
 
    public function __construct() {}
 
    /**
     * Sets the database connection
     * @param PDO $dbConn The connection to the database.
     */
    public function setDB($dbConn)
    {
        $this->db = $dbConn;
    }
}
 
$photo = new Photo;
$photo->setDB($dbConn);

// Problem: it makes the class considerably more difficult to work with. 

$photo = new Photo;
$photo->setDB($dbConn);
$photo->setConfig($config);
$photo->setResponse($response);

// Solution: Inversion of Control (IoC), to create a container class that will handle the brunt of the work for us.

// Also frequently called "Container"
class IoC {
    /**
     * @var PDO The connection to the database
     */
    protected $db;
 
    /**
     * Create a new instance of Photo and set dependencies.
     */
    public static newPhoto()
    {
        $photo = new Photo;
        $photo->setDB(static::$db);
        // $photo->setConfig();
        // $photo->setResponse();
        return $photo;
    }
}
 
$photo = IoC::newPhoto();

// Second options: to write a generic registry container, like so:
class IoC {
    /**
     * @var PDO The connection to the database
     */
    protected static $registry = array();
 
    /**
     * Add a new resolver to the registry array.
     * @param  string $name The id
     * @param  object $resolve Closure that creates instance
     * @return void
     */
    public static function register($name, Closure $resolve)
    {
        static::$registry[$name] = $resolve;
    }
 
    /**
     * Create the instance
     * @param  string $name The id
     * @return mixed
     */
    public static function resolve($name)
    {
        if ( static::registered($name) )
        {
            $name = static::$registry[$name];
            return $name();
        }
 
        throw new Exception('Nothing registered with that name, fool.');
    }
 
    /**
     * Determine whether the id is registered
     * @param  string $name The id
     * @return bool Whether to id exists or not
     */
    public static function registered($name)
    {
        return array_key_exists($name, static::$registry);
    }
}

// Now we can register and resolve dependencies through the IoC class, like this:

// Add `photo` to the registry array, along with a resolver
IoC::register('photo', function() {
    $photo = new Photo;
    $photo->setDB('...');
    $photo->setConfig('...');
 
    return $photo;
});
 
// Fetch new photo instance with dependencies set
$photo = IoC::resolve('photo');

// Before
$photo = new Photo;
 
// After
$photo = IoC::resolve('photo');

// Magic Methods: If we want to reduce the length of the IoC class even further, we can take advantage of magic methods - namely __set() and __get(), which will be triggered if the user calls a method that does not exist in the class.
class IoC {
    protected $registry = array();
 
    public function __set($name, $resolver)
    {
        $this->registry[$name] = $resolver;
    }
 
    public function __get($name)
    {
        return $this->registry[$name]();
    }
}

// Basic usage
$c = new IoC;
$c->mailer = function() {
  $m = new Mailer;
  // create new instance of mailer
  // set creds, etc.   
  return $m;
};
 
// Fetch, boy
$mailer = $c->mailer; // mailer instance

```

## Why is used