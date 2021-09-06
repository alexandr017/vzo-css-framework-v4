var countRage = $$("#count_range_input")[0],
    res = $$("#count_range_input_sum")[0];

countRage.addEventListener("input", function() {
    res.innerHTML = "" + countRage.value;
}, false);

function getListContent() {
    let result = [];
    for(let i = 0; i<=100; i+=5) {
        let li = document.createElement('li');
        li.append(i);
        result.push(li);
    }
    return result;
}
ul.append(...getListContent());

let rangeInputs = $$('input[type="range"]');
let numberInput =  $$('input[type="number"]');

function handleInputChange(e) {
    let target = e.target;
    if (e.target.type !== 'range') {
        target = document.getElementById('rangeType')
    }
    let min = target.min;
    let max = target.max;
    let val = target.value;
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
});

numberInput.addEventListener('input', handleInputChange);
