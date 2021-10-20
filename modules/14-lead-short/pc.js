$$('.lead-more').forEach((elem)=>{
    elem.addEventListener('click',function () {
        let leadBlock = elem.parentElement;
        leadBlock.getElementsByClassName('lead-hide-text')[0].style.display = 'block';
        elem.style.display = 'none';
        leadBlock.getElementsByClassName('lead-less')[0].style.display = 'flex';
    },false)
})
$$('.lead-less').forEach((elem)=>{
    elem.addEventListener('click',function () {
        let leadBlock = elem.parentElement;
        leadBlock.getElementsByClassName('lead-hide-text')[0].style.display = 'none';
        elem.style.display = 'none';
        leadBlock.getElementsByClassName('lead-more')[0].style.display = 'flex';
    },false)
})