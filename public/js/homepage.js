const printCSV = async (event) => {
  event.preventDefault();

    const response = await fetch(`/api/data/missions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/api/data/missions`);
    } else {
      document.location.replace(`/login`);
    }
  
}

const printBtn = document.querySelectorAll('.print');
if (printBtn) {
  [...printBtn].map(btn => btn.addEventListener('click', printCSV));
}