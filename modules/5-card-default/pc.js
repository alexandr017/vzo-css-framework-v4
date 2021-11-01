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
        hiddenCardInfoBlock = value.querySelector('.hidden-card-info');
    cardButtonShow.addEventListener('click', event => {
        cardButtonHide.style.display = 'flex';
        cardButtonShow.style.display = 'none';
        event.target.parentElement.getElementsByClassName('card-slider-block')[0].classList.add('card-slider-init');
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
    var catId = $$('.compare-block')[0].attributes['data-cat'].value;
    elem.addEventListener('click',() => {
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
        if(compareItemsArr.indexOf(id) == -1) {
            compareItemsArr.push(id);
            elem.parentElement.classList.add('addedToCompare');
        }
        localStorage.setItem('vzo_compare'+catId,compareItemsArr);

        setCompareBlockDynamicData(compareItemsArr.length);
        var logo = elem.closest('.card').querySelectorAll('.logo img')[0].attributes['src'].nodeValue;
    },false)
}

// печать карточки
function addPrintBtnsClick(card) {
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
function addOrRemoveFromFavorites(card) {
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
        if(elem.parentElement.classList.contains('addedToFavorites')){
            for (i = 0; i < favoritesArr.length; i++) {
                if (parseInt(favoritesArr[i]) == parseInt(id)) {
                    favoritesArr.splice(i, 1);
                }
            }
        } else {
            favoritesArr.push(id);
        }

        favorites = localStorage.setItem('vzo',favoritesArr);
        console.log(localStorage.getItem('vzo',favoritesArr));
        elem.parentElement.classList.toggle('addedToFavorites')
    })
}

function addCardsBtnsEvents() {
    $$('.card').forEach((card) => {
        addTabsClick(card);
        addCardsMoreBtnsClick(card);
        addToCompareBtnsClick(card);
        addPrintBtnsClick(card);
        addOrRemoveFromFavorites(card);
        let cardIconsBlock = card.getElementsByClassName('card-icons')[0];
        if($$('.compare-block').length != 0) {debugger
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
    });
}
addCardsBtnsEvents();