# Questions

## PHP

### Difference between "self" and "this"

- Use $this to refer to the current object

- Use self to refer to the current class

```php
// for non-static members
$this->member;
// for static members
self::$member;
```

### What is a static class

it call a function without an instance of the class.

#### What is a class via :: means

:: is used to access static methods that do not require object initialization

#### When use it

- use them when they are independently related to a class

- often to represent a service class which should not be instantiated many times

#### Disadvantage

- prevent you from using many OOP features like inheritance, interface

Instead, you could use:

- Singleton: force a class to have only one instance

- Service: Dependency injection

### Public Protected Private

public: make variable/function available from anywhere
private: visible in its own class only
protected: can be accessed only within the class itself and by inheriting and parent class

### Difference between single-quoted('') and double-quoted("") in PHP

double-quoted: 

- variables in the strings will be evaluated.

- display escape characters

### const vs define()

const:

- faster
- defines constant at compile time

define():

- function, can not be used for class definition
- define them at run time

### "==" vs. "==="

"===": it will only return true if both operands have the same type and the same value

#### Which is faster

"===" is faster, it doesn't need to perform typecasting.

### "&=" mean

- two variables refer to the same content.

- pass variables by reference

- return by reference

### What's SOLID

Principle:

- Single-Responsibility
  
  jede Klasse nur eine einzige Verantwortung haben solle.
  
- Open-Closed

    Open for extension and closed for modification

    Vererbung: Überschriebene Methoden verändern auch nicht das Verhalten der Basisklasse, sondern nur das der abgeleiteten Klasse.

- Liskovsches Substitutions

    Ersetzbarkeitsprinzip fordert, dass eine Instanz einer abgeleiteten Klasse sich so verhalten muss, dass jemand, der meint, ein Objekt der Basisklasse vor sich zu haben, nicht durch unerwartetes Verhalten überrascht wird, wenn es sich dabei tatsächlich um ein Objekt eines Subtyps handelt.

- Interface-Segregation
  
  Das Interface-Segregation-Prinzip dient dazu, zu große Interfaces aufzuteilen. Die Aufteilung soll gemäß den Anforderungen der Clients an die Interfaces gemacht werden.

  “Clients should not be forced to depend upon interfaces that they do not use.”

- Dependency-Inversion

    Das Dependency-Inversion-Prinzip beschäftigt sich mit der Reduktion der Kopplung von Modulen.

    Es besagt, dass Abhängigkeiten immer von konkreteren Modulen niedriger Ebenen zu abstrakten Modulen höherer Ebenen gerichtet sein sollten.

    “A. High-level modules should not depend on low level modules. Both should depend on abstractions.
    B. Abstractions should not depend upon details. Details should depend upon abstractions.”

    „A. Module hoher Ebenen sollten nicht von Modulen niedriger Ebenen abhängen. Beide sollten von Abstraktionen abhängen.
    B. Abstraktionen sollten nicht von Details abhängen. Details sollten von Abstraktionen abhängen.“

