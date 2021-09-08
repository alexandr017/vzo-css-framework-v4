if(document.getElementsByClassName('timeline_wrap_slider').length>0){
    slideShow({
        element:'.timeline_wrap_slider',
        slidesToShow:1,
        slidesToScroll:1,
        circleScroll:true,
        dots:true,
        height:'400',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
}

