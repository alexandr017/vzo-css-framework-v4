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
        a.addEventListener('click', b => {debugger
            sortingItemsBlock.style.flexDirection = 'column';
            b.target.parentElement.classList.remove('toggleSelect');
            let parentEl = b.target.closest('.select').children[0];
            let dataType = b.target.getAttribute('data-type');
            parentEl.setAttribute('data-type', dataType);
            parentEl.innerText = b.target.innerText;
            parentEl.classList.remove('openSelect');
            let elements = $$('.block-reviews');
            reviewsSortFilter();
        })
    });
