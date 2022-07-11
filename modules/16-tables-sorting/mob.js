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
        var arrowUp = '<svg class="sortUp jsSortItem" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.65448 0.000332832C5.85717 0.000332832 6.05982 0.0750768 6.21435 0.224251L11.0771 4.9208C11.3864 5.21956 11.3864 5.70395 11.0771 6.00258C10.7679 6.30122 10.2664 6.30122 9.95709 6.00258L5.65448 1.84682L1.35185 6.00244C1.04252 6.30108 0.541137 6.30108 0.231955 6.00244C-0.0775286 5.7038 -0.0775286 5.21941 0.231955 4.92066L5.09461 0.224105C5.24921 0.0749072 5.45187 0.000332832 5.65448 0.000332832Z" fill="black"/></svg>';
        var arrowDown = '<svg class="sortDown jsSortItem" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.6546 6.22623C5.45192 6.22623 5.24926 6.15149 5.09473 6.00231L0.232 1.30576C-0.0773333 1.007 -0.0773333 0.522617 0.232 0.223978C0.541208 -0.0746595 1.04264 -0.0746595 1.352 0.223978L5.6546 4.37975L9.95723 0.224124C10.2666 -0.0745143 10.7679 -0.0745143 11.0771 0.224124C11.3866 0.522762 11.3866 1.00715 11.0771 1.30591L6.21447 6.00246C6.05987 6.15166 5.85721 6.22623 5.6546 6.22623Z" fill="black"/></svg>';
        // var searchMagnifier = '<svg class="searchMagnifier" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4233 14.5735L12.479 10.6129C13.4932 9.44901 14.0488 7.98455 14.0488 6.45999C14.0488 2.89801 11.0471 0 7.35769 0C3.66826 0 0.666565 2.89801 0.666565 6.45999C0.666565 10.022 3.66826 12.92 7.35769 12.92C8.74275 12.92 10.0627 12.5167 11.1911 11.751L15.1654 15.7416C15.3315 15.9082 15.5549 16 15.7943 16C16.021 16 16.2359 15.9166 16.3991 15.7649C16.7459 15.4428 16.757 14.9085 16.4233 14.5735ZM7.35769 1.68522C10.0848 1.68522 12.3033 3.82713 12.3033 6.45999C12.3033 9.09286 10.0848 11.2348 7.35769 11.2348C4.63062 11.2348 2.41208 9.09286 2.41208 6.45999C2.41208 3.82713 4.63062 1.68522 7.35769 1.68522Z" fill="#95A5B0"/></svg>';
        var searchReset = '<svg class="searchReset" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.245372 1.79726C-0.081359 1.46499 -0.0796109 0.928048 0.249275 0.597967C0.578161 0.267885 1.10964 0.269661 1.43637 0.601932L11.7233 11.0633C12.0501 11.3956 12.0483 11.9326 11.7194 12.2626C11.3906 12.5927 10.8591 12.5909 10.5323 12.2587L0.245372 1.79726Z" fill="#95A5B0"/><path d="M10.5679 0.601915C10.8957 0.270741 11.4272 0.270741 11.755 0.601915C12.0828 0.933089 12.0828 1.47003 11.755 1.8012L1.43382 12.2283C1.10601 12.5595 0.574522 12.5595 0.246712 12.2283C-0.0810978 11.8971 -0.0810983 11.3602 0.246712 11.029L10.5679 0.601915Z" fill="#95A5B0"/></svg>';
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
            tdCounts = trCollections[0].getElementsByTagName('td').length;
            if(trCollections.length <= itemsCountPerPage) {
                itemsCountPerPage = trCollections.length;
            } else {
                pagesCount = Math.ceil(trCollections.length/itemsCountPerPage);
            }
            createContent(offset,itemsCountPerPage);
            addSortClick();
        }
        var createContent = function(offset,itemsCountPerPage,afterSearch=false,afterSort=false) {
            offset = offset != 0 ? (Number(offset)-1)*itemsCountPerPage : offset;
            limit = offset != 0 ? Number(offset+itemsCountPerPage) : itemsCountPerPage;
            if(afterSearch == false) {
                trCollections = element.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
                showedTrCollections = element.getElementsByClassName('showed-items');
            } else {
                trCollections = element.getElementsByTagName('tbody')[0].getElementsByClassName('matchesToSearch');
                showedTrCollections = element.querySelectorAll('.showed-items .matchesToSearch');
            }
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
            return;
        }
        var paintPages = function(pagesCount,pageNum,afterSearch=false,afterSort=false) {
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
                    if(i <= 5) {
                        pages += '<span class="data-table-pagination '+currentPage+'">'+i+'</span>';
                    } else {
                        if(pagesCount - i >1) {
                            pages += '<div class="data-table-pagination disabledPage">...</div><span class="data-table-pagination">'+pagesCount+'</span>';
                            break;
                        }else {
                            pages += '<span class="data-table-pagination">'+i+'</span>';
                        }

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
                    }
                    break;
                }
            }
            var footerTdCount =  '';
            for(let i=1;i<tdCounts;i++) {
                footerTdCount += '<td style="display: none;"></td>';
            }
            element.getElementsByClassName('dataTablesFooter')[0].innerHTML = '<tr><td colspan="'+tdCounts+'" class="data-table-pages">'+pages+'</td>'+footerTdCount+'</tr>';
            if(afterSearch == true) {
                pageNum = 0;
            }
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
            var searchResetBtn = element.previousElementSibling.getElementsByClassName('searchReset')[0];
            if(inpVal != '') {
                searchResetBtn.style.display = 'block';
            } else {
                searchResetBtn.style.display = 'none';
            }
            let tBody = element.getElementsByTagName('tbody')[0];
            trCollections = [].slice.call(tBody.getElementsByTagName('tr'));

            let findedRows = 0;
            if(element.getElementsByClassName('sorted').length != 0) {
                afterSort = true;
                if(inpVal == '') {
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
            var placeholderText = '';
            if(window.CATEGORY_ID == 1) {
                placeholderText = 'Поиск по условиям и названию МФО';
            } else {
                placeholderText = 'Поиск';
            }
            searchBlock.innerHTML = '<input type="text" class="searchInp '+elementName+'-searchInp" placeholder="'+placeholderText+'">'+searchReset;
            searchBlock.className = 'searchBlock';
            element.parentNode.insertBefore(searchBlock,element);
            element.parentNode.getElementsByClassName('searchReset')[0].addEventListener('click',function (e) {
                e.target.closest('svg').parentElement.getElementsByClassName('searchInp')[0].value = '';
                searchFn('');
            },false)
        }
        var addSortArrows = function () {
            var tHead = element.getElementsByTagName('thead')[0];
            var theadTr = tHead.getElementsByTagName('tr')[0];
            var thCollecion = theadTr.getElementsByTagName('th');
            for(let i=1; i<thCollecion.length;i++) {
                if(!thCollecion[i].classList.contains('display_none')) {
                    thCollecion[i].innerHTML = '<span class="sortingArrowsBlock">'+thCollecion[i].innerHTML+'<span class="sortingArrows">'+arrowUp+arrowDown+'</span></span>'
                }
            }
        }
        var addSortClick = function () {
            var sortingArrowsCollection = element.getElementsByClassName('sortingArrowsBlock');
            for(let i=0; i<sortingArrowsCollection.length;i++) {
                let sortItemUp = sortingArrowsCollection[i].getElementsByClassName('sortUp')[0];
                let sortItemDown = sortingArrowsCollection[i].getElementsByClassName('sortDown')[0];
                sortingArrowsCollection[i].parentElement.addEventListener('click',function (event) {
                    resetActiveSortItem();
                    let sortElem = event.target.closest('th');
                    if(sortElem.classList.contains('sorted') && sortElem.dataset['order'] == 1){
                        sortItemUp.classList.toggle("jsTableDisplayNone");
                        // sortingArrowsCollection[i].style.alignItems = 'flex-end';
                        sortItemDown.classList.add('activeSortItem');
                    } else {
                        sortItemDown.classList.toggle("jsTableDisplayNone");
                        // sortingArrowsCollection[i].style.alignItems = 'flex-start';
                        sortItemUp.classList.add('activeSortItem');
                    }
                    afterSort = true;
                    getSort(event);
                    event.stopPropagation();
                }, false)
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
        var getSort = ({ target }) => {
            var searchBlockVal = document.getElementsByClassName(elementName+'-searchInp')[0].value;
            target =  target.closest('th')
            const order = (target.dataset.order = -(target.dataset.order || -1));
            const index = [...target.parentNode.cells].indexOf(target);
            const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
            const comparator = (index, order) => function(a, b) {
                a = a.children[index].innerHTML;
                b = b.children[index].innerHTML;
                if(a == ' ' || a == '' || a == null) {
                    a = '0';
                }else if(b == ' ' || b == '' || b == null) {
                    b = '0';
                }
                return order * collator.compare(
                    parseFloat(a.replace(/\s/g, '')).toFixed(5),
                    parseFloat(b.replace(/\s/g, '')).toFixed(5)
                )
            };

            let tBody = element.getElementsByTagName('tbody')[0];

            if(element.getElementsByClassName('matchesToSearch').length != 0 && searchBlockVal != '') {
                afterSearch = true;
                var arrForSort = tBody.getElementsByClassName('matchesToSearch');
            } else {
                var arrForSort = tBody.rows;
            }

            tBody.append(...[...arrForSort].sort(comparator(index, order)));
            createContent(0,itemsCountPerPage,afterSearch,true)

            for(const cell of target.parentNode.cells)
                cell.classList.toggle('sorted', cell === target);
        };

        init(data);
    }
}());