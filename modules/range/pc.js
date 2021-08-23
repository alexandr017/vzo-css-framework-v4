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


document.addEventListener('input', event => {
    const {value, min, max, parentNode} = event.srcElement;
    parentNode
        .querySelector('.l-slider-track > div')
        .style
        .width = 100 * (value - min) / (max - min) + '%';
});


document.addEventListener('input', event => {
    const {value, min, max, parentNode} = event.srcElement;
    parentNode
        .querySelector('.l-slider-track > div')
        .style
        .width = 100 * (value - min) / (max - min) + '%';
});

const rangeInputs = $$('input[type="range"]')
const numberInput = $$('input[type="number"]')

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = $$('range')[0]
    }
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
})

numberInput.addEventListener('input', handleInputChange)
