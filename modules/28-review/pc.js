// function loadMoreReviews() {
//     let moreReviewsWrap = $$(".reviews")[0];
//     let reviewsItems = Array.from(moreReviewsWrap.querySelectorAll(".block-reviews"));
//     let loadReviewsMore = $$(".loadMore")[0];
//     let loadReviewsLess = $$(".loadLess")[0];
//     hiddenStyle = "hiddenStyle";
//     reviewsItems.forEach(function (item, index) {
//         if (index >= 10) {
//             item.classList.add(hiddenStyle);
//             if(loadReviewsLess){loadReviewsLess.style.display = "none"};
//             if(loadReviewsMore){loadReviewsMore.style.display = "flex"};
//         }
//     });
//     if(loadReviewsMore){
//         loadReviewsMore.addEventListener("click", function (e) {
//             let countShowedItems = 0;
//             var selectorName = $$("." + hiddenStyle);
//             [].forEach.call(selectorName, function (
//                 item,
//                 index
//             ) {
//                 if(e.target.dataset['select'] && e.target.dataset['select'] != 0) {
//                     if(item.dataset['select'] == e.target.dataset['select']){
//                         if(countShowedItems<10) {
//                             item.classList.remove(hiddenStyle);
//                             countShowedItems++;
//                         }
//                         selectorName = document.querySelectorAll('.hiddenStyle[data-select="'+e.target.dataset['select']+'"]');
//                     }
//                 }else {
//                     if (index < 10) {
//                         item.classList.remove(hiddenStyle);
//                     }
//                 }
//                 if (selectorName.length === 0) {
//                     loadReviewsMore.style.display = "none";
//                     loadReviewsLess.style.display = "flex";
//                 }
//             });
//         });
//     }
//     if(loadReviewsLess){
//         loadReviewsLess.addEventListener("click", function (e) {
//             var selectorName = document.querySelectorAll("." + hiddenStyle);
//             if(e.target.dataset['select'] && e.target.dataset['select'] != 0) {
//                 selectorName = document.querySelectorAll('[data-select="'+e.target.dataset['select']+'"]');
//                 reviewsItems = selectorName;
//             }
//             reviewsItems.forEach(function (item, index) {
//                 if (index >= 10) {
//                     item.classList.add(hiddenStyle);
//                 }
//             });
//             if (selectorName.length !== 10) {
//                 loadReviewsMore.style.display = "flex";
//                 loadReviewsLess.style.display = "none";
//             }
//         })
//     }
// }
let reviewsItems = $$('.block-reviews');
let shownReviewsCount = 0;
let sortingType = $$('.sort .selected-item');
let loadReviewsMoreBtn = $$(".loadMoreReview");
let loadReviewsLessBtn = $$(".loadLessReview");

