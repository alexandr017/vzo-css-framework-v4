if($$('.pagination-inner-link').length != 0) {
    $$('.pagination-inner-link').forEach((page)=>{
        page.addEventListener('click',function (e) {
            bankPage(e);
        },false)
    })
    $$('.pagination-current-page')[0].addEventListener('click',function (e) {
        bankPage(e);
    }, false)
}
function bankPage(e) {
    let bankPage = $$('.banks-page-'+e.target.innerText);
    if(bankPage.length !=0){
        $$('.active_page')[0].style.display = 'none';
        $$('.active_page')[0].classList.remove('active_page');
        bankPage[0].style.display = 'block';
        bankPage[0].classList.add('active_page');
        $$('.pagination-current-page')[0].classList.add('pagination-inner-link');
        $$('.pagination-current-page')[0].classList.remove('pagination-current-page');
        e.target.classList.add('pagination-current-page');
        e.target.classList.remove('pagination-inner-link');
    }
}