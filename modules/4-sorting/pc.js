let elemsForSort = [];
let elemsForSortByAnswer = [];
let selectMenu = document.querySelectorAll('.selected-item');
let indexItem = 1;
selectMenu.forEach(a => {
    a.addEventListener('click', b => {
        let nextEl = b.target.nextElementSibling;
nextEl.classList.toggle('toggleSelect');
nextEl.style.zIndex = indexItem++;
a.classList.toggle('openSelect');
a.dataset.type = (a.dataset.type == 'up') ? 'down' : 'up';
})
});
//клиентская сортировка(сли нужна серверная сортировка,подключить файл public\v4\js\sorting-load-cards\load.js)
if($$('.sort').length != 0 && $$('.sort')[0].classList.contains('with-pagination')) {
    var options = $$('.sort')[0].getElementsByClassName('option');
    for(let i =0;i<options.length;i++) {
        options[i].addEventListener('click',function (e) {
            e.target.parentElement.classList.remove('toggleSelect');
            let parentEl = e.target.closest('.select').children[0];
            let dataType = e.target.getAttribute('data-type');
            parentEl.setAttribute('data-type', dataType);
            parentEl.setAttribute('data-field', e.target.getAttribute('data-field'));
            parentEl.innerText = e.target.innerText;
            parentEl.classList.remove('openSelect');
            getSort(e);
        },false)
    }
    var getSort = ({ target }) => {
        target =  target.closest('.option');
        const order = (target.dataset.type == 'up') ? -1 : 1;
        var arrForSort = [];
        var elementsBlock = $$('.offers-list')[0];
        if(window.itemsArr) {
            arrForSort = window.itemsArr;
        } else {
            arrForSort = [].slice.call(elementsBlock.children);
        }
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (order) => (a, b) => {
            var firstItem  = (a.querySelector("[data-"+target.dataset.field+"]") != null) ? a.querySelector("[data-"+target.dataset.field+"]").innerHTML : '0';
            var secondItem = (b.querySelector("[data-"+target.dataset.field+"]") != null) ? b.querySelector("[data-"+target.dataset.field+"]").innerHTML : '0';
            return order * collator.compare(
                firstItem.replace(/\s/g, ''),
                secondItem.replace(/\s/g, '')
            )
        };
        elementsBlock.innerHTML = '';
        var sortedArr = [];
        sortedArr.push(...[...arrForSort].sort(comparator(order)));
        offersListItemsArr = [...sortedArr];
        if($$('.pagination').length != 0) {
            page(1,sortedArr);
        } else {
            sortedArr.forEach((elem)=>{
                elementsBlock.append(elem);
        });
        }
    };
}
//end клиентская сортировка
document.addEventListener('click',function (e) {
    if(e.target.closest('.select') == null) {
        if(document.getElementsByClassName('selected-item').length != 0 && document.getElementsByClassName('selected-dropdown').length != 0) {
            let selectedItem = document.getElementsByClassName('selected-item')[0];
            let selDropdown = document.getElementsByClassName('selected-dropdown')[0];
            selDropdown.classList.remove('toggleSelect');
            selectedItem.classList.remove('openSelect');
            selectedItem.dataset.type = 'up';
        }
    }
})
