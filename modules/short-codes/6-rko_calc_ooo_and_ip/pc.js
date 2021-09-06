let rangeInput = document.querySelectorAll('.rko-calc-range-value');
let numberInput = document.querySelector('.rko-num-input');

function handleInputChange(e) {
    let target = e.target;
    if (e.target.type !== 'range') {
        target = document.getElementById('rkoRange')
    }
    let min = target.min;
    let max = target.max;
    let val = target.value;
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInput.forEach(input => {
    input.addEventListener('input', handleInputChange)
});

numberInput.addEventListener('input', handleInputChange);

let rkoBlock = document.querySelectorAll('.calculator-rko-block');
    rkoBlock.forEach(function (value, index) {
    let rkoButtonShow = value.querySelector('.showHiddenBlock'),
        rkoButtonHide = value.querySelector('.hideBlock'),
        rkoHiddenBlock = value.querySelector('.hidden-rko-check-box');
        rkoButtonShow.addEventListener('click', event => {
            rkoButtonHide.style.display = 'block';
            rkoButtonShow.style.display = 'none';
            rkoHiddenBlock.style.display = 'block';
    });
        rkoButtonHide.addEventListener('click', event => {
            rkoButtonShow.style.display = 'flex';
            rkoButtonHide.style.display = 'none';
            rkoHiddenBlock.style.display = 'none';
    });
});
