$('.our_expert_slider').slick({
    infinite: true,
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
                infinite:true
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
