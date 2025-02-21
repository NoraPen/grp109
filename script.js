// Get reference to the submit button
const submitButton = document.querySelector('button[type="submit"]');

// Function to store form values
function storeFormValues() {
    // Get values from form fields
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    
    // Store the values (for now just logging them)
    console.log('Form submitted:', { firstName, lastName });
    
    // Redirect to change management page
    window.location.href = 'changeManagement.html';
}

// Handle form submission
submitButton.addEventListener('click', storeFormValues);
