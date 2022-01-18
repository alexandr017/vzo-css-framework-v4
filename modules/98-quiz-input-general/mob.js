function addSpaces(el, valInp, inpBl){
    let spEl = "";
    spEl =+ el.value;
    spEl = spEl.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
    inpBl.innerHTML = spEl + valInp;
    return inpBl;
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
