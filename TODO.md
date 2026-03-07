# TODO - AI Trust Layer Backend/API

## Übersicht

Dies ist die vollständige TODO-Liste für das AI Trust Layer Projekt. Alle Aufgaben sind priorisiert und können autonom abgearbeitet werden.

---

## 🔴 KRITISCH - Phase 1: Backend Foundation

### 1. Prisma Schema
**Status:** ✅ ERLEDIGT (2026-03-07)  
**Aufwand:** ~4h  
**Ziel:** Datenbank-Schema basierend auf den Mock-Daten

- [x] `prisma/schema.prisma` erstellt in `packages/database/`
- [x] Models definiert:
  - [x] Agency
  - [x] Client
  - [x] Project/AI System
  - [x] User
  - [x] ComplianceSummary
  - [x] IntakeAnswer
  - [x] EvidenceItem
  - [x] ChangeLogItem
  - [x] Integration
  - [x] Activity
  - [x] TrustPortal (Bonus)
- [x] Enums definiert (15+ Enums)
- [x] Relations definiert mit Cascading Deletes
- [ ] Migration erstellen: `pnpm db:migrate` (pending DB setup)

### 2. Fastify Backend Setup
**Status:** Noch nicht begonnen  
**Aufwand:** ~6h  
**Ziel:** API-Server mit CRUD-Operations

- [ ] `apps/api/` Ordner erstellen
- [ ] `package.json` mit Fastify Dependencies
- [ ] `src/server.ts` - Server Bootstrap
- [ ] `src/plugins/`:
  - [ ] Prisma Plugin
  - [ ] CORS Plugin
  - [ ] Rate Limiting
  - [ ] JWT Auth (für später)
- [ ] `src/routes/`:
  - [ ] `/agencies` - CRUD
  - [ ] `/clients` - CRUD
  - [ ] `/projects` - CRUD
  - [ ] `/intake` - Submit/Answers
  - [ ] `/passport` - Generate/View
  - [ ] `/evidence` - CRUD
  - [ ] `/integrations` - Connect/Status
  - [ ] `/logs` - Changes/Incidents
  - [ ] `/activities` - Feed
- [ ] Error Handling Middleware
- [ ] Validation (Zod)

### 3. API-Client im Frontend
**Status:** Noch nicht begonnen  
**Aufwand:** ~3h  
**Ziel:** Service-Layer für API-Calls

- [ ] `services/api.ts` - Axios/Fetch Setup
- [ ] `services/clients.ts`
- [ ] `services/projects.ts`
- [ ] `services/intake.ts`
- [ ] `services/passport.ts`
- [ ] `services/evidence.ts`
- [ ] `services/integrations.ts`
- [ ] Error Handling & Retry Logic

---

## 🟠 HOCH - Phase 2: Core Features

### 4. Intake Engine
**Status:** Noch nicht begonnen  
**Aufwand:** ~8h  
**Ziel:** 7-Step Fragebogen mit State-Management

- [ ] Intake Fragen definieren (JSON)
- [ ] Stepper Component
- [ ] Step 1: System Purpose
- [ ] Step 2: Users & Interaction
- [ ] Step 3: Data & Privacy
- [ ] Step 4: Tools & Models
- [ ] Step 5: Decisions & Risk
- [ ] Step 6: Human Oversight
- [ ] Step 7: Review & Generate
- [ ] Progress-Speicherung (localStorage)
- [ ] Trust Score Calculation
- [ ] Risk Level Assessment

### 5. Trust Passport
**Status:** Noch nicht begonnen  
**Aufwand:** ~6h  
**Ziel:** Passport-Seite mit PDF-Export

- [ ] `/passport/[id]/page.tsx`
- [ ] Passport Header Component
- [ ] System Overview Section
- [ ] Trust Profile Section
- [ ] Technical Stack Section
- [ ] Data Flow Section
- [ ] Controls & Safeguards Section
- [ ] Change History Section
- [ ] Client-facing Trust Note
- [ ] PDF Export (jsPDF oder Puppeteer)
- [ ] Share Button

### 6. Evidence Center
**Status:** Noch nicht begonnen  
**Aufwand:** ~5h  
**Ziel:** Artefakt-Speicher

- [ ] `/evidence/page.tsx`
- [ ] Evidence Cards Grid
- [ ] Status Badges (ready/incomplete/needs-review)
- [ ] Upload Functionality (Mock)
- [ ] AI System Card Generator
- [ ] Data Flow Summary Generator
- [ ] Subprocessor Register
- [ ] Disclosure Snippets
- [ ] Incident Register
- [ ] Change Log View
- [ ] AI Literacy Checklist
- [ ] Export-Funktionen

---

## 🟡 MITTEL - Phase 3: Integrations & Logs

### 7. Integrationen-Page
**Status:** Noch nicht begonnen  
**Aufwand:** ~4h  
**Ziel:** Connect-UI für externe Tools

- [ ] `/settings/integrations/page.tsx`
- [ ] Integration Cards:
  - [ ] n8n
  - [ ] Zapier
  - [ ] Make
  - [ ] Retell
  - [ ] Vapi
  - [ ] OpenAI
  - [ ] Anthropic
  - [ ] Custom Webhook
- [ ] "Connect" Modal mit API Key Input
- [ ] Status-Anzeige (connected/not-connected/sync-needed)
- [ ] Last Sync Timestamp
- [ ] Sync-Trigger Button
- [ ] Webhook URL Generator

### 8. Logs & Activity
**Status:** Noch nicht begommen  
**Aufwand:** ~3h  
**Ziel:** Timeline-Views

