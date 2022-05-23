let loadReviewsMoreBtn = $$(".loadMoreReview");
let loadReviewsLessBtn = $$(".loadLessReview");

function loadMoreItems() {
    let filteredItems= document.querySelectorAll('.hiddenStyle[data-filtered="1"]');
    if(filteredItems.length == 0) {
        filteredItems = document.querySelectorAll('[data-filtered="1"]')
    }
    let allItems= document.querySelectorAll('.reviewsBlock .block-reviews.hiddenStyle');
    if(allItems.length == 0) {
        allItems = $$('.reviewsBlock .block-reviews');
        for(let i =10; i<allItems.length;i++){
            allItems[i].classList.add('hiddenStyle');
        }
        let fileteredItemsArr = document.querySelectorAll('.hiddenStyle[data-filtered="1"]');
        if(fileteredItemsArr.length != 0) {
            if(fileteredItemsArr.length > 0) {
                $$('.loadMoreReview')[0].style.display = 'flex';
            } else {
                $$('.loadMoreReview')[0].style.display = 'none';
            }
        } else {
            $$('.loadMoreReview')[0].style.display = 'none';
        }
        return;
    }
    let arrForLoadMore = (filteredItems.length != 0) ? filteredItems : allItems;
    let countOfShowedEl = 0;
    for(let i =0; i<arrForLoadMore.length;i++){
        if(countOfShowedEl<10 && arrForLoadMore[i].dataset.filtered == 1) {
            arrForLoadMore[i].classList.remove('hiddenStyle');
            countOfShowedEl++;
        } else {
            arrForLoadMore[i].classList.add('hiddenStyle');
        }
    }
    let fileteredItemsArr = document.querySelectorAll('.hiddenStyle[data-filtered="1"]');
    if(fileteredItemsArr.length != 0) {
        if(fileteredItemsArr.length >0) {
            $$('.loadMoreReview')[0].style.display = 'flex';
        } else {
            $$('.loadMoreReview')[0].style.display = 'none';
        }
    } else {
        $$('.loadMoreReview')[0].style.display = 'none';
    }
}
if(loadReviewsMoreBtn.length != 0) {
    loadReviewsMoreBtn[0].addEventListener('click',function () {
        loadMoreItems();
    },false)
}

//Перемищение формы по странице
document.addEventListener('DOMContentLoaded', function(){

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
                '<div class="cancel-btn">Отмена</div>\n' +
                '<button type="submit" class="btn-1-dark">\n' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">\n' +
                '<path d="M2.2484 0.37674L20.3084 9.01503C20.4907 9.10229 20.6446 9.23933 20.7524 9.41034C20.8601 9.58135 20.9173 9.77934 20.9173 9.98145C20.9173 10.1836 20.8601 10.3816 20.7524 10.5526C20.6446 10.7236 20.4907 10.8606 20.3084 10.9479L2.2484 19.5862C2.06319 19.6749 1.85635 19.7086 1.65254 19.6832C1.44873 19.6577 1.25653 19.5742 1.09883 19.4426C0.941128 19.311 0.824577 19.1369 0.763057 18.9409C0.701537 18.7449 0.69764 18.5354 0.751831 18.3373L2.55869 11.7133C2.58081 11.6321 2.62633 11.5593 2.68959 11.5038C2.75284 11.4483 2.83103 11.4127 2.9144 11.4013L11.6658 10.2125C11.7023 10.2073 11.7369 10.1929 11.7662 10.1705C11.7954 10.1481 11.8184 10.1186 11.833 10.0847L11.8484 10.0307C11.8552 9.98289 11.8455 9.93415 11.8211 9.89245C11.7967 9.85075 11.7589 9.81853 11.7138 9.80103L11.6667 9.78817L2.92383 8.60017C2.84061 8.58867 2.76261 8.55296 2.69952 8.49749C2.63643 8.44202 2.59103 8.36923 2.56897 8.28817L0.751831 1.6256C0.69764 1.42748 0.701537 1.21796 0.763057 1.022C0.824577 0.826032 0.941128 0.65188 1.09883 0.520283C1.25653 0.388686 1.44873 0.30519 1.65254 0.279741C1.85635 0.254292 2.06319 0.287962 2.2484 0.37674Z" fill="white"/>\n' +
                '</svg>\n' +
                '</button>\n' +
                '</div>';
            formCancelBtn();
            document.getElementsByClassName('cancel-btn')[0].addEventListener('click',function () {
                clearForm(this);
                moveFormBack();
            },false);
        }
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

    for(let i=0;i<moveBtnBlock.length;i++) {
        moveBtnBlock[i].addEventListener('click',function (e) {
            moveBtnClick(e.target);
        });
    }
});

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

