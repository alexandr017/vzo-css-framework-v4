let commentBtnBlock = $$('.reply-comment');

if ($$('.form-1') != null) {
    let formReply = $$('.form-1')[0].cloneNode(true);
    formReply.style.display = 'none';
    formReply.classList.add('form-reply');

    $$('.form-1')[0].after(formReply);

    for(let i=0;i<commentBtnBlock.length;i++) {
        commentBtnBlock[i].addEventListener('click',function (e) {
            let to_remove = this.parentNode.parentNode.nextElementSibling;

            if (to_remove == null) {
                formReply.style.display = 'block';
                commentBtnBlock[i].closest('.reply-bottom-block').insertAdjacentElement('afterend', formReply);
            } else {
                formReply.style.display = 'block';
            }
        });
    }
}

push_vote = function (answerId, vote, element) {

    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === 'csrf-token') {
            var token = metas[i].getAttribute('content');
        }
    }

    (async function () {
        let data = {
            answerId: answerId,
            vote: vote
        };
        let response = await fetch('/qa/answer/voting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRF-TOKEN': token
            },
            body: JSON.stringify(data)
        });
        let result = await response.text();
        result = JSON.parse(result);
        if (result.result == 1) {
            let likeNumberElement = element.querySelector('span');
            let likeSvg = element.querySelector('svg');

            if(element.getElementsByClassName('change-vote-color').length > 0){
                likeNumberElement.innerText = parseInt(likeNumberElement.innerText) - 1;
                likeSvg.classList.remove('change-vote-color');
                return;
            }
            if(result.changeVote != undefined && result.changeVote == 1 && element.getElementsByClassName('change-vote-color').length == 0){
                likeNumberElement.innerText = parseInt(likeNumberElement.innerText) - 1;
                likeSvg.classList.remove('change-vote-color');
            } else {
                likeSvg.classList.add('change-vote-color');
                likeNumberElement.innerText = parseInt(likeNumberElement.innerText) + 1;
            }
        }
    })()
}

document.querySelectorAll('.up-likes').forEach(upLike => {
    upLike.addEventListener("click", function (event) {
        let answerId = event.target.closest('.experts-reply').dataset['id'];
        push_vote(answerId, 1, upLike);
        event.stopPropagation();
    });
});


function submitCommentForm() {
    $$('.form-1').forEach(form => {
        form.querySelector('#addAnswer').addEventListener("click", function (event) {

            activeForm = null;

            let formModal = document.getElementById('modal-comment');

            let userName = form.querySelector('#name').value;
            let qaId = document.querySelector('#qa_id').value;
            let answerText = form.querySelector('#content').value;

            let alertMsg = '';

            if (userName == '' && answerText == '') {
                alertMsg = 'Заполните поля "Имя" и "Ответ"';
            } else if (userName == '') {
                alertMsg = 'Заполните поле "Имя"';
            } else if (answerText == '') {
                alertMsg = 'Заполните поле "Ответ"';
            }

            if(alertMsg != '') {
                formModal.getElementsByClassName('modal-confirm-success')[0].innerHTML = alertMsg;
                formModal.classList.add('open');
                return;
            }

            const metas = document.getElementsByTagName('meta');
            for (let i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute('name') === 'csrf-token') {
                    var token = metas[i].getAttribute('content');
                }
            }

            let parent_id = form.closest('.experts-reply');
            parent_id = parent_id != null ? parent_id.dataset.id : -1;

            (async function () {
                let data = {
                    qaId: qaId,
                    answerText: answerText,
                    parent_id : parent_id,
                    userName : userName,
                    // captcha : captcha
                };
                let response = await fetch('/qa/add/answer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'X-CSRF-TOKEN': token
                    },
                    body: JSON.stringify(data)
                });
                let result = await response.text();
                result = JSON.parse(result);

                if (result.result == 1 && formModal != null) {
                    formModal.getElementsByClassName('modal-confirm-success')[0].innerHTML = result.message;
                    formModal.classList.add('open');

                    activeForm = form;
                }
            })()
        });
    });
}

let activeForm = null;

document.addEventListener('DOMContentLoaded', submitCommentForm);

document.querySelectorAll('.modal-exit').forEach(function (exit) {
    exit.addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('modal-comment').classList.remove('open');

        if (activeForm != null) {
            if (activeForm.classList.contains('form-reply')) {
                activeForm.style.display = 'none';
            }
            clearForm(activeForm.querySelector('.cancel-btn'));
        }
    });
});