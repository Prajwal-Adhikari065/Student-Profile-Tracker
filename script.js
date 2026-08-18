const form = document.querySelector("#profileForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const profileData = Object.fromEntries(new FormData(form));

  try {
    const response = await fetch("http://localhost:3000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      console.log(`Error Occured, Status:  ${response.status}`);
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
studentsArray.forEach(student => {

        const row = document.createElement("tr");

      
        row.innerHTML = `
            <td>${student.username}</td>
            <td>${student.age}</td>
            <td>${student.fav_language}</td>
        `;

    
        studentTableBody.appendChild(row);
    });
}


window.addEventListener("DOMContentLoaded", loadStudentsData);

