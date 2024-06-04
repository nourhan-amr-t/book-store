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
  const response = await fetch("/users/update/name", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: document.getElementById("username-update").value }),
  });
  if (response.ok) {
    closeUpdateNameForm();
    handleLoginStatusChange();
  }
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

async function getAccountUsername() {
  let resp = await fetch("/users/details", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let response = await resp.json();

  return response.name;
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

async function showUpdateNameForm() {
  document.getElementById("edit-profile-block").style.display = "block";
}

async function closeUpdateNameForm() {
  document.querySelector(".user-profile-container").classList.remove("active");
  document.getElementById("edit-profile-block").style.display = "none";
}
