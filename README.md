# Tsaro Global Defence — Enterprise Platform Architecture

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-Database_&_Auth-3ECF8E?logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)

Official monorepo housing the sovereign defense web portal, tactical intelligence briefings engine, career recruitment pipeline, and bespoke headless Content Management System (CMS) for **Tsaro Global Defence**.

---

## 1. System Overview

Tsaro Global Defence provides sovereign governments, state ministries, and multinational enterprises with strategic defense infrastructure, kinetic countermeasures, tactical intelligence, and command-level academy training.

This platform provides:
- **Public Sovereign Gateway**: High-speed, edge-rendered defense intelligence portal with interactive global operational theaters, capability catalog, and strategic research insights.
- **Bespoke Headless CMS**: Production-grade modular block architecture empowering authorized personnel to build, reorder, version, and publish operational pages dynamically.
- **Tactical Academy Booking Engine**: High-security enrollment engine for specialized command and tactical training courses.
- **Field Deployments & Recruitment Portal**: Secure CV transmission engine with private S3/Supabase storage buckets and short-lived signed download authorization.
- **Enterprise SEO & Structured Entity Data**: Hardened OpenGraph, Twitter Cards, dynamic sitemaps, robots protocol, and DefenseContractor JSON-LD schema.

---

## 2. Platform Architecture

```
Tsaro/
├── tsaro-web/                      # Production Next.js 16 App Router application
│   ├── src/
│   │   ├── app/                    # React Server Components, Route Handlers, Server Actions
│   │   │   ├── (public pages)      # Landing, [slug], Careers, Academy, Contact
│   │   │   ├── admin/              # Secured CMS management console
│   │   │   ├── login/              # Multi-factor authentication gateway
│   │   │   ├── actions/            # Server-side mutation handlers
│   │   │   ├── robots.ts           # Dynamic search engine directives
│   │   │   └── sitemap.ts          # Automatic CMS-indexed XML sitemap
│   │   ├── cms/                    # Headless CMS block system
│   │   │   ├── blocks/             # Block registries, variant handlers, dynamic renderers
│   │   │   └── editors/            # Live admin block inspectors and controls
│   │   ├── components/             # Reusable UI systems (sections, blocks, layouts)
│   │   └── lib/                    # Core utilities, rate-limiting, XSS sanitization, Supabase
│   ├── supabase/                   # Schema definitions, migrations, and RLS policies
│   └── tests/                      # Playwright E2E and security regression suites
└── wix-design-template/            # Historical design benchmarks and initial visual mockups
```

---

## 3. Technology & Engineering Standards

- **Next.js 16 (App Router)**: Leverages React 19 Server Components for minimal client-side JavaScript execution, instantaneous LCP metrics, and edge caching.
- **Supabase (PostgreSQL 15)**: Database with Row-Level Security (RLS) enforcing strict tenant boundaries between public readers and verified defense administrators.
- **Tailwind CSS v4**: Hardware-accelerated styling with custom defense theme tokens (`obsidian`, `charcoal`, `brandRed`).
- **Sanitization & Security**:
  - `isomorphic-dompurify` for DOM-level XSS prevention on rich text blocks.
  - Server-side token bucket rate limiting on ingestion routes (`/actions/*`).
  - Private storage buckets with 60-second expiring signed URLs for applicant dossiers.

---

## 4. Local Development

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher
- Supabase CLI (optional for local database migrations)

### Setup Instructions

1. Navigate to the web application directory:
   ```bash
   cd tsaro-web
   ```

2. Install production dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key" # Optional for administrative tasks
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

---

## 5. Security & Verification

Run automated type verification and linting:

```bash
# Type verification
npx tsc --noEmit

# Static analysis and standards enforcement
npm run lint

# E2E test suite
npx playwright test
```

---

## 6. Deployment

The application is optimized for deployment on Vercel or any containerized edge runtime:

```bash
npm run build
npm run start
```

---

© Tsaro Global Defence. All rights reserved. Confidential & Proprietary.
