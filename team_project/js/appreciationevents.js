document.addEventListener('DOMContentLoaded', function() {
    // Function add a thank you message
    function addThankYouMessage(name, message) {
        const thankYouMessagesContainer = document.getElementById('thank-you-messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        const messageHeader = document.createElement('h3');
        messageHeader.textContent = name;

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            thankYouMessagesContainer.removeChild(messageDiv);
        });

        messageDiv.appendChild(messageHeader);
        messageDiv.appendChild(messageParagraph);
        messageDiv.appendChild(removeButton);

        thankYouMessagesContainer.appendChild(messageDiv);
    }

    // Form submission
    document.getElementById('thank-you-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the default way
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        if (name && message) {
            addThankYouMessage(name, message);
            document.getElementById('name').value = ''; // Clear input fields
            document.getElementById('message').value = ''; // Clear input fields
        } else {
            alert('Please provide both a name and a message.');
        }
    });

    // Remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const messageDiv = button.parentElement;
            messageDiv.parentElement.removeChild(messageDiv);
        });
    });
});