let sortingReviewCheckboxes = $$(".custom-checkbox");
let sortReviewElements = $$('.reviewsBlock .block-reviews');
let selCat = 0;
if($$('.def-selected-item').length != 0) {
    selCat = $$('.def-selected-item')[0].dataset.val;
}

sortingReviewCheckboxes.forEach(item => {
    item.addEventListener('click', function() {
        reviewsSortFilter();
    })
});
function reviewsSortFilter() {
    let checkedCheckboxesArr = [] // gets all chacked checkboxes
    let checkboxes = $$('.custom-checkbox');
    for(i=0;i<checkboxes.length;i++){
        if(checkboxes[i].checked){
            checkedCheckboxesArr.push(checkboxes[i].value)
        }
    }
    let selectedCat = ($$('.def-selected-item').length != 0) ? $$('.def-selected-item')[0].dataset.val : null;
    let sortType = ($$('.sort .selected-item').length != 0) ? $$('.sort .selected-item')[0].dataset.type : null;
    let elements = $$('.reviewsBlock .block-reviews');
    let strOfSortedFilteredItems = '';
    let strOfFives = '';
    let strOfFours = '';
    let strOfThrees = '';
    let strOfTwos = '';
    let strOfOnes = '';
    let maxSort = 5;
    for(let i=0;i<elements.length;i++) {
        if(checkedCheckboxesArr.length != 0 && checkedCheckboxesArr.indexOf(elements[i].dataset.sort) != -1 && (selectedCat == null || selectedCat == elements[i].dataset.select || selectedCat ==0)){
            elements[i].dataset.filtered = 1;
            elements[i].classList.remove('hiddenStyle');
        }else {
            elements[i].dataset.filtered = 0;
            elements[i].classList.add('hiddenStyle');
        }
        switch(elements[i].dataset.sort) {
            case '5':
                strOfFives += elements[i].outerHTML;
                break;
            case '4':
                strOfFours += elements[i].outerHTML;
                break;
            case '3':
                strOfThrees += elements[i].outerHTML;
                break;
            case '2':
                strOfTwos += elements[i].outerHTML;
                break;
            default:
                strOfOnes += elements[i].outerHTML;
        }
        if(sortType != null) {
            if(sortType == 'withAnswer') {
                if(elements[i].dataset.answer ==1 && checkedCheckboxesArr.length != 0 && checkedCheckboxesArr.indexOf(elements[i].dataset.sort) != -1 && (selectedCat == null || selectedCat == elements[i].dataset.select || selectedCat ==0)){
                    elements[i].dataset.filtered = 1;
                    elements[i].classList.remove('hiddenStyle');
                    strOfSortedFilteredItems = elements[i].outerHTML + strOfSortedFilteredItems;
                } else {
                    elements[i].dataset.filtered = 0;
                    elements[i].classList.add('hiddenStyle');
                    strOfSortedFilteredItems += elements[i].outerHTML;
                }
            } else {
                if(sortType == 'up'){
                    strOfSortedFilteredItems = strOfFives + strOfFours + strOfThrees + strOfTwos + strOfOnes;
                } else{
                    strOfSortedFilteredItems = strOfOnes + strOfTwos + strOfThrees + strOfFours + strOfFives ;
                }
            }
        }
    }
    if ($$('.reviewsBlock')[0] != undefined) {
        $$('.reviewsBlock')[0].innerHTML = strOfSortedFilteredItems;
        loadMoreItems();
    }
}
reviewsSortFilter();
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
        hideButtonBlock.style.display = "block";
    }
})
