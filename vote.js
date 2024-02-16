const nameInput = document.getElementById("nameInput")
const voteNumberElement = document.querySelector(".vote-number")

const upvoteButton = document.getElementById("btn-up")
const downvoteButton = document.getElementById("btn-down")


nameInput.addEventListener("input", function(){
    const name = nameInput.value
    console.log(name)
})

let voteCount = 0
upvoteButton.addEventListener("click", function(){
    voteCount++
    voteNumberElement.textContent = voteCount
})

downvoteButton.addEventListener("click", function(){
    voteCount--
    voteNumberElement.textContent = voteCount
})
