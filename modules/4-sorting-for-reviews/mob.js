let selectMenu = document.querySelectorAll('.selected-item');
let indexItem = 1;
selectMenu.forEach(a => {
    a.addEventListener('click', b => {
        let nextEl = b.target.nextElementSibling;
nextEl.classList.toggle('toggleSelect');
nextEl.style.zIndex = indexItem++;
a.classList.toggle('openSelect');
})
});

let optionMenu = document.querySelectorAll('.option');
let elements = $$('.block-reviews');
let sortingItemsBlock = $$('.reviewsBlock')[0];
if($$('.def-selected-item').length != 0){
    let selCat = $$('.def-selected-item')[0].dataset.val;
}

optionMenu.forEach(a => {
    a.addEventListener('click', b => {
        sortingItemsBlock.style.flexDirection = 'column';
b.target.parentElement.classList.remove('toggleSelect');
let parentEl = b.target.closest('.select').children[0];
let dataType = b.target.getAttribute('data-type');
parentEl.setAttribute('data-type', dataType);
parentEl.innerText = b.target.innerText;
parentEl.classList.remove('openSelect');
reviewsSortFilter();
})
});
document.addEventListener('click', function (e) {
    if (e.target.closest('.default-select') == null) {
        if (document.getElementsByClassName('def-selected-item').length != 0 && document.getElementsByClassName('def-selected-dropdown').length != 0) {
            let selectedItem = document.getElementsByClassName('def-selected-item')[0];
            let selDropdown = document.getElementsByClassName('def-selected-dropdown')[0];
            selDropdown.classList.remove('selectToggle');
            selectedItem.classList.remove('selectOpen');
            selectedItem.dataset.type = 'up';
        }
    }
    if (e.target.closest('.sort') == null) {
        if (document.getElementsByClassName('selected-item').length != 0 && document.getElementsByClassName('selected-dropdown').length != 0) {
            let selectedItem = document.getElementsByClassName('selected-item')[0];
            let selDropdown = document.getElementsByClassName('selected-dropdown')[0];
            selDropdown.classList.remove('toggleSelect');
            selectedItem.classList.remove('openSelect');
            selectedItem.dataset.type = 'up';
        }
    }
})
