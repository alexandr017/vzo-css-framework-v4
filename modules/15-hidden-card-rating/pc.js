document.addEventListener("click", function(e) {
    if(e.target && e.target.classList.contains("rating-more")) {
        e.target.classList.toggle("active");
        let panel = e.target.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            e.target.innerHTML = 'Рейтинг <svg xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" width="11" height="6" viewBox="0 0 11 6" fill="none">\n' +
                '<path d="M10 1L5.5 5L1 1" stroke="#4FABFA"/>\n' +
                '</svg>\n' +
                '<span uk-icon="icon: chevron-down"></span> ';
        } else {
            panel.style.maxHeight = panel.scrollHeight + 0+ "px";
            e.target.innerHTML = 'Рейтинг <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">\n' +
                '<path d="M1 5L5.5 1L10 5" stroke-width="1.5" stroke="#4FABFA"/>\n' +
                '</svg> '+'<span uk-icon="icon: chevron-up"></span>';
        }
    }
});