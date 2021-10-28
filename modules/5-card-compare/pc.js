document.addEventListener('DOMContentLoaded', function(){
    var compareBlock = $$('.card-compare-slider')[0];
    var category = compareBlock.attributes['data-catId'].nodeValue;
    let compare = localStorage.getItem('vzo_compare'+ category);
    if(compare == null || compare == '' || compare == 'null'){
        compareBlock.innerText = 'Нет предложений для сравнения';
        $$('.clearCompare')[0].style.display = 'none';
    } else {
        let data = {
            '_token': document.getElementsByName('csrf-token')[0].attributes[1].nodeValue,
            'cards': compare,
            'id': category
        };
        fetch('/compare_load', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.text().then((value) => {
                compareBlock.innerHTML = value;
                addCompareSliderBtns();
                $$('.clearCompare')[0].style.display = 'block';
                addClickToDeleteBtns();
            }).catch((err) => {
                console.log(err);
            })
        })
    }

    function addCompareSliderBtns() {
        if($$('.card-compare-next').length != 0) {
            $$('.card-compare-next')[0].addEventListener('click',function (e) {
                var nextBtn = $$('.card-compare-next')[0];
                var prevBtn = $$('.card-compare-prev')[0];
                var indexForItem = Number(nextBtn.attributes['data-click'].nodeValue);
                var transforrmPx = (indexForItem+1)*285;
                var compareBlock = e.target.closest('.card-compare-next').parentElement.getElementsByClassName('card-compare-block')[0];
                var itemsInCompareBlock = compareBlock.querySelectorAll('.card-compare-btns .btn').length;
                addBorderRadiusAfterNext(indexForItem,itemsInCompareBlock);
                compareBlock.getElementsByClassName('card-compare-main-block')[0].style.transform = 'translatex(-'+transforrmPx+'px)';
                nextBtn.attributes['data-click'].nodeValue = indexForItem +1;debugger
                if(indexForItem != 0) {
                    prevBtn.attributes['data-click'].nodeValue = 0-indexForItem;
                } else {
                    prevBtn.attributes['data-click'].nodeValue = indexForItem;
                }
                prevBtn.style.display = 'block';
                if(indexForItem+3 >= itemsInCompareBlock-1) {
                    nextBtn.style.display = 'none';
                }
            })
        }
        if($$('.card-compare-prev').length != 0) {
            $$('.card-compare-prev')[0].addEventListener('click',function (e) {
                var prevBtn = $$('.card-compare-prev')[0];
                var nextBtn = $$('.card-compare-next')[0];
                nextBtn.style.display = 'block';
                nextBtn.attributes['data-click'].nodeValue = nextBtn.attributes['data-click'].nodeValue-1;
                var indexForItem = Number(prevBtn.attributes['data-click'].nodeValue);
                var transforrmPx = indexForItem*285;
                var compareBlock = e.target.closest('.card-compare-prev').parentElement.getElementsByClassName('card-compare-block')[0];
                var itemsInCompareBlock = compareBlock.querySelectorAll('.card-compare-btns .btn').length;
                addBorderRadiusAfterPrev(indexForItem,itemsInCompareBlock);
                compareBlock.getElementsByClassName('card-compare-main-block')[0].style.transform = 'translatex('+transforrmPx+'px)';
                prevBtn.attributes['data-click'].nodeValue = indexForItem +1;
                if(indexForItem == 0) {
                    prevBtn.style.display = 'none';
                }
            })
        }
    }
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
    function addBorderRadiusAfterPrev(indexForItem,itemsInCompareBlock) {
        var itemsWithBorderRadius = $$('.compare-table-gray-bg');
        for(let i=0;i<itemsWithBorderRadius.length;i++) {
            if(indexForItem+3 <= itemsInCompareBlock-1) {
                itemsWithBorderRadius[i].children[0-indexForItem].style.borderRadius = 'unset';
                itemsWithBorderRadius[i].children[0-indexForItem].style.borderRadius = '15px 0 0 15px';
                itemsWithBorderRadius[i].children[0-indexForItem+1].style.borderRadius = 'unset';
                itemsWithBorderRadius[i].children[0-indexForItem+2].style.borderRadius = '0 15px 15px 0';
            }
        }
    }
    function addClickToDeleteBtns() {
        var deleteFromCompareBtns = $$('.deleteFromCompare');
        for(let i=0;i<deleteFromCompareBtns.length;i++){
            deleteFromCompareBtns[i].addEventListener('click',function (e) {
                var cardId = e.target.closest('svg').dataset['id'];
                var compareBlock = $$('.card-compare-slider')[0];
                var category = compareBlock.attributes['data-catId'].nodeValue;
                let compare = localStorage.getItem('vzo_compare'+ category);
                compare = compare.split(',').filter((n) => {return n != cardId});
                if(compare.length == 0){
                    localStorage.removeItem('vzo_compare'+ category);
                }else{
                    localStorage.setItem('vzo_compare'+ category,compare.join(','));
                }
                location.reload();
            },false)
        }
    }
})

