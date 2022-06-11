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
let inputQuizNumValue = document.querySelectorAll('.inputQuizNumValue')[0];
let inputQuizNum = document.querySelectorAll('.inputQuizNum')[0];
let inputQuizRangeSum = document.querySelectorAll('.inputQuizRangeSum')[0];
let inputQuizTerm = document.querySelectorAll('.inputQuizTerm')[0];
let inputQuizTermValue = document.querySelectorAll('.inputQuizTermValue')[0];
let inputQuizRangeTerm = document.querySelectorAll('.inputQuizRangeTerm')[0];


addSpaces(inputQuizNum, inputQuizNumValue);
addSpaces(inputQuizTerm, inputQuizTermValue);

inputQuizNumValue.addEventListener('click',function(){
    hideValBlock(inputQuizNumValue, inputQuizNum);
});

inputQuizTermValue.addEventListener('click',function(){
    hideValBlock(inputQuizTermValue, inputQuizTerm);
});

inputQuizNum.addEventListener('input',function(){
    addSpaces(inputQuizNum, inputQuizNumValue);
    setTimeout(showInpBlock, 1000, inputQuizNum, inputQuizNumValue);
});

inputQuizRangeSum.addEventListener('change',function(){
    addSpaces(inputQuizNum, inputQuizNumValue);
    setTimeout(showInpBlock, 500, inputQuizNum, inputQuizNumValue);
});

inputQuizTerm.addEventListener('input',function(){
    addSpaces(inputQuizTerm, inputQuizTermValue);
    setTimeout(showInpBlock, 1000, inputQuizTerm, inputQuizTermValue);
});

inputQuizRangeTerm.addEventListener('change',function(){
    addSpaces(inputQuizTerm, inputQuizTermValue);
    setTimeout(showInpBlock, 500, inputQuizTerm, inputQuizTermValue);
});
function addQuizInputsParams(params)() {
    if($$('#mortgageSum').length != 0) {
        params['slf_summ'] = $$('#mortgageSum')[0].value;
    }
    if($$('#mortgageTerm').length != 0) {
        params['slf_time'] = $$('#mortgageTerm')[0].value;
    }
}
if($$('.total_cards_table_js').length != 0) {
    let totalTableLastTr = $$('.total_cards_table_js')[0].querySelectorAll('tbody')[0].lastElementChild;
    let sum_max = totalTableLastTr.dataset.summax;
    let term_max = totalTableLastTr.dataset.termmax;
    let sum_min = totalTableLastTr.dataset.summin;
    let term_min = totalTableLastTr.dataset.termmin;
    if(inputQuizNum.attributes['max']){inputQuizNum.attributes['max'].value = sum_max} else inputQuizNum.setAttribute('max',sum_max);
    if(inputQuizTerm.attributes['max']){inputQuizTerm.attributes['max'].value = term_max} else inputQuizTerm.setAttribute('max',term_max);
    if(inputQuizRangeSum.attributes['max']){inputQuizRangeSum.attributes['max'].value = sum_max} else inputQuizRangeSum.setAttribute('max',sum_max);
    if(inputQuizRangeTerm.attributes['max']){inputQuizRangeTerm.attributes['max'].value = term_max} else inputQuizRangeTerm.setAttribute('max',term_max);
    if(inputQuizNum.attributes['min']){inputQuizNum.attributes['min'].value = sum_min} else inputQuizNum.setAttribute('min',sum_min);
    if(inputQuizTerm.attributes['min']){inputQuizTerm.attributes['min'].value = term_min} else inputQuizTerm.setAttribute('min',term_min);
    if(inputQuizRangeSum.attributes['min']){inputQuizRangeSum.attributes['min'].value = sum_min} else inputQuizRangeSum.setAttribute('min',sum_min);
    if(inputQuizRangeTerm.attributes['min']){inputQuizRangeTerm.attributes['min'].value = term_min} else inputQuizRangeTerm.setAttribute('min',term_min);
}
