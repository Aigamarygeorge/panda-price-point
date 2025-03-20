
import { createClient } from '@supabase/supabase-js';

// These are placeholder values that will be replaced with actual Supabase credentials
// after connecting your Lovable project to Supabase
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
