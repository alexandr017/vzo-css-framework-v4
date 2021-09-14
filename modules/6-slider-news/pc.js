if(document.getElementsByClassName('news_slider').length>0){
    slideShow({
        element:'.news_slider',
        slidesToShow:3,
        slidesToScroll:1,
        circleScroll:false,
        height:'260',
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
