
function setQuizRangeValues() {
    let quizNumInput = document.querySelectorAll('.quiz-num-value');
    let quizRangeInput = document.querySelectorAll('.quiz-range-value');
    quizRangeInput.forEach(input => {
        input.addEventListener('input', quizInpChange)
    });
    quizNumInput.forEach(input => {
        input.addEventListener('input', quizInpChange)
    });
    for (let i = 0; i < quizNumInput.length; i++) {
        quizRangeInput[i].style.backgroundSize = quizRangeInput[i].value * 100  / (quizRangeInput[i].max - quizRangeInput[i].min) + '% 100%';
    }
}
function quizInpChange(e) {
    let target = e.target;
    let val = target.value;
    let min = target.min;
    let max = target.max;
    if (e.target.type == 'range') {
        target.parentElement.getElementsByClassName('quiz-num-value')[0].value = val;
    } else {
        target = target.parentElement.getElementsByClassName('quiz-range-value')[0];
        target.value = val;
    }
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

document.addEventListener('DOMContentLoaded', setQuizRangeValues);
let inputQuizNumValue = document.querySelectorAll('.inputQuizNumValue')[0];
let inputQuizNum = document.querySelectorAll('.inputQuizNum')[0];
let inputQuizRangeSum = document.querySelectorAll('.inputQuizRangeSum')[0];
let inputQuizDays = document.querySelectorAll('.inputQuizDays')[0];
let inputQuizDaysValue = document.querySelectorAll('.inputQuizDaysValue')[0];
let inputQuizRangeDays = document.querySelectorAll('.inputQuizRangeDays')[0];


addSpaces(inputQuizNum, inputQuizNumValue);
addSpaces(inputQuizDays, inputQuizDaysValue);

inputQuizNumValue.addEventListener('click',function(){
    hideValBlock(inputQuizNumValue, inputQuizNum);
});

inputQuizDaysValue.addEventListener('click',function(){
    hideValBlock(inputQuizDaysValue, inputQuizDays);
});

inputQuizNum.addEventListener('input',function(){
    addSpaces(inputQuizNum, inputQuizNumValue);
    setTimeout(showInpBlock, 1000, inputQuizNum, inputQuizNumValue);
});

inputQuizRangeSum.addEventListener('change',function(){
    addSpaces(inputQuizNum, inputQuizNumValue);
    setTimeout(showInpBlock, 500, inputQuizNum, inputQuizNumValue);
});

inputQuizDays.addEventListener('input',function(){
    addSpaces(inputQuizDays, inputQuizDaysValue);
    setTimeout(showInpBlock, 1000, inputQuizDays, inputQuizDaysValue);
});

inputQuizRangeDays.addEventListener('change',function(){
    addSpaces(inputQuizDays, inputQuizDaysValue);
    setTimeout(showInpBlock, 500, inputQuizDays, inputQuizDaysValue);
});
if($$('.search-by-quiz-btn').length != 0) {
    $$('.search-by-quiz-btn')[0].addEventListener('click', () => {
        console.log('click');

    window.NUMBER_PAGE = 1;

    var params = {};
    params['field'] = window.SORT_FIELD;
    params['page'] = window.NUMBER_PAGE;
    params['listing_id'] = window.LISTING_ID;
    params['category_id'] = window.CATEGORY_ID;
    params['count_on_page'] = window.COUNT_ON_PAGE;
    params['options'] = {};
    params['sort_type'] = window.SORT_TYPE;
    params['section_type'] = window.SECTION_TYPE;
    if($$('.inputQuizNum').length != 0) {
        params['slf_summ'] = $$('.inputQuizNum')[0].value;
    }
    if($$('.inputQuizDays').length != 0) {
        params['slf_time'] = $$('.inputQuizDays')[0].value;
    }


    fetch('/actions/load_cards_for_listings?' + new URLSearchParams(params), {
        method: 'GET',
    }).then((res) => {
        return res.json().then((data) => {
            let countOffers = wordDeclension(data['count'], [' предложение ', ' предложения ', ' предложений ']);
    let [day, month, year] = getCurrentDate();
    $$('.quiz-count-cards')[0].innerHTML = 'Подобрано ' + data['count'] + ' ' + countOffers + ' на ' +  day + '.' + month + '.' + year;
    $$('.offers-list')[0].innerHTML = data['code'];
    updateCardsLoadButton(data['count']);
    addCardsBtnsEvents();
}).catch((err) => {
        console.log(err);
})
});
});
}
if($$('.total_cards_table_js').length != 0) {
    let totalTableLastTr = $$('.total_cards_table_js')[0].querySelectorAll('[data-sum]')[0];
    let sum_max = totalTableLastTr.dataset.sum;
    let term_max = totalTableLastTr.dataset.term;
    if(inputQuizNum.attributes['max']){inputQuizNum.attributes['max'].value = sum_max} else inputQuizNum.setAttribute('max',sum_max);
    if(inputQuizDays.attributes['max']){inputQuizDays.attributes['max'].value = term_max} else inputQuizDays.setAttribute('max',term_max);
    if(inputQuizRangeSum.attributes['max']){inputQuizRangeSum.attributes['max'].value = sum_max} else inputQuizRangeSum.setAttribute('max',sum_max);
    if(inputQuizRangeDays.attributes['max']){inputQuizRangeDays.attributes['max'].value = term_max} else inputQuizRangeDays.setAttribute('max',term_max);
}
