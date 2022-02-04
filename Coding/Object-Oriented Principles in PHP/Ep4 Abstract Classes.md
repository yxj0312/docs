# Abstract Classes

> An abstract classes: a template, running some classes

- Example

```php
    class AchievementType
    {
        public function name()
        {
            // laravel helper function
            // class basename();
            $class = (new ReflectionClasses())->getShortName();

            // FirstThousandPoints => First Thousand Points
            return trim(preg_replace('/[A-Z]/', ' $0', $class));
        }

        public function icon()
        {
            return strtolower(str_replace(' ', '-', $this->name().'.png'));
        }

        public function difficulty()
        {
            return 'intermediate';
        }

    }
    class FirstThousandPoints extends AchievementType
    {
        public function qualifier($user)
        {
            
        }
    }

    class FirstBestAnswer extends AchievementType
    {
        public function qualifier($user)
        {
            
        }
    }

    $achievement1 = new AchievementType();
    $achievement2 = new FirstBestAnswer();

```

- Now we change the AchievementType to an abstract class
  
```php

abstract class AchievementType
{
    public function name()
    {
        // laravel helper function
        // class basename();
        $class = (new ReflectionClasses())->getShortName();

        // FirstThousandPoints => First Thousand Points
        return trim(preg_replace('/[A-Z]/', ' $0', $class));
    }

    public function icon()
    {
        return strtolower(str_replace(' ', '-', $this->name().'.png'));
    }

    abstract public function qualifier($user);
}

$achievement2 = new FirstBestAnswer();

class ReachTop50 extends AchievementType
{
    public function qualifier($user)
    {
       
    }
}

$achievement3 = new ReachTop50();

```

Template Design pattern