let commentBtnBlock = $$('.reply-comment');
let commentMovingForm = $$('.form-1')[0];
let movingBackCommentForm = $$('#comments-add-form-wrap')[0];
let mainCommentFormBlock = $$('.comments-add-form')[0];


for(let i=0;i<commentBtnBlock.length;i++) {
    commentBtnBlock[i].addEventListener('click',function (e) {
        let to_remove = this.parentNode.nextElementSibling;
        commentBtnBlock[i].nextElementSibling.style.display = 'block';
        if (to_remove == null) {
            commentMovingForm.style.display = 'block';
            commentBtnBlock[i].closest('.reply-bottom-block').insertAdjacentElement('afterend', commentMovingForm);
            mainCommentFormBlock.style.display = 'none';
        }
    });
}


function commentFormMoveBack() {
    if (commentMovingForm.style.display == 'block' ) {
        let moveBackForm = document.createDocumentFragment();
        moveBackForm.appendChild(commentMovingForm);
        movingBackCommentForm.appendChild(moveBackForm);
        mainCommentFormBlock.style.display = 'block';
    }

}
