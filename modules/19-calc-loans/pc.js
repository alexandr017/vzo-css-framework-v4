function loanCalc() {
    let loanNumInput = document.querySelectorAll('.overpayment-num-input');
    let loanRangeInput = document.querySelectorAll('.overpayment-range-input');
    for (let i = 0; i < loanNumInput.length; i++) {
        loanRangeInput[i].style.backgroundSize = loanRangeInput[i].value * 100  / (loanRangeInput[i].max - loanRangeInput[i].min) + '% 100%';

        function loanCalcChange(e) {
            for (let j = 0; j < loanRangeInput.length; j++) {
                let target = e.target;
                if (e.target.type !== 'range') {
                    target = loanRangeInput[j];
                }
                let min = target.min;
                let max = target.max;
                let val = target.value;
                target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
            }
        }
        loanRangeInput.forEach(input => {
            input.addEventListener('input', loanCalcChange)
        });
        loanNumInput[i].addEventListener('input', loanCalcChange);
    }
}
document.addEventListener('DOMContentLoaded', loanCalc);


var sum = document.getElementById("lRangeSumInput");
var days = document.getElementById("lPeriodRangeInput");
var percent = document.getElementById("lPercentRangeInput");
var category = document.getElementById('mc_term');

function calculate() {


    var sumValue = parseFloat(sum.value);
    var daysValue = parseFloat(days.value);
    var perentValue = parseFloat(percent.value.replace(',', '.'));
    // var category_id = category.getAttribute('data-category-id');

    // if (category_id == 7) {
    //     var total = sumValue * daysValue * perentValue / 700;
    // } else {
    var total = sumValue * perentValue * 0.01 * daysValue;
    // }

    total = total.toFixed(2);
    total = total.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
    total = total.toString().slice(0, -3);
    document.getElementById('total').innerHTML = total;

}

let inputCalcSumValue = document.querySelectorAll('.inputCalcSumValue')[0];
let inputCalcSum = document.querySelectorAll('.inputCalcSum')[0];
let inputRangeSumCalc = document.querySelectorAll('.inputRangeSumCalc')[0];

let inputCalcDaysValue = document.querySelectorAll('.inputCalcDaysValue')[0];
let inputCalcDays = document.querySelectorAll('.inputCalcDays')[0];
let inputRangeDaysCalc = document.querySelectorAll('.inputRangeDaysCalc')[0];

let inputCalcPercentValue = document.querySelectorAll('.inputCalcPercentValue')[0];
let inputCalcPercent = document.querySelectorAll('.inputCalcPercent')[0];
let inputRangePercentCalc = document.querySelectorAll('.inputRangePercentCalc')[0];

inputCalcSumValue.addEventListener('click',function(){
    inputCalcSumValue.style.display="none";
    inputCalcSum.style.display = "block";
    inputCalcSum.focus();
});

inputCalcDaysValue.addEventListener('click',function(){
    inputCalcDaysValue.style.display="none";
    inputCalcDays.style.display = "block";
    inputCalcDays.focus();
});

inputCalcPercentValue.addEventListener('click',function(){
    inputCalcPercentValue.style.display="none";
    inputCalcPercent.style.display = "block";
    inputCalcPercent.focus();
});

addSpaces(inputCalcSum, inputCalcSumValue);
addSpaces(inputCalcDays, inputCalcDaysValue);
addSpaces(inputCalcPercent, inputCalcPercentValue);

inputCalcSum.addEventListener('input',function(){
    addSpaces(inputCalcSum, inputCalcSumValue);
    setTimeout(addStyleSpaces, 1000, inputCalcSum, inputCalcSumValue);
});

inputRangeSumCalc.addEventListener('change',function(){
    addSpaces(inputCalcSum, inputCalcSumValue);
    setTimeout(addStyleSpaces, 500, inputCalcSum, inputCalcSumValue);
});

inputCalcDays.addEventListener('input',function(){
    addSpaces(inputCalcDays, inputCalcDaysValue);
    setTimeout(addStyleSpaces, 1000, inputCalcDays, inputCalcDaysValue);
});

inputRangeDaysCalc.addEventListener('change',function(){
    addSpaces(inputCalcDays, inputCalcDaysValue);
    setTimeout(addStyleSpaces, 500, inputCalcDays, inputCalcDaysValue);
});

inputCalcPercent.addEventListener('input',function(){
    addSpaces(inputCalcPercent, inputCalcPercentValue);
    setTimeout(addStyleSpaces, 1000, inputCalcPercent, inputCalcPercentValue);
});

inputRangePercentCalc.addEventListener('change',function(){
    addSpaces(inputCalcPercent, inputCalcPercentValue);
    setTimeout(addStyleSpaces, 1000, inputCalcPercent, inputCalcPercentValue);
});