# Design Pattern used in PHP or Laravel

## Decorator

Write an interface for basic function, then inject it with a constructor and implement it with extra functions.
i.e interface CarBasicService with getCost() method, a basicInspection could implement this with an basic preis, and then an OilChange class implement the CarBasicService with extract price

## Adapter

Different plug in US und EU. same with different API for amazon cloud or azure cloud.

## Strategy

Maildriver in Laravel, we could use 'smtp', 'mail', 'mailgun', 'log' by it. All we have to do, is set a driver here.
Behind it, is a strategy design pattern.

## Template Method

The template method is a method in a superclass, usually an abstract superclass, and defines the skeleton of an operation in terms of a number of high-level steps. These steps are themselves implemented by additional helper methods in the same class as the template method.

## Observer

Laravel Observer: it is used to make clusters of event listeners for a model.(created, updated, deleted, forceDeleted)

## Factory

DB Factory: make an instance, instead of new