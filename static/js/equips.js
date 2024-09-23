let track = document.querySelector('.container-cards');
let leftChevron = document.getElementById('left-chevron');
let rightChevron = document.getElementById('right-chevron');


let cardWidth = 300 + 10; 
let positionInitial = 0; 

rightChevron.addEventListener('click', () => {
    let trackWidth = track.scrollWidth; 
    let containerWidth = document.querySelector('.container-track').offsetWidth;

    if (positionInitial > - (trackWidth - containerWidth)) {
        positionInitial -= cardWidth;
        track.style.transform = `translateX(${positionInitial}px)`;
    }
});


leftChevron.addEventListener('click', () => {
    if (positionInitial < 0) {
        positionInitial += cardWidth;
        track.style.transform = `translateX(${positionInitial}px)`;
    }
});
