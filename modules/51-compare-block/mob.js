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
    if($$('.close-compare-block').length != 0) {
        $$('.close-compare-block')[0].addEventListener('click', function () {
            $$('.compare-block')[0].style.display = 'none';
        })
    }
});
document.addEventListener('scroll', function(e){
    let compareBlock = $$('.compare-block');
    if(compareBlock.length != 0) {
        if(e.target.scrollingElement.scrollTop >= 50) {
            compareBlock[0].style.top = 0;
        } else {
            compareBlock[0].style.top = '65px';
        }
    }
});
function setCompareBlockDynamicData(compareItemsCount,newAdded = false) {
    var endOfCompareWord = '';
    endOfCompareWord = (compareItemsCount == 1) ? 'ие' : (compareItemsCount <= 4 && compareItemsCount != 0) ? 'ия' : (compareItemsCount == 0 || compareItemsCount >=5 && compareItemsCount <=9) ? 'ий' : '';
    if($$('.compare-block-text').length != 0) {
        $$('.compare-block-text')[0].innerText = '+'+compareItemsCount + ' предложен'+endOfCompareWord+' к сравнению';
    }
    if(compareItemsCount > 0 && $$('.compare-block').length != 0 && newAdded == true) {
        $$('.compare-block')[0].style.display = 'flex';
    }
}
