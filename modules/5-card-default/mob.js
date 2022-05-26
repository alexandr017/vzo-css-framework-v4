function cardSliderInit (elem){
    var cardSliderBlocks = document.querySelectorAll(".card-slider-init:not(.jsSlideMainBlock)");
    for (let i=0; i<cardSliderBlocks.length;i++) {
        cardSliderBlocks[i].classList.add('card-slider'+elem.id);
        slideShow({
            element:'.card-slider'+elem.id,
            slidesToShow:4,
            slidesToScroll:1,
            circleScroll:false,
            height:'90',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
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
        hiddenCardInfoBlock = value.querySelector('.card-hidden-block');
    cardButtonShow.addEventListener('click', event => {
        cardButtonHide.style.display = 'flex';
    cardButtonShow.style.display = 'none';
    if(event.target.parentElement.getElementsByClassName('card-slider-block').length != 0) {
        event.target.parentElement.getElementsByClassName('card-slider-block')[0].classList.add('card-slider-init');
    }
    cardSliderInit(event.target.parentElement.closest('.card'));
    hiddenCardInfoBlock.style.display = 'block';
    value.querySelector('.card-upd').style.display = 'flex';
});
    cardButtonHide.addEventListener('click', event => {
        cardButtonShow.style.display = 'flex';
    cardButtonHide.style.display = 'none';
    hiddenCardInfoBlock.style.display = 'none';
    value.querySelector('.card-upd').style.display = 'none';
});
}

function addToCompareBtnsClick (e){
    var elem = e.getElementsByClassName('addToCompare')[0];
    elem.addEventListener('click',() => addToCompareFunction(elem),false)
}

function addToCompareFunction(elem) {
    if($$('.compare-block').length != 0) {
        var catId = $$('.compare-block')[0].attributes['data-cat'].value;
        var compareItems = localStorage.getItem('vzo_compare'+ catId);
        if (compareItems == null || compareItems == '') {
            compareItemsArr = Array();
        } else {
            compareItemsArr = compareItems.split(',');
            if(compareItemsArr.length == 10){
                alert('Нельзя добавлять более 10 карточек одного раздела в сравнение');
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
        localStorage.setItem('vzo_compare'+catId,compareItemsArr);
        var compareItemsByCats = null;
        for (let i = 1; i < 12; i++) {
            var compareItemsByCat = localStorage.getItem('vzo_compare' + i);
            if (compareItemsByCat != null && compareItemsByCat != '') {
                compareItemsByCats += compareItemsByCat.split(',').length;
            }
        }
        setCompareBlockDynamicData(compareItemsByCats,true);
        // $$('.compare-items-count')[0].innerText = 1 + Number($$('.compare-items-count')[0].innerText);
        // var logo = elem.closest('.card').querySelectorAll('.logo img')[0].attributes['src'].nodeValue;
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
                }
            } else {
                favorites = localStorage.setItem('vzo',favoritesArr);
            }

            if($$('.fav-items-count').length != 0) {
                if(favoritesArr != null && favoritesArr.length != 0) {
                    $$('.fav-items-count')[0].innerText = favoritesArr.length;
                    $$('.fav-items-count')[0].style.display = 'flex';
                } else {
                    $$('.fav-items-count')[0].style.display = 'none';
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
    let cardIconsBlock = card.getElementsByClassName('card-icons')[0];
    if(cardIconsBlock != undefined) {
        if ($$('.compare-block').length != 0) {
            var catId = $$('.compare-block')[0].attributes['data-cat'].value;
            var comparingItems = localStorage.getItem('vzo_compare' + catId);
            if (comparingItems != null) {
                comparingItems = comparingItems.split(',');
            }
            if (comparingItems != null && comparingItems.indexOf(card.id.substr(5)) != -1) {
                cardIconsBlock.classList.add('addedToCompare')
            } else {
                if (cardIconsBlock.classList.contains('addedToCompare')) {
                    cardIconsBlock.classList.remove('addedToCompare');
                }
            }
        }
        var favorites = localStorage.getItem('vzo');
        if (favorites != null) {
            favorites = favorites.split(',');
        }
        if (favorites != null && favorites.indexOf(card.id.substr(5)) != -1) {
            cardIconsBlock.classList.add('addedToFavorites')
        } else {
            if (cardIconsBlock.classList.contains('addedToFavorites')) {
                cardIconsBlock.classList.remove('addedToFavorites');
            }
        }
    }
});
}
document.addEventListener('DOMContentLoaded', function(){
    if($$('.card').length != 0) {
        addCardsBtnsEvents();
    }
});


