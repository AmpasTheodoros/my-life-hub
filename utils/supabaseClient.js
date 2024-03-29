    // utils/supabaseClient.js
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Ensure these environment variables are set in your .env.local file
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
