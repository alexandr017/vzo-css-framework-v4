let toggleSortBlock = $$('.sort');
toggleSortBlock.forEach(function (value, index) {
    let hideSortLink = value.querySelectorAll('.sort-item'),
        showSortBlock = value.querySelector('.main-sort'),
        sortBlock = value.querySelector('.sub-nav_one-column');
    showSortBlock.addEventListener('mouseover', event => {
        sortBlock.style.display = 'block';
    });
    for (let i = 0; i < hideSortLink.length; i++) {
        if (hideSortLink[i].style.display !== 'none') {
            hideSortLink[i].addEventListener('click', event => {
                sortBlock.style.display = 'none';

            });
        }
    }
});