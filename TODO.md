# AI Trust Layer - TODO

## Status: Frontend Complete ✅ | Backend Phase Starting

**Letzter Build:** Erfolgreich ✅ (45 statische Seiten)  
**Branch:** autonom  
**Live:** https://miosjarvis-afk.github.io/Compliance/

---

## Frontend Status

### ✅ VOLLSTÄNDIG
- [x] Landing Page `/` 
- [x] Login `/login`
- [x] Dashboard `/dashboard`
- [x] Clients `/clients`
- [x] Client Detail `/clients/[id]/`
- [x] Project Overview `/clients/[clientId]/projects/[projectId]/overview`
- [x] Intake Flow (7-Step) `/clients/[clientId]/projects/[projectId]/intake`
- [x] Trust Passport `/clients/[clientId]/projects/[projectId]/passport`
- [x] Evidence Center `/clients/[clientId]/projects/[projectId]/evidence`
- [x] Logs Page `/clients/[clientId]/projects/[projectId]/logs`
- [x] Integrations `/clients/[clientId]/projects/[projectId]/integrations`
- [x] Trust Portal (Public) `/clients/[clientId]/projects/[projectId]/trust-portal`

### ⏸️ P2 - Niedrige Priorität (nach Backend)
- [ ] Settings Overview `/settings/page.tsx`
- [ ] Team Management `/settings/team/page.tsx`
- [ ] Billing `/settings/billing/page.tsx`

---

## Backend Phase 2 - AKTIV 🚀

### Foundation (Week 1)
- [ ] Prisma Schema erstellen
  - [ ] Agency Model
  - [ ] Client Model  
  - [ ] Project/AI System Model
  - [ ] Compliance Summary Model
  - [ ] Intake Answers Model
  - [ ] Evidence Items Model
  - [ ] Change Logs Model
  - [ ] Integration Model
- [ ] Database Migration Setup
- [ ] Seed-Daten für Demo

### API Layer (Week 2)
- [ ] Fastify Setup mit TypeScript
- [ ] Project Struktur (routes, controllers, services)
- [ ] Validation (Zod)
- [ ] Error Handling Middleware
- [ ] Rate Limiting

### Auth (Week 3)
- [ ] Clerk Integration
- [ ] JWT Middleware
- [ ] Protected Routes
- [ ] Role-Based Access (Agency Owner, Team Member)

### CRUD Endpoints (Week 4)
- [ ] Agencies (CRUD)
- [ ] Clients (CRUD + List)
- [ ] Projects (CRUD + List)
- [ ] Intake (Get/Update)
- [ ] Evidence (Get/Update)
- [ ] Passport (Generate/Get)

---

## Aktueller Fokus

**JETZT:** Prisma Schema Design  
**Dann:** Database Migration + Seed  
**Dann:** Fastify API Foundation  
**Dann:** Auth mit Clerk  
**Erst danach:** Frontend-Backend Verknüpfung ("Die Hochzeit")

---

## Regeln

1. Backend SEPARAT bauen - keine Verknüpfung mit Frontend
2. Jede Änderung verifizieren vor Commit
3. Alle 2-4h committen auf `autonom`
4. Bei Blockern >30min → Nachricht an Samu
5. Immer bauen vor "fertig" melden

---

*Letzte Aktualisierung: 2026-03-07 17:20 CET*  
*Nächster Report: 21:00 CET (4h)*
