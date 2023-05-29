window.onload = function () {
  let user = JSON.parse(localStorage.getItem("user"));

  // Assuming the elements do not have any unique IDs, we'll use querySelector to match the tag and the attribute. You might need to adjust these selectors according to your HTML structure.
  let username = document.querySelector(".profile-det-info h5");
  let address = document.querySelector(".patient-details h5:nth-child(1)");

  if (user) {
    username.textContent = "" + user.username;
    address.innerHTML =
      '<i class="fas fa-envelope"></i> ' + user.email;
    
  }
};

// First, get the user's current information from localStorage
let currentUser = JSON.parse(localStorage.getItem("user"));

// Function to update profile
window.updateProfile = async function (event) {
  event.preventDefault();

  // If currentUser is null, we should stop the function
  if (!currentUser) {
    console.error("No user found in local storage");
    return;
  }

  // Gather form values
  let name = document.querySelector('input[type="text"]').value;
  let email = document.querySelector('input[type="email"]').value;
  let username = document.querySelector(
    'input[type="text"][placeholder="Username"]'
  ).value;
  let phone = document.querySelector(
    'input[type="text"][placeholder="Mobile"]'
  ).value;
  let address = document.querySelector(
    'input[type="text"][placeholder="Address"]'
  ).value;

  // Validation checks
  let warningMessage = document.getElementById("warningMessage");
  warningMessage.style.color="red";
  if (!name || !username || !email || !address || !phone) {
    warningMessage.textContent = "Please fill in all the fields.";
    return;
  }
  // Check if username and password are less than 8 characters
  if (username.length < 8 || currentUser.password.length < 8) {
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

  // Build user object
  let updatedUser = {
    name,
    email,
    username,
    phone,
    address,
    password: currentUser.password,
    user_type: currentUser.user_type,
  };

  // Make HTTP request
  try {
    let response = await fetch(
      `http://localhost:3000/users/${currentUser.user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    if (response.ok) {
      // If the request was successful, update the user's information in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      warningMessage.textContent = "Profile updated successfully.";
      setTimeout(function() { // waits 3 seconds then executes the code inside
        location.reload();  // this will reload the page
    }, 1000); 
    } else {
      if (response.status === 400) {
        const errorRes = await response.text();
        // Username already exists
        warningMessage.innerHTML = errorRes;
      } else {
        // Handle other errors
      }
    }
  } catch (error) {
    console.error("Error:", error);
    warningMessage.textContent = "An error occurred.";
  }
};
