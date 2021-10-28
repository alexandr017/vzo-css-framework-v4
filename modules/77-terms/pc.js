document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', (event) => {
        var termsNav = $$('.terms-nav');
        if(termsNav.length != 0) {
            termsNav = termsNav[0]
            if(window.scrollY > 0) {
                termsNav.classList.add('moveToTheTop');
                var footerHeight = $$('footer')[0].clientHeight+30;
                var pageHeight = document.body.scrollHeight;
                if(window.scrollY + footerHeight >= pageHeight - footerHeight) {
                    termsNav.style.position = 'absolute';
                } else {
                    termsNav.style.position = 'fixed';
                }
            } else {
                termsNav.classList.remove('moveToTheTop');
            }
        }
    });
});
