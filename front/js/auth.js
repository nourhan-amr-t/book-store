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
  const name = document.getElementById("username-login").value;
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;

  // Send a POST request to the server
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  // Handle response
  if (response.ok) {
    // Redirect to a success page
    handleLoginStatusChange()
    alert("login sucsseful");
  } else {
    // Display an error message
    handleLoginStatusChange()
    alert("login failed");
  }
}
