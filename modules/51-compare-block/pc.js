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
            var compareItemsCatArr = compareItemsByCat.split(',');
            compareItems += compareItemsCatArr.length;
        }
    }
    if(compareItems != null) {
        setCompareBlockDynamicData(compareItems);
    }
    $$('.close-compare-block')[0].addEventListener('click', function () {
        $$('.compare-block')[0].style.display = 'none';
    })
});

function setCompareBlockDynamicData(compareItemsCount,newAdded = false,elem=null) {
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
    }else {
        $$('.compare-block')[0].style.display = 'none';
    }
    if(compareItemsCount > 1) {
        $$('.count-of-comparing-items')[0].style.display = 'flex';
    } else {
        $$('.count-of-comparing-items')[0].style.display = 'none';
    }
    if($$('.addedToCompare').length != 0) {
        if(elem != null && elem.querySelectorAll('.addedToCompare').length != 0) {
            var firsComparedItem = elem.querySelectorAll('.logo a img')[0].src;
        } else {
            var firsComparedItem = $$('.addedToCompare')[0].closest('.card').querySelectorAll('.logo a img')[0].src;
        }
        if($$('.compare-block').length != 0) {
            $$('.compare-block .compare-item img')[0].src = firsComparedItem;
        }
    }
}
