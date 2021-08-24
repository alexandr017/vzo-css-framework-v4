var slideShow = (function () {
    return function (data) {
        var arr = [];
        var leftArrow = '<button class="js-slide-btn-left">Previous</button>';
        var rightArrow = '<button class="js-slide-btn-right">Next</button>';
        var slidesCount;
        var k = 0;
        var f = 0;
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
                element.innerHTML = addContent;
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
        }

        var slideLeft = function (e) {
            var target = e.target;
            if (target.className == 'js-slide-btn-left') {
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
            element.getElementsByClassName('jsSlideContent')[0].style.transform = 'translatex('+step*slideItemWidth+'%)';
            var leftArrowBlock = (k <= 0 && circleScroll === false) ? '<div class="arrows-block"></div>' : '<div class="arrows-block">'+leftArrow+'</div>';
            for (let j = 0; j < step; j++) {
                lastElm = arr.pop();
                arr1 = arr.unshift(lastElm);
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
                addContent = leftArrowBlock + '<div class="jsSlideContent" '+blockCustomWidth+'>'+slideContentAll+'</div>' + '<div class="arrows-block">'+rightArrow+'</div>';
                element.innerHTML = addContent;
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
            commandShowAndHideBtnsClick();
        }

        var slideRight = function (e) {
            var target = e.target;
            if (target.className == 'js-slide-btn-right') {
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
            for (let j = 0; j < step; j++) {
                firstElm = arr.shift();
                arr1 = arr.push(firstElm);
            }
            element.getElementsByClassName('jsSlideContent')[0].style.justifyContent = 'flex-start';
            element.getElementsByClassName('jsSlideContent')[0].style.transform = 'translatex(-'+step*slideItemWidth+'%)';
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
                addContent = '<div class="arrows-block">'+leftArrow+'</div>' + '<div class="jsSlideContent" '+blockCustomWidth+'>'+slideContentAll+'</div>' + '<div class="arrows-block">'+rightArrow+'</div>';
                element.innerHTML = addContent;
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
            commandShowAndHideBtnsClick();
        }
        var getElement = function(elementName) {
            let showBlock = document.querySelectorAll('.commandShowBlock');
            showBlock.forEach(function (value, index) {
                let buttonShow = value.querySelector('.command__button_show'),
                    buttonHide = value.querySelector('.command__button_hide'),
                    allBlock = value.querySelector('.command-inner-block'),
                    hiddenText = value.querySelector('.block__hide');

                buttonShow.addEventListener('click', event => {
                    document.querySelectorAll('.command-inner-block').forEach(function (value, index) {
                        value.querySelector('.block__hide').style.display = 'none';
                        value.style.width = '435px';
                        value.querySelector('.command__button_show').style.display = 'block';
                        value.querySelector('.command__button_hide').style.display = 'none';
                    });
                    allBlock.style.width = '910px';
                    allBlock.style.opacity = '1';
                    allBlock.style.position = 'absolute';
                    allBlock.style.zIndex = '4';
                    allBlock.style.background = '#fff';
                    hiddenText.style.display = 'inline';
                    buttonHide.style.display = 'block';
                    buttonShow.style.display = 'none';
                });

                buttonHide.addEventListener('click', event => {
                    hiddenText.style.display = 'none';
                    allBlock.style.width = '435px';
                    buttonShow.style.display = 'block';
                    buttonHide.style.display = 'none';
                });
            });
            commandShowAndHideBtnsClick();
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
                slidesCount = 2;
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
            if (dataSettings.responsive !== undefined) {
                let responsive = dataSettings.responsive;
                for (let q = 0; q < responsive.length; q++) {
                    if (window.innerWidth < responsive[q].breakpoint) {
                        step = responsive[q].settings.slidesToScroll;
                        slidesCount = responsive[q].settings.slidesToShow;
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

if(document.getElementsByClassName('our_command_slider').length > 0){
    slideShow({
        element:'.our_command_slider',
        slidesToShow:2,
        slidesToScroll:1,
        circleScroll:true,
        height:'290',
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

function commandShowFn(e) {
    var elem = e;
    var elemBlock = elem.closest('.command-wrap');
    var prevELem = elemBlock.previousSibling;
    var nextElem = elemBlock.nextSibling;
    if(prevELem != null) {
        prevELem.style.display = 'none';
        elemBlock.style.width = '100%';
    }
    if(nextElem != null) {
        nextElem.style.display = 'none';
        elemBlock.style.width = '100%';
    }
}
function commandHideFn(e) {
    var elem = e;
    var elemBlock = elem.closest('.command-wrap');
    var prevELem = elemBlock.previousSibling;
    var nextElem = elemBlock.nextSibling;
    if(prevELem !=null && prevELem.style.display == 'none') {
        prevELem.style.display = 'block';
        elemBlock.style.width = '50%';
    }
    if(nextElem != null && nextElem.style.display == 'none') {
        nextElem.style.display = 'block';
        elemBlock.style.width = '50%';
    }
}
function commandShowAndHideBtnsClick() {
    var commandBtnShowArr = $$('.our_command_slider .command-wrap .command__button_show');
    for(let i=0; i < commandBtnShowArr.length; i++) {
        commandBtnShowArr[i].addEventListener('click',function (e) {
            commandShowFn(e.target);
            event.stopPropagation();
        },false)
    }
    var commandBtnHideArr = document.querySelectorAll('.our_command_slider .command-wrap .command__button_hide');
    for(let i=0; i < commandBtnHideArr.length; i++) {
        commandBtnHideArr[i].addEventListener('click',function (e) {
            commandHideFn(e.target);
            event.stopPropagation();
        },false)
    }
}
document.addEventListener('DOMContentLoaded', function(){
    commandShowAndHideBtnsClick();
});