- [ ] `/logs/page.tsx`
- [ ] Change Log Tab
- [ ] Incident Log Tab
- [ ] Filter-System (Project, Date, Severity)
- [ ] Timeline Component
- [ ] Severity Badges
- [ ] Incident Details Modal

### 9. Clerk Auth Integration
**Status:** Noch nicht begonnen  
**Aufwand:** ~4h  
**Ziel:** Echte Authentifizierung

- [ ] Clerk Account Setup (von Samu)
- [ ] `@clerk/nextjs` installieren
- [ ] `ClerkProvider` in Layout
- [ ] `middleware.ts` für Route Protection
- [ ] Login/Signup mit Clerk Components
- [ ] User Profile Integration
- [ ] Org/Agency Switching
- [ ] Role-Based Access (Admin/Member)

---

## 🟢 NIEDRIG - Phase 4: Polish & Public Portal

### 10. Public Trust Portal
**Status:** Noch nicht begonnen  
**Aufwand:** ~6h  
**Ziel:** Teilbarer öffentlicher Link

- [ ] `/public/portals/[token]/page.tsx`
- [ ] Reduced View (nur Essentials)
- [ ] System Name & Purpose
- [ ] Trust Status Badge
- [ ] Oversight Info
- [ ] Data Categories
- [ ] Transparency Notice
- [ ] Last Updated
- [ ] Change Summary
- [ ] Share Link Generator
- [ ] QR Code Generator
- [ ] Embeddable Widget (iframe)

### 11. Client Detail Page
**Status:** Teils vorhanden  
**Aufwand:** ~3h  
**Ziel:** Vollständige Client-Verwaltung

- [ ] `/clients/[id]/page.tsx`
- [ ] Client Header (Name, Industry, Contact)
- [ ] Tabs:
  - [ ] Overview
  - [ ] AI Systems (Liste)
  - [ ] Shared Trust Portals
  - [ ] Documents
- [ ] Risk Sensitivity Badge
- [ ] Overall Trust Status
- [ ] Open Review Items
- [ ] Last Shared Passport

### 12. Settings Pages
**Status:** Noch nicht begonnen  
**Aufwand:** ~4h  
**Ziel:** Vollständige Einstellungen

- [ ] `/settings/page.tsx` - General
- [ ] `/settings/team/page.tsx` - Team Management
- [ ] `/settings/billing/page.tsx` - Billing (Mock)
- [ ] Agency Profile Edit
- [ ] Logo Upload
- [ ] Theme Toggle (Light/Dark)
- [ ] Notification Preferences

---

## 🔧 DEVOPS & INFRASTRUCTURE

### 13. Docker Production Setup
**Status:** Partiell vorhanden  
**Aufwand:** ~3h  
**Ziel:** Production-Ready Deployment

- [ ] `docker/Dockerfile.api` optimieren
- [ ] `docker/Dockerfile.web` für Next.js
- [ ] Multi-Stage Builds
- [ ] `.dockerignore` verfeinern
- [ ] `docker-compose.prod.yml`
- [ ] SSL/TLS Setup (Let's Encrypt)
- [ ] Reverse Proxy (Caddy/Nginx)
- [ ] Health Checks
- [ ] Log Rotation

### 14. GitHub Actions CI/CD
**Status:** Partiell vorhanden  
**Aufwand:** ~2h  
**Ziel:** Automatisches Deployment

- [ ] `.github/workflows/ci.yml` - Tests
- [ ] `.github/workflows/deploy.yml` - Deployment
- [ ] Branch Protection Rules
- [ ] Preview Deployments (Vercel)

### 15. Testing
**Status:** Noch nicht begonnen  
**Aufwand:** ~6h  
**Ziel:** Grundabdeckung

- [ ] Unit Tests (Jest/Vitest)
- [ ] API Integration Tests
- [ ] E2E Tests (Playwright)
- [ ] Test Coverage Reports

---

## 📋 BACKLOG (Für später)

### Phase 5 Features
- [ ] Billing/Subscriptions (Stripe)
- [ ] Audit Trail (vollständig)
- [ ] API Keys für Kunden
- [ ] Webhook Events
- [ ] Custom Branding (White Label)
- [ ] Multi-Language Support
- [ ] Advanced Analytics
- [ ] Compliance Templates
- [ ] AI Risk Scanner (automated)
- [ ] Document Generator (DOCX/PDF)

---

## 📊 Zeitschätzung Gesamt

| Phase | Stunden | Wochen |
|-------|---------|--------|
| Phase 1: Foundation | ~13h | 1-2 |
| Phase 2: Core | ~19h | 2-3 |
| Phase 3: Integrations | ~11h | 1-2 |
| Phase 4: Portal & Polish | ~13h | 1-2 |
| Phase 5: DevOps | ~11h | 1-2 |
| **Gesamt** | **~67h** | **~6-8 Wochen** |

---

## 🎯 Aktuelle Priorität

1. **Prisma Schema** - Foundation für alles
2. **Fastify API** - Backend für CRUD
3. **Intake Flow** - Core Product Feature
4. **Trust Passport** - Hero Feature

---

## 🚀 Autonomie-Modus

Ich werde diese Liste autonom abarbeiten:
- Alle 2h Commit + Push
- Bei Blockern → Meldung an Samu
- Fortschritts-Updates in MEMORY.md

---

*Erstellt: 2026-03-07 08:45 CET*
*Letzte Aktualisierung: 2026-03-07 08:45 CET*
