function addUser() {
  // Get form values
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const address = document.querySelector('input[name="address"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  const username = document.querySelector('input[name="username"]').value;
  const speciality = document.getElementById('speciality').value;
  const calendly = document.querySelector('input[name="calendly"]').value;

  const warningMessage = document.getElementById("warningMessage");
  warningMessage.style.fontSize = "1em";
  warningMessage.style.color = "red";

  // Clear previous warning messages
  warningMessage.textContent = "";

  // Check if any field is empty
  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !address ||
    !phone ||
    !speciality
  ) {
    warningMessage.textContent = "Please fill in all the required fields.";
    return;
  }

  // Check if username and password are less than 8 characters
  if (username.length < 8 || password.length < 8) {
    warningMessage.textContent =
      "Username and password must be at least 8 characters.";
    return;
  }

  // Check if phone number contains only numbers
  const phoneRegex = /^\d+$/;
  if (!phoneRegex.test(phone)) {
    warningMessage.textContent = "Phone number must contain only numbers.";
    return;
  }

  if (calendly !== "") {
    // Check if the link is from calendly.com
    const calendlyRegex = /^https?:\/\/(?:www\.)?calendly\.com\/\S+$/;
    if (!calendlyRegex.test(calendly)) {
      warningMessage.textContent =
        "Invalid Calendly link. Please provide a valid link from Calendly.";
      return;
    }
  }

  // Create a JSON payload
  const payload = {
    name: name,
    email: email,
    password: password,
    username: username,
    user_type: "doctor",
    address: address,
    phone: phone,
    specialty: speciality,
    calendly: calendly,
  };

  // Make a POST request to addUser endpoint using the payload
  fetch("https://s-medical-center.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(payload));
        window.location.href =
          "https://simonkevorkian.github.io/S-Medical-Center-Frontend/login-doctor.html";

        return response.json();
      } else {
        if (response.status === 409) {
          const errorRes = await response.text();
          // Username already exists
          warningMessage.innerHTML = errorRes;
        } else {
          // Handle other errors
        }
      }
    })
    .then((data) => {
      // Handle successful response
      console.log(`User added with ID: ${data.id}`);
      // Redirect to the home page
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
}
