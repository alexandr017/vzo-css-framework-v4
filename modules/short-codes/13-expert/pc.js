let hiddenBlock = document.querySelectorAll('.data-more-less-inner');
hiddenBlock.forEach(function (value, index) {
    let buttonShow = value.querySelector('.button_show'),
        buttonHide = value.querySelector('.button_hide'),
        gradientBlock = value.querySelector('.data-more-less-body'),
        hiddenText = value.querySelector('.hiddenInfo');
    buttonShow.addEventListener('click', event => {
        hiddenText.style.display = 'inline';
        buttonHide.style.display = 'block';
        buttonShow.style.display = 'none';
        gradientBlock.classList.remove('active');
    });
    buttonHide.addEventListener('click', event => {
        hiddenText.style.display = 'none';
        buttonShow.style.display = 'block';
        buttonHide.style.display = 'none';
        gradientBlock.classList.add('active');
    });
});