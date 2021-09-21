var ratingStars = $$('.rating-wrap')[0].getElementsByTagName('svg');
for(let i=0; i<ratingStars.length;i++){
    ratingStars[i].addEventListener('mouseenter',function (e) {
        var elem = e.target;
        var elemIndex = elem.attributes['data-num'].nodeValue;
        for(let i=0; i< elemIndex;i++) {
            var fillOffset = ratingStars[i].getElementsByTagName('stop')[0].attributes['offset'].nodeValue;
            var fillColor = ratingStars[i].getElementsByTagName('stop')[0].attributes['stop-color'].nodeValue;
            ratingStars[i].setAttribute('fillOffset', fillOffset);
            ratingStars[i].setAttribute('fillColor', fillColor);
            ratingStars[i].getElementsByTagName('stop')[0].attributes['offset'].nodeValue = '100%';
            ratingStars[i].getElementsByTagName('stop')[0].attributes['stop-color'].nodeValue = '#FAFF5F';
        }
    })
    ratingStars[i].addEventListener('mouseleave',function (e) {
        var elem = e.target;
        var elemIndex = elem.attributes['data-num'].nodeValue;
        for(let i=0; i< elemIndex;i++) {
            ratingStars[i].getElementsByTagName('stop')[0].attributes['offset'].nodeValue = ratingStars[i].attributes['fillOffset'].nodeValue;
            ratingStars[i].getElementsByTagName('stop')[0].attributes['stop-color'].nodeValue = ratingStars[i].attributes['fillColor'].nodeValue;
        }
    })
}