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
        quizRangeInput[i].style.backgroundSize = (quizRangeInput[i].value-quizRangeInput[i].min) * 100  / (quizRangeInput[i].max - quizRangeInput[i].min) + '% 100%';
    }
    for(let q = 0; q < quizRangeInput.length; q++ ) {
        quizRangeInput[q].addEventListener('input', function(){
            quizNumInput[q].style.color = "#000";
        })
    }
    for(let j = 0; j < quizNumInput.length; j++ ) {
        quizNumInput[j].addEventListener('input', function(){
            quizNumInput[j].style.color = "#000";
        })
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

addSpaces(inputQuizNum, " ₽",  inputQuizNumValue);
addSpaces(inputQuizDays, " дней",  inputQuizDaysValue);

inputQuizNumValue.addEventListener('click',function(){
    hideValBlock(inputQuizNumValue, inputQuizNum);
});

inputQuizDaysValue.addEventListener('click',function(){
    hideValBlock(inputQuizDaysValue, inputQuizDays)
});


inputQuizNum.addEventListener("change",function(){
    setQuizInputRangeValue(inputQuizNum);
    inputQuizNumValue.innerHTML = inputQuizNum.value;
    addSpaces(inputQuizNum, " ₽",  inputQuizNumValue);
    setTimeout(showInpBlock, 500, inputQuizNum, inputQuizNumValue);
});

inputQuizRangeSum.addEventListener('change',function(){
    addSpaces(inputQuizNum, " ₽",  inputQuizNumValue);
    setTimeout(showInpBlock, 500, inputQuizNum, inputQuizNumValue);
});

inputQuizDays.addEventListener("change",function(){
    setQuizInputRangeValue(inputQuizDays);
    inputQuizDaysValue.innerHTML = inputQuizDays.value;
    addSpaces(inputQuizDays, " дней",  inputQuizDaysValue);
    setTimeout(showInpBlock, 500, inputQuizDays, inputQuizDaysValue);
});

inputQuizRangeDays.addEventListener("change",function(){
    addSpaces(inputQuizDays, " дней",  inputQuizDaysValue);
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
    if(inputQuizNum.attributes['maxbytable']){inputQuizNum.attributes['maxbytable'].value = sum_max} else inputQuizNum.setAttribute('maxbytable',sum_max);
    if(inputQuizDays.attributes['maxbytable']){inputQuizDays.attributes['maxbytable'].value = term_max} else inputQuizDays.setAttribute('maxbytable',term_max);
    if(inputQuizNum.attributes['min']){inputQuizNum.attributes['min'].value = sum_min} else inputQuizNum.setAttribute('min',sum_min);
    if(inputQuizRangeSum.attributes['min']){inputQuizRangeSum.attributes['min'].value = sum_min} else inputQuizRangeSum.setAttribute('min',sum_min);
}