const loadMoreReviews = (elements,pagination) => {debugger
    console.log(elements);
    pagination = shownReviewsCount;
    let filteredElements = [];
    for(i=0;i<elements.length;i++){
        if(elements[i].dataset.filtered == 1){
            filteredElements.push(elements[i]);
        }
    }
    console.log(filteredElements);
    // const pushElements = (elements,order) => {
    //     for(i=0;i<elements.length;i++){
    //         if(elements[i].dataset.filtered == 1 && elements[i].style.order == order){
    //             filteredElements.push(elements[i]);
    //         }
    //     }
    //     console.log(filteredElements)
    //     order--
    // }
    // pushElements(elements,'5')

    let reviewsArrForLoadMore = [];
    if(filteredElements.length ==0) {
        // let a = 5;
        // reviewsArrForLoadMore = reviewsItems;
        for(let a=5;a!=0;a--) {
            for(i=0;i<elements.length;i++){
                if(elements[i].dataset.sort == a){
                    reviewsArrForLoadMore.push(elements[i])
                }
            }
        }
    } else {
        reviewsArrForLoadMore = filteredElements;
    }
    debugger
    console.log(reviewsArrForLoadMore);
    if(pagination<reviewsArrForLoadMore.length){
        if(loadReviewsMoreBtn.length != 0) {
            loadReviewsMoreBtn[0].style.display = 'flex';
        }
        if(loadReviewsLessBtn.length != 0) {
            loadReviewsLessBtn[0].style.display = 'none';
        }
        for(let j=0;j<reviewsArrForLoadMore.length;j++){
            if(sortingType[0].dataset.type == 'up'){debugger
                if(j<pagination){
                    reviewsArrForLoadMore[j].classList.remove('hiddenStyle');

                } else {
                    reviewsArrForLoadMore[j].classList.add('hiddenStyle')
                };
                // if(j<pagination && reviewsArrForLoadMore[j].style.order>=reviewsArrForLoadMore[j+1].style.order && reviewsArrForLoadMore[j+1]){
                //     reviewsArrForLoadMore[j].classList.remove('hiddenStyle');
                // } else {
                //     reviewsArrForLoadMore[j].classList.add('hiddenStyle')
                // };
            }

            if(sortingType[0].dataset.type == 'down'){
                // console.log(reviewsArrForLoadMore[0])

                reviewsArrForLoadMore.reverse();
                // console.log(reviewsArrForLoadMore[0])
                if(j<pagination){
                    reviewsArrForLoadMore[j].classList.remove('hiddenStyle');
                } else {
                    reviewsArrForLoadMore[j].classList.add('hiddenStyle')
                };
                // if(j<pagination && reviewsArrForLoadMore[j].style.order>=reviewsArrForLoadMore[j+1].style.order && reviewsArrForLoadMore[j+1]){
                //     reviewsArrForLoadMore[j].classList.remove('hiddenStyle');
                // } else {
                //     reviewsArrForLoadMore[j].classList.add('hiddenStyle')
                // };
            }
            if(sortingType[0].dataset.type == 'withAnswer'){
                if(j<pagination && reviewsArrForLoadMore[j].dataset.answer == 1){
                    reviewsArrForLoadMore[j].classList.remove('hiddenStyle');
                } else {
                    reviewsArrForLoadMore[j].classList.add('hiddenStyle');
                }
            }
        }
    }
    else {
        if(loadReviewsMoreBtn.length != 0) {
            loadReviewsMoreBtn[0].style.display = 'none';
        }
        if(loadReviewsLessBtn.length != 0) {
            loadReviewsLessBtn[0].style.display = 'flex';
        }
    }

    shownReviewsCount+=10;
}

if(loadReviewsMoreBtn.length != 0) {
    loadReviewsMoreBtn[0].addEventListener('click',function () {
        // loadMoreReviews(reviewsItems,shownReviewsCount);
    },false)
}

//Перемищение формы по странице

