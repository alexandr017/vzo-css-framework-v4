let offerListBody = document.querySelector(".offers-list");
let paginationBlock = document.querySelector(".pagination");
let searchItemEl = Array.from(document.querySelectorAll(".search-item"));
let sortedItems = searchItemEl;
let currPage = 1;
window.addEventListener('keyup', e => {
    e.preventDefault();
    let keyword = document.querySelector(".input-text").value;
    if (keyword) {
        sortedItems = searchItemEl.filter(el => {
            return  el.querySelector(".search-title").innerText.toLowerCase().indexOf(keyword.toLowerCase()) > -1
        })

    } else {
        sortedItems = searchItemEl
    }
    currPage = 1;
    if (sortedItems.length !== 0) {
        paginationBlock.style.display = "flex";
        createPaginationBlock(sortedItems)
    } else {
        paginationBlock.style.display = "none";
        offerListBody.innerHTML = "<p>По Вашему запросу не найдено совпадений</p>"
    }
});
function paginateBlock(totalItems, currentPage = 1, pageSize = 10, maxPages = 6) {
    let totalPages = Math.ceil(totalItems / pageSize);
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    let startPage, endPage;
    if (totalPages <= maxPages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    let pagesEl = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pagesEl: pagesEl
    };
}
function createPaginationBlock(searchItemEl) {
    offerListBody.innerHTML = "";
    paginationBlock.innerHTML = "";
   let { totalItems, currentPage, pageSize, totalPages, startPage, endPage, startIndex, endIndex, pagesEl } = paginateBlock(searchItemEl.length, currPage, 10, 6);

    let paginateEl = pagesEl.map(el => {
        return `<a href="#" class="pagination-inner-link page ${currentPage === el && 'pagination-current-page'}" page="${el}">${el}</a>`
    }).join("");
    paginationBlock.innerHTML = paginateEl;
    let start = (currentPage - 1) * pageSize, end = currentPage * pageSize;
    searchItemEl.slice(start, end).forEach(el => {
        offerListBody.append(el);
    })
}

document.addEventListener('click', function (e) {
    let pagEl = e.target;
    if (pagEl.classList.contains("page")) {
        currPage = parseInt(pagEl.getAttribute("page"));
        createPaginationBlock(sortedItems)
    }
    if (pagEl.classList.contains("next")) {
        currPage += 1;
        createPaginationBlock(sortedItems)
    }
    if (pagEl.classList.contains("prev")) {
        currPage -= 1;
        createPaginationBlock(sortedItems)
    }
});
createPaginationBlock(sortedItems);