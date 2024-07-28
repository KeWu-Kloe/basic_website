function showModal(description) {
    var modal = document.getElementById('modal');
    var modalText = document.getElementById('modal-text');
    modalText.textContent = description; // Set the text for the modal
    modal.style.display = "block"; // Show the modal
}

function closeModal() {
    var modal = document.getElementById('modal');
    modal.style.display = "none"; // Hide the modal
}

// Close the modal if the user clicks anywhere outside of the modal content
window.onclick = function(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//flip the card, then the words can show