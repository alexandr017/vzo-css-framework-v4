let fullPage = document.body;
let scrollPageUp = "scroll-page-up";
let scrollPageDown = "scroll-page-down";
let scrollVal = 0;

window.addEventListener("scroll", () => {
    let searchBlock = $$('.search-block')[0];
    scrollSearchBlock = "scroll-search-block";

    let currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        fullPage.classList.remove(scrollPageUp);
        searchBlock.classList.remove(scrollSearchBlock);
        return;
    }
    if (currentScroll > scrollVal && !fullPage.classList.contains(scrollPageDown)) {
        fullPage.classList.remove(scrollPageUp);
        fullPage.classList.add(scrollPageDown);
        searchBlock.classList.remove(scrollSearchBlock);
    } else if (currentScroll < scrollVal && fullPage.classList.contains(scrollPageDown)) {
        fullPage.classList.remove(scrollPageDown);
        fullPage.classList.add(scrollPageUp);
        searchBlock.classList.add(scrollSearchBlock);
    }
    scrollVal = currentScroll;
});

function searchToggle(){
    let searchBlock = $$('.search-block')[0];

    let closeBtn = $$('.search-close-btn')[0];
    let iconSearch = $$('.icon-search')[0];
    if(searchBlock.style.display != 'none') {
        searchBlock.style.display = 'none';
        closeBtn.style.display = 'none';
        iconSearch.style.display = 'inline-block';
    } else {
        searchBlock.style.display = 'block';
        closeBtn.style.display = 'block';
        iconSearch.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', function(){
    var favorites = localStorage.getItem('vzo');
    if(favorites != null) {
        favorites = favorites.split(',');
        if(favorites.length != 0){
            $$('.fav-items-count')[0].innerHTML = favorites.length;
            $$('.fav-items-count')[0].style.display = 'flex';
        }
    }
    // var compareItems = localStorage.getItem('vzo_compare'+window.CATEGORY_ID);
    var compareItems = null;
    for (let i = 1; i < 12; i++) {
        var compareItemsByCat = localStorage.getItem('vzo_compare' + i);
        if (compareItemsByCat != null) {
            compareItems += compareItemsByCat.split(',').length;
        }
    }
    if($$('.compare-items-count').length != 0) {
        var compareItemsCountBlock = $$('.compare-items-count')[0];
        if(compareItems != null) {
            compareItemsCountBlock.innerHTML = compareItems;
            compareItemsCountBlock.style.display = 'flex';
        } else {
            compareItemsCountBlock.style.display = 'none';
        }
    }
});






