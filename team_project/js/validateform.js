function validateForm(event) {
    event.preventDefault();
    
    // Reset all error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.style.display = 'none');
    
    let isValid = true;
    
    // Validate Full Name
    const fullName = document.getElementById('fullName').value.trim();
    if (fullName.length < 2 || !/^[a-zA-Z\s]+$/.test(fullName)) {
        document.getElementById('fullNameError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Email
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Phone Number
    const phone = document.getElementById('phone').value.trim();
    if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Age
    const age = document.getElementById('age').value;
    if (age < 18 || age > 120) {
        document.getElementById('ageError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Availability
    const availability = document.getElementById('availability').value;
    if (!availability) {
        document.getElementById('availabilityError').style.display = 'block';
        isValid = false;
    }
    
    // If all validations pass, redirect to thank you page
    if (isValid) {
        window.location.href = 'thankyou.html';
    }
    
    return false;
} 