### What is dependency injection

  [Dependency Injection](https://github.com/yxj0312/docs/blob/master/Interview/PHP/Dependency%20Injection.md)

  dependency injection is a technique in which an object receives other objects that it depends on.

#### Three types

- Constructor injection

- setter injection

- interface injection

### Inversion of Control

- Container

### Example in Laravel

Service container in Laravel

#### Why is used

It is a method for writing better code. more maintainable and testable.

### Design pattern

[Design Pattern](https://github.com/yxj0312/docs/blob/master/Interview/PHP/Design%20Pattern.md)

#### Decorator

##### Problem of decorator

- Responsibilities should be added to (and removed from) an object dynamically at run-time.
  
- A flexible alternative to subclassing for extending functionality should be provided.

##### Solution of decorator

- implement the interface of the extended (decorated) object

- perform additional functionality before/after forwarding a request.
  
#### Adapter

An adapter allows you to translate one interface for use with another.

##### Problem of adapter

- How can a class be reused that does not have an interface that a client requires?
  
- How can classes that have incompatible interfaces work together?

- How can an alternative interface be provided for a class?

##### Solution of adapter

- Define a separate adapter class that converts the (incompatible) interface of a class (adaptee) into another interface (target) clients require.

- Work through an adapter to work with (reuse) classes that do not have the required interface.

##### Real world example

Laravel FilesystemAdapter S3, FTP...

#### Strategy

- viele verwandte Klassen sich nur in ihrem Verhalten unterscheiden.
  
- unterschiedliche (austauschbare) Varianten eines Algorithmus benötigt werden.

- Die Klasse Strategie definiert nur eine Schnittstelle (interface) für alle unterstützten Algorithmen

- Die Implementierung der eigentlichen Algorithmen finden sich erst in den Ableitungen wieder

Maildriver in Laravel 'smtp', 'mail', 'local'

#### Factory

- make an instance, instead of new

#### Observer

- A one-to-many dependency between objects should be defined without making the objects tightly coupled.

- Define Subject and Observer objects.
- so that when a subject changes state, all registered observers are notified and updated automatically (and probably asynchronously)

Real world example: Event Observer of laravel, observe serval events like created, updated, forceDeleted.

### Differnce get and post

get: parameter can be seen in url, post can't

get allows you to send a limited amount of data in the header, post sends a large amount of data in the body

get request can be cached, post can't

get request send header and data, with 200 response, post send header first, with 100 response then send data with 200 response

### Magic Methods

#### __construct()

the constructor of a class

#### ````__set()````

The __set() method will be called when setting a member variable of a class.

The __set() is run when writing data to inaccessible properties.

#### ````__get()````

The __get() method will be called when getting a member variable of a class.

The __get() magic method reads data from inaccessible properties.

#### ````__sleep()````

The __sleep() method will be called first when executing serialize().

serialize() checks if the class has a function with the magic name __sleep(). If so, that function is executed prior to any serialization. It can clean up the object and is supposed to return an array with the names of all variables of that object that should be serialized. If the method doesn't return anything then NULL is serialized and E_NOTICE is issued.

#### ````__wakeup()````

The __wakeup() method will be called first when deserialization() is executed.

The intended use of __wakeup() is to reestablish any database connections that may have been lost during serialization and perform other reinitialization tasks.

#### ````__invoke()````

The __invoke() method will be called when trying to call an object in a way of calling function.

### Hashing method

crypt() and hash() are better than md5() sha1() or sha256()

password with these algorithms can create vulnerability.

### Type casting in PHP

- (int) - cast to integer

- (bool) - cast to  boolean

- (float) - cast to float

- (array)

- (object)

- (string)

### Session and Cookie

A session is a logical object enabling us to preserve temporary data across multiple PHP pages.

session save at server, while cookie save at client. sessionID save at cookie or could send via the url

### require, require_once, include

### final method, classes

the class cannot be extended or the method cannot be overridden.

### for and foreach

foreach is only used by array and object

### MVC

Model-View-Controller architecture

### ORM

Object Relational Mapping, in Laravel Eloquent

provide simple active recode implementation working with the database.

### Laravel Facades

Facades provide a "static" interface to classes that are available in the application's service container. like (Route::get())

### Laravel traits

A group of functions that you include within another class. A trait is like an abstract class. You cannot instantiate directly, but its method can be used in concreate class.

### Laravel Advantages

- blade template engine
  
- a version control system that helps with simplified management of migrations

- auto-loading features

- IOC Inversion of Control container

### Session in Laravel

Session is used to pass user information from one web page to another. Laravel provides various drivers like a cookie, array, file Memcached, and Redis to handle session data.

#### How to access session data

Session data be access by creating an instance of the session in HTTP request. Once you get the instance, use get() method with a "Key" as a parameter to get the session details.

### Authentication and authorization

Authentication: confirming user identities through credentials
Authorization refers to gathering access to the system.

### CSRF

helps defend against form-based mmalicious attacks and hacks

### PHP type-hinting,  why we should have that

function mySuperFunction(): int
{
    return "hello world";
}

No problem with this code. The type declaration indicate that the method should return an int. Instead, it returns a string. It is not astonishing that PHP throw an error:

Fatal error: Uncaught TypeError: Return value of mySuperFunction() must be of the type integer, string returned.

### PSR

PHP Standards Recommendations.
PSR-2 which is a coding style guide
PSR-4: Autoloader

### Abstract class and interface

#### Abstract class

provide some functionality and leave the rest for derived class

#### Interface

cannot contain any functionality, it only contains definitions of the methods.