// Parse the URL to get the doctorId parameter
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get("doctorId");
const user_name = urlParams.get("patientname");
document.querySelector(".profile-det-info h3").textContent = `${user_name}`;

let currentUser = JSON.parse(localStorage.getItem("user"));
let doctorId = currentUser.user_id;

const chatList = document.querySelector(".chat-list");
fetch(`https://s-medical-center.onrender.com/messages/${user_id}/${doctorId}`)
  .then((response) => response.json())
  .then((messages) => {
    messages.forEach((message) => {
      if (message.fromid === doctorId) {
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
      fromID: doctorId,
      toID: user_id,
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
