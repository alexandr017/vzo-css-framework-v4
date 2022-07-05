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

function submitCommentForm() {
    $$('.form-1').forEach(form => {
        form.querySelector('#addAnswer').addEventListener("click", function (event) {
            activeForm = null;

            let formModal = document.getElementById('modal-comment');

            let name = form.querySelector('#name').value;
            let comment = form.querySelector('#content').value;
            let postId = document.getElementById('postId').value;

            let alertMsg = '';

            if (name == '' && comment == '') {
                alertMsg = 'Заполните поля "Имя" и "Комментарий"';
            } else if (name == '') {
                alertMsg = 'Заполните поле "Имя"';
            } else if (comment == '') {
                alertMsg = 'Заполните поле "Комментарий"';
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

            let parent_id = form.closest('.reply-info');
            parent_id = parent_id != null ? parent_id.dataset.id : -1;


            (async function () {
                let data = {
                    '_token': token,
                    name: name,
                    pid: postId,
                    parent: parent_id,
                    comment: comment,
                    // captcha: captcha
                };
                let response = await fetch('/forms/comment_add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'X-CSRF-TOKEN': token
                    },
                    body: JSON.stringify(data)
                });
                let result = await response.text();

                if (result != '' && formModal != null) {
                    formModal.getElementsByClassName('modal-confirm-success')[0].innerHTML = result;
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
