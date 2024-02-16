const nameInput = document.getElementById("nameInput");
const voteNumberElement = document.querySelector(".vote-number");
const upvoteButton = document.getElementById("btn-up");
const downvoteButton = document.getElementById("btn-down");

nameInput.addEventListener("input", function() {
    const name = nameInput.value;
    console.log(name);
    sendDataToServer(name);
});


let voteCount = 0;

upvoteButton.addEventListener("click", function() {
    voteCount++;
    voteNumberElement.textContent = voteCount;
    console.log(voteCount);
});

downvoteButton.addEventListener("click", function() {
    voteCount--;
    voteNumberElement.textContent = voteCount;
    console.log(voteCount);
});

// Function to send data to server
function sendDataToServer(name) {
    fetch('/updateData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            voteCount: voteCount
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data sent successfully:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

