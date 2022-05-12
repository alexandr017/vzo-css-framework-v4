document.addEventListener('DOMContentLoaded', function(){
    $$('.clear-compare')[0].addEventListener('click',function () {
        for (let i = 1; i < 12; i++) {
            localStorage.removeItem("vzo_compare"+ i);
            location.reload();
            $$('.compare-block')[0].style.display = 'none';
        }
    })

})


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

function setCompareBlockDynamicData(compareItemsCount,newAdded = false) {
    // if(compareItemsCount > 9) {
    //     compareItemsCount = Number(compareItemsCount.toString().slice(-1));
    // }
    var endOfCompareWord = '';
    if(compareItemsCount > 1) {
        $$('.count-of-comparing-items')[0].innerText = '+' + (compareItemsCount-1);
    }
    endOfCompareWord = (compareItemsCount == 1) ? 'ие' : (compareItemsCount <= 4 && compareItemsCount != 0) ? 'ия' : (compareItemsCount == 0 || compareItemsCount >=5 && compareItemsCount <=9) ? 'ий' : '';
    if($$('.compare-block-text').length != 0) {
        $$('.compare-block-text')[0].innerText = compareItemsCount + ' предложен'+endOfCompareWord+' к сравнению';
    }
    if(compareItemsCount > 0 && $$('.compare-block').length != 0 && newAdded == true) {
        $$('.compare-block')[0].style.display = 'flex';
    }
    if(compareItemsCount > 1) {
        $$('.count-of-comparing-items')[0].style.display = 'flex';
    } else {
        $$('.count-of-comparing-items')[0].style.display = 'none';
    }
}
