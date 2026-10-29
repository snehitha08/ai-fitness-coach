import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Flame,
  HeartPulse,
  Salad,
  Sparkles,
  Target,
  TrendingUp,
  Dumbbell,
  Footprints,
} from 'lucide-react';

const week = [
  { day: 'Mon', height: '48%', active: false },
  { day: 'Tue', height: '72%', active: false },
  { day: 'Wed', height: '58%', active: false },
  { day: 'Thu', height: '88%', active: true },
  { day: 'Fri', height: '40%', active: false },
  { day: 'Sat', height: '64%', active: false },
  { day: 'Sun', height: '28%', active: false },
];

const habits = [
  { label: 'Drink 2L water', detail: 'Hydration', done: true },
  { label: '30-minute walk', detail: 'Movement', done: true },
  { label: 'Stretch for 10 min', detail: 'Recovery', done: false },
];

function MetricCard({
  label,
  value,
  unit,
  note,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  note: string;
  icon: typeof Flame;
  accent: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}<span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span></p>
        </div>
        <span className={`rounded-xl p-3 ${accent}`}><Icon size={20} /></span>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{note}</p>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden min-h-screen w-64 shrink-0 border-r border-border bg-surface px-5 py-7 lg:block">
          <a href="#" className="flex items-center gap-3">
            <span className="rounded-xl bg-primary p-2 text-primary-foreground"><Activity size={22} /></span>
            <span className="font-semibold tracking-tight">Pulse<span className="text-primary">AI</span></span>
          </a>
          <p className="mb-3 mt-10 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Workspace</p>
          <nav className="space-y-1 text-sm">
            <a href="#overview" className="flex items-center gap-3 rounded-xl bg-primary/10 px-3 py-3 font-medium text-primary"><Activity size={18} /> Overview</a>
            <a href="#nutrition" className="flex items-center gap-3 rounded-xl px-3 py-3 text-muted-foreground hover:bg-muted"><Salad size={18} /> Nutrition</a>
            <a href="#workout" className="flex items-center gap-3 rounded-xl px-3 py-3 text-muted-foreground hover:bg-muted"><Dumbbell size={18} /> Workouts</a>
            <a href="#habits" className="flex items-center gap-3 rounded-xl px-3 py-3 text-muted-foreground hover:bg-muted"><CheckCircle2 size={18} /> Habits</a>
          </nav>
          <div className="mt-12 rounded-2xl bg-foreground p-4 text-background">
            <Sparkles className="mb-3 text-primary" size={20} />
            <p className="text-sm font-semibold">Small steps count.</p>
            <p className="mt-2 text-xs leading-5 text-background/70">Consistency beats perfection. Keep showing up for yourself.</p>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">UI preview · Sample data only</p>
        </aside>

        <section id="overview" className="min-w-0 flex-1 px-4 py-6 sm:px-7 lg:px-10 lg:py-9">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="text-sm text-muted-foreground">Thursday, your wellness snapshot</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Your progress, at a glance.</h1>
              <p className="mt-2 text-sm text-muted-foreground">A little better than yesterday is a win.</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm">
              <CalendarDays size={17} className="text-muted-foreground" /> This week
            </div>
          </header>

          <div className="mt-5 rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
            <strong>Demo preview:</strong> All metrics and habit states below are illustrative sample data. They are not connected to your account or database yet.
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Calories consumed" value="1,280" unit="kcal" note="Illustrative daily total" icon={Flame} accent="bg-orange-500/10 text-orange-500" />
            <MetricCard label="Protein" value="76" unit="g" note="Sample nutrition metric" icon={Salad} accent="bg-emerald-500/10 text-emerald-500" />
            <MetricCard label="Active minutes" value="32" unit="min" note="Sample activity metric" icon={HeartPulse} accent="bg-rose-500/10 text-rose-500" />
            <MetricCard label="Steps" value="6,420" unit="steps" note="Sample movement metric" icon={Footprints} accent="bg-sky-500/10 text-sky-500" />
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
            <article id="workout" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Activity overview</p>
                  <h2 className="mt-1 text-lg font-semibold">Move a little every day</h2>
                </div>
                <span className="rounded-xl bg-primary/10 p-2.5 text-primary"><TrendingUp size={20} /></span>
              </div>
              <div className="mt-8 flex h-40 items-end justify-between gap-3">
                {week.map((item) => (
                  <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div className="flex h-full w-full items-end">
                      <div style={{ height: item.height }} className={`w-full rounded-t-lg ${item.active ? 'bg-primary' : 'bg-primary/15'}`} />
                    </div>
                    <span className={`text-xs ${item.active ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>{item.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-xl bg-muted/70 p-3 text-sm">
                <Target size={18} className="shrink-0 text-primary" />
                <span className="text-muted-foreground">Try setting a realistic weekly movement goal.</span>
              </div>
            </article>

            <article id="nutrition" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's nutrition</p>
                  <h2 className="mt-1 text-lg font-semibold">Fuel your day</h2>
                </div>
                <span className="rounded-xl bg-orange-500/10 p-2.5 text-orange-500"><Salad size={20} /></span>
              </div>
              <div className="mt-6 flex items-center gap-5">
                <div className="relative grid size-28 shrink-0 place-items-center rounded-full" style={{ background: 'conic-gradient(#22c55e 0deg 230deg, hsl(var(--muted)) 230deg 360deg)' }}>
                  <div className="grid size-20 place-items-center rounded-full bg-surface">
                    <div className="text-center"><p className="text-xl font-semibold">64%</p><p className="text-[10px] text-muted-foreground">sample goal</p></div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div><p className="text-muted-foreground">Consumed</p><p className="font-semibold">1,280 kcal</p></div>
                  <div><p className="text-muted-foreground">Example target</p><p className="font-semibold">2,000 kcal</p></div>
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-border p-3">
                <p className="text-sm font-medium">Keep it balanced</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Prioritize varied foods and remember that calorie needs differ from person to person.</p>
              </div>
            </article>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
            <article id="habits" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div><p className="text-sm text-muted-foreground">Build consistency</p><h2 className="mt-1 text-lg font-semibold">Daily habits</h2></div>
                <span className="text-sm text-muted-foreground">2 of 3 sample tasks</span>
              </div>
              <div className="mt-4 space-y-2">
                {habits.map((habit) => (
                  <div key={habit.label} className="flex items-center gap-3 rounded-xl border border-border p-3">
                    <span className={`grid size-9 place-items-center rounded-full ${habit.done ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {habit.done ? <CheckCircle2 size={19} /> : <Target size={19} />}
                    </span>
                    <div className="min-w-0 flex-1"><p className={`text-sm font-medium ${habit.done ? '' : 'text-muted-foreground'}`}>{habit.label}</p><p className="mt-0.5 text-xs text-muted-foreground">{habit.detail}</p></div>
                    {habit.done && <span className="text-xs font-medium text-primary">Done</span>}
                  </div>
                ))}
              </div>
            </article>

            <article className="flex flex-col justify-between rounded-2xl bg-foreground p-5 text-background sm:p-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1.5 text-xs"><Sparkles size={14} className="text-primary" /> Your next step</span>
                <h2 className="mt-5 max-w-sm text-2xl font-semibold leading-tight">Progress is built from the things you repeat.</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-background/70">Start with one achievable action today. This preview will become personalized once authentication and data persistence are implemented.</p>
              </div>
              <a href="#habits" className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">Review habits <ArrowRight size={16} /></a>
            </article>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-2 py-8 text-xs text-muted-foreground">
            <span>PulseAI · AI Fitness Coach concept</span>
            <span className="inline-flex items-center gap-1"><ArrowUpRight size={13} /> Built with Next.js and TypeScript</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
