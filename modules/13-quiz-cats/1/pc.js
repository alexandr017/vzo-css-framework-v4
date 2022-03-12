
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

inputQuizNum.addEventListener('input',function(){
    addSpaces(inputQuizNum, inputQuizNumValue);
    setTimeout(showInpBlock, 1000, inputQuizNum, inputQuizNumValue);
});

inputQuizRangeSum.addEventListener('change',function(){
    addSpaces(inputQuizNum, inputQuizNumValue);
    setTimeout(showInpBlock, 500, inputQuizNum, inputQuizNumValue);
});

inputQuizDays.addEventListener('input',function(){
    addSpaces(inputQuizDays, inputQuizDaysValue);
    setTimeout(showInpBlock, 1000, inputQuizDays, inputQuizDaysValue);
});

inputQuizRangeDays.addEventListener('change',function(){
    addSpaces(inputQuizDays, inputQuizDaysValue);
    setTimeout(showInpBlock, 500, inputQuizDays, inputQuizDaysValue);
});