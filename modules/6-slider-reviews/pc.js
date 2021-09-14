if(document.getElementsByClassName('bank_review_slider').length>0){
    slideShow({
        element:'.bank_review_slider',
        slidesToShow:3,
        slidesToScroll:1,
        circleScroll:false,
        height:'400',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
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
