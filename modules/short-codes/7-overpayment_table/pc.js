let addTableWrap = $$(".overpayment-block")[0];
let items = Array.from(addTableWrap.querySelectorAll("tr"));
let loadTableMore = $$(".loadMore")[0];
let loadTableLess = $$(".loadLess")[0];
hiddenTableStyle = "hiddenTableStyle";
items.forEach(function (item, index) {
    if (index > 7) {
        item.classList.add(hiddenTableStyle);
        loadTableLess.style.display = "none";
    }
});
loadTableMore.addEventListener("click", function () {
    [].forEach.call(document.querySelectorAll("." + hiddenTableStyle), function (
        item
    ) {
            item.classList.remove(hiddenTableStyle);
        if (document.querySelectorAll("." + hiddenTableStyle).length === 0) {
            loadTableMore.style.display = "none";
            loadTableLess.style.display = "flex";
        }
    });
});
loadTableLess.addEventListener("click", function () {
    items.forEach(function (item, index) {
        if (index > 7) {
            item.classList.add(hiddenTableStyle);
        }
    });
        if (document.querySelectorAll("." + hiddenTableStyle).length !== 7) {
            loadTableMore.style.display = "flex";
            loadTableLess.style.display = "none";
        }
});