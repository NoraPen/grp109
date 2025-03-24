var text = document.getElementById("scroll-text");
    var position = window.innerWidth; 

    function scrollText() {
        position -= 2; 
        text.style.transform = `translateX(${position}px)`;

        
        if (position < -text.offsetWidth) {
            position = window.innerWidth; 
        }
    }

    setInterval(scrollText, 20);
