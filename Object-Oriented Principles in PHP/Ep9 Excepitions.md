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
    class MaximumMembersReached extends Exception
    {
        # Codes
        protected $message = 'You may not add more than 3 team members.';
    }

    // Or: you can make a more generic exception.
    class TeamException extends Exception
    {
        public function static fromTooManyMembers()
        {
            return new static('You may not add more than 3 team members.');
        }
    }

    class Member
    {
        // #Codes
        public $name;

        public function __construct($name)
        {
            $this->name = $name;
        }
    }

    class Team
    {
        protected $members = [];

        public function add(Member $member)
        {
            if (count($this->members) === 3) {
                throw new MaximumMembersReached;
                // or
                throw TeamException::fromTooManyMembers();
            }
            // #codes
            $this->members() = $members;
        }

        public function members()
        {
            return $this->members;
        }
    }

    class TeamMembersController
    {
        public function store()
        {
            $team = new Team;

            try {
                 $team->add(new Member('Jane Doe'));
                $team->add(new Member('John Doe'));
                $team->add(new Member('Frank Doe'));
                $team->add(new Member('Susan Doe'));

                var_dump($team->members());
            } catch (MaximumMembersReached $e) {
               var_dump($e)
            }
        }
    }

    (new TeamMembersController())->store();

```
