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
  .select(`
    *, membership (*)
  `)
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
    document.getElementById("org-id").textContent = data.membership && data.membership.length > 0 ? data.membership[0].org_id : "N/A";
    const el = document.getElementById("effectivity-date");

    if (data.membership?.length) {
    const date = new Date(data.membership[0].effectivity_date);
    el.textContent = date.toISOString().split("T")[0];
    } else {
    el.textContent = "N/A";
    }
}

if (error) console.error(error);

document.querySelector(".buttons").innerHTML = `
    <button class="button" id="edit-button"
        onclick="window.location.href='./edit-member.html?personId=${memberId}'">
        Edit
    </button>
`;

// async function deleteMember(id) {
//     if (!confirm("Are you sure you want to delete this member?")) return;

//     const { error } = await supabase
//         .from("person")
//         .delete()
//         .eq("person_id", id);

//     if (error) {
//         console.error(error);
//         alert("Error deleting member.");
//         return;
//     }

//     alert("Member deleted successfully.");
//     window.location.href = "./members.html";
// }