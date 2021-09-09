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

function showHiddenBlock() {
    let showCommandBlock = $$('.commandShowBlock');
    showCommandBlock.forEach(function (value, index) {
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
}

function checkFunction() {
    commandShowAndHideBtnsClick();
    showHiddenBlock();
}

document.addEventListener('DOMContentLoaded', function(){
    checkFunction();
});