import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: 'client' | 'admin';
  created_at: string;
  updated_at: string;
};

export type Pet = {
  id: string;
  owner_id: string;
  name: string;
  species: string;
  breed: string | null;
  age: number | null;
  weight: number | null;
  photo_url: string | null;
  medical_notes: string;
  created_at: string;
  updated_at: string;
};

export type Appointment = {
  id: string;
  pet_id: string;
  owner_id: string;
  appointment_date: string;
  service_type: 'consultation' | 'vaccination' | 'surgery' | 'grooming' | 'emergency';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  veterinarian_notes: string;
  created_at: string;
  updated_at: string;
};
