# AI Trust Layer - Architekturkonzept

## Executive Summary

**Produkt:** Trust Infrastructure für AI-Agenturen  
**Kern:** Living Trust Passport für AI-Systeme  
**Zielgruppe:** AI-Agenturen (DACH/Europa), die Enterprise-Kunden bedienen  
**Monetarisierung:** SaaS, pro Projekt/Agentur, Enterprise-Tiers

---

## 1. Tech Stack (Empfohlene Basis)

### Backend
- **Runtime:** Node.js 20+ LTS
- **Framework:** Fastify (Performance > Express)
- **Sprache:** TypeScript (strict mode)
- **API:** REST + WebSocket (für Live-Updates)
- **Auth:** Clerk (Auth0-Alternative, europäisch-freundlich)
- **Rate Limiting:** Redis-based

### Datenbank
- **Primary:** PostgreSQL 16+ (JSONB für flexible Schema-Erweiterungen)
- **Cache:** Redis 7+ (Sessions, Rate Limits, Passport-Cache)
- **Queue:** BullMQ (Redis-based, für Webhooks, PDF-Generierung)
- **Search:** Meilisearch (für Project-Suche, Filter)

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand + TanStack Query
- **Forms:** React Hook Form + Zod
- **Charts:** Tremor (für Risk-Scoring, Dashboards)

### Infrastructure
- **Hosting:** Hetzner Cloud (EU, DSGVO-konform) oder AWS Frankfurt
- **Container:** Docker + Docker Compose (local) / Kubernetes (prod)
- **CDN:** Cloudflare
- **File Storage:** S3-kompatibel (Hetzner Object Storage)
- **Monitoring:** Grafana + Prometheus
- **Logging:** Loki + Winston/Pino

### Integrationen
- **Webhooks:** Native + n8n/Zapier-Connectoren
- **PDF:** Puppeteer (Passport-Export)
- **Email:** Resend oder AWS SES
- **Notifications:** WebPush + Email

---

## 2. Domain Model (Datenmodell)

### Core Entities

```
Organization (Agentur)
├── id, name, slug, logo, branding
├── subscription_tier, billing_status
├── settings: { timezone, currency, default_language }
├── compliance_settings: { auto_review, notification_rules }
└── members: User[]

User
├── id, email, role (admin, editor, viewer)
├── organization_id
├── preferences: { notifications, language }
└── last_active

Customer (Endkunde der Agentur)
├── id, organization_id
├── name, industry, region, size
├── contact_person: { name, email, role }
├── risk_profile: { sensitivity, regulatory_scope }
└── projects: Project[]

Project (AI-System)
├── id, organization_id, customer_id
├── name, slug, description, status
├── system_type: voice_agent | chatbot | copilot | automation | other
├── go_live_date, last_review_date, next_review_due
├── risk_classification: { tier, score, factors[] }
├── compliance_status: { overall, modules[] }
├── metadata: { domain, use_cases, restrictions }
└── versions: ProjectVersion[]

ProjectVersion (Snapshot bei Änderungen)
├── id, project_id, version_number
├── change_summary, triggered_by
├── snapshot_data: { full_project_state }
└── created_at

IntakeData (Gefüllte Fragen)
├── id, project_id, version
├── responses: JSON (dynamisch je nach Systemtyp)
├── derived_classification: { risk, transparency, data_sensitivity }
├── missing_artifacts: string[]
└── completed_at, completed_by

TrustPassport (Das Herzstück)
├── id, project_id, public_slug (shareable URL)
├── visibility: public | private | customer_only
├── sections: {
│   ├── system_overview: { purpose, scope, limitations }
│   ├── data_processing: { categories, legal_basis, retention }
│   ├── ai_models: { provider, version, capabilities }
│   ├── subprocessors: Subprocessor[]
│   ├── human_oversight: { roles, escalation_paths }
│   ├── transparency: { disclosures, user_info }
│   └── compliance: { status, certifications, audits }
├── last_synced_at
└── generated_pdf_url

Subprocessor
├── id, passport_id
├── name, category, purpose, location
├── dpa_status: signed | pending | not_required
└── risk_level: high | medium | low

EvidenceArtifact
├── id, project_id, type
├── name, description, file_url
├── generated_from_template: boolean
├── expiry_date, status: valid | expiring | expired
└── approval_chain: { reviewer, status, date }

ChangeLog
├── id, project_id
├── change_type: model_update | prompt_change | data_flow_change | subprocessor_add | config_change | other
├── description, impact_level
├── automatic: boolean (von Sync oder manuell)
├── source: webhook | api | manual | system
├── old_value, new_value (encrypted if sensitive)
└── created_at, created_by

Incident
├── id, project_id
├── severity, status, title, description
├── detected_at, resolved_at
├── affected_data: boolean, breach_notification_required: boolean
├── actions_taken: string[]
└── lessons_learned

SyncConfiguration
├── id, project_id
├── source_type: webhook | n8n | zapier | make | retell | vapi | custom_api
├── config: { endpoint, headers, auth_method }
├── event_mappings: { source_event -> trust_layer_event }
├── last_sync_at, last_sync_status
└── enabled: boolean

Notification
├── id, user_id, organization_id
├── type, priority, title, body
├── action_url, read: boolean
└── created_at
```

