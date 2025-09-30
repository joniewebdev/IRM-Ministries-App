import { supabase } from "./supabaseClient.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    document.getElementById("login-message").innerText = "Login failed: " + error.message;
  } else {
    document.getElementById("login-message").innerText = "Login successful!";
    setTimeout(() => window.location.href = "home.html", 1500);
  }
});
