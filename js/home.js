import { supabase } from "./supabaseClient.js";
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  window.location.href = "./index.html";
}

// document.querySelector(".attendance-btn").addEventListener("click", () => {
//   window.location.href = "./attendance.html";
// });

document.querySelector(".member-btn").addEventListener("click", () => {
  window.location.href = "./members.html";
});

document.getElementById("signup-btn").addEventListener("click", () => {
  window.location.href = "./signup.html";
});

document.getElementById("logout-btn").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "./index.html";
});