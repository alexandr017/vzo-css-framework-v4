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
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

document.addEventListener('DOMContentLoaded', setQuizRangeValues);

