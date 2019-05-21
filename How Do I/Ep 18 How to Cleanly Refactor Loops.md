```php
$data = [
    'front' => [
        new StaffMember('John', 'manager', Carbon::today()->subYear()),
        new StaffMember('Sally', 'server', Carbon::today()->subYears(9)),
        new StaffMember('Susan', 'server', Carbon::today()->subYears(2)),
    ],

    'back' => [
        new StaffMember('Mary', 'manager', Carbon::today()->subYears(2)),
        new StaffMember('Frank', 'cook', Carbon::today()->subMonth()),
    ]
];
```
use this dataset for our example. Our job is using this data to figure out, which of the users are do for a paypal review.

```php

function array_flatten($arr) 
{
    $flattened = [];
    
    foreach ($arr as $key => $val) {
        if(is_array($val)){
            $flattened = array_merge($flattened, $array_flatten($val));
        } else {
            // whatif the item in the iteration is not a array, is just a staff member
            // in that case, lets just push to it.
            $flattened[] = $val;
        }
    }

    return $falttened;
}


$staff = array_flatten($data);

var_dump($staff);

```

Another option: passby reference
```php
function array_flatten($arr, &$flattened = []) 
{    
    foreach ($arr as $key => $val) {
        // if the value is an array, we like above'back'=> [...]
        // we gonna recall the function, and it gonna filter through that array(back)
        if(is_array($val)){
            $array_flatten($val, $flattened);

            
            continue;
        } 
        

        $flattened[] = $val;
    }

    return $falttened;
}

```