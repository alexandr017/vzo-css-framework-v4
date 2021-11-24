$$('#menuButton')[0].addEventListener('click', () => {
    $$('.header-menu-inner')[0].classList.toggle('active-menu');
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
    $$('.header-menu-inner')[0].classList.remove('active-menu');
});