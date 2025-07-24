import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://qorcpcblvjvmwmorxfol.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvcmNwY2Jsdmp2bXdtb3J4Zm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMzcyOTcsImV4cCI6MjA2ODkxMzI5N30.YKU93ukOCEQa6oioYliUlLD3FiMrl2yoOnSSYJslYME')


export default supabase
