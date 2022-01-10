# L3 - Ein TypoScript Template erstellen

1. active page starsite
2. go Template->create template for a new site
3. choose Info/Modify at the top
4. enter title, description as u wish
5. go setup

```typoScript
# Default PAGE object:
<!-- ein object "page" erzeugt, mit dem type "PAGE" (kleinschreib ist falsh)-->
page = PAGE
<!-- innerhalb page gibt es ein unter-object "10" , type ist "TEXT"-->
page.10 = TEXT
page.10.value = HELLO WORLD!
```