### Enum Definitions

```typescript
enum SystemType {
  VOICE_AGENT = 'voice_agent',
  CHATBOT = 'chatbot',
  COPILOT = 'copilot',
  AUTOMATION = 'automation',
  CLASSIFICATION = 'classification',
  OTHER = 'other'
}

enum RiskTier {
  HIGH = 'high',      // Verbotene Praktiken, Hochrisiko-AI
  LIMITED = 'limited', // Begrenztes Risiko (Chatbots)
  MINIMAL = 'minimal'  // Minimalrisk (Spamfilter)
}

enum ComplianceStatus {
  COMPLIANT = 'compliant',
  REVIEW_REQUIRED = 'review_required',
  ACTION_REQUIRED = 'action_required',
  EXPIRED = 'expired'
}

enum ProjectStatus {
  DRAFT = 'draft',
  INTAKE = 'intake',
  REVIEW = 'review',
  LIVE = 'live',
  PAUSED = 'paused',
  ARCHIVED = 'archived'
}
```

---

## 3. Module Architecture

### 3.1 Agency Workspace Module

**Responsibility:** Multi-Tenant-Workspace-Management

**Features:**
- Organization Onboarding (Branding, Team-Einladung)
- Role-Based Access Control (RBAC)
- Customer-Verwaltung (CRUD, Import/Export)
- Projekt-Übersicht (Dashboard, Filter, Suche)
- Billing/Subscription-Integration (Stripe)

**API Endpoints:**
```
POST   /api/v1/organizations
GET    /api/v1/organizations/:id
PUT    /api/v1/organizations/:id
POST   /api/v1/organizations/:id/invite
GET    /api/v1/organizations/:id/members

POST   /api/v1/customers
GET    /api/v1/customers
GET    /api/v1/customers/:id
PUT    /api/v1/customers/:id
DELETE /api/v1/customers/:id

POST   /api/v1/projects
GET    /api/v1/projects
GET    /api/v1/projects/:id
PUT    /api/v1/projects/:id
DELETE /api/v1/projects/:id
POST   /api/v1/projects/:id/duplicate
```

### 3.2 Project Intake Engine

**Responsibility:** Guided Question Flow, Risk-Klassifizierung

**Features:**
- Dynamischer Fragebogen (je nach Systemtyp)
- Conditional Logic (wenn X, dann Frage Y)
- Auto-Save (Fortschritt erhalten)
- Risk-Scoring in Echtzeit
- Artifact-Empfehlungen
- DSGVO/AI Act Alignment Check

**Intake Question Categories:**
1. **System Basics:** Name, Zweck, Domäne, Nutzergruppen
2. **AI Interaction:** Direkte Interaktion? Empfehlung/Entscheidung?
3. **Data Processing:** Personenbezogene Daten? Besondere Kategorien?
4. **Technical Stack:** Modelle, APIs, Tools, Subprozessoren
5. **Human Oversight:** Freigabeprozesse, Eskalationen
6. **Risk Scenarios:** Ausfall, Missbrauch, Bias
7. **Compliance Context:** Branche, Region, bestehende Audits

