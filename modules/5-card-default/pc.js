if(document.getElementsByClassName('card-slider-block').length>0){
    slideShow({
        element:'.card-slider-block',
        slidesToShow:4,
        slidesToScroll:1,
        circleScroll:false,
        height:'50',
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

$$('.tab-wrap').forEach((e) => {
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
});

let cardHiddenBlock = $$('.card-body');
cardHiddenBlock.forEach(function (value, index) {
    let cardButtonShow = value.querySelector('.card-more'),
        cardButtonHide = value.querySelector('.card-less'),
        hiddenCardInfoBlock = value.querySelector('.hidden-card-info');
    cardButtonShow.addEventListener('click', event => {
        cardButtonHide.style.display = 'flex';
        cardButtonShow.style.display = 'none';
        hiddenCardInfoBlock.style.display = 'block';
    });
    cardButtonHide.addEventListener('click', event => {
        cardButtonShow.style.display = 'flex';
        cardButtonHide.style.display = 'none';
        hiddenCardInfoBlock.style.display = 'none';
    });
});

var addToCompareBtns = $$('.addToCompare');
for(let i=0;i<addToCompareBtns.length;i++) {
    addToCompareBtns[i].addEventListener('click',function (e) {
        e.preventDefault();
        var elem = e.target.closest('svg');
        var catId = $$('.compare-block')[0].attributes['data-cat'].value;
        favorites = localStorage.getItem('vzo_compare'+ catId);
        if (favorites == null || favorites == '') {
            favoritesArr = Array();
        } else {
            favoritesArr = favorites.split(',');
            if(favoritesArr.length == 10){
                alert('Нельзя добавлять более 10 карточек одного раздела в сравнение');
                return;
            }
        }
        var id = elem.attributes['data-id'].value;
        if(favoritesArr.indexOf(id) == -1) {
            favoritesArr.push(id);
        }
        localStorage.setItem('vzo_compare'+catId,favoritesArr);

        setCompareBlockDynamicData(favoritesArr.length);
        var logo = elem.closest('.card').querySelectorAll('.logo img')[0].attributes['src'].nodeValue;
    })
}


// печать карточки
$$('.print-btn').forEach((el) => {
    el.addEventListener('click', () => {
        let card = el.closest('.card');
        let cardID = card.id;
        if (cardID != null) {
            cardID = cardID.replace('card-', '');
            window.open('/card-print/'+cardID, '_blank').focus();
        }
    });
});

