let showContentMenu = $$('.content-menu-inner');
showContentMenu.forEach(function (value, index) {
    let buttonShow = value.querySelector('.content-menu-btn'),
        buttonHide = value.querySelector('.close-content-menu-btn'),
        allBlock = value.querySelector('.content-menu-hidden-block');

    buttonShow.addEventListener('click', event => {
        allBlock.style.display = 'block';
        buttonHide.style.display = 'block';
        buttonShow.style.display = 'none';
    });

    buttonHide.addEventListener('click', event => {
        allBlock.style.display = 'none';
        buttonShow.style.display = 'block';
        buttonHide.style.display = 'none';
    });
});