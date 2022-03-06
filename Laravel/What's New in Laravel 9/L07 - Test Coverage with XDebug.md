# Test Coverage with XDebug

Recently, Laravel added a new php artisan test command to trigger suite. This functionality has now been extended to include generating a code coverage report. As long as you have Xdebug installed (which we'll do in this episode), you'll find this to be of great convenience.

```php

php artisan test --coverage

// set xdebug as driver
XDEBUG_MODE=coverage php artisan test
```
