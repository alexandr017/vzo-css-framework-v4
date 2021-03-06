function cardSliderInit (elem){
    var cardSliderBlocks = document.querySelectorAll(".card-slider-init:not(.jsSlideMainBlock)");
    for (let i=0; i<cardSliderBlocks.length;i++) {
        cardSliderBlocks[i].classList.add('card-slider'+elem.id);
        slideShow({
            element:'.card-slider'+elem.id,
            slidesToShow:5,
            slidesToScroll:1,
            circleScroll:false,
            height:'113',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        })
    }
}

function  addTabsClick(e) {
    let tabTabs = e.querySelectorAll('.tab .tab-links');
    let tabItems = e.querySelectorAll('.tabs-items .tab-content');
    for(let i =0;i<tabTabs.length;i++) {
        tabTabs[0].click();
        tabTabs[i].onclick = () => {
            tabTabs.forEach((e)  => { e.classList.remove('on') });
            tabItems.forEach((e)  => { e.classList.remove('on') });
            tabTabs[i].classList.add('on');
            tabItems[i].classList.add('on');
        }
    }
}

function addCardsMoreBtnsClick(value) {
    let cardButtonShow = value.querySelector('.card-more'),
        cardButtonHide = value.querySelector('.card-less'),
        hiddenCardInfoBlock = value.querySelector('.hidden-card-info');
    cardButtonShow.addEventListener('click', event => {
        cardButtonHide.style.display = 'flex';
        cardButtonShow.style.display = 'none';
        if(event.target.parentElement.getElementsByClassName('card-slider-block').length != 0) {
            event.target.parentElement.getElementsByClassName('card-slider-block')[0].classList.add('card-slider-init');
        }
        cardSliderInit(event.target.parentElement.closest('.card'));
        hiddenCardInfoBlock.style.display = 'block';
    });
    cardButtonHide.addEventListener('click', event => {
        cardButtonShow.style.display = 'flex';
        cardButtonHide.style.display = 'none';
        hiddenCardInfoBlock.style.display = 'none';
    });
}

function addToCompareBtnsClick (e){
    var elem = e.getElementsByClassName('addToCompare')[0];
    if($$('.compare-block').length != 0) {
        var catId = $$('.compare-block')[0].attributes['data-cat'].value;
        elem.addEventListener('click',() => {
            var compareItems = localStorage.getItem('vzo_compare'+ catId);
            if (compareItems == null || compareItems == '') {
                compareItemsArr = Array();
            } else {
                compareItemsArr = compareItems.split(',');
                if(compareItemsArr.length == 10){
                    alert('???????????? ?????????????????? ?????????? 10 ???????????????? ???????????? ?????????????? ?? ??????????????????');
                    return;
                }
            }
            var id = elem.attributes['data-id'].value;
            if(elem.closest('.card-icons').classList.contains('addedToCompare')){
                for (i = 0; i < compareItemsArr.length; i++) {
                    if (parseInt(compareItemsArr[i]) == parseInt(id)) {
                        compareItemsArr.splice(i, 1);
                    }
                }
                elem.closest('.card-icons').classList.remove('addedToCompare');
            } else {
                compareItemsArr.push(id);
                elem.closest('.card-icons').classList.add('addedToCompare');
            }
            // if(compareItemsArr.indexOf(id) == -1) {
            //     compareItemsArr.push(id);
            //     elem.parentElement.classList.add('addedToCompare');
            // }
            localStorage.setItem('vzo_compare'+catId,compareItemsArr);
            var compareItemsByCats = null;
            for (let i = 1; i < 12; i++) {
                var compareItemsByCat = localStorage.getItem('vzo_compare' + i);
                if (compareItemsByCat != null && compareItemsByCat != '') {
                    compareItemsByCats += compareItemsByCat.split(',').length;
                }
            }
            setCompareBlockDynamicData(compareItemsByCats,true,e);
            $$('.compare-items-count')[0].innerText = 1 + Number($$('.compare-items-count')[0].innerText);
            var logo = elem.closest('.card').querySelectorAll('.logo img')[0].attributes['src'].nodeValue;
        },false)
    }
}

// ???????????? ????????????????
function addPrintBtnsClick(card) {
    if(card.getElementsByClassName('print-btn-default').length != 0) {
        var el = card.getElementsByClassName('print-btn')[0];
        el.addEventListener('click', () => {
            let card = el.closest('.card');
            let cardID = card.id;
            if (cardID != null) {
                cardID = cardID.replace('card-', '');
                window.open('/card-print/'+cardID, '_blank').focus();
            }
        });
    }
    if(card.getElementsByClassName('print-btn-insurance').length != 0) {
        var el = card.getElementsByClassName('print-btn')[0];
        el.addEventListener('click', () => {
            let card = el.closest('.card');
            let cardID = card.id;
            if (cardID != null) {
                cardID = cardID.replace('card-', '');
                window.open('/card-insurance-print/'+cardID, '_blank').focus();
            }
        });
    }
}

