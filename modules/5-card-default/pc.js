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



