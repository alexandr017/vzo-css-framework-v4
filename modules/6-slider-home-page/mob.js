let sliderEl = $$(".top-slider-item");
let dotsBlock = $$(".dots-wrap-block");

createDotsEl();

function createDotsEl() {
    for (let i=0; i<sliderEl.length; i++) {
        let newDotEl = document.createElement("span");
        newDotEl.className = "dot-el";
        if(dotsBlock.length != 0) {
            dotsBlock[0].appendChild(newDotEl);
        }
    }
    if(document.querySelectorAll('.dot-el').length != 0){
        document.querySelectorAll('.dot-el')[0].classList.add('activeDot');
    }

}


