document.addEventListener('DOMContentLoaded', function(){
    var compareItems = null;
    for (let i = 1; i < 12; i++) {
        var compareItemsByCat = localStorage.getItem('vzo_compare' + i);
        if (compareItemsByCat != null) {
            compareItems += compareItemsByCat.split(',').length;
        }
    }
    if(compareItems != null) {
        setCompareBlockDynamicData(compareItems);
    }
    $$('.close-compare-block')[0].addEventListener('click', function () {
        $$('.compare-block')[0].style.display = 'none';
    })
});

function setCompareBlockDynamicData(compareItemsCount) {
    var endOfCompareWord = '';
    endOfCompareWord = (compareItemsCount == 1) ? 'ие' : (compareItemsCount <= 4 && compareItemsCount != 0) ? 'ия' : (compareItemsCount == 0 || compareItemsCount >=5 && compareItemsCount <=9) ? 'ий' : '';
    $$('.compare-block-text')[0].innerText = '+'+compareItemsCount + ' предложен'+endOfCompareWord+' к сравнению';
    if(compareItemsCount > 0) {
        $$('.compare-block')[0].style.display = 'flex';
    }
}