function addOrRemoveFromFavorites(card) {
    if(card.getElementsByClassName('addToFavorites').length != 0) {
        card.getElementsByClassName('addToFavorites')[0].addEventListener('click', function (e) {
            e.preventDefault();
            var elem = e.target.closest('svg');
            var favorites = localStorage.getItem('vzo');
            if (favorites == null) {
                favoritesArr = Array();
            } else {
                favoritesArr = favorites.split(',');
            }
            var id = elem.closest('.card').id.substr(5);
            if(elem.closest('.card-icons').classList.contains('addedToFavorites')){
                for (i = 0; i < favoritesArr.length; i++) {
                    if (parseInt(favoritesArr[i]) == parseInt(id)) {
                        favoritesArr.splice(i, 1);
                    }
                }
            } else {
                favoritesArr.push(id);
            }

            if(favoritesArr && favoritesArr == '') {
                favorites = localStorage.removeItem('vzo');
                if($$('.block-with-back-link').length != 0){
                    $$('.block-with-back-link')[0].style.display = 'block';
                    if($$('.lead').length != 0){
                        $$('.lead')[0].style.display = 'block';
                    }
                    if($$('#favorites-clear').length != 0){
                        $$('#favorites-clear')[0].style.display = 'none';
                    }
                }
            } else {
                favorites = localStorage.setItem('vzo',favoritesArr);
            }

            if($$('.fav-items-count').length != 0) {
                if(favoritesArr != null && favoritesArr.length != 0) {
                    $$('.fav-items-count')[0].innerText = favoritesArr.length;
                    $$('.fav-items-count')[0].style.display = 'flex';
                    $$('.icon-for-show-notice')[0].classList.add('show-favorites-cards');
                } else {
                    $$('.fav-items-count')[0].style.display = 'none';
                    $$('.icon-for-show-notice')[0].classList.remove('show-favorites-cards');
                }
            }
            if(window.location.href.indexOf('favorites') != -1) {
                $$('#'+card.id)[0].remove();
            }
            elem.closest('.card-icons').classList.toggle('addedToFavorites')
        })
    }
}

function addCardsBtnsEvents() {
    $$('.card').forEach((card) => {
        addTabsClick(card);
        addOrRemoveFromFavorites(card);
        addCardsMoreBtnsClick(card);
        addToCompareBtnsClick(card);
        addPrintBtnsClick(card);
        if (typeof showModalBlock === "function") {
            showModalBlock();
        }
        let cardIconsBlock = card.getElementsByClassName('card-icons')[0];
        if($$('.compare-block').length != 0) {
            var catId = $$('.compare-block')[0].attributes['data-cat'].value;
            var comparingItems = localStorage.getItem('vzo_compare'+ catId);
            if(comparingItems != null) {
                comparingItems = comparingItems.split(',');
            }
            if(comparingItems != null && comparingItems.indexOf(card.id.substr(5)) != -1) {
                cardIconsBlock.classList.add('addedToCompare')
            } else {
                if(cardIconsBlock.classList.contains('addedToCompare')) {
                    cardIconsBlock.classList.remove('addedToCompare');
                }
            }
        }
        var favorites = localStorage.getItem('vzo');
        if(favorites != null) {
            favorites = favorites.split(',');
        }
        if(favorites != null && favorites.indexOf(card.id.substr(5)) != -1) {
            cardIconsBlock.classList.add('addedToFavorites')
        } else {
            if(cardIconsBlock.classList.contains('addedToFavorites')) {
                cardIconsBlock.classList.remove('addedToFavorites');
            }
        }
        var rkoTabScrollingBlock = card.getElementsByClassName('rko-scrolling-tab-block');
        var rkoTabScrollingRight = card.getElementsByClassName('rko-tab-right-btn');
        var rkoTabScrollingLeft = card.getElementsByClassName('rko-tab-left-btn');
        if(rkoTabScrollingBlock.length !=0 && rkoTabScrollingRight.length != 0 && rkoTabScrollingLeft.length != 0) {
            rkoTabScrollingRight[0].addEventListener('click',function (e){
                rkoTabScrollingBlock[0].scrollLeft += 200;
                rkoTabScrollingRight[0].style.display = 'none';
                rkoTabScrollingLeft[0].style.display = 'block';
            })
            rkoTabScrollingLeft[0].addEventListener('click',function (e){
                rkoTabScrollingBlock[0].scrollLeft -= 200;
                rkoTabScrollingLeft[0].style.display = 'none';
                rkoTabScrollingRight[0].style.display = 'block';
            })
        }
    });
}
document.addEventListener('DOMContentLoaded', function(){
    if($$('.card').length != 0) {
        addCardsBtnsEvents();
    }
});

