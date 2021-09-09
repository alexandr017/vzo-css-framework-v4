if(document.getElementsByClassName('our_command_slider').length>0){
    slideShow({
        element:'.our_command_slider',
        slidesToShow:2,
        slidesToScroll:1,
        circleScroll:true,
        height:'400',
        responsive: [
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

