let tableWrap = $$(".overpayment-block")[0];
let items = Array.from(tableWrap.querySelectorAll("tr"));
let loadTableMore = $$(".loadTableMoreRow")[0];
let loadTableLess = $$(".hideTableLessRow")[0];
hiddenTableStyle = "hiddenTableStyle";
items.forEach(function (item, index) {
    if (index > 10) {
        item.classList.add(hiddenTableStyle);
        loadTableLess.style.display = "none";
    }
});
loadTableMore.addEventListener("click", function () {
    let limit = 10;
    let count = 1;

    [].forEach.call(document.querySelectorAll("." + hiddenTableStyle), function (
        item
    ) {
        if (count > limit) {
            return false;
        }
        item.classList.remove(hiddenTableStyle);
        if (document.querySelectorAll("." + hiddenTableStyle).length === 0) {
            loadTableMore.style.display = "none";
            loadTableLess.style.display = "flex";
        }

        count++;
    });
});
loadTableLess.addEventListener("click", function () {
    items.forEach(function (item, index) {
        if (index > 10) {
            item.classList.add(hiddenTableStyle);
        }
    });
    if (document.querySelectorAll("." + hiddenTableStyle).length !== 7) {
        loadTableMore.style.display = "flex";
        loadTableLess.style.display = "none";
    }
});
