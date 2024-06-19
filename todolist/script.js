var currentPage = 1;
var totalPages = 2; // Assuming 2 pages for demonstration

// Function to save the note to local storage
function saveNote() {
    var noteContent = document.getElementById('notebook').value;
    localStorage.setItem('note' + currentPage, noteContent);
    alert('Note saved successfully!');
}

// Function to display the "Note saved successfully!" message
function displaySavedMessage() {
    alert('Note saved successfully!');
}

// Function to clear the note
function clearNote() {
    document.getElementById('notebook').value = '';
}

// Function to navigate to the previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadNote();
    }
}

// Function to navigate to the next page
function nextPage() {
    if (currentPage < totalPages) {
        saveNote(); // Save the current note before navigating
        currentPage++;
        loadNote();
    }
}

// Function to load the note from local storage
function loadNote() {
    var savedNote = localStorage.getItem('note' + currentPage);
    if (savedNote !== null) {
        document.getElementById('notebook').value = savedNote;
    } else {
        document.getElementById('notebook').value = '';
    }
}

// Load note on page load
window.onload = loadNote;

// Attach event listener to "Save" button to display saved message
document.getElementById('saveBtn').addEventListener('click', displaySavedMessage);

// Function to save the note and deadline to local storage when typing or selecting date
document.addEventListener("DOMContentLoaded", function() {
    const noteTextarea = document.getElementById("notebook");
    const deadlineInput = document.getElementById("deadline");
    const saveButton = document.getElementById("saveBtn");

    // Load saved note and deadline from local storage
    const savedNote = localStorage.getItem("note");
    const savedDeadline = localStorage.getItem("deadline");
    if (savedNote) {
        noteTextarea.value = savedNote;
    }
    if (savedDeadline) {
        deadlineInput.value = savedDeadline;
    }

    // Save note and deadline to local storage when typing or selecting date
    noteTextarea.addEventListener("input", saveToLocalStorage);
    deadlineInput.addEventListener("change", saveToLocalStorage);
    saveButton.addEventListener("click", saveToLocalStorage);

    // Check deadline proximity on page load
    checkDeadlineProximity();

    function saveToLocalStorage() {
        const noteContent = noteTextarea.value;
        const deadlineDate = deadlineInput.value;
        localStorage.setItem("note", noteContent);
        localStorage.setItem("deadline", deadlineDate);
        checkDeadlineProximity();
    }

    function checkDeadlineProximity() {
        const deadlineDate = new Date(deadlineInput.value);
        const currentDate = new Date();

        // Calculate difference in days between deadline and current date
        const daysUntilDeadline = Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));

        // Apply color based on proximity
        if (daysUntilDeadline < 0) {
            deadlineInput.style.backgroundColor = "#ff0000"; // Red for overdue
        } else if (daysUntilDeadline <= 2) {
            deadlineInput.style.backgroundColor = "#ffcc66"; // Yellow for approaching
        } else {
            deadlineInput.style.backgroundColor = "#ffffff"; // White for normal
        }
    }
});
