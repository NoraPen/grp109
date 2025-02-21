// Get reference to the form
const form = document.querySelector('.signup-form');

// Function to store form values
function storeFormValues(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get values from form fields
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    
    // Store the values (for now just logging them)
    console.log('Form submitted:', { firstName, lastName });
    
    // Simple direct redirect
    window.location = 'changeManagement.html';
}

// Handle form submission
form.addEventListener('submit', storeFormValues);