**Risk Engine:**
- Rule-based Scoring (0-100)
- AI Act Risk Tier Classification
- DSGVO Risk Flags (DPIA-Trigger)
- Missing Artifacts Detection

**API Endpoints:**
```
GET    /api/v1/projects/:id/intake (aktuelle Daten)
POST   /api/v1/projects/:id/intake (speichern)
GET    /api/v1/intake/questions (dynamische Fragen)
POST   /api/v1/intake/calculate-risk
GET    /api/v1/intake/artifacts-needed
```

### 3.3 Trust Passport Module

**Responsibility:** Passport-Generierung, -Anzeige, -Sharing

**Features:**
- Automatische Passport-Generierung aus Intake-Daten
- Public/Private/Customer-Only Visibility
- Customizable Branding (Agentur-Logo, Farben)
- Live-Updates (bei Changes)
- PDF-Export
- Embed-Code (für Kunden-Websites)
- QR-Code-Generierung

**Passport Sections (UI-Komponenten):**
1. **Header:** System-Name, Agentur, Go-Live-Status
2. **Overview:** Zweck, Einsatzbereich, Einschränkungen
3. **Data:** Verarbeitete Daten, Rechtsgrundlagen, Löschfristen
4. **AI Models:** Modell-Infos, Versionen, Capabilities
5. **Subprocessors:** Liste mit DPA-Status, Standorten
6. **Human Oversight:** Verantwortliche, Eskalationspfade
7. **Compliance:** Status-Indikatoren, letzte Prüfung
8. **Changelog:** Letzte Änderungen, Review-Status
9. **Contact:** Agentur-Kontakt, Support

**API Endpoints:**
```
GET    /api/v1/projects/:id/passport
POST   /api/v1/projects/:id/passport/regenerate
GET    /api/v1/passports/:slug (public)
PUT    /api/v1/projects/:id/passport/visibility
GET    /api/v1/projects/:id/passport/export/pdf
GET    /api/v1/projects/:id/passport/embed-code
```

### 3.4 Evidence Engine

**Responsibility:** Compliance-Artefakte generieren & verwalten

**Template-Artefakte (Auto-Generated):**
- AI System Card (technische Dokumentation)
- Subprocessor Register (mit DPA-Tracking)
- Data Flow Summary (Visual + Text)
- Change Log (ausführlich)
- Incident Log Template
- AI Literacy Checklist (für Nutzer)
- Transparency Snippets (für UI-Integration)
- Go-live Checklist
- ROPA-Light (Record of Processing Activities)
- DPIA-Assessment (Vorlage/Trigger)

**Features:**
- Template-basierte Generierung (Handlebars/Mustache)
- Versionierung der Artefakte
- Approval-Workflows
- Expiry-Tracking
- Bulk-Export (ZIP)

**API Endpoints:**
```
GET    /api/v1/projects/:id/artifacts
POST   /api/v1/projects/:id/artifacts/generate
GET    /api/v1/projects/:id/artifacts/:artifactId
PUT    /api/v1/projects/:id/artifacts/:artifactId
POST   /api/v1/projects/:id/artifacts/:artifactId/approve
GET    /api/v1/projects/:id/artifacts/export/all
```

### 3.5 Live Sync Layer

**Responsibility:** Externe Änderungen erfassen & verarbeiten

**Features:**
- Webhook-Endpunkte (generisch)
- Connector-Framework (n8n, Zapier, Make)
- Event-Mapping-UI (kein Code nötig)
- Change Detection & Classification
- Auto-Review-Triggering
- Notifications bei kritischen Änderungen

**Unterstützte Event-Quellen:**
- n8n (Webhook-Node)
- Zapier (Custom Webhook)
- Retell/Vapi (Call-Logs, Config-Changes)
- OpenAI/Anthropic (Model-Updates)
- Voiceflow (Flow-Changes)
- Custom API (Generic)

**Event Types:**
- `model.changed`
- `prompt.updated`
- `tool.added/removed`
- `subprocessor.added`
- `data_flow.modified`
- `config.changed`
- `incident.detected`

**API Endpoints:**
```
POST   /api/v1/webhooks/:webhookId (empfangen)
GET    /api/v1/projects/:id/sync-config
POST   /api/v1/projects/:id/sync-config
PUT    /api/v1/projects/:id/sync-config/:configId
POST   /api/v1/projects/:id/sync/test
GET    /api/v1/projects/:id/events
POST   /api/v1/projects/:id/events/reprocess
```

