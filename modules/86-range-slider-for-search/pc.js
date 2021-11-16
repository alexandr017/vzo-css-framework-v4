function searchSlider() {
    let searchTextInput = document.querySelectorAll('.search-block-num-input');
    let searchRangeInput = document.querySelectorAll('.search-block-range-input');
    for (let i = 0; i < searchTextInput.length; i++) {
        searchRangeInput[i].style.backgroundSize = searchRangeInput[i].value * 100  / (searchRangeInput[i].max - searchRangeInput[i].min) + '% 100%';
        function searchSliderChange(e) {
            for (let j = 0; j < searchRangeInput.length; j++) {
                let target = e.target;
                if (e.target.type !== 'range') {
                    target = searchRangeInput[j];
                }
                let min = target.min;
                let max = target.max;
                let val = target.value;
                target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
            }
        }
        searchRangeInput.forEach(input => {
            input.addEventListener('input', searchSliderChange)
        });
        searchTextInput[i].addEventListener('input', searchSliderChange);
    }
}
document.addEventListener('DOMContentLoaded', searchSlider);
