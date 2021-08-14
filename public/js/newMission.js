// TO BE USED WITH CREATE MISSION PAGE
const newMissionHandler = async (event) => {
  event.preventDefault();
  console.log('button pushed');
  const name = document.querySelector('#name').value.trim();
  const location = document.querySelector('#location').value.trim();
  const description = document.querySelector('#description').value.trim();
  const priority = document.querySelector('#priority').value.trim();
  console.log(priority);
  await fetch('/api/missions/', {
    method: 'POST',
    body: JSON.stringify({ name, location, description, priority }),

    headers: {
      'Content-Type': 'application/json',
    },
  });
};

document
  .querySelector('.new-mission-form')
  .addEventListener('submit', newMissionHandler);
