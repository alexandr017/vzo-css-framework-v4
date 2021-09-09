let countRage = $$("#count_range_input")[0],
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

let mfoInput = $$('input[type="range"]');
let mfoNumInput =  $$('input[type="number"]');

function mfoCalcChange(e) {
    let target = e.target;
    if (e.target.type !== 'range') {
        target = $$('#rangeType')[0]
    }
    let min = target.min;
    let max = target.max;
    let val = target.value;
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

mfoInput.forEach(input => {
    input.addEventListener('input', mfoCalcChange)
});

mfoNumInput.addEventListener('input', mfoCalcChange);
