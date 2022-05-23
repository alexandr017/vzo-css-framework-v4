// Move to form
if (document.getElementById('moveToFormBtn') != null) {
    document.getElementById('moveToFormBtn').addEventListener('click', function () {
        $$('.tab-links').forEach(el => {
            if (el.textContent == 'Услуга') {
                el.click();
            }
        });

        var form = document.getElementsByClassName('services-form-block')[0];
        form.closest('.content').scrollIntoView({block: "center", behavior: "smooth"});
    });
}