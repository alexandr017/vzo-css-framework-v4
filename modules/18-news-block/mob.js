let selectMenu = document.querySelectorAll('.news-cat-active')[0];
let optionMenu = document.querySelectorAll('.news-cats-menu')[0];

selectMenu.addEventListener('click', () => {
    selectMenu.classList.toggle('openCatBlock');
    optionMenu.classList.toggle('toggleCatBlock');
});