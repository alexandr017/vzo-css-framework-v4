let themeId = window.location.pathname.split("/").pop();
let operatorMessage = document.querySelector('#operatorMessage');
let userMessage = document.querySelector('#userMessage');
let chatBlock = $$('.appeals-chat-block')[0];

if ($$('.form-1').length != 0) {
    $$('.form-1')[0].querySelector('#addAppeal').addEventListener('click', function (e) {
        e.preventDefault();

        let messageInput = $$('.form-1')[0].querySelector('#content');
        let message = messageInput.value;

        if (message == '') {
            alert('Введите сообщение');
            return;
        }

        (async function () {
            let data = {
                '_token': $$('[name="csrf-token"]')[0].getAttribute('content'),
                'message': message,
                'theme_id': themeId
            };
            let response = await fetch('/account/appeals/add', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(data)
            });

            if (response.status == 200) {
                messageInput.value = '';
            }
        })()
    })
}

setInterval(function() {
    (async function () {
        let data = {
            '_token': $$('[name="csrf-token"]')[0].getAttribute('content'),
        };
        let response = await fetch("/account/appeals/messages/"+themeId, {
            method: 'GET',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
        });

        if (response.status != 200) {
            return;
        }

        let result = await response.text();
        result = JSON.parse(result);

        let messagesCount = chatBlock.querySelectorAll('.appeals-chat-el').length;

        if (messagesCount < result.messages.length) { // messagesCount < result.messages.length
            let newMessages = result.messages.slice(messagesCount, result.messages.length);
            let newMessageElement;

            for (item of newMessages) {
                newMessageElement = (item.sender == 0) ? userMessage : operatorMessage;

                newMessageElement.querySelector('.appeals-chat-text').innerHTML = item.message;
                newMessageElement.querySelector('.appeals-chat-time').innerHTML = item.date;

                chatBlock.appendChild(newMessageElement.cloneNode(true));
            }
        }

    })()
}, 1500);

function mark_as_read() {
    (async function () {
        let data = {
            '_token': $$('[name="csrf-token"]')[0].getAttribute('content'),
            'appeal_id': themeId
        };
        await fetch('/account/appeals/mark_as_read', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(data)
        });
    })()
}

document.addEventListener('DOMContentLoaded', mark_as_read);

if ($$('#closeAppeal').length != 0) {
    $$('#closeAppeal')[0].addEventListener('click', function () {
        let appealId = this.dataset.id;

        if (!appealId) {
            alert('Ошибка закрытия обращения');
            return false;
        }

        let data = {
            '_token': $$('[name="csrf-token"]')[0].getAttribute('content')
        };

        fetch('/account/appeals/close_appeals/' + appealId, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.status == 200) {
                return location.href = '/account/appeals';
            } else {
                alert('Ошибка закрытия обращения');
            }
        });
    })
}