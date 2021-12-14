let sliderEl = $$(".top-slider-item");
let dotsBlock = $$(".dots-wrap-block")[0];
let dotEl = document.getElementsByClassName("dot-el");
let currentElSlide = 0;
createDotsEl();

function createDotsEl() {
    for (let i=0; i<sliderEl.length; i++) {
        let newDotEl = document.createElement("span");
        newDotEl.className = "dot-el";
        dotsBlock.appendChild(newDotEl);
    }
    document.querySelectorAll('.dot-el')[0].classList.add('activeDot');

}

for (let i = 0; i < dotEl.length; i++) {
    (function(index){
        dotEl[i].addEventListener('click', function() {
            if (index !== currentElSlide) {
                document.querySelector('.dot-el.activeDot').classList.remove('activeDot');
                this.classList.add('activeDot');
                document.querySelector('.top-slider-item.active-slide').classList.remove('active-slide');
                sliderEl[index].classList.add('active-slide');
                currentElSlide = index;
            }
        });
    })(i);
}
