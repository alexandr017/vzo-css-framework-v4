function addSpaces(el, inpBl){
    let spEl = "";
    spEl =+ el.value;
    spEl = spEl.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
    inpBl.innerHTML = spEl;
    return inpBl;
}

function addStyleSpaces(a, b){
    a.style.display = "none";
    b.style.display = "block";
    b.style.color = "#000";
}

function hideValBlock(a,b){
    a.style.display = "none";
    b.style.display = "block";
    b.focus();
}
