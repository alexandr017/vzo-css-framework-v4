let showHiddenRating = document.querySelectorAll('.rating-more');

showHiddenRating.forEach(a => {
    a.addEventListener('click', b => {
        let hiddenRatingBlock = b.target.nextElementSibling;
        hiddenRatingBlock.classList.toggle('toggleRating');
        a.classList.toggle('openHiddenRating');
    })
});


document.addEventListener('click',function (e) {
    if(!e.target.classList.contains('openHiddenRating')){
        var openedRating = document.getElementsByClassName('openHiddenRating');
        if(openedRating.length != 0) {
            openedRating[0].classList.remove('openHiddenRating');
            document.querySelectorAll('.toggleRating')[0].classList.remove('toggleRating');
        }
    }
},false)
