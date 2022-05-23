$$('.create_appeal')[0].addEventListener('click', () => {
    let theme = $$('.appeal_theme')[0].value;
    let message = $$('.appeal_message')[0].value;

    if(theme.length > 120) {
        alert('Слишком длинная тема сообщения');
        return '';
    }

    if(message.length === 0 || theme.length === 0){
        alert('Укажите тему и сообщение');
        return '';
    }

    let data = {
        '_token': $$('[name="csrf-token"]')[0].getAttribute('content'),
        'message': message,
        'theme': theme
    };

    fetch('/account/appeals/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(data)
    }).then((res) => {
        return res.json().then(() => {
            location.reload();
        }).catch((err) => {
            console.log(err);
        })
    });
    return false;
});

document.querySelectorAll('.modal-exit').forEach(function (exit) {
    exit.addEventListener('click', function (event) {
        event.preventDefault();
        var modal = exit.closest('.modal-block');
        modal.classList.remove('open');
    });
});
