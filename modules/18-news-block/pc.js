document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', (event) => {
        var newsLeftBlock = $$('.news-main-block-left-side');
        if(window.scrollY > 0) {
            if(newsLeftBlock.length != 0) {
                newsLeftBlock =newsLeftBlock[0];
                newsLeftBlock.classList.add('moveLeftSideToTheTop');
                var footerHeight = $$('footer')[0].clientHeight+30;
                var pageHeight = document.body.scrollHeight;
                if(window.scrollY + footerHeight >= pageHeight - footerHeight) {
                    newsLeftBlock.style.position = 'absolute';
                } else {
                    newsLeftBlock.style.position = 'fixed';
                }
            }
        } else {
            newsLeftBlock[0].classList.remove('moveLeftSideToTheTop');
        }
    });
});
