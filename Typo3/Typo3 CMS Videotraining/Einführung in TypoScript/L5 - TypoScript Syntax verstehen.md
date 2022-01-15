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

  /*
123
*/
```

Kommentar muss im einen einzeln Zeile stehen.

## Was ist der "stdWrap"

[stdWrap](https://docs.typo3.org/m/typo3/reference-typoscript/main/en-us/Functions/Stdwrap.html#stdwrap)

When a data type is set to “type /stdWrap” it means that the value is parsed through the stdWrap function with the properties of the value as parameters.

## Bedingungen

[Conditions](https://docs.typo3.org/m/typo3/reference-typoscript/main/en-us/Conditions/Index.html#conditions)

```php
  # Check single page uid
[page["uid"] == 6]
  page.20.value = Ich bin auf Seite ID 6
  [END]
  
  [7 in tree.rootLineIds]
  page.20.value = Ich bin ein Kindelement auf Seite ID 7
  [END]
  ```

## Werte In Konstanten Speichern Und Wiederverwenden

im Constants:

```php
namespace {
  meinKonstante = das ist meine Konstante
  weitereKonstante = 120
}

```

im Setup

```php
...

 
    20 = TEXT
    20 {
        value = {$namespace.meinKonstante}
        wrap = <h2><em>|</em><h2>
    }

    30 = IMAGE
    30 {
        file = fileadmin/ein-neu-ordner/1.jpg
        file {
          width = {$namespace.weitereKonstante}c
          height = 80c
      }
      altText = Das ist ein alternativer Text.
    }

...
```

## Der Konstanteneditor

choose ganz Top: constant editor

choose storage->user storage page->edit 40

then styles.content.loginform.pid = 40
