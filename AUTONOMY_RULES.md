# Autonomie-Richtlinien für Jarvis

## Konzept: Voll Autonom (Option B)
- Ich pushe auf Branch `autonom` ohne vorherige Absprache
- Bei kritischen Entscheidungen → Nachricht an Samu
- Du reviewst wann du willst, mergest dann in `main`

---

## Kritische Entscheidungen (immer fragen)

- [ ] Architektur-Änderungen (Tech-Stack-Wechsel)
- [ ] Kosten-relevante Entscheidungen (SaaS-Integrationen, Premium-Features)
- [ ] Datenmodell-Änderungen (breaking changes)
- [ ] Auth/Security-Änderungen (neue Secrets, neue Auth-Provider)
- [ ] Richtungsänderungen (Feature-Priorisierung ändern)
- [ ] Externe Dependencies (neue bezahlte APIs, neue Services)
- [ ] Legal/Compliance-Änderungen (DSGVO-relevante Änderungen)

**Format für Nachricht:**
```
🚨 KRITISCHE ENTSCHEIDUNG
Was: [kurze Beschreibung]
Warum: [Begründung]
Optionen: [A/B/C mit Pros/Cons]
Empfehlung: [meine Empfehlung]
Deadline: [wann brauche ich Antwort]
```

---

## Selbstständige Entscheidungen (keine Nachricht)

- [x] Code-Struktur, Naming-Konventionen
- [x] Kleinere Refactors (< 100 Zeilen)
- [x] Bugfixes (offensichtliche Fehler)
- [x] Dokumentation, Kommentare
- [x] UI-Verbesserungen (kein Redesign)
- [x] Tests hinzufügen
- [x] Dependencies updaten (patch/minor versions)
- [x] Performance-Optimierungen (keine Architektur-Änderung)

---

## Push-Strategie

1. **Alle 2-4 Stunden** oder nach Abschluss eines Features
2. Commit-Messages auf Englisch, aussagekräftig
3. Nur auf `autonom`-Branch pushen
4. Bei Merge-Konflikten: ich löse sie selbst (wenn trivial) oder frage

---

## Heartbeat-Checklist

Ich werde alle 2 Stunden via Cron aufwachen und prüfen:

1. **Status-Check**
   - Was wurde zuletzt gemacht?
   - Gibt es Blocker?
   - Sind Tests grün?

2. **Nächste Aufgabe**
   - Was ist der nächste logische Schritt?
   - Braucht es eine Entscheidung?

3. **Update**
   - Falls ich arbeite → "Working on X"
   - Falls ich blockiert bin → "Blocked: [Grund]"
   - Falls nichts zu tun → "Idle"

---

## Entwicklungs-Priorität (Roadmap)

**Aktuelle Phase:** Phase 1 - Foundation

**Reihenfolge (selbstständig abarbeiten):**
1. Project Setup (Turborepo, Docker)
2. Database Schema (Prisma)
3. Auth Integration (Clerk)
4. Basic API (Fastify)
5. Basic Frontend (Next.js)
6. Customer Management
7. Project Management
8. Intake Engine (Fragebogen)
9. Trust Passport
10. Evidence Engine
11. Sync Layer
12. Public Portal

---

## Fehlerbehandlung

- **Build failed:** Ich versuche selbst zu fixen (max 30 Min), dann frage ich
- **Tests failed:** Gleiches Verfahren
- **Security Alert:** Sofort Meldung
- **Data Loss Risk:** Sofort Meldung

---

## Kommunikations-Regeln

- **Kein "Ich arbeite daran" ohne Context** – ich zeige was konkret gemacht wurde
- **Nur bei Blockern oder kritischen Dingen** störe ich
- **Sonst:** Du siehst im `autonom`-Branch was passiert

---

## Letzter Stand

**Aktueller Branch:** `autonom`  
**Zuletzt gearbeitet:** 2026-03-07 00:23 UTC  
**Nächster Schritt:** Project Setup abschließen (Docker Compose, Prisma Schema)