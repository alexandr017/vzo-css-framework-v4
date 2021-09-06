const rangeInputs = document.querySelectorAll('input[type="range"]');
const numberInput = document.querySelector('input[type="number"]');

function handleInputChange(e) {
    let target = e.target;
    if (e.target.type !== 'range') {
        target = document.getElementById('rkoRange');
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
});

numberInput.addEventListener('input', handleInputChange);


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
