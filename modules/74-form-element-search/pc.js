//родительский элемент должен иметь класс search-item, а текст в котором происходит поиск должен иметь класс search-title
document.addEventListener('DOMContentLoaded', function(){
    $$('.search-block-1')[0].getElementsByClassName('input-text')[0].addEventListener('keyup',function (e) {
        searchItems(e.target.value);
    })
});
function searchItems(searchHint){
    var search_hint = searchHint;
    if(search_hint.length >= 3 && search_hint.indexOf('банк') == -1){
        document.querySelectorAll('.search-item .search-title').forEach(function (item) {
            if(item.innerText.toLowerCase().indexOf(searchHint.toLowerCase()) == -1) {
                item.closest('.search-item').classList.add('hide_by_search_hint');
                $$('.pagination')[0].style.display = 'none';
            }else{
                item.closest('.search-item').classList.remove('hide_by_search_hint');
                $$('.pagination')[0].style.display = 'none';
                $$('.page-block').forEach(function (hideItem) {
                    hideItem.style.display = 'block';;
                });
            }
        })
    } else {
        document.querySelectorAll('.page-block:not(.active_page)').forEach(function (item) {
            item.style.display = 'none'
        });
        $$('.hide_by_search_hint').forEach(function (hideItem) {
            hideItem.classList.remove('hide_by_search_hint');
        });
        if($$('.pagination').length != 0){
            $$('.pagination')[0].style.display = 'flex';
        }
    }
}
