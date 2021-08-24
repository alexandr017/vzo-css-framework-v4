const rangeInputs = $$('input[type="range"]')
const numberInput = $$('input[type="number"]')

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = $$('#range')[0]
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