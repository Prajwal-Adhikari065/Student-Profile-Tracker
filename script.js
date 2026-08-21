const form = document.querySelector("#profileForm");

let isEditing = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelector("#username").disabled = false;
  const profileData = Object.fromEntries(new FormData(form));
      
     const url = isEditing
    ? `http://localhost:3000/profile/${profileData.username}`
    : "http://localhost:3000/profile";
  
const method = isEditing ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      form.reset();
      isEditing = false;
      form.querySelector("button[type='submit']").textContent = "Send Profile";
      loadStudentsData();
    }
  } catch (error) {
    console.error("Error Occured:", error);
  }
});

const refreshBtn = document.querySelector("#refreshBtn");

async function loadStudentsData() {
  try {
    const response = await fetch("http://localhost:3000/profile");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayStudents(data);
  } catch (error) {
    console.error("Error loading students:", error);
  }
}

refreshBtn.addEventListener("click", loadStudentsData);

const studentTableBody = document.querySelector("#studentTable");

function displayStudents(studentsArray) {
  studentTableBody.innerHTML = "";
  studentsArray.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${student.username}</td>
            <td>${student.age}</td>
            <td>${student.fav_language}</td>
            <td>
              <button type="button" class="btn-delete" data-username="${student.username}">
              <span class="material-symbols-outlined updit">delete</span>
             </button>
            </td>
           <td>
             <button type="button" class="btn-edit" data-username="${student.username}">
               <span class="material-symbols-outlined updit">edit</span>
             </button>
            </td>
        `;
        row.querySelector(".btn-edit").addEventListener("click", () => {
  const usernameInput = document.querySelector("#username");

 
  form.username.value = student.username;
  form.age.value = student.age;
  form.fav_language.value = student.fav_language;


  usernameInput.disabled = true;
  form.querySelector("button[type='submit']").textContent = "Update Profile";
  isEditing = true;
});
              
        const deleteBtn = row.querySelector(".btn-delete");
    deleteBtn.addEventListener("click", () => deleteStudent(student.username));

            

    studentTableBody.appendChild(row);
  });
}

async function deleteStudent(username) {
  if (!confirm(`Are you sure you want to delete ${username}?`)) return;

  try {
    const response = await fetch(`http://localhost:3000/profile/${username}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadStudentsData();
    } else {
      console.error(`Delete failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting student:", error);
  }
}


window.addEventListener("DOMContentLoaded", loadStudentsData);
