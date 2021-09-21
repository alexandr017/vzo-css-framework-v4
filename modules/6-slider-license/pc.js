if(document.getElementsByClassName('license-slider').length>0){
    slideShow({
        element:'.license-slider',
        slidesToShow:3,
        slidesToScroll:1,
        circleScroll:true,
        height:'350',
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
