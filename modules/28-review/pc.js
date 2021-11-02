function showMoreReviews() {
    let moreReviewsWrap = $$(".reviews")[0];
    let reviewsItems = Array.from(moreReviewsWrap.querySelectorAll("[data-sort]"));
    let loadReviewsMore = $$(".loadMore")[0];
    let loadReviewsLess = $$(".loadLess")[0];
    hiddenReviewsStyle = "hiddenReviewsStyle";
    reviewsItems.forEach(function (item, index) {
        if (index >= 10) {
            item.classList.add(hiddenReviewsStyle);
            loadReviewsLess.style.display = "none";
        }
    });
    loadReviewsMore.addEventListener("click", function () {
        [].forEach.call($$("." + hiddenReviewsStyle), function (
            item,
            index
        ) {
            if (index < 10) {
                item.classList.remove(hiddenReviewsStyle);
            }
            if ($$("." + hiddenReviewsStyle).length === 0) {
                loadReviewsMore.style.display = "none";
                loadReviewsLess.style.display = "flex";
            }
        });
    });
    loadReviewsLess.addEventListener("click", function () {
        reviewsItems.forEach(function (item, index) {
            if (index >= 10) {
                item.classList.add(hiddenReviewsStyle);
            }
        });
        if (document.querySelectorAll("." + hiddenReviewsStyle).length !== 10) {
            loadReviewsMore.style.display = "flex";
            loadReviewsLess.style.display = "none";
        }
    })
}
document.addEventListener('DOMContentLoaded', showMoreReviews);

let moveBtnBlock = $$('.review-btn-wrap-block');
let formBlock = $$('#review-form')[0];
let backForm = $$('#review-f-bl')[0];
let plus = $$('#plus')[0];
let minus = $$('#minus')[0];
let mainFormBlock = $$('#review-f')[0];
let btnFormBlock = $$('.r-btn-wrap')[0];

for(let i=0;i<moveBtnBlock.length;i++) {
    moveBtnBlock[i].addEventListener('click',function (e) {
        let moveForm = this.parentNode.nextElementSibling;
        moveBtnBlock[i].nextElementSibling.style.display = 'inline-flex';
        if (moveForm == null) {
            formBlock.style.display = 'block';
            plus.style.display = 'none';
            minus.style.display = 'none';
            moveBtnBlock[i].nextElementSibling.insertAdjacentElement('afterend', formBlock);
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

let sortReviewElements = $$(".block-reviews");
let sortingReviewCheckboxes = $$(".custom-checkbox");
sortingReviewCheckboxes.forEach(item => {
    item.addEventListener('click', function() {
        if (this.checked) {
            sortReviewElements.forEach(e => {
                if (e.getAttribute('data-sort') == this.value) {
                    e.style.display = "block";
                }
            })
        } else {
            sortReviewElements.forEach(e => {
                if (e.getAttribute('data-sort') == this.value) {
                    e.style.display = "none";
                }
            })
        }
    })
});
