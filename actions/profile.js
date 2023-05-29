// Parse the URL to get the doctorId parameter
const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get('doctorId');

// Fetch the data for the specific doctor
fetch(`https://s-medical-center.onrender.com/doctors/${doctorId}`)
  .then(response => response.json())
  .then(doctor => {
    // Find the widget element
    const widget = document.querySelector('.doctor-widget');
    let drid = doctor.user_id;
    // Populate the widget with the doctor's data
    widget.innerHTML = `
      <div class="doc-info-left">
        <div class="doctor-img">
          <img src="https://github.com/simonkevorkian/S-Medical-Center-Frontend/blob/main/assets/img/doctors/doctor-01.png?raw=true" class="img-fluid" alt="User Image">
        </div>
        <div class="doc-info-cont">
          <h4 class="doc-name">${doctor.name}</h4>
          <p class="doc-speciality">${doctor.specialty}</p>
          <div class="clinic-details">
            <p class="doc-location">
              <i class="fas fa-map-marker-alt"></i> ${doctor.address}<br><br>
              <i class="fas fa-phone"></i> ${doctor.phone}
            </p>
          </div>
        </div>
      </div>
      <div class="doc-info-right">
        <div class="clinic-booking">
          <a class="apt-btn" href="booking.html?doctorId=${doctorId}">Book Appointment</a>
        </div>
      </div>
    `;
  });
