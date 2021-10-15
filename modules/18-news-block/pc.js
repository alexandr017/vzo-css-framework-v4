document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', (event) => {
        if(window.scrollY > 0) {
            $$('.news-main-block-left-side')[0].classList.add('moveLeftSideToTheTop');
        } else {
            $$('.news-main-block-left-side')[0].classList.remove('moveLeftSideToTheTop');
        }
    });
});
