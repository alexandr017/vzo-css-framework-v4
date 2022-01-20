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
