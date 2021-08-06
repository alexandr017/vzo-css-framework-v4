let myBlock = document.querySelectorAll('.reviewBlock');
myBlock.forEach(function (value, index) {
    let buttonShow = value.querySelector('.review__button_show'),
        buttonHide = value.querySelector('.review__button_hide'),
        dots = value.querySelector('.reviewBlock__dots'),
        allBlock = value.querySelector('.bank_review-inner-block'),
        hiddenText = value.querySelector('.block__hide');
    buttonShow.addEventListener('click', event => {
        dots.style.display = 'none';
        hiddenText.style.display = 'inline';
        buttonHide.style.display = 'flex';
        buttonShow.style.display = 'none';
    });
    buttonHide.addEventListener('click', event => {
        dots.style.display = 'inline';
        hiddenText.style.display = 'none';
        buttonShow.style.display = 'flex';
        buttonHide.style.display = 'none';
    });
});

$('.bank_review_slider').slick({
    infinite:false,
    speed: 400,
    slidesToShow: 3,
    prevArrow: '<div class="prev_el"><img src="/v4/images/prev.png"></div>',
    nextArrow: '<div class="next_el"><img src="/v4/images/next-green.png"></div>',
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite:false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
});

$('.smi_slider').slick({
    infinite:false,
    speed: 400,
    slidesToShow: 3,
    prevArrow: '<div class="smi_prev_el"><img src="/v4/images/prev.png"></div>',
    nextArrow: '<div class="smi_next_el"><img src="/v4/images/next-green.png"></div>',
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite:false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
});
