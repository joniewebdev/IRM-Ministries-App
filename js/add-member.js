import { supabase } from "./supabaseClient.js";
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  window.location.href = "./index.html";
}

document.querySelector(".backBtn").addEventListener("click", () => {
    window.location.href = "./members.html";
});

const currentYear = new Date().getFullYear();
const yearDropdown = document.getElementById("year-joined");

for (let year = currentYear; year >= currentYear - 40; year--) {  
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearDropdown.appendChild(option);
}

const { data:orgs, error } = await supabase
  .from("organization_unit")
  .select("*")
  .order("description", {ascending: true});

if (error) console.error(error);

if (orgs && orgs.length > 0) {
  for (const org of orgs) {
    const orgDiv = document.createElement("option");
    orgDiv.value = org.id;
    orgDiv.textContent = `${org.description}`;
    document.getElementById("org-id").appendChild(orgDiv);
  }
}

const emptyToNull = (value) =>
  value === "" || value === undefined ? null : value;

document.getElementById("add-member-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let first_name = document.getElementById("first-name").value;
    let middle_name = document.getElementById("middle-name").value;
    let last_name = document.getElementById("last-name").value;
    let nickname = document.getElementById("nickname").value;
    let suffix = document.getElementById("suffix").value;
    let gender = document.getElementById("gender").value;
    let birth_date = document.getElementById("birth-date").value;
    let address = document.getElementById("address").value;
    let org_id = document.getElementById("org-id").value;
    let year_joined = document.getElementById("year-joined").value;
    let is_member = document.getElementById("is-member").checked ? 'N' : 'Y';
    let status = document.getElementById("status").value;


    const { data, error } = await supabase
    .from("person")
    .insert([
        {
        first_name,
        middle_name: emptyToNull(middle_name),
        last_name,
        nickname: emptyToNull(nickname),
        suffix: emptyToNull(suffix),
        gender: emptyToNull(gender),
        birth_date: emptyToNull(birth_date),
        address: emptyToNull(address),
        org_id: emptyToNull(org_id),
        year_joined: emptyToNull(year_joined),
        is_member: is_member,
        status_id: status
        }
    ]);

    if (error) {
    console.error(error);
    } else {
          window.location.href = "./members.html";
        }
});