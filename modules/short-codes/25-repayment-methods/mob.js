$$('.repayment-methods-more')[0].addEventListener('click', function () {
    this.style.display = 'none';
    $$('.repayment-methods-less')[0].style.display = 'block';
    $$('.repayment-methods-body-row').forEach(function (item) {
        item.style.display = 'block';
    });
});

$$('.repayment-methods-less')[0].addEventListener('click', function () {
    this.style.display = 'none';
    $$('.repayment-methods-more')[0].style.display = 'block';
    $$('.repayment-methods-body-row').forEach(function (item, index) {
        if (index > 2) {
            item.style.display = 'none';
        }
    });
});
