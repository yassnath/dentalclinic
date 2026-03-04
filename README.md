# Klinik HealthEase

A modern clinic information system built with **Next.js (Pages Router)**, **Prisma ORM**, and **Supabase Postgres**.

## Highlights

- Role-based application flow: **Admin**, **Doctor**, **Receptionist**, and **Patient** dashboards.
- Modern landing page with consistent healthcare palette, dark mode support, and chatbot entrypoint.
- Global light/dark theme toggle across landing page, auth pages, and role dashboards.
- Centralized validation popups (success, warning, error, info) and confirmation popups for sensitive actions (delete/logout/edit, etc).
- Responsive tables with mobile-friendly behavior across landing and dashboard pages.
- Patient registration with **KTP camera OCR autofill** (multi-pass OCR + fallback parsing/normalization).
- Patient settings page with language switch (Indonesian/English) and account password update.
- Prisma schema mapped to clinic modules: users, registrations, schedules, medical records, payments, and notifications.
- Optional AI assistant integration (Cerebras API) with built-in fallback handling.

## Tech Stack

- **Frontend / SSR**: Next.js 16, React 19, TypeScript
- **Database ORM**: Prisma 6
- **Database**: Supabase Postgres
- **Styling**: Tailwind CSS + custom global theme tokens
- **Auth**: Cookie-based session/JWT utilities in app layer
- **Containerization**: Docker + Docker Compose

## Environment Variables

Copy `.env.example` into `.env`, then fill values from your Supabase project and app secrets.

```bash
cp .env.example .env
```

Required variables:

```env
DATABASE_URL="postgresql://postgres.<project-ref>:<url-encoded-password>@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
DIRECT_URL="postgresql://postgres.<project-ref>:<url-encoded-password>@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require"
JWT_SECRET="replace-with-strong-secret"
APP_URL="http://localhost:3000"
```

Optional variables:

```env
NEXT_PUBLIC_SUPABASE_URL="https://<project-ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=""
SUPABASE_URL="https://<project-ref>.supabase.co"
SUPABASE_ANON_KEY=""
SUPABASE_PUBLISHABLE_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""
CEREBRAS_API_KEY=""
CEREBRAS_MODEL="llama3.1-8b"
CEREBRAS_BASE_URL="https://api.cerebras.ai/v1"
RUN_DB_SEED="0"
```

Notes:

- Use your Supabase **ORM/Prisma connection strings** for `DATABASE_URL` and `DIRECT_URL`.
- If your DB password contains special characters (`@`, `!`, `%`, etc), URL-encode it in the connection string.
- `DATABASE_URL` should point to pooled/runtime connection; `DIRECT_URL` should point to direct schema/migration connection.

## Local Development

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Push schema:

```bash
npx prisma db push --skip-generate
```

Seed sample data (optional):

```bash
npm run db:seed
```

Run development server:

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Development Scripts

- `npm run dev` -> fast dev runner + automatic route warmup
- `npm run dev:plain` -> standard `next dev`
- `npm run dev:webpack` -> webpack fallback mode
- `npm run warmup:routes` -> manual route warmup
- `npm run build` -> production build
- `npm run start` -> start production server
- `npm run prisma:generate` -> Prisma client generation
- `npm run prisma:push` -> push Prisma schema to database
- `npm run prisma:studio` -> Prisma Studio
- `npm run db:seed` -> seed default records

## Docker

Start with Docker Compose:

```bash
docker compose up --build
```

Container startup flow:

1. `prisma generate`
2. `prisma db push --skip-generate` (with retries)
3. optional seed when `RUN_DB_SEED=1`
4. run Next.js production server

## OCR KTP Autofill Notes

- The registration page supports camera capture and OCR extraction for KTP fields.
- OCR parser includes multi-pass recognition and fallback heuristics for noisy text.
- Best results: stable framing, good lighting, sharp focus, and minimal glare.
- Some devices require HTTPS context for reliable camera preview.

## Mobile Preview

To test on phone:

1. Run `npm run dev` on your laptop.
2. Connect phone and laptop to the same network.
3. Open `http://<your-local-ip>:3000` on phone browser.

If camera preview is black on mobile, test with HTTPS tunneling (for example ngrok/cloudflared), then open the HTTPS URL on phone.
