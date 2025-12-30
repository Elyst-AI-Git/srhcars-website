import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Car = {
  id: string;
  model_name: string;
  price: number;
  year: number;
  body_type: string;
  doors: number;
  seats: number;
  colour: string;
  registration_date: string;
  mileage: number;
  fuel_type: string;
  gearbox: string;
  drive_type: string;
  key_features: string[];
  image_urls: string[];
  status: 'available' | 'sold';
  created_at: string;
};
