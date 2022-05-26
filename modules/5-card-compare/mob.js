document.addEventListener('DOMContentLoaded', function(){
    if($$('.clearCompare').length != 0) {
        $$('.clearCompare')[0].addEventListener('click',function (e) {
            localStorage.removeItem('vzo_compare'+ $$('.card-compare-slider')[0].dataset['catid']);
            location.reload();
        });
        var compareItemsCategories = '';
        var compareItemsCount = null;
        for (let i = 1; i < 12; i++) {
            var compareItemsByCat = localStorage.getItem('vzo_compare' + i);
            if (compareItemsByCat != null) {
                var compareItemsCountByCat = compareItemsByCat.split(',').length;
                compareItemsCount += compareItemsCountByCat;
                var compareCategory = '';
                switch(i) {
                    case 1:
                        compareCategory = 'Займы';
                        break;
                    case 2:
                        compareCategory = 'РКО';
                        break;
                    case 4:
                        compareCategory = 'Кредиты';
                        break;
                    case 5:
                        compareCategory = 'Кредитные карты';
                        break;
                    case 6:
                        compareCategory = 'Дебетовые карты';
                        break;
                    case 7:
                        compareCategory = 'Долгосрочные займи';
                        break;
                    case 8:
                        compareCategory = 'Автокредиты';
                        break;
                    case 10:
                        compareCategory = 'Ипотеки';
                        break;
                    case 11:
                        compareCategory = 'Вклады';
                        break;
                    default:
                        compareCategory = 'Займы';
                        break;
                }
                compareItemsCategories += '<span class="tab-links text-center" data-cat="'+i+'">'+compareCategory+' ( '+compareItemsCountByCat+' )'+'</span>';
            }
        }
        if($$('.compare-items-tabs').length != 0) {
            $$('.compare-items-tabs')[0].innerHTML = compareItemsCategories;
        }
        if(compareItemsCount != null && $$('.compare-items-count').length != 0) {
            var compareItemsCountBlock = $$('.compare-items-count')[0];
            compareItemsCountBlock.innerHTML = compareItemsCount;
            compareItemsCountBlock.style.display = 'flex'
        }
    }

    if($$('.compare-items-tabs').length != 0) {
        var compareTabs = $$('.compare-items-tabs')[0].getElementsByClassName('tab-links');
        if(compareTabs.length != 0) {
            compareTabs[0].classList.add('on');
            for(let i=0; i<compareTabs.length;i++) {
                compareTabs[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    var elem = e.target;
                    elem.parentElement.getElementsByClassName('on')[0].classList.remove('on');
                    elem.classList.add('on');
                    addCompareActiveTabData();
                })
            }
        }
    }
    function addCompareActiveTabData() {
        var compareBlock = $$('.card-compare-slider')[0];
        var category = document.querySelectorAll('.compare-items-tabs .on')[0].dataset['cat'];
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
            compareBlock.dataset['catid'] = category;
            addCompareSliderBtns();
            $$('.clearCompare')[0].style.display = 'block';
            addClickToDeleteBtns();
        }).catch((err) => {
                console.log(err);
        })
        })
        }
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
                nextBtn.attributes['data-click'].nodeValue = indexForItem +1;
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
                var category = compareBlock.dataset['catid'];
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
    addCompareActiveTabData();
})

