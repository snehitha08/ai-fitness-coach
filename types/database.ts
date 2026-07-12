export type Goal = 'lose_fat' | 'build_muscle' | 'maintain' | 'improve_endurance';
export type WorkoutGoal = 'strength' | 'hypertrophy' | 'endurance' | 'general';
export type Confidence = 'low' | 'medium' | 'high';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  daily_calorie_target: number;
  daily_protein_target_g: number;
  height_cm: number | null;
  weight_kg: number | null;
  goal: Goal;
  created_at: string;
}

export interface Meal {
  id: string;
  user_id: string;
  photo_url: string;
  description: string | null;
  estimated_calories: number | null;
  estimated_protein_g: number | null;
  estimated_carbs_g: number | null;
  estimated_fat_g: number | null;
  confidence: Confidence | null;
  ai_raw_response: unknown;
  eaten_at: string;
  created_at: string;
}

export interface WorkoutPlan {
  id: string;
  user_id: string;
  name: string;
  goal: WorkoutGoal;
  days_per_week: number;
  created_at: string;
}

export interface WorkoutExercise {
  id: string;
  plan_id: string;
  day_index: number;
  name: string;
  target_sets: number;
  target_reps: number;
  order_index: number;
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  exercise_id: string;
  performed_at: string;
  set_number: number;
  reps: number;
  weight_kg: number | null;
  rpe: number | null;
}

export interface FormIssue {
  rep: number;
  issue: string;
  severity: 'low' | 'medium' | 'high';
}

export interface FormSession {
  id: string;
  user_id: string;
  exercise_name: string;
  reps_detected: number;
  avg_form_score: number | null;
  issues: FormIssue[] | null;
  started_at: string;
  ended_at: string | null;
}

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  target_per_week: number;
  created_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  completed_on: string;
}

// Minimal Database type for Supabase client generics.
// Replace with `supabase gen types typescript` output once the project is linked.
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      meals: { Row: Meal; Insert: Partial<Meal>; Update: Partial<Meal> };
      workout_plans: { Row: WorkoutPlan; Insert: Partial<WorkoutPlan>; Update: Partial<WorkoutPlan> };
      workout_exercises: { Row: WorkoutExercise; Insert: Partial<WorkoutExercise>; Update: Partial<WorkoutExercise> };
      workout_logs: { Row: WorkoutLog; Insert: Partial<WorkoutLog>; Update: Partial<WorkoutLog> };
      form_sessions: { Row: FormSession; Insert: Partial<FormSession>; Update: Partial<FormSession> };
      habits: { Row: Habit; Insert: Partial<Habit>; Update: Partial<Habit> };
      habit_logs: { Row: HabitLog; Insert: Partial<HabitLog>; Update: Partial<HabitLog> };
    };
  };
}
