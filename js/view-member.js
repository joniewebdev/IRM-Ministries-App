import { supabase } from "./supabaseClient.js";
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  window.location.href = "./index.html";
}

document.querySelector(".backBtn").addEventListener("click", () => {
    window.location.href = "./members.html";
});

const params = new URLSearchParams(window.location.search);
const memberId = params.get("personId");

const { data, error } = await supabase
  .from("person")
  .select(`*`)
  .eq("person_id", memberId)
  .order("first_name", {
    ascending: true
  })
  .single();

if (data) {
    document.getElementById("name").textContent = data.first_name + (data.middle_name ? " " + data.middle_name[0] + ". " : " ") + data.last_name + (data.suffix ? " " + data.suffix : "");
    document.getElementById("nickname").textContent = data.nickname ? data.nickname : "N/A";
    document.getElementById("gender").textContent = data.gender ? data.gender : "N/A";
    document.getElementById("birth-date").textContent = data.birth_date ? data.birth_date : "";
    document.getElementById("address").textContent = data.address ? data.address : "";
    document.getElementById("org-id").textContent = data.org_id ? data.org_id : "N/A";
    document.getElementById("year-joined").textContent = data.year_joined ? data.year_joined : "N/A";
    document.getElementById("status").textContent = data.status_id ? data.status_id : "N/A";
}

if (error) console.error(error);

async function deleteMember(id) {
    if (!confirm("Are you sure you want to delete this member?")) return;

    const { error } = await supabase
        .from("person")
        .delete()
        .eq("person_id", id);

    if (error) {
        console.error(error);
        alert("Error deleting member.");
        return;
    }

    alert("Member deleted successfully.");
    window.location.href = "./members.html";
}

document.querySelector(".buttons").innerHTML = `
    <button class="button" id="edit-button">Edit</button>
    <button class="button" id="delete-button">Delete</button>
`;

document.getElementById("edit-button").addEventListener("click", () => {
    window.location.href = `./add-member.html?personId=${memberId}`;
});

document.getElementById("delete-button").addEventListener("click", () => {
    deleteMember(memberId);
});