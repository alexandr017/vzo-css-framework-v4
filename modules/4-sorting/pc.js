let selectMenu = document.querySelectorAll('.selected-item');
let optionMenu = document.querySelectorAll('.option');
let indexItem = 1;
let elemsForSort = [];
let elemsForSortByAnswer = [];
if(elemsForSort.length == 0){
    if(document.querySelectorAll('[data-sort]').length != 0) {
        document.querySelectorAll('[data-sort]').forEach(item => {
            if(elemsForSort[item.dataset['sort']] == undefined) {
                elemsForSort[item.dataset['sort']] = [];
            }
            if(elemsForSortByAnswer['0'] == undefined) {
                elemsForSortByAnswer['0'] = [];
            }
            if(elemsForSortByAnswer['1'] == undefined) {
                elemsForSortByAnswer['1'] = [];
            }
            elemsForSort[item.dataset['sort']].push(item);
            if(item.dataset['1'] == 1) {
                elemsForSortByAnswer['0'].push(item);
            } else {
                elemsForSortByAnswer['1'].push(item);
            }
        })
    }
}
function sortedItems(i,count,withAnswer = false) {
    let sorteditems = '';
    if(withAnswer == true){
        elemsForSort = elemsForSortByAnswer;
    }
    if(elemsForSort[i]) {
        for(let j =0; j<elemsForSort[i].length;j++) {
            if(count<10){
                elemsForSort[i][j].classList.remove('hiddenStyle');
            } else {
                elemsForSort[i][j].classList.add('hiddenStyle');
            }
            if(typeof moveBtnClick === "function"){
                let moveBtn = elemsForSort[i][j].getElementsByClassName('review-btn-wrap-block')[0];
                moveBtn.setAttribute('onclick', 'moveBtnClick(this)');
            }
            sorteditems += elemsForSort[i][j].outerHTML;
            count++;
        }
    }
    return {'sorteditems':sorteditems,'count':count};
}
function sortItems(dataType) {
    let sortedItemsStr = '';
    let count = 0;
    if(elemsForSort.length != 0 && dataType == 'up') {
        for(let i = elemsForSort.length-1;i>0;i--) {
            let sortFnRes = sortedItems(i,count);
            sortedItemsStr += sortFnRes.sorteditems;
            count = sortFnRes.count;
        }
    } else if(elemsForSort.length != 0 && dataType == 'down') {
        for(let i = 0;i<elemsForSort.length;i++) {
            let sortFnRes = sortedItems(i,count);
            sortedItemsStr += sortFnRes.sorteditems;
            count = sortFnRes.count;
        }
    } else if(elemsForSortByAnswer.length != 0 && dataType == 'withAnswer') {
        for(let i = 0;i<elemsForSortByAnswer.length;i++) {
            let sortFnRes = sortedItems(i,count,true);
            sortedItemsStr += sortFnRes.sorteditems;
            count = sortFnRes.count;
        }
    }

    if(document.querySelectorAll('.reviews .reviewsBlock').length != 0) {
        let reviewsBlock = document.querySelectorAll('.reviews .reviewsBlock');
        reviewsBlock[0].innerHTML = '';
        reviewsBlock[0].insertAdjacentHTML( 'beforeend', sortedItemsStr);
    }
}
if(document.getElementsByClassName('sort').length != 0) {
    var dataType = document.querySelectorAll('.sort .selected-item')[0].dataset['type'];
    sortItems(dataType);
}
selectMenu.forEach(a => {
    a.addEventListener('click', b => {
        let nextEl = b.target.nextElementSibling;
        nextEl.classList.toggle('toggleSelect');
        nextEl.style.zIndex = indexItem++;
        a.classList.toggle('openSelect');
    })
});
optionMenu.forEach(a => {
    a.addEventListener('click', b => {
        b.target.parentElement.classList.remove('toggleSelect');
        let parentEl = b.target.closest('.select').children[0];
        let dataType = b.target.getAttribute('data-type');
        parentEl.setAttribute('data-type', dataType);
        parentEl.innerText = b.target.innerText;
        parentEl.classList.remove('openSelect');
        sortItems(dataType);
    })
});
document.addEventListener('click',function (e) {
    if(!e.target.classList.contains('openSelect')){
        var openedSelect = document.getElementsByClassName('openSelect');
        if(openedSelect.length != 0) {
            openedSelect[0].classList.remove('openSelect');
            document.querySelectorAll('.sort .toggleSelect')[0].classList.remove('toggleSelect');
        }
    }
},false)
