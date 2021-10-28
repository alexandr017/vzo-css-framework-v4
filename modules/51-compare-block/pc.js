document.addEventListener('DOMContentLoaded', function(){
    var catId = $$('.compare-block')[0].attributes['data-cat'].value;
    // var favorites = localStorage.setItem('vzo_compare'+catId,'');
    var favorites = localStorage.getItem('vzo_compare'+catId);
    if(favorites != null) {
        var favoritesArr = favorites.split(',');
        setCompareBlockDynamicData(favoritesArr.length);
    }
    $$('.close-compare-block')[0].addEventListener('click', function () {
        $$('.compare-block')[0].style.display = 'none';
    })
});
function setCompareBlockDynamicData(compareItemsCount) {
    if(compareItemsCount > 9) {
        compareItemsCount = Number(compareItemsCount.toString().slice(-1));
    }
    var endOfCompareWord = '';
    if(compareItemsCount > 1) {
        $$('.count-of-comparing-items')[0].innerText = '+' + (compareItemsCount-1);
    }
    endOfCompareWord = (compareItemsCount == 1) ? 'ие' : (compareItemsCount <= 4 && compareItemsCount != 0) ? 'ия' : (compareItemsCount == 0 || compareItemsCount >=5 && compareItemsCount <=9) ? 'ий' : '';
    $$('.compare-block-text')[0].innerText = compareItemsCount + ' предложен'+endOfCompareWord+' к сравнению';
    if(compareItemsCount > 0) {
        $$('.compare-block')[0].style.display = 'flex';
    }
    if(compareItemsCount > 1) {
        $$('.count-of-comparing-items')[0].style.display = 'flex';
    } else {
        $$('.count-of-comparing-items')[0].style.display = 'none';
    }
}