
let condition_plus = 0;

function changeEquipsRight() {

    condition_plus++;
    condition_plus = condition_plus % 10;

    
    cards.forEach(e => {
        if (e.id == condition_plus){
            e.classList.remove("active");
            e.classList.add("none");
        }
    });


    let nextCondition = (condition_plus + 3);


    cards.forEach(e => {

        if (nextCondition > 9){nextCondition = condition_plus - 6}
        console.log(nextCondition);

        if (e.id == nextCondition) {
            e.classList.remove("none");
            e.classList.add("active");
        }
    });
}

function changeEquipsLeft() {
    
}



var left_chevron = document.querySelector("#left-chevron").addEventListener('click', changeEquipsLeft);
var right_chevron = document.querySelector("#right-chevron").addEventListener('click', changeEquipsRight);

var cards = document.querySelectorAll(".cards");





