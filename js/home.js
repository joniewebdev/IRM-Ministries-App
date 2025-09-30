import { supabase } from "./supabaseClient.js";

const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  window.location.href = "index.html"; // redirect if not logged in
}

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
});
