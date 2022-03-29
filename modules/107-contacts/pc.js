$$('#callMeForm_')[0].addEventListener('submit',function (e) {
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
            // var modalContent = $$('#callMeForm_')[0].closest('.modal-block-container');
            // modalContent.innerHTML = '';
            $$('#callMeForm_')[0].innerHTML = resultObject.body.lastChild.innerHTML;
        }
        return false;
    })()
},false);
