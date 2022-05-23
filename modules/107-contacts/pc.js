if($$('#callMeForm_').length != 0) {
    $$('#callMeForm_')[0].getElementsByClassName('btn')[0].addEventListener('click',function (e) {
        e.preventDefault();
        var token = document.getElementsByName('csrf-token')[0].attributes[1].nodeValue;
        var name = $$('#c_name')[0].value;
        var phone = $$('#c_hone')[0].value;
        // var email = $$('#c_email')[0].value;
        if (!phone) {
            alert('Вы не заполнили все поля');
            return false;
        }
        (async function(){
            let data = {
                _token: token,
                name: name,
                phone: phone
            };
            let response = await fetch('/forms/call_me', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-CSRF-TOKEN': token
                },
                body: data
            });

            let result = await response.text();
            if(result.length  > 0) {
                result = '<p>'+result+'</p>';
                var parser = new DOMParser();
                var resultObject = parser.parseFromString(result, 'text/html');

                var modalBack = document.getElementById('modal-back');

                var resultHtml = resultObject.body.lastChild.innerHTML;

                if (modalBack != null) {
                    modalBack.getElementsByClassName('modal-confirm-success')[0].innerHTML = resultHtml;
                    modalBack.classList.toggle('open');
                }

                $$('#callMeForm_')[0].reset();
            }
            return false;
        })()
    },false);
}
