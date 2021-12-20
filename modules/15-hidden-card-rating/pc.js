let hiddenCardBtn = document.querySelectorAll('.rating-more')[0];

hiddenCardBtn.addEventListener('click', function(){
    hiddenCardBtn.classList.toggle('active');

})

document.addEventListener('click',function (e) {
    if(!e.target.classList.contains('active')){
        var openedRating = document.getElementsByClassName('active');
        if(openedRating.length != 0) {
            openedRating[0].classList.remove('active');
        }
    }
},false)
