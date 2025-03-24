var text = document.getElementById("text");
    var position = 100; 

    function moveText() {
        position += 10;  
        text.style.left = position + "px";  

        if (position > 300) { 
            clearInterval(interval);
        }
    }

    var interval = setInterval(moveText, 500);
