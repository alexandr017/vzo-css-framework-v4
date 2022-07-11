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
                if (e.target.closest('.block-reviews')) {
                    e.target.closest('#review-form').style.display = 'none';
                    e.target.closest('.block-reviews').getElementsByClassName('review-btn-wrap-block')[0].classList.add('answerAdded')
                    e.target.closest('.block-reviews').insertAdjacentHTML('beforeend', '<p class="answeredReview">'+value+'</p>');
                } else {
                    if($$('#modal_answer_after_adding_review_btn').length != 0) {
                        $$('#modal_answer_after_adding_review_btn')[0].click();
                    }
                }
                this.querySelectorAll('input, textarea').forEach(tag => {
                    if (!tag.readOnly && tag.type != 'hidden') {
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
    if(!$$('.rating-wrap')[0].classList.contains('no-rate-poss')){
        var ratingStars = $$('.rating-wrap')[0].getElementsByTagName('svg');
        for(let i=0; i<ratingStars.length;i++){
            ratingStars[i].addEventListener('click',function (e) {
                var elem = e.target.closest('svg');
                var elemIndex = elem.attributes['data-item'].nodeValue;
                elem.parentElement.setAttribute('data-val',elemIndex);
                for(let i=0; i< 5;i++) {
                    if(i< elemIndex) {
                        ratingStars[i].getElementsByTagName('stop')[0].attributes['stop-color'].nodeValue ='#FFDC23';
                    } else {
                        ratingStars[i].getElementsByTagName('stop')[0].attributes['stop-color'].nodeValue ='#E8EEF6';
                    }
                }
            })
        }
    }
}

$$('.content-area').forEach(item => {
    item.addEventListener("input", function () {
        this.style.height = "48px";
        this.style.height = (this.scrollHeight)+"px";
    })
});

// $(document).on('submit','#AddReview',function(e){
//     e.preventDefault();
//     var name = $('#reviewUserName').val();
//     var id = $('#reviewUserId').val();
//     var rating = $('#reviewRating').val();
//     if(window.answer == false || window.answer == undefined){
//         if(rating == 0){alert('Вы не указали рейтинг'); return false;}
//     }
//     var review = $('#reviewUserComment').val();
//
//     if(name == '') {
//         alert('Вы не указали имя');
//         return false;
//     }
//
//     if(review == '') {
//         alert('Вы не заполнили текст отзыва');
//         return false;
//     }
//
//     var company = $('#reviewCompany').val();
//     var token = $('#token').val();
//     var parent = $('#reviewParent').val();
//
//     var pros = $('#pros').val();
//     var minuses = $('#minuses').val();
//
//     var parent = $(this).parent().attr('data-id');
//     if(parent == undefined) parent = 'null';
//
//     var captcha = $(this).find('.g-recaptcha-response').val();
//     var review_data = {
//         '_token': document.getElementsByName('csrf-token')[0].attributes[1].nodeValue,
//         'rating':rating,
//         'name': name,
//         'uid': id,
//         'company_id' : company,
//         'parent':parent,
//         'review': review,
//         'pros':pros,
//         'minuses':minuses,
//         'captcha':captcha
//     };
//     if (window.location.pathname.indexOf('/banks/') != -1){
//         if($('#bank-category-id').length){
//             review_data.bank_category_id = $('#bank-category-id').val();
//         } else {
//             review_data.bank_category_id = $('#bank-category-page-id').val();
//         }
//         review_data.product_id = $('#product_id').val();
//         var url = '/actions/banks/add-review';
//     } else {
//         var url = '/actions/add-review';
//     }
//     $.ajax({
//         type: "POST",
//         url: url,
//         data: review_data,
//         success: function(data){
//             $('#formModal .modal-body').html('<p>'+data+'</p>');
//             $('#formModal').modal();
//         }
//     });
//     $('#reviewUserComment').val('');
//     $('#pros').val('');
//     $('#minuses').val('');
//     $('#bank-category-id').prop('selectedIndex',0);
//     $('.companies-rating .fa').removeClass('fa-star');
//     $('.companies-rating .fa').addClass('fa-star-o');
//     if(!$('#reviewUserName').prop('readonly')){
//         $('#reviewUserName').val('');
//     }
//     return false;
// });
