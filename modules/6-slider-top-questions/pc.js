if(document.getElementsByClassName('top-questions-slider').length>0){
    slideShow({
        element:'.top-questions-slider',
        slidesToShow:3,
        slidesToScroll:1,
        circleScroll:false,
        height:'350',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
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

