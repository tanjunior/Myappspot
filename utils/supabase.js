import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mddvsrpamyqtkfylxdvs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZHZzcnBhbXlxdGtmeWx4ZHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNjU0NjIsImV4cCI6MjAyMjg0MTQ2Mn0.hM3KS4UspmybZEbODxYERIoskHbvj-WO57rB6LuBMz8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
