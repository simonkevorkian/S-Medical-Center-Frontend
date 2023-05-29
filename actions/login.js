// First, select the form and the input fields
let loginForm = document.querySelector("form");
let emailInput = document.querySelector('input[type="email"]');
let passwordInput = document.querySelector('input[type="password"]');
let warningMessage = document.getElementById("warningMessage");
warningMessage.style.color = "red";

// Then, add an event listener to the form submission
loginForm.addEventListener("submit", async (event) => {
  // Prevent the default form submission
  event.preventDefault();

  // Gather the user input
  let email = emailInput.value;
  let password = passwordInput.value;

  // Fetch all users
  try {
    let response = await fetch("https://s-medical-center.onrender.com/users");

    if (response.ok) {
      let users = await response.json();

      // Find the user with the provided email and password
      let user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        if (user.user_type === "doctor") {
          warningMessage.textContent = `You are logging in with a doctor account, please direct to doctor login.`;
        } else {
          // Fetch additional patient data
          let patientResponse = await fetch(
            `https://s-medical-center.onrender.com/patients/${user.id}`
          );

          if (patientResponse.ok) {
            let patientData = await patientResponse.json();

            // Merge user and patient data
            let fullUser = { ...user, ...patientData };

            // If the user is found, store user data in localStorage
            localStorage.setItem("user", JSON.stringify(fullUser));
            window.location.href = "https://simonkevorkian.github.io/S-Medical-Center-Frontend/main-page.html";
          } else {
            warningMessage.textContent =
              "Error retrieving additional user data.";
          }
        }
      } else {
        // If the user isn't found, show an error message
        warningMessage.textContent =
          "Invalid email or password. Please try again.";
      }
    } else {
      console.error(
        "Failed to fetch users:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
