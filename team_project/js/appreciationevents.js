document.addEventListener('DOMContentLoaded', function () {
    // Preload audio files
    const rewindSound = new Audio('https://norapen.github.io/grp109/team_project/sounds/beep-sound-short-237619.mp3');
    const advanceSound = new Audio('https://norapen.github.io/grp109/team_project/sounds/ping-306439.mp3');
    rewindSound.volume = 1; // Ensure maximum volume
    advanceSound.volume = 1;

    // Get references to carousel and elements
    const carousel = document.getElementById('carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const elapsedTimeSpan = document.getElementById('elapsed-time');
    const toggleButton = document.getElementById('toggle-auto-scroll');

    let currentIndex = 0; // Tracks current active slide
    let elapsedTime = 0; // Timer for elapsed time
    let autoScrollInterval = null; // Interval for auto-scroll
    let timerInterval = null; // Interval for the timer
    let isAutoScrolling = true; // Auto-scroll toggle state

    // Function to update the carousel to the current index
    function updateCarousel(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index); 
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
        }, 1000); // Update every second
    }

    // Start auto-scroll functionality
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length; 
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

    // Event listener for carousel click to rewind or advance
    carousel.addEventListener('click', function (event) {
        const carouselWidth = carousel.offsetWidth;
        const clickPosition = event.clientX - carousel.getBoundingClientRect().left;

        if (clickPosition < carouselWidth / 2) {
            // Left side clicked (Rewind)
            currentIndex = (currentIndex - 1 + items.length) % items.length; // Loop backward
            updateCarousel(currentIndex);
            rewindSound.play().catch(error => console.error('Rewind sound error:', error)); // Play rewind sound
        } else {
            // Right side clicked (Advance)
            currentIndex = (currentIndex + 1) % items.length; // Loop forward
            updateCarousel(currentIndex);
            advanceSound.play().catch(error => console.error('Advance sound error:', error)); // Play advance sound
        }

        // Reset the timer and auto-scroll
        resetTimer();
        if (isAutoScrolling) {
            stopAutoScroll();
            startAutoScroll();
        }
    });

    // Event listener for the toggle button
    toggleButton.addEventListener('click', toggleAutoScroll);

    // Initialize the carousel
    updateCarousel(currentIndex); // Ensure the first item is visible
    startTimer(); // Start the timer
    startAutoScroll(); // Start auto-scroll
});
