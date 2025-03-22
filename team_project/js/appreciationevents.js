document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const volunteerName = document.getElementById('volunteer-name');
    const elapsedTimeSpan = document.getElementById('elapsed-time');
    const toggleButton = document.getElementById('toggle-auto-scroll');

    let currentIndex = 0;
    let elapsedTime = 0;
    let autoScrollInterval = null;
    let timerInterval = null;
    let isAutoScrolling = true; // Track the state of auto-scroll

    // Audio Files
    const rewindSound = new Audio('https://norapen.github.io/grp109/team_project/sounds/beep-sound-short-237619.mp3');
    const advanceSound = new Audio('https://norapen.github.io/grp109/team_project/sounds/ping-306439.mp3');

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

    // Start Auto-Scroll
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length; // Loop through items
            updateCarousel(currentIndex);
        }, 3000); // Auto-scroll every 3 seconds
    }

    // Stop Auto-Scroll
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Toggle Auto-Scroll
    function toggleAutoScroll() {
        if (isAutoScrolling) {
            stopAutoScroll();
            toggleButton.textContent = 'Resume Auto-Scroll'; // Update button text
        } else {
            startAutoScroll();
            toggleButton.textContent = 'Pause Auto-Scroll'; // Update button text
        }
        isAutoScrolling = !isAutoScrolling; // Toggle the state
    }

    // Event Listener for Rewind/Advance
    carousel.addEventListener('click', function (event) {
        const carouselWidth = carousel.offsetWidth;
        const clickPosition = event.clientX - carousel.getBoundingClientRect().left;

        if (clickPosition < carouselWidth / 2) {
            // Left side clicked (Rewind)
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel(currentIndex);
            rewindSound.play().catch(error => console.error('Rewind sound error:', error));
        } else {
            // Right side clicked (Advance)
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel(currentIndex);
            advanceSound.play().catch(error => console.error('Advance sound error:', error));
        }

        // Reset the timer and auto-scroll
        resetTimer();
        if (isAutoScrolling) {
            stopAutoScroll();
            startAutoScroll();
        }
    });

    // Event Listener for Toggle Button
    toggleButton.addEventListener('click', toggleAutoScroll);

    // Initialize Timer and Auto-Scroll
    updateCarousel(currentIndex); // Ensure the first item is visible
    startTimer();
    startAutoScroll();
});
