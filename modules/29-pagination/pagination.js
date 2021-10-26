function addPagesClick() {
    if($$('.pagination-inner-link').length != 0) {
        $$('.pagination-inner-link').forEach((elem)=>{
            elem.addEventListener('click',function (e) {
                page(e);
            },false)
        })
        $$('.pagination-current-page')[0].addEventListener('click',function (e) {
            page(e);
        }, false)
    }
}
function page(e) {
    let page = $$('.page-'+e.target.innerText);
    if(page.length !=0){
        $$('.active_page')[0].style.display = 'none';
        $$('.active_page')[0].classList.remove('active_page');
        page[0].style.display = 'block';
        page[0].classList.add('active_page');
        $$('.pagination-current-page')[0].classList.add('pagination-inner-link');
        $$('.pagination-current-page')[0].classList.add('flex');
        $$('.pagination-current-page')[0].classList.remove('pagination-current-page');
        e.target.classList.add('pagination-current-page');
        e.target.classList.remove('pagination-inner-link');
        e.target.classList.remove('flex');
    }
    var pagesCount = $$('.pagination')[0].dataset['pagesCount'];
    paintPages(pagesCount,e.target.innerText);
}
function paintPages(pagesCount,pageNum) {
    pages = '';
    for(let i =1; i<=pagesCount; i++) {
        if(pageNum < 5) {
            if(i == pageNum){
                pages += '<span class="pagination-current-page">'+pageNum+'</span>'
            }else {
                pages += '<span class="pagination-inner-link flex">'+i+'</span>';
            }
            if(i==5){
                pages += '<span disabled="disable" class="pagination-dots flex">...</span><span class="pagination-inner-link flex">'+pagesCount+'</span>';
                break;
            }
        } else {
            if(Number(pageNum)+2 < pagesCount){
                pages = '<span class="pagination-inner-link flex">1</span><span disabled="disable" class="pagination-dots flex">...</span><span class="pagination-inner-link flex">'+(Number(pageNum)-1)+'</span><span class="pagination-current-page">'+pageNum+'</span><span class="pagination-inner-link flex">'+(Number(pageNum)+1)+'</span><span disabled="disable" class="pagination-dots flex">...</span><span class="pagination-inner-link flex">'+pagesCount+'</span>';
            } else {
                pages = '<span class="pagination-inner-link flex">1</span><span disabled="disable" class="pagination-dots flex">...</span>';
                for(let i=Number(pageNum)-1;i<=pagesCount;i++) {
                    if(i == pageNum){
                        pages += '<span class="pagination-current-page">'+pageNum+'</span>'
                    }else {
                        pages += '<span class="pagination-inner-link flex">'+i+'</span>';
                    }
                }
            }
            break;
        }
    }
    $$('.pagination')[0].innerHTML = pages;
    addPagesClick();
    return;
}
addPagesClick();
