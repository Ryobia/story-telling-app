async function contributionFormHandler(event) {
    event.preventDefault();
    const contribution_text = document.querySelector('textarea[name="addToStoryBox1"]').value.trim();
  
    const story_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    console.log(story_id, contribution_text);
    if (contribution_text) {
        const response = await fetch('/api/contributions', {
          method: 'POST',
          body: JSON.stringify({
            contribution_text,
            story_id
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
  
  document.querySelector('#addToStory').addEventListener('click', contributionFormHandler);