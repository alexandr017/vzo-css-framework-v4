let hiddenBlock = document.querySelectorAll('.data-more-less-inner');
hiddenBlock.forEach(function (value, index) {
    let buttonShow = value.querySelector('.button_show'),
        buttonHide = value.querySelector('.button_hide'),
        gradientBlock = value.querySelector('.data-more-less-body');
    buttonShow.addEventListener('click', event => {
        buttonHide.style.display = 'flex';
        buttonShow.style.display = 'none';
        gradientBlock.classList.remove('active');
        gradientBlock.classList.remove('hidden-info');

    });
    buttonHide.addEventListener('click', event => {
        buttonShow.style.display = 'flex';
        buttonHide.style.display = 'none';
        gradientBlock.classList.add('active');
        gradientBlock.classList.add('hidden-info');
    });
});
