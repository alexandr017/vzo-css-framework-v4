if(document.getElementsByClassName('k5m-slider').length>0){
    slideShow({
        element:'.k5m-slider',
        slidesToShow:3,
        slidesToScroll:1,
        circleScroll:true,
        height:'280',
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
