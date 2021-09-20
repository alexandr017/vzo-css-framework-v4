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
    let jsSelectedItem = $$(".selected-item");
    for (let i = 0; i < jsSelectedItem.length; i++) {
        if (el == jsSelectedItem[i]) {
            arrSel.push(i)
        } else {
            jsSelectedItem[i].classList.remove("select-arrow-active");
        }
    }
    for (let i = 0; i < jsSelectItems.length; i++) {
        if (arrSel.indexOf(i)) {
            jsSelectItems[i].classList.add("select-hide");
        }
    }
}
document.addEventListener("click", closeAllSelect);

function claimHiddenTextArea(){
    let selectValue = $$('.same-as-selected'),
        hiddenBlock = $$('.hidden-claim-el')[0];
    for (let i = 0; i < selectValue.length; i++) {
        if (selectValue[0].textContent === 'Другое') {
            hiddenBlock.style.display = 'block';
        } else
            hiddenBlock.style.display = 'none';
    }
}
document.addEventListener("click", claimHiddenTextArea);



