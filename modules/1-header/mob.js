$$('#menuButton')[0].addEventListener('click', () => {
    let headerMenuInner = $$('.header-menu-inner')[0];
    headerMenuInner.classList.toggle('active-menu');

    headerMenuInner.closest('.container').classList.toggle('header-active');
    document.body.classList.toggle('fixed-body')
});

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

initMobMenu();
function initMobMenu(){
    let button =  $$('#menuButton')[0];
    button.addEventListener('click', () => {
        button.classList.toggle('is-active');
    });
}


$$('#searchButtonShowForm')[0].addEventListener('click', () => {
    let form = $$('.header-search-form-wrap')[0];
    form.classList.add('show-form');
});

$$('#searchButtonHideForm')[0].addEventListener('click', () => {
    let form = $$('.header-search-form-wrap')[0];
    form.classList.remove('show-form');

    let headerMenuInner = $$('.header-menu-inner')[0];
    headerMenuInner.classList.remove('active-menu');
    headerMenuInner.closest('.container').classList.remove('header-active');
    document.body.classList.remove('fixed-body')
    $$('#menuButton')[0].classList.remove('is-active');
});