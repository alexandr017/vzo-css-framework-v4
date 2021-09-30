if ( document.querySelectorAll('.our-benefits-slider' ).length > 0) {
    slideShow({
        element: '.our-benefits-slider',
        slidesToShow: 1,
        slidesToScroll: 1,
        circleScroll: false,
        height: '300',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    height: '240'
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
