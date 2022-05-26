let selectedItem = document.querySelectorAll('.default-select .def-selected-item');
let selectOptions = document.querySelectorAll('.default-select .def-sel-option');
let indexItemForSelect = 1;

selectedItem.forEach(a => {
    a.addEventListener('click', b => {
        let nextEl = b.target.nextElementSibling;
nextEl.classList.toggle('selectToggle');
nextEl.style.zIndex = indexItemForSelect++;
a.classList.toggle('selectOpen');
},false)
});

selectOptions.forEach(a => {
    a.addEventListener('click', b => {
        b.target.parentElement.classList.remove('selectToggle');
let parentEl = b.target.closest('.select-block').children[0];
var dataVal = b.target.getAttribute('data-val');
parentEl.setAttribute('data-val', dataVal);
parentEl.innerText = b.target.innerText;
parentEl.classList.remove('selectOpen');
let elements = $$('.block-reviews');
let selCat = $$('.def-selected-item')[0].dataset.val;
reviewsSortFilter();
})
});
document.addEventListener('click',function (e) {
    if(!e.target.classList.contains('selectOpen') && e.target.parentElement.parentElement != null && e.target.parentElement.parentElement.classList.contains('default-select')){
        var openedSelect = document.getElementsByClassName('selectOpen');
        if(openedSelect.length != 0) {
            openedSelect[0].classList.remove('selectOpen');
            document.querySelectorAll('.default-select .selectToggle')[0].classList.remove('selectToggle');
        }
    }
},false)
