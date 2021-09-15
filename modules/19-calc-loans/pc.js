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

