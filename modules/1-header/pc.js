document.querySelector('header').onscroll = function() {
    this.classList[this.scrollTop > 20 ? 'add' : 'remove']('shadow');
};
var modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
        event.preventDefault();
        var modal = document.getElementById(trigger.dataset.modal);
        modal.classList.add("open");
        var exits = modal.querySelectorAll(".modal-exit");
        exits.forEach(function (exit) {
            exit.addEventListener("click", function (event) {
                event.preventDefault();
                modal.classList.remove("open");
            });
        });
    });
});



function autocompleteCity(input, arr) {
    var focus;
    input.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        let searchCityModule = document.getElementsByClassName('modal-block__input')[0]
        if (!val) { return false;}
        focus = -1;
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-city-list");
        a.setAttribute("class", "autocomplete-city-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                searchCityModule.style.border = 'none';
                searchCityModule.style.borderRadius = '25px 25px 0 0';
                searchCityModule.style.boxShadow = '2px -18px 30px 0px rgba(135, 145, 159, 0.15)';
                b = document.createElement("div");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    input.value = this.getElementsByTagName("input")[0].value;
                    close();
                });
                a.appendChild(b);
            }
        }
    });
    function closeAllLists(elem) {
        let searchCityModule = document.getElementsByClassName('search-block__input')[0]
        var x = document.getElementsByClassName("autocomplete-city-items");
        for (var i = 0; i < x.length; i++) {
            if (elem != x[i] && elem != inp) {
                x[i].parentNode.removeChild(x[i]);
                searchCityModule.style.border = '1px solid #C3CAD3';
                searchCityModule.style.borderRadius = '25px';
            }
        }
    }
    document.addEventListener("click", function (el) {
        closeAllLists(el.target);
    });
}
var searchCity = ["Новосибирск","Новокузнецк","Новочеркасск","Новороссийск","Норильск"];
autocompleteCity(document.getElementById("searchCity"), searchCity);

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        let searchBg = document.getElementsByClassName('search-bg')[0]
        let searchModule = document.getElementsByClassName('search-block__input')[0]
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
                searchModule.style.borderRadius = '25px 25px 0 0';
                b = document.createElement("div");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    function closeAllLists(element) {
        let searchBg = document.getElementsByClassName('search-bg')[0]
        let searchModule = document.getElementsByClassName('search-block__input')[0]
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (element != x[i] && element != inp) {
                x[i].parentNode.removeChild(x[i]);
                searchBg.style.display = 'none';
                searchModule.style.border = '1px solid #C2CFD8';
                searchModule.style.borderRadius = '25px';
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
var links = ["Займы без отказа","Займы без залога","Запуск нового МФО Займиго","Займиго проводит акцию"];
autocomplete(document.getElementById("searchInput"), links);


function searchToggle(){
    let searchBlock = document.getElementsByClassName('search-block')[0]
    let closeBtn = document.getElementsByClassName('search-close-btn')[0]
    if(searchBlock.style.display != 'none') {
        searchBlock.style.display = 'none'
        closeBtn.style.display = 'none'
    } else {
        searchBlock.style.display = 'block'
        closeBtn.style.display = 'block'
    }
}
