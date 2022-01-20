var offersListItemsArr = null;
var itemsArrAfterSearch = false;
if($$('.offers-list').length != 0) {
    const offersListItems = $$('.offers-list')[0].children;
    offersListItemsArr = [...offersListItems];
}
function addPagesClick() {
    if($$('.pagination-inner-link').length != 0) {
        $$('.pagination-inner-link').forEach((elem)=>{
            elem.addEventListener('click',function (e) {
                page(e,itemsArrAfterSearch);
            },false)
        })
        $$('.pagination-current-page')[0].addEventListener('click',function (e) {
            page(e,itemsArrAfterSearch);
        }, false)
        if($$('.pagination-next-btn').length != 0) {
            $$('.pagination-next-btn')[0].addEventListener('click',function () {
                let pageNum = $$('.pagination-current-page')[0].innerText;
                page(Number(pageNum)+1,itemsArrAfterSearch);
            },false)
        }
        if($$('.pagination-prev-btn').length != 0) {
            $$('.pagination-prev-btn')[0].addEventListener('click',function () {
                let pageNum = $$('.pagination-current-page')[0].innerText;
                page(Number(pageNum)-1,itemsArrAfterSearch);
            },false)
        }
    }
}
function page(e,offersListItemsArrAfterSearch=false) {
    let pageNum = null;
    if(typeof e == 'number') {
        pageNum = e;
    } else {
        pageNum =  e.target.innerHTML;
    }
    if(offersListItemsArr != undefined && offersListItemsArr.length != 0) {
        let pageItems = '';
        for(let i=(pageNum-1)*10;i<pageNum*10;i++){
            if (offersListItemsArrAfterSearch != false) {
                itemsArrAfterSearch = [...offersListItemsArrAfterSearch];
                if(offersListItemsArrAfterSearch[i]) {
                    pageItems += offersListItemsArrAfterSearch[i].outerHTML;
                }
                pagesCount = Math.ceil(offersListItemsArrAfterSearch.length/10);
            } else {
                if(offersListItemsArr[i]){
                    pageItems += offersListItemsArr[i].outerHTML;
                }
                pagesCount = Math.ceil(offersListItemsArr.length/10);
            }
        }
        $$('.offers-list')[0].innerHTML = pageItems;
    }
    paintPages(pagesCount,pageNum);
}
function paintPages(pagesCount,pageNum) {
    pages = '';
    for(let i =1; i<=pagesCount; i++) {
        if(pageNum < 4) {
            if(i == pageNum){
                pages += '<span class="pagination-current-page">'+pageNum+'</span>'
            }else {
                pages += '<span class="pagination-inner-link flex">'+i+'</span>';
            }
            if(i==4){
                pages += '<span disabled="disable" class="pagination-dots flex">...</span><span class="pagination-inner-link flex">'+pagesCount+'</span>';
                break;
            }
        } else {
            if(Number(pageNum)+1 < pagesCount){
                pages = '<span class="pagination-inner-link flex">1</span><span disabled="disable" class="pagination-dots flex">...</span><span class="pagination-inner-link flex">'+(Number(pageNum)-1)+'</span><span class="pagination-current-page">'+pageNum+'</span><span class="pagination-inner-link flex">'+(Number(pageNum)+1)+'</span><span disabled="disable" class="pagination-dots flex">...</span><span class="pagination-inner-link flex">'+pagesCount+'</span>';
            } else {
                pages = '<span class="pagination-inner-link flex">1</span><span disabled="disable" class="pagination-dots flex">...</span>';
                for(let i=Number(pageNum)-1;i<=pagesCount;i++) {
                    if(i == pageNum){
                        pages += '<span class="pagination-current-page">'+pageNum+'</span>'
                    }else {
                        pages += '<span class="pagination-inner-link flex">'+i+'</span>';
                    }
                }
            }
            break;
        }
    }
    let leftBtn = '<span class="pagination-prev-btn prev-btn"><svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 8.5L9 16" stroke="#767F85" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    let rightBtn = '<span class="pagination-next-btn next-btn"><svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 16L9 8.5L1 1" stroke="#767F85" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    var pagesInner = pages;
    if(pageNum == 1) {
        leftBtn = '';
    }
    if(pageNum == pagesCount) {
        rightBtn = '';
    }

    if(pagesCount>5){
        pagesInner = leftBtn+pages+rightBtn;
    }
    $$('.pagination')[0].innerHTML = pagesInner;
    addPagesClick();
    return;
}
document.addEventListener('DOMContentLoaded', function(){
    page(1);
});