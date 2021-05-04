document.getElementById("display-confirmation").style.display = "none";

async function newStory(event){
    console.log ("hello");
    let title = document.querySelector("#title").value.trim();
    let beginning = document.querySelector("#story-text").value.trim();

    const response = await fetch ("/api/stories", {
        method: "POST",
        body: JSON.stringify({title, beginning}),
        headers: {"Content-type": "application/json"}
    });

    if (response.ok) {
        document.location.replace ("/")
    }
    else {alert (response.statusText)}
}

document.getElementById("post-story-btn").addEventListener("click", function () {
    newStory;
    document.getElementById("input-fields").style.visibility = "hidden";
    document.getElementById("display-confirmation").style.display = "inline";
}); 

function goToLogin() {
    window.location.replace('/login');
}

document.querySelector(".profile-button").addEventListener('click', goToLogin);