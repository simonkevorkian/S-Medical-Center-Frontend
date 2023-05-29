// Retrieve doctor data from localStorage
let doctor = JSON.parse(localStorage.getItem("user"));

// Update the profile information
document.querySelector(".profile-det-info h3").textContent = `${doctor.name}`;
document.querySelector(
  ".patient-details h5"
).textContent = `${doctor.specialty}`;

const userId = doctor.id;