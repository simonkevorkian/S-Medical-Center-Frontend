window.onload = function () {
    let user = JSON.parse(localStorage.getItem("user"));
  
    // Assuming the elements do not have any unique IDs, we'll use querySelector to match the tag and the attribute. You might need to adjust these selectors according to your HTML structure.
    let name = document.querySelector(".profile-det-info h3");
    let username = document.querySelector(".profile-det-info h5");
    let address = document.querySelector(".patient-details h5:nth-child(1)");
    let phone = document.querySelector(".patient-details h5:nth-child(2)");
  
    if (user) {
        name.textContent = user.name;
        username.textContent = "username: " + user.username;
        address.innerHTML =
          '<i class="fas fa-envelope"></i> email: ' + user.email;
        
      }
  };
  

  // Listen for form submission
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    let user = JSON.parse(localStorage.getItem("user"));

    // Gather form values
    let oldPassword = document.querySelector('input[type="password"][placeholder="Old Password"]').value;
    let newPassword = document.querySelector('input[type="password"][placeholder="New Password"]').value;
    let confirmPassword = document.querySelector('input[type="password"][placeholder="Confirm Password"]').value;

    // Validation checks
    let warningMessage = document.getElementById('warningMessage');

    warningMessage.style.color = "red";
    if (!oldPassword || !newPassword || !confirmPassword) {
        warningMessage.textContent = "Please fill in all the fields.";
        return;
    }
    
    // Check if old password matches with the current password
    if (user.password !== oldPassword) {
        warningMessage.textContent = "Old password does not match.";
        return;
    }
    
    // Check if new password matches with the confirm password
    if (newPassword !== confirmPassword) {
        warningMessage.textContent = "New password and confirm password do not match.";
        return;
    }

    // Check if new password is less than 8 characters
    if (newPassword.length < 8) {
        warningMessage.textContent = "New password must be at least 8 characters.";
        return;
    }

    // Build user object
    let updatedUser = {
        ...user, // spread operator to copy current user data
        password: newPassword // only change password
    };

    // Make HTTP request
    try {
        let response = await fetch(`https://s-medical-center.onrender.com/users/${user.user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            // If the request was successful, update the user's information in localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));
            warningMessage.style.color = "red";
            warningMessage.textContent = "Password updated successfully.";
            setTimeout(function() { // waits 3 seconds then reloads the page
                location.reload();
            }, 3000);  
        } else {
            // Handle error response
        }
    } catch (error) {
        console.error('Error:', error);
        warningMessage.textContent = "An error occurred.";
    }
});
