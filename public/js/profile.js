var showEditButton = document.getElementById('update-mission-btn');
var editSubmitButton = document.getElementById('submit-update-btn');
var joinMissionTable = document.getElementById('open-missions-table');

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

const joinMission = async (event) => {
    event.preventDefault();
    console.log('Click!');
    if(event.target.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
        console.log(`Clicked on button: ${id}`);
        const response = await fetch(`/api/missions/heroassign/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/profile`);
        } else {
            document.location.replace(`/login`);
        }
    }
}
    
    
if (joinMissionTable) {
    joinMissionTable.addEventListener('click', joinMission);
}

if (showEditButton) {
    showEditButton.addEventListener('click', handleUpdateStatusButton);
}

if (editSubmitButton) {
    editSubmitButton.addEventListener('click', handleStatusSubmitButton);
}