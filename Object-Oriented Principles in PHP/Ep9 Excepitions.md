# Exceptions

> Any time your code encounters an unexpected condition that it can't handle, an exception should be thrown. In this lesson, we'll review the "why, how, and when" of exceptions, as well as some interesting ways to improve readability through naming and static constructors.

## Example

```php
    public function add($one, $two)
    {
        if (!is_float($one) || ! is_float($two)) {
            throw new Exception('Please provide a float.');
        }
        return $one + $two;
    }

    try {
        echo add(2, []);
    } catch (Exception $e) {
        echo 'Oh well.';
    }
    
```