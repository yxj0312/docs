22.01.2020
# Fachliche Fragen:
1. Diffence between '' and "" in PHP
    > Basically, single-quoted strings are plain text with virtually no special case whereas double-quoted strings have variable interpolation (e.g. echo "Hello $username";) as well as escaped sequences such as "\n" (newline.)
2. New Operator from PHP 7.x
    - Spaceship operator <=>

    > The spaceship operator is used for comparing two expressions. It returns -1, 0 or 1 when $a is respectively less than, equal to, or greater than $b. Comparisons are performed according to PHP's usual type comparison rules.

    - TerryE ??
    ```php
    $a = ''; // or 0 or false

    $b = $a ?? 'a'; 
    // $b is '' or 0 or false

    $c = $a ?: 'a';
    // $c is 'a'
    ```
3. Explain RegeX

    > Ein regulärer Ausdruck (englisch regular expression, Abkürzung RegExp oder Regex) ist in der theoretischen Informatik eine Zeichenkette, die der Beschreibung von Mengen von Zeichenketten mit Hilfe bestimmter syntaktischer Regeln dient. Reguläre Ausdrücke finden vor allem in der Softwareentwicklung Verwendung. Neben Implementierungen in vielen Programmiersprachen verarbeiten auch viele Texteditoren reguläre Ausdrücke in der Funktion „Suchen und Ersetzen“. Ein einfacher Anwendungsfall von regulären Ausdrücken sind Wildcards.

    3.1 Example?

    >  Like condition of acount-creating (must have one uppercase)

4. Do you know some coding principle? explain some

    > SOLID; O (open and closed): for open to extension, close to modification
    > KISS - keep it simple, stupid

5. Diffence between get and post
    > get send header and data, post send header first, get 100 and then send data, get 200.

6. Explain cookie

7. How could we get the cookie?

    > In the header

8. Do you know XDebug, explain it.
    ```
    Xdebug is an extension for PHP to assist with debugging and development.

    It contains a single step debugger to use with IDEs
    it upgrades PHP's var_dump() function
    it adds stack traces for Notices, Warnings, Errors and Exceptions
    it features functionality for recording every function call and variable assignment to disk
    it contains a profiler
    it provides code coverage functionality for use with PHPUnit
    ```
9. MySQL: How to Optimizie SELECT statements and Other Queris

    ```
    EXPLAIN SELECT select_options
    ```

10. Do you know some MySQL Securtiy guidelines

    ```
    Security Guidelines :

    Except MySQL root account does not permit anyone to access the user table in the MySQL database.
    Use the GRANT and REVOKE statements to control access to MySQL. Do not grant unnecessary privileges and never grant privileges to all hosts.
    Never store simple text passwords in your database. Store the hash value using  SHA2(), SHA1(), MD5() functions or other hashing function in a different way. Try to use a complex password.
    Try to use a firewall and put MySQL behind the firewall.
    3306 is the default user port of MySQL and this port should not be accessible from untrusted hosts. You can scan the ports from Internet using a tool such as nmap. From a remote machine you can check whether the port is open or not with this command: shell> telnet server_host 3306. If telnet hangs or the connection is refused, the port is blocked. If you get a connection and some garbage characters, the port is open and should be closed on your firewall or router, unless you really have a good reason to keep it open.
    Some applications access MySQL database for different a purpose. Never trust these input data entered by the user and must validate properly before access database.
    Do not transmit unencrypted data over the Internet. Use an encrypted protocol such as SSL (MySQL supports internal SSL connections) or SSH.
    Use tcpdump and strings utilities. By issuing this command shell> tcpdump -l -i eth0 -w - src or dst port 3306 | strings you can check whether MySQL data streams are unencrypted or not.
    ```

11. Do you know some security problems of frontend, javaScript?
    > CSRF 

12. Explain with example what is CSRF

