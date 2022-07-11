let jsSelectBody = $$(".claim-select");
for (let i = 0; i < jsSelectBody.length; i++) {
    let selEl = jsSelectBody[i].getElementsByTagName("select")[0];
    let selItem = document.createElement("div");
    selItem.setAttribute("class", "selected-item");
    selItem.innerHTML = selEl.options[selEl.selectedIndex].innerHTML;
    jsSelectBody[i].appendChild(selItem);
    let selItems = document.createElement("div");
    selItems.setAttribute("class", "select-items select-hide");
    for (let j = 1; j < selEl.length; j++) {
        let selItemEl = document.createElement("div");
        selItemEl.innerHTML = selEl.options[j].innerHTML;
        selItemEl.addEventListener("click", function(e) {
            let selItemElPar = this.parentNode.parentNode.getElementsByTagName("select")[0];
            let prevSelItemEl = this.parentNode.previousSibling;
            for (let i = 0; i < selItemElPar.length; i++) {
                if (selItemElPar.options[i].innerHTML === this.innerHTML) {
                    selItemElPar.selectedIndex = i;
                    prevSelItemEl.innerHTML = this.innerHTML;
                    let selectedEl = this.parentNode.getElementsByClassName("same-as-selected");
                    for (let k = 0; k < selectedEl.length; k++) {
                        selectedEl[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            prevSelItemEl.click();
        });
        selItems.appendChild(selItemEl);
    }
    jsSelectBody[i].appendChild(selItems);
    selItem.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}


function closeAllSelect(el) {
    let arrSel = [];
    let jsSelectItems = $$(".select-items");
    let jsSelectedItem = $$(".selected-item")[0];
    if(jsSelectedItem != undefined && jsSelectedItem.length != 0) {
        for (let i = 0; i < jsSelectedItem.length; i++) {
            if (el == jsSelectedItem[i]) {
                arrSel.push(i)
            } else {
                jsSelectedItem[i].classList.remove("select-arrow-active");
                if (arrSel.indexOf(i)) {
                    jsSelectItems[i].classList.add("select-hide");
                }
            }
        }
    }
}
document.addEventListener("click", closeAllSelect);

if($$('.select-items').length != 0) {
    var selectItemsArr = $$('.select-items')[0].childNodes,
        hiddenBlock = $$('.hidden-claim-el')[0];
    for (let i = 0;i<selectItemsArr.length;i++) {
        selectItemsArr[i].addEventListener('click', function () {
            if (selectItemsArr[i].textContent === 'Другое') {
                hiddenBlock.style.display = 'block';
            } else
                hiddenBlock.style.display = 'none';
        }, false)
    }
}

var modalComplain = $$('#modalComplainForm');
if(modalComplain.length !=0) {
    modalComplain[0].addEventListener('submit',function (e) {
        e.preventDefault();
        var type_complaint = $$('#modal-complain .selected-item')[0].innerText;
        var comment = $$('.hidden-claim-el')[0].value;
        var isEmail = $$('.isEmail')[0].value;
        if (isEmail == ''){
            $$('.email-confirm')[0].style.display = "block";
            return false;
        }
        if (type_complaint === 'Выберите тип жалобы') {
            alert('Выберите тип жалобы');
            return false;
        }

        if (type_complaint === 'Другое' && comment == '') {
            alert('Вы не указали причину жалобы');
            return false;
        }

        let data = {
            '_token': document.getElementsByName('csrf-token')[0].attributes[1].nodeValue,
            'h1': ($$('.org-title').length != 0) ? $$('.org-title')[0].innerHTML.trim() : '',
            'type_complaint': type_complaint,
            'email': $$('#ttt')[0].value,
            'comment': comment
        };

        fetch('/forms/phone_complaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            $$('#modal-complain')[0].classList.remove('open');
            var modalBack =  $$('#modal-back')[0];
            modalBack.classList.add('open');
            let exits = [].slice.call(modalBack.getElementsByClassName('modal-exit'));
            exits.forEach(function (exit) {
                exit.addEventListener('click', function (event) {
                    event.preventDefault();
                    modalBack.classList.remove('open');
                });
            });
        }).catch((err) => {
            console.log(err);
        });
        return false;
    })
}
if($$('.isEmail').length != 0){
    $$('.isEmail')[0].addEventListener('input',function () {
        if ($$('.email-confirm')[0].style.display = "block") {
            $$('.email-confirm')[0].style.display = "none";
        }
    })
}

// $$('.selected-item')[0].addEventListener('click',function () {
//     var compainModalHeight = $$('#modal-complain')[0].getElementsByClassName('select-items')[0].offsetHeight;
//     var windowHeight = window.pageYOffset;
//     var selectItemsBlock = $$('.select-items')[0];
//     if(compainModalHeight+210 > windowHeight) {
//         selectItemsBlock.style.height = compainModalHeight-60+'px';
//         selectItemsBlock.style.overflowY = 'scroll'
//     } else {
//         selectItemsBlock.style.height = 'fit-content';
//         selectItemsBlock.style.overflowY = 'hidden'
//     }
// },false)
//
//

