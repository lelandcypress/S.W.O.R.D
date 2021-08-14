// BUTTON TO SHOW UP WHEN NO HERO ASSIGNED. THIS WILL SEND UPDATE TO SERVER FOR HERO ASSIGNED
const joinMission = async (event) => {
    event.preventDefault();
    // const join_mission = document.querySelector('#join_mission').value;
     if(event.target.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
        // const hero = req.session.user;
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
            document.location.replace(`/`);
          } else {
            document.location.replace(`/login`);
          }
        }
    
    
    }
    
    
  
document.querySelector('#missionTable').addEventListener('click', joinMission);