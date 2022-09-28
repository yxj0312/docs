# $object::class

> This next one is a small, but useful addition to PHP 8 that received unanimous support during the voting stage. You now have the ability to use ::class directly on an object. The result will be functionally identical to the result of get_class(). In PHP 7 and below, this functionality was limited to the class, itself.

```php
class Conversation{}

$obj = new Conversation();

switch (get_class($obj)) {
    case 'Conversation':
        $type = 'started_conversation';
        break;
    
    case 'Reply'
        $type = 'replied_to_conversation';
        break;

    case 'Comment'
        $type = 'commented_on_lesson';
        break;
}

// started_conversation
echo $type;
```

In PHP 7, you can do "Conversation::class", but can't do "$obj::class", in PHP 8 you can.
