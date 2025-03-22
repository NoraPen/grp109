document.addEventListener('DOMContentLoaded', function () {
    // Preload audio files
    const rewindSound = new Audio('https://norapen.github.io/grp109/team_project/sounds/beep-sound-short-237619.mp3');
    const advanceSound = new Audio('https://norapen.github.io/grp109/team_project/sounds/ping-306439.mp3');
    rewindSound.volume = 1; // Set rewind sound volume
    advanceSound.volume = 1; // Set advance sound volume

    // Get references to carousel and elements
    const carousel = document.getElementById('carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const elapsedTimeSpan = document.getElementById('elapsed-time');
    const toggleButton = document.getElementById('toggle-auto-scroll');

    let currentIndex = 0; // Tracks the current active slide
    let elapsedTime = 0; // Timer for elapsed time
    let autoScrollInterval = null; // Interval for auto-scroll
    let timerInterval = null; // Interval for the timer
    let isAutoScrolling = true; // Auto-scroll toggle state

    // Function to update the carousel
    function updateCarousel(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index); // Activate the current item
        });
    }

    // Reset the timer
    function resetTimer() {
        elapsedTime = 0;
        elapsedTimeSpan.textContent = elapsedTime;
        clearInterval(timerInterval);
        startTimer();
    }

    // Start the timer
    function startTimer() {
        timerInterval = setInterval(() => {
            elapsedTime++;
            elapsedTimeSpan.textContent = elapsedTime;
        }, 1000); // Increment every 1 second
    }

    // Start auto-scroll functionality
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length; // Loop to the next item
            updateCarousel(currentIndex);
        }, 3000); // Advance every 3 seconds
    }

    // Stop auto-scroll functionality
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Toggle auto-scroll on or off
    function toggleAutoScroll() {
        if (isAutoScrolling) {
            stopAutoScroll();
            toggleButton.textContent = 'Resume Auto-Scroll'; // Update button text
        } else {
            startAutoScroll();
            toggleButton.textContent = 'Pause Auto-Scroll'; // Update button text
        }
        isAutoScrolling = !isAutoScrolling; // Toggle state
    }

    // Click to rewind/advance carousel
    carousel.addEventListener('click', function (event) {
        const carouselWidth = carousel.offsetWidth;
        const clickPosition = event.clientX - carousel.getBoundingClientRect().left;

        if (clickPosition < carouselWidth / 2) {
            // Rewind
            currentIndex = (currentIndex - 1 + items.length) % items.length; // Loop backward
            updateCarousel(currentIndex);
            rewindSound.play().catch(error => console.error('Rewind sound error:', error));
        } else {
            // Advance
            currentIndex = (currentIndex + 1) % items.length; // Loop forward
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

    // Event listener for toggle button
    toggleButton.addEventListener('click', toggleAutoScroll);

    // Initialize carousel
    updateCarousel(currentIndex); // Ensure the first item is active
    startTimer(); // Start the timer
    startAutoScroll(); // Start auto-scroll
});
