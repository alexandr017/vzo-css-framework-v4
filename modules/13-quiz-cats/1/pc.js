
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
    let backgroundSize = (val - min) * 100 / (max - min);

    if (backgroundSize < 0) {
        backgroundSize = 0
    }

    target.style.backgroundSize = backgroundSize + '% 100%';
}

function setQuizInputRangeValue(input) {
    let minValue = parseInt(input.getAttribute('min'));
    let maxValue = parseInt(input.getAttribute('max'));
    let inputValue = parseInt(input.value)

    if (!minValue || !maxValue) {
        return;
    }

    if (inputValue > maxValue) {
        input.value = maxValue;
    } else if (inputValue < minValue) {
        input.value = minValue;
    }
}

document.addEventListener('DOMContentLoaded', setQuizRangeValues);
let inputQuizNumValue = document.querySelectorAll('.inputQuizNumValue')[0];
let inputQuizNum = document.querySelectorAll('.inputQuizNum')[0];
let inputQuizRangeSum = document.querySelectorAll('.inputQuizRangeSum')[0];
let inputQuizDays = document.querySelectorAll('.inputQuizDays')[0];
let inputQuizDaysValue = document.querySelectorAll('.inputQuizDaysValue')[0];
let inputQuizRangeDays = document.querySelectorAll('.inputQuizRangeDays')[0];


addSpaces(inputQuizNum, inputQuizNumValue);
addSpaces(inputQuizDays, inputQuizDaysValue);

inputQuizNumValue.addEventListener('click',function(){
    hideValBlock(inputQuizNumValue, inputQuizNum);
});

inputQuizDaysValue.addEventListener('click',function(){
    hideValBlock(inputQuizDaysValue, inputQuizDays);
});

inputQuizNum.addEventListener('change',function(){
    setQuizInputRangeValue(inputQuizNum);
    addSpaces(inputQuizNum, inputQuizNumValue);
    setTimeout(showInpBlock, 1000, inputQuizNum, inputQuizNumValue);
});

inputQuizRangeSum.addEventListener('change',function(){
    addSpaces(inputQuizNum, inputQuizNumValue);
    setTimeout(showInpBlock, 500, inputQuizNum, inputQuizNumValue);
});

inputQuizDays.addEventListener('change',function(){
    setQuizInputRangeValue(inputQuizDays);
    addSpaces(inputQuizDays, inputQuizDaysValue);
    setTimeout(showInpBlock, 1000, inputQuizDays, inputQuizDaysValue);
});

inputQuizRangeDays.addEventListener('change',function(){
    addSpaces(inputQuizDays, inputQuizDaysValue);
    setTimeout(showInpBlock, 500, inputQuizDays, inputQuizDaysValue);
});

function addQuizInputsParams(params) {
    if($$('.inputQuizNum').length != 0) {
        params['slf_summ'] = $$('.inputQuizNum')[0].value;
    }
    if($$('.inputQuizDays').length != 0) {
        params['slf_time'] = $$('.inputQuizDays')[0].value;
    }
}
if($$('.total_cards_table_js').length != 0) {
    let totalTableLastTr = $$('.total_cards_table_js')[0].querySelectorAll('tbody')[0].lastElementChild;
    let sum_max = totalTableLastTr.dataset.summax;
    let term_max = totalTableLastTr.dataset.termmax;
    let sum_min = totalTableLastTr.dataset.summin;
    let term_min = totalTableLastTr.dataset.termmin;
    if(inputQuizNum.attributes['max']){inputQuizNum.attributes['max'].value = sum_max} else inputQuizNum.setAttribute('max',sum_max);
    if(inputQuizDays.attributes['max']){inputQuizDays.attributes['max'].value = term_max} else inputQuizDays.setAttribute('max',term_max);
    if(inputQuizRangeSum.attributes['max']){inputQuizRangeSum.attributes['max'].value = sum_max} else inputQuizRangeSum.setAttribute('max',sum_max);
    if(inputQuizRangeDays.attributes['max']){inputQuizRangeDays.attributes['max'].value = term_max} else inputQuizRangeDays.setAttribute('max',term_max);
    if(inputQuizNum.attributes['min']){inputQuizNum.attributes['min'].value = sum_min} else inputQuizNum.setAttribute('min',sum_min);
    if(inputQuizDays.attributes['min']){inputQuizDays.attributes['min'].value = term_min} else inputQuizDays.setAttribute('min',term_min);
    if(inputQuizRangeSum.attributes['min']){inputQuizRangeSum.attributes['min'].value = sum_min} else inputQuizRangeSum.setAttribute('min',sum_min);
    if(inputQuizRangeDays.attributes['min']){inputQuizRangeDays.attributes['min'].value = term_min} else inputQuizRangeDays.setAttribute('min',term_min);
}
