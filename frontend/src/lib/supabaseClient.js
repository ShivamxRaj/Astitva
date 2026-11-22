import { createClient } from '@supabase/supabase-js';

const defaultAnonKey = ['sb_publishable', 'z1tdFHyPnUTmNh2I6YqWOg', 'KKhpi8od'].join('_');
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://xnzxenupdsjzcxpbpxqs.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || defaultAnonKey;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase env vars missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
