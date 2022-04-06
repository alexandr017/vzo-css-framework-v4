document.addEventListener('DOMContentLoaded', function () {
    var bodyElem = document.getElementsByTagName('body');
    bodyElem[0].classList.add('scroll-page-up')
    bodyElem[0].classList.remove('scroll-page-down')
    window.addEventListener('scroll', (event) => {
        bodyElem[0].classList.add('scroll-page-up')
        bodyElem[0].classList.remove('scroll-page-down')
        var newsLeftBlock = $$('.news-main-block-left-side');
        if(window.scrollY > 0) {
            if(newsLeftBlock.length != 0) {
                newsLeftBlock =newsLeftBlock[0];
                var footerHeight = $$('footer')[0].clientHeight+300;
                var pageHeight = document.body.scrollHeight;
                if(window.scrollY + footerHeight >= pageHeight - footerHeight) {
                    newsLeftBlock.style.position = 'absolute';
                } else {
                    newsLeftBlock.style.position = 'fixed';
                }
            }
        }
    });
    if($$('.sidebar-more-cats').length != 0) {
        let elemForShow = $$('.sidebar-more-cats')[0].closest('.news-cat-item');
        elemForShow.addEventListener('click',function () {
            var sidebarHiddenCats = $$('.news-cat-item.display_none');
            if(sidebarHiddenCats.length != 0) {
                for (let i=0; i<sidebarHiddenCats.length;i++) {
                    sidebarHiddenCats[i].classList.remove('display_none');
                }
                $$('.news-main-block-left-side')[0].style.overflowX = 'scroll';
            }
            elemForShow.classList.add('display_none');
            if($$('.sidebar-hide-cats').length != 0) {
                let elemForHide = $$('.sidebar-hide-cats')[0].closest('.news-cat-item');
                elemForHide.classList.remove('display_none');
                elemForHide.addEventListener('click',function () {
                    var sideBarHiddenCats = $$('.sidebar-hidden-cat');
                    for(let i=0;i<sideBarHiddenCats.length;i++) {
                        sideBarHiddenCats[i].classList.add('display_none');
                    }
                    elemForShow.classList.remove('display_none');
                    elemForHide.classList.add('display_none');
                    $$('.news-main-block-left-side')[0].style.overflowX = 'unset';
                })
            }
        });
    }

    var elem = $$('.pagination');
    if(elem.length != 0) {
        var pagesCount = elem[0].dataset['pagescount'];
        var pagesAlias = elem[0].dataset['pagealias'];
        // paintPages(pagesCount,1,pagesAlias);
    }

    var mainFilters = $$('.news-main-block-filters .news-cat-item');
    // for(let i=0;i<mainFilters.length;i++) {
    //     mainFilters[i].addEventListener('click',function (e) {
    //         if($$('.news-main-block-filters .active').length != 0) {
    //             $$('.news-main-block-filters .active')[0].classList.remove('active');
    //         }
    //         e.target.classList.add('active');
    //         let newsSortType = e.target.dataset['sort'];
    //         loadContent(newsSortType);
    //         if($$('.pagination').length != 0) {
    //             paintPages(pagesCount,1,pagesAlias);
    //         }
    //     })
    // }
});
function loadContent(newsSortType,page='') {
    if(page != '') {
        page = '/'+page;
    }
    (async function(){
        let response = await fetch('/news/sort/'+newsSortType+page, {
            method: 'GET'
        });

        let result = await response.text();
        if(result.length  > 0) {
            $$('#postsWrap')[0].innerHTML = result;
        }
        return false;
    })()
}
function newsPage(){
    var newsPages = $$('.newsPage');
    if(newsPages.length != 0) {
        for(let i=0;i<newsPages.length;i++) {
            newsPages[i].addEventListener('click',function (e) {
                let newsSortType = $$('.news-main-block-filters .active')[0].dataset['sort'];
                let pageNum = e.target.innerHTML;
                loadContent(newsSortType,pageNum);
            },false)
        }
    }
}
