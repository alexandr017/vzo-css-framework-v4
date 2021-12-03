let offerFiltersBlock = $$('.offer-filter-wrap');
offerFiltersBlock.forEach(function (value, index) {
    let buttonShow = value.querySelector('.filters-arrow-down'),
        buttonHide = value.querySelector('.filters-arrow-up'),
        offerFilterItem = value.querySelector('.offer-filters-item'),
        openBlock = value.querySelector('.offer-filters-title'),
        hiddenBlock = value.querySelector('.offer-filters-hidden-block');

    openBlock.addEventListener('click', event => {
        if(offerFilterItem.classList.contains('active')){
            buttonShow.style.display = 'block';
            buttonHide.style.display = 'none';
            hiddenBlock.classList.remove('active');
            offerFilterItem.classList.remove('active');
        }else {
            document.querySelectorAll('.offer-filters-item').forEach(function (value, index) {
                value.classList.remove('active');
                value.querySelector('.offer-filters-hidden-block').classList.remove('active');
                value.querySelector('.filters-arrow-down').style.display = 'block';
                value.querySelector('.filters-arrow-up').style.display = 'none';
            });
            buttonHide.style.display = 'block';
            buttonShow.style.display = 'none';
            hiddenBlock.classList.add('active');
            offerFilterItem.classList.add('active');
        }
    });
});

