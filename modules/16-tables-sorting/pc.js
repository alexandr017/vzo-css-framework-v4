var dataTable = (function () {
    return function (data) {
        var mode = 'table';
        var itemsCountPerPage = 10;
        var showNumbering = false;
        var element = '';
        var selector = '';
        var elementName = '';
        var trCollections = [];
        var showedTrCollections = [];
        var tdCounts = 0;
        var pagesCount = 0;
        var currentPage = '';
        var offset = 0;
        var pages = '';
        var pageNum = 1;
        var limit = itemsCountPerPage;
        var search = false;
        var sort = false;
        var afterSearch = false;
        var afterSort = false;
        var init = function (data) {
            if(data && data.itemsCountPerPage){
                itemsCountPerPage = data.itemsCountPerPage;
            }
            if(!data.element) {
                return;
            }
            selector = data.element.charAt(0);
            elementName = (data.element).slice(1,data.element.length);
            if(selector === '#'){
                element = document.getElementById(elementName);
            } else if(selector === '.') {
                element = document.getElementsByClassName(elementName)[0];
            }
            if(element == undefined) {
                return;
            }
            if(data && data.search) {
                search = data.search;
                if(search == true) {
                    createSearchBlock(element);
                    document.getElementsByClassName(elementName+'-searchInp')[0].addEventListener('keyup',function () {
                        searchFn(this.value);
                    })
                }
            }
            if(data && data.sort) {
                sort = data.sort;
                if(sort == true) {
                    addSortArrows(element);
                }
            }
            trCollections = element.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
            tdCounts = trCollections[0].getElementsByTagName('td').length/2;
            if(trCollections.length <= itemsCountPerPage) {
                itemsCountPerPage = trCollections.length;
            } else {
                pagesCount = Math.ceil(trCollections.length/itemsCountPerPage);
            }
            createContent(offset,itemsCountPerPage);
            addSortClick();
            // paintPages(pagesCount,pageNum);
        }
        var createContent = function(offset,itemsCountPerPage,afterSearch=false,afterSort=false) {
            console.log('afterSearch---'+afterSearch);
            offset = offset != 0 ? (Number(offset)-1)*itemsCountPerPage : offset;
            limit = offset != 0 ? Number(offset+itemsCountPerPage) : itemsCountPerPage;
            if(afterSearch == false) {
                trCollections = element.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
                showedTrCollections = element.getElementsByClassName('showed-items');
            } else {
                trCollections = element.getElementsByTagName('tbody')[0].getElementsByClassName('matchesToSearch');
                showedTrCollections = element.querySelectorAll('.showed-items .matchesToSearch');
            }
            // showedTrCollections = element.getElementsByClassName('showed-items');
            if(showedTrCollections.length != 0) {
                for(let i=showedTrCollections.length-1; showedTrCollections.length > 0; i--){
                    showedTrCollections[i].classList.add('display_none');
                    showedTrCollections[i].classList.remove('showed-items');
                }
            } else {
                for(let i=0; i<trCollections.length; i++){
                    trCollections[i].classList.add('display_none');
                }
            }
            for(let i=offset;i<limit;i++){
                if(!trCollections[i]){
                    break;
                }
                trCollections[i].classList.remove('display_none');
                trCollections[i].classList.remove('dataTableHiddenTd');
                trCollections[i].classList.add('showed-items');
            }

            if(afterSort == true) {
                pageNum = 1;
            }
            paintPages(pagesCount,pageNum,afterSearch,afterSort);
            // addPagesClick(afterSearch);
            return;
        }
        var paintPages = function(pagesCount,pageNum,afterSearch=false,afterSort=false) {
            console.log(afterSort);
            if(element.getElementsByClassName('dataTablesFooter').length ==0) {
                var dataTablesFooter = '<tfoot class="dataTablesFooter"></tfoot>';
                element.innerHTML += dataTablesFooter;
            } else {
                element.getElementsByClassName('dataTablesFooter')[0].innerHTML = '';
            }
            pages = '';
            for(let i =1; i<=pagesCount; i++) {
                if(pageNum < 5) {
                    if(i == pageNum){
                        currentPage = 'currentPage';
                    }else {
                        currentPage = '';
                    }
                    pages += '<span class="data-table-pagination '+currentPage+'">'+i+'</span>';
                    if(i==5){
                        pages += '<div class="data-table-pagination disabledPage">...</div><span class="data-table-pagination">'+pagesCount+'</span>';
                        break;
                    }
                } else {
                    currentPage = 'currentPage';
                    if(Number(pageNum)+2 < pagesCount){
                        pages = '<span class="data-table-pagination">1</span><div class="data-table-pagination disabledPage">...</div><span class="data-table-pagination">'+(Number(pageNum)-1)+'</span><span class="data-table-pagination '+currentPage+'">'+pageNum+'</span><span class="data-table-pagination">'+(Number(pageNum)+1)+'</span><div class="data-table-pagination disabledPage">...</div><span class="data-table-pagination">'+pagesCount+'</span>';
                    } else {
                        pages = '<span class="data-table-pagination">1</span><div class="data-table-pagination disabledPage">...</div>';
                        for(let i=Number(pageNum)-1;i<=pagesCount;i++) {
                            if(i == pageNum){
                                currentPage = 'currentPage';
                            }else {
                                currentPage = '';
                            }
                            pages += '<span class="data-table-pagination '+currentPage+'">'+i+'</span>';
                        }
                        // pages = '<span class="data-table-pagination">1</span><div class="data-table-pagination disabledPage">...</div><span class="data-table-pagination">'+(Number(pagesCount)-3)+'</span><span class="data-table-pagination">'+(Number(pagesCount)-2)+'</span><span class="data-table-pagination">'+(Number(pagesCount)-1)+'</span><span class="data-table-pagination">'+pagesCount+'</span>';
                    }
                    // element.getElementsByClassName('dataTablesFooter')[0].innerHTML = '<tr><td colspan="'+tdCounts+'" class="data-table-pages">'+pages+'</td></tr>';
                    break;
                }
                // if(i == 1){
                //     currentPage = 'currentPage';
                // }else {
                //     currentPage = '';
                // }
                // pages += '<span class="data-table-pagination '+currentPage+'">'+i+'</span>';
            }
            element.getElementsByClassName('dataTablesFooter')[0].innerHTML = '<tr><td colspan="'+tdCounts+'" class="data-table-pages">'+pages+'</td></tr>';
            if(afterSearch == true) {
                pageNum = 0;
            }
            // createContent(pageNum,itemsCountPerPage,afterSearch);
            addPagesClick(afterSearch);
            return;
        }
        var addPagesClick = function(afterSearch = false){
            var pagesCollection = element.getElementsByClassName('data-table-pagination');
            for(let i=0; i<pagesCollection.length;i++){
                if(!pagesCollection[i].classList.contains('currentPage') || pagesCollection[i].classList.contains('disabledPage')){
                    pagesCollection[i].addEventListener('click',
                        function() {
                            pageNum = pagesCollection[i].innerHTML;
                            /*if(pageNum == 5) {
                                paintPages(pagesCount,pageNum);
                            } else {
                                createContent(pageNum,itemsCountPerPage,afterSearch);
                                if(element.getElementsByClassName('currentPage').length !=0){
                                    element.getElementsByClassName('currentPage')[0].classList.remove('currentPage');
                                }
                            }*/
                            if(element.getElementsByClassName('currentPage').length !=0){
                                element.getElementsByClassName('currentPage')[0].classList.remove('currentPage');
                            }
                            createContent(pageNum,itemsCountPerPage,afterSearch);
                            this.classList.add('currentPage');
                        }
                    );
                }
            }
            return;
        }
        var searchFn = function (inpVal) {
            inpVal = inpVal.toLowerCase().replace(/\s/g, '');
            let tBody = element.getElementsByTagName('tbody')[0];
            trCollections = [].slice.call(tBody.getElementsByTagName('tr'));

            let findedRows = 0;
            if(element.getElementsByClassName('sorted').length != 0) {
                afterSort = true;
                if(inpVal == '') {
                    // trCollections = [].slice.call(tBody.getElementsByClassName('dataTableHiddenTd'));
                    pagesCount = Math.ceil(trCollections.length/itemsCountPerPage);
                    let sortedColBlock = element.getElementsByClassName('sorted')[0];
                    sortedColBlock.dataset['order'] = 0 - Number(sortedColBlock.dataset['order']);
                    let sortedCol = sortedColBlock.getElementsByClassName('sortingArrowsBlock')[0];
                    sortedCol.click();
                    trCollections = [].slice.call(trCollections);
                    trCollections.forEach((datatableTrEl) => {
                        if(datatableTrEl.getElementsByTagName('td').length != 0){
                            datatableTrEl.classList.remove('matchesToSearch');
                            if(findedRows < itemsCountPerPage) {
                                datatableTrEl.classList.add('showed-items');
                                datatableTrEl.classList.remove('dataTableHiddenTd');
                            }else {
                                datatableTrEl.classList.add('dataTableHiddenTd');
                            }
                            findedRows++;
                        }
                    })
                    createContent(0,itemsCountPerPage,false,true);
                    return;
                }
            }
            trCollections.forEach((datatableTrEl) => {
                if(datatableTrEl.getElementsByTagName('td').length != 0){
                    var datatableTrText = datatableTrEl.innerText.toLowerCase().replace(/\s/g, '');
                    if(datatableTrText.indexOf(inpVal) == -1) {
                        datatableTrEl.classList.add('dataTableHiddenTd');
                        datatableTrEl.classList.remove('matchesToSearch');
                    } else {
                        datatableTrEl.classList.add('matchesToSearch');
                        if(findedRows < itemsCountPerPage) {
                            datatableTrEl.classList.remove('dataTableHiddenTd');
                            datatableTrEl.classList.remove('display_none');
                        } else {
                            datatableTrEl.classList.add('dataTableHiddenTd');
                        }
                        findedRows++;
                    }
                }
            })

            if(findedRows != 0) {
                pagesCount = Math.ceil(findedRows/itemsCountPerPage);
                paintPages(pagesCount,1,true,afterSort);
                element.getElementsByClassName('dataTablesFooter')[0].classList.remove('display_none');
            } else {
                element.getElementsByClassName('dataTablesFooter')[0].classList.add('display_none');
            }
        }
        var createSearchBlock = function(element) {
            var searchBlock = document.createElement('div');
            searchBlock.innerHTML = 'Поиск : <input type="text" class="searchInp '+elementName+'-searchInp">';
            searchBlock.className = 'searchBlock';
            element.parentNode.insertBefore(searchBlock,element);
        }
        var addSortArrows = function () {
            var tHead = element.getElementsByTagName('thead')[0];
            var theadTr = tHead.getElementsByTagName('tr')[0];
            var thCollecion = theadTr.getElementsByTagName('th');
            for(let i=1; i<thCollecion.length;i++) {
                if(!thCollecion[i].classList.contains('display_none')) {
                    thCollecion[i].innerHTML = '<span class="sortingArrowsBlock">'+thCollecion[i].innerHTML+'<span class="sortingArrows"><span class="sortUp jsSortItem">&#9650;</span><span class="sortDown jsSortItem">&#9660;</span></span></span>'
                    // thCollecion[i].innerHTML += '<span class="sortingArrows"><span class="sortUp jsSortItem">&#9650;</span><span class="sortDown jsSortItem">&#9660;</span></span>'
                }
            }
        }
        var addSortClick = function () {
            var sortingArrowsCollection = element.getElementsByClassName('sortingArrows');
            for(let i=0; i<sortingArrowsCollection.length;i++) {
                let sortItemUp = sortingArrowsCollection[i].getElementsByClassName('sortUp')[0];
                let sortItemDown = sortingArrowsCollection[i].getElementsByClassName('sortDown')[0];
                sortingArrowsCollection[i].parentElement.addEventListener('click',function (event) {
                    resetActiveSortItem();
                    let sortElem = event.target.closest('th');
                    if(sortElem.classList.contains('sorted') && sortElem.dataset['order'] == 1){
                        sortItemUp.classList.toggle("jsTableDisplayNone");
                        sortingArrowsCollection[i].style.alignItems = 'flex-end';
                        sortItemDown.classList.add('activeSortItem');
                    } else {
                        sortItemDown.classList.toggle("jsTableDisplayNone");
                        sortingArrowsCollection[i].style.alignItems = 'flex-start';
                        sortItemUp.classList.add('activeSortItem');
                    }
                    afterSort = true;
                    getSort(event);
                    event.stopPropagation();
                }, false)
                // sortItemUp.addEventListener('click',function (event) {
                //     resetActiveSortItem();
                //     if(sortItemDown.classList.contains('jsTableDisplayNone')) {
                //         sortItemDown.classList.toggle("jsTableDisplayNone");
                //     }
                //     event.target.classList.toggle("jsTableDisplayNone");
                //     event.target.parentNode.style.alignItems = 'flex-end';
                //     sortItemDown.classList.add('activeSortItem');
                //     event.stopPropagation();
                //     afterSort = true;
                //     getSort(event);
                // }, false)
                // sortItemDown.addEventListener('click',function (event) {
                //     resetActiveSortItem();
                //     if(sortItemUp.classList.contains('jsTableDisplayNone')) {
                //         sortItemUp.classList.toggle("jsTableDisplayNone");
                //     }
                //     event.target.classList.toggle("jsTableDisplayNone");
                //     event.target.parentNode.style.alignItems = 'flex-start';
                //     sortItemUp.classList.add('activeSortItem');
                //     event.stopPropagation();
                //     afterSort = true;
                //     getSort(event);
                // }, false)
                // sortingArrowsCollection[i].getElementsByClassName('sortUp')[0].onclick = sortItemClick
                // sortingArrowsCollection[i].getElementsByClassName('sortDown')[0].onclick = sortItemClick
            }
        }
        var resetActiveSortItem = function() {
            let hiddenSortItems = element.getElementsByClassName('jsTableDisplayNone');
            if(hiddenSortItems.length != 0){
                for(let i=0;i<hiddenSortItems.length;i++) {
                    hiddenSortItems[i].classList.remove('jsTableDisplayNone');
                }
            }
            let activeSortItems = element.getElementsByClassName('activeSortItem');
            if(activeSortItems.length != 0){
                for(let i=0;i<activeSortItems.length;i++) {
                    activeSortItems[i].classList.remove('activeSortItem');
                }
            }
        }
        // var sortItemClick = function(event) {
        //     event.target.classList.toggle("jsTableDisplayNone");
        //     if(element.getElementsByClassName('jsTableDisplayNone').length !=0) {
        //         element.getElementsByClassName('jsTableDisplayNone')[0]
        //     }
        // }
        var getSort = ({ target }) => {
            // if(target.localName != 'th'){
            //     target = target.parentNode.parentNode;
            // }
            var searchBlockVal = document.getElementsByClassName(elementName+'-searchInp')[0].value;
            target =  target.closest('th')
            const order = (target.dataset.order = -(target.dataset.order || -1));
            const index = [...target.parentNode.cells].indexOf(target);
            const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
            const comparator = (index, order) => (a, b) => order * collator.compare(
                a.children[index].innerHTML,
                b.children[index].innerHTML
            );

            let tBody = element.getElementsByTagName('tbody')[0];

            if(element.getElementsByClassName('matchesToSearch').length != 0 && searchBlockVal != '') {
                afterSearch = true;
                var arrForSort = tBody.getElementsByClassName('matchesToSearch');
            } else {
                // afterSearch = false;
                var arrForSort = tBody.rows;
            }
            tBody.append(...[...arrForSort].sort(comparator(index, order)));
            createContent(0,itemsCountPerPage,afterSearch,true)
            // if(order == 1) {
            //     paintPages(pagesCount,1);
            // } else {
            //     paintPages(pagesCount,pagesCount);
            // }
            // [...tBody.rows].sort(comparator(index, order));
            console.log(tBody.rows[0]);

            for(const cell of target.parentNode.cells)
                cell.classList.toggle('sorted', cell === target);
        };

        init(data);
        // addPagesClick();
    }
}());
dataTable({
    element:'.total_cards_table_js',
    itemsCountPerPage:10,
    search:true,
    sort:true
})