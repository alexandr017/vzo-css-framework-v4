if($$('#backCallForm').length != 0 && $$('#backCallForm')[0].getElementsByClassName('btn').length != 0) {
    $$('#backCallForm')[0].getElementsByClassName('btn')[0].addEventListener('click',function (e) {
        e.preventDefault();

        var token = document.getElementsByName('csrf-token')[0].attributes[1].nodeValue;
        var name = $$('#bcName')[0].value;
        var phone = $$('#bcPhone')[0].value;
        var description = $$('#bcDescription')[0].value;

        if (!phone || !name) {
            alert('Вы не заполнили все поля');
            return false;
        }

        (async function(){
            let data = {
                _token: token,
                name: name,
                phone: phone,
                description: description
            };
            let response = await fetch('/forms/call_me', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-CSRF-TOKEN': token
                },
                body: JSON.stringify(data)
            });

            var msg;
            let result = await response.text();

            if(result.length > 0) {
                msg = 'Спасибо за обращение! Консультант ВЗО свяжется с вами в ближайшее время';
            } else {
                msg = 'Ошибка отправки';
            }

            $$('#modal-services')[0].classList.remove('open');

            var modalBack = $$('#modal-back')[0];
            modalBack.getElementsByClassName('modal-confirm-success')[0].innerHTML = msg;
            modalBack.classList.add('open');

            return false;
        })()
    },false);
}

document.querySelectorAll('.modal-exit').forEach(function (exit) {
    exit.addEventListener('click', function (event) {
        event.preventDefault();
        this.closest('#modal-back').classList.remove('open');
    });
});