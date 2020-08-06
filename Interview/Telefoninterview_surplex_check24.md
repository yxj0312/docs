Surplex, 'ebay für die Industrie', 150 Mitarbeiter in Düsseldorf. 90 Mio Einsatz letze Jahr 

Thomas König, 41 Jahre alt, 23 Jahren in Entwicklung, jetzt Leiter der IT Abteilung

IT-Abteilung, 28 Mitarbeiter, 5 System Admin, Webseite Entwicklung in Hamburg

Technisch, PHP:Symfony, Busniss API, JavaScript:Ext.js

Arbeitsweise, Pull-Request durch interne Jira Server 

Fragen:

1. Unterschied zwischen Abstract Klasse und Interface

2. Nimmen Design Pattern

    2.1. Was ist singleton, erklären Sie

3. MySQL, Unterschied zwischen InnoDB und MYISAM

4. Erklären Sie EXPLAIN bei MySQL Query.

Zusätzlich Frage,
Wollen Sie in der Pro-arbeit Zeit, eine PHP-Zertifizierung zu erhalten?

## Check24

### HTML

1. What is target

2. What is iframe

3. What is viewpoint and meta tag

4. What is Web Components

5. ```<ol>``` and ```<ul>``` when to use them

6. Can ```<div>``` be written in ```<span>``` 

### CSS

1. CSS selector symbols

2. CSS Attribute Selector

3. CSS Box Model

4. Image spilt

5. Position absolute and relative

6. How to make two div horizon in one line

    inline-block or float

7. Difference display: none and visible:hidden

display:none not rendered, both exist in DOM

### JavaScript

1. What's closure

2. What's object. difference with other language

    JavaScript is Object-Based, not Object-Oriented, There is a way to achieve 'normal' inheritance in JavaScript (Reference here), but the basic model is based on prototyping.

3. What's template String

    `string text`

4. "==" & "!="

5. primitive/object types

    Primitive Data types are passed by Value and Objects are passed by reference

    The big differences between primitive types and objects are

    primitive types are immutable, objects only have an immutable reference, but their value can change over time
    primitive types are passed by value. Objects are passed by reference
    primitive types are copied by value. Objects are copied by reference
    primitive types are compared by value. Objects are compared by reference

    ```JavaScript
    // Using a string method doesn't mutate the string
    var bar = "baz";
    console.log(bar);               // baz
    bar.toUpperCase();
    console.log(bar);               // baz

    // Using an array method mutates the array
    var foo = [];
    console.log(foo);               // []
    foo.push("plugh");
    console.log(foo);               // ["plugh"]

    // Assignment gives the primitive a new (not a mutated) value
    bar = bar.toUpperCase();       // BAZ


    let name = 'Flavio' // If we copy a primitive type in this way:
    let secondName = name

    name = 'Roger' //Now we can change the name variable assigning it a new value, but secondName still holds the old value, because it was copied by value:
    secondName //'Flavio'


    <!-- If we have an object: -->
    let car = {
        color: 'yellow'
    }

    <!-- and we copy it to another variable: -->
    let car = {
        color: 'yellow'
    }

    let anotherCar = car

    <!-- in this case anotherCar points to the same object as car. If you set -->
    car.color = 'blue'
    anotherCar.color //blue
    ```

6. self executing anonymous function

    The self-executing anonymous function is a special function which is invoked right after it is defined. There is no need to call this function anywhere in the script. This type of function has no name and hence it is called an anonymous function. The function has a trailing set of parenthesis. The parameters for this function could be passed in the parenthesis.

    ```JavaScript
    (function (parameters) {
        // Function body
    })(parameters);
    ```

### PHP

1. What's abstract class

2. Difference abstract class and interface

3. When should we use interface

4. Static class

5. Twig

6. Dependency injection

7. Factory

8. How to get the basic method from a extended class

   Parent::

9. What is SQL injection, how to prevent in PHP, give some example

10. What's JSON, when should be used

    JavaScript Object Notation. Es ist ein kompaktes Datenformat in einer einfach lesbaren Textform und dient dem Zweck des Datenaustausches zwischen Anwendungen. JSON ist von der Programmiersprache unabhängig. Parser und Generatoren existieren in allen verbreiteten Sprachen.

    JSON can be used to send data from the server to the browser, for example, because it is easy for JavaScript to parse into a normal JavaScript data structure.

### MySQL

1. Speed of LIKE. when it will be faster?

    the LIKE with only a suffix wildcard is much faster

2. What's view, what's index

3. What's transaction

   A transaction is a logical unit of work that contains one or more SQL statements. A transaction is an atomic unit. The effects of all the SQL statements in a transaction can be either all committed (applied to the database) or all rolled back (undone from the database).
