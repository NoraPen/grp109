
var text = document.getElementById(".scorlling-text");
var position = 100;

    setInterval(() => {
        position -= 2;
        text.style.left = position + "%";

        if (position < -text.offsetWidth) {
            position = 100;
        }
    }, 50);
