let jsSortBody = $$(".sort-select");
for (let i = 0; i < jsSortBody.length; i++) {
    let sortEl = jsSortBody[i].getElementsByTagName("select")[0];
    let sortItem = document.createElement("div");
    sortItem.setAttribute("class", "sorted-item");
    sortItem.innerHTML = sortEl.options[sortEl.selectedIndex].innerHTML;
    jsSortBody[i].appendChild(sortItem);
    let sortItems = document.createElement("div");
    sortItems.setAttribute("class", "sort-items sort-hide");
    for (let j = 0; j < sortEl.length; j++) {
        let sortItemEl = document.createElement("div");
        sortItemEl.innerHTML = sortEl.options[j].innerHTML;
        sortItemEl.addEventListener("click", function(e) {
            let sortItemElPar = this.parentNode.parentNode.getElementsByTagName("select")[0];
            let prevSortItemEl = this.parentNode.previousSibling;
            for (let i = 0; i < sortItemElPar.length; i++) {
                if (sortItemElPar.options[i].innerHTML === this.innerHTML) {
                    if(sortItemElPar.options[i].attributes['data-sort'].nodeValue == 'down'){
                        sortItem.classList.add('sort-down');
                        sortItem.classList.remove('sort-up');
                    } else if(sortItemElPar.options[i].attributes['data-sort'].nodeValue == 'up'){
                        sortItem.classList.remove('sort-down');
                        sortItem.classList.add('sort-up');
                    }
                    sortItemElPar.selectedIndex = i;
                    prevSortItemEl.innerHTML = this.innerHTML;
                    let selectedSortEl = this.parentNode.getElementsByClassName("same-as-selected");
                    for (let k = 0; k < selectedSortEl.length; k++) {
                        selectedSortEl[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            prevSortItemEl.click();
        });
        sortItems.appendChild(sortItemEl);
    }
    jsSortBody[i].appendChild(sortItems);
    sortItem.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSort(this);
        this.nextSibling.classList.toggle("sort-hide");
        this.classList.toggle("sort-arrow-active");
    });
}


function closeAllSort(el) {
    let arrSort = [];
    let jsSortItems = $$(".sort-items");
    let jsSortedItem = $$(".sorted-item");
    for (let i = 0; i < jsSortedItem.length; i++) {
        if (el == jsSortedItem[i]) {
            arrSort.push(i)
        } else {
            jsSortedItem[i].classList.remove("sort-arrow-active");
        }
    }
    for (let i = 0; i < jsSortItems.length; i++) {
        if (arrSort.indexOf(i)) {
            jsSortItems[i].classList.add("sort-hide");
        }
    }
}
document.addEventListener("click", closeAllSort);
