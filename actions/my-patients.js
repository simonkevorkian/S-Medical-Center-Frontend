// Retrieve doctor data from localStorage
let doctor = JSON.parse(localStorage.getItem("user"));

// Update the profile information
document.querySelector(".profile-det-info h3").textContent = `${doctor.name}`;
document.querySelector(
  ".patient-details h5"
).textContent = `${doctor.specialty}`;

const userId = doctor.id;

// Make an HTTP GET request to the API endpoint
fetch(`https://s-medical-center.onrender.com/requests/doctor/${userId}`)
  .then((response) => response.json())
  .then((data) => {
    // Get the appointment list container element
    const appointmentList = document.querySelector(".customP");

    // Maintain a record of patients already shown
    const shownPatients = new Set();

    // Loop through each appointment and populate the list
    data.forEach((appointment) => {
      // Check if the patient has already been shown
      

      // Create the main appointment container
      const appointmentContainer = document.createElement("div");
      appointmentContainer.classList.add("col-md-6", "col-lg-4", "col-xl-3");
      let patientID = appointment.patient_id;

      fetch(`https://s-medical-center.onrender.com/patients/${patientID}`)
        .then((response) => response.json())
        .then((user) => {
          if (shownPatients.has(user.username)) {
            return; // Skip this appointment if patient already shown
          }
          // Add patient to the shown patients record
          shownPatients.add(user.username);

          // Populate the appointment container with patient information
          appointmentContainer.innerHTML = `
            <div class="card widget-profile pat-widget-profile">
              <div class="card-body">
                <div class="pro-widget-content">
                  <div class="profile-info-widget">
                    <a href="#" class="booking-doc-img">
                      <img src="assets/img/patients/patient.jpg" alt="User Image" />
                    </a>
                    <div class="profile-det-info">
                      <h3>
                        <a href="#">${user.username}</a>
                      </h3>
                      <div class="patient-details"></div>
                    </div>
                  </div>
                </div>
                <div class="patient-info">
                  <ul>
                    <li>Email <span>${user.email}</span></li>
                  </ul>
                </div>
              </div>
            </div>
          `;

          // Append the appointment container to the appointment list
          appointmentList.appendChild(appointmentContainer);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
