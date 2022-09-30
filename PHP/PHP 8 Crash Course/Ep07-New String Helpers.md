# New String Helpers

> It took a global pandemic for PHP to finally add a str_contains helper function, but it's finally here (along with a few others). In this episode, we'll review str_contains(), str_starts_with(), and str_ends_with().

```php
# str_starts_with

$id = 'inv_adsfasfdadasfas'

// before php 8
$result = stripos($id, 'inv_') === 0;

// php 8
$result = str_starts_with($id, 'inv_');


# str_ends_with

$id = 'adsfasfdadasfas_ch';

$result = stripos(strrev($id), strrev('_ch')) === 0;

// or
preg_match('/_ch$/', $id);

str_ends_with($id, '_ch');

# str_contains

$url = 'https://example.com?foo=bar';

// check if we have a query string
var_dump(parse_url($url)['query']);

// or
srtpos($url, '?') !== false;

// php 8

str_contains($url, '?');

```
