import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

export const supabase = createClient(
  "https://vaunajbtbxoevjunzerj.supabase.co",
  "your-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9-key"
);
