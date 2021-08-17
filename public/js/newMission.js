const newMissionHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const location = document.querySelector('#location').value.trim();
  const description = document.querySelector('#description').value.trim();
  const priority = document.querySelector('#priority').value.trim();

  await fetch('/api/missions/', {
    method: 'POST',
    body: JSON.stringify({ name, location, description, priority }),

    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const returnToHome = async (event) => {
  event.preventDefault();
  window.location.replace('/');
};
document
  .querySelector('.new-mission-form')
  .addEventListener('submit', newMissionHandler);

document.querySelector('#homepage').addEventListener('click', returnToHome);