### 3.6 Customer Trust Portal

**Responsibility:** Endkunden-Ansicht des Trust Passport

**Features:**
- White-Label (Agentur-Branding)
- Simplifizierte Ansicht (weniger technisch)
- Vertrauens-Indikatoren (Trust-Score, Badges)
- Änderungs-Benachrichtigungen
- Kontakt-Formular an Agentur
- Download-Center (Artefakte)

**URL-Struktur:**
- `https://trust.ai-agency.de/verify/:slug` (Public Passport)
- `https://trust.ai-agency.de/customer/:customerToken` (Customer Portal)

**API Endpoints:**
```
GET    /api/v1/public/passports/:slug
GET    /api/v1/public/passports/:slug/artifacts
POST   /api/v1/public/passports/:slug/contact
GET    /api/v1/customer-portal/:token
```

---

## 4. API Design

### Authentication
- JWT Bearer Token (Clerk-Integration)
- API Keys für Service-to-Service (Sync)
- Webhook-Signature-Verification

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

### Error Handling
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Required field missing",
    "details": [{ "field": "name", "message": "Name is required" }]
  }
}
```

### Rate Limiting
- Public APIs: 100 req/min
- Authenticated: 1000 req/min
- Webhooks: 500 req/min burst

---

## 5. Security Architecture

### Data Protection
- **Encryption at Rest:** PostgreSQL Transparent Data Encryption
- **Encryption in Transit:** TLS 1.3
- **Field-Level Encryption:** Für sensitive Intake-Daten (AWS KMS oder HashiCorp Vault)
- **Backup Encryption:** Automatisierte verschlüsselte Backups

### Access Control
- RBAC (Role-Based)
- Row-Level Security (PostgreSQL RLS für Multi-Tenancy)
- Resource-based Policies (nur eigene Orga-Daten)

### Compliance
- **DSGVO:** Recht auf Vergessen (Hard-Delete), Datenportabilität (Export), Einwilligungs-Tracking
- **AI Act:** Risk-Tier-Dokumentation, Transparenz-Vorgaben
- **SOC 2:** Audit-Logs, Change-Tracking, Access-Reviews

### Audit Logging
- Alle Datenänderungen (who, what, when, old_value, new_value)
- Unveränderlicher Log-Store (append-only)
- 90-Tage-Retention (konfigurierbar)

---

## 6. Frontend Architecture

### Page Structure

**Authenticated (Agentur-UI):**
```
/dashboard                    → Projekt-Übersicht
/customers                    → Kunden-Verwaltung
/customers/:id                → Kunden-Detail
/customers/:id/projects       → Kunden-Projekte
/projects                     → Alle Projekte
/projects/new                 → Neues Projekt
/projects/:id                 → Projekt-Detail
/projects/:id/intake          → Intake-Fragen
/projects/:id/passport        → Trust Passport Preview
/projects/:id/artifacts       → Evidence Engine
/projects/:id/sync            → Sync-Config
/projects/:id/changelog       → Änderungshistorie
/projects/:id/settings        → Projekt-Einstellungen
/settings                     → Orga-Einstellungen
/settings/team                → Team-Management
/settings/billing             → Abrechnung
```

**Public (Customer-Facing):**
```
/verify/:slug                 → Public Trust Passport
/verify/:slug/pdf             → PDF-Export
/portal/:token                → Customer Portal (white-label)
```

### State Management
- **Server State:** TanStack Query (REST-Cache)
- **Client State:** Zustand (UI-State, Auth)
- **Form State:** React Hook Form + Zod (Validation)

### Component Library
- **UI Framework:** shadcn/ui (auf Radix UI)
- **Icons:** Lucide React
- **Charts:** Tremor (für Risk-Scores, Dashboards)
- **PDF Viewer:** react-pdf

---

## 7. Deployment Architecture

### Docker-Compose (Local/Dev)
```yaml
services:
  app:
    build: ./app
    ports:
      - "3000:3000"
  api:
    build: ./api
    ports:
      - "4000:4000"
  postgres:
    image: postgres:16
    volumes:
      - postgres_data:/var/lib/postgresql/data
  redis:
    image: redis:7-alpine
  meilisearch:
    image: getmeili/meilisearch:latest
