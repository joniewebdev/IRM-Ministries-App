import { supabase } from "./supabaseClient.js";
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  window.location.href = "./index.html";
}

document.querySelector(".backBtn").addEventListener("click", () => {
    window.location.href = "./members.html";
});

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

document.getElementById("effectivity-date").valueAsDate = new Date();

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
    let effectivity_date = document.getElementById("effectivity-date").value;

    const { data, error } = await supabase
    .from("person")
    .insert([
        {
        first_name,
        last_name,
        nickname: emptyToNull(nickname),
        middle_name: emptyToNull(middle_name),
        suffix: emptyToNull(suffix),
        gender: emptyToNull(gender),
        birth_date,
        address
        }
    ])
    .select("person_id")
    .single();

    if (error) {
    console.error(error);
    } else {
        const person_id = data.person_id;
        const { data: membershipData, error: membershipError } = await supabase
        .from("membership")
        .insert([
            {
            person_id,
            org_id,
            effectivity_date
            }
        ]);   
        if (membershipError) {
            console.error(membershipError);
        } else {
            window.location.href = "./members.html";
        }
    }   
});