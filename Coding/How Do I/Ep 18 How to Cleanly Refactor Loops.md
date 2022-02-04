https://laracasts.com/series/how-do-i/episodes/18
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
```php
<? php

namespace App;

class StaffMember
{
    public function __construct($name, $type, $lastReviewed)
    {
        $this->name = $name;
        $this->type = $type;
        $this->lastReviewed = $lastReviewed;
    }
}


public function review()
{
    var_dump('Reviewing ' . $this->name);
}

public function dueForReview()
{
    return $this->lastReviwed->lt($oneYearAgo);
}
```
use this dataset for our example. Our job is using this data to figure out, which of the users are due for a paypal review.

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

Next Step: figure out which users are due for a pay increase: Check if the 'lastReviewed' is a year ago or more

```php
$dueForReview = [];

foreach ($staff as $member) {
    $oneYearAgo = Carbon::today()->subYear();

    // if it is older than one year ago
    if ($member->lastReviwed->lt($oneYearAgo)) {
        $dueForReview[] = $member;
    }
}

var_dump($dueForReview);
```

or Further:
```php
foreach($dueForReview as $member) {
    $member->review();
}
```

Refactor1: Add a dueForReview() method to model class
```php
$dueForReview = [];

foreach ($staff as $member) {
    $oneYearAgo = Carbon::today()->subYear();

    // refactor here
    if ($member->dueForReview()) {
        $dueForReview[] = $member;
    }
}

var_dump($dueForReview);

```

But now, we are still building up an array. What exactly are we doing here: filtering the staff down to only the member who will due for review. So maybe we can just use 'array_filter' instead:

```php

$dueForReview = array_filter($staff, function($member){
    return $member->dueForReview();
})

var_dump($dueForReview);

```

Use Laravel Collection

```php
// $staff = collect($data);
// var_dump($staff->pluck('name'));

collect($data)
    ->flatten()
    ->filter(function ($member){
        return $member->dueForReview();
    })
    ->each(function ($member){
        $member->review();
    });

```

Further: Higher order collection

```php
collect($data)
    ->flatten()
    ->filter->dueForReview()
    ->each->review();
```