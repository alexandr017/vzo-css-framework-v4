$('.our_expert_slider').slick({
    slidesToShow: 3,
    centerMode: true,
    slidesToScroll: 1,
    dots: true,
    arrows:false,
    infinite: true,
    variableWidth: true,
    dotsClass: 'slick-dots',
});

$('.our_expert_slider_btn').slick({
    slidesToShow:1,
    slidesToScroll: 1,
    dots: false,
    arrows:false,
    infinite: true,
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
