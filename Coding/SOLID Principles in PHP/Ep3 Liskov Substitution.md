# Liskov Substitution

Derived(导出的；衍生的，派生的) classes must be substitutable for their base classes

```php

class A 
{
    public function fire()
    {
        
    }
}

class B extends A
{
    public function fire()
    {
        
    }
}

function doSomething(A $obj)
{

}


class VideoPlayer {
    public function play()
    {
        
    }
}

class AviVideoPlayer extends VideoPlayer {
    public function play($file)
    {
        if (pathinfo($file, PATHINFO_EXTENSION) != 'avi') {
            throw new Exception; // violates the LSP
        }
    }
}
```

This principe helps us against the situation, where some kind of descend exposed behavior, that quiet different from the original parent class, or the original abstraction or interface.

```php

// a binding contract
interface LessonRepositoryInterface {
    public function getAll();
}

class FileLessRepository implements LessonReposityInterface {
    public function getAll()
    {
        // return through filesystem
        return [];
    }
}

class DbLessonRepository implements LessonRepositoryInterface {
    public function getAll()
    {
        return Lesson::all() // violdates the LSP
    }
}
```

One returns an array, and the other one returns a collection.

```php

// a binding contract
interface LessonRepositoryInterface {

    /**
     * Fetch all records
     * @return array
    */
    public function getAll();
}

class DbLessonRepository implements LessonRepositoryInterface {
    public function getAll()
    {
        return Lesson::all()->toArray();
    }
}
```

Image we didn't do aboved fix, where is the pitfall here?

```php
public function foo(LessonRepositoryInterface $lesson)
{
    $lesson = $lesson->getAll();

    // You could get different return types
    // You might do

    if (is_array) {
        # code...
    }
}

```

> Like we learned from the Open-Close Principle, whenever you find yourself doing type checking, that's a deadring:_ you're breaking one of the principles.

Instead, always make sure that the output of your implementation match the specified in the contract.

1. Signature must match
2. Preconditions can't be greater
3. Post conditions at least equal to
4. Exception types must match
