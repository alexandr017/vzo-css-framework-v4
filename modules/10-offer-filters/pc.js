let offerFiltersBlock = $$('.offer-filter-wrap');
offerFiltersBlock.forEach(function (value, index) {
    let buttonShow = value.querySelector('.filters-arrow-down'),
        buttonHide = value.querySelector('.filters-arrow-up'),
        offerFilterItem = value.querySelector('.offer-filters-item'),
        openBlock = value.querySelector('.offer-filters-title'),
        hiddenBlock = value.querySelector('.offer-filters-hidden-block');

    openBlock.addEventListener('click', event => {
        if(offerFilterItem.classList.contains('active-offer-filter')){
            buttonShow.style.display = 'block';
            buttonHide.style.display = 'none';
            hiddenBlock.classList.remove('active-offer-filter');
            offerFilterItem.classList.remove('active-offer-filter');
        }else {
            document.querySelectorAll('.offer-filters-item').forEach(function (value, index) {
                value.classList.remove('active-offer-filter');
                value.querySelector('.offer-filters-hidden-block').classList.remove('active-offer-filter');
                value.querySelector('.filters-arrow-down').style.display = 'block';
                value.querySelector('.filters-arrow-up').style.display = 'none';
            });
            buttonHide.style.display = 'block';
            buttonShow.style.display = 'none';
            hiddenBlock.classList.add('active-offer-filter');
            offerFilterItem.classList.add('active-offer-filter');
        }
    });
});

document.addEventListener('click',function (e){
    if(e.target.closest('.active-offer-filter') == null && $$('.active-offer-filter').length != 0) {
        var activeOffersBlock = $$('.active-offer-filter');
        for(let i=0;i<activeOffersBlock.length;i++){
            if(activeOffersBlock[i].getElementsByClassName('filters-arrow-up').length != 0) {
                activeOffersBlock[i].getElementsByClassName('filters-arrow-up')[0].style.display = 'none';
                activeOffersBlock[i].getElementsByClassName('filters-arrow-down')[0].style.display = 'block';
            }
            activeOffersBlock[i].classList.remove('active-offer-filter');
        }
    }
},false)