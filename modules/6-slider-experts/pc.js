if(document.getElementsByClassName('our_expert_slider').length>0){
    slideShow({
        element:'.our_expert_slider',
        slidesToShow:2,
        slidesToScroll:1,
        circleScroll:true,
        height:'210',
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
