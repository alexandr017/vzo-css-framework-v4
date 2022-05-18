if (document.getElementById('content-load-more') != null) {
    document.getElementById('content-load-more').addEventListener("click", function () {
        var contentMenu = $$('.content-menu')[0];

        contentMenu.querySelectorAll('.hiddenStyle').forEach((element) => {
            element.classList.remove("hiddenStyle");
        });
        contentMenu.querySelector('#content-load-more').style.display = 'none';
    });
}