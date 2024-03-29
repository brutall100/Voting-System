const nameInput = document.getElementById("nameInput");
const voteNumberElement = document.querySelector(".vote-number");
const upvoteButton = document.getElementById("btn-up");
const downvoteButton = document.getElementById("btn-down");

function updateVoteNumber() {
  fetch(`http://localhost:3000/getTotalVoteCount`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      voteNumberElement.textContent = data.totalVoteCount;
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

updateVoteNumber();


let voteCount = 0;

upvoteButton.addEventListener("click", function () {
  //? Increment voteCount and send +1 to the server
  voteCount++;
  voteNumberElement.textContent = voteCount;
  sendDataToServer("+");
});

downvoteButton.addEventListener("click", function () {
  //? Decrement voteCount and send -1 to the server
  voteCount--;
  voteNumberElement.textContent = voteCount;
  sendDataToServer("-");
});

//// Function to send data to server
function sendDataToServer(action) {
  const name = nameInput.value;
  fetch(`http://localhost:3000/updateData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      action: action, 
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json(); 
        return response.text(); 
      }
    })
    .then((data) => {
      console.log("Data sent successfully:", data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}



  // fetch('http://localhost:4004/a_points.js', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   mode: 'no-cors',
//   body: JSON.stringify(data)
// })
// .then(response => {
//   console.log(response);
// })
// .catch(error => {
//   console.error(error);
// });
// }