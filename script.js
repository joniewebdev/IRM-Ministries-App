if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registered"))
}

const { createClient } = supabase
const supa = createClient(
    "https://vaunajbtbxoevjunzerj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdW5hamJ0YnhvZXZqdW56ZXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTE5MTIsImV4cCI6MjA3NDcyNzkxMn0.0kHj3gpuQuQ5iJR-HFWT4uHlj6BQ9B_JCFHMVgbTlvA"
);

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const user = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  
  loginUser(user, pass);
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supa.auth.signOut();
    window.location.href = "./index.html";
});

async function loginUser(email, password) {
    var { data, error } = await supa.auth.signInWithPassword({
        email: email,
        password: password
    });
    if (error) {
        document.getElementById("login-message").innerText = "Login failed: " + error.message;
        return;
    }
    document.getElementById("login-message").innerText = "Login successful!";
    setTimeout(() => {
      window.location.href = "./home.html";
    }, 2000);
}

async function checkAuth() {
    const { data: { session } } = await supa.auth.getSession();

    if (!session) {
    window.location.href = "./index.html";
    } else {
        window.location.href = "./home.html";
    }
}

checkAuth();