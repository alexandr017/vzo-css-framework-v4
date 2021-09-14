if(document.getElementsByClassName('smi_slider').length>0){
    slideShow({
        element:'.smi_slider',
        slidesToShow:3,
        slidesToScroll:1,
        circleScroll:false,
        height:'220',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
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
