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
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  
  loginUser(user, pass);
});

async function loginUser(username, password) {
    var { data, error } = await supa
        .from("user_login")
        .select("*")
        .eq("user_login_id", username)
        .eq("password", password);
    if (error) {
        document.getElementById("login-message").innerText = "Login failed: " + error.message;
        return;
    }
    if(data.length === 0) {
        document.getElementById("login-message").innerText = "Invalid username or password.";
        return;
    }
    let person_id = data[0].person_id;
    var { data, error } = await supa
        .from("person")
        .select("*")
        .eq("person_id", person_id)
        .single();
    document.getElementById("login-message").innerText = "Login successful. Welcome, " + data.first_name + "!";
}
async function getPersons() {
    let { data, error } = await supa.from("person").select("*");
    if (error) {
        document.getElementById("persons").innerText = "Error: " + error.message;
        return;
    }
    if (data.length === 0) {
        document.getElementById("persons").innerText = "No students found.";
        return;
    }
    
    data.forEach(person => {
        document.getElementById("persons").innerHTML += `
            <div class="card">
                <h2>${person.first_name} ${person.middle_name[0]}. ${person.last_name} ${person.suffix !== null ? person.suffix : ''}</h2>
                <p>Address: ${person.address}</p>
                <p>Birthday: ${person.birth_date}</p>
            </div>
        `;
    });
}