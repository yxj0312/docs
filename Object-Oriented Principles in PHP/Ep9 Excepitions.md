# Exceptions

> Any time your code encounters an unexpected condition that it can't handle, an exception should be thrown. In this lesson, we'll review the "why, how, and when" of exceptions, as well as some interesting ways to improve readability through naming and static constructors.

## Example

```php
// #1
    public function add($one, $two)
    {
        if (!is_float($one) || ! is_float($two)) {
            throw new InvalidArgumentException('Please provide a float.');
        }
        return $one + $two;
    }

    try {
        echo add(2, []);
    } catch (InvalidArgumentException $e) {
        echo 'Oh well.';
    }

    // #2
    class Video
    {
        //# Codes
    }

    class User
    {
        public function download(Video $video)
        {
            if (! this->subscribed()) {
                throw new Logic();
            }
        }

        public function subscribed()
        {
            return false;
        }
    }

    class UserDownloadController
    {
        public function show()
        {
            try {
                (new User)->download(new Video);
            } catch (\Throwable $th) {
                //throw $th;
            }
        }
    }

    // #3
    class Member
    {
        // #Codes
    }

    class Team
    {
        protected $members = [];

        public function add(Member $member)
        {
            // #codes
        }
    }
```