let moveBtnBlock = $$('.review-btn-wrap-block');
let formBlock = $$('#review-form')[0];
let backForm = $$('#review-f-bl')[0];
let plus = $$('#plus')[0];
let minus = $$('#minus')[0];
let mainFormBlock = $$('#review-f')[0];
let btnFormBlock = $$('.r-btn-wrap')[0];
function moveBtnClick(moveBtnBlock) {
    if(!moveBtnBlock.classList.contains('review-btn-wrap-block')) {
        moveBtnBlock = moveBtnBlock.closest('.review-btn-wrap-block');
    }
    let moveForm = moveBtnBlock.nextElementSibling;
    moveBtnBlock.nextElementSibling.style.display = 'inline-flex';
    if (moveForm != null) {
        formBlock.style.display = 'block';
        plus.style.display = 'none';
        minus.style.display = 'none';
        moveBtnBlock.nextElementSibling.insertAdjacentElement('afterend', formBlock);
        mainFormBlock.style.display = 'none';
        btnFormBlock.innerHTML = '<div class="r-btn-wrap flex">\n' +
            '<div class="cancel-btn" onclick="moveFormBack()">Отмена</div>\n' +
            '<button type="submit" class="btn-1-dark">\n' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">\n' +
            '<path d="M2.2484 0.37674L20.3084 9.01503C20.4907 9.10229 20.6446 9.23933 20.7524 9.41034C20.8601 9.58135 20.9173 9.77934 20.9173 9.98145C20.9173 10.1836 20.8601 10.3816 20.7524 10.5526C20.6446 10.7236 20.4907 10.8606 20.3084 10.9479L2.2484 19.5862C2.06319 19.6749 1.85635 19.7086 1.65254 19.6832C1.44873 19.6577 1.25653 19.5742 1.09883 19.4426C0.941128 19.311 0.824577 19.1369 0.763057 18.9409C0.701537 18.7449 0.69764 18.5354 0.751831 18.3373L2.55869 11.7133C2.58081 11.6321 2.62633 11.5593 2.68959 11.5038C2.75284 11.4483 2.83103 11.4127 2.9144 11.4013L11.6658 10.2125C11.7023 10.2073 11.7369 10.1929 11.7662 10.1705C11.7954 10.1481 11.8184 10.1186 11.833 10.0847L11.8484 10.0307C11.8552 9.98289 11.8455 9.93415 11.8211 9.89245C11.7967 9.85075 11.7589 9.81853 11.7138 9.80103L11.6667 9.78817L2.92383 8.60017C2.84061 8.58867 2.76261 8.55296 2.69952 8.49749C2.63643 8.44202 2.59103 8.36923 2.56897 8.28817L0.751831 1.6256C0.69764 1.42748 0.701537 1.21796 0.763057 1.022C0.824577 0.826032 0.941128 0.65188 1.09883 0.520283C1.25653 0.388686 1.44873 0.30519 1.65254 0.279741C1.85635 0.254292 2.06319 0.287962 2.2484 0.37674Z" fill="white"/>\n' +
            '</svg>\n' +
            '</button>\n' +
            '</div>';
    }
}
for(let i=0;i<moveBtnBlock.length;i++) {
    moveBtnBlock[i].addEventListener('click',function (e) {
        moveBtnClick(e.target);
    });
}

function moveFormBack() {
    if ( formBlock.style.display == 'block' ) {
        let moveBack = document.createDocumentFragment();
        moveBack.appendChild(formBlock);
        backForm.appendChild(moveBack);
        plus.style.display = 'block';
        minus.style.display = 'block';
        mainFormBlock.style.display = 'block';
        backForm.style.flexDirection = 'row-reverse';
        btnFormBlock.innerHTML = '<div class="r-btn-wrap">\n' +
            '<button class="btn btn-light-3">Отправить</button>\n' +
            '</div>';
    }
}

//Скрыть решенный отзыв

let successCompleteQuestion = document.querySelectorAll('.review-wrap');
let successLabel = document.querySelectorAll('.labelOfComplainSuccess');
for (let i = 0; i < successCompleteQuestion.length; i++) {
    complainSuccessBlock  = "complainSuccessBlock";

    if(successCompleteQuestion[i].querySelectorAll('.labelOfComplainSuccess').length > 0) {
        successCompleteQuestion[i].classList.add(complainSuccessBlock);
    }
    for (let j = 0; j < successLabel.length; j++) {
        successLabel[j].addEventListener("click", function () {
            this.closest('.review-wrap').classList.remove(complainSuccessBlock);
        })
    }
}
//сортировка отзывов по чекбоксам
// let reviewsBlockWrap = $$(".reviews")[0];
// let total = Array.from(reviewsBlockWrap.querySelectorAll('.block-reviews[style="display: block;"]'));
// let sortingReviewCheckboxes = $$(".custom-checkbox");
// let sortReviewElements = $$('.block-reviews');
// let loadReviewsMore2 = $$(".loadMore")[0];
// let loadReviewsLess2 = $$(".loadLess")[0];
// sortingReviewCheckboxes.forEach(item => {
//     item.addEventListener('click', function() {
//         sortReviewElements.forEach(e => {
//             if (this.checked) {
//                 if (e.getAttribute('data-sort') == this.value) {
//                     e.style.display = "block";
//                 }
//             }
//             else {
//                 sortReviewElements.forEach(e => {
//                     if (e.getAttribute('data-sort') == this.value) {
//                         e.style.display = "none";
//                     }
//                 })
//             }
//
//         })
//
//     })
// });

