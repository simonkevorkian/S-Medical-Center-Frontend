// Define the URL of your doctor data endpoint
const url = "http://localhost:3000/doctors";

window.onload = async function () {
  // Fetch the data
  const response = await fetch(url);

  // Convert the data to JSON
  const doctorsData = await response.json();

  // Get the parent element
  const parentElement = document.querySelector(".custom-dr");

  // Loop over the data and create the widgets
  doctorsData.forEach((doctor) => {
    // Create a new doctor widget
    const widget = document.createElement("div");
    widget.className = "card";

    const widgetBody = document.createElement("div");
    widgetBody.className = "card-body";

    const widgetContent = document.createElement("div");
    widgetContent.className = "doctor-widget";
    let drid = doctor.user_id;

    // Fill the div with the doctor's data
    widgetContent.innerHTML = `<div class="doc-info-left">
      <div class="doctor-img">
        <a href="doctor-profile.html">
          <img
            src="assets/img/doctors/doctor-01.jpg"
            class="img-fluid"
            alt="User Image"
          />
        </a>
      </div>
      <div class="doc-info-cont">
        <h4 class="doc-name">
          <a href="doctor-profile.html">${doctor.name}</a>
        </h4>
        
        <h5 class="doc-department">
          ${doctor.specialty}
        </h5>

        <div class="clinic-details">
          <p class="doc-location">
            <i class="fas fa-map-marker-alt"></i> ${doctor.address}<br> <br>
            <i class="fas fa-phone"></i> ${doctor.phone}
          </p>
          
          
        </div>
        
      </div>
    </div>
    <div class="doc-info-right">
      <div class="clini-infos">
        <ul>
          <li>
            <i class="fas fa-map-marker-alt"></i> ${doctor.address}
          </li>
        </ul>
      </div>
      <div class="clinic-booking">
      <a class="view-pro-btn cutom-btn" href="doctor-profile.html?doctorId=${drid}">View Profile</a>
        <a class="apt-btn" href="booking.html?doctorId=${drid}"
          >Book Appointment</a
        >
      </div>
    </div>
      `;

    //... follow this same pattern to create and append the rest of the child elements

    widgetBody.appendChild(widgetContent);
    widget.appendChild(widgetBody);

    // Append the widget to the parent element
    parentElement.appendChild(widget);
  });
};

//////////////////////////////////////////////////////////////// search functionality/////////////////////////////////////////////////////////////////////
// Get the search input and the search button
const searchInput = document.querySelector(".form-control");
const searchButton = document.querySelector(".search-btn");

// Add event listener to the search button
searchButton.addEventListener("click", async (e) => {
  e.preventDefault(); // To prevent form submission

  // Get the search term
  const searchTerm = searchInput.value.toLowerCase();

  // Fetch the data
  const response = await fetch("http://localhost:3000/doctors");
  const doctorsData = await response.json();

  // Filter the data
  const filteredData = doctorsData.filter((doctor) => {
    // Convert all attributes to strings to enable search

    const name = doctor.name.toLowerCase();
    const address = doctor.address.toLowerCase();
    const phone = doctor.phone.toLowerCase();
    const specialty = doctor.specialty.toLowerCase();

    // If the search term exists in any of the attributes, return the doctor
    return (
      name.includes(searchTerm) ||
      address.includes(searchTerm) ||
      phone.includes(searchTerm) ||
      specialty.includes(searchTerm)
    );
  });

  // Clear the slick slide
  const parentElement = document.querySelector(".custom-dr");
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }

  // Now use the filteredData to create and display the doctor widgets
  filteredData.forEach((doctor) => {
    // Create a new doctor widget
    const widget = document.createElement("div");
    widget.className = "card";

    const widgetBody = document.createElement("div");
    widgetBody.className = "card-body";

    const widgetContent = document.createElement("div");
    widgetContent.className = "doctor-widget";
    let drid = doctor.user_id;

    // Fill the div with the doctor's data
    widgetContent.innerHTML = `
      <div class="doc-info-left">
        <div class="doctor-img">
          <a href="doctor-profile.html">
            <img src="assets/img/doctors/doctor-01.jpg" class="img-fluid" alt="User Image"/>
          </a>
        </div>
        <div class="doc-info-cont">
          <h4 class="doc-name">
            <a href="doctor-profile.html">${doctor.name}</a>
          </h4>
          <h5 class="doc-department">${doctor.specialty}</h5>
          <div class="clinic-details">
            <p class="doc-location">
              <i class="fas fa-map-marker-alt"></i> ${doctor.address}<br><br>
              <i class="fas fa-phone"></i> ${doctor.phone}
            </p>
          </div>
        </div>
      </div>
      <div class="doc-info-right">
        <div class="clini-infos">
          <ul>
            <li><i class="fas fa-map-marker-alt"></i> ${doctor.address}</li>
          </ul>
        </div>
        <div class="clinic-booking">
        <a class="view-pro-btn cutom-btn" href="doctor-profile.html?doctorId=${drid}">View Profile</a>
        <a class="apt-btn" href="booking.html?doctorId=${drid}"
        >Book Appointment</a
      >        </div>
      </div>
    `;

    widgetBody.appendChild(widgetContent);
    widget.appendChild(widgetBody);

    // Append the widget to the parent element
    parentElement.appendChild(widget);
  });
});
