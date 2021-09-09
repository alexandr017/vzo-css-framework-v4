let offerFiltersBlock = $$('.offer-filter-wrap');
    offerFiltersBlock.forEach(function (value, index) {
    let buttonShow = value.querySelector('.filters-arrow-down'),
        buttonHide = value.querySelector('.filters-arrow-up'),
         offerFilterItem = value.querySelector('.offer-filters-item'),
        hiddenBlock = value.querySelector('.offer-filters-hidden-block');
    buttonShow.addEventListener('click', event => {
        document.querySelectorAll('.offer-filters-item').forEach(function (value, index) {
            value.querySelector('.offer-filters-hidden-block').style.display = 'none';
            value.style.zIndex = '0';
            value.style.position = 'inherit';
            value.querySelector('.filters-arrow-down').style.display = 'block';
            value.querySelector('.filters-arrow-up').style.display = 'none';
        });
        buttonHide.style.display = 'block';
        buttonShow.style.display = 'none';
        hiddenBlock.style.display = 'block';
        offerFilterItem.style.width = '255px';
        offerFilterItem .style.zIndex = '1';
        offerFilterItem .style.position = 'absolute';
    });
    buttonHide.addEventListener('click', event => {
        buttonShow.style.display = 'block';
        buttonHide.style.display = 'none';
        hiddenBlock.style.display = 'none';
        offerFilterItem.style.zIndex = '0';
        offerFilterItem.style.position = 'inherit';
    });
});


