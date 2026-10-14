# Tsaro Global Defence Web Platform

## Overview

This repository contains the source code for the Tsaro Global Defence public-facing web platform and its bespoke integrated Content Management System (CMS). Built for high performance, security, and scalability, the platform handles dynamic page generation, media management, career applications, and academy bookings for global operations.

## Technology Stack

The platform is engineered using modern web architecture:

- **Next.js**: Framework for server-rendered React applications (App Router).
- **React**: Component-based UI library.
- **TypeScript**: Strictly typed JavaScript for enterprise reliability.
- **Tailwind CSS**: Utility-first CSS framework for bespoke styling.
- **Supabase**: Backend-as-a-Service powering the database, authentication, and secure storage.
- **Vercel**: Recommended global edge-network deployment infrastructure.

## Architecture

- **Next.js App Router**: Utilizes modern React Server Components (`app/` directory) for optimized server-side rendering, SEO metadata generation, and enhanced performance.
- **CMS Block System**: The admin interface allows authorized users to construct pages dynamically using a modular component architecture (e.g., Hero Banners, Capability Grids, Split Narratives, etc.). Page structures are serialized into the database and rendered dynamically on the frontend.
- **Supabase Database**: A PostgreSQL database housing dynamic CMS page metadata, component layouts, templates, global navigation menus, and public form submissions.
- **Supabase Auth**: Secure JWT-based authentication flow protecting the `/admin` CMS routes.
- **Storage**: Supabase Storage manages the deployment of public assets (via the `media` bucket) and secure, restricted applicant documentation (via the `cvs` bucket).
- **Admin Authorization**: Strict server-side middleware and `requireAdmin()` action checks ensure that only authenticated administrators can mutate page data or read private submissions.

## Local Setup

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory. You will need to provide your Supabase instance credentials:

```env
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

> **Warning:** Never commit real secrets or service role keys to version control.

### 3. Start Development Server

Run the local Next.js development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## Database Management

The database architecture is strictly managed via source control. All schema changes, table creations, and Row Level Security (RLS) policies are maintained within the `supabase/migrations/` directory.

To apply changes to a fresh Supabase project, execute the SQL files located in `supabase/migrations/` sequentially within your Supabase SQL editor or via the Supabase CLI. 

## Build & Production

To compile the application for production deployment:

```bash
npm run build
```

The compiled application can be securely hosted on Vercel or any standard Node.js hosting environment supporting Next.js Server Components.

## Security Overview

Security is enforced at multiple layers:

- **Authentication & Authorization**: Supabase Auth handles identity. The CMS dashboard (`/admin/*`) and all its underlying Next.js Server Actions enforce strict `requireAdmin()` checks.
- **Row Level Security (RLS)**: PostgreSQL RLS policies restrict database operations, ensuring the public can only read published pages or insert new form submissions, while only administrators can query submission logs or modify the CMS state.
- **Private Storage**: Sensitive documents (like Career Application CVs) are saved to a private Supabase bucket. They are never exposed via public URLs; instead, authorized administrators are issued short-lived (60-second) signed URLs to download them.
- **Form Abuse Prevention**: Server-side rate limiting and duplicate-submission blocking protect all public ingestion endpoints (Contact, Academy Bookings, Career Applications).
- **XSS Protection**: All rich-text inputs are strictly sanitized via isomorphic DOM purification before rendering.
