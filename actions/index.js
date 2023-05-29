async function loadDoctors() {
  try {
    // Fetch the doctors from your server
    let response = await fetch("http://localhost:3000/doctors"); // Replace with your actual endpoint

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let doctors = await response.json();

    // Get the parent element that you want to append the doctor widgets to
    let specificDiv = document.querySelector(".profile-widget");
    let parentDiv = specificDiv.parentElement;
    parentDiv.style.display = 'flex';
    parentDiv.style.flexDirection = 'row';
    parentDiv.style.flexWrap = 'wrap';
    specificDiv.remove();
    // Loop over the doctors
    for (let doctor of doctors) {
      // Create a new div for this doctor
      let div = document.createElement("div");
      div.className = "profile-widget";
        let drid = doctor.user_id;
      // Fill the div with the doctor's data
      div.innerHTML = `
      <div class="doc-img">
      <a href="doctor-profile.html">
        <img
          class="img-fluid"
          alt="User Image"
          src="assets/img/doctors/doctor-01.jpg"
        />
      </a>
    </div>
    <div class="pro-content">
      <h3 class="title">
      <a href="doctor-profile.html">${doctor.name}</a>
      <i class="fas fa-check-circle verified"></i>
      </h3>
      <p class="speciality">${doctor.specialty}</p>
      <ul class="available-info">
        <li><i class="fas fa-map-marker-alt"></i> ${doctor.address}</li>
        <li>
          <i class="far fa-clock"></i> ${doctor.phone}
        </li>
      </ul>
      <div class="row row-sm">
        <div class="col-6">
          <a href="doctor-profile.html?doctorId=${drid}" class="btn view-btn"
            >View Profile</a
          >
        </div>
        <div class="col-6">
          <a href="booking.html?doctorId=${drid}" class="btn book-btn">Book Now</a>
        </div>
      </div>
    </div>
      `;

      div.style.margin = '10px';
      div.style.width = '250px';

      // Append the div to the container
      parentDiv.appendChild(div);
      
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the function
loadDoctors();
