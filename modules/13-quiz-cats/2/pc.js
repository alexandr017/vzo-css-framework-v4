function setQuizRangeValues() {
    let quizNumInput = document.querySelectorAll('.quiz-num-value');
    let quizRangeInput = document.querySelectorAll('.quiz-range-value');
    quizRangeInput.forEach(input => {
        input.addEventListener('input', quizInpChange)
    });
    quizNumInput.forEach(input => {
        input.addEventListener('input', quizInpChange)
    });
    for (let i = 0; i < quizNumInput.length; i++) {
        quizRangeInput[i].style.backgroundSize = quizRangeInput[i].value * 100  / (quizRangeInput[i].max - quizRangeInput[i].min) + '% 100%';
    }
}
function quizInpChange(e) {
    let target = e.target;
    let val = target.value;
    let min = target.min;
    let max = target.max;
    if (e.target.type == 'range') {
        target.parentElement.getElementsByClassName('quiz-num-value')[0].value = val;
    } else {
        target = target.parentElement.getElementsByClassName('quiz-range-value')[0];
        target.value = val;
    }
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

document.addEventListener('DOMContentLoaded', setQuizRangeValues);
let inputQuizNumValue = document.querySelectorAll('.inputQuizNumValue');
if(inputQuizNumValue.length != 0 ) {
    inputQuizNumValue = inputQuizNumValue[0];
    inputQuizNumValue.addEventListener('click',function(){
        hideValBlock(inputQuizNumValue, inputQuizNum);
    });
}
let inputQuizNum = document.querySelectorAll('.inputQuizNum');
if(inputQuizNum.length != 0) {
    inputQuizNum = inputQuizNum[0];
    inputQuizNum.addEventListener('input',function(){
        addSpaces(inputQuizNum, inputQuizNumValue);
        setTimeout(showInpBlock, 1000, inputQuizNum, inputQuizNumValue);
    });
}
let inputQuizRangeSum = document.querySelectorAll('.inputQuizRangeSum');
if(inputQuizRangeSum.length != 0) {
    inputQuizRangeSum = inputQuizRangeSum[0];
    inputQuizRangeSum.addEventListener('change',function(){
        addSpaces(inputQuizNum, inputQuizNumValue);
        setTimeout(showInpBlock, 500, inputQuizNum, inputQuizNumValue);
    });
}
let inputQuizDays = document.querySelectorAll('.inputQuizDays');
if(inputQuizDays.length != 0) {
    inputQuizDays = inputQuizDays[0];
    inputQuizDays.addEventListener('input',function(){
        addSpaces(inputQuizDays, inputQuizDaysValue);
        setTimeout(showInpBlock, 1000, inputQuizDays, inputQuizDaysValue);
    });
}
let inputQuizDaysValue = document.querySelectorAll('.inputQuizDaysValue');
if(inputQuizDaysValue.length != 0) {
    inputQuizDaysValue = inputQuizDaysValue[0];
    inputQuizDaysValue.addEventListener('click',function(){
        hideValBlock(inputQuizDaysValue, inputQuizDays);
    });
}
let inputQuizRangeDays = document.querySelectorAll('.inputQuizRangeDays');
if(inputQuizRangeDays.length != 0) {
    inputQuizRangeDays = inputQuizRangeDays[0];
    inputQuizRangeDays.addEventListener('change',function(){
        addSpaces(inputQuizDays, inputQuizDaysValue);
        setTimeout(showInpBlock, 500, inputQuizDays, inputQuizDaysValue);
    });
}

addSpaces(inputQuizNum, inputQuizNumValue);
addSpaces(inputQuizDays, inputQuizDaysValue);
function addQuizInputsParams(params) {
    if($$('#rkoLimit').length != 0) {
        params['slf_maintenance'] = $$('#rkoLimit')[0].value;
    }
    if($$('#rkoNonePercPeiod').length != 0) {
        params['slf_opened'] = $$('#rkoNonePercPeiod')[0].value;
    }
}
if($$('.total_cards_table_js').length != 0) {
    let totalTableLastTr = $$('.total_cards_table_js')[0].querySelectorAll('tbody')[0].lastElementChild;
    let maintenance_max = totalTableLastTr.dataset.maintenancemax;
    let opened_max = totalTableLastTr.dataset.openedmax;
    let maintenance_min = totalTableLastTr.dataset.maintenancemin;
    let opened_min = totalTableLastTr.dataset.openedmin;
    if(inputQuizNum.attributes['max']){inputQuizNum.attributes['max'].value = maintenance_max} else inputQuizNum.setAttribute('max',maintenance_max);
    if(inputQuizDays.attributes['max']){inputQuizDays.attributes['max'].value = opened_max} else inputQuizDays.setAttribute('max',opened_max);
    if(inputQuizRangeSum.attributes['max']){inputQuizRangeSum.attributes['max'].value = maintenance_max} else inputQuizRangeSum.setAttribute('max',maintenance_max);
    if(inputQuizRangeDays.attributes['max']){inputQuizRangeDays.attributes['max'].value = opened_max} else inputQuizRangeDays.setAttribute('max',opened_max);
    if(inputQuizNum.attributes['min']){inputQuizNum.attributes['min'].value = maintenance_min} else inputQuizNum.setAttribute('min',maintenance_min);
    if(inputQuizDays.attributes['min']){inputQuizDays.attributes['min'].value = opened_min} else inputQuizDays.setAttribute('min',opened_min);
    if(inputQuizRangeSum.attributes['min']){inputQuizRangeSum.attributes['min'].value = maintenance_min} else inputQuizRangeSum.setAttribute('min',maintenance_min);
    if(inputQuizRangeDays.attributes['min']){inputQuizRangeDays.attributes['min'].value = opened_min} else inputQuizRangeDays.setAttribute('min',opened_min);
}
