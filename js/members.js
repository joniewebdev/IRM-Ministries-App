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
  .select(`
    *, membership (*)
  `)
  .order("first_name", {
    ascending: true
  })
  .limit(1, { foreignTable: "membership" });

if (error) console.error(error);

if (data && data.length > 0) {
  for (const member of data) {
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("member");
    memberDiv.innerHTML = `
      <div class="member-info">
        <div class="member-name">${member.first_name}${member.middle_name ? " " + member.middle_name[0] + "." : ""} ${member.last_name}${member.suffix ? " " + member.suffix : ""}</div>
        <div>${member.membership ? member.membership[0].org_id : "N/A"}</div>
      </div>
      <div class="member-edit">
        <button class="edit-button" href="">></button>
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

// add member button
document.querySelector(".add-member-btn").addEventListener("click", () => {
  window.location.href = "./add-member.html";
});