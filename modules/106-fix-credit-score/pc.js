function moveToInfoTab() {
    $$('.tab-links').forEach(el => {
        if (el.textContent == 'Информация') {
            el.click();
        }
    });
}