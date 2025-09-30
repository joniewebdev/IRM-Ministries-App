import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://vaunajbtbxoevjunzerj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdW5hamJ0YnhvZXZqdW56ZXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTE5MTIsImV4cCI6MjA3NDcyNzkxMn0.0kHj3gpuQuQ5iJR-HFWT4uHlj6BQ9B_JCFHMVgbTlvA"; 
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function requireAuth(redirectTo = "index.html") {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) window.location.href = redirectTo;
  return session;
}

export async function logout(redirectTo = "index.html") {
  await supabase.auth.signOut();
  window.location.href = redirectTo;
}
