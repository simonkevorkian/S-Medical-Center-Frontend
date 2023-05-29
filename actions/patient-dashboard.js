window.onload = function () {
  let user = JSON.parse(localStorage.getItem("user"));

  // Assuming the elements do not have any unique IDs, we'll use querySelector to match the tag and the attribute. You might need to adjust these selectors according to your HTML structure.
  let name = document.querySelector(".profile-det-info h3");
  let username = document.querySelector(".profile-det-info h5");
  let address = document.querySelector(".patient-details h5:nth-child(1)");
  let phone = document.querySelector(".patient-details h5:nth-child(2)");

  if (user) {
    name.textContent = user.name;
    username.textContent = "" + user.username;
    
    phone.innerHTML = '<i class="fas fa-envelope"></i>  ' + user.email;
  }
};

// Get the patient ID from local storage or any other source
const user = JSON.parse(localStorage.getItem("user"));

const patientId = user.id;

// Make an HTTP GET request to the API endpoint to fetch all doctors
fetch("https://s-medical-center.onrender.com/doctors")
  .then((response) => response.json())
  .then((doctors) => {
    // Make an HTTP GET request to the API endpoint to fetch requests of the patient
    fetch(`https://s-medical-center.onrender.com/requests/patient/${patientId}`)
      .then((response) => response.json())
      .then((data) => {
        // Get the table body element
        const tableBody = document.querySelector(".reqT");

        // Loop through each request and populate the table
        data.forEach((request) => {
          // Find the doctor with the same ID as the request's doctor ID
          const doctor = doctors.find((doc) => doc.id === request.doctor_id);

          if (doctor) {
            // Create a new table row
            const row = document.createElement("tr");

            const [date, time] = request.request_date.split("T");

            row.innerHTML = `<td>
            <h2 class="table-avatar">
                <a href="#" class="avatar avatar-sm mr-2">
                    <img class="avatar-img rounded-circle" src="assets/img/doctors/doctor-01.jpg" alt="User Image">
                </a>
                <a href="#">${doctor.name} <span>${doctor.specialty}</span></a>
            </h2>
        </td>
        <td>${date} </td>
        
        <td><span class="d-block text-info">${time.slice(0, 5)}</span></td>
        <td><span class="badge badge-pill ">${request.status}</span></td>`;
            tableBody.appendChild(row);
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Make an HTTP GET request to the API endpoint to fetch all doctors
fetch("https://s-medical-center.onrender.com/doctors")
  .then((response) => response.json())
  .then((doctors) => {
    fetch(`https://s-medical-center.onrender.com/appointments/patient/${patientId}`)
      .then((response) => response.json())
      .then((data) => {
        // Get the table body element
        const tableBody = document.querySelector(".customApp");

        // Loop through each request and populate the table
        data.forEach((appointment) => {
          // Find the doctor with the same ID as the request's doctor ID
          const doctor = doctors.find((doc) => doc.id === appointment.doctor_id);

          if (doctor) {
            // Create a new table row
            const row = document.createElement("tr");

            row.innerHTML = `<td>
							<h2 class="table-avatar">
                            <a href="#" class="avatar avatar-sm mr-2">
                                <img class="avatar-img rounded-circle" src="assets/img/doctors/doctor-01.jpg" alt="User Image">
                            </a>
                            <a href="#">${doctor.name} <span>${doctor.specialty}</span></a>
                        </h2>
                    </td>
                    <td>${appointment.appointment_date.slice(0, 10)} </td>
                    
                    <td><span class="d-block text-info">${
                      appointment.appointment_time
                    }</span></td>
                         `;
            tableBody.appendChild(row);
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
