let showComments = document.querySelectorAll('.count-reviews'),
    hiddenElement = document.querySelectorAll('.account-comment-reply');
for(let i = 0; i< showComments.length; i++){
    showComments[i].addEventListener('click', function () {
        hiddenElement[i].style.display = 'block';
    })
}


let moveCommentBtnBlock = $$('.review-btn-wrap-block'),
    formCommentBlock = $$('.form-1')[0],
    nextPlaceOfCommentForm = $$('.account-comment-reply'),
    cancelCommentForm = $$('.comment-form-cancel-btn')[0];

for(let i=0;i<moveCommentBtnBlock.length;i++) {
    moveCommentBtnBlock[i].addEventListener('click',function () {
        let moveCommentForm = this.parentNode.nextElementSibling;
        if (moveCommentForm == null) {
            formCommentBlock.style.display = 'block';
            nextPlaceOfCommentForm[i].insertAdjacentElement('afterend', formCommentBlock);
        }
    });
    cancelCommentForm.addEventListener('click',function () {
        formCommentBlock.style.display = 'none';
    });
}
