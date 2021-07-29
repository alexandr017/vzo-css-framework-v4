document.addEventListener("click", function(e) {
    if(e.target && e.target.classList.contains("card-more")) {
        e.target.classList.toggle("active");
        var panel = e.target.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            e.target.innerHTML = 'Подробнее <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">\n' +
                '<path d="M10 1L5.5 5L1 1" stroke="#017AD3"/>\n' +
                '</svg>\n' +
                '<span uk-icon="icon: chevron-down"></span> ';
        } else {
            panel.style.maxHeight = panel.scrollHeight + 0+ "px";
            e.target.innerHTML = 'Подробнее <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">\n' +
                '<path d="M1 5L5.5 1L10 5" stroke="#017AD3"/>\n' +
                '</svg> '+'<span uk-icon="icon: chevron-up"></span>';
        }
    }
});

document.querySelectorAll('.tab-wrap').forEach((e) => {
    let tabTabs = e.querySelectorAll('.tab .tablinks');
    let tabItems = e.querySelectorAll('.tabs-items .tabcontent');
    for(let i =0;i<tabTabs.length;i++) {
        tabTabs[0].click();
        tabTabs[i].onclick = () => {
            tabTabs.forEach((e)  => { e.classList.remove('on') });
            tabItems.forEach((e)  => { e.classList.remove('on') });
            tabTabs[i].classList.add('on');
            tabItems[i].classList.add('on');
        }
    }
});