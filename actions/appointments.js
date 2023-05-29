// Retrieve doctor data from localStorage
let doctor = JSON.parse(localStorage.getItem("user"));

// Update the profile information
document.querySelector(".profile-det-info h3").textContent = `${doctor.name}`;
document.querySelector(
  ".patient-details h5"
).textContent = `${doctor.specialty}`;

const userId = doctor.id;

// Make an HTTP GET request to the API endpoint
fetch(`http://localhost:3000/appointments/doctor/${userId}`)
  .then((response) => response.json())
  .then((data) => {
    // Get the appointment list container element
    const appointmentList = document.querySelector(".appointments");

    const currentTime = new Date();

    // Loop through each appointment and populate the list
    data.forEach((appointment) => {
      // Create the main appointment container
      const appointmentContainer = document.createElement("div");
      appointmentContainer.classList.add("appointment-list");
      var [date, time] = appointment.appointment_date.split("T");
      time = appointment.appointment_time;
      let patientID = appointment.patient_id;

      const appointmentDateTime = new Date(`${date} ${time}`);

      // Check if the appointment is after the current time
      fetch(`http://localhost:3000/patients/${patientID}`)
        .then((response) => response.json())
        .then((user) => {
          appointmentContainer.innerHTML = `<div class="profile-info-widget">
      <a href="#" class="booking-doc-img">
        <img
          src="assets/img/patients/patient.jpg"
          alt="User Image"
        />
      </a>
      <div class="profile-det-info">
        <h3><a href="#">${user.username}</a></h3>
        <div class="patient-details">
          <h5>
            <i class="far fa-clock"></i> ${date}, ${time.slice(0, 5)}
          </h5>
          
          <h5 class="mb-0">
            <i class="fas fa-envelope"></i> ${user.email}
          </h5>

        </div>
      </div>
    </div>
    `;

          const deleteButton = document.getElementById("deleteButton");

          deleteButton.addEventListener("click", () => {
            deleteRequest(appointment.id);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Append the appointment container to the appointment list
      appointmentList.appendChild(appointmentContainer);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function deleteRequest(appointmentId) {
  // Make an HTTP DELETE request to the API endpoint
  fetch(`http://localhost:3000/appointments/${appointmentId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the success response or perform any additional actions
      console.log("Appointment deleted successfully:", data);
      location.reload();
    })
    .catch((error) => {
      // Handle the error response or perform any error handling
      console.error("Error deleting appointment:", error);
      location.reload();
    });
}
