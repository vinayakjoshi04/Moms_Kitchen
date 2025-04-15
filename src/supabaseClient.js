import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://teijzieaxyxtvdblfufq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlaWp6aWVheHl4dHZkYmxmdWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MDUyMzEsImV4cCI6MjA1OTE4MTIzMX0.z77jnYe4zLthl8t4zFoJxRUdiD5zzY2VotD9atHz3js';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);