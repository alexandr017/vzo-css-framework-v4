if(document.getElementsByClassName('our-security-slider').length>0){
    slideShow({
        element:'.our-security-slider',
        slidesToShow:1,
        slidesToScroll:1,
        circleScroll:false,
        height:'300',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    height:'240'
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