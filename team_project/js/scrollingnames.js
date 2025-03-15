const container = document.querySelector('.scrolling-text');
let amount = 0;

setInterval(() => {
 amount += 10;
 container.scrollLeft = amount;
 if (amount >= container.scrollWidth) {
  amount = 0;
 }
}, 20);
