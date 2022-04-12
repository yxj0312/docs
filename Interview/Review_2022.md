# Review 2022

## PHP

### Dependency Injection

#### Definition

[Dependency Injection: Huh?](https://code.tutsplus.com/tutorials/dependency-injection-huh--net-26903)

- Dependency injection
  
    Dependency injection is a technique in which an object receives other objects that it depends on.

- Dependency/Service/Client
  
    These other objects are called dependencies.

    In the typical "using" relationship the receiving object is called a client and the passed (that is, "injected") object is called a service.

    "Dependency Injection is where components are given their dependencies through their constructors, methods, or directly into fields."

- Ioc: Inversion of Control (IoC) / Container
  
    Solution: Inversion of Control (IoC), to create a container class that will handle the brunt of the work for us.

- Laravel Service Container
  
  The Laravel service container is a powerful tool for managing class dependencies and performing dependency injection. Dependency injection is a fancy phrase that essentially means this: class dependencies are "injected" into the class via the constructor or, in some cases, "setter" methods.

### SOLID

- Single Responsibility
- Open-Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

### Design Pattern

[Laravel Design Pattern](https://codesource.io/brief-overview-of-design-pattern-used-in-laravel/)

#### Builder

#### Factory

#### Provider

#### Repository

#### Facade

#### Decorator

#### Adapter

#### Template

#### Strategy

#### The Chain of Responsibility

### Laravel architecture Concepts

#### Laravel Service Container

#### Laravel Service Providers

#### Facades

Facades provide a "static" interface to classes that are available in the application's service container.

## JavaScript

### Vue

#### Vue3 Reactivity

#### Vuex

#### Vue Testing

### Web Api

#### GraphQL

### DevOps

#### Docker

### Database

### Join

- Inner join: identical with join in MySQL, only give the result where there are some matchers on both tables

- With this query is saying: on the condition, that there is no match, what should I do?

  - Inner join: forget it, discard entirely.
  - Left join: on the condition there is no match, I want to favor the left side (in this query, it is store table): So if there is no match, favor the store table, I alway want to see every records of the store table.
  - Right join: we switch it, if there is no match favor the right side of the joined table, which is address here.
  - Left join and left outer join are the same thing

- COALESCE takes any number of arguments and returns the first value that is not null.

```
  COALESCE(x,y,z) = x if x is not NULL
  COALESCE(x,y,z) = y if x is NULL and y is not NULL
  COALESCE(x,y,z) = z if x and y are NULL but z is not NULL
  COALESCE(x,y,z) = NULL if x and y and z are all NULL
```

COALESCE can be useful when you want to replace a NULL value with some other value. In this example you show the name of the party for each MSP that has a party. For the MSP with no party (such as Canavan, Dennis) you show the string Non

- CASE allows you to return different values under different conditions.

If none of the conditions match (and there is not ELSE) then NULL is returned.
