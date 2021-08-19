
var addTableWrap = document.getElementsByClassName("overpayment-block")[0];
var items = Array.from(addTableWrap.querySelectorAll("tr"));
var loadMore = document.getElementsByClassName("loadMore")[0];
var loadLess = document.getElementsByClassName("loadLess")[0];

hiddenClass = "hiddenStyle";
hiddenItems = Array.from(document.querySelectorAll(".hiddenStyle"));


items.forEach(function (item, index) {

    if (index > 7) {
        item.classList.add(hiddenClass);
        loadLess.style.display = "none";
    }

    if (index === 7) {
        item.style.borderBottom = "none";
    }

    if (index === 8) {
        item.style.borderTop = "1px solid #E5E5E5";
    }

});

loadMore.addEventListener("click", function () {
    [].forEach.call(document.querySelectorAll("." + hiddenClass), function (
        item,
        index
    ) {
        if (index < 7) {
            item.classList.remove(hiddenClass);
        }
        if (document.querySelectorAll("." + hiddenClass).length === 0) {
            loadMore.style.display = "none";
            loadLess.style.display = "flex";
        }
    });
});

loadLess.addEventListener("click", function () {

    items.forEach(function (item, index) {
        console.log(item.innerText, index);
        if (index > 7) {
            item.classList.add(hiddenClass);
        }
    });
        if (document.querySelectorAll("." + hiddenClass).length !== 7) {
            loadMore.style.display = "flex";
            loadLess.style.display = "none";
        }
});