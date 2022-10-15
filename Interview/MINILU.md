# Probeaufgabe Entwicklung E-Commerce

## Mein Problem

1. Ich kenne ERP System Navision 2009 R2 nicht.
2. Ich kenne Webshop (mysyde) nicht.
3. Verbingdungsweise/API zwischen ERP und Webshop
4. Wie funktioniert das Webshop?
5. Wie vewalten NAV die Rechnungen?

## Aufgabe Beschreibung

- ERP System:
  - Erzeugt Rechnungen, speichert diese als PDF
- Webshop :
  - Speichert und liest Daten aus eigener Mysql-Datenbanken
  
- Relation:

  - ERP System Navision 2009 -> Webshop (mysyde)
    - Daten senden/abrufen/hochladen
    - Die Daten der Rechnungen werden als Kopf- und Zeileninformationen an die Webshopdatenbank übertragen

  - Webshop -> ERP System Navision 2009
    - Hat keinen Direkten Zugriff auf das ERP System
  
## Aufgabe

1. Angemeldete Kunden sollen sich einzelne Rechnungen (aktuelle und alte) per Email zusenden lassen können.Wie kann man das umsetzen?

    Lösung

    1. Rechnungen < 2 Monate

        Direkt über Webshop senden

    2. Rechnungen > 2 Monate

       Webshop:

        erstellen ein Request oder ein Einträge im DB: welche Konto braucht welche Rechnungen von wann zu wann

       ERP:

        - Ein Cronjob jede Tag / jede zweite Tag auszuführen.

       es könnte sein: Ein Query, um diese Einträge im Webshop DB abzurufen oder ein fetch Request um solche Info einzulesen..

         - erzeugt PDF->auf Webshop Server wieder hochladen->über Webshop senden.
