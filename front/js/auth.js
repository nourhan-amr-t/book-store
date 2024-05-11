async function isLogged() {
  const response = await fetch("/auth/isLogged", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

async function handleSignUp() {
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Send a POST request to the server
  const response = await fetch("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  // Handle response
  if (response.ok) {
    // Redirect to a success page
    window.location.href = "/index.html";
  } else {
    // Display an error message
    alert("Sign up failed");
  }
}

async function handleSignIn() {
  // Get form data

  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;

  // Send a POST request to the server
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // Handle response
  if (response.ok) {
    // Redirect to a success page
    handleLoginStatusChange();
    alert("login sucsseful");
  } else {
    // Display an error message
    handleLoginStatusChange();
    alert("login failed");
  }
}

async function handleLoginStatusChange() {
  if (await isLogged()) {
    document.getElementById("profileIconButton").style.display = "inline-block";
    document.getElementById("login-btn").style.display = "none";

    document.querySelector(".login-form-container").classList.remove("active");
    document.querySelector(".signup-form-container").classList.remove("active");

    document.getElementById("username-update").value = await getAccountUsername();
  } else {
    document.getElementById("profileIconButton").style.display = "none";
    document.getElementById("login-btn").style.display = "inline-block";
  }
}

// should be called when doc is loaded
document.addEventListener("DOMContentLoaded", async () => {
  handleLoginStatusChange();
  loadFeedBack();
});
