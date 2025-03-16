// Validation patterns
const patterns = {
    firstName: /^[A-Za-z]+(?:-[A-Za-z]+)*$/, /* letters and hyphens only, max 30 characters */
    lastName: /^[A-Za-z]+(?:-[A-Za-z]+)*$/, /* letters and hyphens only, max 30 characters */
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, /* valid email address xx@xx */
    phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/ /* valid phone number 10 digits, xxx-xxx-xxxx*/
};

// Error messages
const errorMessages = {
    firstName: "Please enter a valid first name (letters and hyphens only, max 30 characters)",
    lastName: "Please enter a valid last name (letters and hyphens only, max 30 characters)",
    email: "Please enter a valid email address (name@example.com)",
    phone: "Please enter a valid phone number (123-456-7890)",
    age: "You must be at least 18 years old",
    availability: "Please select your availability"
};

// Function to show error message
function showError(inputId, show) {
    const errorElement = document.getElementById(inputId + 'Error');
    if (errorElement) {
        if (show) {
            errorElement.style.display = 'block';  
        } else {
            errorElement.style.display = 'none';   
        }
    }
}

// Function to validate a single field
function validateField(inputId) {
    const input = document.getElementById(inputId);
    let isValid = true;

    switch(inputId) {
        case 'firstName':
        case 'lastName':
            const name = input.value.trim();
            isValid = patterns[inputId].test(name) && name.length > 0 && name.length <= 30;
            break;
        case 'email':
            isValid = patterns.email.test(input.value);
            break;
        case 'phone':
            isValid = patterns.phone.test(input.value);
            break;
        case 'age':
            isValid = input.value >= 18;
            break;
        case 'availability':
            isValid = input.value !== "";
            break;
    }

    showError(inputId, !isValid);
    return isValid;
}

// Add event listeners to all form fields
document.addEventListener('DOMContentLoaded', function() {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'age', 'availability'];
    
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            // Validate on input change
            input.addEventListener('input', () => validateField(field));
            // Validate on blur (when field loses focus)
            input.addEventListener('blur', () => validateField(field));
        }
    });
});

// Form submission handler
function validateForm(event) {
    event.preventDefault();
    
    const fields = ['firstName', 'lastName', 'email', 'phone', 'age', 'availability'];
    let isValid = true;

    // Validate all fields
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    // If all validations pass, submit the form
    if (isValid) {
        window.location.href = "thankyou.html";
    }

    return false;
} 