// function setQuizRangeValues() {
//     let quizNumInput = document.querySelectorAll('.quiz-num-value');
//     let quizRangeInput = document.querySelectorAll('.quiz-range-value');
//     quizRangeInput.forEach(input => {
//         input.addEventListener('input', quizInpChange)
//     });
//     quizNumInput.forEach(input => {
//         input.addEventListener('input', quizInpChange)
//     });
//     for (let i = 0; i < quizNumInput.length; i++) {
//         quizRangeInput[i].style.backgroundSize = quizRangeInput[i].value * 100  / (quizRangeInput[i].max - quizRangeInput[i].min) + '% 100%';
//     }
//     for(let q = 0; q < quizRangeInput.length; q++ ) {
//         quizRangeInput[q].addEventListener('input', function(){
//             quizNumInput[q].style.color = "#000";
//             $$('.quiz-num-desc')[0].style.color = "#000";
//         })
//     }
//     for(let j = 0; j < quizNumInput.length; j++ ) {
//         quizNumInput[j].addEventListener('input', function(){
//             quizNumInput[j].style.color = "#000";
//             $$('quiz-num-desc')[0].style.color = "#000";
//         })
//     }
// }
// function quizInpChange(e) {
//     let target = e.target;
//     let val = target.value;
//     let min = target.min;
//     let max = target.max;
//     if (e.target.type == 'range') {
//         target.parentElement.getElementsByClassName('quiz-num-value')[0].value = val;
//     } else {
//         target = target.parentElement.getElementsByClassName('quiz-range-value')[0];
//         target.value = val;
//     }
//     target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
// }
//
// document.addEventListener('DOMContentLoaded', setQuizRangeValues);
//
// let inputQuizNumValue = document.querySelectorAll('.inputQuizNumValue')[0];
// let inputQuizNum = document.querySelectorAll('.inputQuizNum')[0];
// let inputQuizRangeSum = document.querySelectorAll('.inputQuizRangeSum')[0];
// let inputQuizDays = document.querySelectorAll('.inputQuizDays')[0];
// let inputQuizDaysValue = document.querySelectorAll('.inputQuizDaysValue')[0];
// let inputQuizRangeDays = document.querySelectorAll('.inputQuizRangeDays')[0];
// let spEl = "";
//
// inputQuizNumValue.addEventListener('click',function(){
//     inputQuizNumValue.style.display="none";
//     inputQuizNum.style.display = "block";
//     inputQuizNum.focus();
// });
//
// inputQuizDaysValue.addEventListener('click',function(){
//     inputQuizDaysValue.style.display="none";
//     inputQuizDays.style.display = "block";
//     inputQuizDays.focus();
// });
//
// function addSpaces(el, valInp, inpBl){
//     spEl =+ el.value;
//     spEl = spEl.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
//     inpBl.innerHTML = spEl + valInp;
//     return inpBl;
// }
// function addStyleSpaces(a, b){
//     a.style.display = "none";
//     b.style.display = "block";
//     b.style.color = "#000";
// }
//
// addSpaces(inputQuizNum, " ₽",  inputQuizNumValue);
// addSpaces(inputQuizDays, " дней",  inputQuizDaysValue);
//
// inputQuizNum.addEventListener("input",function(){
//     addSpaces(inputQuizNum, " ₽",  inputQuizNumValue);
//     setTimeout(addStyleSpaces, 1000, inputQuizNum, inputQuizNumValue);
// });
//
// inputQuizRangeSum.addEventListener('change',function(){
//     addSpaces(inputQuizNum, " ₽",  inputQuizNumValue);
//     setTimeout(addStyleSpaces, 500, inputQuizNum, inputQuizNumValue);
// });
//
// inputQuizDays.addEventListener("input",function(){
//     addSpaces(inputQuizDays, " дней",  inputQuizDaysValue);
//     setTimeout(addStyleSpaces, 1000, inputQuizDays, inputQuizDaysValue);
// });
//
// inputQuizRangeDays.addEventListener("change",function(){
//     addSpaces(inputQuizDays, " дней",  inputQuizDaysValue);
//     setTimeout(addStyleSpaces, 500, inputQuizDays, inputQuizDaysValue);
// });
var rangInputs = document.querySelectorAll('.quiz-block input[type=range]');
for(let i=0;i<rangInputs.length;i++) {
    rangInputs[i].addEventListener('input',function (e) {
        let valOfRangeInp = e.target.value;
        let closestTextInpBlock = e.target.previousElementSibling;
        if(closestTextInpBlock.length != 0){
            closestTextInpBlock.innerHTML = valOfRangeInp;
        }
    })
}
