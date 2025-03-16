const container = document.querySelector('.scrolling-text');
let scrollAmount = 0;
const speed = 1;

setInterval(() => {
    if (!container) return;

    scrollAmount += speed;
    container.scrollLeft = scrollAmount;

    if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0; 
    }
}, 30); 
