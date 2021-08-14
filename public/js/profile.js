function handleUpdateStatusButton(event) {
    event.preventDefault();

    // Expose form
    document
        .getElementById('update-form')
        .setAttribute('style', 'display: block;');
}

const handleStatusSubmitButton = async (event) => {
    event.preventDefault();

    const status = document.getElementById('update-status-body');
    const id = status.getAttribute('data-id');
    const body = status.value.trim();

    // PUT request
    if (status) {
        const response = await fetch(`/api/missions/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ body }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location = window.location;
        } else {
            alert('Failed to edit mission');
        }
    } else {
        alert('The status cannot be blank');
    }
}

document
    .getElementById('update-mission-btn')
    .addEventListener('click', handleUpdateStatusButton);

document
    .getElementById('submit-update-btn')
    .addEventListener('click', handleStatusSubmitButton);