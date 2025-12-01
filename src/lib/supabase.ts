import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function crearPreferencia(data: any) {
  const { data: response, error } = await supabase.functions.invoke(
    "preference-id-generator",
    {
      body: data,
    }
  );

  if (error) {
    console.error("Error invocando función:", error);
    return null;
  }

  return response;
}