let offerFiltersMainBlock = document.querySelectorAll('.offer-filters');
for(let j=0; j < offerFiltersMainBlock.length; j++) {
    let offersListItem = offerFiltersMainBlock[j].querySelectorAll('.offer-filters-title');
    let offersListHiddenBlock = offerFiltersMainBlock[j].querySelectorAll('.offer-filters-hidden-block')[0];
    let offersListCloseBtn = offerFiltersMainBlock[j].querySelectorAll('.offer-filters-hidden-top-line')[0];
    let offersListHiddenTitleItem = offerFiltersMainBlock[j].querySelectorAll('.offer-filters-title-clicked')[0];
    let offerFiltersSliderList = offerFiltersMainBlock[j].querySelectorAll('.offer-filters-slider-list')[0];
    let offerListDotsBlock = offerFiltersMainBlock[j].querySelectorAll(".offer-slider-dots")[0];

    for (let i = 0; i < offersListItem.length; i++) {
        offersListItem[i].addEventListener('click', function () {
            offersListHiddenBlock.style.display = 'block';
            offerFiltersMainBlock[j].querySelector('.offer-filter-main-block').style.display = "none";
            offersListHiddenTitleItem.innerHTML = offersListItem[i].querySelector('.of-title').innerHTML;
            let offerListItemsWrap = document.createElement('div');
            offerListItemsWrap.classList.add('offer-list-items-wrap');

            for (let j = 0; j < offersListItem[i].querySelectorAll('a').length; j++) {
                let offerListItemElem = document.createElement('a');
                offerListItemElem.setAttribute('href', offersListItem[i].querySelectorAll('a')[j]);
                offerListItemElem.classList.add('offer-list-item-elem');
                offerListItemElem.innerText += offersListItem[i].querySelectorAll('a')[j].innerHTML;
                offerListItemsWrap.appendChild(offerListItemElem);
            }

            let offerListItemArr = Array.from(offerListItemsWrap.querySelectorAll('.offer-list-item-elem'));
            let sizePerSlide = 7;
            let offerListItemNewArr = [];
            for (let i = 0; i < Math.ceil(offerListItemArr.length / sizePerSlide); i++) {
                offerListItemNewArr[i] = offerListItemArr.slice((i * sizePerSlide), (i * sizePerSlide) + sizePerSlide);
            }
            for (let s = 0; s < offerListItemNewArr.length; s++) {
                var partOfItemBlock = document.createElement('div');
                partOfItemBlock.classList.add('part-of-item-block');
                for (let e = 0; e < offerListItemNewArr[s].length; e++) {
                    partOfItemBlock.append(offerListItemNewArr[s][e]);
                    offerFiltersSliderList.append(partOfItemBlock);
                }
            }
            createDotsElem();

            let sliderTrack = offersListHiddenBlock.querySelector('.offer-filters-slider-list'),
                offerListSlideItem = offersListHiddenBlock.querySelectorAll('.part-of-item-block'),
                sliderDots = Array.from(offerListDotsBlock.querySelectorAll('.off-list-dot-el')),
                slideWidth = offerListSlideItem[0].offsetWidth,
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
                lastTrf = --offerListSlideItem.length * slideWidth,
                posThreshold = offerListSlideItem[0].offsetWidth * 0.35,
                trfRegExp = /([-0-9.]+(?=px))/,
                swipeStartTime,
                swipeEndTime,
                getEvent = function () {
                    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
                },
                slide = function () {
                    if (transition) {
                        sliderTrack.style.transition = 'transform .5s';
                    }
                    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
                    sliderDots.forEach(function (item, index) {
                        if (slideIndex === index) {
                            item.classList.add('offListActiveDot');
                        } else {
                            item.classList.remove('offListActiveDot');
                        }
                    })

                },
                swipeStart = function () {
                    let evt = getEvent();

                    if (allowSwipe) {

                        swipeStartTime = Date.now();

                        transition = true;

                        nextTrf = (slideIndex + 1) * -slideWidth;
                        prevTrf = (slideIndex - 1) * -slideWidth;

                        posInit = posX1 = evt.clientX;
                        posY1 = evt.clientY;

                        sliderTrack.style.transition = '';

                        document.addEventListener('touchmove', swipeAction);
                        document.addEventListener('mousemove', swipeAction);
                        document.addEventListener('touchend', swipeEnd);
                        document.addEventListener('mouseup', swipeEnd);

                    }
                },
                swipeAction = function () {

                    let evt = getEvent(),
                        style = sliderTrack.style.transform,
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
                        if (slideIndex === --offerListSlideItem.length) {
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

                        sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
                    }

                },
                swipeEnd = function () {
                    posFinal = posInit - posX1;

                    isScroll = false;
                    isSwipe = false;

                    document.removeEventListener('touchmove', swipeAction);
                    document.removeEventListener('mousemove', swipeAction);
                    document.removeEventListener('touchend', swipeEnd);
                    document.removeEventListener('mouseup', swipeEnd);

                    if (allowSwipe) {
                        swipeEndTime = Date.now();
                        if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
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
                setTransform = function (transform, comapreTransform) {
                    if (transform >= comapreTransform) {
                        if (transform > comapreTransform) {
                            sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
                        }
                    }
                    allowSwipe = false;
                },
                reachEdge = function () {
                    transition = false;
                    swipeEnd();
                    allowSwipe = true;
                };

            sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';

            sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
            offersListHiddenBlock.addEventListener('touchstart', swipeStart);
            offersListHiddenBlock.addEventListener('mousedown', swipeStart);

        });
        offersListCloseBtn.addEventListener('click', function () {
            offersListHiddenBlock.style.display = 'none';
            offerFiltersSliderList.innerHTML = '';
            offerListDotsBlock.innerHTML = '';
            offerFiltersMainBlock[j].querySelector('.offer-filter-main-block').style.display = "block";
        })

    }

    function createDotsElem() {
        for (let q = 0; q < offerFiltersSliderList.querySelectorAll('.part-of-item-block').length; q++) {
            if (offerFiltersSliderList.querySelectorAll('.part-of-item-block').length > 1) {
                let creatDotEl = document.createElement("span");
                creatDotEl.classList.add('off-list-dot-el');
                offerListDotsBlock.append(creatDotEl);
            }
        }
        if (document.querySelectorAll('.off-list-dot-el').length > 1) {
            document.querySelectorAll('.off-list-dot-el')[0].classList.add('offListActiveDot');
        }
    }

}
document.addEventListener('click',function (e){
    if(e.target.closest('.active-offer-filter') == null && $$('.active-offer-filter').length != 0) {
        var activeOffersBlock = $$('.active-offer-filter');
        for(let i=0;i<activeOffersBlock.length;i++){
            activeOffersBlock[i].classList.remove('active-offer-filter');
        }
    }
},false)
