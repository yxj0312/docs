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

double-quoted: variables in the strings will be evaluated.

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

- pass variables bey reference

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

  set Injection instead of hard-cording

  Inversion of Control

  Container

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

