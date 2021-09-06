if(document.getElementsByClassName('bank-review-slider').length>0){
    slideShow({
        element:'.bank-review-slider',
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


if(document.getElementsByClassName('smi-slider').length>0){
    slideShow({
        element:'.smi-slider',
        slidesToShow:3,
        slidesToScroll:1,
        circleScroll:false,
        height:'220',
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

