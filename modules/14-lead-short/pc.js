if($$('.lead-hide-show').length != 0) {
    $$('.lead-hide-show').forEach((elem)=>{
        elem.addEventListener('click',function (elem) {
            var elem = elem.target;
            let leadBlock = elem.parentElement;
            elem.classList.toggle('lead-less');
            elem.classList.toggle('lead-more');
            if(elem.classList.contains('lead-less')) {
                leadBlock.getElementsByClassName('lead-text')[0].classList.remove('lead-hide-text');
            } else {
                leadBlock.getElementsByClassName('lead-text')[0].classList.add('lead-hide-text');
            }
        },false)
    })
}