```

### Kubernetes (Production)
- **Namespace:** ai-trust-layer
- **Deployments:** app, api, worker (queue)
- **Services:** ClusterIP für interne Kommunikation
- **Ingress:** nginx-ingress + cert-manager (Let's Encrypt)
- **Secrets:** Kubernetes Secrets (später: External Secrets Operator)
- **Monitoring:** Prometheus + Grafana

### CI/CD
- **GitHub Actions:** Build, Test, Deploy
- **Environments:** dev → staging → production
- **Strategy:** Blue-Green Deployment

---

## 8. Roadmap (Phasen)

### Phase 1: Foundation (Wochen 1-4)
- [ ] Project Setup (Monorepo: Turborepo)
- [ ] Database Schema + Migrationen
- [ ] Auth-Integration (Clerk)
- [ ] Basis-API (Fastify)
- [ ] Frontend-Setup (Next.js + Tailwind)

**Deliverable:** Login, Orga-Registrierung, leeres Dashboard

### Phase 2: Core Product (Wochen 5-10)
- [ ] Customer Management (CRUD)
- [ ] Project Management (CRUD)
- [ ] Intake Engine (Fragebogen + Conditional Logic)
- [ ] Risk Engine (Scoring + Klassifizierung)
- [ ] Trust Passport (generieren + anzeigen)
- [ ] PDF-Export

**Deliverable:** V1 Produkt – Agentur kann Intake durchführen und Passport generieren

### Phase 3: Evidence & Sync (Wochen 11-16)
- [ ] Evidence Templates
- [ ] Artifact Generation
- [ ] Change Log
- [ ] Webhook-Empfang
- [ ] Sync-Config UI
- [ ] Event Processing

**Deliverable:** Living Passport – Änderungen werden erfasst

### Phase 4: Public Portal (Wochen 17-20)
- [ ] Public Passport Pages
- [ ] Customer Portal
- [ ] White-Label Branding
- [ ] Embed-Code
- [ ] Notifications

**Deliverable:** Kunden-sichtbarer Trust Layer

### Phase 5: Scale & Polish (Wochen 21-24)
- [ ] Performance-Optimierung
- [ ] Caching-Strategie
- [ ] Monitoring & Alerting
- [ ] Security-Audit
- [ ] Dokumentation

**Deliverable:** Production-Ready

---

## 9. File Structure

```
ai-trust-layer/
├── apps/
│   ├── web/                    # Next.js Frontend
│   │   ├── app/                # App Router
│   │   ├── components/
│   │   ├── lib/
│   │   └── public/
│   ├── api/                    # Fastify Backend
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── plugins/
│   │   │   └── utils/
│   │   └── tests/
│   └── worker/                 # BullMQ Workers
│       └── src/
├── packages/
│   ├── shared/                 # Shared Types, Utils
│   ├── database/               # Prisma Schema + Migrations
│   ├── ui/                     # Shared UI Components
│   └── config/                 # Shared Config (ESLint, TS)
├── docker/
│   ├── docker-compose.yml
│   └── Dockerfile.*
├── docs/
│   └── api/
└── scripts/
    └── deploy/
```

---

## 10. Open Questions (Entscheidungen nötig)

1. **Hosting:** Hetzner (EU, günstig) vs. AWS Frankfurt (mehr Features)?
2. **Auth:** Clerk (schneller) vs. selbst gebaut (mehr Kontrolle)?
3. **PDF-Engine:** Puppeteer (flexibel) vs. PDFKit (schneller)?
4. **Billing:** Stripe (Standard) vs. selbst gebaut?
5. **White-Label:** Custom Domains (CNAME) in V1 oder später?

---

## 11. Nächste Schritte

1. **Stack finalisieren** – Entscheidungen zu Hosting, Auth, Billing
2. **Repository initialisieren** – Turborepo Setup
3. **Phase 1 starten** – Foundation bauen
4. **MVP-Design** – Figma-Mockups für Intake + Passport

**Geschätzte Gesamtzeit bis Production:** 24 Wochen (6 Monate) mit 1-2 Entwicklern.
