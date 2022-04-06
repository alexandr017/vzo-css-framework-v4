$$('.footer-social-link').forEach((el) => {
    el.addEventListener('click', () => {
        let link = el.getAttribute('data-href');
        window.open(link, '_blank').focus();
    });
});
