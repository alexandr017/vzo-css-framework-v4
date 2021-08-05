let showBlock = document.querySelectorAll('.commandShowBlock');
    showBlock.forEach(function (value, index) {
    let buttonShow = value.querySelector('.command__button_show'),
        buttonHide = value.querySelector('.command__button_hide'),
        allBlock = value.querySelector('.command-inner-block'),
        hiddenText = value.querySelector('.block__hide');
        buttonShow.addEventListener('click', event => {
            allBlock.style.width = '855px';
            hiddenText.style.display = 'inline';
            buttonHide.style.display = 'block';
            buttonShow.style.display = 'none';
        });

    buttonHide.addEventListener('click', event => {
        hiddenText.style.display = 'none';
        allBlock.style.width = '410px';
        buttonShow.style.display = 'block';
        buttonHide.style.display = 'none';
    });
});

$('.our_command_slider').slick({
    infinite:true,
    speed: 400,
    slidesToShow: 2,
    prevArrow: '<div class="prev_el"><img src="/v4/images/prev.png"></div>',
    nextArrow: '<div class="next_el"><img src="/v4/images/next.png"></div>',
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite:false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
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
