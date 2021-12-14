let selectMenu = document.querySelectorAll('.selected-item');
let optionMenu = document.querySelectorAll('.option');
let indexItem = 1;

selectMenu.forEach(a => {
    a.addEventListener('click', b => {
        let nextEl = b.target.nextElementSibling;
        nextEl.classList.toggle('toggleSelect');
        nextEl.style.zIndex = indexItem++;
        a.classList.toggle('openSelect');
    })
});
optionMenu.forEach(a => {
    a.addEventListener('click', b => {
        b.target.parentElement.classList.remove('toggleSelect');
        let parentEl = b.target.closest('.select').children[0];
        parentEl.setAttribute('data-type', b.target.getAttribute('data-type'));
        parentEl.innerText = b.target.innerText;
        parentEl.classList.remove('openSelect');
    })
});
document.addEventListener('click',function (e) {
    if(!e.target.classList.contains('openSelect')){
        var openedSelect = document.getElementsByClassName('openSelect');
        if(openedSelect.length != 0) {
            openedSelect[0].classList.remove('openSelect');
            document.querySelectorAll('.sort .toggleSelect')[0].classList.remove('toggleSelect');
        }
    }
},false)
