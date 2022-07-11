document.querySelectorAll('#review-form form').forEach(item => {
    item.addEventListener('submit',function (e) {
        e.preventDefault();

        var name = item.querySelectorAll('#name')[0].value;
        var id = item.querySelectorAll('#reviewUserId')[0].value;
        var rating = $$('.rating-wrap')[0].dataset['rate'];
        if(e.target.closest('.review-answer-form') == null) {
            if(window.answer == false || window.answer == undefined){
                if(rating == undefined || rating == 0){alert('Вы не указали рейтинг'); return false;}
            }
        }

        var review = item.querySelectorAll('#content')[0].value;

        if(name == '' || name == undefined) {
            alert('Вы не указали имя');
            return false;
        }

        if(review == '' || review == undefined) {
            alert('Вы не заполнили текст отзыва');
            return false;
        }
        var company = $$('#reviewCompany')[0].value;

        if(item.parentNode.closest('[data-id]')) {
            var parent = item.parentNode.closest('[data-id]').dataset['id'];
        }
        var pros = item.querySelectorAll('#plus')[0].value;
        var minuses = item.querySelectorAll('#minus')[0].value;
        if(parent == undefined) parent = 'null';
        if(item.parentNode.getElementsByClassName('.g-recaptcha-response').length != 0) {
            var captcha = item.parentNode.getElementsByClassName('.g-recaptcha-response')[0].value;
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
                if (e.target.closest('.review-wrap')) {
                    e.target.closest('#review-form').style.display = 'none';
                    e.target.closest('.block-reviews').getElementsByClassName('review-btn-wrap-block')[0].classList.add('answerAdded')
                    e.target.closest('.review-wrap').innerHTML += ('<p class="answeredReview">'+value+'</p>');
                } else {
                    if($$('#modal_answer_after_adding_review_btn').length != 0) {
                        $$('#modal_answer_after_adding_review_btn')[0].click();
                    }
                }

                this.querySelectorAll('input, textarea').forEach(tag => {
                    if (!tag.readOnly) {
                        tag.value = "";
                    }
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    })
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

$$('.content-area').forEach(item => {
    item.addEventListener("input", function () {
        this.style.height = "50px";
        this.style.height = (this.scrollHeight + 1)+"px";
    })
});
