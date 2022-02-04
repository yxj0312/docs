An issue: When I wanna to upgrade an array to a first class citizen(First-Class-Objekt – Wikipedia)[https://de.wikipedia.org/wiki/First-Class-Objekt]

for example if I have a message array here:
```php
$message = [
    'title' => '',
    'body' => '',
    'important' => false0
];
```
upgrade to a first class citizen, and instead, I wanna a delicated message object.

```php
class Message {

}
```
Normally it will be no problem. But the issue is that, because it has already been deployed, and people were making use of it. Within the views, they excpected an array. So they will apend a collection of this message. And they will do something longer line in the blade file, like:

```php
foreach ($messages as $message) {
    {{ $message['title'] }}
}
```

Solution:
```php
class Message implements ArrayAccess{
    

    public function __construct() {
        
    }

    public function offsetSet($offset, $value) {
        
    }

    public function offsetExists($offset) {
        
    }

    public function offsetUnset($offset) {
       
    }

    public function offsetGet($offset) {
      
    }
}


}
```



