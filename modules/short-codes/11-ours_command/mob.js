$('.our_command_slider').slick({
    infinite: true,
    slidesToShow: 3,
    centerMode: true,
    slidesToScroll: 1,
    dots: true,
    arrows:false,
    variableWidth: true,
    dotsClass: 'slick-dots',
});

$('.our_command_slider_btn').slick({
    infinite: false,
    slidesToShow:1,
    slidesToScroll: 1,
    dots: false,
    arrows:false,
    variableWidth: true,
});

var modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
        event.preventDefault();
        var modal = document.getElementById(trigger.dataset.modal);
        modal.classList.add("open");
        var exits = modal.querySelectorAll(".modal-exit");
        exits.forEach(function (exit) {
            exit.addEventListener("click", function (event) {
                event.preventDefault();
                modal.classList.remove("open");
            });
        });
    });
});
