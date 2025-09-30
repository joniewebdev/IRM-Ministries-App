import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

export const supabase = createClient(
  "https://vaunajbtbxoevjunzerj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdW5hamJ0YnhvZXZqdW56ZXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTE5MTIsImV4cCI6MjA3NDcyNzkxMn0.0kHj3gpuQuQ5iJR-HFWT4uHlj6BQ9B_JCFHMVgbTlvA"
);
