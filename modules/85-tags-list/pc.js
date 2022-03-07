// $$('.more-tags-btn')[0].addEventListener('click',function () {
//     let list = this.nextElementSibling;
//     list.classList.toggle('showed-tags-list');
//     this.querySelector('svg').classList.toggle('rotate');
//     let text = this.querySelector('span').innerHTML;
//     text = (text === 'Больше') ? 'Меньше' : 'Больше';
//     this.querySelector('span').innerHTML = text;
// });

document.addEventListener('DOMContentLoaded', function(){
    if(document.getElementsByClassName('tags-list-wrap-slider').length>0){
        slideShow({
            element:'.tags-list-wrap-slider',
            slidesToShow:5,
            slidesToScroll:1,
            circleScroll:true,
            height:'30',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 920,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        })
    }
});