var countRage = document.getElementById("count_range_input"),
    res = document.getElementById("count_range_input_sum");

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

const rangeInputs = document.querySelectorAll('input[type="range"]')
const numberInput = document.querySelector('input[type="number"]')

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
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
