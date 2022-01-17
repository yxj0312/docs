# L02 - Grundlegende Tipps

## Was bedeutet "Integration"

- Eine Design-Vorlage in TYPO3 "einbauen"
- Das dafür notwendige TypoScript schreiben, Extensions installieren & konfigurieren, Backend konfigurieren
- Zertifizierung zum "Certified Integrator" möglich

## Verschiedene Template-Typen

- HTML-Template: eine HTML-Vorlage als "Rahmen" für die von TYPO3 erzeugten bzw. ausgegebenen Inhalte
- TypoScript-Template: eine Sammlung von TypoScript-Anweisungen
- Fluidtemplate: aus dem HTML-Template entwickelt, enthält Funktionen zum Ausgeben der Inhalte (Variablen, Bedingungen etc.)
  
## Methoden der Integration

- Alt: Template-Dateien leigen in einem Verzeichnis unterhalb von fileadmin/, oft fileadmin/templates
- Alt: TypoScript wird im Backend geschrieben und in der Datenbank gespeichert
- Aktuell: Template-Dateien werden in einer eigenen Template-Extension abgeleget
- Aktuell: TypoScript wird in Dateien ausgelagert und nicht in der DB gespeichert.

## Vorteile/Nachteile der alten Methode

- Vorteile:
  - Änderungen in Dateien und TypoScript sehr schnell direkt im BE möglich
  - Kein externer Editor notwendig
- Nachteile
  - TS wird in der DB gespeichert->Backups schwieriger, keine Versionierung möglich
  - Änderungen durch "normale" BE-Benutzer (Redakteure) theoretisch möglich
  - Weitergabe/Widerverwendung des Template schwieriger

## Vorteile einer Template-Extension (moderne Methode)

- Alle benötigten Dateien liegen gesammelt in einem Verzeichnis
- Diesese Verzeichnis liegt unterhalb von typo3conf/ext/->normale BE-User haben darauf keinen Zugriff
- Versionierung einfacher, dadurch auch Arbeit im Team einfacher
