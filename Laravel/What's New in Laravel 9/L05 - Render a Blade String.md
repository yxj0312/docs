# Render a Blade String

You may not reach for this next addition too often, but it's there when you need it. You can now, through a simple method call, render a Blade-formatted string to HTML.

```php
Blade::render('{{ $greeting }}, World', ['greeting' => 'Hello']);
```
