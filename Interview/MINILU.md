# Probeaufgabe Entwicklung E-Commerce

## Mein Problem

1. Ich kenne ERP System Navision 2009 R2 nicht.
2. Ich kenne Webshop (mysyde) nicht.
3. Verbingdungsweise/API zwischen ERP und Webshop

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

1. Angemeldete Kunden sollen sich einzelne Rechnungen (aktuelle und alte) per Email zusenden lassen können.
Wie kann man das umsetzen?
