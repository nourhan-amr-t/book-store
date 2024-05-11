async function loadFeedBack() {
  // Make an AJAX request to fetch featured books
  fetch("/feedback/")
    .then((response) => response.json())
    .then((data) => {
      const feedbacks = data;
      const feedbacksection = document.querySelector(".reviews");

      // Create HTML elements for each book
      feedbacks.forEach((feedback) => {
        const feedbackHTML = `
      <div class="swiper-slide box">
                <h3>${feedback.content}</h3>
            </div>
      `;
        const swiperWrapper = document.querySelector("#swip");
        swiperWrapper.innerHTML += feedbackHTML;
      });
    })
    .catch((error) => console.error("Error fetching Feedback:", error));
}

async function updateAccountDetails() {
  const formData = new FormData(editProfileForm);
  // Send a request to the Node.js server to update the user name
  const response = await fetch("/users/update/name", {
    method: "PUT",
    body: formData,
  });
}

async function deleteAccount() {
  const response = await fetch("/users/delete", {
    method: "DELETE",
  });

  // Handle the response from the Node.js server
  if (response.ok) {
    // Redirect the user to the login page
    //  window.location.href = "/login";
  } else {
    // Handle the error
    // ...
  }
}

async function loadAccount() {
  fetch("/users/details", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (resp) => {
      let response = await resp.json();

      const userInfoHTML = `
      <div class="user-info">
        <h2>${response.name}</h2>
        <p><strong>Email:</strong> ${response.email}</p>
        <p><strong>Username:</strong> ${response.name}</p>
      </div>
    `;
      // edit needed here
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("user-profileee").style.display = "none";
    });
}

async function sendFeedback() {
  // Get form data
  const feedback = document.getElementById("feedback").value;

  // Send a POST request to the server
  const response = await fetch("/feedback/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: feedback }),
  });

  // Handle response
  if (response.ok) {
    // Redirect to a success page
    window.location.href = "/index.html";
  } else {
    // Display an error message
    alert("Your Feedback Failed, Try to write it later");
  }
}

/*async function showDeleteForm() {
  document.getElementById("delete-profile-block").style.display = "block";
}*/
async function showUpdateNameForm() {
  document.getElementById("edit-profile-block").style.display = "block";
}

async function handleLoginStatusChange() {
  if (await isLogged()) {
    document.getElementById("profileIconButton").style.display = "inline-block";
    document.getElementById("login-btn").style.display = "none";
    
  } else {

    document.getElementById("profileIconButton").style.display = "none";
    document.getElementById("login-btn").style.display = "inline-block";
  }
}

// should be called when doc is loaded
document.addEventListener("DOMContentLoaded", async () => {
  handleLoginStatusChange();
});
