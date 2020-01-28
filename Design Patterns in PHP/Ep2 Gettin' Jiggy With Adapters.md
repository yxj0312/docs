## Two Quick Examples
### First Example
> Image that you have a digital camera. Now, the problem is you wanna get the pictures off that memory card and onto your computer, however there's no interface to do that. what we do in this situation?

> Use an Adapter, plug your memory card into it, An adapter offers you an USB port, that you can plug into your computer!

Or:
> Different plug in US and EU, what we do?

> Use an Adapter to make two different interfaces connect.

## Basic definition

> An adapter allows you to translate one interface for use with another.

## Demonstration

> Image we have a book

```php
class Book {
    public function open()
    {
        var_dump('opening the paper book.');
    }

    public function turnPage()
    {
        var_dump('turning the page of the paper book.');
    }
}
```

> I want to consume this book

```php
    use Book;

    class Person {
        public function read($book)
        {
            $book->open();
            $book->turnPage();   
        }
    }

    (new Person)->read(new Book);
```

> And now, more and more people start to read a e-book, which is different with a paper book.

> An Adapter can take care of this.
1. We extract an interface here:
    ```php
        interface BookInterface {
            public function open();

            public function turnPage();

        }
    ```

    For paper book
    ```php
        class Book implements BookInterface{
            public function open()
            {
                var_dump('opening the paper book.');
            }

            public function turnPage()
            {
                var_dump('turning the page of the paper book.');
            }
        }
        ------------------
        use Book;
        use BookInterface;

        class Person {
            public function read(BookInterface $book)
            {
                $book->open();
                $book->turnPage();   
            }
        }

        (new Person)->read(new Book);
    ```

2.  For o,  also extract an interface
    ```php
        interface eReaderInterface {
            public function turnOn();
            public function pressNextButton();
        }

        ------------------
        class Kindle {

            public function turnOn()
            {
                var_dump('turn the Kindle on');
            }

            public function pressNextButton()
            {
                var_dump('press the next button on the Kindle');
            }
        }    
    ```
3. If person try to read Kindle now
    ```php
    (new Person)->read(new Kindle);
    ```
    it's not going to work, because the interface that will use here does not match the interface that we wish to use.

4. We create a class to allow two different interfaces to communicate to each

    ```php
    class KindleAdapter implements BookInterface{
        
        private $kindle;
        // We need to inject our actual kindle here
        public function __construct(Kindle $kindle)
        {
            $this->kindle = $kindle;
        }

        public function open()
        {
            return $this->kindle->turnOn();
        }

        public function turnPage()
        {
            return $this->kindle->pressNextButton();
        }
    }
    ```
5. The key component is:

    5.1. Create an Adapter
    
    5.2. Then you inject your class and translate the original interface method over to the new one.

    ```php
    (new Person)->read(new KindleAdapter(new Kindle));
    ```
    We didn't have to change our Person class one bit.

    Once again for understanding:
    Kindle(new Kindle) is not here to the same contract as we expect. To fix this, we wrap up kindle an adapter(new KindleAdapter()) and pass that to the read method.

6. You should rename this Adapter to eReaderAdapter

    ```php
    class eReaderAdapter implements BookInterface{
        
        private $reader;
        // We need to inject our actual kindle here
        public function __construct(eReaderInterface $reader)
        {
            $this->kindle = $reader;
        }

        public function open()
        {
            return $this->kindle->turnOn();
        }

        public function turnPage()
        {
            return $this->kindle->pressNextButton();
        }
    }
    ```
    ```php
        class Nook {

            public function turnOn()
            {
                var_dump('turn the Nook on');
            }

            public function pressNextButton()
            {
                var_dump('press the next button on the Nook');
            }
        }    
    ```

    ```php
    (new Person)->read(new eReaderAdapter(new Nook));
    ```

### Seconde Example
FilesystemAdapter of Laravel: It's wrapping the popular Flysystem api into an interface that laravel users will be familiar with.

As an example, let's see get()
    
```php
public function get($path)
{
    // $driver is injected.
    try {
        // wrapping to the read method
        return $this->driver->read($path);
    } catch (\League\Flysystem\FileNotFoundException $e) {
        throw new ContractFileNotFoundException($path, $e->getCode(), $e);
    }
}
```