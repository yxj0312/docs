# L13 - Beispiel Navigation-Menu erzeugen

```php
# Default PAGE object:
page = PAGE

page {
 10 = HMENU
    10 {
      wrap = <ul> |</ul>
      1 = TMENU
      1 {
        NO = 1
        NO {
          wrapItemAndSub = <li>|</li>
        }
      }
      2 < page.10.1
      2.wrap = <ul class="level2"> |</ul>
    }
}
```
