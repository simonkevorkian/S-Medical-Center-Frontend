// Parse the URL to get the doctorId parameter
const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get("doctorId");

// Fetch the data for the specific doctor
fetch(`https://s-medical-center.onrender.com/doctors/${doctorId}`)
  .then((response) => response.json())
  .then((doctor) => {
    // Find the widget element
    const widget = document.querySelector(".doctor-widget");
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

let currentUser = JSON.parse(localStorage.getItem("user"));
let user_id = currentUser.id;

const chatList = document.querySelector(".chat-list");
fetch(`https://s-medical-center.onrender.com/messages/${user_id}/${doctorId}`)
  .then((response) => response.json())
  .then((messages) => {
    messages.forEach((message) => {
      if (message.fromid === user_id) {
        var newMessage = document.createElement("div");
        newMessage.classList = "p-m";
        newMessage.innerHTML = `
        <div class="custom-chat p-chat">
        ${message.message}
      </div>

      <div>
        ${message.date.slice(11, 16)}
      </div>
      `;
        chatList.appendChild(newMessage);
      } else {
        var newMessage = document.createElement("div");
        newMessage.classList = "d-m";
        newMessage.innerHTML = `
        <div class="custom-chat d-chat">
        ${message.message}
      </div>

      <div>
        ${message.date.slice(11, 16)}
      </div>
      `;
        chatList.appendChild(newMessage);
      }
    });
    chatList.scrollTop = chatList.scrollHeight - chatList.clientHeight;

  })
  .catch((error) => console.error("Error:", error));

var inputMessage = document.querySelector(".input-message");
var sendButton = document.querySelector(".p-chat");

sendButton.addEventListener("click", function () {
  var messageText = inputMessage.value;
  var now = new Date();
  var hours = String(now.getHours()).padStart(2, "0");
  var minutes = String(now.getMinutes()).padStart(2, "0");

  if (messageText.trim() === "") {
    // Warn that the message is empty
    alert("Message cannot be empty");
  } else {
    // Append the message to the chat list
    var newMessage = document.createElement("div");
    newMessage.classList = "p-m";
    newMessage.innerHTML = `
    <div class="custom-chat p-chat">
    ${messageText}
  </div>

  <div>
    ${hours + ":" + minutes}
  </div>
  `;
    chatList.appendChild(newMessage);

    // Clear the input field
    inputMessage.value = "";

    // Message data
    var messageData = {
      fromID: user_id,
      toID: doctorId,
      message: messageText,
    };

    fetch("https://s-medical-center.onrender.com/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
