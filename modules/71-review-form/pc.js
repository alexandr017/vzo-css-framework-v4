document.querySelectorAll('#review-form form')[0].addEventListener('submit',function (e) {
    e.preventDefault();
    var name = $$('#name')[0].value;
    var id = $$('#reviewUserId')[0].value;
    var rating = $$('.rating-wrap')[0].dataset['rate'];
    
    if(window.answer == false || window.answer == undefined){
        if(rating == 0){alert('Вы не указали рейтинг'); return false;}
    }
    var review = $$('#content')[0].value;

    if(name == '' || name == undefined) {
        alert('Вы не указали имя');
        return false;
    }

    if(review == '' || review == undefined) {
        alert('Вы не заполнили текст отзыва');
        return false;
    }
    var company = $$('#reviewCompany')[0].value;

    if($$('#review-form')[0].closest('[data-id]')) {
        var parent = $$('#review-form')[0].closest('[data-id]').dataset['id'];
    }
    var pros = $$('#plus')[0].value;
    var minuses = $$('#minus')[0].value;
    if(parent == undefined) parent = 'null';
    if($$('#review-form')[0].getElementsByClassName('.g-recaptcha-response').length != 0) {
        var captcha = $$('#review-form')[0].getElementsByClassName('.g-recaptcha-response')[0].value;
    } else {
        var captcha = null;
    }

    let review_data = {
        '_token': document.getElementsByName('csrf-token')[0].attributes[1].nodeValue,
        'rating':rating,
        'name': name,
        'uid': id,
        'company_id' : company,
        'parent':parent,
        'review': review,
        'pros':pros,
        'minuses':minuses,
        'captcha':captcha
    };
    if (window.location.pathname.indexOf('/banks/') != -1){
        if($$('#bank-category-id').length != 0){
            review_data.bank_category_id = $$('#bank-category-id')[0].value;
        } else if($$('#bank-category-page-id').length != 0) {
            review_data.bank_category_id = $$('#bank-category-page-id')[0].value
        }
        review_data.product_id = $$('#product_id')[0].value;
        var url = '/actions/banks/add-review';
    } else {
        var url = '/actions/add-review';
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(review_data)
    }).then((res) => {
        return res.text().then((value) => {
            $$('#review-form')[0].innerHTML += ('<p>'+value+'</p>');
            $$('#form-1')[0].style.display = 'none';
        }).catch((err) => {
            console.log(err);
        });
    });
})

if($$('.rating-wrap').length !=0) {
    var ratingStars = $$('.rating-wrap')[0].getElementsByTagName('svg');
    for(let i=0; i<ratingStars.length;i++){
        ratingStars[i].addEventListener('mouseenter',function (e) {
            var elemIndex = e.target.attributes['data-item'].nodeValue;
            for(let i=0; i< 5;i++) {
                var fillOffset = ratingStars[i].getElementsByTagName('stop')[0].attributes['offset'].nodeValue;
                var fillColor = ratingStars[i].getElementsByTagName('stop')[0].attributes['stop-color'].nodeValue;
                ratingStars[i].setAttribute('fillOffset', fillOffset);
                ratingStars[i].setAttribute('fillColor', fillColor);
                ratingStars[i].getElementsByTagName('stop')[0].attributes['offset'].nodeValue = '100%';
                if(i<elemIndex) {
                    ratingStars[i].getElementsByTagName('stop')[0].attributes['stop-color'].nodeValue = '#FFDC23';
                } else {
                    ratingStars[i].getElementsByTagName('stop')[0].attributes['stop-color'].nodeValue = '#E6EBEF';
                }
            }
            $$('.rating-wrap')[0].setAttribute('data-rate',elemIndex);
        })
    }
}
