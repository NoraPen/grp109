const container = document.querySelector('.scrolling-text');
let scrollAmount = 0;
const speed = 2;
const intervalTime = 16;

const interval = setInterval(() => {
    if (!container) {
        clearInterval(interval);
        return;
    }

    scrollAmount += speed;
    container.scrollLeft = scrollAmount;

    if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0;
    }
}, intervalTime);
