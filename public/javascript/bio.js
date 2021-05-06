async function bioHandler(event) {
    event.preventDefault();
    const bio = document.querySelector('textarea[name="userBio"]').value.trim();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    console.log(bio);
    if (bio) {
        const response = await fetch(`/api/users/`, {
          method: 'PUT',
          body: JSON.stringify({
            bio,
            
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
}
  
  document.querySelector('#userBioChange').addEventListener('click', bioHandler);