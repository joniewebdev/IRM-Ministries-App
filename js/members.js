import { supabase } from "./supabaseClient.js";
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  window.location.href = "./index.html";
}

document.querySelector(".backBtn").addEventListener("click", () => {
    window.location.href = "./home.html";
});

// get members
const { data, error } = await supabase
  .from("person")
  .select(` *`)
  .order("first_name", {
    ascending: true
  });

if (error) console.error(error);

if (data && data.length > 0) {
  for (const member of data) {
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("member");
    memberDiv.innerHTML = `
      <div class="member-info">
        <div class="member-name">${member.first_name}${member.middle_name ? " " + member.middle_name[0] + "." : ""} ${member.last_name}${member.suffix ? " " + member.suffix : ""}</div>
        <div>${member.org_id ? member.org_id : "N/A"}</div>
      </div>
      <div class="member-edit">
        <button class="edit-button" onclick="window.location.href='./view-member.html?personId=${member.person_id}'">></button>
      </div>
    `;
    document.querySelector(".members-list").appendChild(memberDiv);
  }
}
else{
  const memberDiv = document.createElement("div");
    memberDiv.innerHTML = `No members found.`;
    document.querySelector(".members-list").appendChild(memberDiv);
}

document.querySelector(".loader").style.display = "none";

// add member button
document.querySelector(".add-member-btn").addEventListener("click", () => {
  window.location.href = "./add-member.html";
});