let moreReviewsWrap = $$(".reviews")[0];
let reviewsItems = Array.from(moreReviewsWrap.querySelectorAll(".block-reviews"));
let loadReviewsMore = $$(".loadMore")[0];
let loadReviewsLess = $$(".loadLess")[0];
hiddenReviewsStyle  = "hiddenReviewsStyle";
reviewsItems.forEach(function (item, index) {
    if (index >= 10) {
        item.classList.add(hiddenReviewsStyle );
        loadReviewsLess.style.display = "none";
    }
});
loadReviewsMore.addEventListener("click", function () {
    [].forEach.call(document.querySelectorAll("." + hiddenReviewsStyle), function (
        item,
        index
    ) {
        if (index < 10) {
            item.classList.remove(hiddenReviewsStyle);
        }
        if (document.querySelectorAll("." + hiddenReviewsStyle).length === 0) {
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
});

var formTemplate = document.querySelector('#review-form');
var backForm = document.querySelector('#review-f-bl');
let plus = document.querySelector('#plus');
let minus = document.querySelector('#minus');
let name = document.querySelector('#name');
let comment = document.querySelector('#content');
let mainFormBlock = document.querySelector('#review-f');
function toggleReply(e) {
    e.preventDefault();
    var to_remove = this.parentNode.nextElementSibling;
    if (to_remove == null) {
        formTemplate.style.display = 'block';
        plus.style.display='none';
        minus.style.display='none';
        name.style.width = '790px';
        name.style.height = '50px';
        comment.style.width = '790px';
        comment.style.height = '145px';
        comment.style.resize = 'none';
        e.target.parentNode.insertAdjacentElement('afterend', formTemplate);
        mainFormBlock.style.display = 'none';

    }
    if (to_remove != null && to_remove.id == 'review-form') {
        if ( formTemplate.style.display == 'block' ) {
            var moveBack = document.createDocumentFragment();
            moveBack.appendChild(formTemplate);
            backForm.appendChild(moveBack);
            plus.style.display = 'block';
            minus.style.display = 'block';
            mainFormBlock.style.display = 'block';
            backForm.style.flexDirection = 'row-reverse'
            name.style.width = '450px';
            comment.style.width = '450px';
        }
        else {
            formTemplate.style.display = 'block';
            e.target.parentNode.insertAdjacentElement('afterend', formTemplate);
        }

    } else {
        formTemplate.style.display = 'block';
        e.target.parentNode.insertAdjacentElement('afterend', formTemplate);
    }
}

Array.from(document.querySelectorAll('.btn-answer'))
    .forEach(btn => btn.onclick = toggleReply)

