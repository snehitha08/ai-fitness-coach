# AI Fitness Coach

An AI-assisted fitness app concept for tracking nutrition, planning workouts, monitoring habits, and exploring camera-based exercise-form feedback.

> **Project status:** Early scaffold. The database schema and core project configuration are present, but the main app screens and end-to-end flows are not yet implemented. This README distinguishes planned features from working functionality.

## Tech stack

- **Frontend:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS
- **Backend/data:** Supabase Auth, Postgres, and Storage (planned integration)
- **AI:** Vercel AI SDK with OpenAI and/or Google Gemini providers (planned integration)
- **Computer vision:** MediaPipe Tasks Vision (planned form-analysis feature)
- **Charts/UI:** Recharts, Lucide React

## Planned features

- Dashboard for daily nutrition, workout plans, and habit progress
- Meal-photo analysis with estimated calories and macronutrients
- Workout planning and exercise-performance logs
- Camera-based pose/form feedback and rep counting
- Habit tracking and progress charts

These are planned features, not claims that each workflow is currently functional.

## Getting started

### Prerequisites

- Node.js compatible with Next.js 14
- npm
- A Supabase project for database/auth features
- An AI provider API key if you implement and run AI-powered routes

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and add the values for the services you have configured:

```bash
cp .env.example .env.local
```

Expected variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client key intended for browser use, subject to correct RLS policies |
| `OPENAI_API_KEY` | Optional server-side OpenAI API key |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Optional server-side Google AI API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only privileged key; leave unset unless a trusted server route specifically needs it |

**Security:** Never commit `.env.local` or real API keys. Do not prefix private AI keys or the Supabase service-role key with `NEXT_PUBLIC_`. Configure production variables in your hosting provider. Before using real user data, review and test Supabase Row Level Security (RLS) policies and storage permissions.

### 3. Set up the database

Review `supabase/schema.sql`, then run it in the Supabase SQL Editor for a new project. Confirm that the resulting tables, RLS policies, and storage setup match your intended app behavior before exposing the project publicly.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Check the production build

```bash
npm run build
```

Run this before deploying. If it fails, fix the first meaningful TypeScript, lint, or build error reported in the logs rather than relying only on the final summary line.

## Repository layout

```text
app/                 Next.js App Router and route handlers (screens/API routes are still to be completed)
components/          Shared UI components
lib/supabase/        Supabase browser/server client helpers
lib/ai/              AI helper code, if/when implemented
types/               Shared TypeScript types
supabase/schema.sql  Database schema and policies
.env.example         Environment variable names (no secrets)
```

The layout above describes the intended organization; not every planned route or feature currently exists.

## Recommended implementation order

1. Add a working home page and shared layout/navigation.
2. Add Supabase auth and verify user-specific data access with RLS.
3. Implement one complete vertical slice first (for example, create and list a workout plan).
4. Add meal analysis through a server-side route with input validation, upload limits, and clear AI-estimate disclaimers.
5. Add camera-based form analysis with explicit camera permission and clear user feedback.
6. Add automated checks and document tested setup/deployment steps.

## Current checklist

- [x] Initial Next.js/TypeScript project configuration
- [x] Supabase schema draft
- [ ] Working home/dashboard route
- [ ] Authentication flow verified end to end
- [ ] Workout planning and logging
- [ ] Meal upload and AI estimation
- [ ] Camera-based form analysis
- [ ] Habit tracking and charts
- [ ] Production build and deployment verified

## Notes

AI-generated calorie estimates and exercise-form feedback can be inaccurate. Present them as estimates, allow users to correct records, and avoid presenting the app as a substitute for medical or professional fitness advice.
