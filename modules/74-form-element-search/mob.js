//
// let paginationBlock = document.createElement('div');
// paginationBlock.classList.add('pagination');
// let offerListBody = document.querySelector('.offers-list');
// offerListBody.appendChild(paginationBlock);
//
// let searchItemEl = document.querySelectorAll('.search-item'),
//     paginationLink = document.createElement('a'),
//     searchBox = $$('.search-block-1')[0].querySelectorAll('input')[0],
//     messageBlock = document.createElement('div');
// paginationLink.classList.add('pagination-inner-link');
// messageBlock.innerText = 'По Вашему запросу не найдено совпадений';
//
// let setDisplay = (searchItems, val) => Array.from(searchItems).forEach(searchItem => searchItem.style.display = val);
//
// let createPaginationBlock = searchItems => {
//     searchItems.forEach((searchItem, i) => searchItem.style.display = i > 9 ? 'none' : '');
//     Array.from(paginationBlock.children).forEach(el => el.remove());
//     let countPages = Math.ceil(searchItems.length / 10);
//     for (let i = 0; i < countPages; i++) {
//         paginationBlock.appendChild(paginationLink.cloneNode(true));
//     }
//     for (let i = 0; i < countPages; i++) {
//         document.querySelectorAll('.pagination-inner-link')[i].innerText = (i+1).toString();
//         document.querySelectorAll('.pagination-inner-link')[i].addEventListener('click', () => {
//             setDisplay(searchItemEl, 'none');
//             let prevPage = i* 10;
//             let nextPage = i * 10 + 10;
//             Array.from(searchItems).forEach((searchItem, i) => searchItem.style.display = i >= prevPage && i < nextPage ? '' : 'none');
//         })
//     }
//     if (document.querySelector('.pagination-inner-link')) {
//         document.querySelector('.pagination-inner-link').classList.add('pagination-current-page');
//         document.querySelectorAll('.pagination-inner-link').forEach(el => {
//             el.addEventListener('click', () => {
//                 document.querySelectorAll('.pagination-inner-link').forEach(el => el.classList.remove('pagination-current-page'));
//                 el.classList.add('pagination-current-page');
//             });
//         })
//     }
// };
//
//
// function search(){
//     setDisplay(searchItemEl, 'none');
//     let matchedElements = [];
//     messageBlock.remove();
//     Array.from(searchItemEl).forEach(searchItem => {
//         searchItem.querySelectorAll('.search-title').forEach(item => {
//             if (item.innerText.toLowerCase().includes(searchBox.value.toLowerCase())) {
//                 matchedElements.push(searchItem);
//             }
//         });
//         createPaginationBlock(matchedElements);
//     });
//     setDisplay(matchedElements, '');
//     if (matchedElements.length === 0) {
//         document.querySelector('.offers-list').appendChild(messageBlock);
//     }
//     createPaginationBlock(matchedElements);
//
// }
//
//
// createPaginationBlock(searchItemEl);
//
// window.addEventListener('keyup', search);

document.addEventListener('DOMContentLoaded', function(){
    $$('.search-block-1')[0].getElementsByClassName('input-text')[0].addEventListener('keyup',function (e) {
        searchItems(e.target.value);
    })
});
function searchItems(searchHint){
    var search_hint = searchHint;
    if(search_hint.indexOf('банк') == -1 && offersListItemsArr.length != 0){
        var offersListItemsArrAfterSearch = [];
        offersListItemsArr.forEach(function (item) {
            if (item.getElementsByClassName('search-title')[0].innerText.toLowerCase().indexOf(searchHint.toLowerCase()) == -1) {
                item.classList.add('hiddenStyle');
            } else {
                item.classList.remove('hiddenStyle');
                offersListItemsArrAfterSearch.push(item);
            }
        })

        var pagesCount = Math.ceil(offersListItemsArrAfterSearch.length/10);
        if(offersListItemsArrAfterSearch.length != 0) {
            page(1,offersListItemsArrAfterSearch);
            window.itemsArr = offersListItemsArrAfterSearch;
            $$('.pagination')[0].style.display = 'flex';
        } else {
            $$('.offers-list')[0].innerHTML = "<p>По Вашему запросу не найдено совпадений</p>";
            $$('.pagination')[0].style.display = 'none';
            return;
        }
    }
}