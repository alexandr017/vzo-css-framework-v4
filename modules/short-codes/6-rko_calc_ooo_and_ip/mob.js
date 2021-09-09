let rkoCalcValue = document.querySelectorAll('.rko-calc-range-value');
let rkoNumInput = document.querySelector('.rko-num-input');

function rkoCalcChange(e) {
    let target = e.target;
    if (e.target.type !== 'range') {
        target = document.getElementById('rkoRange')
    }
    let min = target.min;
    let max = target.max;
    let val = target.value;
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rkoCalcValue.forEach(input => {
    input.addEventListener('input', rkoCalcChange)
});

rkoNumInput.addEventListener('input', rkoCalcChange);

let rkoBlock = document.querySelectorAll('.calculator-rko-block');
rkoBlock.forEach(function (value, index) {
    let buttonShow = value.querySelector('.showHiddenBlock'),
        buttonHide = value.querySelector('.hideBlock'),
        rkoHiddenBlock = value.querySelector('.hidden-rko-check-box');
    buttonShow.addEventListener('click', event => {
        buttonHide.style.display = 'block';
        buttonShow.style.display = 'none';
        rkoHiddenBlock.style.display = 'block';
    });
    buttonHide.addEventListener('click', event => {
        buttonShow.style.display = 'flex';
        buttonHide.style.display = 'none';
        rkoHiddenBlock.style.display = 'none';
    });
});