13. Say somthing about PHP type-hint/typing, why we should have that
    ```PHP
    function mySuperFunction(): int
    {
        return "hello world";
    }
    
    No problem with this code. The type declaration indicate that the method should return an int. Instead, it returns a string. It is not astonishing that PHP throw an error:

    Fatal error: Uncaught TypeError: Return value of mySuperFunction() must be of the type integer, string returned.
    ```

14. Do you konw any magic methods of PHP, give one example

    ```php
    The methods which begin with two underscores (__) are called Magic Methods in PHP, and they play an important role. Magic methods include:

    Method Name	Description
    __construct()	the constructor of a class
    __destruct()	the destructor of a class
    __call($funName, $arguments)	The __call() method will be called when an undefined or inaccessible method is called.
    __callStatic($funName, $arguments)	The __callStatic() method will be called when an undefined or inaccessible static method is called.
    __get($propertyName)	The __get() method will be called when getting a member variable of a class.
    __set($property, $value)	The __set() method will be called when setting a member variable of a class.
    __isset($content) 	The __isset() method will be called when calling isset()  or empty() for an undefined or inaccessible member.
    __unset($content)	The __unset() method will be called when calling reset() for an undefined or inaccessible member.
    __sleep()	The __sleep() method will be called first when executing serialize().
    __wakeup()	The __wakeup() method will be called first when deserialization() is executed.
    __toString()	The __toString() method will be called when using echo method to print an object directly.
    __invoke()	The __invoke() method will be called when trying to call an object in a way of calling function.
    __set_state($an_array)	The __set_state() method will be called when calling var_export().
    __clone()	The __clone() method will be called when the object is copied.
    __autoload($className)	Try to load an undefined class.
    __debugInfo()	Print debug information.
    ```

    (Have no idea what is this about at first, but after some hints from interviewer, give __invoke as example)

16. Talk about __get and __set, why we should use it
    ```php
    __set() magic method

    The __set() is run when writing data to inaccessible properties.

    __get() magic method

    The __get() magic method reads data from inaccessible properties.

    Example

    <?php
    class MyClass
    {
    private $fname;
    private $lname;
    private $email;

    // set user's first name
    public function setFName($fname)
    {
    $this->fname = $fname;
    }
    
    // get user's first name
    public function getFName()
    {
    return $this->fname;
    }

    // set user's last name
    public function setLName($lname)
    {
    $this->lname = $lname;
    }
    
    // get user's last name
    public function getLName()
    {
    return $this->lname;
    } 

    // set user's email address

    public function setEmail($email)

    {

    $this->email = $email;

    }

    

    // get user's email address

    public function getEmail()

    {

    return $this->email;

    }

    }

    

    $user = new MyClass();

    $user->setFName('Ajeet');

    $user->setLName('Dubey');

    $user->setEmail('adubey@gamil.com');

    echo 'First Name: ' . $user->getFName().' </br>Last Name: ' . $user->getLName() .'</br> Email: ' . $user->getEmail();

    ?>
    ```

17. You mentioned PSR-2, do you know other code styling guide?
    ```php
    PSR-2 Coding Style Guide
    CakePHP Coding Standards
    Symfony Coding Standards
    WordPress Coding Standards
    FuelPHP Coding Standards
    Referenced Articles
    ```
    17.1. PSRs are PHP standards Recommaendations, interviewer said it is worthy to read those standards.

18. Tell about difference between === and ==, give a example
    ```php
    Equal:
    $a == $b
    Equal true: if $a is equal to $b, after type juggling.

    Identical:
    $a === $b
    Identical true: if $a is equal to $b, and they are of the same type.
    ```
    18.1. Which one is faster, why?
    > In conclusion === is faster because don't converts the data type to see if two variables have same value, but when you need to see if two variables have same value you will use == if doesen't mather what type are variables, or === if is important also the type of variables

    > Because the equality operator == coerces, or converts, the data type temporarily to see if it’s equal to the other operand, whereas === (the identity operator) doesn’t need to do any converting whatsoever and thus less work is done, which makes it faster.
    
19. Do you know Restful api
    > get, post, put, delete, patch
    19.1 explain patch, when should we use it?
    > By updating