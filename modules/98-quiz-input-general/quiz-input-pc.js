function addSpaces(el, inpBl){
    if(el) {
        let spEl = "";
        if(isNaN(el.value)) {
            el.value = el.value.toString().replace(/[^0-9.]/g, '');
        }
        spEl =+ el.value;
        let simbolPlus = '';
        if(inpBl.innerHTML.replace(' ','') == el.value+'+' || Number(el.getAttribute('valuebeforechange')) > Number(el.getAttribute('maxbytable'))) {
            simbolPlus = '+';
        }
        spEl = spEl.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
        inpBl.innerHTML = spEl+simbolPlus;
        return inpBl;
    }
}

function showInpBlock(a, b){
    a.style.display = "none";
    b.style.display = "block";
    b.style.color = "#000";
}

function hideValBlock(a, b){
    a.style.display = "none";
    b.style.display = "block";
    b.focus();
}
