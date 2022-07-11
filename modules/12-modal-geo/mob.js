if($$('.modal-list-container a').length != 0) {
    $$('.modal-list-container a').forEach(item => {
        item.addEventListener('click', function () {
            document.cookie = "GEO_CITY=" + this.dataset.city + "; path=/;";
        });
});
}

if($$('.choose-city').length != 0) {
    $$('.choose-city')[0].addEventListener('click', function () {
        if(localStorage.getItem('geoCities') == null || localStorage.getItem('geoCities') == '' || localStorage.getItem('geoCities') == '{}') {
            fetch('/actions/zaimy/geo/get_all_cities', {
                method: 'GET',
            }).then((res) => {
                return res.json().then((data) => {
                    var geoCities = {};
            data.forEach(function(items) {
                for (var key in items) {
                    // skip loop if the property is from prototype
                    if (!items.hasOwnProperty(key)) continue;
                    var value = items[key];
                    value.forEach((item) => {
                        geoCities[item[1]] = item;
                })
                }
            });
            localStorage.setItem("geoCities",JSON.stringify(geoCities));
        }).catch((err) => {
                console.log(err);
        });
        })
        }
        return false;
    })
}
if($$('#searchCity').length != 0) {
    $$('#searchCity')[0].addEventListener('keyup', function (e) {
        var elem = e.target;
        if($$('.modal-searched-data').length != 0) {
            var modalSearchedDataBlock = $$('.modal-searched-data')[0];
        }
        var searchHint = elem.value;
        if(searchHint.length != 0 && modalSearchedDataBlock) {
            var matchesWithSearch = '';
            var cities = JSON.parse(localStorage.getItem("geoCities"));

            // var counter = 0;
            // var maxElements = 5;

            if(cities != '' || cities != null) {
                for (var key in cities) {
                    // skip loop if the property is from prototype
                    if (!cities.hasOwnProperty(key)) continue;
                    var city = cities[key];
                    key = key.trim();
                    searchHint = searchHint.trim();
                    if(key.toLowerCase().indexOf(searchHint.toLowerCase()) != -1) {
                        var regexp = new RegExp( `(.*)(${searchHint})(.*)`, 'gi' );
                        var matchesCity = [...key.matchAll(regexp)];
                        if(matchesCity.length != 0) {
                            matchesCity = matchesCity[0];
                            matchesWithSearch += `<a href="${city[0]}" data-city="${city[2]}"><span class="not-matches-with-search">${matchesCity[1]}</span>${matchesCity[2]}<span class="not-matches-with-search">${matchesCity[3]}</span></a>`;
                            // counter++;
                            // if (counter == maxElements) break;
                        }
                    }
                }
                if(matchesWithSearch != '') {
                    modalSearchedDataBlock.innerHTML = matchesWithSearch;
                    modalSearchedDataBlock.style.opacity = 1;
                    elem.classList.add('focusedInp');

                    for (let item of modalSearchedDataBlock.children) {
                        item.addEventListener('click', function() {
                            document.cookie = "GEO_CITY=" + item.dataset.city + "; path=/;";
                        })
                    }
                } else {
                    modalSearchedDataBlock.innerHTML = '';
                }
            }
        } else {
            elem.classList.remove('focusedInp');
            modalSearchedDataBlock.style.opacity = 0;
            modalSearchedDataBlock.innerHTML = '';
        }
    },false)
}

// Regoin
var YMapsLocal = localStorage.getItem('YMaps');
if (YMapsLocal == null) {
    var script = document.createElement("script");
    script.src = 'https://api-maps.yandex.ru/1.1/index.xml';
    document.head.appendChild(script);
    script.onload = function () {
        localStorage.setItem('YMaps', JSON.stringify(YMaps.location));
        window.city = YMaps.location.city;
    }
} else {
    YMapsLocal = JSON.parse(YMapsLocal);
    window.city = YMapsLocal.city;
}

// MetrikaID
var MetrikaID = localStorage.getItem('MetrikaID');
if (MetrikaID == null) {
    document.addEventListener("DOMContentLoaded", function(event) {
        MetrikaID = yaCounter38176370.getClientID();
        window.clientID = MetrikaID;
        localStorage.setItem('MetrikaID', MetrikaID);
    });
} else {
    window.clientID = MetrikaID;
}
document.addEventListener('DOMContentLoaded', function(){
    if (YMapsLocal.location) {
        window.city = YMapsLocal.location.city;   // Достанем в input регион (область)
    }
    if (window.load_city_from_yandex) {
        fetch("/actions/zaimy/geo/find_city_by_name?name="+window.city, {
            method: 'GET',
        }).then((res) => {
            return res.json().then((data) => {
                if($$('.your-geo-location').length != 0) {
            var currentCityBlock = $$('.your-geo-location')[0];
            currentCityBlock.classList.add('link');
            if (data.url !== undefined) {
                currentCityBlock.innerText = window.city;
            } else {
                currentCityBlock.innerText = 'Москва';
            }
        }
    }).catch((err) => {
            console.log(err);
    });
    })
    }
});
