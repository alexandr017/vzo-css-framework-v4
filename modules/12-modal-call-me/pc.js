if($$('#callMeForm').length != 0 && $$('#callMeForm')[0].getElementsByClassName('btn').length != 0) {
    $$('#callMeForm')[0].getElementsByClassName('btn')[0].addEventListener('click',function (e) {
        e.preventDefault();
        var token = document.getElementsByName('csrf-token')[0].attributes[1].nodeValue;
        var name = $$('#cName')[0].value;
        var phone = $$('#cHone')[0].value;
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
                var modalContent = $$('#callMeForm')[0].closest('.modal-block-container');
                modalContent.innerHTML = '';
                modalContent.append(resultObject.body.lastChild);
            }
            return false;
        })()
    },false);
}
