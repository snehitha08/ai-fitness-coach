-- =========================================================
-- AI Fitness Coach — Database Schema
-- Run this in the Supabase SQL editor (or via `supabase db push`)
-- =========================================================

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  daily_calorie_target int default 2000,
  daily_protein_target_g int default 120,
  height_cm numeric,
  weight_kg numeric,
  goal text check (goal in ('lose_fat', 'build_muscle', 'maintain', 'improve_endurance')) default 'maintain',
  created_at timestamptz default now()
);

-- =========================================================
-- MEALS — photo-based calorie estimation
-- =========================================================
create table if not exists public.meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  photo_url text not null,
  description text,               -- AI-generated description of the meal
  estimated_calories int,
  estimated_protein_g numeric,
  estimated_carbs_g numeric,
  estimated_fat_g numeric,
  confidence text check (confidence in ('low', 'medium', 'high')),
  ai_raw_response jsonb,           -- store full model response for debugging/audit
  eaten_at timestamptz default now(),
  created_at timestamptz default now()
);

-- =========================================================
-- WORKOUTS — planner & progression
-- =========================================================
create table if not exists public.workout_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  goal text check (goal in ('strength', 'hypertrophy', 'endurance', 'general')) default 'general',
  days_per_week int default 3,
  created_at timestamptz default now()
);

create table if not exists public.workout_exercises (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references public.workout_plans(id) on delete cascade not null,
  day_index int not null,          -- 0 = day 1, 1 = day 2, ...
  name text not null,
  target_sets int not null,
  target_reps int not null,
  order_index int default 0
);

-- Actual logged performance, used to compute progression over time
create table if not exists public.workout_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  exercise_id uuid references public.workout_exercises(id) on delete cascade not null,
  performed_at timestamptz default now(),
  set_number int not null,
  reps int not null,
  weight_kg numeric,
  rpe numeric              -- rate of perceived exertion, 1-10, optional
);

-- =========================================================
-- FORM ANALYSIS — camera-based rep/form sessions
-- =========================================================
create table if not exists public.form_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  exercise_name text not null,
  reps_detected int default 0,
  avg_form_score numeric,          -- 0-100
  issues jsonb,                    -- e.g. [{"rep":3,"issue":"knee valgus","severity":"medium"}]
  started_at timestamptz default now(),
  ended_at timestamptz
);

-- =========================================================
-- HABITS — daily tracking
-- =========================================================
create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  icon text default '✅',
  target_per_week int default 7,
  created_at timestamptz default now()
);

create table if not exists public.habit_logs (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid references public.habits(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  completed_on date not null default current_date,
  unique (habit_id, completed_on)
);

-- =========================================================
-- INDEXES
-- =========================================================
create index if not exists idx_meals_user_date on public.meals(user_id, eaten_at desc);
create index if not exists idx_workout_logs_user on public.workout_logs(user_id, performed_at desc);
create index if not exists idx_habit_logs_habit_date on public.habit_logs(habit_id, completed_on desc);

-- =========================================================
-- ROW LEVEL SECURITY — every table is user-scoped
-- =========================================================
alter table public.profiles enable row level security;
alter table public.meals enable row level security;
alter table public.workout_plans enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.workout_logs enable row level security;
alter table public.form_sessions enable row level security;
alter table public.habits enable row level security;
alter table public.habit_logs enable row level security;

create policy "Users manage own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users manage own meals" on public.meals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own workout plans" on public.workout_plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own workout exercises" on public.workout_exercises
  for all using (
    exists (select 1 from public.workout_plans p where p.id = plan_id and p.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.workout_plans p where p.id = plan_id and p.user_id = auth.uid())
  );

create policy "Users manage own workout logs" on public.workout_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own form sessions" on public.form_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own habits" on public.habits
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own habit logs" on public.habit_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================================================
-- STORAGE — bucket for meal photos
-- =========================================================
insert into storage.buckets (id, name, public)
values ('meal-photos', 'meal-photos', true)
on conflict (id) do nothing;

create policy "Users upload own meal photos"
  on storage.objects for insert
  with check (bucket_id = 'meal-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Meal photos are publicly readable"
  on storage.objects for select
  using (bucket_id = 'meal-photos');

-- =========================================================
-- Auto-create profile row on signup
-- =========================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
