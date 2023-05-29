function addUser() {
  // Get form values
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const address = document.querySelector('input[name="address"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  const username = document.querySelector('input[name="username"]').value;

  const warningMessage = document.getElementById("warningMessage");
  warningMessage.style.fontSize = '1em';
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
    !phone
  ) {
    warningMessage.textContent = "Please fill in all the fields.";
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

  // Create a JSON payload
  const payload = {
    name: name,
    email: email,
    password: password,
    username: username,
    user_type: "patient",
    address: address,
    phone: phone,
  };

  // Make a POST request to addUser endpoint using the payload
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(payload));
        window.location.href = "http://127.0.0.1:5500/index.htmlindex.html";

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
      // console.log(`User added with ID: ${data.id}`);
      // Redirect to the home page
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
}
