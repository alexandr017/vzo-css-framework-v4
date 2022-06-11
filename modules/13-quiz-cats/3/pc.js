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
function addQuizInputsParams(params) {
    if($$('.inputQuizNum').length != 0) {
        params['slf_summ'] = $$('.inputQuizNum')[0].value;
    }
    if($$('.inputQuizTerm').length != 0) {
        params['slf_time'] = $$('.inputQuizTerm')[0].value;
    }
}
