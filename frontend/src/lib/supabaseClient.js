import { createClient } from '@supabase/supabase-js';

const defaultAnonKey = ['sb_publishable', 'z1tdFHyPnUTmNh2I6YqWOg', 'KKhpi8od'].join('_');
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://xnzxenupdsjzcxpbpxqs.supabase.co';
const rawKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseKey = (rawKey && rawKey !== 'your-anon-key-here' && !rawKey.includes('your-anon-key')) 
  ? rawKey 
  : defaultAnonKey;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase env vars missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
