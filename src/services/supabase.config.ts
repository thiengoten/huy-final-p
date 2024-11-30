import { Database } from '@/types/database.types';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAdminKey = import.meta.env.VITE_SUPABASE_ADMIN_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseAdminKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export default supabase