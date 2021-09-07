var slideShow = (function () {
    return function (data) {
        var arr = [];
        var leftArrow = '<button class="js-slide-btn-left">Previous</button>';
        var rightArrow = '<button class="js-slide-btn-right">Next</button>';
        var slidesCount;
        var k = 0;
        var f = 0;
        var dotNum = 0;
        var circleScroll = true;
        var dataSettings = {};
        var element = '';
        var slideItemWidth;
        var step = 0;
        var addContent = '';
        var arr1 = [];
        var lastElm = '';
        var firstElm = '';
        var selector = '';
        var elementName = '';
        var itemClases = '';
        var arrows = true;
        var reviewItem = false;
        var dots = false;
        var dotsCount = 0;
        var elHeight = '100';
        var customArrows = '';
        var customWidth = '';
        var init = function (data) {
            if (data) {
                dataSettings = data;
                element = getElement(dataSettings.element);
                if(!dataSettings.arr && element) {
                    arr = [].slice.call(element.children);
                    dataSettings.arr = arr;
                }
                if(window.sliders) {
                    if(window.sliders.indexOf(dataSettings) == -1) {
                        window.sliders[dataSettings.element] = dataSettings;
                    }
                } else {
                    window.sliders = [];
                    window.sliders[dataSettings.element] = dataSettings;
                }
            }
            let i = 0;

            if (data && dataSettings.element) {
                selector = dataSettings.element.charAt(0);
                elementName = (dataSettings.element).slice(1,dataSettings.element.length);
                if(selector === '#'){
                    element = document.getElementById(elementName);
                } else if(selector === '.') {
                    element = document.getElementsByClassName(elementName)[0];
                }
                if(element != null){
                    element.style.display = 'none';
                } else {
                    return;
                }
                if (dataSettings.windowResize === false) {
                    setSliderData(dataSettings);
                    arr = dataSettings.arr;
                } else {
                    setSliderData(window.sliders[dataSettings.element]);
                    arr = window.sliders[dataSettings.element].arr;
                }
                if (slidesCount == arr.length) {
                    arrows = false;
                } else {
                    arrows = true;
                }
            }
            if (dataSettings.dots !== undefined) {
                setSliderData(dataSettings);
                // dots = dataSettings.dots;
            }
            var slideContent = '';
            for (let i = 0; i < slidesCount; i++) {
                if(arr[i]){
                    itemClases = '';
                    for (let q = 0; q < arr[i].classList.length; q++) {
                        itemClases += arr[i].classList[q]+' ';
                    }
                    if(elementName == 'reviews'){
                        reviewItem = true;
                    }else {
                        reviewItem = false;
                    }
                    if(reviewItem == true){
                        slideContent += '<div class="jsSlideReview" style="width:' + slideItemWidth + '%;min-width:' + slideItemWidth + '%;height: '+elHeight+'px;"> <div class="jsSlideItem '+itemClases+'" >' + arr[i].innerHTML + '</div></div>';
                    }else{
                        slideContent += '<div class="jsSlideItem '+itemClases+'" style="width:' + slideItemWidth + '%;min-width:' + slideItemWidth + '%;height: '+elHeight+'px;">' + arr[i].innerHTML + '</div>';
                    }
                }
            }
            if(element != null) {
                var blockCustomWidth = (customWidth != '') ? 'style = "width: '+customWidth+'%;"' : '';
                element.innerHTML = '<div class="jsSlideContent" '+blockCustomWidth+'>'+slideContent+'</div>';
                element.style.display = 'flex';
                element.classList.add('jsSlideMainBlock');
                if(arrows == true) {
                    if (circleScroll || (0 < k && k < arr.length)) {
                        addContent = '<div class="arrows-block">'+leftArrow+'</div>' + element.innerHTML + '<div class="arrows-block">'+rightArrow+'</div>';
                    } else {
                        addContent = '<div class="arrows-block"></div>'+element.innerHTML + '<div class="arrows-block">'+rightArrow+'</div>';
                    }
                } else {
                    addContent = element.innerHTML;
                }
                if(dots == true) {
                    circleScroll = false;
                    dotsCount = arr.length/step;
                    let dotsBlock = '';
                    for(let i=0; i<dotsCount; i++) {
                        if(i==0){
                            dotsBlock += '<span class="js-slide-dots js-slide-active-dot js-slide-disable" data-dot = '+i+'></span>';
                        } else {
                            dotsBlock += '<span class="js-slide-dots" data-dot = '+i+'></span>';
                        }
                    }
                    addContent = addContent+'<div class="js-slider-dots">'+dotsBlock+'</div>';
                }

                element.innerHTML = addContent;
                showReviewsHiddenPart();
                let arrowsBlocks = element.getElementsByClassName('arrows-block');
                if(arrowsBlocks.length > 0){
                    for (let i=0; i<arrowsBlocks.length;i++){
                        arrowsBlocks[i].style.height = elHeight+'px';
                        if(customArrows != '' && arrowsBlocks[i].children[0]) {
                            arrowsBlocks[i].children[0].style.top = customArrows+'px';
                        }
                    }
                }

                f = slidesCount;
                btnsClickAndDataset(dataSettings.element);
                loadDefBgImg(element);
            }
            customWidth = '';
            customArrows = '';
            if(dots == true) {
                if(element.getElementsByClassName('js-slide-btn-right').length != 0){
                    element.getElementsByClassName('js-slide-btn-right')[0].style.display = 'none';
                }
                if(element.getElementsByClassName('js-slide-btn-left').length != 0){
                    element.getElementsByClassName('js-slide-btn-left')[0].style.display = 'none';
                }
            }
        }

        var slideLeft = function (e) {
            var target = e.target;
            if (target.className == 'js-slide-btn-left' || target.className == 'js-slide-dots') {
                if(target.className == 'js-slide-dots') {
                    element.getElementsByClassName('js-slide-active-dot')[0].classList.remove('js-slide-disable');
                    let dotNum1 = element.getElementsByClassName('js-slide-active-dot')[0].dataset['dot'];
                    element.getElementsByClassName('js-slide-active-dot')[0].classList.remove('js-slide-active-dot');
                    target.classList.add('js-slide-active-dot');
                    target.classList.add('js-slide-disable');
                    let dotNum2 = target.dataset['dot'];
                    dotNum = Number(dotNum1) - Number(dotNum2);
                }
                element = target.closest('.jsSlideMainBlock');
                element.getElementsByClassName('jsSlideContent')[0].style.justifyContent = 'flex-end';
            }
            arr1 = [];
            k = k - step;
            f = f - step;
            setSliderData(window.sliders[target.dataset['parent']]);
            var slideContent = '';
            elementName = target.dataset['parent'];
            element = getElement(elementName);
            var slideContentAll = '';
            for (let i = arr.length-1; i >= slidesCount; i--) {
                itemClases = '';
                for (let q = 0; q < arr[i].classList.length; q++) {
                    itemClases += arr[i].classList[q]+' ';
                }
                if(elementName == '.reviews'){
                    reviewItem = true;
                }else {
                    reviewItem = false;
                }
                if(reviewItem == true){
                    slideContent += '<div class="jsSlideReview" style="width:' + slideItemWidth + '%;min-width:' + slideItemWidth + '%;height: '+elHeight+'px;"> <div class="jsSlideItem '+itemClases+'" >' + arr[i].innerHTML + '</div></div>';
                }else{
                    slideContent += '<div class="jsSlideItem '+itemClases+'" style="width:' + slideItemWidth + '%;min-width:' + slideItemWidth + '%;height: '+elHeight+'px;">' + arr[i].innerHTML + '</div>';
                }
                var parser = new DOMParser();
                var slideItemObject = parser.parseFromString(slideContent, 'text/html');
                element.getElementsByClassName('jsSlideContent')[0].prepend(slideItemObject.body.lastChild);
            }

            var blockCustomWidth = (customWidth != '') ? 'style = "width: '+customWidth+'%;"' : '';
            if(customWidth !== '') {
                element.getElementsByClassName('jsSlideContent')[0].style.width = blockCustomWidth;
            }
            if (dots == true) {
                element.getElementsByClassName('js-slider-dots')[0].style.display='none';
                element.getElementsByClassName('jsSlideContent')[0].style.transform = 'translatex('+dotNum*step*slideItemWidth+'%)';
            } else {
                element.getElementsByClassName('jsSlideContent')[0].style.transform = 'translatex('+step*slideItemWidth+'%)';
            }
            var leftArrowBlock = (k <= 0 && circleScroll === false) ? '<div class="arrows-block"></div>' : '<div class="arrows-block">'+leftArrow+'</div>';
            if(target.classList.contains('js-slide-dots') && dotNum != 0) {
                for (let j = 0; j < step*dotNum; j++) {
                    lastElm = arr.pop();
                    arr1 = arr.unshift(lastElm);
                }
            } else {
                for (let j = 0; j < step; j++) {
                    lastElm = arr.pop();
                    arr1 = arr.unshift(lastElm);
                }
            }
            setTimeout(function(){
                for (let i = 0; i < slidesCount; i++) {
                    itemClases = '';
                    for (let q = 0; q < arr[i].classList.length; q++) {
                        itemClases += arr[i].classList[q]+' ';
                    }

                    if(elementName == '.reviews'){
                        reviewItem = true;
                    }else {
                        reviewItem = false;
                    }
                    if(reviewItem == true){
                        slideContentAll += '<div class="jsSlideReview" style="width:' + slideItemWidth + '%;min-width:' + slideItemWidth + '%;height: '+elHeight+'px;"> <div class="jsSlideItem '+itemClases+'" >' + arr[i].innerHTML + '</div></div>';
                    }else{
                        slideContentAll += '<div class="jsSlideItem '+itemClases+'" style="width:' + slideItemWidth + '%;min-width:' + slideItemWidth + '%;height: '+elHeight+'px;">' + arr[i].innerHTML + '</div>';
                    }
                }
                var rightArrowBlock = '<div class="arrows-block">'+rightArrow+'</div>';
                if(dots == true) {
                    leftArrowBlock = rightArrowBlock = '<div class="arrows-block"></div>';
                    let dotsBlock = element.getElementsByClassName('js-slider-dots')[0].innerHTML;
                    slideContentAll = slideContentAll+'<div class="js-slider-dots">'+dotsBlock+'</div>';
                }
                addContent = leftArrowBlock + '<div class="jsSlideContent" '+blockCustomWidth+'>'+slideContentAll+'</div>' + rightArrowBlock;
                element.innerHTML = addContent;
                showReviewsHiddenPart();
                let arrowsBlocks = element.getElementsByClassName('arrows-block');
                if(arrowsBlocks.length > 0){
                    for (let i=0; i<arrowsBlocks.length;i++){
                        arrowsBlocks[i].style.height = elHeight+'px';
                        if(customArrows != '' && arrowsBlocks[i].children[0]) {
                            arrowsBlocks[i].children[0].style.top = customArrows+'px';
                        }
                    }
                }
                loadDefBgImg(element);
                if(element != null) {
                    btnsClickAndDataset(target.dataset['parent']);
                }
            }, 400);

        }

        var slideRight = function (e) {
            var target = e.target;
            if (target.className == 'js-slide-btn-right' || target.className == 'js-slide-dots') {
                if(target.className == 'js-slide-dots') {
                    element.getElementsByClassName('js-slide-active-dot')[0].classList.remove('js-slide-disable');
                    let dotNum1 = element.getElementsByClassName('js-slide-active-dot')[0].dataset['dot'];
                    element.getElementsByClassName('js-slide-active-dot')[0].classList.remove('js-slide-active-dot');
                    target.classList.add('js-slide-active-dot');
                    target.classList.add('js-slide-disable');
                    let dotNum2 = target.dataset['dot'];
                    dotNum = Number(dotNum2) - Number(dotNum1);
                }
                element = target.closest('.jsSlideMainBlock');
            }
            f = f + step;
            k = k + step;
            setSliderData(window.sliders[target.dataset['parent']]);
            var slideContent = '';
            elementName = target.dataset['parent'];
            element = getElement(elementName);
            var slideContentAll = '';
            var blockCustomWidth = (customWidth != '') ? 'style = "width: '+customWidth+'%;"' : '';
            if(customWidth !== '') {
                element.getElementsByClassName('jsSlideContent')[0].style.width = blockCustomWidth;
            }

            for (let i = slidesCount; i < arr.length; i++) {
                itemClases = '';
                for (let q = 0; q < arr[i].classList.length; q++) {
                    itemClases += arr[i].classList[q]+' ';
                }
                if(elementName == '.reviews'){
                    reviewItem = true;
                }else {
                    reviewItem = false;
                }
                if(reviewItem == true){
                    slideContent += '<div class="jsSlideReview" style="width:' + slideItemWidth + '%;min-width:' + slideItemWidth + '%;height: '+elHeight+'px;"> <div class="jsSlideItem '+itemClases+'" >' + arr[i].innerHTML + '</div></div>';
                }else{
                    slideContent += '<div class="jsSlideItem '+itemClases+'" style="width:' + slideItemWidth + '%;min-width:' + slideItemWidth + '%;height: '+elHeight+'px;">' + arr[i].innerHTML + '</div>';
                }
                var parser = new DOMParser();
                var slideItemObject = parser.parseFromString(slideContent, 'text/html');
                element.getElementsByClassName('jsSlideContent')[0].append(slideItemObject.body.lastChild);
            }
            if(target.classList.contains('js-slide-dots') && dotNum != 0) {
                for (let j = 0; j < step*dotNum; j++) {
                    firstElm = arr.shift();
                    arr1 = arr.push(firstElm);
                }
            } else {
                for (let j = 0; j < step; j++) {
                    firstElm = arr.shift();
                    arr1 = arr.push(firstElm);
                }
            }

            element.getElementsByClassName('jsSlideContent')[0].style.justifyContent = 'flex-start';
            if (dots == true) {
                element.getElementsByClassName('js-slider-dots')[0].style.display='none';
                element.getElementsByClassName('jsSlideContent')[0].style.transform = 'translatex(-'+dotNum*step*slideItemWidth+'%)';
            } else {
                element.getElementsByClassName('jsSlideContent')[0].style.transform = 'translatex(-'+step*slideItemWidth+'%)';
            }
            var rightArrowBlock = ((f >= arr.length && circleScroll === false)) ? '<div class="arrows-block"></div>' : '<div class="arrows-block">'+rightArrow+'</div>';
            setTimeout(function(){
                for (let i = 0; i < slidesCount; i++) {
                    itemClases = '';
                    for (let q = 0; q < arr[i].classList.length; q++) {
                        itemClases += arr[i].classList[q]+' ';
                    }
                    if(elementName == '.reviews'){
                        reviewItem = true;
                    }else {
                        reviewItem = false;
                    }
                    if(reviewItem == true){
                        slideContentAll += '<div class="jsSlideReview" style="width:' + slideItemWidth + '%;min-width:' + slideItemWidth + '%;height: '+elHeight+'px;"> <div class="jsSlideItem '+itemClases+'" >' + arr[i].innerHTML + '</div></div>';
                    }else{
                        slideContentAll += '<div class="jsSlideItem '+itemClases+'" style="width:' + slideItemWidth + '%;min-width:' + slideItemWidth + '%;height: '+elHeight+'px;">' + arr[i].innerHTML + '</div>';
                    }
                }
                var rightArrowBlock = '<div class="arrows-block">'+rightArrow+'</div>';
                var leftArrowBlock = '<div class="arrows-block">'+leftArrow+'</div>';
                if(dots == true) {
                    leftArrowBlock = rightArrowBlock = '<div class="arrows-block"></div>';
                    let dotsBlock = element.getElementsByClassName('js-slider-dots')[0].innerHTML;
                    slideContentAll = slideContentAll+'<div class="js-slider-dots">'+dotsBlock+'</div>';
                }
                addContent =  leftArrowBlock + '<div class="jsSlideContent" '+blockCustomWidth+'>'+slideContentAll+'</div>' + rightArrowBlock;
                element.innerHTML = addContent;
                showReviewsHiddenPart();
                let arrowsBlocks = element.getElementsByClassName('arrows-block');
                if(arrowsBlocks.length > 0){
                    for (let i=0; i<arrowsBlocks.length;i++){
                        arrowsBlocks[i].style.height = elHeight+'px';
                        if(customArrows != '' && arrowsBlocks[i].children[0]) {
                            arrowsBlocks[i].children[0].style.top = customArrows+'px';
                        }
                    }
                }
                loadDefBgImg(element);
                if(element != null) {
                    btnsClickAndDataset(target.dataset['parent']);
                }
            }, 400);
        }
        var getElement = function(elementName) {
            selector = elementName.charAt(0);
            elementName = elementName.slice(1,elementName.length);
            if(selector === '#'){
                var elem = document.getElementById(elementName);
            } else if(selector === '.') {
                var elem = document.getElementsByClassName(elementName)[0];
            }
            return elem;
        }
        var setSliderData = function (dataSettings) {
            if (dataSettings && dataSettings.slidesToScroll) {
                step = dataSettings.slidesToScroll;
            } else {
                step = 1;
            }
            if (dataSettings.circleScroll !== undefined) {
                circleScroll = dataSettings.circleScroll;
            }
            if (dataSettings.windowResize === undefined) {
                dataSettings.windowResize = false;
            }
            if (data && dataSettings.slidesToShow) {
                slidesCount = dataSettings.slidesToShow;
                if (slidesCount < step) {
                    console.log('Количество перемотаемых слайдов должно быть больше количества показанных слайдов');
                    return;
                }
            } else {
                slidesCount = 3;
            }
            if(dataSettings && dataSettings.height){
                elHeight = window.sliders[dataSettings.element].height;
            }
            if(dataSettings && dataSettings.blockWidth){
                customWidth = window.sliders[dataSettings.element].blockWidth;
            }
            if(dataSettings && dataSettings.customArrowsTop){
                customArrows = window.sliders[dataSettings.element].customArrowsTop;
            } else {
                customArrows = '';
            }
            debugger
            dots = dataSettings.dots;
            if (dataSettings.responsive !== undefined) {
                let responsive = dataSettings.responsive;
                for (let q = 0; q < responsive.length; q++) {
                    if (window.innerWidth < responsive[q].breakpoint) {
                        step = responsive[q].settings.slidesToScroll;
                        slidesCount = responsive[q].settings.slidesToShow;
                        if(responsive[q].settings.dots != undefined) {
                            dots = responsive[q].settings.dots;
                        }
                        if(responsive[q].settings.height !== undefined){
                            elHeight = responsive[q].settings.height;
                        }
                        if(responsive[q].settings.customArrowsTop !== undefined){
                            customArrows = responsive[q].settings.customArrowsTop;
                        } else {
                            customArrows = '';
                        }
                        if(responsive[q].settings.blockWidth !== undefined){
                            customWidth = responsive[q].settings.blockWidth;
                        }
                    }
                }
            }
            arr = window.sliders[dataSettings.element].arr;
            slideItemWidth = (100 / slidesCount);
        }
        var btnsClickAndDataset = function (dataset) {
            element = getElement(dataset);
            if(element.getElementsByClassName('js-slide-btn-left')[0] != null) {
                element.getElementsByClassName('js-slide-btn-left')[0].onclick = slideLeft;
                element.getElementsByClassName('js-slide-btn-left')[0].dataset['parent'] = dataset;
            }
            if(element.getElementsByClassName('js-slide-btn-right')[0] != null) {
                element.getElementsByClassName('js-slide-btn-right')[0].onclick = slideRight;
                element.getElementsByClassName('js-slide-btn-right')[0].dataset['parent'] = dataset;
            }
            let dotsArr = element.getElementsByClassName('js-slide-dots');
            for(let i=0;i<dotsArr.length;i++) {
                if(dotsArr[i].classList.contains('js-slide-active-dot')) {
                    var activeDotIndex = i;
                }
            }
            for(let i=0;i<dotsArr.length;i++) {
                if(i < activeDotIndex) {
                    dotsArr[i].onclick = slideLeft;
                } else if(i > activeDotIndex){
                    dotsArr[i].onclick = slideRight;
                }
                dotsArr[i].dataset['parent'] = dataset;
            }
        }
        var loadDefBgImg = function(element){
            var defBgItems = element.getElementsByClassName('def_bg');
            if (defBgItems.length >0) {
                for (let i = 0; i < defBgItems.length; i++) {
                    defBgItems[i].style.background = "url('" + defBgItems[i].dataset.src + "')";
                    defBgItems[i].removeAttribute('data-src')
                }
            }
        }
        var showReviewsHiddenPart = function(){
            var showReviewsBtns = document.getElementsByClassName('show_the_reviews');
            if(showReviewsBtns.length != 0){
                for(let i=0;i<showReviewsBtns.length;i++){
                    showReviewsBtns[i].addEventListener("click", function (event) {
                        var elem = event.target;
                        elem.closest('.jsSlideItem').style.padding = 0;
                        elem.nextSibling.style.display = 'block';
                        elem.previousElementSibling.style.display = 'none';
                        elem.style.display = 'none';
                        event.stopPropagation();
                    }, false);
                }
            }
        }
        window.onresize = function () {
            let sldersDetails = window.sliders;
            for (let key in sldersDetails) {
                sldersDetails[key].windowResize = true;
                init(sldersDetails[key]);
            }
        };
        init(data);
    }
}());
if(document.getElementsByClassName('bank-review-slider').length>0){
    slideShow({
        element:'.bank-review-slider',
        slidesToShow:3,
        slidesToScroll:1,
        circleScroll:false,
        height:'400',
        dots:true,
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

