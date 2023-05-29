// Parse the URL to get the doctorId parameter
const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get("doctorId");
var doctor_id;
let warningMessage = document.getElementById("warningMessage");
// Fetch the data for the specific doctor
fetch(`https://s-medical-center.onrender.com/doctors/${doctorId}`)
  .then((response) => response.json())
  .then((doctor) => {
    // Find the widget element
    const widget = document.querySelector(".booking-doc-info");
    let drid = doctor.user_id;
    // Populate the widget with the doctor's data
    widget.innerHTML = `
    <a href="doctor-profile.html" class="booking-doc-img">
    <img
      src="assets/img/doctors/doctor-01.jpg"
      alt="User Image"
    />
  </a>
  <div class="booking-info">
    <h4>
      <a href="doctor-profile.html?doctorId=${drid}">${doctor.name}</a>
    </h4>
    <p>
      Speciality: ${doctor.specialty}
    </p>
    <p class="text-muted mb-0">
      <i class="fas fa-map-marker-alt"></i> ${doctor.address}<br><br>
      <i class="fas fa-phone"></i> ${doctor.phone}
    </p>
  </div>
    `;
    doctor_id = doctor.id;
  });

let today = new Date().toISOString().split("T")[0];
document.getElementById("appointment-date").min = today;

let bookingButton = document.getElementById("booking-button");

document
  .getElementById("appointment-time")
  .addEventListener("input", function (e) {
    let inputTime = this.value;
    
    warningMessage.style.color = "red";

    if (inputTime < "09:00" || inputTime > "18:00") {
      warningMessage.textContent =
        "Please select a time between 9 AM and 6 PM.";
      bookingButton.disabled = true; // disable button
    } else {
      warningMessage.textContent = "";
      bookingButton.disabled = false; // enable button
    }
  });

bookingButton.addEventListener("click", async () => {
  //getpatientID
  let patient = JSON.parse(localStorage.getItem("user"));
  let patient_id = patient.id;



  
  // Get date and time from form inputs
  let appointmentDate = document.getElementById("appointment-date").value;
  let appointmentTime = document.getElementById("appointment-time").value;


  // Combine date and time into a single string
  let request_date = `${appointmentDate}T${document.getElementById("appointment-time").value}`;

  console.log(request_date);
  // Prepare data to be sent
  let requestData = {
    patient_id,
    doctor_id,
    request_date,
    status: "pending",
  };

  // Make HTTP request
  try {
    let response = await fetch("https://s-medical-center.onrender.com/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      // If the request was successful, show a success message
      warningMessage.style.color = "green";
      warningMessage.textContent = "Appointment requested successfully!";
    } else {
      // If there was an error, show it
      let errorMessage = await response.text();
      warningMessage.textContent = "Error: " + errorMessage;
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred.");
  }
});


console.log(document.getElementById("appointment-time").value);