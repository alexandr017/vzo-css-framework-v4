$$('.lead-more').forEach((elem)=>{
    elem.addEventListener('click',function () {
        let leadBlock = elem.parentElement;
        leadBlock.getElementsByClassName('lead-hide-text')[0].classList.remove('lead-hide-text');
        elem.style.display = 'none';
        leadBlock.getElementsByClassName('lead-less')[0].style.display = 'flex';
    },false)
})
$$('.lead-less').forEach((elem)=>{
    elem.addEventListener('click',function () {
        let leadBlock = elem.parentElement;
        leadBlock.getElementsByClassName('lead-text')[0].classList.add('lead-hide-text');;
        elem.style.display = 'none';
        leadBlock.getElementsByClassName('lead-more')[0].style.display = 'flex';
    },false)
})