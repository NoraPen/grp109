document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const volunteerName = document.getElementById('volunteer-name');
    const elapsedTimeSpan = document.getElementById('elapsed-time');
    const thankYouMessagesContainer = document.getElementById('thank-you-messages');
    const form = document.getElementById('thank-you-form');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');

    let currentIndex = 0;
    let elapsedTime = 0;
    let autoScrollInterval = null;
    let timerInterval = null;

    // Audio Files
    const rewindSound = new Audio('sounds/rewind.mp3');
    const advanceSound = new Audio('sounds/advance.mp3');

    // Function to update the carousel
    function updateCarousel(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        const activeItem = items[index];
        const volunteer = activeItem.getAttribute('data-volunteer');
        if (volunteerName && volunteer) {
            volunteerName.textContent = volunteer;
        }
    }

    // Reset Timer
    function resetTimer() {
        elapsedTime = 0;
        elapsedTimeSpan.textContent = elapsedTime;
        clearInterval(timerInterval);
        startTimer();
    }

    // Start Timer
    function startTimer() {
        timerInterval = setInterval(() => {
            elapsedTime++;
            elapsedTimeSpan.textContent = elapsedTime;
        }, 1000);
    }

    // Reset Auto-Scroll
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Start Auto-Scroll
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel(currentIndex);
        }, 3000);
    }

    // Event Listener for Rewind/Advance
    carousel.addEventListener('click', function (event) {
        const carouselWidth = carousel.offsetWidth;
        const clickPosition = event.clientX - carousel.getBoundingClientRect().left;

        if (clickPosition < carouselWidth / 2) {
            // Left side clicked (Rewind)
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel(currentIndex);
            rewindSound.play();
        } else {
            // Right side clicked (Advance)
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel(currentIndex);
            advanceSound.play();
        }

        // Reset the timer and auto-scroll
        resetTimer();
        resetAutoScroll();
    });

    // Thank-You Message Functions
    function addThankYouMessage(name, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        const messageHeader = document.createElement('h3');
        messageHeader.textContent = name;

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function () {
            thankYouMessagesContainer.removeChild(messageDiv);
        });

        messageDiv.appendChild(messageHeader);
        messageDiv.appendChild(messageParagraph);
        messageDiv.appendChild(removeButton);

        thankYouMessagesContainer.appendChild(messageDiv);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        const name = nameInput.value.trim(); // Trim input for cleaner data
        const message = messageInput.value.trim();

        if (name && message) {
            addThankYouMessage(name, message);
            nameInput.value = ''; // Clear form fields
            messageInput.value = '';
        } else {
            alert('Please provide both a name and a message.');
        }
    });

    // Initialize existing "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const messageDiv = button.parentElement;
            messageDiv.parentElement.removeChild(messageDiv);
        });
    });

    // Initialize Timer and Auto-Scroll
    startTimer();
    startAutoScroll();
});
