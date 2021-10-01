$$('.card-compare-next')[0].addEventListener('click',function (e) {
    var nextBtn = $$('.card-compare-next')[0];
    var prevBtn = $$('.card-compare-prev')[0];
    var indexForItem = Number(nextBtn.attributes['data-click'].nodeValue);
    var transforrmPx = (indexForItem+1)*285;
    var compareBlock = e.target.closest('.card-compare-next').parentElement.getElementsByClassName('card-compare-block')[0];
    var itemsInCompareBlock = compareBlock.querySelectorAll('.card-compare-btns .btn').length;
    compareBlock.getElementsByClassName('card-compare-main-block')[0].style.transform = 'translatex(-'+transforrmPx+'px)';
    nextBtn.attributes['data-click'].nodeValue = indexForItem +1;
    if(indexForItem != 0) {
        prevBtn.attributes['data-click'].nodeValue = indexForItem-2;
    } else {
        prevBtn.attributes['data-click'].nodeValue = indexForItem;
    }
    prevBtn.style.display = 'block';
    if(indexForItem+3 >= itemsInCompareBlock-1) {
        nextBtn.style.display = 'none';
    }
    addBorderRadiusAfterNext(indexForItem,itemsInCompareBlock);
})
$$('.card-compare-prev')[0].addEventListener('click',function (e) {
    var prevBtn = $$('.card-compare-prev')[0];
    var nextBtn = $$('.card-compare-next')[0];
    nextBtn.style.display = 'block';
    nextBtn.attributes['data-click'].nodeValue = nextBtn.attributes['data-click'].nodeValue-1;
    var indexForItem = Number(prevBtn.attributes['data-click'].nodeValue);
    var transforrmPx = indexForItem*285;
    var compareBlock = e.target.closest('.card-compare-prev').parentElement.getElementsByClassName('card-compare-block')[0];
    var itemsInCompareBlock = compareBlock.querySelectorAll('.card-compare-btns .btn').length;
    compareBlock.getElementsByClassName('card-compare-main-block')[0].style.transform = 'translatex('+transforrmPx+'px)';
    prevBtn.attributes['data-click'].nodeValue = indexForItem +1;
    if(indexForItem == 0) {
        prevBtn.style.display = 'none';
    }
    // addBorderRadiusAfterPrev(indexForItem,itemsInCompareBlock);
})
function addBorderRadiusAfterNext(indexForItem,itemsInCompareBlock) {
    var itemsWithBorderRadius = $$('.compare-table-gray-bg');
    for(let i=0;i<itemsWithBorderRadius.length;i++) {
        if(indexForItem+3 <= itemsInCompareBlock-1) {
            itemsWithBorderRadius[i].children[indexForItem+2].style.borderRadius = 'unset';
            itemsWithBorderRadius[i].children[indexForItem+1].style.borderRadius = '15px 0 0 15px';
            itemsWithBorderRadius[i].children[indexForItem+3].style.borderRadius = '0 15px 15px 0';
        }
    }
}
// function addBorderRadiusAfterPrev(indexForItem,itemsInCompareBlock) {
//     var itemsWithBorderRadius = $$('.compare-table-gray-bg');
//     for(let i=0;i<itemsWithBorderRadius.length;i++) {
//         if(indexForItem+3 <= itemsInCompareBlock-1) {
//             itemsWithBorderRadius[i].children[indexForItem+1].style.borderRadius = 'unset';
//             // itemsWithBorderRadius[i].children[indexForItem].style.borderRadius = 'unset';
//             itemsWithBorderRadius[i].children[indexForItem].style.borderRadius = '15px 0 0 15px';
//             itemsWithBorderRadius[i].children[indexForItem+2].style.borderRadius = '0 15px 15px 0';
//         }
//     }
// }