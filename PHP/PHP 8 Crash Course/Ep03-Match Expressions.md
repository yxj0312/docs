# Match Expressions

> Switch statements in PHP are useful, yet clunky. Think of the new match expression in PHP 8 as an improved switch. It's far more terse and flexible than its counterpart.

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

in php 8:

```php
class Conversation{}

$obj = new Conversation();

$type = match (get_class($obj)) {
    'Conversation' => 'started_conversation',
    'Reply' => 'replied_to_conversation',
    'Comment => 'commented_on_lesson'
};

// started_conversation
echo $type;
```
