# L5 - TypoScript Syntax verstehen

## Object

```php
page {
    10 = TEXT
    10 {
        value = <h1>Hallo, Xiajun<h1>
    }
    20 = TEXT
    20 {
        value = Object 20
        wrap = <h2><em>|</em><h2>
    }
}
```

## Reihenfolge von Objekten

Reihenfolge spielt kein Rolle, nur 10, 20 zählt

## CObjects

CObjects:Content Object

```php
...
 30 = IMAGE
    30 {
      file = fileadmin/ein-neu-ordner/1.jpg
      file {
          width = 120c
          height = 80c
      }
      altText = Das ist ein alternativer Text.
    }
```

## Wertzuweisung und Kommentare

```php
# Das ist Kommentar
25 = TEXT
  25.value (
    <h2>Neuer Block 25</h2>
    <p>asdfasdf adfasdf</p>
    <div>
      <p>Text im Div</p>
     </div>
  )
```

Kommentar muss im einen einzeln Zeile stehen.
