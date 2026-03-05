import { createBrowserClient } from '@supabase/ssr'

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables are missing");
}

const supabase = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
);

console.log("Supabase connected successfully")
export default supabase