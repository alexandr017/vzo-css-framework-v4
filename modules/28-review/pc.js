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

let answerForm = $$('#review-form')[0].cloneNode(true);
answerForm.classList.add('review-answer-form');
$$('#review-f')[0].parentNode.append(answerForm);
answerForm.style.display = 'none';

answerForm.querySelector('#plus').style.display = 'none';
answerForm.querySelector('#minus').style.display = 'none';

answerForm.querySelector('.r-btn-wrap').innerHTML = '<div class="r-btn-wrap flex">\n' +
    '<div class="cancel-btn">Отмена</div>\n' +
    '<button type="submit" class="btn-1-dark">\n' +
    '<svg width="18" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<path d="M1.06336 0.0704598L13.5781 5.85306C13.7044 5.91147 13.8111 6.00321 13.8857 6.11769C13.9604 6.23216 14 6.3647 14 6.5C14 6.6353 13.9604 6.76784 13.8857 6.88231C13.8111 6.99679 13.7044 7.08853 13.5781 7.14694L1.06336 12.9295C0.935014 12.989 0.791689 13.0115 0.650457 12.9945C0.509225 12.9774 0.376038 12.9215 0.26676 12.8334C0.157481 12.7454 0.076717 12.6288 0.0340863 12.4976C-0.00854428 12.3664 -0.0112445 12.2262 0.0263072 12.0935L1.27837 7.65933C1.2937 7.60499 1.32525 7.5562 1.36908 7.51906C1.41291 7.48192 1.46709 7.45807 1.52487 7.45047L7.5892 6.65463C7.61448 6.65121 7.63843 6.64154 7.65871 6.62656C7.679 6.61159 7.69495 6.59181 7.70502 6.56914L7.71571 6.53299C7.7204 6.50096 7.71373 6.46833 7.6968 6.44042C7.67988 6.4125 7.65368 6.39094 7.62246 6.37922L7.58979 6.37061L1.5314 5.57535C1.47374 5.56765 1.41968 5.54375 1.37596 5.50661C1.33225 5.46948 1.30079 5.42075 1.2855 5.36649L0.0263072 0.906463C-0.0112445 0.773841 -0.00854428 0.633586 0.0340863 0.502404C0.076717 0.371223 0.157481 0.254643 0.26676 0.16655C0.376038 0.0784565 0.509225 0.0225633 0.650457 0.00552727C0.791689 -0.0115088 0.935014 0.0110302 1.06336 0.0704598Z" fill="white"/>\n' +
    '</svg>\n' +
    '</button>\n' +
    '</div>';
formCancelBtn();
document.getElementsByClassName('cancel-btn')[0].addEventListener('click',function () {
    clearForm(this);
    moveFormBack();
},false);

function moveFormBack() {
    answerForm.style.display = 'none';
    $$('#review-f')[0].parentNode.append(answerForm);
}

function allForMovingForm(){

    let moveBtnBlock = $$('.review-btn-wrap-block');
    let mainFormBlock = $$('#review-f')[0];
    let formBlock = $$('.review-answer-form')[0];

    function moveBtnClick(moveBtnBlock) {
        if(!moveBtnBlock.classList.contains('review-btn-wrap-block')) {
            moveBtnBlock = moveBtnBlock.closest('.review-btn-wrap-block');
            if($$('.clicked-review-btn').length != 0) {
                $$('.clicked-review-btn')[0].classList.remove('clicked-review-btn');
            }
            moveBtnBlock.classList.add('clicked-review-btn');
        }
        var reviewForm = $$('#form-1');
        var answeredReviewBlock = formBlock.getElementsByClassName('answeredReview');
        if(!moveBtnBlock.classList.contains('answerAdded')) {
            reviewForm[0].style.display = 'block';
            if(answeredReviewBlock.length != 0) {
                answeredReviewBlock[0].style.display = 'none';
            }
        } else {
            reviewForm[0].style.display = 'none';
            if(answeredReviewBlock.length != 0) {
                answeredReviewBlock[0].style.display = 'block';
            }
        }
        let moveForm = moveBtnBlock.nextElementSibling;

        moveBtnBlock.nextElementSibling.style.display = 'inline-flex';
        if (moveForm != null) {
            formBlock.style.display = 'block';
            moveBtnBlock.nextElementSibling.insertAdjacentElement('afterend', formBlock);
        }
    }

    for(let i=0;i<moveBtnBlock.length;i++) {
        moveBtnBlock[i].addEventListener('click',function (e) {
            moveBtnClick(e.target);
        });
    }
}
document.addEventListener('DOMContentLoaded', function(){
    allForMovingForm();
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
    moveFormBack();
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
        allForMovingForm();
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

let hideSortBlock = $$(".sort");
let hideButtonBlock = $$(".main-reviews-wrap-btn-block");
window.addEventListener('change', function(){
    if (document.querySelectorAll('input[type="checkbox"]:checked').length == 0) {
        if(hideSortBlock.length != 0) {
            hideSortBlock[0].style.display = "none";
        }
        if(hideButtonBlock.length != 0) {
            hideButtonBlock[0].style.display = "none";
        }
    } else {
        if(hideSortBlock.length != 0) {
            hideSortBlock[0].style.display = "flex";
        }
        if(hideButtonBlock.length != 0) {
            hideButtonBlock[0].style.display = "block";
        }
    }
})

