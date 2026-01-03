import { supabase } from "./supabaseClient.js";

const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  window.location.href = "./index.html";
}

document.querySelector(".backBtn").addEventListener("click", () => {
    window.location.href = "./home.html";
});

const form = document.getElementById("signup-form");
const message = document.getElementById("message");

// Get users
const { data: persons, error: usersError } = await supabase
  .from("person")
  .select("*")
  .is("uuid", null);

document.getElementById("person-select").innerHTML += persons.map(person => `
  <option value="${person.person_id}">${person.first_name}${person.middle_name ? " " + person.middle_name[0] + "." : ""} ${person.last_name}${person.suffix ? " " + person.suffix : ""}</option>
`).join('');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    message.style.color = "red";
    return;
  }

  message.textContent = "Creating account...";
  message.style.color = "black";

  const { data: loginData, error: loginError } = await supabase.auth.signUp({
    email,
    password,
  });


  if (loginError) {
    message.textContent = loginError.message;
    message.style.color = "red";
  } else {
    message.textContent = "User created. He/she can now log in and access the app.";
    message.style.color = "green";
    
    document.getElementById("login-message").innerHTML = `
        <div class="success-checkmark">
            <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
            </div>
        </div>
    `;
    const selectedPersonId = document.getElementById("person-select").value;
    const { data: updatePerson, error: personError } = await supabase
    .from("person")
    .update({ uuid: loginData.user.id })
    .eq("person_id", selectedPersonId);

    form.reset();
    setTimeout(() =>
        {
            window.location.href = "home.html"
        }, 1500);
  }
});
