async function newStory(event){
    console.log ("hello");
    // let title = document.querySelector("#title").value.trim();
    // let beginning = document.querySelector("#story-text").value.trim();

    // const response = await fetch ("/api/stories", {
    //     method: "POST",
    //     body: JSON.stringify({title, beginning}),
    //     headers: {"Content-type": "application/json"}
    // });

    // if (response.ok) {
    //     document.location.replace ("/")
    // }
    // else {alert (response.statusText)}
}

document.getElementById("post-story-btn").addEventListener("click", newStory);

console.log ("kugabaluga");