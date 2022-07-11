if($$('#menuButton').length != 0) {
    $$('#menuButton')[0].addEventListener('click', () => {
        let headerMenuInner = $$('.header-menu-inner')[0];
    headerMenuInner.classList.toggle('active-menu');

    headerMenuInner.closest('.container').classList.toggle('header-active');
    document.body.classList.toggle('fixed-body')
});
}

$$('.header-item-menu-title').forEach((el) => {
    el.addEventListener('click', () => {
        el.classList.toggle('active-menu-title');
el.parentNode.querySelectorAll('.header-sub-menu')[0].classList.toggle('active-sub-menu');
});
});


function closeMenuButton(){
    let button =  $$('#menuButton')[0];
    button.classList.toggle('is-active');
    setTimeout(function(){
        initMobMenu();
    },1000);
}

let searchClickBg = $$('.search-bg');
if(searchClickBg.length != 0) {
//change click for touchend
    searchClickBg[0].addEventListener('click',function (e) {
        if(!e.target.classList.contains('show-form')){
            let openedSearchBlock = document.getElementsByClassName('header-search-form-wrap');
            if(openedSearchBlock.length != 0) {
                openedSearchBlock[0].classList.remove('show-form');
            }
        }
    })
}

initMobMenu();
function initMobMenu(){
    let button =  $$('#menuButton');
    if(button.length != 0) {
        button[0].addEventListener('click', () => {
            button[0].classList.toggle('is-active');
    });
    }
}

if($$('#searchButtonShowForm').length != 0) {
    $$('#searchButtonShowForm')[0].addEventListener('click', () => {
        let form = $$('.header-search-form-wrap')[0];
    form.classList.add('show-form');
});
}
if($$('#searchButtonHideForm').length !=0){
    $$('#searchButtonHideForm')[0].addEventListener('click', () => {
        let form = $$('.header-search-form-wrap')[0];
    form.classList.remove('show-form');

    let headerMenuInner = $$('.header-menu-inner')[0];
    headerMenuInner.classList.remove('active-menu');
    headerMenuInner.closest('.container').classList.remove('header-active');
    document.body.classList.remove('fixed-body')
    $$('#menuButton')[0].classList.remove('is-active');
});
}

document.addEventListener('DOMContentLoaded', function(){
    var favorites = localStorage.getItem('vzo');
    if(favorites != null) {
        favorites = favorites.split(',');
        if(favorites.length != 0 && $$('.fav-items-count').length != 0){
            $$('.fav-items-count')[0].innerHTML = favorites.length;
            $$('.fav-items-count')[0].style.display = 'block';
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
            compareItemsCountBlock.style.display = 'block';
        } else {
            compareItemsCountBlock.style.display = 'none';
        }
    }
});
