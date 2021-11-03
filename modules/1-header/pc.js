function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        let searchBg = $$('.search-bg')[0]
        let searchModule = $$('.search-block__input')[0]
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                searchBg.style.display = 'block';
                searchModule.style.border = 'none';
                searchModule.style.background = '#fff';
                searchModule.style.borderRadius = '25px 25px 0 0';
                b = document.createElement("div");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.$$("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    function closeAllLists(element) {
        let searchBg = $$('.search-bg')[0]
        let searchModule = $$('.search-block__input')[0]
        var x = $$(".autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (element != x[i] && element != inp) {
                x[i].parentNode.removeChild(x[i]);
                searchBg.style.display = 'none';
                searchModule.style.boxShadow = '0px 6px 20px rgba(135, 145, 159, 0.15)';
                searchModule.style.borderRadius = '25px';
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
var links = ["Займы без отказа","Займы без залога","Запуск нового МФО Займиго","Займиго проводит акцию","Займиго проводит акцию"];
autocomplete($$("#searchInput")[0], links);

window.onscroll = function() {shadowMenu()};
function shadowMenu() {
    let searchBlock = $$('.search-block')[0],
        hSubMenu = $$('.h-sub-menu-col');
        scrollSubMenu = "scroll-h-sub-menu-col";
        scrollSearchBlock = "scroll-search-block";

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        $$("#headerMenu")[0].className = "shadow fixed";
        searchBlock.classList.add(scrollSearchBlock);
        for (let i = 0; i <  hSubMenu.length; i++) {
            hSubMenu[i].classList.add(scrollSubMenu);
        }
    } else {
        $$("#headerMenu")[0].className = " ";
        searchBlock.classList.remove(scrollSearchBlock);
        for (let i = 0; i <  hSubMenu.length; i++) {
            hSubMenu[i].classList.remove(scrollSubMenu);
        }

    }

}

function searchToggle(){
    let searchBlock = $$('.search-block')[0];
    let closeBtn = $$('.search-close-btn')[0];
    let iconSearch = $$('.icon-search')[0];
    if(searchBlock.style.display != 'none') {
        searchBlock.style.display = 'none';
        closeBtn.style.display = 'none';
        iconSearch.style.display = 'inline-block';

    } else {
        searchBlock.style.display = 'block';
        closeBtn.style.display = 'block';
        iconSearch.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var favorites = localStorage.getItem('vzo');
    if(favorites != null) {
        favorites = favorites.split(',');
        if(favorites.length != 0){
            $$('.fav-items-count')[0].innerHTML = favorites.length;
            $$('.fav-items-count')[0].style.display = 'flex';
        }
    }
    // var compareItems = localStorage.getItem('vzo_compare'+window.CATEGORY_ID);
    var compareItems = null;
    for (let i = 1; i < 12; i++) {
        var compareItemsByCat = localStorage.getItem('vzo_compare' + i);
        if (compareItemsByCat != null) {
            compareItems += compareItemsByCat.split(',').length;
        }
    }
    if($$('.compare-items-count').length != 0) {
        var compareItemsCountBlock = $$('.compare-items-count')[0];
        if(compareItems != null) {
            compareItemsCountBlock.innerHTML = compareItems;
            compareItemsCountBlock.style.display = 'flex';
        } else {
            compareItemsCountBlock.style.display = 'none';
        }
    }
});

//
// function autocompleteCity(input, arr) {
//     var focus;
//     input.addEventListener("input", function(e) {
//         var a, b, i, val = this.value;
//         closeAllLists();
//         let searchCityModule = $$('.modal-block__input')[0]
//         if (!val) { return false;}
//         focus = -1;
//         a = document.createElement("div");
//         a.setAttribute("id", this.id + "autocomplete-city-list");
//         a.setAttribute("class", "autocomplete-city-items");
//         this.parentNode.appendChild(a);
//         for (i = 0; i < arr.length; i++) {
//             if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//                 searchCityModule.style.border = 'none';
//                 searchCityModule.style.borderRadius = '25px 25px 0 0';
//                 searchCityModule.style.background = '#fff';
//                 searchCityModule.style.boxShadow = '2px -18px 30px 0px rgba(135, 145, 159, 0.15)';
//                 b = document.createElement("div");
//                 b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//                 b.innerHTML += arr[i].substr(val.length);
//                 b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//                 b.addEventListener("click", function(e) {
//                     input.value = this.getElementsByTagName("input")[0].value;
//                     close();
//                 });
//                 a.appendChild(b);
//             }
//         }
//     });
//     function closeAllLists(elem) {
//         let searchCityModule = $$('.search-block__input')[0]
//         var x = $$(".autocomplete-city-items");
//         for (var i = 0; i < x.length; i++) {
//             if (elem != x[i] && elem != inp) {
//                 x[i].parentNode.removeChild(x[i]);
//                 searchCityModule.style.borderRadius = '25px';
//             }
//         }
//     }
//     document.addEventListener("click", function (el) {
//         closeAllLists(el.target);
//     });
// }
// var searchCity = ["Новосибирск","Новокузнецк","Новочеркасск","Новороссийск","Норильск"];
// autocompleteCity($$("#searchCity")[0], searchCity);




