if($$('.rating-wrap').length !=0) {
    if(!$$('.rating-wrap')[0].classList.contains('no-rate-poss')){
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
            })
            ratingStars[i].addEventListener('mouseleave',function () {
                for(let i=0; i< 5;i++) {
                    ratingStars[i].getElementsByTagName('stop')[0].attributes['offset'].nodeValue = ratingStars[i].attributes['fillOffset'].nodeValue;
                    ratingStars[i].getElementsByTagName('stop')[0].attributes['stop-color'].nodeValue = ratingStars[i].attributes['fillColor'].nodeValue;
                }
            })
        }
    }
}
if($$('.rating-wrap').length != 0) {
    var ratingStars = $$('.rating-wrap')[0].getElementsByTagName('svg');
    for(let i=0; i < ratingStars.length; i++) {
        ratingStars[i].addEventListener('click', function (e) {
            var elem = e.target.closest('svg');
            e.preventDefault();
            let data = {
                '_token': document.getElementsByName('csrf-token')[0].attributes[1].nodeValue,
                'rating': elem.attributes['data-item'].value,
                'id': elem.parentElement.attributes['data-id'].value,
                'type' : elem.parentElement.attributes['data-type'].value,
            };
            if(elem.parentElement.attributes['data-id']) {
                fetch('/forms/rating_add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
                }).then((res) => {
                    return res.text().then((value) => {
                        $$('.rating-area .rating-wrap')[0].remove();
                $$('.rating-area .rating-val')[0].remove();
                $$('.rating-area')[0].innerHTML += '<div class="result-rating-vote">' + value + '</div>';
            }).catch((err) => {
                    console.log(err);
            });
            });
            }
            return false;
        })
    }
}
