# L15 - Fehler im TypoScript Finden

TypoScript Object WIndows->show error

Go Template Analyzer-> find the error line

```php
     }
      2 < .1
      2.wrap = <ul class="level2"> |</ul>
    }

   20 < styles.content.get
```

content will not be displayed

correct: (no line break)

```php
     }
      2 < .1
      2.wrap = <ul class="level2"> |</ul>
    }
   20 < styles.content.get
```
