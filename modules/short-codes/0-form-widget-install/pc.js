let scriptEl = document.createElement("script");
scriptEl.src = 'https://www.google.com/recaptcha/api.js';
document.head.appendChild(scriptEl);

$$('#widget_install')[0].addEventListener('submit', function(e){
    e.preventDefault();
    let data = {
        '_token': $$('[name="csrf-token"]')[0].getAttribute('content'),
        'name': $$('#name')[0].value,
        'email': $$('#email')[0].value,
        'company':$$('#company')[0].value,
        'comment': $$('#comment')[0].value
    };

    if ($$('#g-recaptcha-response').length > 0) {
        data.captcha = $$('#g-recaptcha-response')[0].value;
    }

    fetch('/forms/widget_install', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        return res.json().then((value) => {
            $$('#formModal .modal-body')[0].innerHTML = '<p>' + value.text + '</p>';
            $$('#formModal')[0].classList.add('show');
            $$('body')[0].style.overflow = 'hidden';
        }).catch((err) => {
            console.log(err);
        })
    });
    return false;
});