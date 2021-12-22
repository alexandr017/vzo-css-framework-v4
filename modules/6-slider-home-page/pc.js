function topSlider(){
    let topSliderBlock = document.querySelector(".top-slider");
    let topSliderItem = document.querySelectorAll(".top-slider-item");
    let topSliderPrevBtn = document.querySelector(".prev-btn");
    let topSliderNextBtn = document.querySelector(".next-btn");
    let dotsWrapBlock = document.querySelector(".dots-wrap-block");
    let topSlideIndex = 1;

    for (let i = 0; i < topSliderItem.length; i++) {
        let dotEl = document.createElement("div");
        dotEl.classList.add("dot-el");
        dotEl.id = "slider-item" + (i + 1);
        dotsWrapBlock.appendChild(dotEl);
    }
    let activeDotEl = document.querySelectorAll(".dot-el");
    activeDotEl[0].classList.add("activeDot");

    let firstEl = topSliderItem[0].cloneNode(true);
    firstEl.id = "firstEl";
    topSliderBlock.appendChild(firstEl);

    let lastEl = topSliderItem[topSliderItem.length - 1].cloneNode(true);
    lastEl.id = "lastEl";
    topSliderBlock.prepend(lastEl);

    topSliderItem = document.querySelectorAll(".top-slider-item");

    let topSliderItemWidth = topSliderItem[0].clientWidth;
    topSliderBlock.style.transform = `translateX(${-topSlideIndex * topSliderItemWidth}px)`;

    topSliderNextBtn.addEventListener("click", () => {
        if (topSlideIndex >= topSliderItem.length - 1) return null;
        topSliderBlock.style.transition = "all 0.3s ease-in-out";
        topSlideIndex++;
        topSliderBlock.style.transform = `translateX(${-topSlideIndex * topSliderItemWidth}px)`;
        dotsBlock(topSlideIndex, activeDotEl);
    });

    topSliderPrevBtn.addEventListener("click", () => {
        if (topSlideIndex <= 0) return null;
        topSliderBlock.style.transition = "all 0.3s ease-in-out";
        topSlideIndex--;
        topSliderBlock.style.transform = `translateX(${-topSlideIndex * topSliderItemWidth}px)`;
        dotsBlock(topSlideIndex, activeDotEl);
    });

    topSliderBlock.addEventListener("transitionend", () => {
        if (topSliderItem[topSlideIndex].id === "lastEl") {
            topSliderBlock.style.transition = "none";
            topSlideIndex = topSliderItem.length - 2;
            topSliderBlock.style.transform = `translateX(${-topSlideIndex * topSliderItemWidth}px)`;
        }

        if (topSliderItem[topSlideIndex].id === "firstEl") {
            topSliderBlock.style.transition = "none";
            topSlideIndex = topSliderItem.length - topSlideIndex;
            topSliderBlock.style.transform = `translateX(${-topSlideIndex * topSliderItemWidth}px)`;
        }
    });

    activeDotEl.forEach((el, i) => {
        el.addEventListener("click", () => {
            topSlideIndex = i + 1;
            topSliderBlock.style.transition = "all 0.3s ease-in-out";
            topSliderBlock.style.transform = `translateX(${-topSlideIndex * topSliderItemWidth}px)`;
            dotsBlock(topSlideIndex, activeDotEl);
        });
    });

    window.onresize = () => {
        topSliderItemWidth = topSliderItem[0].offsetWidth;
        topSliderBlock.style.transform = `translateX(${-topSlideIndex * topSliderItemWidth}px)`;
    };
};

window.addEventListener('DOMContentLoaded', topSlider);

let dotsBlock = (topSlideIndex, activeDotEl) => {
    for (let i = 0; i < activeDotEl.length; i++) {
        if (topSlideIndex > activeDotEl.length) topSlideIndex = 1;
        if (topSlideIndex < 1) topSlideIndex = activeDotEl.length;

        if (activeDotEl[i].id === "slider-item" + topSlideIndex) {
            activeDotEl[i].classList.add("activeDot");
        } else {
            activeDotEl[i].classList.remove("activeDot");
        }
    }
};