async function search(event) {
  let searchInput = document.querySelector("#search-input").value.trim();

}

document.getElementById("search-button").addEventListener("click", search 
  //display results in feed (replace normal story feed)
);


//Need a function to run search bar:

// return Story.findAll({
//   where: {
//     title: body.title = searchInput
//   },
//   attributes: [
//     'id',
//     'title',
//     'beginning',
//     'created_at',
//   ]
// });

//OR

// function myFunction() {
//   // Declare variables
//   var input, filter, ul, li, a, i, txtValue;
//   input = document.getElementById('search-input');
//   filter = input.value.toUpperCase();
//   // link array of stories/users for ul:
//   ul = document.getElementById("myUL");
//   li = ul.getElementsByTagName('li');

//   // Loop through all list items, and hide those who don't match the search query
//   for (i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }



