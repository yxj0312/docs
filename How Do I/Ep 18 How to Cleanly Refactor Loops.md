```php
$data = [
    'front' => [
        new StaffMember('John', 'manager', Carbon::today()->subYear()),
        new StaffMember('Sally', 'server', Carbon::today()->subYears(9)),
        new StaffMember('Susan', 'server', Carbon::today()->subYears(2)),
    ],

    'front' => [
        new StaffMember('Mary', 'manager', Carbon::today()->subYears(2)),
        new StaffMember('Frank', 'cook', Carbon::today()->subMonth()),
    ]
];
```
use this dataset for our example.

