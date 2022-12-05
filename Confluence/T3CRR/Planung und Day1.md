# Session Plannung

- Agile Organisation - Mario Hirschfeld
- Audience Experience; The "WHY" of Content Management Jeffrey A. "jam" McGuire (16:00 Seminaraum)
- Bessere Extensions - Daniel Siepmann
- Build a Product Adoption
- CMScensus - Marktanteile der CMS im öffentlichen Bereich in Deutschland
- Dependency Injection
- Die 7 Todsünden des Projektleiters
- Feedback-Kultur
- Mehr als Nix:Reporudzierbare OS-Umgebungen
- Rethinking translation handling
- Scrum in a Nutshell (2 Slots)
- Speed up Gitlab CI
- Testen mit Cypress und ddev
- TYPO3 Education Committee
- TYPO3 Government Package
- TYPO3 mit Docker & ddev Wolfgang Wagner :balloon:
- Videos erstellen: wie und was bringt das. Wolfgang Wagner
- Zeig mir deine Tools - Wolfgang Wagner
- Grow your Agency

# Speed up Gitlab CI - Marc Willmann

## Fünf Fehler

- Ein Job übernimmt alle Aufgaben.
- Zu viele Jobs in der Wartschlange.
- Cache wird immer wieder neu aufgebaut.
- Pipeline bricht nicht rechzeitig ab. wenn etwas schiefgeht.
- Docker-Images werden immer wieder neu heruntergladen.

## Ein Job übernimmt alle Aufgaben

Paralelisiern

Aufteilen der abzuarbeitenden Aufgaben in sinnvolle Einheiten.

Jede Aufgabe bekommt einen eigenen Job.

Alle Jobs, die nicht voneinander abhängig sind, werden in derselben Stage definiert.

z.B. build: "build TYPO3"

## Zu viele Jobs in der Wartschlange

Mehr Runner

Jeder Job wird

Wieviel ist genug?

Runner sind Ressourcen, die vorgehalten

Autoscaling!

zu normalen Bürozeiten stehen jederzeit 5 Runner bereit, den nächsten Job abzuarbeiten.

Wird ein Runner beschäfigt, wird automatisch ein WEITERER runner als Reserve bereitgestellt.

Gitlab-Runner galore

Mit jedem Clound-Anbieter relisierbar.

Eine Maschine läuft immer("Broker") und kümmert sich darum, neue Runner zu starten und zu beenden.

## Cache wird immer wieder neu aufgebaut

## Pipeline bricht nicht rechzeitig ab. wenn etwas schiefgeht

Organisation in Stages

Alle Jobs einer Stage werden parallel

## Docker-Images werden immer wieder neu heruntergladen

Docker-Images cachen

jeder Job wird in einem Docker-Container gestartet

Es ist sinnvoll, die Docker-Images ebenfalls zu cachen.

Das kann einfach erreicht werden, in den ein Docker-Repository-Proxy gestartet wird.

## Resultat

ein ganz normale Pipeline

Nach 5 min ist das System deployed und einsatzbereit.

# Dependency Injection

# Testen mit Cypress und ddev
