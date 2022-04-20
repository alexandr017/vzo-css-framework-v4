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
// selectOptions.forEach(a => {
//     a.addEventListener('click', b => {
//         b.target.parentElement.classList.remove('selectToggle');
//         let parentEl = b.target.closest('.select-block').children[0];
//         var dataVal = b.target.getAttribute('data-val');
//         parentEl.setAttribute('data-val', dataVal);
//         parentEl.innerText = b.target.innerText;
//         parentEl.classList.remove('selectOpen');
//         if(document.getElementsByClassName('loadMore').length != 0) {
//             var loadMore = document.getElementsByClassName('loadMore');
//             loadMore[0].setAttribute('data-select', dataVal);
//         }
//         if(document.getElementsByClassName('loadLess').length != 0) {
//             var loadLess =document.getElementsByClassName('loadLess');
//             loadLess[0].setAttribute('data-select', dataVal);
//         }
//         var elementsForSelect = document.querySelectorAll('[data-select]');
//         if(elementsForSelect.length != 0) {
//             let countShowedElem = 0;
//             let countVisibleElem = 0;
//             elementsForSelect.forEach(elem => {
//                 if(dataVal != 0) {
//                     if(dataVal != elem.dataset['select']) {
//                         elem.classList.add('hiddenStyle');
//                     } else {
//                         if(countVisibleElem <10) {
//                             elem.classList.remove('hiddenStyle');
//                         }
//                         countVisibleElem++;
//                     }
//                 } else {
//                     if(countShowedElem <10) {
//                         elem.classList.remove('hiddenStyle');
//                         countShowedElem++;
//                     } else {
//                         elem.classList.add('hiddenStyle');
//                     }
//                 }
//             })
//
//             if(document.querySelectorAll('.hiddenStyle[data-select="'+dataVal+'"]').length == 0) {
//                 if(loadMore && loadMore.length != 0) {
//                     loadMore[0].style.display = 'none';
//                 }
//             } else {
//                 if(loadMore && loadMore.length != 0) {
//                     loadMore[0].style.display = 'block';
//                 }
//             }
//         }
//     },false)
// });
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
filterByCategory(elements, selCat);
})
});
const filterByCategory = (elements,selectedCategory) => {
    let sortingReviewCheckboxes = $$(".custom-checkbox");
    let checkedCheckboxesArr = [] // gets all chacked checkboxes
    for(i=0;i<sortingReviewCheckboxes.length;i++){
        if(sortingReviewCheckboxes[i].checked){
            checkedCheckboxesArr.push(sortingReviewCheckboxes[i].value)
        }
    }
    for(i=0;i<elements.length;i++){
        if(checkedCheckboxesArr.indexOf(elements[i].dataset.sort) != -1) {
            elements[i].dataset.filtered = 0;
        }

        if(elements[i].dataset.filtered == 0){
            if(elements[i].dataset.select != selectedCategory && selectedCategory != 0){
                elements[i].classList.add('hiddenStyle');
            }
            else {
                if(checkedCheckboxesArr.indexOf(elements[i].dataset.sort) != -1) {
                    elements[i].classList.remove('hiddenStyle');
                    elements[i].dataset.filtered = 1;
                }
            }
        }
    }
}
document.addEventListener('click',function (e) {
    if(!e.target.classList.contains('selectOpen') && e.target.parentElement.parentElement != null && e.target.parentElement.parentElement.classList.contains('default-select')){
        var openedSelect = document.getElementsByClassName('selectOpen');
        if(openedSelect.length != 0) {
            openedSelect[0].classList.remove('selectOpen');
            document.querySelectorAll('.default-select .selectToggle')[0].classList.remove('selectToggle');
        }
    }
},false)
