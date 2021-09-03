let rangeInputs = document.querySelectorAll('.rko-calc-range-value');
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

rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
});

numberInput.addEventListener('input', handleInputChange);
