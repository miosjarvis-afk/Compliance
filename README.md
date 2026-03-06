# AI Trust Layer

**Trust Infrastructure für AI-Agenturen**

Ein Living Trust Passport für AI-Systeme – verwandle Compliance in ein verkaufsfähiges Asset.

## Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS, shadcn/ui
- **Backend:** Fastify, TypeScript
- **Database:** PostgreSQL 16, Prisma ORM
- **Cache/Queue:** Redis, BullMQ
- **Hosting:** Hostinger VPS (Docker Compose)
- **Auth:** Clerk

## Quick Start

```bash
# 1. Dependencies installieren
pnpm install

# 2. Environment kopieren
cp docker/.env.example docker/.env
# .env mit deinen Werten füllen

# 3. Datenbank starten
pnpm docker:up

# 4. Prisma Schema generieren
pnpm db:generate

# 5. Migrationen ausführen
pnpm db:migrate

# 6. Development starten
pnpm dev
```

## Deployment (Hostinger VPS)

```bash
# Server vorbereiten
bash scripts/deploy/hostinger.sh

# Oder manuell:
# 1. Docker + Docker Compose installieren
# 2. Git clone
# 3. docker-compose up -d
```

## Architektur

Siehe [ARCHITECTURE.md](./ARCHITECTURE.md)

## Autonomie-Regeln

Siehe [AUTONOMY_RULES.md](./AUTONOMY_RULES.md)

## Roadmap

- [ ] Phase 1: Foundation (Wochen 1-4)
- [ ] Phase 2: Core Product (Wochen 5-10)
- [ ] Phase 3: Evidence & Sync (Wochen 11-16)
- [ ] Phase 4: Public Portal (Wochen 17-20)
- [ ] Phase 5: Scale (Wochen 21-24)

## License

MIT