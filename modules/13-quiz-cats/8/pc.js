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
        if(val == '') {
            val = 0;
        }
        target.value = val;
    }
    let backgroundSize = (val - min) * 100 / (max - min);

    if (backgroundSize < 0) {
        backgroundSize = 0
    }

    target.style.backgroundSize = backgroundSize + '% 100%';
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

inputQuizNum.addEventListener('change',function(){
    setQuizInputRangeValue(inputQuizNum);
    inputQuizNumValue.innerHTML = inputQuizNum.value;
    addSpaces(inputQuizNum, inputQuizNumValue);
    setTimeout(showInpBlock, 500, inputQuizNum, inputQuizNumValue);
});

inputQuizRangeSum.addEventListener('change',function(){
    addSpaces(inputQuizNum, inputQuizNumValue);
    setTimeout(showInpBlock, 500, inputQuizNum, inputQuizNumValue);
});

inputQuizTerm.addEventListener('change',function(){
    setQuizInputRangeValue(inputQuizTerm);
    inputQuizTermValue.innerHTML = inputQuizTerm.value;
    addSpaces(inputQuizTerm, inputQuizTermValue);
    setTimeout(showInpBlock, 500, inputQuizTerm, inputQuizTermValue);
});

inputQuizRangeTerm.addEventListener('change',function(){
    addSpaces(inputQuizTerm, inputQuizTermValue);
    setTimeout(showInpBlock, 500, inputQuizTerm, inputQuizTermValue);
});
function addQuizInputsParams(params) {
    if($$('#autocreditSum').length != 0) {
        params['slf_summ'] = $$('#autocreditSum')[0].value;
    }
    if($$('#autocreditTerm').length != 0) {
        params['slf_time'] = $$('#autocreditTerm')[0].value;
    }
}

if($$('.total_cards_table_js').length != 0) {
    let totalTableLastTr = $$('.total_cards_table_js')[0].querySelectorAll('tbody')[0].lastElementChild;
    let sum_max = totalTableLastTr.dataset.summax;
    let term_max = totalTableLastTr.dataset.termmax;
    let sum_min = totalTableLastTr.dataset.summin;
    let term_min = totalTableLastTr.dataset.termmin;
    if(inputQuizNum.attributes['maxbytable']){inputQuizNum.attributes['maxbytable'].value = sum_max} else inputQuizNum.setAttribute('maxbytable',sum_max);
    if(inputQuizTerm.attributes['maxbytable']){inputQuizTerm.attributes['maxbytable'].value = term_max} else inputQuizTerm.setAttribute('maxbytable',term_max);
    if(inputQuizNum.attributes['min']){inputQuizNum.attributes['min'].value = sum_min} else inputQuizNum.setAttribute('min',sum_min);
    if(inputQuizRangeSum.attributes['min']){inputQuizRangeSum.attributes['min'].value = sum_min} else inputQuizRangeSum.setAttribute('min',sum_min);
}
