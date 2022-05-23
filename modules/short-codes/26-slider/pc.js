if(Object.keys(window.slidersShortode).length != 0) {
    for (let key in window.slidersShortode) {
        var responsiveHeightData = [];
        var sliderDataOfShortcode = {
            element:window.slidersShortode[key].element,
            slidesToShow:1,
            slidesToScroll:1,
            circleScroll:true
        };
        if(window.slidersShortode[key].pc_height != '') {
            sliderDataOfShortcode.height = window.slidersShortode[key].pc_height;
        }
        if(window.slidersShortode[key].pl_height != '') {
            var heightData = {};
            heightData.breakpoint = 1200;
            heightData.settings = {};
            heightData.settings.height = window.slidersShortode[key].pl_height;
            responsiveHeightData.push(heightData);
        }
        if(window.slidersShortode[key].mob_height != '') {
            var heightData = {};
            heightData.breakpoint = 768;
            heightData.settings = {};
            heightData.settings.height = window.slidersShortode[key].mob_height;
            responsiveHeightData.push(heightData);
        }
        if(responsiveHeightData.length != 0) {
            sliderDataOfShortcode.responsive = responsiveHeightData;
        }
        slideShow(sliderDataOfShortcode);
    }
}