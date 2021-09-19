let repaymentMethods = $$(".repayment-methods-body-wrap")[0];
let repaymentItems = Array.from(repaymentMethods.querySelectorAll(".repayment-methods-body-row"));
let loadRepaymentMore = $$(".repayment-methods-more")[0];
let loadRepaymentLess = $$(".repayment-methods-less")[0];
hiddenRepaymentStyle = "hidden-repayment-style";
repaymentItems.forEach(function (item, index) {
    if (index >= 3) {
        item.classList.add(hiddenRepaymentStyle);
        loadRepaymentLess.style.display = "none";
    }
});
loadRepaymentMore.addEventListener("click", function () {
    [].forEach.call(document.querySelectorAll("." + hiddenRepaymentStyle), function (
        item
    ) {
        item.classList.remove(hiddenRepaymentStyle);
        if ($$("." + hiddenRepaymentStyle).length === 0) {
            loadRepaymentMore.style.display = "none";
            loadRepaymentLess.style.display = "flex";
        }
    });
});
loadRepaymentLess.addEventListener("click", function () {
    repaymentItems.forEach(function (item, index) {
        if (index >= 3) {
            item.classList.add(hiddenRepaymentStyle);
        }
    });
    if ($$("." + hiddenRepaymentStyle).length !== 3) {
        loadRepaymentMore.style.display = "flex";
        loadRepaymentLess.style.display = "none";
    }
});

