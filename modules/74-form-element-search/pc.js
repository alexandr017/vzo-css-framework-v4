//родительский элемент должен иметь класс search-item, а текст в котором происходит поиск должен иметь класс search-title
// document.addEventListener('DOMContentLoaded', function(){
//     $$('.search-block-1')[0].getElementsByClassName('input-text')[0].addEventListener('keyup',function (e) {
//         searchItems(e.target.value);
//     })
// });
// function searchItems(searchHint){
    // var search_hint = searchHint;
    // if(search_hint.length >= 3 && search_hint.indexOf('банк') == -1){
    //     document.querySelectorAll('.search-item .search-title').forEach(function (item) {
    //         if(item.innerText.toLowerCase().indexOf(searchHint.toLowerCase()) == -1) {
    //             item.closest('.search-item').classList.add('hide_by_search_hint');
                // $$('.pagination')[0].style.display = 'none';
            // }else{
            //     item.closest('.search-item').classList.remove('hide_by_search_hint');
            //     $$('.pagination')[0].style.display = 'none';
            //     $$('.page-block').forEach(function (hideItem) {
            //         hideItem.style.display = 'block';;
            //     });
        //     }
        // })
    // } else {
    //     document.querySelectorAll('.page-block:not(.active_page)').forEach(function (item) {
    //         item.style.display = 'none'
    //     });
    //     $$('.hide_by_search_hint').forEach(function (hideItem) {
    //         hideItem.classList.remove('hide_by_search_hint');
    //     });
    //     if($$('.pagination').length != 0){
    //         $$('.pagination')[0].style.display = 'flex';
    //     }
    // }
// }
//

let paginationBlock = document.createElement('div');
paginationBlock.classList.add('pagination');
let offerListBody = document.querySelector('.offers-list');
offerListBody.appendChild(paginationBlock);

let searchItemEl = document.querySelectorAll('.search-item'),
    paginationLink = document.createElement('a'),
    searchBox = $$('.search-block-1')[0].querySelectorAll('input')[0],
    messageBlock = document.createElement('div');
    paginationLink.classList.add('pagination-inner-link');
    messageBlock.innerText = 'По Вашему запросу не найдено совпадений';

let setDisplay = (searchItems, val) => Array.from(searchItems).forEach(searchItem => searchItem.style.display = val);

let createPaginationBlock = searchItems => {
    searchItems.forEach((searchItem, i) => searchItem.style.display = i > 9 ? 'none' : '');
    Array.from(paginationBlock.children).forEach(el => el.remove());
    let countPages = Math.ceil(searchItems.length / 10);
    for (let i = 0; i < countPages; i++) {
        paginationBlock.appendChild(paginationLink.cloneNode(true));
}

    for (let i = 0; i < countPages; i++) {
        document.querySelectorAll('.pagination-inner-link')[i].innerText = (i+1).toString();
        document.querySelectorAll('.pagination-inner-link')[i].addEventListener('click', () => {
            setDisplay(searchItemEl, 'none');
            let prevPage = i* 10;
            let nextPage = i * 10 + 10;
            Array.from(searchItems).forEach((searchItem, i) => searchItem.style.display = i >= prevPage && i < nextPage ? '' : 'none');
        })
    }

    if (document.querySelector('.pagination-inner-link')) {
        document.querySelector('.pagination-inner-link').classList.add('pagination-current-page');
        document.querySelectorAll('.pagination-inner-link').forEach(el => {
            el.addEventListener('click', () => {
                document.querySelectorAll('.pagination-inner-link').forEach(el => el.classList.remove('pagination-current-page'));
                el.classList.add('pagination-current-page');
            });
        })
    }
};


function search(){
    setDisplay(searchItemEl, 'none');
    let matchedElements = [];
    messageBlock.remove();
    Array.from(searchItemEl).forEach(searchItem => {
        searchItem.querySelectorAll('.search-title').forEach(item => {
            if (item.innerText.toLowerCase().includes(searchBox.value.toLowerCase())) {
                matchedElements.push(searchItem);
            }
        });
        createPaginationBlock(matchedElements);
    });
    setDisplay(matchedElements, '');
    if (matchedElements.length === 0) {
        document.querySelector('.offers-list').appendChild(messageBlock);
    }
    createPaginationBlock(matchedElements);
}


createPaginationBlock(searchItemEl);

window.addEventListener('keyup', search);

