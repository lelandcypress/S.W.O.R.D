const loginFormHandler = async (event) => {
  event.preventDefault();

  // get values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();


  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();


  // get values from the signup modal
  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  const name = document.querySelector('#signup-hero-name').value.trim();
  const secret_identity = document.querySelector('#signup-hero-secretid').value.trim();
  const organization = document.querySelector('#signup-organization').value.trim();
  const powers = document.querySelector('#signup-powers').value.trim();
  const weakness = document.querySelector('#signup-weakness').value.trim();


  if (username && email && password && name && secret_identity && organization && powers && weakness) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
        name,
        secret_identity,
        organization,
        powers,
        weakness
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);