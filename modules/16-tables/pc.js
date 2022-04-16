var firstCol = $$('.first-col');
var secondCol = $$('.second-col');

for(let i = 0; i<firstCol.length; i++){
    firstCol[i].addEventListener('mouseenter', function(){
        firstCol[i].style.background = "#D3E4FD";
        secondCol[i].style.background = "#F3F8FF";
    });
    secondCol[i].addEventListener('mouseenter', function(){
        firstCol[i].style.background = "#D3E4FD";
        secondCol[i].style.background = "#F3F8FF";
    });
    firstCol[i].addEventListener('mouseout', function(){
        firstCol[i].style.background = "#E1EDFF";
        secondCol[i].style.background = "#fff";
    });
    secondCol[i].addEventListener('mouseout', function(){
        firstCol[i].style.background = "#E1EDFF";
        secondCol[i].style.background = "#fff";
    });
}

// скрытие таблицы
let addTableWrap = (selector) => {
    selector = document.querySelectorAll('.content table');
    if ((selector).length > 0) {
        (selector).forEach((table) => {
            let tr = table.querySelectorAll('tr');

            let wrapper = document.createElement('div');
            wrapper.className = "table-scroll";
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);

            if(tr.length > 7){
                table.closest('.table-scroll').classList.add('table-toggle-wrap');
                let button = document.createElement('span');
                button.className = 'table-toggle-btn down';
                button.textContent = 'Показать всё';
                table.after(button);
                let i = 0;
                table.querySelectorAll('tr').forEach((tr) => {
                    i++;
                    if (i>7) tr.className = 'hide';
                });
            }
        });
    }
}

if ($$('.content').length > 1) {
    addTableWrap('.content table');

    $$('.table-toggle-btn').forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains('down')) {
                button.classList.add('up');
                button.classList.remove('down');
                button.textContent = 'Скрыть';
                button.previousSibling.querySelectorAll('tr.hide').forEach((tr) => {
                    tr.classList.add('show');
                    tr.classList.remove('hide');
                });
            } else {
                button.classList.add('down');
                button.classList.remove('up');
                button.textContent = 'Показать всё';
                button.previousSibling.querySelectorAll('tr.show').forEach((tr) => {
                    tr.classList.add('hide');
                    tr.classList.remove('show');
                });
            }
        });
    });
}
