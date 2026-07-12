# AI Fitness Coach

AI-powered nutrition, workout, and form-tracking app.

## Stack
- Next.js 14 (App Router)
- Supabase (Auth, Postgres, Storage)
- Vercel AI SDK (OpenAI / Gemini Vision)
- MediaPipe Tasks Vision (pose estimation for form analysis)
- Tailwind CSS + Recharts

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a Supabase project** at supabase.com, then run the schema:
   ```bash
   # Paste the contents of supabase/schema.sql into the Supabase SQL editor and run it
   ```

3. **Environment variables** — copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase project settings
   - `OPENAI_API_KEY` and/or `GOOGLE_GENERATIVE_AI_API_KEY` — for vision-based calorie estimation

4. **Run locally**
   ```bash
   npm run dev
   ```

## Project structure
```
app/
  dashboard/      → overview: today's calories, next workout, habit streaks
  meals/          → photo upload + calorie estimation history
  workouts/       → planner, active session, progression charts
  form-check/     → camera-based rep counting & form feedback
  habits/         → daily habit tracker
  api/            → route handlers (meal analysis, form-session save, etc.)
components/
lib/
  supabase/       → browser + server Supabase clients
  ai/             → AI SDK prompts & vision helpers
types/            → shared TypeScript types (mirrors supabase/schema.sql)
supabase/
  schema.sql      → full DB schema, RLS policies, storage bucket
```

## Build status
- [x] Project scaffold + Supabase schema
- [ ] Dashboard shell
- [ ] Meal photo → calorie estimation
- [ ] Workout planner & progression
- [ ] Camera form analysis
- [ ] Habit tracking + charts
