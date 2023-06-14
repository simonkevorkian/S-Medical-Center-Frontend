// Retrieve doctor data from localStorage
let doctor = JSON.parse(localStorage.getItem("user"));

// Update the profile information
document.querySelector(".profile-det-info h3").textContent = `${doctor.name}`;
document.querySelector(
  ".patient-details h5"
).textContent = `${doctor.specialty}`;

// Retrieve the user ID from local storage
const userId = doctor.id;

// Make an HTTP GET request to the API endpoint
fetch(`https://s-medical-center.onrender.com/requests/doctor/${userId}`)
  .then((response) => response.json())
  .then((data) => {
    // Create a Set to store unique patient IDs
    const uniquePatients = new Set();

    // Iterate over the appointments and add unique patient IDs to the Set
    data.forEach((appointment) => {
      const patientId = appointment.patient_id;
      uniquePatients.add(patientId);
    });

    // Get the count of unique patients
    const numberOfPatients = uniquePatients.size;

    // Update the HTML element with the number of patients
    const totalPatientElement = document.querySelector(
      ".dash-widget.dct-border-rht .dash-widget-info h3"
    );
    totalPatientElement.textContent = numberOfPatients;

    // Filter the requests with status equal to "pending"
    const pendingRequests = data.filter(
      (request) => request.status === "pending"
    );

    // Get the count of pending requests
    const numberOfPendingRequests = pendingRequests.length;

    // Update the HTML element with the number of pending requests
    const totalRequestsElement = document.querySelector(
      ".dash-widget.dct-border-rht .dash-widget-info.req h3"
    );
    totalRequestsElement.textContent = numberOfPendingRequests;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Make an HTTP GET request to the API endpoint
fetch(`https://s-medical-center.onrender.com/appointments/doctor/${userId}`)
  .then((response) => response.json())
  .then((data) => {
    // Get the count of appointments
    const numberOfAppointments = data.length;

    // Update the HTML element with the number of appointments
    const totalAppointmentsElement = document.querySelector(
      ".dash-widget-info.app h3"
    );
    totalAppointmentsElement.textContent = numberOfAppointments;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

var patient_email;
// Make an HTTP GET request to the API endpoint
fetch(`https://s-medical-center.onrender.com/requests/doctor/${userId}`)
  .then((response) => response.json())
  .then((data) => {
    // Get the table body element
    const tableBody = document.querySelector("tbody");

    // Loop through each request and populate the table
    data.forEach(async (request) => {
      if (request.status === "pending") {
        // Get the user ID from the request
        const patientId = request.patient_id;

        // Fetch the user's name from the users table
        fetch(`https://s-medical-center.onrender.com/patients/${patientId}`)
          .then((response) => response.json())
          .then((user) => {
            // Create a new table row
            const row = document.createElement("tr");

            // Create table cells and populate them with data
            const nameCell = document.createElement("td");
            // const nameImg = '<a href="#" class="avatar avatar-sm mr-2"></a>';
            const nameImg = document.createElement("a");
            nameImg.href = `#`;
            nameImg.className = "avatar avatar-sm mr-2";
            nameImg.innerHTML =
              '<img class="avatar-img rounded-circle" src="assets/img/patients/patient.jpg" alt="User Image">';
            nameCell.appendChild(nameImg);

            const nameLink = document.createElement("a");
            nameLink.href = "#";
            nameLink.textContent = ` ${user.username}`;
            patient_email = user.email;
            nameCell.appendChild(nameLink);
            row.appendChild(nameCell);

            const phoneCell = document.createElement("td");
            phoneCell.textContent = ` ${user.email}`;
            row.appendChild(phoneCell);

            const dateCell = document.createElement("td");
            var [date, time] = request.request_date.split("T");
            dateCell.textContent = date;
            row.appendChild(dateCell);

            const timeCell = document.createElement("td");
            const timeSpan = document.createElement("span");
            timeSpan.classList.add("d-block", "text-info");
            time = time.slice(0, 5);
            timeSpan.textContent = time;
            timeCell.appendChild(timeSpan);
            row.appendChild(timeCell);

            const actionsCell = document.createElement("td");

            // Create the Accept button
            const acceptButton = document.createElement("button");
            acceptButton.type = "button";
            acceptButton.classList.add(
              "btn",
              "btn-rounded",
              "btn-primary",
              "m-3"
            );
            acceptButton.textContent = "Accept";

            // Add event listener to accept the request
            acceptButton.addEventListener("click", () => {
              acceptRequest(request.id, date, time);
            });

            actionsCell.appendChild(acceptButton);

            // Create the Delete button
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList.add("btn", "btn-rounded", "btn-danger");
            deleteButton.textContent = "Delete";

            // Add event listener to delete the request
            deleteButton.addEventListener("click", () => {
              deleteRequest(request.id);
            });

            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);

            // Append the row to the table body
            tableBody.appendChild(row);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Function to delete a request by its ID
const deleteRequest = (requestId) => {
  var params = {
    to_name: patient_email,
    doctor_name: doctor.name,
    status: "rejected",
  };

  const serviceID = "service_tukqhvw";
  const templateID = "template_hfof4hg";

  emailjs.send(serviceID, templateID, params)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  // Fetch the request details
  fetch(`https://s-medical-center.onrender.com/requests/${requestId}`)
    .then((response) => response.json())
    .then((request) => {
      // Update the status to "rejected"
      request.status = "rejected";

      // Make a PUT request to update the request status
      fetch(`https://s-medical-center.onrender.com/requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((updatedRequest) => {
          // Perform any desired actions with the updated request
          console.log("Request rejected:", updatedRequest);
          location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Function to accept a request and create a new appointment
const acceptRequest = (requestId, date, time) => {
  var params = {
    to_name: patient_email,
    doctor_name: doctor.name,
    status: "accepted",
  };

  const serviceID = "service_tukqhvw";
  const templateID = "template_hfof4hg";

  emailjs.send(serviceID, templateID, params)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  // Make an HTTP GET request to fetch the request details
  fetch(`https://s-medical-center.onrender.com/requests/${requestId}`)
    .then((response) => response.json())
    .then((request) => {
      // Update the request status to "scheduled"
      request.status = "scheduled";

      // Make an HTTP PUT request to update the request
      fetch(`https://s-medical-center.onrender.com/requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((data) => {
          // Create a new appointment using the updated request details
          createAppointment(data, date, time);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Function to create a new appointment
const createAppointment = (request, date, time) => {
  // Make an HTTP POST request to create a new appointment
  fetch("https://s-medical-center.onrender.com/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      doctor_id: request.doctor_id,
      patient_id: request.patient_id,
      appointment_date: date,
      appointment_time: time,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the created appointment as needed
      console.log("New appointment created:", data);
      // location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
