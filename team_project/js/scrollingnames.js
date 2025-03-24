function startScrolling() {
        let text = document.getElementById("scrolling-text");
        if (text) {
            text.classList.add("scrolling");
        } else {
            console.error("Element with id 'scroll-text' not found!");
        }
    }

    window.onload = startScrolling;
