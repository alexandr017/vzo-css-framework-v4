let sliderEl = $$(".top-slider-item");
let dotsBlock = $$(".dots-wrap-block")[0];

createDotsEl();

function createDotsEl() {
    for (let i=0; i<sliderEl.length; i++) {
        let newDotEl = document.createElement("span");
        newDotEl.className = "dot-el";
        dotsBlock.appendChild(newDotEl);
    }
    document.querySelectorAll('.dot-el')[0].classList.add('activeDot');

}

let topSliderBlock = document.querySelector('.top-slider-block'),
    topSlider = topSliderBlock.querySelector('.top-slider'),
    topSliderDotsArr = Array.from(dotsBlock.querySelectorAll('.dot-el')),
    topSliderItem = topSliderBlock.querySelectorAll('.top-slider-item'),
    topSliderItemWidth = topSliderItem[0].offsetWidth,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lastTrf = --topSliderItem.length * topSliderItemWidth,
    posThreshold = topSliderItem[0].offsetWidth * 0.35,
    trfRegExp = /([-0-9.]+(?=px))/,
    getEvent = function() {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    },
    slide = function() {
        if (transition) {
            topSlider.style.transition = 'transform .5s';
        }
        topSlider.style.transform = `translate3d(-${slideIndex * topSliderItemWidth}px, 0px, 0px)`;
        topSliderDotsArr.forEach(function (item, index) {
            if (slideIndex === index) {
                item.classList.add('activeDot');
            }else{
                item.classList.remove('activeDot');
            }
        })

    },
    swipeStart = function() {
        let evt = getEvent();
        if (allowSwipe) {
            transition = true;
            nextTrf = (slideIndex + 1) * -topSliderItemWidth;
            prevTrf = (slideIndex - 1) * -topSliderItemWidth;

            posInit = posX1 = evt.clientX;
            posY1 = evt.clientY;

            topSlider.style.transition = '';

            document.addEventListener('touchmove', swipeAction);
            document.addEventListener('mousemove', swipeAction);
            document.addEventListener('touchend', swipeEnd);
            document.addEventListener('mouseup', swipeEnd);


        }
    },
    swipeAction = function() {

        let evt = getEvent(),
            style = topSlider.style.transform,
            transform = +style.match(trfRegExp)[0];

        posX2 = posX1 - evt.clientX;
        posX1 = evt.clientX;

        posY2 = posY1 - evt.clientY;
        posY1 = evt.clientY;

        if (!isSwipe && !isScroll) {
            let posY = Math.abs(posY2);
            if (posY > 7 || posX2 === 0) {
                isScroll = true;
                allowSwipe = false;
            } else if (posY < 7) {
                isSwipe = true;
            }
        }

        if (isSwipe) {
            if (slideIndex === 0) {
                if (posInit < posX1) {
                    setTransform(transform, 0);
                    return;
                } else {
                    allowSwipe = true;
                }
            }
            if (slideIndex === --topSliderItem.length) {
                if (posInit > posX1) {
                    setTransform(transform, lastTrf);
                    return;
                } else {
                    allowSwipe = true;
                }
            }
            if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
                reachEdge();
                return;
            }

            topSlider.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
        }

    },
    swipeEnd = function() {
        posFinal = posInit - posX1;

        isScroll = false;
        isSwipe = false;

        document.removeEventListener('touchmove', swipeAction);
        document.removeEventListener('mousemove', swipeAction);
        document.removeEventListener('touchend', swipeEnd);
        document.removeEventListener('mouseup', swipeEnd);

        if (allowSwipe) {
            if (Math.abs(posFinal) > posThreshold) {
                if (posInit < posX1) {
                    slideIndex--;
                } else if (posInit > posX1) {
                    slideIndex++;
                }
            }

            if (posInit !== posX1) {
                allowSwipe = false;
                slide();
            } else {
                allowSwipe = true;
            }

        } else {
            allowSwipe = true;
        }

    },
    setTransform = function(transform, compareTransform) {
        if (transform >= compareTransform) {
            if (transform > compareTransform) {
                topSlider.style.transform = `translate3d(${compareTransform}px, 0px, 0px)`;
            }
        }
        allowSwipe = false;
    },
    reachEdge = function() {
        transition = false;
        swipeEnd();
        allowSwipe = true;
    };

topSlider.style.transform = 'translate3d(0px, 0px, 0px)';

topSlider.addEventListener('transitionend', () => allowSwipe = true);
topSliderBlock.addEventListener('touchstart', swipeStart);
topSliderBlock.addEventListener('mousedown', swipeStart);