let sortingReviewCheckboxes = $$(".custom-checkbox");
let sortReviewElements = $$('.block-reviews');
let selCat = 0;
if($$('.def-selected-item').length != 0) {
    selCat = $$('.def-selected-item')[0].dataset.val;
}

const filterByCheckbox = (checkboxes,elements,selectedCategory) => {
    let checkedCheckboxesArr = [] // gets all chacked checkboxes
    for(i=0;i<checkboxes.length;i++){
        if(checkboxes[i].checked){
            checkedCheckboxesArr.push(checkboxes[i].value)
        }
    }
    // let selCat = $$('.def-selected-item')[0].dataset.val;
    let filteredItemsArr = [];
    for(j=0;j<elements.length;j++){
        elements[j].dataset.filtered = 0;
        for(k=0;k<checkedCheckboxesArr.length;k++){
            if(elements[j].dataset.sort == checkedCheckboxesArr[k]){
                elements[j].dataset.filtered = 1;
                filteredItemsArr.push(elements[j]);
            }
        }
        if((elements[j].dataset.filtered == 1 && elements[j].dataset.select == selCat) || (elements[j].dataset.filtered == 1 && selCat ==0)){
            elements[j].classList.remove('hiddenStyle')
        } else{
            elements[j].classList.add('hiddenStyle')
            // elements[j].dataset.filtered = 0;
        }
    }
    debugger
    shownReviewsCount = 10;
    let filteredItemsArrSorted = [];
    for(let a=5;a!=0;a--) {
        for(i=0;i<filteredItemsArr.length;i++){
            if(filteredItemsArr[i].dataset.sort == a){
                filteredItemsArrSorted.push(reviewsItems[i])
            }
        }
    }
    // loadMoreReviews(filteredItemsArrSorted,shownReviewsCount);
}
sortingReviewCheckboxes.forEach(item => {
    item.addEventListener('click', function() {
        filterByCheckbox(sortingReviewCheckboxes,sortReviewElements,selCat);
    })
});

//открыть форму комментариев для трейта

let moveReviewBtnBlock = $$('.account-review-btn-wrap-block'),
    formReviewBlock = $$('.form-1')[0],
    nextPlaceOfReviewForm = $$('.replace-block'),
    cancelReviewForm = $$('.comment-form-cancel-btn')[0];

for(let i=0;i<moveReviewBtnBlock.length;i++) {
    moveReviewBtnBlock[i].addEventListener('click',function () {
        let moveReviewForm = this.parentNode.nextElementSibling;
        if (moveReviewForm == null) {
            formReviewBlock.style.display = 'block';
            nextPlaceOfReviewForm[i].insertAdjacentElement('afterend', formReviewBlock);
        }
    });
    cancelReviewForm.addEventListener('click',function () {
        formReviewBlock.style.display = 'none';
    });
}

//скрытие сортировочного блока и кнопки

let hideSortBlock = $$(".sort")[0];
let hideButtonBlock = $$(".main-reviews-wrap-btn-block")[0];
window.addEventListener('change', function(){
    if (document.querySelectorAll('input[type="checkbox"]:checked').length == 0) {
        hideSortBlock.style.display = "none";
        hideButtonBlock.style.display = "none";
    } else {
        hideSortBlock.style.display = "flex";
        hideButtonBlock.style.display = "flex";
    }
})
